import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Zap, Users, Camera, PenTool, Share2, MessageSquare } from "lucide-react"

const steps = [
  {
    icon: <Users className="h-6 w-6 text-blue-500" />,
    title: "Selección del vehículo",
    description: "Elegimos cuidadosamente los vehículos más relevantes y demandados por nuestra audiencia.",
  },
  {
    icon: <Camera className="h-6 w-6 text-blue-500" />,
    title: "Prueba exhaustiva",
    description: "Realizamos pruebas durante 2-3 semanas en diversas condiciones para una evaluación completa.",
  },
  {
    icon: <PenTool className="h-6 w-6 text-blue-500" />,
    title: "Análisis detallado",
    description: "Nuestro equipo de expertos evalúa minuciosamente cada aspecto del vehículo.",
  },
  {
    icon: <Share2 className="h-6 w-6 text-blue-500" />,
    title: "Producción de contenido",
    description: "Creamos contenido multimedia de alta calidad: artículos, videos y fotografías.",
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-blue-500" />,
    title: "Feedback y revisión",
    description: "Incorporamos opiniones de la comunidad y realizamos revisiones finales.",
  },
  {
    icon: <Zap className="h-6 w-6 text-blue-500" />,
    title: "Publicación y difusión",
    description: "Lanzamos el contenido en todas nuestras plataformas para máximo alcance.",
  },
]

export default function ComoTrabajamosPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Cómo Trabajamos en ZonaMotor360</h1>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Nuestro Proceso de Revisión</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                  {step.icon}
                </div>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Colaboración con Marcas</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="mb-4">
              En ZonaMotor360, nos enorgullece colaborar con las marcas más prestigiosas del sector automotriz. Nuestro
              enfoque profesional y nuestra audiencia altamente comprometida nos convierten en el socio ideal para
              showcases de productos, lanzamientos exclusivos y campañas de marketing innovadoras.
            </p>
            <ul className="space-y-2">
              {[
                "Acceso a una audiencia apasionada y conocedora",
                "Contenido de alta calidad y profesionalismo",
                "Alcance multiplataforma para máxima visibilidad",
                "Análisis detallados y opiniones expertas",
                "Oportunidades de co-creación de contenido",
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-[400px]">
            <Image
              src="/placeholder.svg?height=400&width=600&text=Colaboración+con+Marcas"
              alt="Colaboración con marcas de automóviles"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">¿Listo para colaborar con nosotros?</h2>
        <p className="mb-6">
          Descubre cómo podemos trabajar juntos para llevar tu marca al siguiente nivel en el mundo automotriz.
        </p>
        <Button asChild size="lg">
          <Link href="/contacto" className="inline-flex items-center">
            Contáctanos ahora
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

