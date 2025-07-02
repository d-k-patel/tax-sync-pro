// Tax calculation algorithms based on Indian tax laws

export interface TaxCalculationInput {
  purchasePrice: number
  salePrice: number
  purchaseDate: string
  saleDate: string
  quantity: number
  investmentType: "equity" | "mutual_fund" | "bond"
  indexationBenefit?: boolean
}

export interface TaxCalculationResult {
  capitalGain: number
  taxCategory: "STCG" | "LTCG"
  taxRate: number
  taxLiability: number
  indexationBenefit: number
  netGain: number
  holdingPeriod: number
}

export interface TaxLossHarvestingOpportunity {
  lossStock: {
    symbol: string
    currentLoss: number
    quantity: number
    broker: string
  }
  offsetStock?: {
    symbol: string
    currentGain: number
    quantity: number
    broker: string
  }
  potentialSavings: number
  taxSavings: number
  recommendation: string
  priority: "high" | "medium" | "low"
  deadline?: string
}

// Calculate holding period in days
export function calculateHoldingPeriod(purchaseDate: string, saleDate: string): number {
  const purchase = new Date(purchaseDate)
  const sale = new Date(saleDate)
  const diffTime = Math.abs(sale.getTime() - purchase.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

// Determine tax category based on holding period and investment type
export function getTaxCategory(holdingPeriod: number, investmentType: string): "STCG" | "LTCG" {
  const ltcgThreshold = investmentType === "equity" ? 365 : 1095 // 1 year for equity, 3 years for others
  return holdingPeriod > ltcgThreshold ? "LTCG" : "STCG"
}

// Calculate indexation benefit for LTCG
export function calculateIndexationBenefit(purchasePrice: number, purchaseDate: string, saleDate: string): number {
  // Simplified indexation calculation using CII (Cost Inflation Index)
  // In real implementation, use actual CII values from Income Tax Department

  const purchaseYear = new Date(purchaseDate).getFullYear()
  const saleYear = new Date(saleDate).getFullYear()

  // Mock CII values - replace with actual values
  const ciiValues: { [year: number]: number } = {
    2020: 301,
    2021: 317,
    2022: 331,
    2023: 348,
    2024: 363,
  }

  const purchaseCII = ciiValues[purchaseYear] || 300
  const saleCII = ciiValues[saleYear] || 350

  const indexedCost = purchasePrice * (saleCII / purchaseCII)
  return indexedCost - purchasePrice
}

// Main tax calculation function
export function calculateCapitalGainsTax(input: TaxCalculationInput): TaxCalculationResult {
  const { purchasePrice, salePrice, purchaseDate, saleDate, quantity, investmentType, indexationBenefit = true } = input

  const totalPurchaseValue = purchasePrice * quantity
  const totalSaleValue = salePrice * quantity
  const holdingPeriod = calculateHoldingPeriod(purchaseDate, saleDate)
  const taxCategory = getTaxCategory(holdingPeriod, investmentType)

  let capitalGain = totalSaleValue - totalPurchaseValue
  let indexationAmount = 0
  let taxRate = 0
  let taxLiability = 0

  if (taxCategory === "LTCG") {
    // Long Term Capital Gains
    if (investmentType === "equity") {
      // LTCG on equity: 10% above ₹1 lakh exemption
      taxRate = 0.1
      const exemptionLimit = 100000
      const taxableGain = Math.max(0, capitalGain - exemptionLimit)
      taxLiability = taxableGain * taxRate
    } else {
      // LTCG on non-equity with indexation benefit
      if (indexationBenefit) {
        indexationAmount = calculateIndexationBenefit(totalPurchaseValue, purchaseDate, saleDate)
        capitalGain = totalSaleValue - (totalPurchaseValue + indexationAmount)
      }
      taxRate = 0.2 // 20% with indexation
      taxLiability = Math.max(0, capitalGain) * taxRate
    }
  } else {
    // Short Term Capital Gains
    if (investmentType === "equity") {
      taxRate = 0.15 // 15% for equity STCG
    } else {
      taxRate = 0.3 // Added to income tax slab (assuming 30% for simplification)
    }
    taxLiability = Math.max(0, capitalGain) * taxRate
  }

  return {
    capitalGain,
    taxCategory,
    taxRate,
    taxLiability,
    indexationBenefit: indexationAmount,
    netGain: capitalGain - taxLiability,
    holdingPeriod,
  }
}

// Tax Loss Harvesting Algorithm
export function identifyTaxLossHarvestingOpportunities(
  portfolio: Array<{
    symbol: string
    quantity: number
    avgPrice: number
    currentPrice: number
    pnl: number
    broker: string
    purchaseDate: string
    taxCategory: "STCG" | "LTCG"
  }>,
): TaxLossHarvestingOpportunity[] {
  const opportunities: TaxLossHarvestingOpportunity[] = []

  // Separate loss and gain stocks
  const lossStocks = portfolio.filter((stock) => stock.pnl < 0)
  const gainStocks = portfolio.filter((stock) => stock.pnl > 0)

  // Sort by absolute P&L for better matching
  lossStocks.sort((a, b) => a.pnl - b.pnl) // Most loss first
  gainStocks.sort((a, b) => b.pnl - a.pnl) // Most gain first

  for (const lossStock of lossStocks) {
    const lossAmount = Math.abs(lossStock.pnl)

    // Find matching gain stocks for offset
    const matchingGains = gainStocks.filter((gainStock) => {
      // Same tax category for optimal offset
      return gainStock.taxCategory === lossStock.taxCategory && gainStock.pnl >= lossAmount * 0.5 // At least 50% of loss
    })

    if (matchingGains.length > 0) {
      const bestMatch = matchingGains[0]
      const offsetAmount = Math.min(lossAmount, bestMatch.pnl)

      // Calculate tax savings
      let taxRate = 0
      if (lossStock.taxCategory === "STCG") {
        taxRate = 0.15 // 15% for equity STCG
      } else {
        taxRate = 0.1 // 10% for equity LTCG
      }

      const taxSavings = offsetAmount * taxRate

      // Determine priority based on tax savings and deadline
      let priority: "high" | "medium" | "low" = "low"
      if (taxSavings > 15000) priority = "high"
      else if (taxSavings > 5000) priority = "medium"

      // Check if near financial year end for deadline
      const currentDate = new Date()
      const financialYearEnd = new Date(currentDate.getFullYear(), 2, 31) // March 31
      if (currentDate > financialYearEnd) {
        financialYearEnd.setFullYear(financialYearEnd.getFullYear() + 1)
      }

      const daysToYearEnd = Math.ceil((financialYearEnd.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))

      opportunities.push({
        lossStock: {
          symbol: lossStock.symbol,
          currentLoss: lossStock.pnl,
          quantity: lossStock.quantity,
          broker: lossStock.broker,
        },
        offsetStock: {
          symbol: bestMatch.symbol,
          currentGain: bestMatch.pnl,
          quantity: Math.ceil(offsetAmount / (bestMatch.currentPrice - bestMatch.avgPrice)),
          broker: bestMatch.broker,
        },
        potentialSavings: taxSavings,
        taxSavings,
        recommendation: `Sell ${lossStock.symbol} to book loss of ₹${lossAmount.toLocaleString()} and offset against gains from ${bestMatch.symbol}`,
        priority,
        deadline: daysToYearEnd < 90 ? financialYearEnd.toISOString() : undefined,
      })
    } else {
      // Loss without immediate offset opportunity
      const taxSavings = lossAmount * 0.15 // Assuming STCG rate

      if (taxSavings > 5000) {
        // Only include significant losses
        opportunities.push({
          lossStock: {
            symbol: lossStock.symbol,
            currentLoss: lossStock.pnl,
            quantity: lossStock.quantity,
            broker: lossStock.broker,
          },
          potentialSavings: taxSavings,
          taxSavings,
          recommendation: `Consider booking loss in ${lossStock.symbol} to carry forward for future offset`,
          priority: "low",
        })
      }
    }
  }

  // Sort opportunities by potential savings
  return opportunities.sort((a, b) => b.potentialSavings - a.potentialSavings)
}

// Wash Sale Rule Checker
export function checkWashSaleViolation(
  soldStock: { symbol: string; saleDate: string },
  purchaseHistory: Array<{ symbol: string; purchaseDate: string }>,
): boolean {
  const saleDate = new Date(soldStock.saleDate)

  // Check for purchases 30 days before or after sale
  return purchaseHistory.some((purchase) => {
    if (purchase.symbol !== soldStock.symbol) return false

    const purchaseDate = new Date(purchase.purchaseDate)
    const daysDifference = Math.abs((saleDate.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24))

    return daysDifference <= 30
  })
}

// LTCG Exemption Optimizer
export function optimizeLTCGExemption(
  ltcgGains: number,
  currentFinancialYear: string,
): {
  exemptionUsed: number
  exemptionRemaining: number
  recommendation: string
} {
  const exemptionLimit = 100000 // ₹1 lakh per financial year
  const exemptionUsed = Math.min(ltcgGains, exemptionLimit)
  const exemptionRemaining = exemptionLimit - exemptionUsed

  let recommendation = ""
  if (exemptionRemaining > 0) {
    recommendation = `You have ₹${exemptionRemaining.toLocaleString()} LTCG exemption remaining for FY ${currentFinancialYear}. Consider booking more LTCG gains to utilize this exemption.`
  } else if (ltcgGains > exemptionLimit) {
    const excessGain = ltcgGains - exemptionLimit
    recommendation = `You have excess LTCG of ₹${excessGain.toLocaleString()} that will be taxed at 10%. Consider spreading gains across financial years.`
  }

  return {
    exemptionUsed,
    exemptionRemaining,
    recommendation,
  }
}

// Portfolio Tax Efficiency Score
export function calculateTaxEfficiencyScore(
  portfolio: Array<{
    symbol: string
    pnl: number
    taxCategory: "STCG" | "LTCG"
    holdingPeriod: number
  }>,
): {
  score: number
  factors: {
    ltcgRatio: number
    lossHarvestingPotential: number
    holdingPeriodOptimization: number
  }
  recommendations: string[]
} {
  const totalValue = portfolio.reduce((sum, stock) => sum + Math.abs(stock.pnl), 0)
  const ltcgValue = portfolio
    .filter((stock) => stock.taxCategory === "LTCG")
    .reduce((sum, stock) => sum + Math.abs(stock.pnl), 0)

  const ltcgRatio = totalValue > 0 ? (ltcgValue / totalValue) * 100 : 0

  // Calculate loss harvesting potential
  const totalLosses = portfolio.filter((stock) => stock.pnl < 0).reduce((sum, stock) => sum + Math.abs(stock.pnl), 0)
  const totalGains = portfolio.filter((stock) => stock.pnl > 0).reduce((sum, stock) => sum + stock.pnl, 0)

  const lossHarvestingPotential = totalGains > 0 ? Math.min(totalLosses / totalGains, 1) * 100 : 0

  // Calculate holding period optimization
  const nearLTCGStocks = portfolio.filter(
    (stock) => stock.taxCategory === "STCG" && stock.holdingPeriod > 300 && stock.holdingPeriod < 365,
  )
  const holdingPeriodOptimization = nearLTCGStocks.length > 0 ? (nearLTCGStocks.length / portfolio.length) * 100 : 100

  // Calculate overall score
  const score = ltcgRatio * 0.4 + lossHarvestingPotential * 0.3 + holdingPeriodOptimization * 0.3

  const recommendations: string[] = []
  if (ltcgRatio < 60) {
    recommendations.push("Consider holding stocks for longer periods to benefit from LTCG tax rates")
  }
  if (lossHarvestingPotential > 20) {
    recommendations.push("You have significant tax-loss harvesting opportunities")
  }
  if (nearLTCGStocks.length > 0) {
    recommendations.push(`${nearLTCGStocks.length} stocks are close to LTCG qualification - consider holding`)
  }

  return {
    score: Math.round(score),
    factors: {
      ltcgRatio: Math.round(ltcgRatio),
      lossHarvestingPotential: Math.round(lossHarvestingPotential),
      holdingPeriodOptimization: Math.round(holdingPeriodOptimization),
    },
    recommendations,
  }
}
