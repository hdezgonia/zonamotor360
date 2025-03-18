"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  ChevronLeft,
  Star,
  Zap,
  Battery,
  Gauge,
  Plus,
  Minus,
  Award,
  PenToolIcon as Tool,
  Droplet,
  Shield,
  Flame,
  Lightbulb,
  Smile,
  Mountain,
  RouteIcon as Road,
} from "lucide-react"
import { reviews } from "../../../data/posts"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { EtherealCarIcon } from "../../../components/icons/EtherealCarIcon"
import { medals } from "../../../components/Medals"
import ReactMarkdown from "react-markdown"
import { VehicleExtras } from "../../../components/VehicleExtras"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import { ReviewBadge } from "../../../components/ReviewBadge"
import React from "react"
import { TableOfContents } from "@/components/TableOfContents"
import { ExpandableGallery } from "@/components/ExpandableGallery"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const DynamicImageCarousel = dynamic(
  () => import("../../../components/image-carousel").then((mod) => mod.ImageCarousel),
  {
    loading: () => <p>Cargando imágenes...</p>,
  },
)

const DynamicYouTubeEmbed = dynamic(() => import("../../../components/youtube-embed").then((mod) => mod.YouTubeEmbed), {
  loading: () => <p>Cargando video...</p>,
})

