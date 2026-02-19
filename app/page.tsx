import Link from "next/link"
import Image from "next/image"
import { reviews } from "../data/posts"
import { ChevronRight, Zap, Droplet, Flame } from "lucide-react"
import { RatingDisplay } from "../components/rating-display"
import { parseISO } from "date-fns"
import { ImageCarousel } from "../components/ImageCarousel"

// Nuevos imports
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ReviewBadge } from "../components/ReviewBadge"
import { Button } from "@/components/ui/button"

export default function Home() {
  const featuredReview = reviews[0]
  const latestReviews = reviews.slice(1, 4)

  // Datos de ejemplo para los testimonios
  const testimonials = [
    {
      name: "María García",
      role: "Entusiasta del motor",
      content:
        "ZonaMotor360 se ha convertido en mi fuente de confianza para todas las noticias y reviews del mundo del automóvil. Su análisis detallado y honesto es inigualable.",
      avatar: "/placeholder.svg?height=40&width=40&text=MG",
    },
    {
      name: "Carlos Rodríguez",
      role: "Periodista automotriz",
      content:
        "Como profesional del sector, aprecio la profundidad y la precisión de las reviews de ZonaMotor360. Su equipo realmente entiende de coches.",
      avatar: "/placeholder.svg?height=40&width=40&text=CR",
    },
    {
      name: "Laura Martínez",
      role: "Propietaria de concesionario",
      content:
        "ZonaMotor360 ofrece una visión imparcial y completa que ayuda a nuestros clientes a tomar decisiones informadas. Es un recurso valioso para la industria.",
      avatar: "/placeholder.svg?height=40&width=40&text=LM",
    },
  ]

  // Logos de marcas colaboradoras
  const brandLogos = [
    { name: "Mazda", logo: "/placeholder.svg?height=60&width=60&text=Mazda", url: "https://www.mazda.es" },
    {
      name: "Mercedes",
      logo: "/placeholder.svg?height=60&width=60&text=Mercedes",
      url: "https://www.mercedes-benz.es",
    },
    { name: "Polestar", logo: "/placeholder.svg?height=60&width=60&text=Polestar", url: "https://www.polestar.com/es" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[70vh] bg-gray-900">
        <Image
          src={featuredReview.imageUrl || "/placeholder.svg"}
          alt={featuredReview.title}
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto">
            <span className="text-blue-400 font-semibold mb-2 block">Review Destacada</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {featuredReview.make} {featuredReview.model} {featuredReview.trim}
            </h1>
            <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-300">
              {featuredReview.title.split(": ")[1]}
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white text-gray-900 rounded-lg p-3 flex items-center">
                <span className="text-3xl font-bold mr-2">{featuredReview.rating.overall.toFixed(1)}</span>
                <div className="text-sm">
                  <div className="font-semibold">Puntuación</div>
                  <div>de 10</div>
                </div>
              </div>
              <span className="text-xl font-semibold text-white">{featuredReview.price}</span>
            </div>
            <p className="text-lg text-gray-200 max-w-2xl mb-6">{featuredReview.excerpt}</p>
            <Link
              href={`/review/${featuredReview.id}`}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Leer review completa
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Latest Reviews Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Últimas Reviews</h2>
          <Link href="/reviews" className="text-blue-600 hover:text-blue-800 text-lg">
            Ver todas las reviews
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestReviews.map((review) => (
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
                <p className="text-sm text-gray-600 font-medium mb-3">
                  {review.title.split(": ")[1] || review.excerpt}
                </p>
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

      {/* Brands Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Explora nuestras marcas</h2>
          <Link href="/marcas" className="text-blue-600 hover:text-blue-800 text-lg">
            Ver todas las marcas
          </Link>
        </div>
        <p className="text-lg text-gray-600 mb-8">
          Descubre todos los vehículos que hemos analizado, organizados por marca. Desde los últimos modelos eléctricos
          hasta los clásicos deportivos, encuentra detalladas reviews y comparativas.
        </p>
        <Button asChild size="lg">
          <Link href="/marcas">Explorar marcas</Link>
        </Button>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros lectores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-50">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-lg font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-600 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Logos Section */}
      <div className="bg-gray-100 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Marcas con las que colaboramos</h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {brandLogos.map((brand, index) => (
              <a
                key={index}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-24 h-24 flex items-center justify-center hover:scale-110 transition-transform duration-300"
              >
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={brand.name}
                  width={60}
                  height={60}
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

