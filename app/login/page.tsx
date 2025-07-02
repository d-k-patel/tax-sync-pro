"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock, Calculator, TrendingUp, Shield, Globe } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [language, setLanguage] = useState<"en" | "gu">("en")
  const router = useRouter()

  const content = {
    en: {
      title: "Welcome Back to TaxSync Pro",
      subtitle: "Sign in to your professional tax automation platform",
      email: "Email Address",
      password: "Password",
      signIn: "Sign In",
      forgotPassword: "Forgot your password?",
      noAccount: "Don't have an account?",
      signUp: "Sign up here",
      features: {
        automation: "Tax Automation",
        insights: "AI Insights",
        security: "Bank-Grade Security",
        gujarati: "Gujarati Support",
      },
      tagline: "Made in Ahmedabad for Gujarat's CAs",
      emailPlaceholder: "ca@example.com",
      passwordPlaceholder: "Enter your password",
    },
    gu: {
      title: "TaxSync Pro માં પાછા આવવાનું સ્વાગત છે",
      subtitle: "તમારા વ્યાવસાયિક ટેક્સ ઓટોમેશન પ્લેટફોર્મમાં સાઇન ઇન કરો",
      email: "ઇમેઇલ સરનામું",
      password: "પાસવર્ડ",
      signIn: "સાઇન ઇન",
      forgotPassword: "તમારો પાસવર્ડ ભૂલી ગયા?",
      noAccount: "એકાઉન્ટ નથી?",
      signUp: "અહીં સાઇન અપ કરો",
      features: {
        automation: "ટેક્સ ઓટોમેશન",
        insights: "AI ઇનસાઇટ્સ",
        security: "બેંક-ગ્રેડ સિક્યોરિટી",
        gujarati: "ગુજરાતી સપોર્ટ",
      },
      tagline: "ગુજરાતના CAઓ માટે અમદાવાદમાં બનાવેલ",
      emailPlaceholder: "ca@example.com",
      passwordPlaceholder: "તમારો પાસવર્ડ દાખલ કરો",
    },
  }

  const t = content[language]

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
      } else {
        router.push("/dashboard")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">TaxSync Pro</h1>
                <p className="text-orange-600 font-medium">{t.tagline}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">India's First Gujarati-Enabled Tax Platform</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm border">
                <Calculator className="w-8 h-8 text-orange-500" />
                <span className="font-medium text-gray-700">{t.features.automation}</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm border">
                <TrendingUp className="w-8 h-8 text-blue-500" />
                <span className="font-medium text-gray-700">{t.features.insights}</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm border">
                <Shield className="w-8 h-8 text-green-500" />
                <span className="font-medium text-gray-700">{t.features.security}</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm border">
                <Globe className="w-8 h-8 text-purple-500" />
                <span className="font-medium text-gray-700">{t.features.gujarati}</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Trusted by 500+ CAs</h3>
              <p className="opacity-90">Join Gujarat's leading tax professionals using TaxSync Pro</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="space-y-4 pb-6">
              <div className="flex items-center justify-between">
                <div className="lg:hidden flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <Calculator className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gray-900">TaxSync Pro</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLanguage(language === "en" ? "gu" : "en")}
                  className="text-xs"
                >
                  {language === "en" ? "ગુજરાતી" : "English"}
                </Button>
              </div>
              <div className="text-center space-y-2">
                <CardTitle className="text-2xl font-bold text-gray-900">{t.title}</CardTitle>
                <CardDescription className="text-gray-600">{t.subtitle}</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    {t.email}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    {t.password}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t.passwordPlaceholder}
                      className="pl-10 pr-10 h-12"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <Link href="/forgot-password" className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                    {t.forgotPassword}
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : t.signIn}
                </Button>
              </form>

              <div className="text-center text-sm text-gray-600">
                {t.noAccount}{" "}
                <Link href="/signup" className="text-orange-600 hover:text-orange-700 font-medium">
                  {t.signUp}
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