export default function ReviewPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentReview, setCurrentReview] = useState(reviews.find((r) => r.id === Number.parseInt(params.id)))
  const [isLoading, setIsLoading] = useState(false)
  const detailsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCurrentReview(reviews.find((r) => r.id === Number.parseInt(params.id)))
  }, [params.id])

  if (!currentReview) {
    notFound()
  }

  const carouselImages = [
    currentReview.imageUrl,
    "/placeholder.svg?height=600&width=800&text=Interior",
    "/placeholder.svg?height=600&width=800&text=Posterior",
    "/placeholder.svg?height=600&width=800&text=Motor",
  ]

  const rivals = reviews.filter((r) => currentReview.rivals.includes(r.id))

  const handleRivalClick = async (rivalId: number) => {
    setIsLoading(true)
    await router.push(`/review/${rivalId}`, { scroll: false })
    setIsLoading(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Actualizado: Mantenemos "Rendimiento" y añadimos la nueva categoría
  const reviewCategories = [
    {
      key: "performance",
      title: "Rendimiento",
      icon: Gauge,
      value: currentReview.rating.performance,
      description:
        "Evaluación del comportamiento dinámico del vehículo, incluyendo aceleración, frenada y maniobrabilidad.",
      subcategories: [
        {
          key: "irregularSurface",
          title: "Suelo irregular",
          value: currentReview.rating.irregularSurface || 8.5,
          description: "Comportamiento del vehículo en carreteras con baches o pavimento deteriorado.",
        },
        {
          key: "goodSurface",
          title: "Suelo en buen estado",
          value: currentReview.rating.goodSurface || 8.7,
          description: "Comportamiento en carreteras bien pavimentadas y superficies lisas.",
        },
      ],
    },
    {
      key: "funToDrive",
      title: "Diversión al volante",
      icon: Smile,
      value: currentReview.rating.funToDrive || 8.6,
      description: "Sensaciones que transmite el vehículo durante la conducción y nivel de disfrute que proporciona.",
    },
    {
      key: "comfort",
      title: "Confort",
      icon: Star,
      value: currentReview.rating.comfort,
      description: "Calidad de marcha, aislamiento acústico, comodidad de los asientos y suspensión.",
    },
    {
      key: "practicality",
      title: "Practicidad",
      icon: EtherealCarIcon,
      value: currentReview.rating.practicality,
      description: "Espacio interior, capacidad del maletero, versatilidad y facilidad de uso diario.",
    },
    {
      key: "value",
      title: "Valor",
      icon: Award,
      value: currentReview.rating.value,
      description: "Relación calidad-precio, equipamiento de serie y coste de mantenimiento.",
    },
    {
      key: "design",
      title: "Diseño",
      icon: Tool,
      value: currentReview.rating.design,
      description: "Estética exterior e interior, calidad de materiales y acabados.",
    },
    {
      key: "technology",
      title: "Tecnología",
      icon: Zap,
      value: currentReview.rating.technology,
      description:
        "Sistemas de infoentretenimiento, conectividad, asistentes a la conducción y tecnologías innovadoras.",
    },
    {
      key: "efficiency",
      title: "Eficiencia",
      icon: Battery,
      value: currentReview.rating.efficiency,
      description: "Consumo de combustible o energía, emisiones y eficiencia general del vehículo.",
    },
    {
      key: "safety",
      title: "Seguridad",
      icon: Shield,
      value: currentReview.rating.safety,
      description: "Sistemas de seguridad activa y pasiva, resultados en pruebas de choque y protección de ocupantes.",
    },
  ]

  const getRatingColor = (score: number) => {
    if (score >= 9) return "text-green-500"
    if (score >= 7) return "text-blue-500"
    if (score >= 5) return "text-yellow-500"
    return "text-red-500"
  }

  const scrollToDetails = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    detailsRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const prosAndCons = {
    pros: [
      "Diseño elegante y moderno",
      "Excelente rendimiento en carretera",
      "Tecnología de vanguardia",
      "Consumo eficiente de combustible",
    ],
    cons: [
      "Precio elevado en comparación con algunos competidores",
      "Espacio limitado en los asientos traseros",
      "Algunas características avanzadas son opcionales",
    ],
  }

  const highlights = [
    { title: "Potencia", value: currentReview.specs.power, icon: Zap },
    { title: "0-100 km/h", value: currentReview.specs.acceleration, icon: Gauge },
    { title: "Consumo", value: currentReview.specs.efficiency, icon: Battery },
  ]

  const fuelType = currentReview.isElectric ? "Eléctrico" : currentReview.fuelType === "diesel" ? "Diésel" : "Gasolina"
  const fuelIcon = currentReview.isElectric ? Zap : currentReview.fuelType === "diesel" ? Droplet : Flame

  const renderContent = (content: any) => {
    if (Array.isArray(content)) {
      return content.map((item, index) => {
        if (item.type === "text") {
          return (
            <p key={index} className="mb-6 text-gray-700 leading-relaxed">
              {item.content}
            </p>
          )
        } else if (item.type === "tip") {
          return (
            <div key={index} className="my-8 px-6 py-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
              <div className="flex items-center mb-2">
                <Lightbulb className="w-5 h-5 text-blue-500 mr-2" />
                <span className="font-semibold text-blue-800">Consejo del experto</span>
              </div>
              <p className="text-blue-900">{item.content}</p>
            </div>
          )
        }
        return null
      })
    } else if (typeof content === "string") {
      return <p className="mb-6 text-gray-700 leading-relaxed">{content}</p>
    }
    return null
  }

  // Modificar el array headings eliminando la entrada de "quick-compare"
  const headings = [
    { id: "overview", text: "Resumen", level: 2 },
    { id: "highlights", text: "Destacados", level: 2 },
    { id: "specs", text: "Especificaciones", level: 2 },
    { id: "pros-cons", text: "Pros y Contras", level: 2 },
    { id: "details", text: "Notas", level: 2 },
    { id: "video", text: "Video Review", level: 2 },
    { id: "rivals", text: "Rivales", level: 2 },
  ]

  const galleryImages = [
    currentReview.imageUrl,
    "/placeholder.svg?height=600&width=800&text=Interior",
    "/placeholder.svg?height=600&width=800&text=Posterior",
    "/placeholder.svg?height=600&width=800&text=Motor",
    // Añade más imágenes aquí
  ]

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/reviews" className="inline-flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Volver a las reviews
            </Link>
          </Button>

          {isLoading ? (
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-2">
                  {currentReview.rating.overall >= 9.5 && <EtherealCarIcon size={48} className="text-blue-500" />}
                  <h1 className="text-3xl md:text-4xl font-bold">{currentReview.title}</h1>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                  <ReviewBadge type={currentReview.reviewType} />
                  <Badge variant="secondary">{currentReview.make}</Badge>
                  <Badge variant="secondary">{currentReview.model}</Badge>
                  <Badge variant="secondary">{currentReview.year}</Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {React.createElement(fuelIcon, { className: "w-4 h-4" })}
                    {fuelType}
                  </Badge>
                  <span>•</span>
                  <span>
                    {new Date(currentReview.reviewDate).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-4">
                  {currentReview.medals.map((medal) => (
                    <Link
                      key={medal}
                      href={`/sistema-medallas?medal=${medal}`}
                      className="transform hover:scale-110 transition-transform duration-200"
                    >
                      {medals[medal]}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-3/4">
                  {/* Highlights Section */}
                  <div className="mb-8 bg-white rounded-lg shadow-sm overflow-hidden p-6">
                    <h2 className="text-2xl font-semibold mb-4">Destacados</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {highlights.map((highlight, index) => (
                        <motion.div
                          key={highlight.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-gray-50 p-4 rounded-lg flex items-center space-x-4"
                        >
                          <highlight.icon className="w-8 h-8 text-blue-500" />
                          <div>
                            <h3 className="font-semibold">{highlight.title}</h3>
                            <p className="text-lg">{highlight.value}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Especificaciones del vehículo y puntuación general */}
                  <div className="mb-8 bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-2/3 p-6">
                        <h2 className="text-2xl font-semibold mb-4">Especificaciones</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            { key: "power", label: "Potencia" },
                            { key: "acceleration", label: "Aceleración" },
                            { key: "topSpeed", label: "Velocidad máxima" },
                            { key: "efficiency", label: "Eficiencia" },
                            { key: "weight", label: "Peso" },
                            { key: "engine", label: "Motor" },
                          ].map(({ key, label }) => (
                            <div key={key} className="flex flex-col bg-gray-50 p-3 rounded-lg">
                              <span className="text-sm text-gray-600">{label}</span>
                              <span className="text-lg font-semibold">
                                {currentReview.specs[key as keyof typeof currentReview.specs]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="md:w-1/3 bg-blue-50 p-6 flex flex-col justify-center items-center">
                        <h2 className="text-2xl font-semibold mb-4">Puntuación general</h2>
                        <div className={`text-6xl font-bold ${getRatingColor(currentReview.rating.overall)}`}>
                          {currentReview.rating.overall.toFixed(1)}
                        </div>
                        <Progress value={currentReview.rating.overall * 10} className="w-full h-2 mt-4 mb-2" />
                        <p className="text-sm text-gray-600 text-center">
                          <Link href="#details" onClick={scrollToDetails} className="hover:underline">
                            Basada en 10 categorías
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Pros y Contras */}
                  <div className="mb-8 bg-white rounded-lg shadow-sm overflow-hidden p-6">
                    <h2 className="text-2xl font-semibold mb-4">Pros y Contras</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-green-600">Pros</h3>
                        <ul className="space-y-2">
                          {prosAndCons.pros.map((pro, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center"
                            >
                              <Plus className="h-5 w-5 text-green-500 mr-2" />
                              <span>{pro}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-red-600">Contras</h3>
                        <ul className="space-y-2">
                          {prosAndCons.cons.map((con, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center"
                            >
                              <Minus className="h-5 w-5 text-red-500 mr-2" />
                              <span>{con}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Extras del vehículo y precios */}
                  <div className="mb-8 bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="p-6">
                      <VehicleExtras
                        extras={currentReview.extras}
                        basePrice={currentReview.basePrice}
                        totalPrice={currentReview.totalPrice}
                      />
                    </div>
                  </div>

                  {/* Carrusel de imágenes */}
                  <div className="mb-8">
                    <Suspense fallback={<div>Cargando imágenes...</div>}>
                      <DynamicImageCarousel
                        images={carouselImages}
                        className="w-full h-[400px] md:h-[500px] lg:h-[600px]"
                      />
                    </Suspense>
                  </div>

                  <div className="mb-8">
                    <ReactMarkdown className="prose max-w-none">{currentReview.summary}</ReactMarkdown>
                  </div>

                  <div className="mt-12 space-y-12">
                    {/* Modificar la sección "overview" para que sea más elegante e incluya consejos */}
                    <section id="overview" className="bg-white rounded-lg shadow-sm p-8">
                      <h2 className="text-3xl font-semibold mb-6">Nuestra Review</h2>
                      <div className="prose max-w-none">
                        {typeof currentReview.content === "string" ? (
                          <div className="space-y-6">
                            <p className="text-lg leading-relaxed text-gray-800 first-letter:text-3xl first-letter:font-bold first-letter:text-blue-600 first-letter:mr-2 first-letter:float-left">
                              {currentReview.content.split(".")[0]}.
                            </p>
                            {currentReview.content
                              .split(".")
                              .slice(1)
                              .join(".")
                              .split("\n\n")
                              .map((paragraph, index) => (
                                <p key={index} className="text-lg leading-relaxed text-gray-800">
                                  {paragraph.trim()}
                                </p>
                              ))}

                            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-8 rounded-r-md">
                              <div className="flex items-center mb-2">
                                <Lightbulb className="h-5 w-5 text-amber-500 mr-2" />
                                <h3 className="font-semibold text-amber-800">Consejo del experto</h3>
                              </div>
                              <p className="text-amber-900">
                                {currentReview.isElectric
                                  ? "Para maximizar la autonomía, utiliza el modo de conducción Eco en ciudad y mantén una velocidad constante en autopista. Los frenazos y acelerones bruscos reducen significativamente la eficiencia."
                                  : "Para obtener el mejor rendimiento, asegúrate de mantener la presión correcta de los neumáticos y realiza el mantenimiento periódico según las recomendaciones del fabricante."}
                              </p>
                            </div>

                            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-8 rounded-r-md">
                              <div className="flex items-center mb-2">
                                <Lightbulb className="h-5 w-5 text-blue-500 mr-2" />
                                <h3 className="font-semibold text-blue-800">Recomendación de compra</h3>
                              </div>
                              <p className="text-blue-900">
                                {currentReview.price.includes("50") ||
                                Number(currentReview.price.replace(/[^0-9]/g, "")) > 50000
                                  ? "Este modelo tiene un precio elevado, pero si buscas prestaciones premium y tecnología avanzada, vale cada euro. Considera las versiones base si el presupuesto es ajustado."
                                  : "Ofrece una excelente relación calidad-precio. Recomendamos la versión con los paquetes tecnológicos incluidos para disfrutar de la mejor experiencia."}
                              </p>
                            </div>
                          </div>
                        ) : (
                          renderContent(currentReview.content)
                        )}
                      </div>
                    </section>

                    <section id="details" ref={detailsRef} className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-2xl font-semibold mb-6">Notas</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {reviewCategories.map((category) => {
                          const ratingValue = category.value
                          const isHonorMatricula = Math.abs(ratingValue - 12) < 0.001
                          const displayValue = isHonorMatricula ? 10 : ratingValue

                          // Verificar si esta categoría tiene subcategorías
                          const hasSubcategories = category.subcategories && category.subcategories.length > 0

                          // Calcular la media para rendimiento (si tiene subcategorías)
                          let performanceAvg = displayValue
                          if (hasSubcategories) {
                            const values = category.subcategories.map((sub) => {
                              return Math.abs(sub.value - 12) < 0.001 ? 10 : sub.value
                            })
                            performanceAvg = values.reduce((a, b) => a + b, 0) / values.length
                          }

                          return (
                            <div
                              key={category.key}
                              className={`border-b border-gray-200 pb-4 ${isHonorMatricula ? "bg-purple-50 rounded-lg p-3" : ""}`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="flex items-center gap-2 cursor-help">
                                      <category.icon
                                        className={`w-5 h-5 ${isHonorMatricula ? "text-purple-600" : "text-gray-600"}`}
                                      />
                                      <span className={`font-medium ${isHonorMatricula ? "text-purple-700" : ""}`}>
                                        {category.title}
                                      </span>
                                      {isHonorMatricula && (
                                        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-purple-600 rounded-full">
                                          M.H.
                                        </span>
                                      )}
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">{category.description}</p>
                                  </TooltipContent>
                                </Tooltip>
                                <span
                                  className={`text-2xl font-bold ${isHonorMatricula ? "text-purple-700" : getRatingColor(hasSubcategories ? performanceAvg : displayValue)}`}
                                >
                                  {hasSubcategories ? performanceAvg.toFixed(1) : displayValue.toFixed(1)}
                                </span>
                              </div>
                              <Progress
                                value={(hasSubcategories ? performanceAvg : displayValue) * 10}
                                className={`h-2 mb-2 ${isHonorMatricula ? "bg-purple-200" : ""}`}
                              />

                              {hasSubcategories ? (
                                // Mostrar subcategorías directamente para Rendimiento
                                <div className="mt-3 pl-4 border-l-2 border-gray-300">
                                  {category.subcategories.map((subcategory) => {
                                    const subIsHonorMatricula = Math.abs(subcategory.value - 12) < 0.001
                                    const subDisplayValue = subIsHonorMatricula ? 10 : subcategory.value

                                    return (
                                      <div key={subcategory.key} className="mb-3">
                                        <div className="flex items-center justify-between mb-1">
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <div className="flex items-center gap-2 cursor-help">
                                                {subcategory.key === "irregularSurface" ? (
                                                  <Mountain className="w-4 h-4 text-gray-600" />
                                                ) : (
                                                  <Road className="w-4 h-4 text-gray-600" />
                                                )}
                                                <span className="text-sm font-medium">{subcategory.title}</span>
                                                {subIsHonorMatricula && (
                                                  <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-purple-600 rounded-full">
                                                    M.H.
                                                  </span>
                                                )}
                                              </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              <p className="max-w-xs">{subcategory.description}</p>
                                            </TooltipContent>
                                          </Tooltip>
                                          <span
                                            className={`text-sm font-bold ${subIsHonorMatricula ? "text-purple-700" : ""}`}
                                          >
                                            {subDisplayValue.toFixed(1)}
                                          </span>
                                        </div>
                                        <Progress
                                          value={subDisplayValue * 10}
                                          className={`h-1.5 mb-1 ${subIsHonorMatricula ? "bg-purple-600" : ""}`}
                                        />
                                      </div>
                                    )
                                  })}
                                </div>
                              ) : null}
                            </div>
                          )
                        })}
                      </div>
                    </section>

                    {currentReview.youtubeId && (
                      <section id="video" className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-2xl font-semibold mb-4">Video Review</h2>
                        <div className="w-full aspect-video">
                          <Suspense fallback={<div>Cargando video...</div>}>
                            <DynamicYouTubeEmbed videoId={currentReview.youtubeId} title={currentReview.title} />
                          </Suspense>
                        </div>
                      </section>
                    )}

                    <section id="rivals" className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-2xl font-semibold mb-6">Rivales</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {rivals.map((rival) => (
                          <div key={rival.id} className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="relative h-48">
                              <Image
                                src={rival.imageUrl || "/placeholder.svg"}
                                alt={rival.title}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md">
                                <span className="text-lg font-bold">{rival.rating.overall.toFixed(1)}</span>
                              </div>
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold text-lg mb-1">
                                {rival.make} {rival.model}
                              </h3>
                              <p className="text-sm text-gray-600 mb-3">{rival.year}</p>
                              <p className="text-sm text-gray-700 mb-4 line-clamp-2">{rival.excerpt}</p>
                              <Button variant="outline" size="sm" onClick={() => handleRivalClick(rival.id)}>
                                Ver review
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
                <div className="lg:w-1/4">
                  <TableOfContents headings={headings} />
                </div>
              </div>
              <section id="gallery" className="bg-white rounded-lg shadow-sm p-6 mt-8">
                <h2 className="text-2xl font-semibold mb-6">Galería de Imágenes</h2>
                <ExpandableGallery images={galleryImages} />
              </section>
            </>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}

