"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { StarRating } from "@/components/star-rating"
import { Send, ShoppingCart, Plus, Minus, ChevronDown, ChevronUp, MessageCircle, User } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

interface Comment {
  id: number
  author: string
  rating: number
  text: string
  date: string
}

const PRODUCT_COMMENTS: Record<number, Comment[]> = {
  // Cafe Molido - 5 comentarios
  1: [
    { id: 1, author: "Maria Garcia", rating: 5, text: "Excelente cafe molido, el aroma es increible y la preparacion queda perfecta en mi cafetera.", date: "Hace 2 dias" },
    { id: 2, author: "Carlos Perez", rating: 4, text: "Muy buen sabor, lo uso todas las mananas. La molienda es uniforme.", date: "Hace 1 semana" },
    { id: 3, author: "Ana Rodriguez", rating: 5, text: "El mejor cafe molido que he probado. Notas de caramelo deliciosas.", date: "Hace 2 semanas" },
    { id: 4, author: "Roberto Mendez", rating: 5, text: "La molienda perfecta para mi cafetera italiana. Queda espectacular.", date: "Hace 3 semanas" },
    { id: 5, author: "Patricia Luna", rating: 4, text: "Buen rendimiento y sabor consistente. Ya es mi cafe de cabecera.", date: "Hace 1 mes" },
  ],
  // Cafe en Grano - 4 comentarios
  2: [
    { id: 1, author: "Juan Martinez", rating: 5, text: "Me encanta moler el cafe justo antes de prepararlo. Frescura garantizada.", date: "Hace 3 dias" },
    { id: 2, author: "Laura Gomez", rating: 5, text: "Granos de excelente calidad, se nota que son seleccionados a mano.", date: "Hace 5 dias" },
    { id: 3, author: "Pedro Sanchez", rating: 4, text: "Muy aromatico, ideal para los amantes del cafe recien molido.", date: "Hace 1 semana" },
    { id: 4, author: "Carolina Vega", rating: 5, text: "Los granos vienen enteros y brillantes. Se nota la frescura desde que abres la bolsa.", date: "Hace 2 semanas" },
  ],
  // Cafe Liofilizado - 6 comentarios
  3: [
    { id: 1, author: "Sofia Lopez", rating: 4, text: "Practico para el trabajo, se disuelve rapido y el sabor es muy bueno para ser instantaneo.", date: "Hace 1 dia" },
    { id: 2, author: "Diego Hernandez", rating: 5, text: "No creia en el cafe instantaneo hasta probar este. Sabe a cafe de verdad.", date: "Hace 4 dias" },
    { id: 3, author: "Valentina Torres", rating: 4, text: "Perfecto para cuando no hay tiempo de preparar cafe tradicional.", date: "Hace 1 semana" },
    { id: 4, author: "Fernando Rios", rating: 5, text: "Lo llevo siempre en mis viajes. Calidad premium en formato instantaneo.", date: "Hace 10 dias" },
    { id: 5, author: "Monica Salazar", rating: 4, text: "Mis companeros de oficina quedaron sorprendidos con el sabor. Muy recomendado.", date: "Hace 2 semanas" },
    { id: 6, author: "Ernesto Pardo", rating: 5, text: "El mejor liofilizado del mercado, sin comparacion. Vale cada peso.", date: "Hace 3 semanas" },
  ],
  // Cafe en Pasilla - 3 comentarios
  4: [
    { id: 1, author: "Andres Ramirez", rating: 5, text: "Cafe con caracter, ideal para quienes prefieren sabores fuertes y terrosos.", date: "Hace 2 dias" },
    { id: 2, author: "Camila Diaz", rating: 4, text: "Me recuerda al cafe que hacia mi abuela. Sabor autentico colombiano.", date: "Hace 6 dias" },
    { id: 3, author: "Felipe Castro", rating: 5, text: "Excelente relacion calidad-precio para un cafe de pasilla.", date: "Hace 2 semanas" },
  ],
  // Cafe Tostado - 6 comentarios
  5: [
    { id: 1, author: "Isabella Vargas", rating: 5, text: "El tueste es perfecto, notas de chocolate amargo muy marcadas. Premium de verdad.", date: "Hace 1 dia" },
    { id: 2, author: "Sebastian Moreno", rating: 5, text: "Vale cada peso. El mejor cafe tostado que he comprado.", date: "Hace 3 dias" },
    { id: 3, author: "Daniela Jimenez", rating: 4, text: "Excelente para espresso, crema perfecta y sabor intenso.", date: "Hace 1 semana" },
    { id: 4, author: "Ricardo Blanco", rating: 5, text: "El aroma cuando lo muelo llena toda la cocina. Espectacular.", date: "Hace 10 dias" },
    { id: 5, author: "Claudia Morales", rating: 5, text: "Compre para regalar y termine comprando para mi tambien. Adictivo.", date: "Hace 2 semanas" },
    { id: 6, author: "Oscar Gutierrez", rating: 4, text: "Tueste artesanal que se nota en cada taza. Muy satisfecho con la compra.", date: "Hace 3 semanas" },
  ],
  // Cafe Tradicional - 4 comentarios
  6: [
    { id: 1, author: "Alejandro Ruiz", rating: 5, text: "El cafe de siempre, el sabor de Colombia en cada taza. Lo recomiendo.", date: "Hace 2 dias" },
    { id: 2, author: "Natalia Ortiz", rating: 4, text: "Perfecto para tinto o con leche. Sabor clasico y equilibrado.", date: "Hace 5 dias" },
    { id: 3, author: "Miguel Angel", rating: 5, text: "Mi cafe del dia a dia. Nunca decepciona.", date: "Hace 1 semana" },
    { id: 4, author: "Gloria Espinoza", rating: 5, text: "El sabor que me transporta a la finca de mis abuelos. Pura nostalgia.", date: "Hace 2 semanas" },
  ],
}

