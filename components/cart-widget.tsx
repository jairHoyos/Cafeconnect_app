"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, X, Trash2 } from "lucide-react"

function formatCOP(value: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function CartWidget() {
  const { items, totalItems, totalAmount, removeItem, clearCart } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Cart Button - Fixed top right */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 top-20 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-xl shadow-primary/20 transition-all hover:scale-105 hover:bg-primary/90 active:scale-95 border-2 border-primary-foreground/10"
        aria-label="Abrir carrito"
      >
        <ShoppingCart className="h-6 w-6 text-primary-foreground" />
        {totalItems > 0 && (
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground animate-pulse">
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        )}
      </button>

      {/* Cart Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Cart Panel */}
          <Card className="fixed right-4 top-20 z-[120] w-[calc(100%-2rem)] max-w-sm border-border/50 bg-card shadow-2xl sm:w-96">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/30 pb-3">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <ShoppingCart className="h-5 w-5" />
                Carrito ({totalItems})
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full hover:bg-secondary"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>

            <CardContent className="p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-8 text-center">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">
                    Tu carrito esta vacio
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {/* Cart Items */}
                  <div className="max-h-64 space-y-3 overflow-y-auto pr-1">
                    {items.map((item, index) => (
                      <div
                        key={`${item.id}-${item.unit}-${index}`}
                        className="flex items-center gap-3 rounded-lg bg-secondary/30 p-2"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-12 w-12 rounded-md object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.quantity} {item.unit}
                            {item.quantity > 1 ? "s" : ""}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-accent">
                            {formatCOP(item.totalPrice)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="h-7 w-7 rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="flex items-center justify-between border-t border-border/30 pt-3">
                    <span className="text-sm font-medium text-foreground">
                      Total =
                    </span>
                    <span className="font-mono text-lg font-bold text-accent">
                      {formatCOP(totalAmount)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearCart}
                      className="flex-1 gap-1 border-border/50 text-muted-foreground hover:border-destructive/50 hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Vaciar
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Finalizar compra
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </>
  )
}
