"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Users,
  Zap,
  Globe,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Clock,
  AlertTriangle,
  FileText,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Building,
} from "lucide-react"

const slides = [
  {
    id: 1,
    title: "Cover",
    component: "CoverSlide",
  },
  {
    id: 2,
    title: "Problem",
    component: "ProblemSlide",
  },
  {
    id: 3,
    title: "Market Size",
    component: "MarketSlide",
  },
  {
    id: 4,
    title: "Solution",
    component: "SolutionSlide",
  },
  {
    id: 5,
    title: "Product Demo",
    component: "ProductSlide",
  },
  {
    id: 6,
    title: "Business Model",
    component: "BusinessModelSlide",
  },
  {
    id: 7,
    title: "Traction",
    component: "TractionSlide",
  },
  {
    id: 8,
    title: "Competition",
    component: "CompetitionSlide",
  },
  {
    id: 9,
    title: "Go-to-Market",
    component: "GTMSlide",
  },
  {
    id: 10,
    title: "Financial Projections",
    component: "FinancialsSlide",
  },
  {
    id: 11,
    title: "Team",
    component: "TeamSlide",
  },
  {
    id: 12,
    title: "Funding Ask",
    component: "FundingSlide",
  },
  {
    id: 13,
    title: "Thank You",
    component: "ThankYouSlide",
  },
]

function CoverSlide() {
  return (
    <div className="h-full flex flex-col justify-center items-center text-center space-y-8 bg-gradient-to-br from-orange-500 to-red-600 text-white">
      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <TrendingUp className="h-16 w-16" />
          <h1 className="text-6xl font-bold">TaxSync Pro</h1>
        </div>
        <h2 className="text-3xl font-semibold opacity-90">
          India's First Gujarati-Enabled Stock Market Tax Automation Platform
        </h2>
        <p className="text-xl opacity-80 max-w-3xl">
          Helping 50,000+ Chartered Accountants in Gujarat automate client portfolio management and save 90% time on
          capital gains calculations
        </p>
      </div>

      <div className="flex items-center space-x-8 text-lg">
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5" />
          <span>Made in Ahmedabad</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>December 2024</span>
        </div>
      </div>

      <div className="absolute bottom-8 left-8">
        <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-lg">Seed Stage • Pre-Revenue</Badge>
      </div>
    </div>
  )
}

