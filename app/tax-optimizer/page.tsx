"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { TaxOpportunityCard } from "@/components/tax-optimizer/tax-opportunity-card"
import {
  TrendingUp,
  CheckCircle,
  Clock,
  Calculator,
  Download,
  Lightbulb,
  Target,
  Shield,
  Zap,
  Brain,
  Globe,
  Loader2,
} from "lucide-react"

interface TaxOpportunity {
  id: string
  type: "loss_harvesting" | "ltcg_exemption" | "wash_sale_warning" | "year_end_planning"
  priority: "high" | "medium" | "low"
  title: string
  description: string
  potentialSavings: number
  actionRequired: string
  deadline?: string
  riskLevel: "low" | "medium" | "high"
  implemented: boolean
}

interface TaxInsight {
  id: string
  title: string
  description: string
  impact: "positive" | "negative" | "neutral"
  value?: number | string
  category: "performance" | "tax" | "risk" | "opportunity"
}

interface TaxScenario {
  id: string
  name: string
  description: string
  potentialSavings: number
  riskLevel: "low" | "medium" | "high"
  strategies: string[]
  timeline: string
}

export default function TaxOptimizerPage() {
  const [opportunities, setOpportunities] = useState<TaxOpportunity[]>([])
  const [insights, setInsights] = useState<TaxInsight[]>([])
  const [scenarios, setScenarios] = useState<TaxScenario[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const [selectedBroker, setSelectedBroker] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("fy2023-24")
  const [gujaratiMode, setGujaratiMode] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(true)

  // Summary metrics
  const [summary, setSummary] = useState({
    potentialSavings: 0,
    implementedSavings: 0,
    taxEfficiencyScore: 0,
    opportunitiesCount: 0,
  })

  useEffect(() => {
    fetchTaxOptimizationData()
  }, [selectedBroker, selectedPeriod])

  const fetchTaxOptimizationData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/tax-optimizer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          broker: selectedBroker,
          period: selectedPeriod,
          language: gujaratiMode ? "gu" : "en",
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setOpportunities(data.opportunities || [])
        setInsights(data.insights || [])
        setScenarios(data.scenarios || [])
        setSummary(data.summary || {})
      }
    } catch (error) {
      console.error("Error fetching tax optimization data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const generatePDFReport = async () => {
    setIsGeneratingReport(true)
    try {
      const response = await fetch("/api/tax-optimizer/generate-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          opportunities,
          insights,
          scenarios,
          summary,
          language: gujaratiMode ? "gu" : "en",
        }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.style.display = "none"
        a.href = url
        a.download = `tax-optimization-report-${new Date().toISOString().split("T")[0]}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
      } else {
        throw new Error("Failed to generate report")
      }
    } catch (error) {
      console.error("Error generating PDF report:", error)
      alert("Failed to generate report. Please try again.")
    } finally {
      setIsGeneratingReport(false)
    }
  }

  const implementOpportunity = async (opportunityId: string) => {
    setOpportunities((prev) => prev.map((opp) => (opp.id === opportunityId ? { ...opp, implemented: true } : opp)))
  }

  const text = {
    en: {
      title: "AI Tax Optimizer",
      subtitle: "Maximize tax savings with intelligent recommendations",
      generateReport: "Generate PDF Report",
      potentialSavings: "Potential Savings",
      implementedSavings: "Implemented Savings",
      taxEfficiency: "Tax Efficiency Score",
      opportunities: "Opportunities",
      taxOpportunities: "Tax Optimization Opportunities",
      keyInsights: "Key Tax Insights",
      recommendedScenarios: "Recommended Tax Scenarios",
      settings: "Settings",
      broker: "Broker",
      period: "Period",
      language: "Gujarati Mode",
      autoRefresh: "Auto Refresh",
      allBrokers: "All Brokers",
      priority: "Priority",
      savings: "Savings",
      implement: "Implement",
      implemented: "Implemented",
      riskLevel: "Risk Level",
      strategies: "Strategies",
      timeline: "Timeline",
    },
    gu: {
      title: "AI ટેક્સ ઓપ્ટિમાઇઝર",
      subtitle: "બુદ્ધિશાળી ભલામણો સાથે ટેક્સ બચત વધારો",
      generateReport: "PDF રિપોર્ટ બનાવો",
      potentialSavings: "સંભવિત બચત",
      implementedSavings: "અમલમાં મૂકાયેલ બચત",
      taxEfficiency: "ટેક્સ કાર્યક્ષમતા સ્કોર",
      opportunities: "તકો",
      taxOpportunities: "ટેક્સ ઓપ્ટિમાઇઝેશન તકો",
      keyInsights: "મુખ્ય ટેક્સ અંતર્દૃષ્ટિ",
      recommendedScenarios: "ભલામણ કરેલ ટેક્સ સ્થિતિઓ",
      settings: "સેટિંગ્સ",
      broker: "બ્રોકર",
      period: "સમયગાળો",
      language: "ગુજરાતી મોડ",
      autoRefresh: "ઓટો રિફ્રેશ",
      allBrokers: "બધા બ્રોકર્સ",
      priority: "પ્રાથમિકતા",
      savings: "બચત",
      implement: "અમલ કરો",
      implemented: "અમલમાં મૂક્યું",
      riskLevel: "જોખમ સ્તર",
      strategies: "વ્યૂહરચનાઓ",
      timeline: "સમયરેખા",
    },
  }

  const t = text[gujaratiMode ? "gu" : "en"]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const getInsightIcon = (category: string) => {
    switch (category) {
      case "performance":
        return <TrendingUp className="h-5 w-5" />
      case "tax":
        return <Calculator className="h-5 w-5" />
      case "risk":
        return <Shield className="h-5 w-5" />
      case "opportunity":
        return <Target className="h-5 w-5" />
      default:
        return <Lightbulb className="h-5 w-5" />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tax optimization data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
                <p className="text-gray-600">{t.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-gray-500" />
                <Switch checked={gujaratiMode} onCheckedChange={setGujaratiMode} />
                <Label className="text-sm text-gray-600">{t.language}</Label>
              </div>
              <Button
                onClick={generatePDFReport}
                disabled={isGeneratingReport}
                className="bg-orange-600 hover:bg-orange-700"
              >
                {isGeneratingReport ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                {t.generateReport}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t.potentialSavings}</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {formatCurrency(summary.potentialSavings || 62000)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-sm text-green-600">+12% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t.implementedSavings}</p>
                  <p className="text-3xl font-bold text-green-600">
                    {formatCurrency(summary.implementedSavings || 8500)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-sm text-green-600">14% of potential</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t.taxEfficiency}</p>
                  <p className="text-3xl font-bold text-blue-600">{summary.taxEfficiencyScore || 68}/100</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <Progress value={summary.taxEfficiencyScore || 68} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t.opportunities}</p>
                  <p className="text-3xl font-bold text-purple-600">{opportunities.length}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-sm text-purple-600">
                  {opportunities.filter((o) => o.priority === "high").length} high priority
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="opportunities" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="opportunities">{t.taxOpportunities}</TabsTrigger>
            <TabsTrigger value="insights">{t.keyInsights}</TabsTrigger>
            <TabsTrigger value="scenarios">{t.recommendedScenarios}</TabsTrigger>
            <TabsTrigger value="settings">{t.settings}</TabsTrigger>
          </TabsList>

          <TabsContent value="opportunities" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {opportunities.map((opportunity) => (
                <TaxOpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  onImplement={implementOpportunity}
                  language={gujaratiMode ? "gu" : "en"}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {insights.map((insight) => (
                <Card key={insight.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          insight.impact === "positive"
                            ? "bg-green-100 text-green-600"
                            : insight.impact === "negative"
                              ? "bg-red-100 text-red-600"
                              : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {getInsightIcon(insight.category)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{insight.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{insight.description}</p>
                        {insight.value && (
                          <div className="text-lg font-bold text-gray-900">
                            {typeof insight.value === "number" && insight.value > 1000
                              ? formatCurrency(insight.value)
                              : insight.value}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="scenarios" className="space-y-6">
            <div className="space-y-6">
              {scenarios.map((scenario) => (
                <Card key={scenario.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{scenario.name}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge className={getRiskColor(scenario.riskLevel)}>
                          {t.riskLevel}: {scenario.riskLevel.toUpperCase()}
                        </Badge>
                        <Badge className="bg-green-100 text-green-800">
                          {t.savings}: {formatCurrency(scenario.potentialSavings)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{scenario.description}</p>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">{t.strategies}:</h4>
                        <ul className="space-y-1">
                          {scenario.strategies.map((strategy, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                              {strategy}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        {t.timeline}: {scenario.timeline}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.settings}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="broker">{t.broker}</Label>
                    <Select value={selectedBroker} onValueChange={setSelectedBroker}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select broker" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t.allBrokers}</SelectItem>
                        <SelectItem value="zerodha">Zerodha</SelectItem>
                        <SelectItem value="upstox">Upstox</SelectItem>
                        <SelectItem value="groww">Groww</SelectItem>
                        <SelectItem value="angelone">AngelOne</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="period">{t.period}</Label>
                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fy2023-24">FY 2023-24</SelectItem>
                        <SelectItem value="fy2022-23">FY 2022-23</SelectItem>
                        <SelectItem value="q4-2023-24">Q4 2023-24</SelectItem>
                        <SelectItem value="q3-2023-24">Q3 2023-24</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">{t.autoRefresh}</Label>
                    <p className="text-sm text-gray-600">Automatically refresh data every 5 minutes</p>
                  </div>
                  <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
                </div>

                <Button onClick={fetchTaxOptimizationData} className="w-full">
                  Refresh Data
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
