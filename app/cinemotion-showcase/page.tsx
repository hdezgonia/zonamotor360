"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { ChevronDown, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VideoModal } from "@/components/VideoModal"

const cinematics = [
  {
    id: 1,
    title: "The Red Soul",
    description: "Una oda visual a la potencia y la aerodinámica del Ferrari SF90 Stradale.",
    videoId: "dQw4w9WgXcQ",
    details:
      "Exploramos la fusión perfecta entre tecnología de Fórmula 1 y diseño italiano en este hipercoche híbrido. Cada toma captura la esencia de la velocidad y la innovación.",
    duration: "3:45",
    location: "Circuito de Fiorano, Italia",
  },
  {
    id: 2,
    title: "Echoes Of Light",
    description: "La coreografía perfecta entre el diseño y la ingeniería del Audi e-tron GT.",
    videoId: "dQw4w9WgXcQ",
    details:
      "Un viaje visual a través de la elegancia eléctrica. Destacamos cómo la iluminación avanzada del e-tron GT no solo mejora la visibilidad, sino que también define su carácter futurista.",
    duration: "4:20",
    location: "Calles nocturnas de Berlín, Alemania",
  },
  {
    id: 3,
    title: "Echoes Of Performance",
    description: "Explorando los límites del rendimiento con el Porsche 911 GT3 RS.",
    videoId: "dQw4w9WgXcQ",
    details:
      "Una inmersión profunda en la ingeniería de precisión que hace del GT3 RS un ícono en la pista. Capturamos la sinergia entre el piloto y la máquina en cada curva y recta.",
    duration: "5:10",
    location: "Nürburgring Nordschleife, Alemania",
  },
]

const ParallaxSection = ({ children, baseVelocity = 100 }: { children: React.ReactNode; baseVelocity?: number }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, baseVelocity])

  return (
    <motion.div ref={containerRef} style={{ y }} className="relative">
      {children}
    </motion.div>
  )
}

const CinematicCard = ({
  title,
  description,
  videoId,
  details,
  duration,
  location,
  index,
  onOpenVideo,
}: {
  title: string
  description: string
  videoId: string
  details: string
  duration: string
  location: string
  index: number
  onOpenVideo: (videoId: string) => void
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="relative overflow-hidden rounded-lg shadow-2xl bg-black"
    >
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={`/placeholder.svg?height=720&width=1280&text=Cinematic+${index + 1}`}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
          <p className="text-lg text-gray-300 mb-2">{description}</p>
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>{duration}</span>
            <span>{location}</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-300 mb-4">{details}</p>
        <Button
          variant="default"
          size="lg"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => onOpenVideo(videoId)}
        >
          <Play className="w-5 h-5 mr-2" />
          Ver Cinemática
        </Button>
      </div>
    </motion.div>
  )
}

export default function CinemotionShowcasePage() {
  const { scrollYProgress } = useScroll()
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [1, 1.5])
  const opacityProgress = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1, 0.3, 0.3, 0])

  const [isMounted, setIsMounted] = useState(false)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [currentVideoId, setCurrentVideoId] = useState("")

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleOpenVideo = (videoId: string) => {
    setCurrentVideoId(videoId)
    setIsVideoModalOpen(true)
  }

  if (!isMounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <motion.div
        className="relative h-screen flex flex-col items-center justify-center"
        style={{ scale: scaleProgress, opacity: opacityProgress }}
      >
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/placeholder-video.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-6xl md:text-8xl font-bold mb-4 relative z-10"
          >
            CineMotion
          </motion.h1>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7, type: "spring", stiffness: 200 }}
            className="relative z-20"
          >
            <span className="text-xl md:text-2xl font-light bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text p-2 rounded-lg inline-block shadow-lg">
              Experiencias Visuales Automotrices
            </span>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            y: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.5,
              ease: "easeInOut",
            },
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="h-12 w-12 text-white animate-bounce" />
        </motion.div>
      </motion.div>

      <ParallaxSection>
        <div className="container mx-auto px-4 py-24">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Nuestras Cinemáticas
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {cinematics.map((cinematic, index) => (
              <CinematicCard key={cinematic.id} {...cinematic} index={index} onOpenVideo={handleOpenVideo} />
            ))}
          </div>
        </div>
      </ParallaxSection>

      <ParallaxSection baseVelocity={-100}>
        <div className="bg-gradient-to-b from-black to-gray-900 py-24">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-center mb-16"
            >
              Nuestra Pasión
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {["Visión", "Creatividad", "Innovación"].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-4xl font-bold">{value[0]}</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{value}</h3>
                  <p className="text-gray-400">
                    Nos impulsa la pasión por capturar la esencia del movimiento y la belleza de los automóviles,
                    creando experiencias visuales que inspiran y emocionan.
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </ParallaxSection>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-screen flex items-center justify-center"
      >
        <Image
          src="/placeholder.svg?height=1080&width=1920&text=Cinematic+Finale"
          alt="Cinematic Finale"
          layout="fill"
          objectFit="cover"
        />
        <div className="relative z-10 text-center px-4">
          <h2 className="text-5xl md:text-7xl font-bold mb-6">Siente la Emoción</h2>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8">
            Cada fotograma es una obra de arte, cada secuencia una historia. Descubre el poder de la cinematografía
            automotriz con CineMotion.
          </p>
          <Button size="lg" className="text-lg">
            Colabora con Nosotros
          </Button>
        </div>
      </motion.div>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoId={currentVideoId}
        title="Cinemática Automotriz"
      />
    </div>
  )
}

