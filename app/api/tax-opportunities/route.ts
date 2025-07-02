import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    // Get user's portfolio data
    const { data: portfolioData, error } = await supabase.from("portfolio_data").select("*").eq("user_id", userId)

    if (error) {
      return NextResponse.json({ error: "Failed to fetch portfolio data" }, { status: 500 })
    }

    // Calculate tax-loss harvesting opportunities
    const opportunities = calculateTaxOpportunities(portfolioData)

    // Calculate potential tax savings
    const totalTaxSavings = opportunities.reduce((sum, opp) => sum + opp.tax_savings, 0)

    // Get market insights
    const marketInsights = await getMarketInsights(portfolioData)

    return NextResponse.json({
      opportunities,
      summary: {
        total_opportunities: opportunities.length,
        potential_tax_savings: totalTaxSavings,
        total_portfolio_value: portfolioData.reduce((sum, item) => sum + item.quantity * item.current_price, 0),
        total_unrealized_pnl: portfolioData.reduce((sum, item) => sum + item.pnl, 0),
      },
      market_insights: marketInsights,
      last_updated: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Tax opportunities error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function calculateTaxOpportunities(portfolioData: any[]) {
  const lossStocks = portfolioData.filter((stock) => stock.pnl < 0)
  const gainStocks = portfolioData.filter((stock) => stock.pnl > 0)

  const opportunities = []

  // Short-term vs Long-term considerations
  const currentDate = new Date()

  for (const lossStock of lossStocks) {
    // Find matching gains to offset
    const matchingGains = gainStocks.filter((gainStock) => Math.abs(gainStock.pnl) >= Math.abs(lossStock.pnl) * 0.5)

    for (const gainStock of matchingGains) {
      const lossAmount = Math.abs(lossStock.pnl)
      const gainAmount = gainStock.pnl

      // Calculate tax implications
      const stcgTaxRate = 0.15 // 15% for STCG
      const ltcgTaxRate = 0.1 // 10% for LTCG above 1L

      // Assume LTCG for simplification
      const taxSavings = Math.min(lossAmount, gainAmount) * ltcgTaxRate

      opportunities.push({
        id: `${lossStock.symbol}_${gainStock.symbol}`,
        loss_stock: {
          symbol: lossStock.symbol,
          broker: lossStock.broker_name,
          loss_amount: lossAmount,
          quantity: lossStock.quantity,
          current_price: lossStock.current_price,
        },
        gain_stock: {
          symbol: gainStock.symbol,
          broker: gainStock.broker_name,
          gain_amount: gainAmount,
          quantity: gainStock.quantity,
          current_price: gainStock.current_price,
        },
        tax_savings: taxSavings,
        offset_amount: Math.min(lossAmount, gainAmount),
        recommendation: `Sell ${lossStock.symbol} (₹${lossAmount.toLocaleString()} loss) to offset gains from ${gainStock.symbol}`,
        priority: taxSavings > 5000 ? "high" : taxSavings > 1000 ? "medium" : "low",
        estimated_savings: {
          tax_saved: taxSavings,
          net_benefit: taxSavings - lossAmount * 0.001, // Assuming 0.1% transaction cost
        },
      })
    }
  }

  // Sort by tax savings potential
  return opportunities.sort((a, b) => b.tax_savings - a.tax_savings).slice(0, 10) // Top 10 opportunities
}

async function getMarketInsights(portfolioData: any[]) {
  // Simulate market insights - in production, integrate with market data APIs
  const sectors = ["Technology", "Banking", "Pharma", "Auto", "FMCG"]
  const randomSector = sectors[Math.floor(Math.random() * sectors.length)]

  return {
    market_trend: "Mixed",
    recommended_action: "Hold and monitor tax-loss opportunities",
    sector_focus: randomSector,
    volatility_index: Math.floor(Math.random() * 30) + 10,
    insights: [
      "Consider booking losses before March 31st for tax benefits",
      "Monitor quarterly results for portfolio rebalancing",
      "Keep cash reserves for upcoming opportunities",
    ],
  }
}
