import type { CarReview } from "./types"
export * from "./utils"
export * from "./types"

import civicTypeR from "./civic_type_r.json"
import mercedesB180D from "./mercedes-b180d-progressive.json"
import polestar2Single from "./polestar-2-single-motor.json"
import polestar2Performance from "./polestar-2-performance.json"
import polestar4 from "./polestar-4.json"

export const reviews: CarReview[] = [
  civicTypeR,
  mercedesB180D,
  polestar2Single,
  polestar2Performance,
  polestar4,
].sort((a, b) => new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime()) as CarReview[]

export const getAllCategories = () => {
  return Array.from(new Set(reviews.flatMap((r) => r.categories)))
}
export const categories = getAllCategories()

export const getAllMakes = () => {
  return Array.from(new Set(reviews.map((r) => r.make)))
}
export const makes = getAllMakes()
