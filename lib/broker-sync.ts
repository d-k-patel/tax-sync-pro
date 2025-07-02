// Enhanced broker synchronization with real-time capabilities

export interface BrokerCredentials {
  apiKey?: string
  apiSecret?: string
  accessToken?: string
  refreshToken?: string
  userId?: string
}

export interface BrokerConfig {
  name: string
  displayName: string
  apiUrl: string
  authType: "oauth" | "api_key" | "token"
  isLive: boolean
  supportedFeatures: string[]
  rateLimit: {
    requestsPerMinute: number
    requestsPerDay: number
  }
}

export interface PortfolioHolding {
  symbol: string
  exchange: string
  quantity: number
  avgPrice: number
  currentPrice: number
  ltp: number
  pnl: number
  pnlPercentage: number
  investmentType: "equity" | "mutual_fund" | "bond" | "etf"
  isin?: string
  sector?: string
  marketCap?: number
  lastUpdated: string
}

export interface TransactionData {
  id: string
  symbol: string
  transactionType: "buy" | "sell"
  quantity: number
  price: number
  amount: number
  charges: number
  date: string
  orderId: string
  exchange: string
}

export const BROKER_CONFIGS: Record<string, BrokerConfig> = {
  zerodha: {
    name: "zerodha",
    displayName: "Zerodha",
    apiUrl: "https://api.kite.trade",
    authType: "oauth",
    isLive: true,
    supportedFeatures: ["portfolio", "orders", "positions", "margins", "historical_data"],
    rateLimit: {
      requestsPerMinute: 10,
      requestsPerDay: 5000,
    },
  },
  upstox: {
    name: "upstox",
    displayName: "Upstox",
    apiUrl: "https://api.upstox.com/v2",
    authType: "oauth",
    isLive: true,
    supportedFeatures: ["portfolio", "orders", "positions", "margins"],
    rateLimit: {
      requestsPerMinute: 25,
      requestsPerDay: 10000,
    },
  },
  groww: {
    name: "groww",
    displayName: "Groww",
    apiUrl: "https://groww.in/v1/api",
    authType: "token",
    isLive: true,
    supportedFeatures: ["portfolio", "orders"],
    rateLimit: {
      requestsPerMinute: 20,
      requestsPerDay: 8000,
    },
  },
  angelone: {
    name: "angelone",
    displayName: "Angel One",
    apiUrl: "https://apiconnect.angelbroking.com",
    authType: "api_key",
    isLive: true,
    supportedFeatures: ["portfolio", "orders", "positions", "margins", "historical_data"],
    rateLimit: {
      requestsPerMinute: 15,
      requestsPerDay: 6000,
    },
  },
  fivepaisa: {
    name: "fivepaisa",
    displayName: "5paisa",
    apiUrl: "https://openapi.5paisa.com",
    authType: "api_key",
    isLive: true,
    supportedFeatures: ["portfolio", "orders", "positions"],
    rateLimit: {
      requestsPerMinute: 12,
      requestsPerDay: 4000,
    },
  },
  iifl: {
    name: "iifl",
    displayName: "IIFL Securities",
    apiUrl: "https://ttblaze.iifl.com",
    authType: "api_key",
    isLive: false,
    supportedFeatures: ["portfolio", "orders"],
    rateLimit: {
      requestsPerMinute: 10,
      requestsPerDay: 3000,
    },
  },
}

export class BrokerAPI {
  private config: BrokerConfig
  private credentials: BrokerCredentials
  private rateLimiter: Map<string, number[]> = new Map()

  constructor(brokerName: string, credentials: BrokerCredentials) {
    this.config = BROKER_CONFIGS[brokerName]
    this.credentials = credentials

    if (!this.config) {
      throw new Error(`Unsupported broker: ${brokerName}`)
    }
  }

