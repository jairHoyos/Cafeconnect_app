"use client"

import { useState } from "react"
import { AuthView } from "@/components/auth-view"
import { CatalogView } from "@/components/catalog-view"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CartWidget } from "@/components/cart-widget"
import { CartProvider } from "@/contexts/cart-context"

type AppView = "auth" | "catalog"

export default function Home() {
  const [view, setView] = useState<AppView>("auth")

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
          <CatalogView onLogout={() => setView("auth")} />
        </>
      )}
      <WhatsAppButton />
    </CartProvider>
  )
}
