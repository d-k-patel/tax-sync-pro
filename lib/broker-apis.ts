// Broker API integration utilities
export interface BrokerConfig {
  name: string
  apiUrl: string
  authType: "oauth" | "api_key" | "token"
  isLive: boolean
}

export const BROKER_CONFIGS: Record<string, BrokerConfig> = {
  zerodha: {
    name: "Zerodha",
    apiUrl: "https://api.kite.trade",
    authType: "oauth",
    isLive: true,
  },
  upstox: {
    name: "Upstox",
    apiUrl: "https://api.upstox.com/v2",
    authType: "oauth",
    isLive: true,
  },
  groww: {
    name: "Groww",
    apiUrl: "https://groww.in/v1/api",
    authType: "token",
    isLive: true,
  },
  angelone: {
    name: "AngelOne",
    apiUrl: "https://apiconnect.angelbroking.com",
    authType: "api_key",
    isLive: false, // Early access
  },
  fivepaisa: {
    name: "5paisa",
    apiUrl: "https://openapi.5paisa.com",
    authType: "api_key",
    isLive: true,
  },
}

export class BrokerAPI {
  private config: BrokerConfig
  private credentials: any

  constructor(brokerName: string, credentials: any) {
    this.config = BROKER_CONFIGS[brokerName]
    this.credentials = credentials
  }

  async authenticate(): Promise<boolean> {
    try {
      switch (this.config.authType) {
        case "oauth":
          return await this.handleOAuthFlow()
        case "api_key":
          return await this.validateApiKey()
        case "token":
          return await this.validateToken()
        default:
          return false
      }
    } catch (error) {
      console.error(`Authentication failed for ${this.config.name}:`, error)
      return false
    }
  }

  private async handleOAuthFlow(): Promise<boolean> {
    // Simulate OAuth flow - in real implementation, this would handle the full OAuth process
    const response = await fetch(`${this.config.apiUrl}/session/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Kite-Version": "3",
      },
      body: JSON.stringify({
        api_key: this.credentials.api_key,
        request_token: this.credentials.request_token,
        checksum: this.credentials.checksum,
      }),
    })

    return response.ok
  }

  private async validateApiKey(): Promise<boolean> {
    // Simulate API key validation
    const response = await fetch(`${this.config.apiUrl}/user/profile`, {
      headers: {
        Authorization: `Bearer ${this.credentials.api_key}`,
        "Content-Type": "application/json",
      },
    })

    return response.ok
  }

  private async validateToken(): Promise<boolean> {
    // Simulate token validation
    return this.credentials.access_token && this.credentials.access_token.length > 0
  }

  async getPortfolio(): Promise<any[]> {
    if (!this.config.isLive) {
      // Return mock data for brokers not yet live
      return this.getMockPortfolioData()
    }

    try {
      const response = await fetch(`${this.config.apiUrl}/portfolio/holdings`, {
        headers: {
          Authorization: `Bearer ${this.credentials.access_token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch portfolio from ${this.config.name}`)
      }

      const data = await response.json()
      return this.normalizePortfolioData(data)
    } catch (error) {
      console.error(`Portfolio fetch failed for ${this.config.name}:`, error)
      return []
    }
  }

  private getMockPortfolioData(): any[] {
    return [
      {
        symbol: "RELIANCE",
        quantity: 100,
        avg_price: 2450.5,
        current_price: 2520.75,
        pnl: 7025,
        investment_type: "equity",
      },
      {
        symbol: "TCS",
        quantity: 50,
        avg_price: 3200.25,
        current_price: 3180.5,
        pnl: -987.5,
        investment_type: "equity",
      },
    ]
  }

  private normalizePortfolioData(rawData: any): any[] {
    // Normalize different broker data formats to a common structure
    switch (this.config.name.toLowerCase()) {
      case "zerodha":
        return (
          rawData.data?.map((item: any) => ({
            symbol: item.tradingsymbol,
            quantity: item.quantity,
            avg_price: item.average_price,
            current_price: item.last_price,
            pnl: item.pnl,
            investment_type: "equity",
          })) || []
        )

      case "upstox":
        return (
          rawData.data?.map((item: any) => ({
            symbol: item.instrument_token,
            quantity: item.quantity,
            avg_price: item.avg_cost,
            current_price: item.ltp,
            pnl: item.unrealised_pnl,
            investment_type: "equity",
          })) || []
        )

      default:
        return rawData
    }
  }

  async getTaxLossHarvestingOpportunities(): Promise<any[]> {
    const portfolio = await this.getPortfolio()

    // Simple tax-loss harvesting logic
    const lossStocks = portfolio.filter((stock) => stock.pnl < 0)
    const gainStocks = portfolio.filter((stock) => stock.pnl > 0)

    const opportunities = []

    for (const lossStock of lossStocks) {
      const offsetGain = gainStocks.find((gainStock) => Math.abs(gainStock.pnl) >= Math.abs(lossStock.pnl) * 0.8)

      if (offsetGain) {
        opportunities.push({
          loss_stock: lossStock.symbol,
          loss_amount: Math.abs(lossStock.pnl),
          gain_stock: offsetGain.symbol,
          gain_amount: offsetGain.pnl,
          tax_savings: Math.abs(lossStock.pnl) * 0.125, // Assuming 12.5% LTCG tax
          recommendation: `Sell ${lossStock.symbol} to offset gains from ${offsetGain.symbol}`,
        })
      }
    }

    return opportunities
  }
}
