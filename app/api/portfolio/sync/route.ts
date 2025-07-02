import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { PortfolioAggregator } from "@/lib/broker-sync"
import { identifyTaxLossHarvestingOpportunities, calculateCapitalGainsTax } from "@/lib/tax-calculator"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, brokerName, forceSync = false } = body

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    // Get user's broker integrations
    const { data: integrations, error: integrationsError } = await supabase
      .from("broker_integrations")
      .select("*")
      .eq("user_id", userId)
      .eq("is_connected", true)

    if (integrationsError) {
      return NextResponse.json({ error: "Failed to fetch broker integrations" }, { status: 500 })
    }

    if (!integrations || integrations.length === 0) {
      return NextResponse.json({ error: "No connected brokers found" }, { status: 404 })
    }

    // Initialize portfolio aggregator
    const aggregator = new PortfolioAggregator()

    // Add all connected brokers
    for (const integration of integrations) {
      if (brokerName && integration.broker_name !== brokerName) {
        continue // Skip if specific broker requested
      }

      aggregator.addBroker(integration.broker_name, {
        apiKey: integration.api_key,
        accessToken: integration.access_token,
        apiSecret: integration.api_secret,
      })
    }

    // Check if we need to sync (rate limiting)
    const shouldSync = forceSync || (await shouldPerformSync(userId, brokerName))

    if (!shouldSync) {
      // Return cached data
      const cachedData = await getCachedPortfolioData(userId, brokerName)
      return NextResponse.json({
        success: true,
        cached: true,
        data: cachedData,
        message: "Returned cached data to respect rate limits",
      })
    }

    // Perform sync
    const syncResult = await aggregator.syncAllBrokers()
    const consolidatedPortfolio = await aggregator.getConsolidatedPortfolio()
    const brokerHealthStatus = await aggregator.getBrokerHealthStatus()

    // Calculate tax implications for each holding
    const portfolioWithTax = consolidatedPortfolio.map((holding) => {
      const purchaseDate = new Date()
      purchaseDate.setDate(purchaseDate.getDate() - Math.random() * 365) // Mock purchase date

      const taxCalc = calculateCapitalGainsTax({
        purchasePrice: holding.avgPrice,
        salePrice: holding.currentPrice,
        purchaseDate: purchaseDate.toISOString(),
        saleDate: new Date().toISOString(),
        quantity: holding.quantity,
        investmentType: holding.investmentType,
      })

      return {
        ...holding,
        taxCategory: taxCalc.taxCategory,
        holdingPeriod: taxCalc.holdingPeriod,
        potentialTaxLiability: taxCalc.taxLiability,
        purchaseDate: purchaseDate.toISOString(),
      }
    })

    // Identify tax optimization opportunities
    const taxOpportunities = identifyTaxLossHarvestingOpportunities(
      portfolioWithTax.map((holding) => ({
        symbol: holding.symbol,
        quantity: holding.quantity,
        avgPrice: holding.avgPrice,
        currentPrice: holding.currentPrice,
        pnl: holding.pnl,
        broker: "aggregated", // Since we're consolidating
        purchaseDate: holding.purchaseDate,
        taxCategory: holding.taxCategory,
      })),
    )

    // Save updated portfolio data
    await savePortfolioData(userId, portfolioWithTax)
    await saveTaxOpportunities(userId, taxOpportunities)

    // Update sync timestamps
    for (const integration of integrations) {
      if (!brokerName || integration.broker_name === brokerName) {
        await supabase
          .from("broker_integrations")
          .update({
            last_sync: new Date().toISOString(),
            sync_status: syncResult.results.find((r) => r.broker === integration.broker_name)?.status || "error",
          })
          .eq("id", integration.id)
      }
    }

    // Calculate portfolio summary
    const summary = {
      totalValue: portfolioWithTax.reduce((sum, holding) => sum + holding.quantity * holding.currentPrice, 0),
      totalPnL: portfolioWithTax.reduce((sum, holding) => sum + holding.pnl, 0),
      totalHoldings: portfolioWithTax.length,
      profitableHoldings: portfolioWithTax.filter((h) => h.pnl > 0).length,
      lossHoldings: portfolioWithTax.filter((h) => h.pnl < 0).length,
      stcgHoldings: portfolioWithTax.filter((h) => h.taxCategory === "STCG").length,
      ltcgHoldings: portfolioWithTax.filter((h) => h.taxCategory === "LTCG").length,
      potentialTaxSavings: taxOpportunities.reduce((sum, opp) => sum + opp.potentialSavings, 0),
    }

    return NextResponse.json({
      success: true,
      syncResult,
      portfolio: portfolioWithTax,
      taxOpportunities,
      brokerHealthStatus,
      summary,
      syncTimestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Portfolio sync error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const brokerName = searchParams.get("broker")

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    // Get cached portfolio data
    const portfolioData = await getCachedPortfolioData(userId, brokerName)
    const taxOpportunities = await getCachedTaxOpportunities(userId)

    // Get broker sync status
    const { data: integrations } = await supabase.from("broker_integrations").select("*").eq("user_id", userId)

    const syncStatus =
      integrations?.map((integration) => ({
        broker: integration.broker_name,
        lastSync: integration.last_sync,
        status: integration.sync_status || "unknown",
        isConnected: integration.is_connected,
      })) || []

    return NextResponse.json({
      success: true,
      portfolio: portfolioData,
      taxOpportunities,
      syncStatus,
      lastUpdated: portfolioData[0]?.lastUpdated || null,
    })
  } catch (error) {
    console.error("Portfolio fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Helper functions
async function shouldPerformSync(userId: string, brokerName?: string): Promise<boolean> {
  const { data: lastSync } = await supabase
    .from("broker_integrations")
    .select("last_sync")
    .eq("user_id", userId)
    .eq("broker_name", brokerName || "")
    .single()

  if (!lastSync?.last_sync) return true

  const lastSyncTime = new Date(lastSync.last_sync)
  const now = new Date()
  const timeDiff = now.getTime() - lastSyncTime.getTime()
  const minutesDiff = timeDiff / (1000 * 60)

  // Allow sync if last sync was more than 5 minutes ago
  return minutesDiff > 5
}

async function getCachedPortfolioData(userId: string, brokerName?: string) {
  let query = supabase.from("portfolio_data").select("*").eq("user_id", userId)

  if (brokerName) {
    query = query.eq("broker_name", brokerName)
  }

  const { data } = await query.order("last_updated", { ascending: false })
  return data || []
}

async function getCachedTaxOpportunities(userId: string) {
  const { data } = await supabase
    .from("tax_opportunities")
    .select("*")
    .eq("user_id", userId)
    .order("potential_savings", { ascending: false })

  return data || []
}

async function savePortfolioData(userId: string, portfolioData: any[]) {
  // Delete existing data
  await supabase.from("portfolio_data").delete().eq("user_id", userId)

  // Insert new data
  const portfolioEntries = portfolioData.map((holding) => ({
    user_id: userId,
    broker_name: "aggregated",
    symbol: holding.symbol,
    quantity: holding.quantity,
    avg_price: holding.avgPrice,
    current_price: holding.currentPrice,
    pnl: holding.pnl,
    investment_type: holding.investmentType,
    tax_category: holding.taxCategory,
    holding_period: holding.holdingPeriod,
    purchase_date: holding.purchaseDate,
    potential_tax_liability: holding.potentialTaxLiability,
    last_updated: new Date().toISOString(),
  }))

  const { error } = await supabase.from("portfolio_data").insert(portfolioEntries)

  if (error) {
    console.error("Portfolio save error:", error)
    throw error
  }
}

async function saveTaxOpportunities(userId: string, opportunities: any[]) {
  // Delete existing opportunities
  await supabase.from("tax_opportunities").delete().eq("user_id", userId)

  // Insert new opportunities
  const opportunityEntries = opportunities.map((opp, index) => ({
    user_id: userId,
    opportunity_id: `opp_${index + 1}`,
    type: opp.lossStock ? "loss_harvesting" : "gain_booking",
    priority: opp.priority,
    potential_savings: opp.potentialSavings,
    description: opp.recommendation,
    loss_stock_symbol: opp.lossStock?.symbol,
    loss_amount: Math.abs(opp.lossStock?.currentLoss || 0),
    gain_stock_symbol: opp.offsetStock?.symbol,
    gain_amount: opp.offsetStock?.currentGain || 0,
    deadline: opp.deadline,
    created_at: new Date().toISOString(),
  }))

  if (opportunityEntries.length > 0) {
    const { error } = await supabase.from("tax_opportunities").insert(opportunityEntries)

    if (error) {
      console.error("Tax opportunities save error:", error)
      throw error
    }
  }
}
