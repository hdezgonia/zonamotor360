"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { reviews } from "../../data/posts"
import { RatingDisplay } from "../../components/rating-display"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchResults, setSearchResults] = useState(reviews)

  useEffect(() => {
    const filteredReviews = reviews.filter((review) => {
      const searchString =
        `${review.make} ${review.model} ${review.year} ${review.title} ${review.excerpt} ${review.categories.join(" ")}`.toLowerCase()
      return searchString.includes(query.toLowerCase())
    })
    setSearchResults(filteredReviews)
  }, [query])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Resultados de búsqueda para: {query}</h1>
      {searchResults.length === 0 ? (
        <p className="text-gray-600">No se encontraron resultados para tu búsqueda.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {searchResults.map((review) => (
            <Link
              key={review.id}
              href={`/review/${review.id}`}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <Image src={review.imageUrl} alt={review.title} fill className="object-cover" />
                <div className="absolute top-2 right-2 bg-white rounded-lg p-2 flex items-center">
                  <span className="text-xl font-bold mr-1">{review.rating.overall.toFixed(1)}</span>
                  <div className="text-xs">
                    <div className="font-semibold">Puntuación</div>
                    <div>de 10</div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Image src={review.logoUrl} alt={review.make} width={24} height={24} className="rounded-full" />
                    <span className="text-sm text-gray-500">
                      {review.make} {review.year}
                    </span>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {review.categories[0]}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{review.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{review.excerpt}</p>
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
                <div className="mt-4 text-sm text-gray-500">
                  Fecha de review:{" "}
                  {new Date(review.reviewDate).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

