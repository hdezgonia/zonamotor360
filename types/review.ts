export interface Review {
  id?: number
  title: string
  make: string
  logoUrl: string
  model: string
  trim: string
  year: number
  categories: string[]
  price: string
  rating: {
    overall?: number
    performance: number
    irregularSurface?: number
    goodSurface?: number
    funToDrive?: number
    comfort: number
    practicality: number
    value: number
    design: number
    technology: number
    efficiency: number
    safety: number
    chargingEase?: number
    range?: number
    routeGeneration?: number
    notes?: {
      [key: string]: string
    }
  }
  excerpt: string
  summary: string
  content: string
  imageUrl: string
  specs: {
    power: string
    acceleration: string
    topSpeed: string
    efficiency: string
    weight: string
    engine?: string
  }
  youtubeId?: string
  rivals: number[]
  reviewDate: string
  isElectric: boolean
  fuelType?: string
  kilometersRecorded?: number
  medals: string[]
  accessories: {
    name: string
    description: string
    price: string
  }[]
  extras: {
    name: string
    description: string
    price: string
  }[]
  basePrice: string
  totalPrice: string
  reviewType: "short" | "detailed" | "first-impression" | "presentation"
  pros: string[]
  cons: string[]
  gallery?: string[]
}

export const initialReview: Review = {
  title: "",
  make: "",
  logoUrl: "/placeholder.svg?height=50&width=50",
  model: "",
  trim: "",
  year: new Date().getFullYear(),
  categories: [],
  price: "",
  rating: {
    performance: 0,
    comfort: 0,
    practicality: 0,
    value: 0,
    design: 0,
    technology: 0,
    efficiency: 0,
    safety: 0,
    notes: {},
  },
  excerpt: "",
  summary: "",
  content: "",
  imageUrl: "/placeholder.svg?height=600&width=800",
  specs: {
    power: "",
    acceleration: "",
    topSpeed: "",
    efficiency: "",
    weight: "",
  },
  youtubeId: "",
  rivals: [],
  reviewDate: new Date().toISOString().split("T")[0],
  isElectric: false,
  medals: [],
  accessories: [],
  extras: [],
  basePrice: "",
  totalPrice: "",
  reviewType: "detailed",
  pros: [],
  cons: [],
  gallery: [],
}

