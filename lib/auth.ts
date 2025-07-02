import { supabase } from "./supabase"
import type { User } from "@supabase/supabase-js"

export interface UserProfile {
  id: string
  name: string
  email: string
  firm_name?: string
  experience?: string
  phone?: string
  avatar_url?: string
  language_preference?: "en" | "gu"
  created_at: string
  updated_at: string
}

export async function getCurrentUser(): Promise<User | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase.from("user_profiles").select("*").eq("id", userId).single()

  if (error) {
    console.error("Error fetching user profile:", error)
    return null
  }

  return data
}

export async function updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<boolean> {
  const { error } = await supabase
    .from("user_profiles")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", userId)

  if (error) {
    console.error("Error updating user profile:", error)
    return false
  }

  return true
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut()
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return !!user
}

// Auth state change listener
export function onAuthStateChange(callback: (user: User | null) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user ?? null)
  })
}

// Password strength validator
export function validatePassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long")
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter")
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter")
  }

  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number")
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must contain at least one special character")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Email validator
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
