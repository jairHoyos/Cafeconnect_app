"use client"

import { useState, useEffect } from "react"
import { AuthView } from "@/components/auth-view"
import { CatalogView } from "@/components/catalog-view"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CartWidget } from "@/components/cart-widget"
import { CartProvider } from "@/contexts/cart-context"
import { createClient } from "@/lib/supabase/client"

type AppView = "auth" | "catalog"

export default function Home() {
  const [view, setView] = useState<AppView>("auth")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    
    // Verificar si el usuario ya esta autenticado
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setView("catalog")
      }
      setIsLoading(false)
    })

    // Escuchar cambios en la autenticacion
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        setView("catalog")
      } else if (event === "SIGNED_OUT") {
        setView("auth")
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    setView("auth")
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f0b08]">
        <div className="h-8 w-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <CartProvider>
      {view === "auth" ? (
        <AuthView
          onLogin={() => setView("catalog")}
          onGuest={() => setView("catalog")}
        />
      ) : (
        <>
          <CartWidget />
          <CatalogView onLogout={handleLogout} />
        </>
      )}
      <WhatsAppButton />
    </CartProvider>
  )
}
