import { createClient } from "@supabase/supabase-js"

// Get environment variables with fallbacks for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://demo.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "demo-key"

// Warn if using fallback values
if (supabaseUrl === "https://demo.supabase.co") {
  console.warn("⚠️  Using demo Supabase URL. Set NEXT_PUBLIC_SUPABASE_URL environment variable.")
}

if (supabaseAnonKey === "demo-key") {
  console.warn("⚠️  Using demo Supabase key. Set NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable.")
}

// Create Supabase client with enhanced configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: "pkce",
  },
  global: {
    headers: {
      "X-Client-Info": "taxsync-pro-web",
    },
  },
})

// Mock authentication for development when using demo credentials
if (supabaseUrl === "https://demo.supabase.co") {
  // Override auth methods with mock implementations
  const originalSignInWithPassword = supabase.auth.signInWithPassword
  const originalSignUp = supabase.auth.signUp
  const originalResetPasswordForEmail = supabase.auth.resetPasswordForEmail
  const originalGetUser = supabase.auth.getUser

  supabase.auth.signInWithPassword = async ({ email, password }) => {
    console.log("🔧 Mock login:", email)

    // Demo credentials
    if (email === "demo@taxsyncpro.com" && password === "demo123") {
      return {
        data: {
          user: {
            id: "demo-user-id",
            email: "demo@taxsyncpro.com",
            user_metadata: {
              name: "Demo CA User",
              firm_name: "Demo CA Firm",
            },
          },
          session: {
            access_token: "demo-token",
            refresh_token: "demo-refresh",
          },
        },
        error: null,
      }
    }

    return {
      data: { user: null, session: null },
      error: { message: "Invalid credentials. Try demo@taxsyncpro.com / demo123" },
    }
  }

  supabase.auth.signUp = async ({ email, password, options }) => {
    console.log("🔧 Mock signup:", email)
    return {
      data: {
        user: {
          id: "new-user-id",
          email,
          user_metadata: options?.data || {},
        },
        session: null,
      },
      error: null,
    }
  }

  supabase.auth.resetPasswordForEmail = async (email) => {
    console.log("🔧 Mock password reset:", email)
    return { data: {}, error: null }
  }

  supabase.auth.getUser = async () => {
    return {
      data: { user: null },
      error: null,
    }
  }
}

export default supabase
