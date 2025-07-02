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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, User, Building, Phone, Calculator } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { validatePassword, validateEmail } from "@/lib/auth"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    firmName: "",
    experience: "",
    phone: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [language, setLanguage] = useState<"en" | "gu">("en")
  const [passwordErrors, setPasswordErrors] = useState<string[]>([])
  const router = useRouter()

  const content = {
    en: {
      title: "Join TaxSync Pro",
      subtitle: "Create your professional account and start automating tax workflows",
      name: "Full Name",
      email: "Email Address",
      password: "Password",
      confirmPassword: "Confirm Password",
      firmName: "CA Firm Name",
      experience: "Years of Experience",
      phone: "Phone Number",
      signUp: "Create Account",
      alreadyHave: "Already have an account?",
      signIn: "Sign in here",
      acceptTerms: "I accept the Terms of Service and Privacy Policy",
      namePlaceholder: "Enter your full name",
      emailPlaceholder: "ca@example.com",
      passwordPlaceholder: "Create a strong password",
      confirmPasswordPlaceholder: "Confirm your password",
      firmPlaceholder: "Your CA firm name",
      phonePlaceholder: "+91 98765 43210",
      experienceOptions: {
        "0-2": "0-2 years",
        "3-5": "3-5 years",
        "6-10": "6-10 years",
        "11-15": "11-15 years",
        "16+": "16+ years",
      },
      passwordRequirements:
        "Password must be at least 8 characters with uppercase, lowercase, number, and special character",
      passwordMismatch: "Passwords do not match",
      emailInvalid: "Please enter a valid email address",
      termsRequired: "You must accept the terms and conditions",
      successMessage: "Account created successfully! Please check your email for verification.",
    },
    gu: {
      title: "TaxSync Pro માં જોડાઓ",
      subtitle: "તમારું વ્યાવસાયિક એકાઉન્ટ બનાવો અને ટેક્સ વર્કફ્લો ઓટોમેટ કરવાનું શરૂ કરો",
      name: "પૂરું નામ",
      email: "ઇમેઇલ સરનામું",
      password: "પાસવર્ડ",
      confirmPassword: "પાસવર્ડની પુષ્ટિ કરો",
      firmName: "CA ફર્મનું નામ",
      experience: "અનુભવના વર્ષો",
      phone: "ફોન નંબર",
      signUp: "એકાઉન્ટ બનાવો",
      alreadyHave: "પહેલેથી એકાઉન્ટ છે?",
      signIn: "અહીં સાઇન ઇન કરો",
      acceptTerms: "હું સેવાની શરતો અને ગોપનીયતા નીતિ સ્વીકારું છું",
      namePlaceholder: "તમારું પૂરું નામ દાખલ કરો",
      emailPlaceholder: "ca@example.com",
      passwordPlaceholder: "મજબૂત પાસવર્ડ બનાવો",
      confirmPasswordPlaceholder: "તમારા પાસવર્ડની પુષ્ટિ કરો",
      firmPlaceholder: "તમારા CA ફર્મનું નામ",
      phonePlaceholder: "+91 98765 43210",
      experienceOptions: {
        "0-2": "0-2 વર્ષ",
        "3-5": "3-5 વર્ષ",
        "6-10": "6-10 વર્ષ",
        "11-15": "11-15 વર્ષ",
        "16+": "16+ વર્ષ",
      },
      passwordRequirements: "પાસવર્ડ ઓછામાં ઓછા 8 અક્ષરોનો હોવો જોઈએ જેમાં મોટા, નાના અક્ષરો, નંબર અને વિશેષ અક્ષર હોય",
      passwordMismatch: "પાસવર્ડ મેળ ખાતા નથી",
      emailInvalid: "કૃપા કરીને માન્ય ઇમેઇલ સરનામું દાખલ કરો",
      termsRequired: "તમારે નિયમો અને શરતો સ્વીકારવી જ પડશે",
      successMessage: "એકાઉન્ટ સફળતાપૂર્વક બનાવ્યું! કૃપા કરીને ચકાસણી માટે તમારું ઇમેઇલ તપાસો.",
    },
  }

  const t = content[language]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Real-time password validation
    if (field === "password") {
      const validation = validatePassword(value)
      setPasswordErrors(validation.errors)
    }

    // Clear errors when user starts typing
    if (error) setError("")
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    // Validation
    if (!validateEmail(formData.email)) {
      setError(t.emailInvalid)
      setLoading(false)
      return
    }

    const passwordValidation = validatePassword(formData.password)
    if (!passwordValidation.isValid) {
      setError(t.passwordRequirements)
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t.passwordMismatch)
      setLoading(false)
      return
    }

    if (!acceptTerms) {
      setError(t.termsRequired)
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            firm_name: formData.firmName,
            experience: formData.experience,
            phone: formData.phone,
            language_preference: language,
          },
        },
      })

      if (error) {
        setError(error.message)
      } else {
        setSuccess(t.successMessage)
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/login")
        }, 3000)
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
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

            {success && (
              <Alert className="border-green-200 bg-green-50">
                <AlertDescription className="text-green-800">{success}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    {t.name}
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder={t.namePlaceholder}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    {t.email}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder={t.emailPlaceholder}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    {t.password}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
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
                  {passwordErrors.length > 0 && (
                    <div className="text-xs text-red-600 space-y-1">
                      {passwordErrors.map((error, index) => (
                        <div key={index}>• {error}</div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    {t.confirmPassword}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      placeholder={t.confirmPasswordPlaceholder}
                      className="pl-10 pr-10 h-12"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firmName" className="text-sm font-medium text-gray-700">
                    {t.firmName}
                  </Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="firmName"
                      type="text"
                      value={formData.firmName}
                      onChange={(e) => handleInputChange("firmName", e.target.value)}
                      placeholder={t.firmPlaceholder}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-sm font-medium text-gray-700">
                    {t.experience}
                  </Label>
                  <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(t.experienceOptions).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  {t.phone}
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder={t.phonePlaceholder}
                    className="pl-10 h-12"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm text-gray-600">
                  {t.acceptTerms}
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium"
                disabled={loading}
              >
                {loading ? "Creating Account..." : t.signUp}
              </Button>
            </form>

            <div className="text-center text-sm text-gray-600">
              {t.alreadyHave}{" "}
              <Link href="/login" className="text-orange-600 hover:text-orange-700 font-medium">
                {t.signIn}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
