"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, ArrowLeft, Calculator } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { validateEmail } from "@/lib/auth"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [language, setLanguage] = useState<"en" | "gu">("en")

  const content = {
    en: {
      title: "Reset Your Password",
      subtitle: "Enter your email address and we'll send you a link to reset your password",
      email: "Email Address",
      sendReset: "Send Reset Link",
      backToLogin: "Back to Login",
      emailPlaceholder: "ca@example.com",
      successTitle: "Check Your Email",
      successMessage:
        "We've sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.",
      emailInvalid: "Please enter a valid email address",
      emailNotFound: "No account found with this email address",
    },
    gu: {
      title: "તમારો પાસવર્ડ રીસેટ કરો",
      subtitle: "તમારું ઇમેઇલ સરનામું દાખલ કરો અને અમે તમને પાસવર્ડ રીસેટ કરવા માટે લિંક મોકલીશું",
      email: "ઇમેઇલ સરનામું",
      sendReset: "રીસેટ લિંક મોકલો",
      backToLogin: "લોગિન પર પાછા જાઓ",
      emailPlaceholder: "ca@example.com",
      successTitle: "તમારું ઇમેઇલ તપાસો",
      successMessage:
        "અમે તમારા ઇમેઇલ સરનામા પર પાસવર્ડ રીસેટ લિંક મોકલ્યું છે. કૃપા કરીને તમારું ઇનબોક્સ તપાસો અને પાસવર્ડ રીસેટ કરવા માટે સૂચનાઓનું પાલન કરો.",
      emailInvalid: "કૃપા કરીને માન્ય ઇમેઇલ સરનામું દાખલ કરો",
      emailNotFound: "આ ઇમેઇલ સરનામા સાથે કોઈ એકાઉન્ટ મળ્યું નથી",
    },
  }

  const t = content[language]

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validation
    if (!validateEmail(email)) {
      setError(t.emailInvalid)
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        if (error.message.includes("User not found")) {
          setError(t.emailNotFound)
        } else {
          setError(error.message)
        }
      } else {
        setSuccess(true)
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="space-y-4 pb-6 text-center">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
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
              <div className="space-y-2">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">{t.successTitle}</CardTitle>
                <CardDescription className="text-gray-600">{t.successMessage}</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <Link href="/login">
                <Button className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t.backToLogin}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-4 pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
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

            <form onSubmit={handleResetPassword} className="space-y-4">
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

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium"
                disabled={loading}
              >
                {loading ? "Sending..." : t.sendReset}
              </Button>
            </form>

            <div className="text-center">
              <Link
                href="/login"
                className="inline-flex items-center text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                {t.backToLogin}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
