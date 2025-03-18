// Importamos directamente desde ../posts para evitar problemas de importación
import type { CarReview } from "../posts"

// Función para normalizar las puntuaciones (convertir matrículas de honor a 10 para cálculos)
export const normalizeRating = (rating: number): { value: number; isHonor: boolean } => {
  const isHonor = Math.abs(rating - 12) < 0.001
  return {
    value: isHonor ? 10 : rating,
    isHonor,
  }
}

// Función para calcular la puntuación general teniendo en cuenta las matrículas de honor
export const calculateWeightedRating = (ratings: Record<string, number>): number => {
  let totalWeight = 0
  let weightedSum = 0

  Object.values(ratings).forEach((value) => {
    const isHonor = Math.abs(value - 12) < 0.001
    const normalizedValue = isHonor ? 10 : value
    const weight = isHonor ? 12 : 1 // Las M.H. tienen un peso 12 veces mayor

    weightedSum += normalizedValue * weight
    totalWeight += weight
  })

  return totalWeight > 0 ? weightedSum / totalWeight : 0
}

// Función para obtener el número de matrículas de honor en una review
export const getHonorMatriculasCount = (review: CarReview): number => {
  return Object.values(review.rating).filter((value) => Math.abs(value - 12) < 0.001).length
}

