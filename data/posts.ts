export { reviews, categories, makes, getAllCategories, getAllMakes } from "./reviews/index"
export type { CarReview, ReviewType } from "./reviews/types"

// Funciones legacy que otros componentes necesitan
export const normalizeRating = (rating: number): { value: number; isHonor: boolean } => {
  const isHonor = Math.abs(rating - 12) < 0.001
  return { value: isHonor ? 10 : rating, isHonor }
}

export const calculateWeightedRating = (ratings: Record<string, number>): number => {
  let totalWeight = 0
  let weightedSum = 0
  Object.values(ratings).forEach((value) => {
    const isHonor = Math.abs(value - 12) < 0.001
    const normalizedValue = isHonor ? 10 : value
    const weight = isHonor ? 12 : 1
    weightedSum += normalizedValue * weight
    totalWeight += weight
  })
  return totalWeight > 0 ? weightedSum / totalWeight : 0
}

export const getHonorMatriculasCount = (review: { rating: Record<string, number> }): number => {
  return Object.values(review.rating).filter((value) => Math.abs(value - 12) < 0.001).length
}
