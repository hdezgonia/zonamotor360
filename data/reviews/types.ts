import type { MedalType } from "@/components/Medals"

export interface CarReview {
  id: number
  title: string
  make: string
  logoUrl: string
  model: string
  trim: string
  year: number
  categories: string[]
  price: string
  rating: {
    overall: number
    performance: number
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
  }
  youtubeId?: string
  rivals: number[]
  reviewDate: string
  isElectric: boolean
  kilometersRecorded: number
  medals: MedalType[]
  fuelType?: string
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
}

export type ReviewType = "short" | "detailed" | "first-impression" | "presentation"

