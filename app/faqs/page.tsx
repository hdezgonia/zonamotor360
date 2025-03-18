"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Search, ChevronUp, Car, PenToolIcon as Tools, Star, Clock, Camera, Users, Zap, Wrench } from "lucide-react"

const faqs = [
  {
    question: "¿Cómo seleccionan los coches para las reviews?",
    answer:
      "Seleccionamos una variedad de vehículos basándonos en las últimas novedades del mercado, la demanda de nuestros lectores y la relevancia en el mercado automotriz actual. Intentamos cubrir una amplia gama de segmentos y precios para satisfacer los intereses de todos nuestros lectores.",
    icon: <Car className="w-6 h-6 text-blue-500" />,
  },
  {
    question: "¿Cuánto tiempo dura típicamente una prueba de un vehículo?",
    answer:
      "Nuestras pruebas suelen durar entre 1 y 2 semanas, dependiendo del vehículo y la profundidad de la review. Esto nos permite experimentar el coche en una variedad de condiciones y situaciones de la vida real, ofreciendo una evaluación más completa y precisa.",
    icon: <Clock className="w-6 h-6 text-green-500" />,
  },
  {
    question: "¿Cómo puedo sugerir un coche para una review?",
    answer:
      "Agradecemos las sugerencias de nuestros lectores. Puedes enviarnos tus ideas a través de nuestro formulario de contacto o en nuestras redes sociales. Aunque no podemos garantizar que revisaremos todos los coches sugeridos, tenemos muy en cuenta la opinión de nuestra audiencia.",
    icon: <Star className="w-6 h-6 text-yellow-500" />,
  },
  {
    question: "¿Qué criterios utilizan para evaluar los vehículos?",
    answer:
      "Evaluamos los vehículos en múltiples categorías, incluyendo rendimiento, confort, practicidad, valor, diseño, tecnología, eficiencia y seguridad. Cada aspecto se puntúa de 1 a 10, y también proporcionamos una puntuación general. Nuestro equipo de expertos considera tanto los aspectos objetivos como la experiencia subjetiva de conducción.",
    icon: <Tools className="w-6 h-6 text-purple-500" />,
  },
  {
    question: "¿Qué equipo utilizan para grabar sus videos?",
    answer:
      "Utilizamos equipos de grabación profesionales, incluyendo cámaras de alta definición, drones para tomas aéreas, micrófonos de alta calidad y equipos de iluminación. Nuestro objetivo es proporcionar la mejor calidad visual y de audio en nuestras reviews.",
    icon: <Camera className="w-6 h-6 text-red-500" />,
  },
  {
    question: "¿Cómo puedo formar parte del equipo de ZonaMotor360?",
    answer:
      "Estamos siempre buscando talentos apasionados por el mundo del motor. Si estás interesado en unirte a nuestro equipo, puedes enviar tu CV y portfolio a nuestro correo de recursos humanos. Valoramos especialmente la experiencia en periodismo automotriz, producción de video y conocimientos técnicos sobre vehículos.",
    icon: <Users className="w-6 h-6 text-indigo-500" />,
  },
  {
    question: "¿Realizan reviews de vehículos eléctricos?",
    answer:
      "Sí, dada la creciente importancia de la movilidad eléctrica, realizamos reviews exhaustivas de vehículos eléctricos. Evaluamos aspectos específicos como la autonomía, la eficiencia de carga y la infraestructura de recarga, además de los criterios estándar que aplicamos a todos los vehículos.",
    icon: <Zap className="w-6 h-6 text-cyan-500" />,
  },
  {
    question: "¿Ofrecen servicios de asesoría para la compra de vehículos?",
    answer:
      "Aunque no ofrecemos servicios de asesoría personalizados, nuestras reviews detalladas y comparativas están diseñadas para ayudar a los lectores a tomar decisiones informadas. Recomendamos utilizar nuestra herramienta de comparación de vehículos y leer nuestras guías de compra para obtener información valiosa antes de adquirir un vehículo.",
    icon: <Wrench className="w-6 h-6 text-orange-500" />,
  },
]

export default function FAQsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openItem, setOpenItem] = useState<string | null>(null)

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Preguntas Frecuentes</h1>

      <div className="max-w-xl mx-auto mb-12">
        <div className="relative">
          <Input
            type="text"
            placeholder="Buscar preguntas frecuentes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Accordion type="single" collapsible className="w-full space-y-4">
          {filteredFaqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index} className="border rounded-lg overflow-hidden">
              <AccordionTrigger
                onClick={() => setOpenItem(openItem === `item-${index}` ? null : `item-${index}`)}
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center text-left">
                    <div className="mr-4">{faq.icon}</div>
                    <div className="flex-grow">{faq.question}</div>
                  </div>
                  <ChevronUp
                    className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${openItem === `item-${index}` ? "rotate-180" : ""}`}
                  />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <AnimatePresence>
                  {openItem === `item-${index}` && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 py-4 bg-gray-50"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>

      {filteredFaqs.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No se encontraron preguntas que coincidan con tu búsqueda. Por favor, intenta con otros términos.
        </p>
      )}
    </div>
  )
}

