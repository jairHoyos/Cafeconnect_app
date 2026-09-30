"use client"

import { useState } from "react"
import { ProductCard, type CoffeeProduct } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Coffee, LogOut, Search, SlidersHorizontal, ChevronDown } from "lucide-react"

const COFFEE_PRODUCTS: CoffeeProduct[] = [
  {
    id: 1,
    name: "Café Molido",
    description:
      "El sabor clásico que ha acompañado a generaciones. Una mezcla equilibrada de granos tostados y molidos con precisión para garantizar una extracción uniforme. Su aroma envolvente y notas sutiles a frutos secos lo convierten en el acompañante perfecto para cada mañana.",
    price: "15.150 COP",
    image: "/images/coffee-colombiano.jpg",
    origin: "Gama Media",
    roast: "Molido",
  },
  {
    id: 2,
    name: "Café en Grano Tostado",
    description:
      "Granos 100% arábigos seleccionados en origen y tostados artesanalmente en lotes pequeños para resaltar su dulzor natural. Al conservarse en grano, mantiene intactos sus aceites esenciales, entregando una taza fresca con notas a chocolate amargo, caramelo y frutos rojos. Muela solo lo que va a preparar.",
    price: "30.300 COP",
    image: "/images/coffee-etiopia.jpg",
    origin: "Gama Alta",
    roast: "Grano",
  },
  {
    id: 3,
    name: "Café Liofilizado",
    description:
      "El balance perfecto entre la practicidad del café instantáneo y el sabor del café recién tostado. Sometido a un proceso de deshidratación en frío (liofilización) que protege los aromas y sabores originales del grano. Disolución instantánea para una taza rica y aromática en segundos.",
    price: "90.000 COP",
    image: "/images/coffee-brasil.jpg",
    origin: "Gama Alta",
    roast: "Liofilizado",
  },
  {
    id: 4,
    name: "Café en Pasilla",
    description:
      "El café del día a día en los hogares colombianos. Una selección de granos tradicionales que ofrece una taza de cuerpo pesado, carácter fuerte y notas maderosas. Ideal para quienes disfrutan de un café intenso preparado en olla o greca y endulzado con panela.",
    price: "9.500 COP",
    image: "/images/coffee-guatemala.jpg",
    origin: "Gama Baja",
    roast: "Pasilla",
  },
  {
    id: 5,
    name: "Café Descafeinado",
    description:
      "Café premium del cual se ha extraído la cafeína mediante procesos naturales (como el método de caña de azúcar o el método con agua), sin usar solventes químicos agresivos. Conserva todo el cuerpo, el aroma y el sabor dulce del café tradicional. Ideal para consumir en las noches.",
    price: "48.100 COP",
    image: "/images/coffee-kenya.jpg",
    origin: "Gama Alta",
    roast: "Tostado",
  },
  {
    id: 6,
    name: "Café Saborizado",
    description:
      "Una base de café arábigo fusionada delicadamente con extractos de vainilla, canela, avellana o arequipe. Su fragancia en seco es intensa y dulce, ideal para preparar tazas diferentes, lattes o postres sin necesidad de añadir jarabes artificiales.",
    price: "33.000 COP",
    image: "/images/coffee-sumatra.jpg",
    origin: "Gama Media",
    roast: "Tradicional",
  },
]

type RoastFilter = "Todos" | "Molido" | "Grano" | "Liofilizado" | "Pasilla" | "Tostado" | "Tradicional"
type GamaFilter = "Todas" | "Gama Baja" | "Gama Media" | "Gama Alta"

interface CatalogViewProps {
  onLogout: () => void
}

