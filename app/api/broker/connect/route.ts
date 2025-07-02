import { type NextRequest, NextResponse } from "next/server"
import { supabase, type BrokerIntegration } from "@/lib/supabase"
import { BrokerAPI, BROKER_CONFIGS } from "@/lib/broker-apis"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, brokerName, credentials } = body

    if (!userId || !brokerName || !credentials) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!BROKER_CONFIGS[brokerName]) {
      return NextResponse.json({ error: "Unsupported broker" }, { status: 400 })
    }

    // Initialize broker API
    const brokerAPI = new BrokerAPI(brokerName, credentials)

    // Test authentication
    const isAuthenticated = await brokerAPI.authenticate()

    if (!isAuthenticated) {
      return NextResponse.json({ error: "Failed to authenticate with broker" }, { status: 401 })
    }

    // Save broker integration
    const integration: BrokerIntegration = {
      user_id: userId,
      broker_name: brokerName,
      api_key: credentials.api_key,
      access_token: credentials.access_token,
      is_connected: true,
      last_sync: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from("broker_integrations")
      .upsert([integration], {
        onConflict: "user_id,broker_name",
        ignoreDuplicates: false,
      })
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to save broker integration" }, { status: 500 })
    }

    // Fetch initial portfolio data
    const portfolioData = await brokerAPI.getPortfolio()

    // Save portfolio data
    if (portfolioData.length > 0) {
      await savePortfolioData(userId, brokerName, portfolioData)
    }

    return NextResponse.json({
      success: true,
      message: `Successfully connected to ${BROKER_CONFIGS[brokerName].name}`,
      data: {
        broker: brokerName,
        connected: true,
        portfolio_items: portfolioData.length,
        last_sync: integration.last_sync,
      },
    })
  } catch (error) {
    console.error("Broker connection error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    // Get all broker integrations for user
    const { data, error } = await supabase.from("broker_integrations").select("*").eq("user_id", userId)

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch broker integrations" }, { status: 500 })
    }

    // Add broker config info
    const integrations = data.map((integration) => ({
      ...integration,
      broker_config: BROKER_CONFIGS[integration.broker_name],
      status: integration.is_connected ? "connected" : "disconnected",
    }))

    return NextResponse.json({
      integrations,
      total_connected: integrations.filter((i) => i.is_connected).length,
      available_brokers: Object.keys(BROKER_CONFIGS),
    })
  } catch (error) {
    console.error("Broker fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function savePortfolioData(userId: string, brokerName: string, portfolioData: any[]) {
  const portfolioEntries = portfolioData.map((item) => ({
    user_id: userId,
    broker_name: brokerName,
    symbol: item.symbol,
    quantity: item.quantity,
    avg_price: item.avg_price,
    current_price: item.current_price,
    pnl: item.pnl,
    investment_type: item.investment_type,
    last_updated: new Date().toISOString(),
  }))

  const { error } = await supabase.from("portfolio_data").upsert(portfolioEntries, {
    onConflict: "user_id,broker_name,symbol",
    ignoreDuplicates: false,
  })

  if (error) {
    console.error("Portfolio save error:", error)
  }
}
