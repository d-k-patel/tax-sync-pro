"use client"

import type React from "react"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, TrendingUp, FileText, AlertTriangle } from "lucide-react"

function WaitlistForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    firmName: "",
    dailyBroker: "",
    biggestHeadache: "",
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    firmName: "",
    dailyBroker: "",
    biggestHeadache: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [waitlistPosition, setWaitlistPosition] = useState<number | null>(null)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      firmName: "",
      dailyBroker: "",
      biggestHeadache: "",
    }

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Firm name validation
    if (!formData.firmName.trim()) {
      newErrors.firmName = "Firm name is required"
    } else if (formData.firmName.trim().length < 2) {
      newErrors.firmName = "Firm name must be at least 2 characters"
    }

    // Daily broker validation
    if (!formData.dailyBroker) {
      newErrors.dailyBroker = "Please select your primary broker"
    }

    // Biggest headache validation
    if (!formData.biggestHeadache) {
      newErrors.biggestHeadache = "Please select your biggest challenge"
    }

    setErrors(newErrors)
    return Object.values(newErrors).every((error) => error === "")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to register for waitlist")
      }

      setSubmitSuccess(true)
      setWaitlistPosition(result.data.position)

      // Reset form
      setFormData({
        name: "",
        email: "",
        firmName: "",
        dailyBroker: "",
        biggestHeadache: "",
      })
    } catch (error) {
      console.error("Submission error:", error)
      setErrors((prev) => ({
        ...prev,
        email: error instanceof Error ? error.message : "Failed to register. Please try again.",
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Welcome to the waitlist!</h3>
        <div className="space-y-2">
          <p className="text-gray-600">
            Your broker sync toolkit is reserved! We'll send you early access details and your AngelOne integration
            within 24 hours.
          </p>
          {waitlistPosition && (
            <div className="bg-orange-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-orange-800">You're #{waitlistPosition} in line for early access</p>
            </div>
          )}
        </div>
        <Button
          variant="outline"
          onClick={() => setSubmitSuccess(false)}
          className="border-orange-200 text-orange-600 hover:bg-orange-50"
        >
          Submit Another Application
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
          Name *
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="Your full name"
          className={`border-gray-300 ${errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
        />
        {errors.name && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <span className="w-4 h-4 text-red-500">⚠</span>
            {errors.name}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email *
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          placeholder="your.email@domain.com"
          className={`border-gray-300 ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
        />
        {errors.email && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <span className="w-4 h-4 text-red-500">⚠</span>
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="firmName" className="text-sm font-medium text-gray-700">
          Firm Name *
        </Label>
        <Input
          id="firmName"
          value={formData.firmName}
          onChange={(e) => handleInputChange("firmName", e.target.value)}
          placeholder="CA Firm Name"
          className={`border-gray-300 ${errors.firmName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
        />
        {errors.firmName && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <span className="w-4 h-4 text-red-500">⚠</span>
            {errors.firmName}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dailyBroker" className="text-sm font-medium text-gray-700">
          I use daily: *
        </Label>
        <Select value={formData.dailyBroker} onValueChange={(value) => handleInputChange("dailyBroker", value)}>
          <SelectTrigger
            className={`w-full border-gray-300 ${errors.dailyBroker ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
          >
            <SelectValue placeholder="Select your primary broker" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="zerodha">Zerodha</SelectItem>
            <SelectItem value="upstox">Upstox</SelectItem>
            <SelectItem value="groww">Groww</SelectItem>
            <SelectItem value="angelone">AngelOne</SelectItem>
          </SelectContent>
        </Select>
        {errors.dailyBroker && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <span className="w-4 h-4 text-red-500">⚠</span>
            {errors.dailyBroker}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="biggestHeadache" className="text-sm font-medium text-gray-700">
          Biggest headache: *
        </Label>
        <Select value={formData.biggestHeadache} onValueChange={(value) => handleInputChange("biggestHeadache", value)}>
          <SelectTrigger
            className={`w-full border-gray-300 ${errors.biggestHeadache ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
          >
            <SelectValue placeholder="Select your biggest challenge" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="reconciliation">Reconciliation</SelectItem>
            <SelectItem value="tax-loss-harvesting">Tax-Loss Harvesting</SelectItem>
            <SelectItem value="audit-trails">Audit Trails</SelectItem>
          </SelectContent>
        </Select>
        {errors.biggestHeadache && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <span className="w-4 h-4 text-red-500">⚠</span>
            {errors.biggestHeadache}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Claiming Toolkit...
          </div>
        ) : (
          "Claim My Broker Sync Toolkit"
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">By signing up, you agree to our terms and privacy policy</p>
    </form>
  )
}

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-orange-600" />
            <span className="text-xl font-bold text-gray-900">TaxSync Pro</span>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-orange-600 border-orange-200">
              Made for Gujarat
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  ઝેરોધા/અપસ્ટોક્સ ડેટા ઓટો-સિંક કરો, કેપિટલ ગેઈન્સ કેલ્ક્યુલેશનમાં ૯૦% સમય બચાવો!
                </h1>
                <p className="text-xl text-gray-600 font-medium">
                  Ahmedabad's only Gujarati-enabled tool for stock market tax automation
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Badge className="bg-green-100 text-green-800 px-3 py-1">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  6+ Broker Sync
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Real-time Alerts
                </Badge>
                <Badge className="bg-orange-100 text-orange-800 px-3 py-1">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Gujarati Interface
                </Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8">
                  Claim Free Toolkit
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
                >
                  Watch Demo
                </Button>
              </div>
            </div>

            <div className="relative">
              <Card className="shadow-2xl border-0 bg-white">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Live Broker Dashboard</CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">All Synced</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-600">Zerodha</div>
                      <div className="font-semibold text-green-700">Connected</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-600">Upstox</div>
                      <div className="font-semibold text-blue-700">Connected</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-600">Groww</div>
                      <div className="font-semibold text-purple-700">Connected</div>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-600">AngelOne</div>
                      <div className="font-semibold text-red-700">Connected</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg">
                    <div className="text-sm opacity-90">Tax Savings Opportunity</div>
                    <div className="text-2xl font-bold">₹18,500</div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Language:</span>
                    <div className="flex bg-gray-100 rounded-md p-1">
                      <button className="px-3 py-1 bg-white rounded text-orange-600 font-medium">English</button>
                      <button className="px-3 py-1 text-gray-600">ગુજરાતી</button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-4 mb-12">
              <h2 className="text-3xl font-bold text-gray-900">See Live Broker Sync in Action</h2>
              <p className="text-xl text-gray-600">
                Watch how Ahmedabad CAs are automating tax-loss harvesting with real-time alerts
              </p>
            </div>

            <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                    <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"></div>
                  </div>
                  <div className="text-white space-y-2">
                    <h3 className="text-2xl font-bold">Live Demo</h3>
                    <p className="text-white/80">4 minutes • See 6+ broker integration</p>
                  </div>
                </div>
              </div>

              {/* Video overlay with play button */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center cursor-pointer hover:bg-black/30 transition-colors">
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg"
                >
                  <div className="w-0 h-0 border-l-[8px] border-l-gray-900 border-y-[6px] border-y-transparent mr-3"></div>
                  Watch Demo
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900">6+ Broker Sync</h4>
                <p className="text-sm text-gray-600">Zerodha, Upstox, Groww, AngelOne & more</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                  <AlertTriangle className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Loss Offset Alerts</h4>
                <p className="text-sm text-gray-600">Real-time tax-loss harvesting opportunities</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Audit-Ready Reports</h4>
                <p className="text-sm text-gray-600">1-click Form 26AS generation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Broker Comparison Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Broker Coverage for Gujarat CAs</h2>
            <p className="text-xl text-gray-600">We support all major brokers used by Ahmedabad professionals</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-lg font-semibold">Broker</th>
                      <th className="px-4 py-4 text-center text-sm font-semibold">Auto Sync</th>
                      <th className="px-4 py-4 text-center text-sm font-semibold">Real-time Data</th>
                      <th className="px-4 py-4 text-center text-sm font-semibold">Tax Reports</th>
                      <th className="px-4 py-4 text-center text-sm font-semibold">P&L Tracking</th>
                      <th className="px-4 py-4 text-center text-sm font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-green-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-sm">Z</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">Zerodha</div>
                            <div className="text-sm text-gray-500">Most popular in Gujarat</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="px-4 py-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="px-4 py-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="px-4 py-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="px-4 py-4 text-center">
                        <Badge className="bg-green-100 text-green-800">Live</Badge>
                      </td>
                    </tr>
                    <tr className="hover:bg-green-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                            <span className="text-orange-600 font-bold text-sm">U</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">Upstox</div>
                            <div className="text-sm text-gray-500">Growing fast in Ahmedabad</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="px-4 py-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="px-4 py-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="px-4 py-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="px-4 py-4 text-center">
                        <Badge className="bg-green-100 text-green-800">Live</Badge>
                      </td>
                    </tr>
                    <tr className="hover:bg-green-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <span className="text-purple-600 font-bold text-sm">G</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">Groww</div>
                            <div className="text-sm text-gray-500">Popular with millennials</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="px-4 py-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="px-4 py-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="px-4 py-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="px-4 py-4 text-center">
                        <Badge className="bg-green-100 text-green-800">Live</Badge>
                      </td>
                    </tr>
                    <tr className="hover:bg-orange-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <span className="text-red-600 font-bold text-sm">A</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">AngelOne</div>
                            <div className="text-sm text-gray-500">Free for first 100 signups</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="px-4 py-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="px-4 py-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="px-4 py-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="px-4 py-4 text-center">
                        <Badge className="bg-green-100 text-green-800">Live</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
