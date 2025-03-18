"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Car,
  Video,
  Settings,
  CheckCircle2,
  CircleDashed,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Edit,
  Filter,
  Camera,
  CalendarClock,
  CheckCheck,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import type { RoadmapItem } from "@/types/roadmap"
import { useRouter } from "next/navigation"

// Actualizar los datos iniciales del roadmap con los nuevos elementos proporcionados
const initialRoadmapData: RoadmapItem[] = [
  // Polestar 4 Performance (7 videos)
  {
    id: 1,
    title: "Teaser - Polestar 4 Performance 2025: ¿El coche más potente del año?",
    description: "Descubre el nuevo Polestar 4 Performance 2025 en este teaser visual. ¡No te lo pierdas!",
    category: "video",
    status: "recorded",
    date: "2023-03-23", // Jueves
    recordingDate: "2023-03-15", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Primeras Impresiones - Polestar 4 Performance 2025: ¿Cumple las expectativas?",
    description: "Nuestras primeras impresiones del Polestar 4 Performance 2025. ¡No te lo pierdas!",
    category: "video",
    status: "recorded",
    date: "2023-03-25", // Sábado
    recordingDate: "2023-03-17", // Grabado unos días antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Review Completa - Polestar 4 Performance 2025: Análisis técnico y de conducción",
    description: "Todo lo que necesitas saber sobre el Polestar 4 Performance 2025 en esta review completa.",
    category: "video",
    status: "recorded",
    date: "2023-03-28", // Martes
    recordingDate: "2023-03-20", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Cinemático - Polestar 4 Performance 2025: Conducción épica en 4K",
    description: "Disfruta de tomas espectaculares del Polestar 4 Performance 2025 en acción.",
    category: "video",
    status: "recorded",
    date: "2023-04-06", // Jueves
    recordingDate: "2023-03-29", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "Equipamiento Multimedia - Polestar 4 Performance 2025: Tecnología puntera",
    description: "Exploramos el sistema multimedia del Polestar 4 Performance 2025.",
    category: "video",
    status: "recorded",
    date: "2023-04-11", // Martes
    recordingDate: "2023-04-03", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "POV Conducción - Polestar 4 Performance 2025: Sensaciones reales al volante",
    description: "Conduce con nosotros el Polestar 4 Performance 2025 en primera persona.",
    category: "video",
    status: "recorded",
    date: "2023-04-18", // Martes
    recordingDate: "2023-04-10", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 7,
    title: "Pros y Contras - Polestar 4 Performance 2025: ¿Vale la pena?",
    description: "Resumen de pros y contras del Polestar 4 Performance 2025 en X minutos.",
    category: "video",
    status: "recorded",
    date: "2023-04-25", // Martes
    recordingDate: "2023-04-17", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },

  // Mazda 3 Nagisa (7 videos)
  {
    id: 8,
    title: "Teaser - Mazda 3 Nagisa 2025: ¿La edición especial más deseada?",
    description: "Descubre el nuevo Mazda 3 Nagisa 2025 en este teaser visual.",
    category: "video",
    status: "recorded",
    date: "2023-03-30", // Jueves
    recordingDate: "2023-03-22", // Grabado unos días antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 9,
    title: "Primeras Impresiones - Mazda 3 Nagisa 2025: ¿Un Mazda para enamorarse?",
    description: "Nuestras primeras impresiones del Mazda 3 Nagisa 2025.",
    category: "video",
    status: "recorded",
    date: "2023-04-01", // Sábado
    recordingDate: "2023-03-24", // Grabado unos días antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 10,
    title: "Review Completa - Mazda 3 Nagisa 2025: Análisis a fondo",
    description: "Todo lo que necesitas saber sobre el Mazda 3 Nagisa 2025.",
    category: "video",
    status: "recorded",
    date: "2023-04-04", // Martes
    recordingDate: "2023-03-27", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 11,
    title: "Cinemático - Mazda 3 Nagisa 2025: Belleza en movimiento",
    description: "Disfruta de tomas espectaculares del Mazda 3 Nagisa 2025 en 4K.",
    category: "video",
    status: "recorded",
    date: "2023-04-13", // Jueves
    recordingDate: "2023-04-05", // Grabado unos días antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 12,
    title: "Equipamiento Multimedia - Mazda 3 Nagisa 2025: Tecnología y conectividad",
    description: "Exploramos el sistema multimedia del Mazda 3 Nagisa 2025.",
    category: "video",
    status: "recorded",
    date: "2023-04-20", // Jueves
    recordingDate: "2023-04-12", // Grabado unos días antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 13,
    title: "POV Conducción - Mazda 3 Nagisa 2025: Sensaciones reales al volante",
    description: "Conduce con nosotros el Mazda 3 Nagisa 2025 en primera persona.",
    category: "video",
    status: "recorded",
    date: "2023-04-27", // Jueves
    recordingDate: "2023-04-19", // Grabado unos días antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 14,
    title: "Pros y Contras - Mazda 3 Nagisa 2025: ¿Vale la pena?",
    description: "Resumen de pros y contras del Mazda 3 Nagisa 2025 en X minutos.",
    category: "video",
    status: "recorded",
    date: "2023-05-04", // Jueves
    recordingDate: "2023-04-26", // Grabado unos días antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },

  // Polestar 2 Performance (6 videos)
  {
    id: 15,
    title: "Teaser - Polestar 2 Performance 2025: ¿El rival de Tesla?",
    description: "Descubre el nuevo Polestar 2 Performance 2025 en este teaser visual.",
    category: "video",
    status: "recorded",
    date: "2023-04-15", // Sábado
    recordingDate: "2023-04-07", // Grabado unos días antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 16,
    title: "Primeras Impresiones - Polestar 2 Performance 2025: ¿Un deportivo eléctrico?",
    description: "Nuestras primeras impresiones del Polestar 2 Performance 2025.",
    category: "video",
    status: "recorded",
    date: "2023-04-18", // Martes
    recordingDate: "2023-04-10", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 17,
    title: "Review Completa - Polestar 2 Performance 2025: Análisis técnico y de conducción",
    description: "Todo lo que necesitas saber sobre el Polestar 2 Performance 2025 en esta review completa.",
    category: "video",
    status: "recorded",
    date: "2023-04-22", // Sábado
    recordingDate: "2023-04-14", // Grabado unos días antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 18,
    title: "Equipamiento Multimedia - Polestar 2 Performance 2025: Tecnología puntera",
    description: "Exploramos el sistema multimedia del Polestar 2 Performance 2025.",
    category: "video",
    status: "recorded",
    date: "2023-04-29", // Sábado
    recordingDate: "2023-04-21", // Grabado unos días antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 19,
    title: "POV Conducción - Polestar 2 Performance 2025: Sensaciones reales al volante",
    description: "Conduce con nosotros el Polestar 2 Performance 2025 en primera persona.",
    category: "video",
    status: "recorded",
    date: "2023-05-06", // Sábado
    recordingDate: "2023-04-28", // Grabado unos días antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 20,
    title: "Pros y Contras - Polestar 2 Performance 2025: ¿Vale la pena?",
    description: "Resumen de pros y contras del Polestar 2 Performance 2025 en X minutos.",
    category: "video",
    status: "recorded",
    date: "2023-05-13", // Sábado
    recordingDate: "2023-05-05", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },

  // Renault 5 (6 videos)
  {
    id: 21,
    title: "Teaser - Renault 5 2025: ¿El regreso de un clásico?",
    description: "Descubre el nuevo Renault 5 2025 en este teaser visual.",
    category: "video",
    status: "planned",
    date: "2023-05-19", // Viernes
    recordingDate: "2023-05-12", // Grabado una semana antes
    priority: "high",
    percentComplete: 0,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 22,
    title: "Primeras Impresiones - Renault 5 2025: ¿Un coche para todos?",
    description: "Nuestras primeras impresiones del Renault 5 2025.",
    category: "video",
    status: "planned",
    date: "2023-05-23", // Martes
    recordingDate: "2023-05-16", // Grabado una semana antes
    priority: "high",
    percentComplete: 0,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 23,
    title: "Review Completa - Renault 5 2025: Análisis a fondo",
    description: "Todo lo que necesitas saber sobre el Renault 5 2025.",
    category: "video",
    status: "planned",
    date: "2023-05-26", // Viernes
    recordingDate: "2023-05-19", // Grabado una semana antes
    priority: "high",
    percentComplete: 0,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 24,
    title: "Equipamiento Multimedia - Renault 5 2025: Tecnología y conectividad",
    description: "Exploramos el sistema multimedia del Renault 5 2025.",
    category: "video",
    status: "planned",
    date: "2023-05-30", // Martes
    recordingDate: "2023-05-23", // Grabado una semana antes
    priority: "high",
    percentComplete: 0,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 25,
    title: "POV Conducción - Renault 5 2025: Sensaciones reales al volante",
    description: "Conduce con nosotros el Renault 5 2025 en primera persona.",
    category: "video",
    status: "planned",
    date: "2023-06-02", // Viernes
    recordingDate: "2023-05-26", // Grabado una semana antes
    priority: "high",
    percentComplete: 0,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 26,
    title: "Pros y Contras - Renault 5 2025: ¿Vale la pena?",
    description: "Resumen de pros y contras del Renault 5 2025 en X minutos.",
    category: "video",
    status: "planned",
    date: "2023-06-06", // Martes
    recordingDate: "2023-05-30", // Grabado una semana antes
    priority: "high",
    percentComplete: 0,
    image: "/placeholder.svg?height=200&width=300",
  },

  // Alpine A290 (7 videos)
  {
    id: 27,
    title: "Teaser - Alpine A290 2025: ¿El deportivo eléctrico del futuro?",
    description: "Descubre el nuevo Alpine A290 2025 en este teaser visual.",
    category: "video",
    status: "planned",
    date: "2023-05-26", // Viernes
    recordingDate: "2023-05-19", // Grabado una semana antes
    priority: "high",
    percentComplete: 0,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 28,
    title: "Primeras Impresiones - Alpine A290 2025: ¿Un deportivo para enamorarse?",
    description: "Nuestras primeras impresiones del Alpine A290 2025.",
    category: "video",
    status: "planned",
    date: "2023-05-30", // Martes
    recordingDate: "2023-05-23", // Grabado una semana antes
    priority: "high",
    percentComplete: 0,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 29,
    title: "Review Completa - Alpine A290 2025: Análisis técnico y de conducción",
    description: "Todo lo que necesitas saber sobre el Alpine A290 2025 en esta review completa.",
    category: "video",
    status: "planned",
    date: "2023-06-02", // Viernes
    recordingDate: "2023-05-26", // Grabado una semana antes
    priority: "high",
    percentComplete: 0,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 30,
    title: "Cinemático - Alpine A290 2025: Conducción épica en 4K",
    description: "Disfruta de tomas espectaculares del Alpine A290 2025 en acción.",
    category: "video",
    status: "planned",
    date: "2023-06-06", // Martes
    recordingDate: "2023-05-30", // Grabado una semana antes
    priority: "high",
    percentComplete: 0,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 31,
    title: "Equipamiento Multimedia - Alpine A290 2025: Tecnología puntera",
    description: "Exploramos el sistema multimedia del Alpine A290 2025.",
    category: "video",
    status: "planned",
    date: "2023-06-09", // Viernes
    recordingDate: "2023-06-02", // Grabado una semana antes
    priority: "high",
    percentComplete: 0,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 32,
    title: "POV Conducción - Alpine A290 2025: Sensaciones reales al volante",
    description: "Conduce con nosotros el Alpine A290 2025 en primera persona.",
    category: "video",
    status: "planned",
    date: "2023-06-13", // Martes
    recordingDate: "2023-06-06", // Grabado una semana antes
    priority: "high",
    percentComplete: 0,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 33,
    title: "Pros y Contras - Alpine A290 2025: ¿Vale la pena?",
    description: "Resumen de pros y contras del Alpine A290 2025 en X minutos.",
    category: "video",
    status: "planned",
    date: "2023-06-16", // Viernes
    recordingDate: "2023-06-09", // Grabado una semana antes
    priority: "high",
    percentComplete: 0,
    image: "/placeholder.svg?height=200&width=300",
  },

  // Mercedes B180D Progressive (6 videos)
  {
    id: 34,
    title: "Teaser - Mercedes B180D Progressive 2025: Elegancia y tecnología",
    description: "Descubre el nuevo Mercedes B180D Progressive 2025 en este teaser visual.",
    category: "video",
    status: "recorded",
    date: "2023-06-20", // Martes
    recordingDate: "2023-06-13", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 35,
    title: "Primeras Impresiones - Mercedes B180D Progressive 2025: ¿Un Mercedes para todos?",
    description: "Nuestras primeras impresiones del Mercedes B180D Progressive 2025.",
    category: "video",
    status: "recorded",
    date: "2023-06-23", // Viernes
    recordingDate: "2023-06-16", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 36,
    title: "Review Completa - Mercedes B180D Progressive 2025: Análisis a fondo",
    description: "Todo lo que necesitas saber sobre el Mercedes B180D Progressive 2025.",
    category: "video",
    status: "recorded",
    date: "2023-06-27", // Martes
    recordingDate: "2023-06-20", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 37,
    title: "Equipamiento Multimedia - Mercedes B180D Progressive 2025: Tecnología premium",
    description: "Exploramos el sistema multimedia del Mercedes B180D Progressive 2025.",
    category: "video",
    status: "recorded",
    date: "2023-06-30", // Viernes
    recordingDate: "2023-06-23", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 38,
    title: "POV Conducción - Mercedes B180D Progressive 2025: Sensaciones reales al volante",
    description: "Conduce con nosotros el Mercedes B180D Progressive 2025 en primera persona.",
    category: "video",
    status: "recorded",
    date: "2023-07-04", // Martes
    recordingDate: "2023-06-27", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 39,
    title: "Pros y Contras - Mercedes B180D Progressive 2025: ¿Vale la pena?",
    description: "Resumen de pros y contras del Mercedes B180D Progressive 2025 en X minutos.",
    category: "video",
    status: "recorded",
    date: "2023-07-07", // Viernes
    recordingDate: "2023-06-30", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },

  // Dongfeng Box (6 videos)
  {
    id: 40,
    title: "Teaser - Dongfeng Box 2025: ¿El coche más curioso del año?",
    description: "Descubre el nuevo Dongfeng Box 2025 en este teaser visual.",
    category: "video",
    status: "recorded",
    date: "2023-07-11", // Martes
    recordingDate: "2023-07-04", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 41,
    title: "Primeras Impresiones - Dongfeng Box 2025: ¿Un coche chino que sorprende?",
    description: "Nuestras primeras impresiones del Dongfeng Box 2025.",
    category: "video",
    status: "recorded",
    date: "2023-07-14", // Viernes
    recordingDate: "2023-07-07", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 42,
    title: "Review Completa - Dongfeng Box 2025: Análisis a fondo",
    description: "Todo lo que necesitas saber sobre el Dongfeng Box 2025.",
    category: "video",
    status: "recorded",
    date: "2023-07-18", // Martes
    recordingDate: "2023-07-11", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 43,
    title: "Equipamiento Multimedia - Dongfeng Box 2025: Tecnología y conectividad",
    description: "Exploramos el sistema multimedia del Dongfeng Box 2025.",
    category: "video",
    status: "recorded",
    date: "2023-07-21", // Viernes
    recordingDate: "2023-07-14", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 44,
    title: "POV Conducción - Dongfeng Box 2025: Sensaciones reales al volante",
    description: "Conduce con nosotros el Dongfeng Box 2025 en primera persona.",
    category: "video",
    status: "recorded",
    date: "2023-07-25", // Martes
    recordingDate: "2023-07-18", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 45,
    title: "Pros y Contras - Dongfeng Box 2025: ¿Vale la pena?",
    description: "Resumen de pros y contras del Dongfeng Box 2025 en X minutos.",
    category: "video",
    status: "recorded",
    date: "2023-07-28", // Viernes
    recordingDate: "2023-07-21", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },

  // Polestar 2 Long Range Single Motor (6 videos)
  {
    id: 46,
    title: "Teaser - Polestar 2 Long Range Single Motor 2025: ¿Eléctrico y eficiente?",
    description: "Descubre el nuevo Polestar 2 Long Range Single Motor 2025 en este teaser visual.",
    category: "video",
    status: "recorded",
    date: "2023-08-01", // Martes
    recordingDate: "2023-07-25", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 47,
    title: "Primeras Impresiones - Polestar 2 Long Range Single Motor 2025: ¿Un coche para el día a día?",
    description: "Nuestras primeras impresiones del Polestar 2 Long Range Single Motor 2025.",
    category: "video",
    status: "recorded",
    date: "2023-08-04", // Viernes
    recordingDate: "2023-07-28", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 48,
    title: "Review Completa - Polestar 2 Long Range Single Motor 2025: Análisis a fondo",
    description: "Todo lo que necesitas saber sobre el Polestar 2 Long Range Single Motor 2025.",
    category: "video",
    status: "recorded",
    date: "2023-08-08", // Martes
    recordingDate: "2023-08-01", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 49,
    title: "Equipamiento Multimedia - Polestar 2 Long Range Single Motor 2025: Tecnología y conectividad",
    description: "Exploramos el sistema multimedia del Polestar 2 Long Range Single Motor 2025.",
    category: "video",
    status: "recorded",
    date: "2023-08-11", // Viernes
    recordingDate: "2023-08-04", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 50,
    title: "POV Conducción - Polestar 2 Long Range Single Motor 2025: Sensaciones reales al volante",
    description: "Conduce con nosotros el Polestar 2 Long Range Single Motor 2025 en primera persona.",
    category: "video",
    status: "recorded",
    date: "2023-08-15", // Martes
    recordingDate: "2023-08-08", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 51,
    title: "Pros y Contras - Polestar 2 Long Range Single Motor 2025: ¿Vale la pena?",
    description: "Resumen de pros y contras del Polestar 2 Long Range Single Motor 2025 en X minutos.",
    category: "video",
    status: "recorded",
    date: "2023-08-18", // Viernes
    recordingDate: "2023-08-11", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },

  // Polestar 4 Long Range Single Motor (6 videos)
  {
    id: 52,
    title: "Teaser - Polestar 4 Long Range Single Motor 2025: ¿Eléctrico y eficiente?",
    description: "Descubre el nuevo Polestar 4 Long Range Single Motor 2025 en este teaser visual.",
    category: "video",
    status: "recorded",
    date: "2023-08-22", // Martes
    recordingDate: "2023-08-15", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 53,
    title: "Primeras Impresiones - Polestar 4 Long Range Single Motor 2025: ¿Un coche para el día a día?",
    description: "Nuestras primeras impresiones del Polestar 4 Long Range Single Motor 2025.",
    category: "video",
    status: "recorded",
    date: "2023-08-25", // Viernes
    recordingDate: "2023-08-18", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 54,
    title: "Review Completa - Polestar 4 Long Range Single Motor 2025: Análisis a fondo",
    description: "Todo lo que necesitas saber sobre el Polestar 4 Long Range Single Motor 2025.",
    category: "video",
    status: "recorded",
    date: "2023-08-29", // Martes
    recordingDate: "2023-08-22", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 55,
    title: "Equipamiento Multimedia - Polestar 4 Long Range Single Motor 2025: Tecnología y conectividad",
    description: "Exploramos el sistema multimedia del Polestar 4 Long Range Single Motor 2025.",
    category: "video",
    status: "recorded",
    date: "2023-09-01", // Viernes
    recordingDate: "2023-08-25", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 56,
    title: "POV Conducción - Polestar 4 Long Range Single Motor 2025: Sensaciones reales al volante",
    description: "Conduce con nosotros el Polestar 4 Long Range Single Motor 2025 en primera persona.",
    category: "video",
    status: "recorded",
    date: "2023-09-05", // Martes
    recordingDate: "2023-08-29", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 57,
    title: "Pros y Contras - Polestar 4 Long Range Single Motor 2025: ¿Vale la pena?",
    description: "Resumen de pros y contras del Polestar 4 Long Range Single Motor 2025 en X minutos.",
    category: "video",
    status: "recorded",
    date: "2023-09-08", // Viernes
    recordingDate: "2023-09-01", // Grabado una semana antes
    priority: "high",
    percentComplete: 100,
    image: "/placeholder.svg?height=200&width=300",
  }
]

// Mapeo de categorías para visualización
const categoryMap: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  review: {
    label: "Review",
    icon: <Car className="h-4 w-4" />,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
  },
  video: {
    label: "Video",
    icon: <Video className="h-4 w-4" />,
    color: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
  },
  feature: {
    label: "Característica",
    icon: <Settings className="h-4 w-4" />,
    color: "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100",
  },
}

