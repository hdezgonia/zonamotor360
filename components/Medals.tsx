import type React from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Zap,
  Gauge,
  Crown,
  Cpu,
  Shield,
  Palette,
  DollarSign,
  Battery,
  Shuffle,
  Leaf,
  Mountain,
  PenToolIcon as Tools,
  Award,
  Compass,
  Headphones,
  Feather,
  Droplet,
  Wifi,
  Smile,
  Sun,
} from "lucide-react"

interface MedalProps {
  name: string
  description: string
  color: string
  icon: React.ReactNode
}

const MedalSVG: React.FC<{ color: string; icon: React.ReactNode }> = ({ color, icon }) => (
  <div className="relative">
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill={color} />
      <circle cx="20" cy="20" r="16" fill="white" />
      <circle cx="20" cy="20" r="14" fill={color} />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center text-white">{icon}</div>
  </div>
)

export const Medal: React.FC<MedalProps> = ({ name, description, color, icon }) => {
  const medalSlug = name.toLowerCase().replace(/\s+/g, "-")

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="cursor-pointer">
            <MedalSVG color={color} icon={icon} />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="p-2 max-w-xs">
            <h3 className="font-bold text-sm mb-1">{name}</h3>
            <p className="text-xs">{description}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export const medals = {
  performance: (
    <Medal
      name="Rendimiento Excepcional"
      description="Destaca por su potencia y aceleración"
      color="#FFD700"
      icon={<Gauge size={20} />}
    />
  ),
  efficiency: (
    <Medal
      name="Eficiencia Sobresaliente"
      description="Consumo de combustible o energía optimizado"
      color="#4CAF50"
      icon={<Zap size={20} />}
    />
  ),
  luxury: (
    <Medal
      name="Lujo Supremo"
      description="Máximo confort y acabados de alta calidad"
      color="#8E44AD"
      icon={<Crown size={20} />}
    />
  ),
  technology: (
    <Medal
      name="Innovación Tecnológica"
      description="Equipado con las últimas tecnologías automotrices"
      color="#3498DB"
      icon={<Cpu size={20} />}
    />
  ),
  safety: (
    <Medal
      name="Seguridad Avanzada"
      description="Sistemas de seguridad de vanguardia"
      color="#E74C3C"
      icon={<Shield size={20} />}
    />
  ),
  design: (
    <Medal
      name="Diseño Vanguardista"
      description="Estética sobresaliente y aerodinámica innovadora"
      color="#F39C12"
      icon={<Palette size={20} />}
    />
  ),
  value: (
    <Medal
      name="Mejor Relación Calidad-Precio"
      description="Ofrece excelentes prestaciones a un precio competitivo"
      color="#2ECC71"
      icon={<DollarSign size={20} />}
    />
  ),
  electric: (
    <Medal
      name="Movilidad Eléctrica"
      description="Vehículo totalmente eléctrico con gran autonomía"
      color="#1ABC9C"
      icon={<Battery size={20} />}
    />
  ),
  versatility: (
    <Medal
      name="Versatilidad Excepcional"
      description="Adaptable a diversas condiciones y necesidades"
      color="#FF6B6B"
      icon={<Shuffle size={20} />}
    />
  ),
  eco: (
    <Medal
      name="Eco-Friendly"
      description="Vehículo con bajo impacto ambiental y emisiones reducidas"
      color="#27AE60"
      icon={<Leaf size={20} />}
    />
  ),
  offroad: (
    <Medal
      name="Capacidad Off-Road"
      description="Excelente rendimiento en terrenos difíciles"
      color="#D35400"
      icon={<Mountain size={20} />}
    />
  ),
  reliability: (
    <Medal
      name="Fiabilidad Probada"
      description="Historial de durabilidad y bajo mantenimiento"
      color="#34495E"
      icon={<Tools size={20} />}
    />
  ),
  innovation: (
    <Medal
      name="Innovación Pionera"
      description="Introduce tecnologías o características revolucionarias"
      color="#9B59B6"
      icon={<Award size={20} />}
    />
  ),
  // New medals
  handling: (
    <Medal
      name="Manejo Excepcional"
      description="Dirección precisa y comportamiento dinámico sobresaliente"
      color="#FF5722"
      icon={<Compass size={20} />}
    />
  ),
  comfort: (
    <Medal
      name="Confort Superior"
      description="Experiencia de viaje excepcionalmente cómoda y silenciosa"
      color="#795548"
      icon={<Headphones size={20} />}
    />
  ),
  lightweight: (
    <Medal
      name="Construcción Ligera"
      description="Uso innovador de materiales ligeros para mejorar el rendimiento"
      color="#607D8B"
      icon={<Feather size={20} />}
    />
  ),
  fuelEfficiency: (
    <Medal
      name="Eficiencia de Combustible"
      description="Consumo de combustible excepcionalmente bajo"
      color="#009688"
      icon={<Droplet size={20} />}
    />
  ),
  connectivity: (
    <Medal
      name="Conectividad Avanzada"
      description="Sistemas de infoentretenimiento y conectividad de última generación"
      color="#00BCD4"
      icon={<Wifi size={20} />}
    />
  ),
  familyFriendly: (
    <Medal
      name="Amigable para Familias"
      description="Diseño y características orientadas a la comodidad familiar"
      color="#CDDC39"
      icon={<Smile size={20} />}
    />
  ),
  solarPowered: (
    <Medal
      name="Energía Solar"
      description="Incorpora tecnología solar para mejorar la eficiencia energética"
      color="#FFC107"
      icon={<Sun size={20} />}
    />
  ),
}

export type MedalType = keyof typeof medals

