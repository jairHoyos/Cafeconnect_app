"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export interface CartItem {
  id: number
  name: string
  quantity: number
  unit: string
  unitPrice: number
  totalPrice: number
  image: string
}

interface CartContextType {
  items: CartItem[]
  totalItems: number
  totalAmount: number
  addItem: (item: CartItem) => void
  removeItem: (id: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0)

  function addItem(newItem: CartItem) {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === newItem.id && item.unit === newItem.unit
      )
      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + newItem.quantity,
          totalPrice: updated[existingIndex].totalPrice + newItem.totalPrice,
        }
        return updated
      }
      return [...prev, newItem]
    })
  }

  function removeItem(id: number) {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  function clearCart() {
    setItems([])
  }

  return (
    <CartContext.Provider
      value={{ items, totalItems, totalAmount, addItem, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
