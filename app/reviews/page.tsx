"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { reviews, categories } from "../../data/posts"
import { Filter, Zap, Droplet, Flame } from "lucide-react"
import { RatingDisplay } from "../../components/rating-display"
import { ImageCarousel } from "../../components/ImageCarousel"
import { ReviewBadge } from "../../components/ReviewBadge"

export default function ReviewsPage() {
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedMake, setSelectedMake] = useState<string | null>(null)
  const [fuelTypeFilter, setFuelTypeFilter] = useState<string>("all")
  const [reviewTypeFilter, setReviewTypeFilter] = useState<string>("all")

  const allMakes = Array.from(new Set(reviews.map((review) => review.make)))
  const reviewTypes = ["short", "detailed", "first-impression", "presentation"]

  const filteredReviews = reviews.filter(
    (review) =>
      (!selectedCategory || review.categories.includes(selectedCategory)) &&
      (!selectedMake || review.make === selectedMake) &&
      (fuelTypeFilter === "all"
        ? true
        : fuelTypeFilter === "electric"
          ? review.isElectric
          : !review.fuelType && !review.isElectric
            ? fuelTypeFilter === "gasoline"
            : review.fuelType === fuelTypeFilter) &&
      (reviewTypeFilter === "all" || review.reviewType === reviewTypeFilter),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Todas las Reviews</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <Filter className="h-5 w-5" />
          Filtros
        </button>
      </div>

      {showFilters && (
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 mb-4">
            <select
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="border rounded-md px-3 py-2"
            >
              <option value="">Todas las categorías</option>
              {categories
                .filter((category) => !allMakes.includes(category))
                .map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
            <select
              value={selectedMake || ""}
              onChange={(e) => setSelectedMake(e.target.value || null)}
              className="border rounded-md px-3 py-2"
            >
              <option value="">Todas las marcas</option>
              {allMakes.map((make) => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
            </select>
            <select
              value={fuelTypeFilter}
              onChange={(e) => setFuelTypeFilter(e.target.value)}
              className="border rounded-md px-3 py-2"
            >
              <option value="all">Todos los combustibles</option>
              <option value="electric">Eléctrico</option>
              <option value="gasoline">Gasolina</option>
              <option value="diesel">Diésel</option>
              <option value="hybrid">Híbrido</option>
            </select>
            <select
              value={reviewTypeFilter}
              onChange={(e) => setReviewTypeFilter(e.target.value)}
              className="border rounded-md px-3 py-2"
            >
              <option value="all">Todos los tipos de review</option>
              {reviewTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "short" && "Review Corta"}
                  {type === "detailed" && "Review Detallada"}
                  {type === "first-impression" && "Primera Impresión"}
                  {type === "presentation" && "Presentación"}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredReviews.map((review) => (
          <Link
            key={review.id}
            href={`/review/${review.id}`}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <ImageCarousel
              images={[
                review.imageUrl,
                "/placeholder.svg?height=400&width=600&text=Interior",
                "/placeholder.svg?height=400&width=600&text=Posterior",
              ]}
              alt={`${review.make} ${review.model}`}
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Image
                    src={review.logoUrl || "/placeholder.svg"}
                    alt={review.make}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span className="text-sm text-gray-500">{review.make}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{review.year}</span>
                  <ReviewBadge type={review.reviewType} review={review} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{review.title}</h3>
              <p className="text-sm text-gray-600 font-medium mb-3">{review.excerpt}</p>
              <div className="flex items-center mb-3">
                {review.isElectric ? (
                  <Zap className="h-5 w-5 text-blue-500 mr-2" />
                ) : review.fuelType === "diesel" ? (
                  <Droplet className="h-5 w-5 text-gray-500 mr-2" />
                ) : (
                  <Flame className="h-5 w-5 text-orange-500 mr-2" />
                )}
                <span className="text-sm text-gray-600 mr-2">
                  {review.isElectric ? "Eléctrico" : review.fuelType === "diesel" ? "Diésel" : "Gasolina"}
                </span>
                <span className="text-xs font-semibold px-2 py-1 bg-gray-200 rounded-full">{review.year}</span>
              </div>
              <RatingDisplay
                ratings={{
                  Rendimiento: review.rating.performance,
                  Confort: review.rating.comfort,
                  Practicidad: review.rating.practicality,
                  Valor: review.rating.value,
                  Diseño: review.rating.design,
                  Tecnología: review.rating.technology,
                  Eficiencia: review.rating.efficiency,
                  Seguridad: review.rating.safety,
                }}
                size="sm"
                showValue={true}
                compact={true}
              />
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>{review.price}</span>
                <div className="flex items-center">
                  <svg
                    className="mr-1.5 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  {new Date(review.reviewDate).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