export function CatalogView({ onLogout }: CatalogViewProps) {
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState<RoastFilter>("Todos")
  const [activeGama, setActiveGama] = useState<GamaFilter>("Todas")
  const [gamaOpen, setGamaOpen] = useState(false)

  const filters: RoastFilter[] = ["Todos", "Molido", "Grano", "Liofilizado", "Pasilla", "Tostado", "Tradicional"]
  const gamas: GamaFilter[] = ["Todas", "Gama Baja", "Gama Media", "Gama Alta"]

  const filtered = COFFEE_PRODUCTS.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.origin.toLowerCase().includes(search.toLowerCase())
    const matchesFilter =
      activeFilter === "Todos" || p.roast === activeFilter
    const matchesGama =
      activeGama === "Todas" || p.origin === activeGama
    return matchesSearch && matchesFilter && matchesGama
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-2.5">
            <img
              src="/images/cafeconnect-mark.svg"
              alt=""
              aria-hidden="true"
              className="h-10 w-10 object-contain"
            />
            <span className="font-[var(--font-playfair)] text-xl font-bold tracking-tight text-foreground">
              CafeConnect
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar cafe..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 pl-9 bg-secondary/50 border-border/30 text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <Button
            onClick={onLogout}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Salir</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* Hero Section */}
        <div className="mb-12 flex flex-col items-center text-center gap-4 py-8">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-amber-500">
            Tienda & Catálogo
          </span>
          <h2 className="font-[var(--font-playfair)] text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
            El Arte del <span className="italic text-amber-500">Café</span>
          </h2>
          <p
            className="text-sm leading-relaxed tracking-wide"
            style={{
              background: "linear-gradient(90deg, #b45309, #fcd34d, #ffffff, #fcd34d, #b45309)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 2.8s linear infinite",
            }}
          >
            Explora, elige y disfruta. Cafés colombianos auténticos, desde su origen hasta tu experiencia.
          </p>

          <style>{`
  @keyframes shimmer {
    0% { background-position: 0% center; }
    100% { background-position: 200% center; }
  }
`}</style>
          <div className="flex flex-col items-center gap-1.5 mt-2">
            <div className="flex items-end gap-2">
              {[
                { size: "h-3.5 w-3.5", color: "text-amber-900", delay: "0s" },
                { size: "h-5 w-5", color: "text-amber-800", delay: "0.15s" },
                { size: "h-7 w-7", color: "text-amber-400", delay: "0.3s" },
                { size: "h-5 w-5", color: "text-amber-800", delay: "0.45s" },
                { size: "h-3.5 w-3.5", color: "text-amber-900", delay: "0.6s" },
              ].map((item, i) => (
                <Coffee
                  key={i}
                  className={`${item.size} ${item.color}`}
                  style={{ animation: `coffeeWave 1.4s ease-in-out ${item.delay} infinite` }}
                />
              ))}
            </div>
            <div className="w-20 h-px" style={{ background: "linear-gradient(90deg, transparent, #6b3e20, transparent)" }} />
          </div>

          <style>{`
  @keyframes coffeeWave {
    0%, 100% { transform: translateY(0); opacity: 0.5; }
    50%       { transform: translateY(-5px); opacity: 1; }
  }
`}</style>
        </div>

        {/* Mobile Search */}
        <div className="mb-1 sm:hidden">  {/* era mb-6 */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar cafe..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 pl-9 bg-secondary/50 border-border/30 text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4">
          {/* Gama Dropdown */}
          <div className="relative">
            <button
              onClick={() => setGamaOpen(!gamaOpen)}
              className={`flex items-center justify-between w-full sm:w-72 h-12 px-4 rounded-xl border transition-all ${activeGama === "Todas"
                ? "bg-secondary/50 border-border/30 text-foreground"
                : activeGama === "Gama Baja"
                  ? "bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border-emerald-700/50 text-emerald-300"
                  : activeGama === "Gama Media"
                    ? "bg-gradient-to-r from-amber-900/40 to-orange-900/40 border-amber-700/50 text-amber-300"
                    : "bg-gradient-to-r from-yellow-900/40 to-amber-800/40 border-yellow-600/50 text-yellow-300"
                }`}
            >
              <span className="text-sm font-semibold">
                {activeGama === "Todas" ? "Seleccionar Gama" : activeGama}
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${gamaOpen ? "rotate-180" : ""}`} />
            </button>

            {gamaOpen && (
              <div className="absolute top-full left-0 mt-2 w-full sm:w-72 rounded-xl bg-card border border-border/50 shadow-2xl z-50 overflow-hidden">
                {/* Todas */}
                <button
                  onClick={() => {
                    setActiveGama("Todas")
                    setGamaOpen(false)
                  }}
                  className={`flex items-center justify-between w-full px-4 py-3.5 text-sm text-left transition-colors ${activeGama === "Todas" ? "bg-secondary/70 text-foreground" : "text-muted-foreground hover:bg-secondary/30 hover:text-foreground"
                    }`}
                >
                  <span className="font-medium">Todas las Gamas</span>
                </button>

                {/* Gama Baja */}
                <button
                  onClick={() => {
                    setActiveGama("Gama Baja")
                    setGamaOpen(false)
                  }}
                  className={`flex items-center justify-between w-full px-4 py-3.5 text-sm text-left transition-all ${activeGama === "Gama Baja"
                    ? "bg-gradient-to-r from-emerald-900/60 to-teal-900/60 text-emerald-300"
                    : "hover:bg-gradient-to-r hover:from-emerald-900/30 hover:to-teal-900/30 text-foreground hover:text-emerald-300"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500" />
                    <span className="font-medium">Gama Baja</span>
                  </div>
                  <span className="text-xs opacity-70">Desde $9.500</span>
                </button>

                {/* Gama Media */}
                <button
                  onClick={() => {
                    setActiveGama("Gama Media")
                    setGamaOpen(false)
                  }}
                  className={`flex items-center justify-between w-full px-4 py-3.5 text-sm text-left transition-all ${activeGama === "Gama Media"
                    ? "bg-gradient-to-r from-amber-900/60 to-orange-900/60 text-amber-300"
                    : "hover:bg-gradient-to-r hover:from-amber-900/30 hover:to-orange-900/30 text-foreground hover:text-amber-300"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-amber-400 to-orange-500" />
                    <span className="font-medium">Gama Media</span>
                  </div>
                  <span className="text-xs opacity-70">Desde $15.150</span>
                </button>

                {/* Gama Alta */}
                <button
                  onClick={() => {
                    setActiveGama("Gama Alta")
                    setGamaOpen(false)
                  }}
                  className={`flex items-center justify-between w-full px-4 py-3.5 text-sm text-left transition-all ${activeGama === "Gama Alta"
                    ? "bg-gradient-to-r from-yellow-800/60 to-amber-700/60 text-yellow-300"
                    : "hover:bg-gradient-to-r hover:from-yellow-800/30 hover:to-amber-700/30 text-foreground hover:text-yellow-300"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-300 to-amber-400" />
                    <span className="font-medium">Gama Alta</span>
                  </div>
                  <span className="text-xs opacity-70">Desde $30.300</span>
                </button>
              </div>
            )}
          </div>

          {/* Type Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <SlidersHorizontal className="h-4 w-4 shrink-0 text-muted-foreground" />
            {filters.map((filter) => (
              <Button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                variant={activeFilter === filter ? "default" : "outline"}
                size="sm"
                className={
                  activeFilter === filter
                    ? "rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
                    : "rounded-full border-border/30 text-muted-foreground hover:text-foreground hover:border-border shrink-0"
                }
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Coffee className="h-12 w-12 text-muted-foreground/30" />
            <p className="text-muted-foreground text-center">
              No se encontraron cafes que coincidan con tu busqueda.
            </p>
          </div>
        )}

        {/* Results count */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Mostrando {filtered.length} de {COFFEE_PRODUCTS.length} cafes
          </p>
        </div>
      </main>

      {/* Footer */}
      {/* Footer */}
      <footer className="border-t border-[#3d2e22] bg-[#1a1410] mt-12">
        <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">

            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-900/50 border border-[#6b3e20]">
                <Coffee className="h-4 w-4 text-amber-500" />
              </div>
              <span className="text-sm font-semibold text-amber-200">CafeConnect</span>
            </div>

            {/* Slogan shimmer */}
            <p
              className="text-xs tracking-wide text-center"
              style={{
                background: "linear-gradient(90deg, #b45309, #fcd34d, #fff, #fcd34d, #b45309)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 2.8s linear infinite",
              }}
            >
              © 2026 CafeConnect · Café de origen, sabor sin fronteras
            </p>

          </div>
        </div>
      </footer>
    </div>
  )
}