export interface CoffeeProduct {
  id: number
  name: string
  description: string
  price: string
  image: string
  origin: string
  roast: string
}

interface ProductCardProps {
  product: CoffeeProduct
}

type UnitType = "Libra" | "Kilo" | "Arroba"

const UNIT_FACTORS: Record<UnitType, number> = {
  Libra: 1,
  Kilo: 2.204,
  Arroba: 25,
}

function parsePrice(priceString: string): number {
  // Extract numeric value from price string like "$9.800 COP"
  const cleaned = priceString.replace(/[^0-9.,]/g, "").replace(/\./g, "").replace(",", ".")
  return parseFloat(cleaned) || 0
}

function formatCOP(value: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [unit, setUnit] = useState<UnitType>("Libra")
  const [showComments, setShowComments] = useState(false)

  const productComments = PRODUCT_COMMENTS[product.id] || []

  const basePrice = useMemo(() => parsePrice(product.price), [product.price])

  const totalPrice = useMemo(() => {
    return basePrice * quantity * UNIT_FACTORS[unit]
  }, [basePrice, quantity, unit])

  function handleQuantityChange(delta: number) {
    setQuantity((prev) => Math.max(1, prev + delta))
  }

  function handleSubmitReview() {
    if (rating === 0) {
      toast.error("Selecciona una calificacion antes de enviar")
      return
    }
    setSubmitted(true)
    toast.success(`Reseña enviada para ${product.name}`, {
      description: `Calificacion: ${rating}/5 estrellas`,
    })
  }

  function handleAddToCart() {
    addItem({
      id: product.id,
      name: product.name,
      quantity: quantity,
      unit: unit,
      unitPrice: basePrice,
      totalPrice: totalPrice,
      image: product.image,
    })
    toast.success(`${product.name} agregado al carrito`, {
      description: `${quantity} ${unit}${quantity > 1 ? "s" : ""} - ${formatCOP(totalPrice)}`,
    })
    // Reset quantity after adding
    setQuantity(1)
  }

  return (
    <Card className="group overflow-hidden border-border/30 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 p-0">
      {/* Product Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm border ${product.origin === "Gama Baja"
            ? "bg-gradient-to-r from-emerald-600/90 to-teal-600/90 text-emerald-100 border-emerald-400/30"
            : product.origin === "Gama Media"
              ? "bg-gradient-to-r from-amber-600/90 to-orange-600/90 text-amber-100 border-amber-400/30"
              : "bg-gradient-to-r from-yellow-500/90 to-amber-500/90 text-yellow-100 border-yellow-300/30"
            }`}>
            {product.origin}
          </span>
          <span className="rounded-full bg-secondary/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
            {product.roast}
          </span>
        </div>
      </div>

      <CardContent className="flex flex-col gap-4 p-5">
        {/* Title & Description */}
        <div className="flex flex-col gap-1">
          <h3 className="font-[var(--font-playfair)] text-lg font-semibold leading-tight text-foreground">
            {product.name}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        </div>


        {/* Price per unit */}
        <div className="flex items-center justify-between gap-3 rounded-xl border border-[#3d2e22] bg-[#241c16] px-4 py-3.5">
          <span className="text-[10px] font-medium uppercase tracking-widest text-[#6b5c4e]">
            Precio por libra:
          </span>

          <div
            className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[#6b3e20] px-3.5 py-1.5"
            style={{ background: "linear-gradient(135deg, #3d2510 0%, #2a1a0d 100%)" }}
          >
            <span className="text-[11px] font-medium text-[#c87941]">$</span>
            <span className="font-mono text-sm font-semibold text-[#e8a96a]">
              {product.price}
            </span>
          </div>
        </div>

        {/* Quantity & Unit Selector */}
        <div className="flex flex-col gap-3 rounded-lg bg-secondary/30 p-3">
          {/* Quantity Control */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Cantidad</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="h-8 w-8 rounded-full border-border/50 bg-secondary/50 hover:bg-secondary hover:border-primary/30"
              >
                <Minus className="h-3.5 w-3.5" />
              </Button>
              <span className="w-8 text-center font-mono text-lg font-semibold text-foreground">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(1)}
                className="h-8 w-8 rounded-full border-border/50 bg-secondary/50 hover:bg-secondary hover:border-primary/30"
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* Unit Selector */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Unidad</span>
            <div className="flex gap-1">
              {(["Libra", "Kilo", "Arroba"] as UnitType[]).map((u) => (
                <Button
                  key={u}
                  variant={unit === u ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUnit(u)}
                  className={`h-7 rounded-full px-3 text-xs font-medium transition-all ${unit === u
                    ? "bg-primary text-primary-foreground"
                    : "border-border/50 bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground hover:border-primary/30"
                    }`}
                >
                  {u}
                </Button>
              ))}
            </div>
          </div>

          {/* Factor Info */}
          <div className="flex items-center justify-between border-t border-border/20 pt-2">
            <span className="text-xs text-muted-foreground">
              {unit === "Libra" && "1 Libra = 1x"}
              {unit === "Kilo" && "1 Kilo = 2.204 Libras"}
              {unit === "Arroba" && "1 Arroba = 25 Libras"}
            </span>
          </div>
        </div>

        {/* Total Price */}
        <div className="flex items-center justify-between rounded-lg bg-primary/10 px-4 py-3">
          <span className="text-sm font-medium text-foreground">Total =</span>
          <span className="font-mono text-xl font-bold text-accent">
            {formatCOP(totalPrice)}
          </span>
        </div>

        {/* Add to Cart */}
        <Button
          onClick={handleAddToCart}
          className="h-10 w-full rounded-[10px] bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm gap-2"
        >
          <ShoppingCart className="h-4 w-4" />
          Agregar al carrito
        </Button>

        {/* Comments Section - Collapsible */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center justify-between w-full py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                Ver comentarios ({productComments.length})
              </span>
            </div>
            {showComments ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          {showComments && (
            <div className="flex flex-col gap-3 p-3 rounded-lg bg-secondary/20 border border-border/20">
              {productComments.map((c) => (
                <div key={c.id} className="flex flex-col gap-2 pb-3 border-b border-border/10 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20">
                        <User className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{c.author}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{c.date}</span>
                  </div>
                  <div className="flex items-center gap-1 ml-9">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`h-3 w-3 ${i < c.rating ? "text-accent fill-accent" : "text-muted-foreground/30"}`}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground ml-9 leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-border/30" />

        {/* Rating & Review Section */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Tu calificacion
            </p>
            {rating > 0 && (
              <span className="text-xs text-coffee-warm">{rating}/5</span>
            )}
          </div>
          <StarRating rating={rating} onRate={setRating} />
        </div>

        {!submitted ? (
          <div className="flex flex-col gap-3">
            <Textarea
              placeholder="Escribe tu opinion sobre este cafe..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-20 resize-none bg-secondary/30 border-border/30 text-foreground placeholder:text-muted-foreground/60 text-sm"
            />
            <Button
              onClick={handleSubmitReview}
              variant="outline"
              className="h-9 w-full rounded-[10px] border-accent/30 text-accent hover:bg-accent/10 hover:text-accent font-medium text-sm gap-2"
            >
              <Send className="h-3.5 w-3.5" />
              Enviar Comentario
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-lg bg-primary/10 py-3">
            <p className="text-sm font-medium text-primary">
              Gracias por tu Comentario
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
