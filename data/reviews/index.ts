import mazda3NagisaReview from "./mazda-3-nagisa.json"
import mercedesB180DReview from "./mercedes-b180d-progressive.json"
import polestar2SingleMotorReview from "./polestar-2-single-motor.json"
import polestar2PerformanceReview from "./polestar-2-performance.json"
import polestar4Review from "./polestar-4.json"
import type { CarReview } from "./types"

export const reviews: CarReview[] = [
  {
    ...mazda3NagisaReview,
    reviewType: "detailed",
    medals: ["performance", "design", "eco"],
    summary: "El Mazda 3 Nagisa combina deportividad y elegancia en un paquete compacto y eficiente.",
    accessories: [
      {
        name: "Llantas de aleación de 18 pulgadas",
        description: "Diseño exclusivo Nagisa",
        price: "800 €",
      },
      {
        name: "Sistema de sonido Bose",
        description: "12 altavoces de alta fidelidad",
        price: "650 €",
      },
    ],
    extras: [
      {
        name: "Techo solar panorámico",
        description: "Con apertura eléctrica",
        price: "1.100 €",
      },
      {
        name: "Paquete de iluminación ambiental",
        description: "LED con múltiples colores",
        price: "350 €",
      },
      {
        name: "Head-up Display",
        description: "Proyección de información en el parabrisas",
        price: "600 €",
      },
    ],
    basePrice: "32.525 €",
    totalPrice: "35.175 €",
  },
  {
    ...mercedesB180DReview,
    reviewType: "short",
    fuelType: "diesel",
    medals: ["luxury", "efficiency", "reliability"],
    summary: "El Mercedes B180D Progressive ofrece lujo y eficiencia en un formato monovolumen compacto.",
    accessories: [
      {
        name: "Paquete Night",
        description: "Elementos exteriores en negro brillante",
        price: "550 €",
      },
      {
        name: "Asientos calefactados",
        description: "Para conductor y acompañante",
        price: "400 €",
      },
    ],
    extras: [
      {
        name: "Sistema de navegación MBUX",
        description: "Con realidad aumentada",
        price: "1.200 €",
      },
      {
        name: "Paquete de aparcamiento con cámara 360°",
        description: "Incluye asistente de aparcamiento activo",
        price: "900 €",
      },
      {
        name: "Techo panorámico",
        description: "Con apertura eléctrica",
        price: "1.500 €",
      },
    ],
    basePrice: "38.775 €",
    totalPrice: "42.375 €",
  },
  {
    ...polestar2SingleMotorReview,
    reviewType: "first-impression",
    medals: ["electric", "technology", "eco"],
    summary: "El Polestar 2 Single Motor ofrece una experiencia de conducción eléctrica refinada y eficiente.",
    accessories: [
      {
        name: "Llantas de 20 pulgadas",
        description: "Diseño de 4 radios en Y",
        price: "1.000 €",
      },
      {
        name: "Interior Nappa",
        description: "Tapicería de cuero ventilada",
        price: "4.000 €",
      },
    ],
    extras: [
      {
        name: "Paquete Pilot",
        description: "Incluye Pilot Assist y Adaptive Cruise Control",
        price: "3.500 €",
      },
      {
        name: "Paquete Plus",
        description: "Techo panorámico, audio Harman Kardon, y más",
        price: "4.500 €",
      },
      {
        name: "Bomba de calor",
        description: "Mejora la eficiencia en climas fríos",
        price: "1.250 €",
      },
    ],
    basePrice: "50.190 €",
    totalPrice: "59.440 €",
  },
  {
    ...polestar2PerformanceReview,
    reviewType: "detailed",
    medals: ["electric", "performance", "technology", "innovation"],
    summary:
      "El Polestar 2 Performance lleva la experiencia de conducción eléctrica al siguiente nivel con potencia impresionante.",
    accessories: [
      {
        name: "Llantas de 20 pulgadas Performance",
        description: "Diseño de 4 radios en Y en negro",
        price: "1.200 €",
      },
      {
        name: "Pinzas de freno doradas",
        description: "Mejora estética y funcional",
        price: "500 €",
      },
    ],
    extras: [
      {
        name: "Paquete Performance",
        description: "Incluye amortiguadores Öhlins, frenos Brembo y más",
        price: "6.000 €",
      },
      {
        name: "Paquete Pilot",
        description: "Incluye Pilot Assist y Adaptive Cruise Control",
        price: "3.500 €",
      },
      {
        name: "Techo de cristal",
        description: "Con protección UV y reducción de ruido",
        price: "1.500 €",
      },
    ],
    basePrice: "64.190 €",
    totalPrice: "75.190 €",
  },
  {
    ...polestar4Review,
    reviewType: "presentation",
    medals: ["electric", "luxury", "design", "technology", "innovation"],
    summary:
      "El Polestar 4 redefine el concepto de SUV coupé eléctrico con un diseño vanguardista y tecnología de punta.",
    accessories: [
      {
        name: "Llantas de 22 pulgadas",
        description: "Diseño aerodinámico de 5 radios",
        price: "2.000 €",
      },
      {
        name: "Pintura metalizada premium",
        description: "Color exclusivo Polestar",
        price: "1.500 €",
      },
    ],
    extras: [
      {
        name: "Paquete Pro",
        description: "Incluye techo panorámico, audio Harman Kardon y más",
        price: "6.500 €",
      },
      {
        name: "Paquete Pilot",
        description: "Sistema de conducción semi-autónoma avanzado",
        price: "4.500 €",
      },
      {
        name: "Interior sostenible premium",
        description: "Materiales reciclados de alta calidad",
        price: "3.000 €",
      },
    ],
    basePrice: "75.000 €",
    totalPrice: "89.000 €",
  },
  {
    id: 6,
    title: "Polestar 2 y Polestar 4: El futuro de la movilidad eléctrica",
    make: "Polestar",
    logoUrl: "/placeholder.svg?height=50&width=50&text=Polestar",
    model: "2 y 4",
    trim: "Varios",
    year: 2024,
    categories: ["Eléctrico", "Berlina", "SUV Coupé"],
    price: "Desde 50.190 €",
    rating: {
      overall: 9.2,
      performance: 9.5,
      comfort: 9.0,
      practicality: 8.8,
      value: 8.5,
      design: 9.6,
      technology: 9.7,
      efficiency: 9.3,
      safety: 9.4,
    },
    excerpt:
      "Polestar presenta su visión del futuro con los modelos 2 y 4, combinando rendimiento, diseño y sostenibilidad en una gama eléctrica de vanguardia.",
    summary:
      "Polestar, la marca de vehículos eléctricos de alto rendimiento, reafirma su posición en la vanguardia de la movilidad sostenible con la presentación conjunta del Polestar 2, ahora actualizado, y el nuevo Polestar 4. Estos dos modelos representan la evolución de la marca, ofreciendo una combinación perfecta de rendimiento, diseño escandinavo y tecnología avanzada.",
    content: `# Polestar 2 y Polestar 4: La nueva era de la movilidad eléctrica

## Introducción
Polestar ha consolidado su posición como una de las marcas más innovadoras en el sector de los vehículos eléctricos. Con la presentación conjunta del Polestar 2 actualizado y el nuevo Polestar 4, la compañía demuestra su compromiso con la movilidad sostenible y el alto rendimiento.

## Polestar 2: Evolución de un ícono eléctrico
El Polestar 2, lanzado originalmente en 2020, ha recibido una actualización significativa que mejora su atractivo y capacidades:

- **Rendimiento mejorado**: La versión Performance ahora ofrece 476 CV, permitiendo una aceleración de 0 a 100 km/h en solo 4.2 segundos.
- **Mayor autonomía**: Gracias a mejoras en la eficiencia, ahora puede alcanzar hasta 560 km en ciclo WLTP.
- **Diseño refinado**: Sutiles cambios estéticos que mejoran la aerodinámica y refrescan su apariencia.
- **Tecnología actualizada**: Sistema de infoentretenimiento mejorado con Google integrado y nuevas funciones de asistencia a la conducción.

## Polestar 4: Redefiniendo el SUV coupé eléctrico
El Polestar 4 es la última incorporación a la gama, ocupando un espacio entre el Polestar 2 y el futuro Polestar 5:

- **Diseño vanguardista**: Líneas aerodinámicas y elegantes que desafían las convenciones de los SUV tradicionales.
- **Rendimiento excepcional**: Con una potencia de hasta 544 CV en su versión tope de gama, ofrece una aceleración de 0 a 100 km/h en 3.8 segundos.
- **Tecnología de punta**: Incluye un innovador sistema de cámaras que reemplaza el espejo retrovisor tradicional.
- **Espacio y practicidad**: A pesar de su perfil coupé, ofrece un interior espacioso y versátil.

## Comparativa de modelos

| Característica | Polestar 2 | Polestar 4 |
|----------------|------------|------------|
| Tipo de carrocería | Berlina | SUV Coupé |
| Potencia máxima | 476 CV | 544 CV |
| Aceleración 0-100 km/h | 4.2 s | 3.8 s |
| Autonomía (WLTP) | Hasta 560 km | Hasta 600 km |
| Precio base | 50.190 € | 75.000 € |

## Conclusión
Polestar demuestra con estos dos modelos su capacidad para ofrecer vehículos eléctricos que no solo son respetuosos con el medio ambiente, sino que también ofrecen un rendimiento y una experiencia de conducción excepcionales. El Polestar 2 y el Polestar 4 representan el presente y el futuro inmediato de la movilidad eléctrica, combinando diseño escandinavo, tecnología de vanguardia y un compromiso inquebrantable con la sostenibilidad.`,
    imageUrl: "/placeholder.svg?height=600&width=800&text=Polestar+2+y+4",
    specs: {
      power: "Hasta 544 CV",
      acceleration: "3.8s 0-100 km/h",
      topSpeed: "210 km/h",
      efficiency: "17.1-18.6 kWh/100km",
      weight: "1940-2250 kg",
    },
    youtubeId: "dQw4w9WgXcQ",
    rivals: [1, 2, 3, 4, 5],
    reviewDate: "2023-11-30",
    isElectric: true,
    kilometersRecorded: 0,
    medals: ["electric", "performance", "technology", "design", "innovation"],
    accessories: [
      {
        name: "Paquete Performance",
        description: "Mejoras en suspensión, frenos y estética",
        price: "6.000 €",
      },
      {
        name: "Sistema de sonido Harman Kardon",
        description: "Audio premium con 13 altavoces",
        price: "1.200 €",
      },
    ],
    extras: [
      {
        name: "Pilot Pack",
        description: "Sistema de conducción semi-autónoma avanzado",
        price: "3.500 €",
      },
      {
        name: "Plus Pack",
        description: "Incluye techo panorámico, bomba de calor y más",
        price: "4.500 €",
      },
    ],
    basePrice: "50.190 €",
    totalPrice: "89.000 €",
    reviewType: "presentation",
  },
]

export const getAllCategories = () => {
  const categoriesSet = new Set<string>()
  reviews.forEach((review) => {
    review.categories.forEach((category) => categoriesSet.add(category))
  })
  return Array.from(categoriesSet)
}

export const categories = getAllCategories()

export const getAllMakes = () => {
  return Array.from(new Set(reviews.map((review) => review.make)))
}

export const makes = getAllMakes()

// Re-exportamos las utilidades para que puedan ser importadas desde data/reviews
export * from "./utils"

// También podríamos re-exportar los datos de reviews desde aquí en el futuro
// export * from "../posts"
export * from "./types"