// Mapeo de estados para visualización
const statusMap: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  planned: {
    label: "Planificado",
    icon: <CircleDashed className="h-4 w-4" />,
    color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
  },
  confirmed: {
    label: "Confirmado",
    icon: <CheckCircle2 className="h-4 w-4" />,
    color: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
  },
  recorded: {
    label: "Grabación Realizada",
    icon: <CheckCheck className="h-4 w-4" />,
    color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100",
  },
  "in-production": {
    label: "En Producción",
    icon: <Video className="h-4 w-4" />,
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
  },
  "in-development": {
    label: "En Desarrollo",
    icon: <Settings className="h-4 w-4" />,
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
  },
  delayed: {
    label: "Retrasado",
    icon: <AlertCircle className="h-4 w-4" />,
    color: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
  },
}

export default function RoadmapPage() {
  const [roadmapData, setRoadmapData] = useState<RoadmapItem[]>(initialRoadmapData)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [expandedItems, setExpandedItems] = useState<number[]>([])
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Verificar si el usuario es administrador
    const checkAdmin = () => {
      const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true"
      setIsAdmin(isAuthenticated)
    }

    checkAdmin()
  }, [])

  // Filtrar los elementos del roadmap según las selecciones
  const filteredRoadmap = roadmapData.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus
    return matchesCategory && matchesStatus
  })

  // Ordenar por fecha
  const sortedRoadmap = [...filteredRoadmap].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })

  // Agrupar por mes para la visualización
  const groupedByMonth: Record<string, RoadmapItem[]> = {}
  sortedRoadmap.forEach((item) => {
    const date = new Date(item.date)
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`
    if (!groupedByMonth[monthKey]) {
      groupedByMonth[monthKey] = []
    }
    groupedByMonth[monthKey].push(item)
  })

  // Ordenar los meses para la visualización
  const sortedMonths = Object.keys(groupedByMonth).sort()

  const getMonthName = (monthKey: string) => {
    const [year, month] = monthKey.split("-").map(Number)
    const date = new Date(year, month - 1, 1)
    return date.toLocaleDateString("es-ES", { month: "long", year: "numeric" })
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "No definida"
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })
  }

  const toggleItemExpanded = (id: number) => {
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]))
  }

  const handleEditRoadmap = () => {
    if (isAdmin) {
      router.push("/admin/roadmap")
    } else {
      toast({
        title: "Acceso restringido",
        description: "Solo los administradores pueden editar el roadmap.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Próximos Lanzamientos</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Descubre las próximas reviews, videos y características que estamos preparando para ti. Mantente al día con
          todo lo que viene en ZonaMotor360.
        </p>
      </motion.div>

      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-sm py-1 px-3">
            <Calendar className="h-4 w-4 mr-1" />
            Última actualización: {new Date().toLocaleDateString()}
          </Badge>

          {isAdmin && (
            <Button variant="outline" size="sm" onClick={handleEditRoadmap}>
              <Edit className="h-4 w-4 mr-1" />
              Editar Roadmap
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          <Badge
            variant="outline"
            className={`text-sm py-1 px-3 ${selectedCategory === "all" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
            onClick={() => setSelectedCategory("all")}
            style={{ cursor: "pointer" }}
          >
            <Filter className="h-4 w-4 mr-1" />
            Todos
          </Badge>

          {Object.entries(categoryMap).map(([key, { label, icon, color }]) => (
            <Badge
              key={key}
              variant="outline"
              className={`text-sm py-1 px-3 ${selectedCategory === key ? color : ""}`}
              onClick={() => setSelectedCategory(selectedCategory === key ? "all" : key)}
              style={{ cursor: "pointer" }}
            >
              {icon}
              <span className="ml-1">{label}</span>
            </Badge>
          ))}
        </div>
      </div>

      {/* Filtros de estado */}
      <div className="mb-8 flex flex-wrap gap-2 justify-center">
        <Badge
          variant="outline"
          className={`text-sm py-1 px-3 ${selectedStatus === "all" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
          onClick={() => setSelectedStatus("all")}
          style={{ cursor: "pointer" }}
        >
          Todos los estados
        </Badge>

        {Object.entries(statusMap).map(([key, { label, icon, color }]) => (
          <Badge
            key={key}
            variant="outline"
            className={`text-sm py-1 px-3 ${selectedStatus === key ? color : ""}`}
            onClick={() => setSelectedStatus(selectedStatus === key ? "all" : key)}
            style={{ cursor: "pointer" }}
          >
            {icon}
            <span className="ml-1">{label}</span>
          </Badge>
        ))}
      </div>

      {/* Línea de tiempo vertical */}
      <div className="relative">
        {/* Línea central vertical */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 dark:bg-gray-700 z-0"></div>

        <div className="space-y-16 relative z-10">
          {sortedMonths.map((monthKey, index) => (
            <motion.div
              key={monthKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Marcador de mes */}
              <div className="flex justify-center mb-8">
                <div className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-lg font-bold shadow-md z-10">
                  {getMonthName(monthKey)}
                </div>
              </div>

              <div className="space-y-12">
                {groupedByMonth[monthKey].map((item, itemIndex) => (
                  <div
                    key={item.id}
                    className={`flex flex-col ${itemIndex % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-4`}
                  >
                    {/* Punto en la línea de tiempo - centrado sobre la línea */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-primary rounded-full shadow-md z-10"></div>

                    {/* Contenido del lado izquierdo o derecho */}
                    <div
                      className={`w-full md:w-[calc(50%-2.5rem)] ${itemIndex % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"}`}
                    >
                      <RoadmapTimelineCard
                        item={item}
                        isExpanded={expandedItems.includes(item.id)}
                        onToggleExpand={() => toggleItemExpanded(item.id)}
                        isLeft={itemIndex % 2 === 0}
                        formatDate={formatDate}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Se elimina la sección de sugerencias */}
      <Toaster />
    </div>
  )
}

interface RoadmapTimelineCardProps {
  item: RoadmapItem
  isExpanded: boolean
  onToggleExpand: () => void
  isLeft: boolean
  formatDate: (date: string | null) => string
}

function RoadmapTimelineCard({ item, isExpanded, onToggleExpand, isLeft, formatDate }: RoadmapTimelineCardProps) {
  const category = categoryMap[item.category]
  const status = statusMap[item.status]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`${isLeft ? "items-end" : "items-start"}`}
    >
      <Card className="w-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        {item.image && (
          <div className="relative h-48 w-full overflow-hidden">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <Badge className={category.color}>
                {category.icon}
                <span className="ml-1">{category.label}</span>
              </Badge>
            </div>
          </div>
        )}

        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Badge className={status.color}>
              {status.icon}
              <span className="ml-1">{status.label}</span>
            </Badge>
          </div>
          <CardTitle className="text-xl mt-2">{item.title}</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="flex items-center text-gray-500 dark:text-gray-400">
                <CalendarClock className="h-4 w-4 mr-1" />
                Publicación:
              </span>
              <span className="font-medium">{formatDate(item.date)}</span>
            </div>

            {item.recordingDate && (
              <div className="flex items-center justify-between">
                <span className="flex items-center text-gray-500 dark:text-gray-400">
                  <Camera className="h-4 w-4 mr-1" />
                  Grabación:
                </span>
                <span className="font-medium">{formatDate(item.recordingDate)}</span>
              </div>
            )}
          </div>

          {(item.status === "in-production" || item.status === "in-development") && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progreso</span>
                <span>{item.percentComplete}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${item.percentComplete}%` }}></div>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-0">
          <Button variant="ghost" size="sm" className={`${isLeft ? "ml-auto" : "mr-auto"}`} onClick={onToggleExpand}>
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Menos detalles
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                Más detalles
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

