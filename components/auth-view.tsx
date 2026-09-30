"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, ArrowRight } from "lucide-react"

interface AuthViewProps {
  onLogin: () => void
  onGuest: () => void
}

export function AuthView({ onLogin, onGuest }: AuthViewProps) {
  const [isRegister, setIsRegister] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [errors, setErrors] = useState({ name: "", email: "", password: "" })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const newErrors = { name: "", email: "", password: "" }

    if (isRegister && !name.trim()) {
      newErrors.name = "Debes llenar este campo."
    }
    if (!email.trim()) {
      newErrors.email = "Debes llenar este campo."
    }
    if (!password.trim()) {
      newErrors.password = "Debes llenar este campo."
    }

    setErrors(newErrors)

    if (newErrors.name || newErrors.email || newErrors.password) return

    onLogin()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f0b08] px-4">

      {/* Fondo */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-amber-900/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-amber-800/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-6">

        {/* Logo con animación */}
        <div className="flex flex-col items-center gap-3 animate-logoEntry">
          <div className="flex items-center gap-3 animate-logoGlow">
            <img
              src="/images/cafeconnect-mark.svg"
              alt=""
              aria-hidden="true"
              className="h-16 w-16 object-contain"
            />
            <span className="font-[var(--font-playfair)] text-3xl font-bold tracking-tight text-white">
              CafeConnect
            </span>
          </div>

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
            INGRESA Y DESCUBRE EL MEJOR CAFÉ COLOMBIANO
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
                {isRegister ? "Crear cuenta" : "Iniciar sesión"}
              </h2>
              <p className="text-sm text-gray-200 text-center font-light tracking-wide">
                {isRegister
                  ? "Regístrate para guardar tus cafés favoritos"
                  : "¡Bienvenido! Ingresa a tu cuenta para continuar"}
              </p>
              <div className="mt-2 w-16 h-px bg-gradient-to-r from-transparent via-[#6b3e20] to-transparent" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {isRegister && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-widest text-gray-200">
                    Nombre completo
                  </label>
                  <Input
                    type="text"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setErrors(p => ({ ...p, name: "" })) }}
                    className={`h-11 bg-[#241c16] border-[#3d2e22] text-white placeholder:text-[#6b5c4e] focus:border-amber-700 ${errors.name ? "border-red-500" : ""}`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400 mt-0.5">{errors.name}</p>
                  )}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-gray-200">
                  Dirección de correo electrónico:
                </label>
                <Input
                  type="email"
                  placeholder="Ej: usuario123@gmail.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors(p => ({ ...p, email: "" })) }}
                  className={`h-11 bg-[#241c16] border-[#3d2e22] text-white placeholder:text-[#6b5c4e] focus:border-amber-700 ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && (
                  <p className="text-xs text-red-400 mt-0.5">{errors.email}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-gray-200">
                  Contraseña:
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrors(p => ({ ...p, password: "" })) }}
                    className={`h-11 pr-10 bg-[#241c16] border-[#3d2e22] text-white placeholder:text-[#6b5c4e] focus:border-amber-700 ${errors.password ? "border-red-500" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b5c4e] hover:text-amber-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-400 mt-0.5">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="h-11 w-full rounded-xl font-medium text-sm text-white transition-all"
                style={{
                  background:
                    "linear-gradient(135deg, #3d2510 0%, #6b3e20 50%, #3d2510 100%)",
                  border: "1px solid #6b3e20",
                }}
                onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  "linear-gradient(135deg, #6b3e20 0%, #92400e 50%, #6b3e20 100%)")
                }
                onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  "linear-gradient(135deg, #3d2510 0%, #6b3e20 50%, #3d2510 100%)")
                }
              >
                {isRegister ? "Registrarse" : "Iniciar sesión"}
              </button>
            </form>

            {/* Invitado */}
            <button
              type="button"
              onClick={onGuest}
              className="h-11 w-full rounded-xl border border-[#6b3e20] bg-transparent text-sm font-medium text-amber-400 hover:text-amber-300 hover:border-amber-600 transition-all flex items-center justify-center gap-2"
            >
              Continuar como invitado
              <ArrowRight className="h-4 w-4" />
            </button>

            {/* Toggle */}
            <p className="text-center text-xs text-gray-200">
              {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="font-semibold text-amber-400 hover:text-amber-200 transition-colors underline underline-offset-2"
              >
                {isRegister ? "Iniciar sesión" : "Registrarse"}
              </button>
            </p>

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
