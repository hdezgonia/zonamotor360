"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

const newsItems = [
  {
    id: 1,
    title: "Tesla anuncia un nuevo modelo compacto para 2024",
    excerpt:
      "La compañía de Elon Musk planea lanzar un vehículo eléctrico más accesible para competir en el segmento de compactos.",
    date: "2023-12-15",
    imageUrl: "/placeholder.svg?height=200&width=300",
    category: "Eléctricos",
  },
  {
    id: 2,
    title: "Toyota revela el nuevo Prius 2024 con diseño futurista",
    excerpt: "La quinta generación del icónico híbrido sorprende con un aspecto más deportivo y tecnología avanzada.",
    date: "2023-12-14",
    imageUrl: "/placeholder.svg?height=200&width=300",
    category: "Híbridos",
  },
  {
    id: 3,
    title: "BMW presenta su visión del coche autónomo del futuro",
    excerpt: "El concepto 'i Vision Circular' muestra cómo serán los vehículos autónomos y sostenibles en 2040.",
    date: "2023-12-13",
    imageUrl: "/placeholder.svg?height=200&width=300",
    category: "Conceptos",
  },
]

export default function NoticiasPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleNewsClick = async (newsId: number) => {
    setIsLoading(true)
    await router.push(`/noticias/${newsId}`)
    setIsLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Últimas Noticias del Motor</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src={item.imageUrl || "/placeholder.svg"}
                alt={item.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className="text-sm text-blue-600 font-semibold">{item.category}</span>
                <h2 className="text-xl font-bold mt-2 mb-2">{item.title}</h2>
                <p className="text-gray-600 mb-4">{item.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{item.date}</span>
                  <Button variant="outline" size="sm" onClick={() => handleNewsClick(item.id)}>
                    Leer más
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

