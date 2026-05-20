"use client"

import { useState } from "react"
import { Coffee, ArrowRight } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface AuthViewProps {
  onLogin: () => void
  onGuest: () => void
}

export function AuthView({ onLogin, onGuest }: AuthViewProps) {
  const [isLoading, setIsLoading] = useState(false)

  async function handleGoogleLogin() {
    setIsLoading(true)
    const supabase = createClient()
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? 
          `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error("Error al iniciar sesion con Google:", error.message)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f0b08] px-4">

      {/* Fondo */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-amber-900/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-amber-800/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-6">

        {/* Logo con animacion */}
        <div className="flex flex-col items-center gap-3 animate-logoEntry">
          <div
            className="animate-logoGlow"
            style={{
              padding: "2px",
              borderRadius: "20px",
              background:
                "linear-gradient(90deg, #92400e, #fcd34d, #fff, #fcd34d, #92400e)",
              backgroundSize: "200% auto",
              animation: "shimmer 2.8s linear infinite",
            }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-[18px] bg-[#1e1108]">
              <Coffee className="h-8 w-8 text-amber-400" />
            </div>
          </div>

          <h1 className="font-[var(--font-playfair)] text-3xl font-bold tracking-tight text-white animate-fadeIn">
            CafeConnect
          </h1>

          <p className="text-center text-xs tracking-wide animate-fadeInUp"
            style={{
              background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              fontWeight: "600",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textShadow: "0 0 20px rgba(251, 191, 36, 0.3)",
            }}>
            INGRESA Y DESCUBRE EL MEJOR CAFE COLOMBIANO
          </p>
        </div>

        {/* Card */}
        <div
          className="w-full"
          style={{
            padding: "2px",
            borderRadius: "20px",
            background:
              "linear-gradient(90deg, #92400e, #fcd34d, #fff, #fcd34d, #92400e)",
            backgroundSize: "200% auto",
            animation: "shimmer 2.8s linear infinite",
          }}
        >
          <div className="w-full rounded-[18px] bg-[#1a1410] px-6 py-8 flex flex-col gap-6">

            {/* Header */}
            <div className="flex flex-col items-center gap-1">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-white">
                Bienvenido
              </h2>
              <p className="text-sm text-gray-200 text-center font-light tracking-wide">
                Inicia sesion para acceder a tu cuenta
              </p>
              <div className="mt-2 w-16 h-px bg-gradient-to-r from-transparent via-[#6b3e20] to-transparent" />
            </div>

            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="h-12 w-full rounded-xl font-medium text-sm text-white transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
              }}
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span className="text-gray-700 font-medium">Continuar con Google</span>
                </>
              )}
            </button>

            {/* Separador */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-[#3d2e22]" />
              <span className="text-xs text-gray-400 uppercase">o</span>
              <div className="flex-1 h-px bg-[#3d2e22]" />
            </div>

            {/* Invitado */}
            <button
              type="button"
              onClick={onGuest}
              className="h-11 w-full rounded-xl border border-[#6b3e20] bg-transparent text-sm font-medium text-amber-400 hover:text-amber-300 hover:border-amber-600 transition-all flex items-center justify-center gap-2"
            >
              Continuar como invitado
              <ArrowRight className="h-4 w-4" />
            </button>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeInUp { animation: fadeInUp 1s ease-out; }

        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        .animate-fadeIn { animation: fadeIn 1.2s ease-out; }

        @keyframes logoEntry {
          0% { opacity: 0; transform: translateY(-20px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        .animate-logoEntry { animation: logoEntry 0.9s ease-out; }

        @keyframes logoGlow {
          0% { box-shadow: 0 0 0px rgba(251, 191, 36, 0); }
          50% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.25); }
          100% { box-shadow: 0 0 0px rgba(251, 191, 36, 0); }
        }

        .animate-logoGlow { animation: logoGlow 3s ease-in-out infinite; }
      `}</style>
    </div>
  )
}
