import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Video, Mic, Plane } from "lucide-react"

const equipmentCategories = [
  {
    id: "cameras",
    title: "Cámaras",
    icon: <Camera className="w-6 h-6" />,
    items: [
      { name: "Sony A7III", description: "Cámara full-frame de 24.2MP" },
      { name: "Canon EOS R5", description: "Cámara mirrorless de 45MP con grabación 8K" },
      { name: "GoPro Hero 10", description: "Cámara de acción para tomas dinámicas" },
    ],
  },
  {
    id: "lenses",
    title: "Objetivos",
    icon: <Camera className="w-6 h-6" />,
    items: [
      { name: "Sony 24-70mm f/2.8 GM", description: "Zoom estándar de alta calidad" },
      { name: "Canon RF 15-35mm f/2.8L", description: "Ultra gran angular para tomas amplias" },
      { name: "Sigma 85mm f/1.4 DG HSM Art", description: "Teleobjetivo corto para retratos y detalles" },
    ],
  },
  {
    id: "audio",
    title: "Audio",
    icon: <Mic className="w-6 h-6" />,
    items: [
      { name: "Rode VideoMic Pro+", description: "Micrófono de cañón para cámaras" },
      { name: "Sennheiser MKE 600", description: "Micrófono de cañón profesional" },
      { name: "Zoom H6", description: "Grabadora de audio portátil de 6 canales" },
    ],
  },
  {
    id: "drones",
    title: "Drones",
    icon: <Plane className="w-6 h-6" />,
    items: [{ name: "DJI Mavic 3 Pro", description: "Drone con cámara Hasselblad para tomas aéreas de alta calidad" }],
  },
  {
    id: "accessories",
    title: "Accesorios",
    icon: <Video className="w-6 h-6" />,
    items: [
      { name: "DJI Ronin-S", description: "Estabilizador para cámaras DSLR y mirrorless" },
      { name: "Manfrotto MT055CXPRO4", description: "Trípode de fibra de carbono" },
      { name: "Aputure LS C300d II", description: "Luz LED de alta potencia" },
    ],
  },
]

export default function EquipoGrabacionPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Nuestro Equipo de Grabación</h1>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Equipamiento de Última Generación</h2>
        <p className="text-gray-600 mb-6">
          En ZonaMotor360, nos enorgullecemos de utilizar el equipo más avanzado para capturar cada detalle de los
          vehículos que revisamos. Nuestro arsenal tecnológico nos permite ofrecer contenido de la más alta calidad a
          nuestros espectadores.
        </p>
        <Tabs defaultValue="cameras" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2">
            {equipmentCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center">
                {category.icon}
                <span className="ml-2">{category.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          {equipmentCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{item.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{item.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Nuestro Proceso de Grabación</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-600 mb-4">
              Nuestro proceso de grabación está diseñado para capturar la esencia de cada vehículo que revisamos.
              Combinamos tomas estáticas detalladas con secuencias dinámicas en carretera para ofrecer una visión
              completa del automóvil.
            </p>
            <ul className="space-y-2">
              {[
                "Planificación detallada de cada sesión de grabación",
                "Múltiples ángulos para mostrar todos los aspectos del vehículo",
                "Tomas de acción en diversos escenarios de conducción",
                "Iluminación profesional para resaltar el diseño y los detalles",
                "Captura de audio de alta calidad para transmitir la experiencia sonora",
                "Edición meticulosa para crear un contenido atractivo e informativo",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-[400px]">
            <Image
              src="/placeholder.svg?height=400&width=600&text=Proceso+de+Grabación"
              alt="Proceso de grabación de ZonaMotor360"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">¿Quieres ver nuestro equipo en acción?</h2>
        <p className="text-gray-600 mb-6">
          Suscríbete a nuestro canal de YouTube para ver cómo utilizamos todo este equipamiento para crear contenido
          automotriz de primera calidad.
        </p>
        <a
          href="https://www.youtube.com/zonamotor360"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors inline-flex items-center"
        >
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
          </svg>
          Visita nuestro canal
        </a>
      </div>
    </div>
  )
}

