"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  onRate: (rating: number) => void
  size?: number
}

export function StarRating({ rating, onRate, size = 20 }: StarRatingProps) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Calificacion">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hovered || rating)
        return (
          <button
            key={star}
            type="button"
            onClick={() => onRate(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            aria-label={`${star} estrellas`}
            role="radio"
            aria-checked={star === rating}
          >
            <Star
              size={size}
              className={cn(
                "transition-colors",
                isFilled
                  ? "fill-coffee-warm text-coffee-warm"
                  : "fill-transparent text-muted-foreground/40"
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
