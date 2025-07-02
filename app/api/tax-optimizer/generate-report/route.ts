import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"
import { generateTaxOptimizationPDF } from "@/lib/pdf-generator"

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()

    // Get user from session
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { opportunities, insights, scenarios, summary, language = "en" } = body

    // Get user profile for report personalization
    const { data: profile } = await supabase.from("user_profiles").select("*").eq("user_id", user.id).single()

    // Generate PDF report
    const pdfBuffer = await generateTaxOptimizationPDF({
      user: {
        id: user.id,
        email: user.email || "",
        name: profile?.full_name || "CA Professional",
        firm_name: profile?.firm_name || "Tax Advisory Firm",
      },
      opportunities,
      insights,
      scenarios,
      summary,
      language,
      generatedAt: new Date().toISOString(),
    })

    // Store report in database for tracking
    const { error: insertError } = await supabase.from("generated_reports").insert({
      user_id: user.id,
      report_type: "tax_optimization",
      report_data: {
        opportunities_count: opportunities.length,
        potential_savings: summary.potentialSavings,
        tax_efficiency_score: summary.taxEfficiencyScore,
      },
      file_size: pdfBuffer.length,
      language,
      created_at: new Date().toISOString(),
    })

    if (insertError) {
      console.error("Error storing report record:", insertError)
    }

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="tax-optimization-report-${
          new Date().toISOString().split("T")[0]
        }.pdf"`,
        "Content-Length": pdfBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error("Error generating PDF report:", error)
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 })
  }
}
