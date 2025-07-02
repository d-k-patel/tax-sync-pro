import { type NextRequest, NextResponse } from "next/server"
import { supabase, type WaitlistEntry } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { name, email, firmName, dailyBroker, biggestHeadache } = body

    if (!name || !email || !firmName || !dailyBroker || !biggestHeadache) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Check if email already exists
    const { data: existingEntry } = await supabase.from("waitlist_entries").select("email").eq("email", email).single()

    if (existingEntry) {
      return NextResponse.json({ error: "Email already registered in waitlist" }, { status: 409 })
    }

    // Insert new waitlist entry
    const waitlistEntry: WaitlistEntry = {
      name,
      email,
      firm_name: firmName,
      daily_broker: dailyBroker,
      biggest_headache: biggestHeadache,
      status: "pending",
    }

    const { data, error } = await supabase.from("waitlist_entries").insert([waitlistEntry]).select().single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to register for waitlist" }, { status: 500 })
    }

    // Send welcome email (simulate)
    await sendWelcomeEmail(email, name, firmName)

    // Send notification to admin (simulate)
    await notifyAdmin(waitlistEntry)

    return NextResponse.json({
      success: true,
      message: "Successfully registered for waitlist",
      data: {
        id: data.id,
        position: await getWaitlistPosition(data.id),
      },
    })
  } catch (error) {
    console.error("Waitlist registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    if (!email) {
      // Return waitlist stats
      const { count } = await supabase.from("waitlist_entries").select("*", { count: "exact", head: true })

      return NextResponse.json({
        total_signups: count || 0,
        remaining_spots: Math.max(0, 100 - (count || 0)),
      })
    }

    // Get specific user's waitlist status
    const { data, error } = await supabase.from("waitlist_entries").select("*").eq("email", email).single()

    if (error || !data) {
      return NextResponse.json({ error: "Email not found in waitlist" }, { status: 404 })
    }

    const position = await getWaitlistPosition(data.id!)

    return NextResponse.json({
      ...data,
      position,
      estimated_access_date: getEstimatedAccessDate(position),
    })
  } catch (error) {
    console.error("Waitlist fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function getWaitlistPosition(entryId: string): Promise<number> {
  const { data, error } = await supabase
    .from("waitlist_entries")
    .select("created_at")
    .order("created_at", { ascending: true })

  if (error || !data) return 0

  const position = data.findIndex((entry) => entry.created_at === entryId) + 1
  return position || data.length
}

async function sendWelcomeEmail(email: string, name: string, firmName: string) {
  // Simulate email sending - in production, integrate with SendGrid, Resend, etc.
  console.log(`Sending welcome email to ${email}`)

  const emailContent = {
    to: email,
    subject: "Welcome to TaxSync Pro Waitlist! 🎉",
    html: `
      <h2>નમસ્તે ${name}!</h2>
      <p>Thank you for joining the TaxSync Pro waitlist. We're excited to help ${firmName} automate client portfolio management.</p>
      
      <h3>What happens next?</h3>
      <ul>
        <li>✅ You're confirmed on our priority list</li>
        <li>📧 We'll send your broker sync toolkit within 24 hours</li>
        <li>🎯 Early access notification when we launch</li>
        <li>💰 Your 15% lifetime discount is reserved</li>
      </ul>
      
      <p>Questions? Reply to this email or WhatsApp us at +91 79 4000 0000</p>
      
      <p>Best regards,<br>TaxSync Pro Team<br>Made in Ahmedabad for Gujarat's CAs</p>
    `,
  }

  // In production, actually send the email
  return Promise.resolve()
}

async function notifyAdmin(entry: WaitlistEntry) {
  // Simulate admin notification
  console.log("New waitlist signup:", entry)

  // In production, send to Slack, Discord, or email
  const notification = {
    text:
      `🎉 New CA joined waitlist!\n\n` +
      `Name: ${entry.name}\n` +
      `Firm: ${entry.firm_name}\n` +
      `Broker: ${entry.daily_broker}\n` +
      `Challenge: ${entry.biggest_headache}\n` +
      `Email: ${entry.email}`,
  }

  return Promise.resolve()
}

function getEstimatedAccessDate(position: number): string {
  // Estimate access date based on position (assuming 10 users per week)
  const weeksToWait = Math.ceil(position / 10)
  const accessDate = new Date()
  accessDate.setDate(accessDate.getDate() + weeksToWait * 7)

  return accessDate.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