  // Rate limiting implementation
  private async checkRateLimit(): Promise<void> {
    const now = Date.now()
    const brokerRequests = this.rateLimiter.get(this.config.name) || []

    // Remove requests older than 1 minute
    const recentRequests = brokerRequests.filter((time) => now - time < 60000)

    if (recentRequests.length >= this.config.rateLimit.requestsPerMinute) {
      const oldestRequest = Math.min(...recentRequests)
      const waitTime = 60000 - (now - oldestRequest)
      await new Promise((resolve) => setTimeout(resolve, waitTime))
    }

    recentRequests.push(now)
    this.rateLimiter.set(this.config.name, recentRequests)
  }

  // Authentication methods
  async authenticate(): Promise<boolean> {
    try {
      await this.checkRateLimit()

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
      console.error(`Authentication failed for ${this.config.displayName}:`, error)
      return false
    }
  }

  private async handleOAuthFlow(): Promise<boolean> {
    if (!this.config.isLive) return true // Mock success for non-live brokers

    const response = await fetch(`${this.config.apiUrl}/session/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Kite-Version": "3",
      },
      body: JSON.stringify({
        api_key: this.credentials.apiKey,
        request_token: this.credentials.accessToken,
        checksum: this.generateChecksum(),
      }),
    })

    if (response.ok) {
      const data = await response.json()
      this.credentials.accessToken = data.data.access_token
      return true
    }

    return false
  }

  private async validateApiKey(): Promise<boolean> {
    if (!this.config.isLive) return true

    const response = await fetch(`${this.config.apiUrl}/user/profile`, {
      headers: {
        Authorization: `Bearer ${this.credentials.apiKey}`,
        "Content-Type": "application/json",
      },
    })

    return response.ok
  }

  private async validateToken(): Promise<boolean> {
    return !!(this.credentials.accessToken && this.credentials.accessToken.length > 0)
  }

  private generateChecksum(): string {
    // Implement actual checksum generation based on broker requirements
    return "mock_checksum"
  }

  // Portfolio data fetching
  async getPortfolio(): Promise<PortfolioHolding[]> {
    if (!this.config.isLive) {
      return this.getMockPortfolioData()
    }

    try {
      await this.checkRateLimit()

      const response = await fetch(`${this.config.apiUrl}/portfolio/holdings`, {
        headers: {
          Authorization: `Bearer ${this.credentials.accessToken}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch portfolio from ${this.config.displayName}`)
      }

      const data = await response.json()
      return this.normalizePortfolioData(data)
    } catch (error) {
      console.error(`Portfolio fetch failed for ${this.config.displayName}:`, error)
      return []
    }
  }

  // Transaction history
  async getTransactions(fromDate: string, toDate: string): Promise<TransactionData[]> {
    if (!this.config.isLive) {
      return this.getMockTransactionData()
    }

    try {
      await this.checkRateLimit()

      const response = await fetch(`${this.config.apiUrl}/orders?from=${fromDate}&to=${toDate}`, {
        headers: {
          Authorization: `Bearer ${this.credentials.accessToken}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch transactions from ${this.config.displayName}`)
      }

      const data = await response.json()
      return this.normalizeTransactionData(data)
    } catch (error) {
      console.error(`Transaction fetch failed for ${this.config.displayName}:`, error)
      return []
    }
  }

  // Real-time price updates
  async subscribeToRealTimeUpdates(symbols: string[], callback: (data: any) => void): Promise<void> {
    if (!this.config.isLive) {
      // Mock real-time updates
      setInterval(() => {
        const mockUpdate = {
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
          ltp: Math.random() * 1000 + 1000,
          change: (Math.random() - 0.5) * 100,
          timestamp: new Date().toISOString(),
        }
        callback(mockUpdate)
      }, 5000)
      return
    }

    // Implement WebSocket connection for real-time updates
    // This would vary by broker
  }

  // Mock data generators
  private getMockPortfolioData(): PortfolioHolding[] {
    const mockStocks = [
      { symbol: "RELIANCE", sector: "Energy", marketCap: 1500000 },
      { symbol: "TCS", sector: "IT", marketCap: 1200000 },
      { symbol: "HDFC", sector: "Banking", marketCap: 800000 },
      { symbol: "INFY", sector: "IT", marketCap: 600000 },
      { symbol: "ICICIBANK", sector: "Banking", marketCap: 500000 },
    ]

    return mockStocks.map((stock, index) => {
      const avgPrice = 1000 + Math.random() * 2000
      const currentPrice = avgPrice + (Math.random() - 0.5) * 200
      const quantity = Math.floor(Math.random() * 100) + 10
      const pnl = (currentPrice - avgPrice) * quantity

      return {
        symbol: stock.symbol,
        exchange: "NSE",
        quantity,
        avgPrice,
        currentPrice,
        ltp: currentPrice,
        pnl,
        pnlPercentage: ((currentPrice - avgPrice) / avgPrice) * 100,
        investmentType: "equity" as const,
        sector: stock.sector,
        marketCap: stock.marketCap,
        lastUpdated: new Date().toISOString(),
      }
    })
  }

  private getMockTransactionData(): TransactionData[] {
    const transactions: TransactionData[] = []
    const symbols = ["RELIANCE", "TCS", "HDFC", "INFY", "ICICIBANK"]

    for (let i = 0; i < 20; i++) {
      const symbol = symbols[Math.floor(Math.random() * symbols.length)]
      const transactionType = Math.random() > 0.5 ? "buy" : "sell"
      const quantity = Math.floor(Math.random() * 100) + 1
      const price = 1000 + Math.random() * 2000

      transactions.push({
        id: `txn_${i + 1}`,
        symbol,
        transactionType,
        quantity,
        price,
        amount: quantity * price,
        charges: quantity * price * 0.001, // 0.1% charges
        date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
        orderId: `order_${i + 1}`,
        exchange: "NSE",
      })
    }

    return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  // Data normalization methods
  private normalizePortfolioData(rawData: any): PortfolioHolding[] {
    switch (this.config.name) {
      case "zerodha":
        return this.normalizeZerodhaData(rawData)
      case "upstox":
        return this.normalizeUpstoxData(rawData)
      case "groww":
        return this.normalizeGrowwData(rawData)
      case "angelone":
        return this.normalizeAngelOneData(rawData)
      default:
        return rawData
    }
  }

  private normalizeZerodhaData(data: any): PortfolioHolding[] {
    return (data.data || []).map((item: any) => ({
      symbol: item.tradingsymbol,
      exchange: item.exchange,
      quantity: item.quantity,
      avgPrice: item.average_price,
      currentPrice: item.last_price,
      ltp: item.last_price,
      pnl: item.pnl,
      pnlPercentage: ((item.last_price - item.average_price) / item.average_price) * 100,
      investmentType: "equity" as const,
      isin: item.isin,
      lastUpdated: new Date().toISOString(),
    }))
  }

  private normalizeUpstoxData(data: any): PortfolioHolding[] {
    return (data.data || []).map((item: any) => ({
      symbol: item.instrument_token,
      exchange: item.exchange,
      quantity: item.quantity,
      avgPrice: item.avg_cost,
      currentPrice: item.ltp,
      ltp: item.ltp,
      pnl: item.unrealised_pnl,
      pnlPercentage: ((item.ltp - item.avg_cost) / item.avg_cost) * 100,
      investmentType: "equity" as const,
      lastUpdated: new Date().toISOString(),
    }))
  }

  private normalizeGrowwData(data: any): PortfolioHolding[] {
    return (data.holdings || []).map((item: any) => ({
      symbol: item.symbol,
      exchange: item.exchange || "NSE",
      quantity: item.quantity,
      avgPrice: item.avgPrice,
      currentPrice: item.currentPrice,
      ltp: item.currentPrice,
      pnl: item.pnl,
      pnlPercentage: item.pnlPercentage,
      investmentType: "equity" as const,
      lastUpdated: new Date().toISOString(),
    }))
  }

  private normalizeAngelOneData(data: any): PortfolioHolding[] {
    return (data.data || []).map((item: any) => ({
      symbol: item.symboltoken,
      exchange: item.exchange,
      quantity: item.quantity,
      avgPrice: item.avgprice,
      currentPrice: item.ltp,
      ltp: item.ltp,
      pnl: item.pnl,
      pnlPercentage: ((item.ltp - item.avgprice) / item.avgprice) * 100,
      investmentType: "equity" as const,
      lastUpdated: new Date().toISOString(),
    }))
  }

  private normalizeTransactionData(rawData: any): TransactionData[] {
    // Implement transaction data normalization for each broker
    return rawData.data || []
  }

  // Health check
  async healthCheck(): Promise<{
    status: "healthy" | "degraded" | "down"
    latency: number
    lastSync: string
    errors: string[]
  }> {
    const startTime = Date.now()
    const errors: string[] = []

    try {
      await this.checkRateLimit()

      const response = await fetch(`${this.config.apiUrl}/user/profile`, {
        headers: {
          Authorization: `Bearer ${this.credentials.accessToken}`,
          "Content-Type": "application/json",
        },
      })

      const latency = Date.now() - startTime

      if (response.ok) {
        return {
          status: latency > 5000 ? "degraded" : "healthy",
          latency,
          lastSync: new Date().toISOString(),
          errors,
        }
      } else {
        errors.push(`HTTP ${response.status}: ${response.statusText}`)
        return {
          status: "down",
          latency,
          lastSync: new Date().toISOString(),
          errors,
        }
      }
    } catch (error) {
      errors.push(error instanceof Error ? error.message : "Unknown error")
      return {
        status: "down",
        latency: Date.now() - startTime,
        lastSync: new Date().toISOString(),
        errors,
      }
    }
  }
}

// Multi-broker portfolio aggregator
export class PortfolioAggregator {
  private brokerAPIs: Map<string, BrokerAPI> = new Map()

  addBroker(brokerName: string, credentials: BrokerCredentials): void {
    const api = new BrokerAPI(brokerName, credentials)
    this.brokerAPIs.set(brokerName, api)
  }

  async syncAllBrokers(): Promise<{
    success: boolean
    results: Array<{
      broker: string
      status: "success" | "error"
      data?: PortfolioHolding[]
      error?: string
    }>
  }> {
    const results = []

    for (const [brokerName, api] of this.brokerAPIs) {
      try {
        const isAuthenticated = await api.authenticate()
        if (!isAuthenticated) {
          throw new Error("Authentication failed")
        }

        const portfolioData = await api.getPortfolio()
        results.push({
          broker: brokerName,
          status: "success" as const,
          data: portfolioData,
        })
      } catch (error) {
        results.push({
          broker: brokerName,
          status: "error" as const,
          error: error instanceof Error ? error.message : "Unknown error",
        })
      }
    }

    const success = results.some((result) => result.status === "success")
    return { success, results }
  }

  async getConsolidatedPortfolio(): Promise<PortfolioHolding[]> {
    const { results } = await this.syncAllBrokers()
    const consolidatedHoldings: PortfolioHolding[] = []

    for (const result of results) {
      if (result.status === "success" && result.data) {
        consolidatedHoldings.push(...result.data)
      }
    }

    // Merge holdings of same symbol from different brokers
    const mergedHoldings = new Map<string, PortfolioHolding>()

    for (const holding of consolidatedHoldings) {
      const key = `${holding.symbol}_${holding.exchange}`

      if (mergedHoldings.has(key)) {
        const existing = mergedHoldings.get(key)!
        const totalQuantity = existing.quantity + holding.quantity
        const totalValue = existing.avgPrice * existing.quantity + holding.avgPrice * holding.quantity

        mergedHoldings.set(key, {
          ...existing,
          quantity: totalQuantity,
          avgPrice: totalValue / totalQuantity,
          pnl: existing.pnl + holding.pnl,
          lastUpdated: new Date().toISOString(),
        })
      } else {
        mergedHoldings.set(key, holding)
      }
    }

    return Array.from(mergedHoldings.values())
  }

  async getBrokerHealthStatus(): Promise<Record<string, any>> {
    const healthStatus: Record<string, any> = {}

    for (const [brokerName, api] of this.brokerAPIs) {
      try {
        healthStatus[brokerName] = await api.healthCheck()
      } catch (error) {
        healthStatus[brokerName] = {
          status: "down",
          error: error instanceof Error ? error.message : "Unknown error",
        }
      }
    }

    return healthStatus
  }
}