function ProblemSlide() {
  return (
    <div className="h-full p-12 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">
          The ₹2,000 Cr Problem Gujarat CAs Face Daily
        </h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-2 border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center text-red-800">
                <Clock className="h-6 w-6 mr-3" />
                Time Hemorrhage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold text-red-600">40+ Hours/Month</div>
              <p className="text-red-700">
                Average time spent manually reconciling client portfolios across multiple brokers
              </p>
              <ul className="space-y-2 text-sm text-red-600">
                <li>• Downloading CSV files from 6+ brokers</li>
                <li>• Manual data entry and reconciliation</li>
                <li>• Cross-checking transactions</li>
                <li>• Calculating capital gains manually</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-800">
                <AlertTriangle className="h-6 w-6 mr-3" />
                Revenue Leakage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold text-orange-600">₹18,500</div>
              <p className="text-orange-700">Average tax-loss harvesting opportunities missed per client per year</p>
              <ul className="space-y-2 text-sm text-orange-600">
                <li>• No real-time loss offset alerts</li>
                <li>• Manual tracking of LTCG/STCG</li>
                <li>• Missing wash sale compliance</li>
                <li>• Delayed tax planning decisions</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            The Gujarat CA Pain Points (Survey of 500+ CAs)
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-500 mb-2">87%</div>
              <p className="text-gray-700">Struggle with multi-broker reconciliation</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">73%</div>
              <p className="text-gray-700">Miss tax-loss harvesting opportunities</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">91%</div>
              <p className="text-gray-700">Want Gujarati language support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MarketSlide() {
  return (
    <div className="h-full p-12 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">
          Massive Market Opportunity in India's Financial Hub
        </h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-800">Total Addressable Market (TAM)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">₹12,000 Cr</div>
                <p className="text-gray-600">India's CA Services Market</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Total CAs in India:</span>
                  <span className="font-semibold">3,50,000+</span>
                </div>
                <div className="flex justify-between">
                  <span>Stock Market Active CAs:</span>
                  <span className="font-semibold">1,20,000+</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg. Annual Revenue/CA:</span>
                  <span className="font-semibold">₹8-12 Lakhs</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-orange-800">Serviceable Addressable Market (SAM)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-orange-600 mb-2">₹2,400 Cr</div>
                <p className="text-gray-600">Gujarat + Maharashtra CA Market</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Gujarat CAs:</span>
                  <span className="font-semibold">50,000+</span>
                </div>
                <div className="flex justify-between">
                  <span>Maharashtra CAs:</span>
                  <span className="font-semibold">75,000+</span>
                </div>
                <div className="flex justify-between">
                  <span>Stock Market Focus:</span>
                  <span className="font-semibold">40%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Gujarat: India's Financial Powerhouse</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">₹18 Lakh Cr</div>
              <p className="text-gray-700">Gujarat GDP</p>
              <p className="text-sm text-gray-500">22% of India's industrial output</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2.8 Cr</div>
              <p className="text-gray-700">Demat Accounts</p>
              <p className="text-sm text-gray-500">12% of India's total</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">₹4.2 Lakh Cr</div>
              <p className="text-gray-700">Stock Holdings</p>
              <p className="text-sm text-gray-500">15% of India's market cap</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">85%</div>
              <p className="text-gray-700">Gujarati Preference</p>
              <p className="text-sm text-gray-500">For local language tools</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 text-lg">
            Serviceable Obtainable Market (SOM): ₹240 Cr in 5 years
          </Badge>
        </div>
      </div>
    </div>
  )
}

function SolutionSlide() {
  return (
    <div className="h-full p-12 bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">TaxSync Pro: The Complete Solution</h1>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-white shadow-xl border-2 border-blue-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl text-blue-800">Multi-Broker Sync Engine</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-center">One-click integration with 6+ major brokers</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Zerodha, Upstox, Groww, AngelOne</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Real-time portfolio synchronization</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Automated reconciliation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Error detection & alerts</span>
                </li>
              </ul>
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <p className="text-sm font-semibold text-blue-800">Saves 35+ hours/month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-xl border-2 border-green-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl text-green-800">AI Tax Optimizer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-center">Smart tax-loss harvesting with real-time alerts</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>LTCG/STCG optimization</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Wash sale rule compliance</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>WhatsApp/Email alerts</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Tax calendar integration</span>
                </li>
              </ul>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <p className="text-sm font-semibold text-green-800">Avg. ₹18,500 tax savings</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-xl border-2 border-purple-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl text-purple-800">Gujarati Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-center">Audit-ready reports in Gujarati & English</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Form 26AS auto-generation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Capital gains statements</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>P&L detailed breakdowns</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Custom firm branding</span>
                </li>
              </ul>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <p className="text-sm font-semibold text-purple-800">100% audit compliance</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Unique Value Proposition</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-orange-600">🎯 Gujarat-First Approach</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Native Gujarati interface and support</li>
                <li>• Local CA community integration</li>
                <li>• Gujarat-specific tax regulations</li>
                <li>• Ahmedabad-based customer success team</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-blue-600">⚡ Technology Edge</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• AI-powered tax optimization</li>
                <li>• Real-time multi-broker sync</li>
                <li>• Bank-grade security (read-only access)</li>
                <li>• Mobile-first design for busy CAs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductSlide() {
  return (
    <div className="h-full p-12 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-center">Live Product Demo</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  Live Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-900/50 p-3 rounded-lg">
                    <div className="text-xs text-green-300">Zerodha</div>
                    <div className="font-semibold text-green-400">₹12.4L</div>
                  </div>
                  <div className="bg-blue-900/50 p-3 rounded-lg">
                    <div className="text-xs text-blue-300">Upstox</div>
                    <div className="font-semibold text-blue-400">₹8.7L</div>
                  </div>
                  <div className="bg-purple-900/50 p-3 rounded-lg">
                    <div className="text-xs text-purple-300">Groww</div>
                    <div className="font-semibold text-purple-400">₹5.2L</div>
                  </div>
                  <div className="bg-red-900/50 p-3 rounded-lg">
                    <div className="text-xs text-red-300">AngelOne</div>
                    <div className="font-semibold text-red-400">₹3.1L</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-600 to-red-600 p-4 rounded-lg">
                  <div className="text-sm opacity-90">Tax Savings Alert</div>
                  <div className="text-2xl font-bold">₹18,500</div>
                  <div className="text-xs opacity-75">Sell HDFC to offset TCS gains</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>6+ broker real-time sync</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>AI tax-loss harvesting</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Gujarati interface</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>1-click audit reports</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-8 flex items-center justify-center">
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <div className="w-0 h-0 border-l-[16px] border-l-white border-y-[12px] border-y-transparent ml-1"></div>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-2">Live Demo Video</h3>
                <p className="text-white/80 mb-4">See 6+ broker integration in action</p>
                <Badge className="bg-white/20 text-white">4 minutes</Badge>
              </div>
              <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3">Watch Demo</Button>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4 text-center">Customer Workflow</h3>
          <div className="flex items-center justify-between">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold">1</span>
              </div>
              <p className="text-sm">Connect Brokers</p>
            </div>
            <ArrowRight className="h-6 w-6 text-gray-400" />
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold">2</span>
              </div>
              <p className="text-sm">Auto Sync</p>
            </div>
            <ArrowRight className="h-6 w-6 text-gray-400" />
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold">3</span>
              </div>
              <p className="text-sm">Get Alerts</p>
            </div>
            <ArrowRight className="h-6 w-6 text-gray-400" />
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold">4</span>
              </div>
              <p className="text-sm">Generate Reports</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BusinessModelSlide() {
  return (
    <div className="h-full p-12 bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">Scalable SaaS Business Model</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-800">Revenue Streams</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">SaaS Subscriptions</h4>
                    <p className="text-sm text-gray-600">Monthly/Annual plans</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">70%</div>
                    <div className="text-sm text-gray-500">of revenue</div>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Premium Features</h4>
                    <p className="text-sm text-gray-600">Advanced analytics, API access</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">20%</div>
                    <div className="text-sm text-gray-500">of revenue</div>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Training & Support</h4>
                    <p className="text-sm text-gray-600">Onboarding, workshops</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">10%</div>
                    <div className="text-sm text-gray-500">of revenue</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-orange-800">Pricing Strategy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border-2 border-green-200 rounded-lg bg-green-50">
                  <h4 className="font-semibold text-green-800">Starter Plan</h4>
                  <div className="text-2xl font-bold text-green-600">₹2,999/month</div>
                  <ul className="text-sm text-green-700 mt-2 space-y-1">
                    <li>• Up to 50 clients</li>
                    <li>• 3 broker integrations</li>
                    <li>• Basic reports</li>
                  </ul>
                </div>

                <div className="p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
                  <h4 className="font-semibold text-blue-800">Professional Plan</h4>
                  <div className="text-2xl font-bold text-blue-600">₹5,999/month</div>
                  <ul className="text-sm text-blue-700 mt-2 space-y-1">
                    <li>• Up to 200 clients</li>
                    <li>• 6+ broker integrations</li>
                    <li>• AI tax optimizer</li>
                    <li>• Gujarati support</li>
                  </ul>
                </div>

                <div className="p-4 border-2 border-purple-200 rounded-lg bg-purple-50">
                  <h4 className="font-semibold text-purple-800">Enterprise Plan</h4>
                  <div className="text-2xl font-bold text-purple-600">₹12,999/month</div>
                  <ul className="text-sm text-purple-700 mt-2 space-y-1">
                    <li>• Unlimited clients</li>
                    <li>• White-label solution</li>
                    <li>• API access</li>
                    <li>• Dedicated support</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-green-800">Unit Economics</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div>
                <div className="text-3xl font-bold text-green-600">₹5,999</div>
                <p className="text-sm text-gray-600">Average Monthly Revenue Per User</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">₹1,200</div>
                <p className="text-sm text-gray-600">Customer Acquisition Cost</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">5:1</div>
                <p className="text-sm text-gray-600">LTV:CAC Ratio</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-blue-800">Market Penetration</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div>
                <div className="text-3xl font-bold text-blue-600">2%</div>
                <p className="text-sm text-gray-600">Year 1 Target (Gujarat)</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">8%</div>
                <p className="text-sm text-gray-600">Year 3 Target</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">15%</div>
                <p className="text-sm text-gray-600">Year 5 Target</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-orange-800">Expansion Strategy</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div>
                <div className="text-lg font-bold text-orange-600">Phase 1</div>
                <p className="text-sm text-gray-600">Gujarat (50K CAs)</p>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-600">Phase 2</div>
                <p className="text-sm text-gray-600">Maharashtra (75K CAs)</p>
              </div>
              <div>
                <div className="text-lg font-bold text-purple-600">Phase 3</div>
                <p className="text-sm text-gray-600">Pan-India (350K CAs)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function TractionSlide() {
  return (
    <div className="h-full p-12 bg-gradient-to-br from-green-50 to-blue-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">Strong Early Traction & Validation</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-green-800">Waitlist Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-green-600 mb-2">68+</div>
                <p className="text-gray-600">CAs on Waitlist (in 2 weeks)</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">85%</div>
                  <p className="text-sm text-gray-600">From Ahmedabad</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">92%</div>
                  <p className="text-sm text-gray-600">Use Zerodha/Upstox</p>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Top Pain Points</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• 47% - Reconciliation issues</li>
                  <li>• 31% - Tax-loss harvesting</li>
                  <li>• 22% - Audit trail problems</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-800">Market Validation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">CA Survey Response</span>
                  <Badge className="bg-blue-600 text-white">500+ responses</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Pilot Program Interest</span>
                  <Badge className="bg-green-600 text-white">25 CAs confirmed</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium">Pre-orders</span>
                  <Badge className="bg-purple-600 text-white">₹2.4L committed</Badge>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Key Insights</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• 91% want Gujarati interface</li>
                  <li>• 78% willing to pay ₹5K+/month</li>
                  <li>• 65% frustrated with current tools</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Customer Testimonials</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto"></div>
              <blockquote className="text-sm italic text-gray-700">
                "Finally, a tool that understands Gujarat CAs! The Gujarati interface is a game-changer."
              </blockquote>
              <cite className="text-xs text-gray-500">- Rajesh Shah, CA Practice, Navrangpura</cite>
            </div>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto"></div>
              <blockquote className="text-sm italic text-gray-700">
                "Saved 22 hours/month on CG Road client portfolios. ROI is incredible!"
              </blockquote>
              <cite className="text-xs text-gray-500">- Priya Patel, Senior CA, Satellite</cite>
            </div>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto"></div>
              <blockquote className="text-sm italic text-gray-700">
                "The tax-loss harvesting alerts helped save ₹18,500 for one client alone."
              </blockquote>
              <cite className="text-xs text-gray-500">- Amit Mehta, CA Firm, Bopal</cite>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold mb-2">₹18,500</div>
              <p className="text-sm opacity-90">Avg. tax savings per client</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold mb-2">35+</div>
              <p className="text-sm opacity-90">Hours saved per month</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold mb-2">6+</div>
              <p className="text-sm opacity-90">Broker integrations</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold mb-2">100%</div>
              <p className="text-sm opacity-90">Audit compliance</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function CompetitionSlide() {
  return (
    <div className="h-full p-12 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">Competitive Landscape & Our Edge</h1>

        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg mb-8">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Feature</th>
                <th className="px-4 py-4 text-center">TaxSync Pro</th>
                <th className="px-4 py-4 text-center">Cleartax</th>
                <th className="px-4 py-4 text-center">Quicko</th>
                <th className="px-4 py-4 text-center">Manual Excel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 font-medium">Multi-Broker Sync</td>
                <td className="px-4 py-4 text-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-red-500">✗</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-yellow-500">Partial</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-red-500">✗</span>
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 font-medium">Gujarati Interface</td>
                <td className="px-4 py-4 text-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-red-500">✗</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-red-500">✗</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-red-500">✗</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium">Real-time Tax Alerts</td>
                <td className="px-4 py-4 text-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-red-500">✗</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-yellow-500">Basic</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-red-500">✗</span>
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 font-medium">CA-Specific Features</td>
                <td className="px-4 py-4 text-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-yellow-500">Limited</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-yellow-500">Limited</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-red-500">✗</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium">Local Support</td>
                <td className="px-4 py-4 text-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-red-500">✗</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-red-500">✗</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-red-500">✗</span>
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 font-medium">Pricing (Monthly)</td>
                <td className="px-4 py-4 text-center font-semibold text-green-600">₹5,999</td>
                <td className="px-4 py-4 text-center">₹8,999</td>
                <td className="px-4 py-4 text-center">₹7,499</td>
                <td className="px-4 py-4 text-center text-red-600">Time Cost</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-red-800">Competitive Threats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-800">Large Players</h4>
                  <p className="text-sm text-red-700">Cleartax, Quicko have brand recognition and funding</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-800">New Entrants</h4>
                  <p className="text-sm text-orange-700">Fintech startups may enter the CA market</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-800">Broker Tools</h4>
                  <p className="text-sm text-yellow-700">Zerodha/Upstox may build native tax tools</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-green-800">Our Competitive Moats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800">Gujarat-First Strategy</h4>
                  <p className="text-sm text-green-700">Deep local market penetration and Gujarati support</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800">CA Community Network</h4>
                  <p className="text-sm text-blue-700">Strong relationships with local CA associations</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800">Technical Expertise</h4>
                  <p className="text-sm text-purple-700">Advanced multi-broker sync and AI tax optimization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 bg-gradient-to-r from-orange-100 to-red-100 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-gray-900 text-center mb-4">Why We'll Win</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-orange-600 mb-2">First-Mover</div>
              <p className="text-sm text-gray-700">First Gujarati-enabled tax automation platform</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-2">Network Effects</div>
              <p className="text-sm text-gray-700">CA referrals and community-driven growth</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 mb-2">Switching Costs</div>
              <p className="text-sm text-gray-700">High integration effort creates customer stickiness</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function GTMSlide() {
  return (
    <div className="h-full p-12 bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">Go-to-Market Strategy</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-800">Phase 1: Gujarat Domination</CardTitle>
              <p className="text-gray-600">Months 1-12</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <span className="text-sm">Launch in Ahmedabad with 100 pilot CAs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">2</span>
                  </div>
                  <span className="text-sm">Partner with Gujarat CA Association</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-sm">3</span>
                  </div>
                  <span className="text-sm">Expand to Surat, Vadodara, Rajkot</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-bold text-sm">4</span>
                  </div>
                  <span className="text-sm">Achieve 1,000 paying customers</span>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Key Metrics</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Target: 1,000 CAs (2% market share)</li>
                  <li>• Revenue: ₹6 Cr ARR</li>
                  <li>• CAC: ₹1,200 per customer</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-800">Phase 2: Western India</CardTitle>
              <p className="text-gray-600">Months 13-24</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-sm">1</span>
                  </div>
                  <span className="text-sm">Launch in Mumbai, Pune (Maharashtra)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">2</span>
                  </div>
                  <span className="text-sm">Add Marathi language support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">3</span>
                  </div>
                  <span className="text-sm">Enterprise partnerships with large CA firms</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-bold text-sm">4</span>
                  </div>
                  <span className="text-sm">Scale to 5,000 customers</span>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Key Metrics</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Target: 5,000 CAs (4% market share)</li>
                  <li>• Revenue: ₹30 Cr ARR</li>
                  <li>• Expansion into Rajasthan, MP</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Marketing & Sales Strategy</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-green-800">Community-Led Growth</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• CA association partnerships</li>
                <li>• Monthly meetups in Ahmedabad</li>
                <li>• Referral program (20% commission)</li>
                <li>• WhatsApp community groups</li>
              </ul>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-blue-800">Digital Marketing</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Google Ads (CA-specific keywords)</li>
                <li>• LinkedIn targeting CAs</li>
                <li>• YouTube tutorials in Gujarati</li>
                <li>• SEO for tax automation</li>
              </ul>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Building className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-purple-800">Direct Sales</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Inside sales team (Gujarati-speaking)</li>
                <li>• Trade show participation</li>
                <li>• Demo webinars</li>
                <li>• Enterprise account management</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader>
              <CardTitle className="text-xl">Customer Acquisition</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>CAC Target:</span>
                <span className="font-bold">₹1,200</span>
              </div>
              <div className="flex justify-between">
                <span>Payback Period:</span>
                <span className="font-bold">2.5 months</span>
              </div>
              <div className="flex justify-between">
                <span>Conversion Rate:</span>
                <span className="font-bold">15%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader>
              <CardTitle className="text-xl">Customer Success</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Churn Target:</span>
                <span className="font-bold">{"<"}5%</span>
              </div>
              <div className="flex justify-between">
                <span>NPS Score:</span>
                <span className="font-bold">70+</span>
              </div>
              <div className="flex justify-between">
                <span>Support Response:</span>
                <span className="font-bold">{"<"}2 hours</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function FinancialsSlide() {
  return (
    <div className="h-full p-12 bg-gradient-to-br from-green-50 to-blue-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">Financial Projections (5-Year)</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-green-800">Revenue Growth</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-semibold">Year 1 (2025)</div>
                    <div className="text-sm text-gray-600">1,000 customers</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">₹6 Cr</div>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <div className="font-semibold">Year 2 (2026)</div>
                    <div className="text-sm text-gray-600">3,500 customers</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">₹25 Cr</div>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <div>
                    <div className="font-semibold">Year 3 (2027)</div>
                    <div className="text-sm text-gray-600">8,000 customers</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">₹60 Cr</div>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <div>
                    <div className="font-semibold">Year 5 (2029)</div>
                    <div className="text-sm text-gray-600">20,000 customers</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-600">₹180 Cr</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-800">Key Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">85%</div>
                  <div className="text-sm text-gray-600">Gross Margin</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">₹7,200</div>
                  <div className="text-sm text-gray-600">ARPU (Monthly)</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{"<"}5%</div>
                  <div className="text-sm text-gray-600">Monthly Churn</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">5:1</div>
                  <div className="text-sm text-gray-600">LTV:CAC</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">Revenue Breakdown (Year 3)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>SaaS Subscriptions:</span>
                    <span className="font-semibold">₹42 Cr (70%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Premium Features:</span>
                    <span className="font-semibold">₹12 Cr (20%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Training & Support:</span>
                    <span className="font-semibold">₹6 Cr (10%)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Profitability Timeline</h3>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-600">Year 1</div>
              <div className="text-2xl font-bold text-red-600">-₹8 Cr</div>
              <div className="text-sm text-gray-500">Investment Phase</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-600">Year 2</div>
              <div className="text-2xl font-bold text-orange-600">-₹2 Cr</div>
              <div className="text-sm text-gray-500">Near Breakeven</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-600">Year 3</div>
              <div className="text-2xl font-bold text-green-600">+₹12 Cr</div>
              <div className="text-sm text-gray-500">Profitable</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-600">Year 4</div>
              <div className="text-2xl font-bold text-green-600">+₹35 Cr</div>
              <div className="text-sm text-gray-500">Strong Growth</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-600">Year 5</div>
              <div className="text-2xl font-bold text-green-600">+₹72 Cr</div>
              <div className="text-sm text-gray-500">Market Leader</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Cost Structure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Technology & Development:</span>
                  <span className="font-semibold">25%</span>
                </div>
                <div className="flex justify-between">
                  <span>Sales & Marketing:</span>
                  <span className="font-semibold">35%</span>
                </div>
                <div className="flex justify-between">
                  <span>Customer Success:</span>
                  <span className="font-semibold">15%</span>
                </div>
                <div className="flex justify-between">
                  <span>Operations:</span>
                  <span className="font-semibold">10%</span>
                </div>
                <div className="flex justify-between">
                  <span>General & Admin:</span>
                  <span className="font-semibold">15%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Exit Scenarios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="font-semibold text-green-800">IPO (Year 5-7)</div>
                  <div className="text-sm text-green-700">₹2,000+ Cr valuation</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-semibold text-blue-800">Strategic Acquisition</div>
                  <div className="text-sm text-blue-700">Intuit, Cleartax, or fintech major</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="font-semibold text-purple-800">Private Equity</div>
                  <div className="text-sm text-purple-700">Growth capital for expansion</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function TeamSlide() {
  return (
    <div className="h-full p-12 bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">World-Class Team</h1>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-white shadow-xl">
            <CardHeader className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">RK</span>
              </div>
              <CardTitle className="text-xl">Rahul Kumar</CardTitle>
              <p className="text-gray-600">CEO & Co-Founder</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Ex-Zerodha Product Manager (3 years)</li>
                <li>• Built broker API integrations</li>
                <li>• IIT Bombay Computer Science</li>
                <li>• Deep understanding of Indian fintech</li>
              </ul>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-800">
                  "Led the team that built Zerodha's portfolio analytics. Saw firsthand the CA pain points."
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-xl">
            <CardHeader className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">PS</span>
              </div>
              <CardTitle className="text-xl">Priya Shah</CardTitle>
              <p className="text-gray-600">CTO & Co-Founder</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Ex-Google Software Engineer (5 years)</li>
                <li>• Built scalable fintech systems</li>
                <li>• Stanford MS Computer Science</li>
                <li>• Expert in AI/ML and data processing</li>
              </ul>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-xs text-green-800">
                  "Architected payment systems handling $10B+ transactions at Google Pay."
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-xl">
            <CardHeader className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">AM</span>
              </div>
              <CardTitle className="text-xl">Amit Mehta</CardTitle>
              <p className="text-gray-600">Head of Business</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Practicing CA for 15 years</li>
                <li>• 500+ client portfolio in Ahmedabad</li>
                <li>• Gujarat CA Association Board Member</li>
                <li>• Deep CA community connections</li>
              </ul>
              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="text-xs text-orange-800">
                  "Brings authentic CA perspective and Gujarat market insights to product development."
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Advisory Board</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-bold">VG</span>
                </div>
                <div>
                  <h4 className="font-semibold">Vikram Gupta</h4>
                  <p className="text-sm text-gray-600">Ex-Cleartax VP Product</p>
                  <p className="text-xs text-gray-500">Tax tech industry expertise</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-bold">SP</span>
                </div>
                <div>
                  <h4 className="font-semibold">Suresh Patel</h4>
                  <p className="text-sm text-gray-600">Gujarat CA Association President</p>
                  <p className="text-xs text-gray-500">CA community leadership</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-bold">RJ</span>
                </div>
                <div>
                  <h4 className="font-semibold">Ravi Jain</h4>
                  <p className="text-sm text-gray-600">Angel Investor</p>
                  <p className="text-xs text-gray-500">15+ fintech investments</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-bold">NK</span>
                </div>
                <div>
                  <h4 className="font-semibold">Neha Kapoor</h4>
                  <p className="text-sm text-gray-600">Ex-Upstox Head of Partnerships</p>
                  <p className="text-xs text-gray-500">Broker ecosystem expertise</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Team Strengths</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Deep fintech & broker API experience</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Authentic CA community connections</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Gujarat market expertise</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Proven track record at scale</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Hiring Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Current Team:</span>
                  <span className="font-semibold">8 people</span>
                </div>
                <div className="flex justify-between">
                  <span>Year 1 Target:</span>
                  <span className="font-semibold">25 people</span>
                </div>
                <div className="flex justify-between">
                  <span>Year 2 Target:</span>
                  <span className="font-semibold">60 people</span>
                </div>
                <div className="text-sm text-gray-600 mt-4">
                  <strong>Key Hires:</strong> Sales team (Gujarati-speaking), Customer Success, DevOps, AI/ML engineers
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function FundingSlide() {
  return (
    <div className="h-full p-12 bg-gradient-to-br from-orange-50 to-red-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">Funding Ask: ₹15 Crores Seed Round</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-orange-800">Use of Funds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Product Development</h4>
                    <p className="text-sm text-gray-600">AI features, mobile app, integrations</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">₹5 Cr</div>
                    <div className="text-sm text-gray-500">33%</div>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Sales & Marketing</h4>
                    <p className="text-sm text-gray-600">Team hiring, campaigns, partnerships</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">₹6 Cr</div>
                    <div className="text-sm text-gray-500">40%</div>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Operations & Infrastructure</h4>
                    <p className="text-sm text-gray-600">Cloud, security, compliance</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">₹2 Cr</div>
                    <div className="text-sm text-gray-500">13%</div>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Working Capital</h4>
                    <p className="text-sm text-gray-600">18-month runway</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-600">₹2 Cr</div>
                    <div className="text-sm text-gray-500">13%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-green-800">Investment Highlights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Massive Market</h4>
                  <p className="text-sm text-green-700">₹2,400 Cr SAM in Gujarat + Maharashtra alone</p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Strong Traction</h4>
                  <p className="text-sm text-blue-700">68+ CAs waitlisted, ₹2.4L pre-orders in 2 weeks</p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Defensible Moats</h4>
                  <p className="text-sm text-purple-700">Gujarat-first strategy, CA community network</p>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">Experienced Team</h4>
                  <p className="text-sm text-orange-700">Ex-Zerodha, Google, practicing CA backgrounds</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">18-Month Milestones</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-blue-600 font-bold">6M</span>
              </div>
              <h4 className="font-semibold text-blue-800">Product Launch</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 100 pilot customers</li>
                <li>• 6+ broker integrations</li>
                <li>• Gujarati interface</li>
                <li>• ₹60L ARR</li>
              </ul>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-green-600 font-bold">12M</span>
              </div>
              <h4 className="font-semibold text-green-800">Market Penetration</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 500 paying customers</li>
                <li>• Gujarat market leadership</li>
                <li>• AI tax optimizer</li>
                <li>• ₹3.6 Cr ARR</li>
              </ul>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-purple-600 font-bold">18M</span>
              </div>
              <h4 className="font-semibold text-purple-800">Series A Ready</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 1,000+ customers</li>
                <li>• Maharashtra expansion</li>
                <li>• Enterprise features</li>
                <li>• ₹7.2 Cr ARR</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader>
              <CardTitle className="text-xl">Investor Returns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Seed Valuation:</span>
                  <span className="font-bold">₹60 Cr</span>
                </div>
                <div className="flex justify-between">
                  <span>Series A (18M):</span>
                  <span className="font-bold">₹200 Cr</span>
                </div>
                <div className="flex justify-between">
                  <span>Exit (5Y):</span>
                  <span className="font-bold">₹2,000+ Cr</span>
                </div>
                <div className="border-t border-white/20 pt-3">
                  <div className="flex justify-between text-lg">
                    <span>Potential Return:</span>
                    <span className="font-bold">30x+</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader>
              <CardTitle className="text-xl">Why Invest Now</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-sm">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>First-mover advantage in Gujarat</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Proven market demand & traction</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Experienced team with domain expertise</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Clear path to profitability</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Massive TAM expansion opportunity</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function ThankYouSlide() {
  return (
    <div className="h-full flex flex-col justify-center items-center text-center space-y-8 bg-gradient-to-br from-orange-500 to-red-600 text-white">
      <div className="space-y-6">
        <div className="flex items-center justify-center space-x-3 mb-8">
          <TrendingUp className="h-20 w-20" />
          <h1 className="text-6xl font-bold">TaxSync Pro</h1>
        </div>

        <h2 className="text-4xl font-semibold">Thank You</h2>

        <p className="text-2xl opacity-90 max-w-3xl">Ready to revolutionize tax automation for 50,000+ Gujarat CAs</p>

        <div className="space-y-4 text-lg opacity-80">
          <p>Let's build the future of CA productivity together</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <Mail className="h-8 w-8 mx-auto" />
            <p className="font-semibold">Email</p>
            <p className="text-sm opacity-80">founders@taxsyncpro.com</p>
          </div>
          <div className="space-y-2">
            <Phone className="h-8 w-8 mx-auto" />
            <p className="font-semibold">Phone</p>
            <p className="text-sm opacity-80">+91 79 4000 0000</p>
          </div>
          <div className="space-y-2">
            <MapPin className="h-8 w-8 mx-auto" />
            <p className="font-semibold">Location</p>
            <p className="text-sm opacity-80">Ahmedabad, Gujarat</p>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 text-lg">Schedule Demo</Button>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg bg-transparent"
          >
            Download Deck
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 text-center">
        <Badge className="bg-white/20 text-white border-white/30 px-6 py-3 text-lg">
          Confidential & Proprietary • TaxSync Pro 2024
        </Badge>
      </div>
    </div>
  )
}

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const renderSlide = () => {
    const slide = slides[currentSlide]
    switch (slide.component) {
      case "CoverSlide":
        return <CoverSlide />
      case "ProblemSlide":
        return <ProblemSlide />
      case "MarketSlide":
        return <MarketSlide />
      case "SolutionSlide":
        return <SolutionSlide />
      case "ProductSlide":
        return <ProductSlide />
      case "BusinessModelSlide":
        return <BusinessModelSlide />
      case "TractionSlide":
        return <TractionSlide />
      case "CompetitionSlide":
        return <CompetitionSlide />
      case "GTMSlide":
        return <GTMSlide />
      case "FinancialsSlide":
        return <FinancialsSlide />
      case "TeamSlide":
        return <TeamSlide />
      case "FundingSlide":
        return <FundingSlide />
      case "ThankYouSlide":
        return <ThankYouSlide />
      default:
        return <CoverSlide />
    }
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Navigation Bar */}
      <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="text-white hover:bg-gray-700"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            {currentSlide + 1} / {slides.length}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="text-white hover:bg-gray-700"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5" />
          <span className="font-semibold">TaxSync Pro Pitch Deck</span>
        </div>

        <div className="text-sm text-gray-300">{slides[currentSlide].title}</div>
      </div>

      {/* Slide Content */}
      <div className="flex-1 overflow-hidden">{renderSlide()}</div>

      {/* Slide Thumbnails */}
      <div className="bg-gray-100 p-4 overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-24 h-16 rounded border-2 flex items-center justify-center text-xs font-medium transition-colors ${
                currentSlide === index
                  ? "border-orange-500 bg-orange-50 text-orange-700"
                  : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
              }`}
            >
              <div className="text-center">
                <div className="text-xs font-bold">{index + 1}</div>
                <div className="text-xs">{slide.title}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
