"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"

// Simulamos una base de datos de noticias
const newsItems = [
  {
    id: 1,
    title: "Tesla anuncia un nuevo modelo compacto para 2024",
    content:
      "La compañía de Elon Musk planea lanzar un vehículo eléctrico más accesible para competir en el segmento de compactos. Este nuevo modelo, cuyo nombre aún no ha sido revelado, promete ofrecer la tecnología y el rendimiento característicos de Tesla a un precio más asequible. Se espera que tenga una autonomía de alrededor de 400 km y que incorpore las últimas innovaciones en conducción autónoma. La producción está programada para comenzar a finales de 2023 en la Gigafactory de Berlín, con las primeras entregas previstas para principios de 2024. Este movimiento podría revolucionar el mercado de vehículos eléctricos compactos y acelerar la adopción de la movilidad eléctrica en Europa.",
    date: "2023-12-15",
    imageUrl: "/placeholder.svg?height=400&width=600",
    category: "Eléctricos",
  },
  {
    id: 2,
    title: "Toyota revela el nuevo Prius 2024 con diseño futurista",
    content:
      "La quinta generación del icónico híbrido sorprende con un aspecto más deportivo y tecnología avanzada. Toyota ha dado un giro radical al diseño del Prius, abandonando las líneas conservadoras de modelos anteriores en favor de una estética más aerodinámica y atrevida. El nuevo Prius 2024 no solo luce más deportivo, sino que también ofrece un rendimiento mejorado, con una potencia combinada de 220 CV en su versión más potente. El interior ha sido completamente rediseñado, con una gran pantalla táctil central y un cuadro de instrumentos digital. Además, Toyota ha mejorado la eficiencia del sistema híbrido, prometiendo un consumo medio de tan solo 4.0L/100km en ciclo combinado. Con estas mejoras, Toyota busca revitalizar la imagen del Prius y atraer a un público más joven y orientado al diseño.",
    date: "2023-12-14",
    imageUrl: "/placeholder.svg?height=400&width=600",
    category: "Híbridos",
  },
  {
    id: 3,
    title: "BMW presenta su visión del coche autónomo del futuro",
    content:
      "El concepto 'i Vision Circular' muestra cómo serán los vehículos autónomos y sostenibles en 2040. BMW ha revelado su visión futurista del automóvil con el concepto 'i Vision Circular', un vehículo que combina conducción autónoma, sostenibilidad y lujo. El diseño exterior es radicalmente diferente a los coches actuales, con una forma aerodinámica y fluida que maximiza la eficiencia. El interior es igualmente revolucionario, con un espacio flexible que puede transformarse de un entorno de trabajo a una sala de estar móvil. BMW ha puesto un gran énfasis en la sostenibilidad, utilizando materiales 100% reciclables y un proceso de fabricación circular. El vehículo está diseñado para ser completamente autónomo, con sistemas de inteligencia artificial avanzados que pueden anticipar las necesidades del usuario y adaptar la experiencia de viaje en consecuencia. Aunque es un concepto para el 2040, muchas de las tecnologías y enfoques de diseño podrían empezar a aparecer en los modelos de producción de BMW en los próximos años.",
    date: "2023-12-13",
    imageUrl: "/placeholder.svg?height=400&width=600",
    category: "Conceptos",
  },
]

export default function NewsItemPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentNews, setCurrentNews] = useState(newsItems.find((item) => item.id === Number.parseInt(params.id)))
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setCurrentNews(newsItems.find((item) => item.id === Number.parseInt(params.id)))
  }, [params.id])

  if (!currentNews) {
    notFound()
  }

  const handleNewsNavigation = async (newsId: number) => {
    setIsLoading(true)
    await router.push(`/noticias/${newsId}`, { scroll: false })
    setIsLoading(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <Button asChild variant="ghost" className="mb-4">
        <Link href="/noticias" className="inline-flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Volver a noticias
        </Link>
      </Button>

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-4">{currentNews.title}</h1>
          <div className="flex items-center text-gray-600 mb-6">
            <span>{currentNews.date}</span>
            <span className="mx-2">•</span>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
              {currentNews.category}
            </span>
          </div>
          <div className="relative w-full h-96 mb-8">
            <Image
              src={currentNews.imageUrl || "/placeholder.svg"}
              alt={currentNews.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="prose max-w-none">
            <p>{currentNews.content}</p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Otras noticias</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {newsItems
                .filter((item) => item.id !== currentNews.id)
                .map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="relative h-48">
                      <Image src={item.imageUrl || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{item.date}</p>
                      <Button variant="outline" size="sm" onClick={() => handleNewsNavigation(item.id)}>
                        Leer más
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </article>
  )
}

