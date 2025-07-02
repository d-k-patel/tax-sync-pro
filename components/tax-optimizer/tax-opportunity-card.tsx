"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingDown, AlertTriangle, CheckCircle, Clock, Shield, Target, Zap } from "lucide-react"

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

interface TaxOpportunityCardProps {
  opportunity: TaxOpportunity
  onImplement: (id: string) => void
  language: "en" | "gu"
}

export function TaxOpportunityCard({ opportunity, onImplement, language }: TaxOpportunityCardProps) {
  const text = {
    en: {
      implement: "Implement",
      implemented: "Implemented",
      savings: "Savings",
      priority: "Priority",
      riskLevel: "Risk Level",
      deadline: "Deadline",
      actionRequired: "Action Required",
      high: "High",
      medium: "Medium",
      low: "Low",
    },
    gu: {
      implement: "અમલ કરો",
      implemented: "અમલમાં મૂક્યું",
      savings: "બચત",
      priority: "પ્રાથમિકતા",
      riskLevel: "જોખમ સ્તર",
      deadline: "સમયમર્યાદા",
      actionRequired: "જરૂરી પગલાં",
      high: "ઉચ્ચ",
      medium: "મધ્યમ",
      low: "નીચું",
    },
  }

  const t = text[language]

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "loss_harvesting":
        return <TrendingDown className="h-5 w-5 text-red-600" />
      case "ltcg_exemption":
        return <Shield className="h-5 w-5 text-green-600" />
      case "wash_sale_warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "year_end_planning":
        return <Target className="h-5 w-5 text-blue-600" />
      default:
        return <Zap className="h-5 w-5 text-purple-600" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "loss_harvesting":
        return "bg-red-50 border-red-200"
      case "ltcg_exemption":
        return "bg-green-50 border-green-200"
      case "wash_sale_warning":
        return "bg-yellow-50 border-yellow-200"
      case "year_end_planning":
        return "bg-blue-50 border-blue-200"
      default:
        return "bg-purple-50 border-purple-200"
    }
  }

  return (
    <Card className={`${getTypeColor(opportunity.type)} ${opportunity.implemented ? "opacity-75" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
              {getTypeIcon(opportunity.type)}
            </div>
            <div>
              <CardTitle className="text-lg">{opportunity.title}</CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className={getPriorityColor(opportunity.priority)}>
                  {t.priority}: {t[opportunity.priority as keyof typeof t] || opportunity.priority}
                </Badge>
                <Badge variant="outline" className={getRiskColor(opportunity.riskLevel)}>
                  {t.riskLevel}: {t[opportunity.riskLevel as keyof typeof t] || opportunity.riskLevel}
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">{formatCurrency(opportunity.potentialSavings)}</div>
            <div className="text-sm text-gray-600">{t.savings}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-700">{opportunity.description}</p>

        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <Target className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium text-sm text-gray-900">{t.actionRequired}</div>
              <div className="text-sm text-gray-600">{opportunity.actionRequired}</div>
            </div>
          </div>

          {opportunity.deadline && (
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <div>
                <span className="font-medium text-sm text-gray-900">{t.deadline}: </span>
                <span className="text-sm text-gray-600">
                  {new Date(opportunity.deadline).toLocaleDateString("en-IN")}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="pt-2">
          {opportunity.implemented ? (
            <Button disabled className="w-full bg-transparent" variant="outline">
              <CheckCircle className="h-4 w-4 mr-2" />
              {t.implemented}
            </Button>
          ) : (
            <Button
              onClick={() => onImplement(opportunity.id)}
              className="w-full"
              variant={opportunity.priority === "high" ? "default" : "outline"}
            >
              <Zap className="h-4 w-4 mr-2" />
              {t.implement}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
