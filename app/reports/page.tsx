"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Calendar, Filter, Search, TrendingUp, PieChart, Calculator, Loader2 } from "lucide-react"

interface GeneratedReport {
  id: string
  report_type: string
  report_data: any
  file_size: number
  language: string
  created_at: string
}

export default function ReportsPage() {
  const [reports, setReports] = useState<GeneratedReport[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    setIsLoading(true)
    try {
      // Mock data for now - in production, fetch from Supabase
      const mockReports: GeneratedReport[] = [
        {
          id: "1",
          report_type: "tax_optimization",
          report_data: {
            opportunities_count: 4,
            potential_savings: 62000,
            tax_efficiency_score: 68,
          },
          file_size: 245760,
          language: "en",
          created_at: "2024-01-15T10:30:00Z",
        },
        {
          id: "2",
          report_type: "portfolio_analysis",
          report_data: {
            total_value: 2400000,
            ytd_return: 12.5,
            risk_score: 7.2,
          },
          file_size: 189440,
          language: "en",
          created_at: "2024-01-10T14:20:00Z",
        },
      ]
      setReports(mockReports)
    } catch (error) {
      console.error("Error fetching reports:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateTaxOptimizationReport = async () => {
    setIsGenerating(true)
    try {
      // First fetch the tax optimization data
      const dataResponse = await fetch("/api/tax-optimizer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          broker: "all",
          period: "fy2023-24",
          language: "en",
        }),
      })

      if (!dataResponse.ok) {
        throw new Error("Failed to fetch tax optimization data")
      }

      const data = await dataResponse.json()

      // Then generate the PDF report
      const reportResponse = await fetch("/api/tax-optimizer/generate-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          opportunities: data.opportunities,
          insights: data.insights,
          scenarios: data.scenarios,
          summary: data.summary,
          language: "en",
        }),
      })

      if (reportResponse.ok) {
        const blob = await reportResponse.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.style.display = "none"
        a.href = url
        a.download = `tax-optimization-report-${new Date().toISOString().split("T")[0]}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)

        // Refresh reports list
        fetchReports()
      } else {
        throw new Error("Failed to generate report")
      }
    } catch (error) {
      console.error("Error generating tax optimization report:", error)
      alert("Failed to generate report. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    const sizes = ["Bytes", "KB", "MB", "GB"]
    if (bytes === 0) return "0 Bytes"
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getReportIcon = (type: string) => {
    switch (type) {
      case "tax_optimization":
        return <Calculator className="h-5 w-5 text-orange-600" />
      case "portfolio_analysis":
        return <PieChart className="h-5 w-5 text-blue-600" />
      case "performance_report":
        return <TrendingUp className="h-5 w-5 text-green-600" />
      default:
        return <FileText className="h-5 w-5 text-gray-600" />
    }
  }

  const getReportTitle = (type: string) => {
    switch (type) {
      case "tax_optimization":
        return "Tax Optimization Report"
      case "portfolio_analysis":
        return "Portfolio Analysis Report"
      case "performance_report":
        return "Performance Report"
      default:
        return "Report"
    }
  }

  const filteredReports = reports.filter((report) => {
    const matchesSearch = getReportTitle(report.report_type).toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || report.report_type === filterType
    return matchesSearch && matchesFilter
  })

  const reportTemplates = [
    {
      id: "tax_optimization",
      title: "Tax Optimization Report",
      description: "Comprehensive tax planning analysis with AI-powered recommendations",
      icon: <Calculator className="h-8 w-8 text-orange-600" />,
      color: "border-orange-200 bg-orange-50",
      action: generateTaxOptimizationReport,
    },
    {
      id: "portfolio_analysis",
      title: "Portfolio Analysis Report",
      description: "Detailed portfolio performance and risk analysis",
      icon: <PieChart className="h-8 w-8 text-blue-600" />,
      color: "border-blue-200 bg-blue-50",
      action: () => alert("Portfolio Analysis report coming soon!"),
    },
    {
      id: "performance_report",
      title: "Performance Report",
      description: "Monthly/quarterly performance summary with benchmarks",
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      color: "border-green-200 bg-green-50",
      action: () => alert("Performance report coming soon!"),
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
                <p className="text-gray-600">Generate and manage professional reports</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Report Templates */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Report Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reportTemplates.map((template) => (
              <Card key={template.id} className={`${template.color} border-2 hover:shadow-lg transition-shadow`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      {template.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{template.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                  <Button
                    onClick={template.action}
                    className="w-full"
                    disabled={isGenerating && template.id === "tax_optimization"}
                  >
                    {isGenerating && template.id === "tax_optimization" ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4 mr-2" />
                    )}
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Report History */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Report History</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="tax_optimization">Tax Optimization</SelectItem>
                  <SelectItem value="portfolio_analysis">Portfolio Analysis</SelectItem>
                  <SelectItem value="performance_report">Performance Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading reports...</p>
            </div>
          ) : filteredReports.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || filterType !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "Generate your first report using the templates above"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <Card key={report.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          {getReportIcon(report.report_type)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{getReportTitle(report.report_type)}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDate(report.created_at)}
                            </span>
                            <span>{formatFileSize(report.file_size)}</span>
                            <Badge variant="outline">{report.language.toUpperCase()}</Badge>
                          </div>
                          {report.report_data && (
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                              {report.report_type === "tax_optimization" && (
                                <>
                                  <span>{report.report_data.opportunities_count} opportunities</span>
                                  <span>₹{report.report_data.potential_savings?.toLocaleString()} savings</span>
                                  <span>{report.report_data.tax_efficiency_score}% efficiency</span>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
