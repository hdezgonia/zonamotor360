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
import remarkGfm from "remark-gfm"
import { VehicleExtras } from "../../../components/VehicleExtras"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import { ReviewBadge } from "../../../components/ReviewBadge"
import React from "react"
import { TableOfContents } from "@/components/TableOfContents"
import { ExpandableGallery } from "@/components/ExpandableGallery"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const DynamicYouTubeEmbed = dynamic(
  () => import("../../../components/youtube-embed").then((mod) => mod.YouTubeEmbed),
  { loading: () => <p>Cargando video...</p> },
)

export default function ReviewPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentReview, setCurrentReview] = useState(reviews.find((r) => r.id === Number.parseInt(params.id)))
  const [isLoading, setIsLoading] = useState(false)
  const [markdownContent, setMarkdownContent] = useState<string | null>(null)
  const detailsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCurrentReview(reviews.find((r) => r.id === Number.parseInt(params.id)))
  }, [params.id])

  useEffect(() => {
    if (!currentReview) return
    setMarkdownContent(null)

    const slug = (currentReview as any).slug || null
    if (!slug) {
      const legacyContent = (currentReview as any).content
      setMarkdownContent(typeof legacyContent === "string" ? legacyContent : null)
      return
    }

    fetch(`/api/review-content/${slug}`)
      .then((r) => r.json())
      .then((d) => setMarkdownContent(d.content ?? ""))
      .catch(() => setMarkdownContent(""))
  }, [currentReview])

  if (!currentReview) {
    notFound()
  }

  const galleryImages = (currentReview as any).galleryImages || [currentReview.imageUrl]
  const rivals = reviews.filter((r) => currentReview.rivals.includes(r.id))

  const handleRivalClick = async (rivalId: number) => {
    setIsLoading(true)
    await router.push(`/review/${rivalId}`, { scroll: false })
    setIsLoading(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const reviewCategories = [
    {
      key: "performance",
      title: "Rendimiento",
      icon: Gauge,
      value: currentReview.rating.performance,
      description: "Evaluación del comportamiento dinámico del vehículo, incluyendo aceleración, frenada y maniobrabilidad.",
      subcategories: [
        {
          key: "irregularSurface",
          title: "Suelo irregular",
          value: (currentReview.rating as any).irregularSurface || 8.5,
          description: "Comportamiento del vehículo en carreteras con baches o pavimento deteriorado.",
        },
        {
          key: "goodSurface",
          title: "Suelo en buen estado",
          value: (currentReview.rating as any).goodSurface || 8.7,
          description: "Comportamiento en carreteras bien pavimentadas y superficies lisas.",
        },
      ],
    },
    {
      key: "funToDrive",
      title: "Diversión al volante",
      icon: Smile,
      value: (currentReview.rating as any).funToDrive || 8.6,
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
      description: "Sistemas de infoentretenimiento, conectividad, asistentes a la conducción y tecnologías innovadoras.",
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

  const pros: string[] = (currentReview as any).pros || [
    "Diseño elegante y moderno",
    "Excelente rendimiento en carretera",
    "Tecnología de vanguardia",
    "Consumo eficiente de combustible",
  ]
  const cons: string[] = (currentReview as any).cons || [
    "Precio elevado en comparación con algunos competidores",
    "Espacio limitado en los asientos traseros",
    "Algunas características avanzadas son opcionales",
  ]

  const highlights = [
    { title: "Potencia", value: currentReview.specs.power, icon: Zap },
    { title: "0-100 km/h", value: currentReview.specs.acceleration, icon: Gauge },
    { title: "Consumo", value: currentReview.specs.efficiency, icon: Battery },
  ]

  const fuelType = currentReview.isElectric ? "Eléctrico" : currentReview.fuelType === "diesel" ? "Diésel" : "Gasolina"
  const fuelIcon = currentReview.isElectric ? Zap : currentReview.fuelType === "diesel" ? Droplet : Flame

  const renderLegacyContent = (content: any[]) =>
    content.map((item, index) => {
      if (item.type === "text") {
        return (
          <p key={index} className="mb-6 text-gray-700 leading-relaxed">
            {item.content}
          </p>
        )
      }
      if (item.type === "tip") {
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

  const renderContent = () => {
    if (markdownContent === null) {
      return <p className="text-gray-400 italic">Cargando contenido...</p>
    }
    if (markdownContent === "") {
      return <p className="text-gray-400 italic">Contenido no disponible.</p>
    }
    const legacyContent = (currentReview as any).content
    if (Array.isArray(legacyContent)) {
      return renderLegacyContent(legacyContent)
    }
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-4xl font-black mt-12 mb-6 text-gray-900 tracking-tight">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900 border-l-4 border-red-500 pl-4">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-bold mt-6 mb-3 text-gray-700 uppercase tracking-wide">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="mb-5 leading-relaxed text-gray-700 text-[1.05rem]">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-gray-900">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-gray-600">{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="mb-5 space-y-2 pl-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 mb-5 space-y-2">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="flex items-start gap-2 text-gray-700">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-red-500 shrink-0" />
              <span>{children}</span>
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-8 px-6 py-5 bg-gray-900 text-white rounded-xl border-l-4 border-red-500 text-lg font-medium leading-relaxed shadow-lg">
              {children}
            </blockquote>
          ),
          hr: () => (
            <div className="my-10 flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200" />
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="flex-1 h-px bg-gray-200" />
            </div>
          ),
          img: ({ src, alt }) => (
            <figure className="my-8">
              <img
                src={src}
                alt={alt || ""}
                className="w-full rounded-xl shadow-md object-cover"
              />
              {alt && (
                <figcaption className="mt-2 text-center text-sm text-gray-500 italic">{alt}</figcaption>
              )}
            </figure>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-8 rounded-xl shadow-sm border border-gray-200">
              <table className="min-w-full text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-900 text-white">{children}</thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-gray-100 bg-white">{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-gray-50 transition-colors">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-5 py-3 text-left font-semibold tracking-wide text-sm">{children}</th>
          ),
          td: ({ children }) => (
            <td className="px-5 py-3 text-gray-700">{children}</td>
          ),
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    )
  }

  const headings = [
    { id: "overview", text: "Nuestra Review", level: 2 },
    { id: "highlights", text: "Destacados", level: 2 },
    { id: "specs", text: "Especificaciones", level: 2 },
    { id: "pros-cons", text: "Pros y Contras", level: 2 },
    { id: "details", text: "Notas", level: 2 },
    { id: "video", text: "Video Review", level: 2 },
    { id: "rivals", text: "Rivales", level: 2 },
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
              {/* Cabecera */}
              <div className="mb-6">
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

              {/* Imagen hero */}
              <div className="relative w-full h-[400px] md:h-[520px] rounded-xl overflow-hidden mb-8">
                <Image
                  src={currentReview.imageUrl}
                  alt={currentReview.title}
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="text-lg font-semibold opacity-90">
                    {currentReview.make} {currentReview.model} {currentReview.trim}
                  </span>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="bg-white text-gray-900 font-black px-4 py-1.5 rounded-lg text-2xl">
                      {currentReview.rating.overall.toFixed(1)}
                    </span>
                    <span className="text-sm opacity-80 font-medium bg-black/30 px-3 py-1 rounded-full">
                      {currentReview.price}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-3/4">

                  {/* Destacados */}
                  <div className="mb-8 bg-white rounded-xl shadow-sm overflow-hidden p-6">
                    <h2 className="text-2xl font-semibold mb-4">Destacados</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {highlights.map((highlight, index) => (
                        <motion.div
                          key={highlight.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-gray-50 p-4 rounded-xl flex items-center space-x-4 border border-gray-100"
                        >
                          <highlight.icon className="w-8 h-8 text-red-500 shrink-0" />
                          <div>
                            <h3 className="font-semibold text-sm text-gray-500">{highlight.title}</h3>
                            <p className="text-lg font-bold text-gray-900">{highlight.value}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Especificaciones y puntuación */}
                  <div className="mb-8 bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-2/3 p-6">
                        <h2 className="text-2xl font-semibold mb-4">Especificaciones</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            { key: "power", label: "Potencia" },
                            { key: "acceleration", label: "Aceleración" },
                            { key: "topSpeed", label: "Velocidad máxima" },
                            { key: "efficiency", label: "Eficiencia" },
                            { key: "weight", label: "Peso" },
                            { key: "engine", label: "Motor" },
                          ].map(({ key, label }) => (
                            <div key={key} className="flex flex-col bg-gray-50 p-3 rounded-lg border border-gray-100">
                              <span className="text-xs text-gray-500 uppercase tracking-wide">{label}</span>
                              <span className="text-base font-bold text-gray-900 mt-0.5">
                                {currentReview.specs[key as keyof typeof currentReview.specs]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="md:w-1/3 bg-gray-900 p-6 flex flex-col justify-center items-center text-white">
                        <p className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide">Puntuación general</p>
                        <div className={`text-7xl font-black ${getRatingColor(currentReview.rating.overall)}`}>
                          {currentReview.rating.overall.toFixed(1)}
                        </div>
                        <Progress value={currentReview.rating.overall * 10} className="w-full h-1.5 mt-4 mb-3 bg-gray-700" />
                        <p className="text-xs text-gray-400 text-center">
                          <Link href="#details" onClick={scrollToDetails} className="hover:text-white transition-colors">
                            Basada en {reviewCategories.length} categorías →
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Pros y Contras */}
                  <div className="mb-8 bg-white rounded-xl shadow-sm overflow-hidden p-6">
                    <h2 className="text-2xl font-semibold mb-4">Pros y Contras</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-green-50 rounded-xl p-5">
                        <h3 className="text-base font-bold mb-3 text-green-700 uppercase tracking-wide">✓ Pros</h3>
                        <ul className="space-y-2">
                          {pros.map((pro, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-2"
                            >
                              <Plus className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                              <span className="text-sm text-gray-700">{pro}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-red-50 rounded-xl p-5">
                        <h3 className="text-base font-bold mb-3 text-red-700 uppercase tracking-wide">✗ Contras</h3>
                        <ul className="space-y-2">
                          {cons.map((con, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-2"
                            >
                              <Minus className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                              <span className="text-sm text-gray-700">{con}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Extras */}
                  <div className="mb-8 bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6">
                      <VehicleExtras
                        extras={currentReview.extras}
                        basePrice={currentReview.basePrice}
                        totalPrice={currentReview.totalPrice}
                      />
                    </div>
                  </div>

                  {/* Nuestra Review */}
                  <section id="overview" className="bg-white rounded-xl shadow-sm p-8 mb-8">
                    <h2 className="text-3xl font-bold mb-2 text-gray-900">Nuestra Review</h2>
                    <div className="w-12 h-1 bg-red-500 rounded mb-8" />
                    {renderContent()}
                  </section>

                  <div className="mt-4 space-y-12">
                    {/* Notas */}
                    <section id="details" ref={detailsRef} className="bg-white rounded-xl shadow-sm p-6">
                      <h2 className="text-2xl font-semibold mb-2">Notas</h2>
                      <div className="w-8 h-1 bg-red-500 rounded mb-6" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {reviewCategories.map((category) => {
                          const ratingValue = category.value
                          const isHonorMatricula = Math.abs(ratingValue - 12) < 0.001
                          const displayValue = isHonorMatricula ? 10 : ratingValue
                          const hasSubcategories = category.subcategories && category.subcategories.length > 0
                          let performanceAvg = displayValue
                          if (hasSubcategories) {
                            const values = category.subcategories!.map((sub) =>
                              Math.abs(sub.value - 12) < 0.001 ? 10 : sub.value
                            )
                            performanceAvg = values.reduce((a, b) => a + b, 0) / values.length
                          }
                          return (
                            <div
                              key={category.key}
                              className={`border-b border-gray-100 pb-4 ${isHonorMatricula ? "bg-purple-50 rounded-xl p-3" : ""}`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="flex items-center gap-2 cursor-help">
                                      <category.icon
                                        className={`w-5 h-5 ${isHonorMatricula ? "text-purple-600" : "text-gray-500"}`}
                                      />
                                      <span className={`font-medium text-sm ${isHonorMatricula ? "text-purple-700" : "text-gray-700"}`}>
                                        {category.title}
                                      </span>
                                      {isHonorMatricula && (
                                        <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-purple-600 rounded-full">
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
                                  className={`text-2xl font-black ${isHonorMatricula ? "text-purple-700" : getRatingColor(hasSubcategories ? performanceAvg : displayValue)}`}
                                >
                                  {hasSubcategories ? performanceAvg.toFixed(1) : displayValue.toFixed(1)}
                                </span>
                              </div>
                              <Progress
                                value={(hasSubcategories ? performanceAvg : displayValue) * 10}
                                className={`h-1.5 mb-2 ${isHonorMatricula ? "bg-purple-200" : ""}`}
                              />
                              {hasSubcategories && (
                                <div className="mt-3 pl-4 border-l-2 border-gray-200">
                                  {category.subcategories!.map((subcategory) => {
                                    const subIsHM = Math.abs(subcategory.value - 12) < 0.001
                                    const subVal = subIsHM ? 10 : subcategory.value
                                    return (
                                      <div key={subcategory.key} className="mb-3">
                                        <div className="flex items-center justify-between mb-1">
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <div className="flex items-center gap-2 cursor-help">
                                                {subcategory.key === "irregularSurface" ? (
                                                  <Mountain className="w-4 h-4 text-gray-400" />
                                                ) : (
                                                  <Road className="w-4 h-4 text-gray-400" />
                                                )}
                                                <span className="text-xs font-medium text-gray-600">{subcategory.title}</span>
                                              </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              <p className="max-w-xs">{subcategory.description}</p>
                                            </TooltipContent>
                                          </Tooltip>
                                          <span className={`text-sm font-bold ${subIsHM ? "text-purple-700" : "text-gray-700"}`}>
                                            {subVal.toFixed(1)}
                                          </span>
                                        </div>
                                        <Progress value={subVal * 10} className="h-1 mb-1" />
                                      </div>
                                    )
                                  })}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </section>

                    {/* Video */}
                    {currentReview.youtubeId && (
                      <section id="video" className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-2xl font-semibold mb-2">Video Review</h2>
                        <div className="w-8 h-1 bg-red-500 rounded mb-6" />
                        <div className="w-full aspect-video rounded-xl overflow-hidden">
                          <Suspense fallback={<div>Cargando video...</div>}>
                            <DynamicYouTubeEmbed videoId={currentReview.youtubeId} title={currentReview.title} />
                          </Suspense>
                        </div>
                      </section>
                    )}

                    {/* Rivales */}
                    <section id="rivals" className="bg-white rounded-xl shadow-sm p-6">
                      <h2 className="text-2xl font-semibold mb-2">Rivales</h2>
                      <div className="w-8 h-1 bg-red-500 rounded mb-6" />
                      {rivals.length === 0 ? (
                        <p className="text-gray-400 italic">Sin rivales definidos.</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {rivals.map((rival) => (
                            <div key={rival.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                              <div className="relative h-48">
                                <Image
                                  src={rival.imageUrl || "/placeholder.svg"}
                                  alt={rival.title}
                                  fill
                                  className="object-cover"
                                />
                                <div className="absolute top-2 right-2 bg-white rounded-lg px-2 py-1 shadow-md">
                                  <span className="text-lg font-black">{rival.rating.overall.toFixed(1)}</span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="font-bold text-lg mb-1">{rival.make} {rival.model}</h3>
                                <p className="text-sm text-gray-500 mb-3">{rival.year}</p>
                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{rival.excerpt}</p>
                                <Button variant="outline" size="sm" onClick={() => handleRivalClick(rival.id)}>
                                  Ver review
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </section>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:w-1/4">
                  <TableOfContents headings={headings} />
                </div>
              </div>

              {/* Galería */}
              <section id="gallery" className="bg-white rounded-xl shadow-sm p-6 mt-8">
                <h2 className="text-2xl font-semibold mb-2">Galería de Imágenes</h2>
                <div className="w-8 h-1 bg-red-500 rounded mb-6" />
                <ExpandableGallery images={galleryImages} />
              </section>
            </>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}
