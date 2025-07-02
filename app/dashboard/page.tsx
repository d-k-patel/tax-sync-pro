"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  AlertTriangle,
  DollarSign,
  PieChart,
  BarChart3,
  Calendar,
  Download,
  Settings,
  Bell,
  Globe,
} from "lucide-react"

interface PortfolioData {
  id: string
  broker: string
  symbol: string
  quantity: number
  avgPrice: number
  currentPrice: number
  pnl: number
  pnlPercentage: number
  investmentType: "equity" | "mutual_fund" | "bond"
  purchaseDate: string
  holdingPeriod: number
  taxCategory: "STCG" | "LTCG"
}

interface TaxOpportunity {
  id: string
  type: "loss_harvesting" | "gain_booking" | "wash_sale_warning"
  priority: "high" | "medium" | "low"
  potentialSavings: number
  description: string
  actionRequired: string
  deadline?: string
  stocks: {
    sell: { symbol: string; quantity: number; currentLoss: number }
    offset?: { symbol: string; quantity: number; currentGain: number }
  }
}

interface BrokerConnection {
  id: string
  name: string
  status: "connected" | "disconnected" | "syncing" | "error"
  lastSync: string
  portfolioValue: number
  accountCount: number
}

export default function Dashboard() {
  const [language, setLanguage] = useState<"en" | "gu">("en")
  const [portfolioData, setPortfolioData] = useState<PortfolioData[]>([])
  const [taxOpportunities, setTaxOpportunities] = useState<TaxOpportunity[]>([])
  const [brokerConnections, setBrokerConnections] = useState<BrokerConnection[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0)
  const [totalPnL, setTotalPnL] = useState(0)
  const [potentialTaxSavings, setPotentialTaxSavings] = useState(0)

  // Mock data - In real app, this would come from APIs
  useEffect(() => {
    const mockPortfolioData: PortfolioData[] = [
      {
        id: "1",
        broker: "zerodha",
        symbol: "RELIANCE",
        quantity: 100,
        avgPrice: 2450.5,
        currentPrice: 2520.75,
        pnl: 7025,
        pnlPercentage: 2.87,
        investmentType: "equity",
        purchaseDate: "2023-08-15",
        holdingPeriod: 120,
        taxCategory: "STCG",
      },
      {
        id: "2",
        broker: "upstox",
        symbol: "TCS",
        quantity: 50,
        avgPrice: 3200.25,
        currentPrice: 3180.5,
        pnl: -987.5,
        pnlPercentage: -0.62,
        investmentType: "equity",
        purchaseDate: "2022-12-10",
        holdingPeriod: 380,
        taxCategory: "LTCG",
      },
      {
        id: "3",
        broker: "groww",
        symbol: "HDFC",
        quantity: 75,
        avgPrice: 1650.0,
        currentPrice: 1580.25,
        pnl: -5231.25,
        pnlPercentage: -4.23,
        investmentType: "equity",
        purchaseDate: "2023-09-20",
        holdingPeriod: 95,
        taxCategory: "STCG",
      },
      {
        id: "4",
        broker: "angelone",
        symbol: "INFY",
        quantity: 200,
        avgPrice: 1420.0,
        currentPrice: 1485.75,
        pnl: 13150,
        pnlPercentage: 4.63,
        investmentType: "equity",
        purchaseDate: "2022-06-15",
        holdingPeriod: 520,
        taxCategory: "LTCG",
      },
    ]

    const mockTaxOpportunities: TaxOpportunity[] = [
      {
        id: "1",
        type: "loss_harvesting",
        priority: "high",
        potentialSavings: 18500,
        description: "Offset INFY gains with HDFC losses",
        actionRequired: "Sell HDFC before March 31st to harvest tax loss",
        deadline: "2024-03-31",
        stocks: {
          sell: { symbol: "HDFC", quantity: 75, currentLoss: -5231.25 },
          offset: { symbol: "INFY", quantity: 50, currentGain: 6575 },
        },
      },
      {
        id: "2",
        type: "gain_booking",
        priority: "medium",
        potentialSavings: 2100,
        description: "Book LTCG gains under ₹1L exemption",
        actionRequired: "Consider booking INFY gains to utilize LTCG exemption",
        stocks: {
          sell: { symbol: "INFY", quantity: 50, currentLoss: 6575 },
        },
      },
      {
        id: "3",
        type: "wash_sale_warning",
        priority: "low",
        potentialSavings: 0,
        description: "Wash sale rule violation risk",
        actionRequired: "Wait 30 days before repurchasing HDFC if sold for tax loss",
        stocks: {
          sell: { symbol: "HDFC", quantity: 75, currentLoss: -5231.25 },
        },
      },
    ]

    const mockBrokerConnections: BrokerConnection[] = [
      {
        id: "1",
        name: "Zerodha",
        status: "connected",
        lastSync: "2024-01-15T10:30:00Z",
        portfolioValue: 252075,
        accountCount: 1,
      },
      {
        id: "2",
        name: "Upstox",
        status: "connected",
        lastSync: "2024-01-15T10:25:00Z",
        portfolioValue: 159025,
        accountCount: 1,
      },
      {
        id: "3",
        name: "Groww",
        status: "syncing",
        lastSync: "2024-01-15T09:45:00Z",
        portfolioValue: 118518.75,
        accountCount: 1,
      },
      {
        id: "4",
        name: "AngelOne",
        status: "connected",
        lastSync: "2024-01-15T10:35:00Z",
        portfolioValue: 297150,
        accountCount: 2,
      },
    ]

    setPortfolioData(mockPortfolioData)
    setTaxOpportunities(mockTaxOpportunities)
    setBrokerConnections(mockBrokerConnections)

    // Calculate totals
    const totalValue = mockPortfolioData.reduce((sum, item) => sum + item.quantity * item.currentPrice, 0)
    const totalPnLValue = mockPortfolioData.reduce((sum, item) => sum + item.pnl, 0)
    const totalSavings = mockTaxOpportunities.reduce((sum, item) => sum + item.potentialSavings, 0)

    setTotalPortfolioValue(totalValue)
    setTotalPnL(totalPnLValue)
    setPotentialTaxSavings(totalSavings)
    setIsLoading(false)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatCurrencyCompact = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`
    return `₹${amount.toFixed(0)}`
  }

  const getBrokerStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800"
      case "syncing":
        return "bg-blue-100 text-blue-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const syncAllBrokers = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  const text = {
    en: {
      dashboard: "Dashboard",
      portfolio: "Portfolio",
      taxOptimizer: "Tax Optimizer",
      brokers: "Brokers",
      reports: "Reports",
      settings: "Settings",
      totalValue: "Total Portfolio Value",
      totalPnL: "Total P&L",
      taxSavings: "Potential Tax Savings",
      syncAll: "Sync All Brokers",
      lastUpdated: "Last Updated",
      opportunities: "Tax Opportunities",
      holdings: "Holdings",
      performance: "Performance",
      alerts: "Alerts",
    },
    gu: {
      dashboard: "ડેશબોર્ડ",
      portfolio: "પોર્ટફોલિયો",
      taxOptimizer: "ટેક્સ ઓપ્ટિમાઇઝર",
      brokers: "બ્રોકર્સ",
      reports: "રિપોર્ટ્સ",
      settings: "સેટિંગ્સ",
      totalValue: "કુલ પોર્ટફોલિયો વેલ્યુ",
      totalPnL: "કુલ નફો-નુકસાન",
      taxSavings: "સંભવિત ટેક્સ બચત",
      syncAll: "બધા બ્રોકર્સ સિંક કરો",
      lastUpdated: "છેલ્લે અપડેટ",
      opportunities: "ટેક્સ તકો",
      holdings: "હોલ્ડિંગ્સ",
      performance: "પ્રદર્શન",
      alerts: "અલર્ટ્સ",
    },
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <RefreshCw className="h-8 w-8 animate-spin text-orange-600 mx-auto" />
          <p className="text-gray-600">Loading your portfolio...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-orange-600" />
                <h1 className="text-2xl font-bold text-gray-900">TaxSync Pro</h1>
              </div>
              <Badge variant="outline" className="text-orange-600 border-orange-200">
                CA Dashboard
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-md p-1">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    language === "en" ? "bg-white text-orange-600 shadow-sm" : "text-gray-600"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage("gu")}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    language === "gu" ? "bg-white text-orange-600 shadow-sm" : "text-gray-600"
                  }`}
                >
                  ગુજરાતી
                </button>
              </div>

              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                {text[language].alerts}
              </Button>

              <Button onClick={syncAllBrokers} disabled={isLoading} size="sm">
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                {text[language].syncAll}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-6 space-y-2">
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-orange-50 text-orange-700 font-medium"
            >
              <BarChart3 className="h-5 w-5" />
              <span>{text[language].dashboard}</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
              <PieChart className="h-5 w-5" />
              <span>{text[language].portfolio}</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
              <AlertTriangle className="h-5 w-5" />
              <span>{text[language].taxOptimizer}</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
              <Globe className="h-5 w-5" />
              <span>{text[language].brokers}</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
              <Download className="h-5 w-5" />
              <span>{text[language].reports}</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
              <Settings className="h-5 w-5" />
              <span>{text[language].settings}</span>
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{text[language].totalValue}</p>
                    <p className="text-3xl font-bold text-gray-900">{formatCurrencyCompact(totalPortfolioValue)}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+2.4% from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{text[language].totalPnL}</p>
                    <p className={`text-3xl font-bold ${totalPnL >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {formatCurrencyCompact(totalPnL)}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      totalPnL >= 0 ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {totalPnL >= 0 ? (
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    ) : (
                      <TrendingDown className="h-6 w-6 text-red-600" />
                    )}
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span className={`text-sm ${totalPnL >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {((totalPnL / (totalPortfolioValue - totalPnL)) * 100).toFixed(2)}% overall return
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{text[language].taxSavings}</p>
                    <p className="text-3xl font-bold text-orange-600">{formatCurrencyCompact(potentialTaxSavings)}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span className="text-sm text-orange-600">{taxOpportunities.length} opportunities available</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="opportunities">{text[language].opportunities}</TabsTrigger>
              <TabsTrigger value="holdings">{text[language].holdings}</TabsTrigger>
              <TabsTrigger value="brokers">{text[language].brokers}</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Tax Opportunities */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                      Priority Tax Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {taxOpportunities.slice(0, 3).map((opportunity) => (
                      <div key={opportunity.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <Badge className={getPriorityColor(opportunity.priority)}>{opportunity.priority}</Badge>
                          <span className="text-sm font-semibold text-green-600">
                            Save {formatCurrencyCompact(opportunity.potentialSavings)}
                          </span>
                        </div>
                        <h4 className="font-medium text-gray-900 mb-1">{opportunity.description}</h4>
                        <p className="text-sm text-gray-600 mb-2">{opportunity.actionRequired}</p>
                        {opportunity.deadline && (
                          <div className="flex items-center text-xs text-red-600">
                            <Calendar className="h-3 w-3 mr-1" />
                            Deadline: {new Date(opportunity.deadline).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Portfolio Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
                      {text[language].performance}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">STCG Holdings</span>
                        <span className="text-sm font-medium">
                          {formatCurrencyCompact(
                            portfolioData
                              .filter((item) => item.taxCategory === "STCG")
                              .reduce((sum, item) => sum + item.quantity * item.currentPrice, 0),
                          )}
                        </span>
                      </div>
                      <Progress
                        value={
                          (portfolioData
                            .filter((item) => item.taxCategory === "STCG")
                            .reduce((sum, item) => sum + item.quantity * item.currentPrice, 0) /
                            totalPortfolioValue) *
                          100
                        }
                        className="h-2"
                      />

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">LTCG Holdings</span>
                        <span className="text-sm font-medium">
                          {formatCurrencyCompact(
                            portfolioData
                              .filter((item) => item.taxCategory === "LTCG")
                              .reduce((sum, item) => sum + item.quantity * item.currentPrice, 0),
                          )}
                        </span>
                      </div>
                      <Progress
                        value={
                          (portfolioData
                            .filter((item) => item.taxCategory === "LTCG")
                            .reduce((sum, item) => sum + item.quantity * item.currentPrice, 0) /
                            totalPortfolioValue) *
                          100
                        }
                        className="h-2"
                      />

                      <div className="pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <p className="text-2xl font-bold text-green-600">
                              {portfolioData.filter((item) => item.pnl > 0).length}
                            </p>
                            <p className="text-xs text-gray-600">Profitable</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-red-600">
                              {portfolioData.filter((item) => item.pnl < 0).length}
                            </p>
                            <p className="text-xs text-gray-600">Loss Making</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="opportunities" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tax Optimization Opportunities</CardTitle>
                  <p className="text-sm text-gray-600">AI-powered recommendations to minimize your tax liability</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {taxOpportunities.map((opportunity) => (
                      <div key={opportunity.id} className="p-6 border border-gray-200 rounded-lg">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <Badge className={getPriorityColor(opportunity.priority)}>{opportunity.priority}</Badge>
                            <Badge variant="outline">{opportunity.type.replace("_", " ")}</Badge>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600">
                              Save {formatCurrency(opportunity.potentialSavings)}
                            </p>
                            {opportunity.deadline && (
                              <p className="text-xs text-red-600">
                                Due: {new Date(opportunity.deadline).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{opportunity.description}</h3>
                        <p className="text-gray-600 mb-4">{opportunity.actionRequired}</p>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">Recommended Action:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-red-600">Sell:</p>
                              <p className="text-sm">
                                {opportunity.stocks.sell.symbol} - {opportunity.stocks.sell.quantity} shares
                              </p>
                              <p className="text-sm text-red-600">
                                Current Loss: {formatCurrency(opportunity.stocks.sell.currentLoss)}
                              </p>
                            </div>
                            {opportunity.stocks.offset && (
                              <div>
                                <p className="text-sm font-medium text-green-600">To Offset:</p>
                                <p className="text-sm">
                                  {opportunity.stocks.offset.symbol} - {opportunity.stocks.offset.quantity} shares
                                </p>
                                <p className="text-sm text-green-600">
                                  Current Gain: {formatCurrency(opportunity.stocks.offset.currentGain)}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-end space-x-2 mt-4">
                          <Button variant="outline" size="sm">
                            Learn More
                          </Button>
                          <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                            Execute Trade
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="holdings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Holdings</CardTitle>
                  <p className="text-sm text-gray-600">Complete view of your multi-broker portfolio</p>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Stock</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Broker</th>
                          <th className="text-right py-3 px-4 font-medium text-gray-900">Qty</th>
                          <th className="text-right py-3 px-4 font-medium text-gray-900">Avg Price</th>
                          <th className="text-right py-3 px-4 font-medium text-gray-900">Current Price</th>
                          <th className="text-right py-3 px-4 font-medium text-gray-900">P&L</th>
                          <th className="text-center py-3 px-4 font-medium text-gray-900">Tax Category</th>
                        </tr>
                      </thead>
                      <tbody>
                        {portfolioData.map((holding) => (
                          <tr key={holding.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="font-medium text-gray-900">{holding.symbol}</div>
                              <div className="text-sm text-gray-500 capitalize">{holding.investmentType}</div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge variant="outline" className="capitalize">
                                {holding.broker}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-right">{holding.quantity}</td>
                            <td className="py-3 px-4 text-right">{formatCurrency(holding.avgPrice)}</td>
                            <td className="py-3 px-4 text-right">{formatCurrency(holding.currentPrice)}</td>
                            <td className="py-3 px-4 text-right">
                              <div className={`font-medium ${holding.pnl >= 0 ? "text-green-600" : "text-red-600"}`}>
                                {formatCurrency(holding.pnl)}
                              </div>
                              <div className={`text-sm ${holding.pnl >= 0 ? "text-green-600" : "text-red-600"}`}>
                                ({holding.pnlPercentage >= 0 ? "+" : ""}
                                {holding.pnlPercentage.toFixed(2)}%)
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Badge
                                className={
                                  holding.taxCategory === "LTCG"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-orange-100 text-orange-800"
                                }
                              >
                                {holding.taxCategory}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="brokers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Broker Connections</CardTitle>
                  <p className="text-sm text-gray-600">Manage your broker integrations and sync status</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {brokerConnections.map((broker) => (
                      <div key={broker.id} className="p-6 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <span className="font-bold text-gray-600">{broker.name.charAt(0)}</span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{broker.name}</h3>
                              <p className="text-sm text-gray-500">{broker.accountCount} account(s)</p>
                            </div>
                          </div>
                          <Badge className={getBrokerStatusColor(broker.status)}>
                            {broker.status === "syncing" && <RefreshCw className="h-3 w-3 mr-1 animate-spin" />}
                            {broker.status}
                          </Badge>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Portfolio Value:</span>
                            <span className="text-sm font-medium">{formatCurrencyCompact(broker.portfolioValue)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Last Sync:</span>
                            <span className="text-sm font-medium">{new Date(broker.lastSync).toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="flex space-x-2 mt-4">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Sync Now
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Add New Broker</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Connect additional brokers to get a complete view of your portfolio
                    </p>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Connect Broker
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
