"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { ChevronDown } from "lucide-react"

const cinematics = [
  { id: 1, title: "The Red Soul.", description: "Una oda visual a la potencia y la aerodinámica." },
  { id: 2, title: "Echoes Of Light.", description: "La coreografía perfecta entre diseño e ingeniería." },
  { id: 3, title: "Echoes Of Performance.", description: "Explorando los límites del rendimiento automotriz." },
]

const CinematicCard = ({ title, description, index }: { title: string; description: string; index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative aspect-video overflow-hidden rounded-lg shadow-lg group"
    >
      <Image
        src={`/placeholder.svg?height=720&width=1280&text=Cinematic+${index + 1}`}
        alt={title}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-6 transition-opacity duration-300 group-hover:opacity-100">
        <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
        <p className="text-lg text-gray-300">{description}</p>
      </div>
    </motion.div>
  )
}

export default function CinematicPage() {
  const { scrollYProgress } = useScroll()
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [1, 1.5])
  const opacityProgress = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1, 0.3, 0.3, 0])

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

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
            className="text-6xl md:text-8xl font-bold mb-0 relative z-10"
          >
            MotionArt
          </motion.h1>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7, type: "spring", stiffness: 200 }}
            className="relative z-20 -mt-4"
          >
            <a
              href="https://www.cinemotor360.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl md:text-2xl font-light bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text p-2 rounded-lg inline-block shadow-lg hover:from-purple-600 hover:to-blue-500 transition-all duration-300"
            >
              By Cinemotor360
            </a>
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
          className="absolute right-8 bottom-8 bg-white bg-opacity-20 rounded-full p-2"
        >
          <ChevronDown className="h-8 w-8 text-white" />
        </motion.div>
      </motion.div>

      <div className="relative w-full aspect-video">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/placeholder-cinematic-reel.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          Experiencias Visuales Únicas
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cinematics.map((cinematic, index) => (
            <CinematicCard key={cinematic.id} {...cinematic} index={index} />
          ))}
        </div>
      </div>

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
                  Nos impulsa la pasión por capturar la esencia del movimiento y la belleza de los automóviles, creando
                  experiencias visuales que inspiran y emocionan.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

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
        <div className="relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-6">Siente la Emoción</h2>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Cada fotograma es una obra de arte, cada secuencia una historia. Descubre el poder de la cinematografía
            automotriz con Cinemotor360.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

