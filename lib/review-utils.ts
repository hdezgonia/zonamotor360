import type { Review } from "@/types/review"
import fs from "fs"
import path from "path"

// Función para limpiar y preparar los datos de la review antes de guardar
export function cleanReviewData(review: Review): Review {
  // Calcular la puntuación general
  const calculateOverallRating = () => {
    const ratings = review.rating
    let totalWeight = 0
    let weightedSum = 0

    Object.entries(ratings).forEach(([key, value]) => {
      if (key !== "overall" && key !== "notes" && value !== undefined && typeof value === "number") {
        // Si el valor es 12, es una matrícula de honor
        const isHonorMatricula = Math.abs(value - 12) < 0.001

        // Para el cálculo, usamos 10 como valor real si es matrícula de honor
        const ratingValue = isHonorMatricula ? 10 : value

        // Aplicar peso 12 si tiene matrícula de honor, 1 en caso contrario
        const weight = isHonorMatricula ? 12 : 1

        weightedSum += ratingValue * weight
        totalWeight += weight
      }
    })

    return totalWeight > 0 ? Number.parseFloat((weightedSum / totalWeight).toFixed(1)) : 0
  }

  // Asegurarse de que todos los arrays existan
  const cleanedReview = {
    ...review,
    id: review.id || Date.now(),
    categories: review.categories || [],
    rating: {
      ...review.rating,
      overall: calculateOverallRating(),
      notes: review.rating.notes || {},
    },
    rivals: review.rivals || [],
    medals: review.medals || [],
    accessories: review.accessories || [],
    extras: review.extras || [],
    pros: review.pros || [],
    cons: review.cons || [],
    gallery: review.gallery || [],
  }

  return cleanedReview
}

// Función para generar el nombre de archivo basado en la marca y modelo
export function generateFilename(review: Review): string {
  const make = review.make.toLowerCase().replace(/\s+/g, "-")
  const model = review.model.toLowerCase().replace(/\s+/g, "-")
  const trim = review.trim ? `-${review.trim.toLowerCase().replace(/\s+/g, "-")}` : ""

  return `${make}-${model}${trim}.json`
}

// Función para guardar la review como archivo JSON
export async function saveReviewToFile(review: Review, existingFilePath?: string): Promise<string> {
  const reviewsDir = path.join(process.cwd(), "data", "reviews")

  // Asegurarse de que el directorio existe
  if (!fs.existsSync(reviewsDir)) {
    fs.mkdirSync(reviewsDir, { recursive: true })
  }

  // Determinar la ruta del archivo
  const filePath = existingFilePath || path.join(reviewsDir, generateFilename(review))

  // Guardar el archivo
  fs.writeFileSync(filePath, JSON.stringify(review, null, 2))

  return filePath
}

// Función para obtener todas las reviews
export async function getAllReviews(): Promise<Review[]> {
  const reviewsDir = path.join(process.cwd(), "data", "reviews")

  // Si el directorio no existe, devolver un array vacío
  if (!fs.existsSync(reviewsDir)) {
    return []
  }

  // Leer todos los archivos JSON del directorio
  const files = fs.readdirSync(reviewsDir).filter((file) => file.endsWith(".json"))

  // Cargar cada archivo y parsearlo como JSON
  const reviews = files.map((file) => {
    const filePath = path.join(reviewsDir, file)
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const review = JSON.parse(fileContent) as Review
    return review
  })

  return reviews
}

// Función para obtener una review por su ID
export async function getReviewById(id: number): Promise<Review | null> {
  const reviews = await getAllReviews()
  return reviews.find((review) => review.id === id) || null
}

// Función para obtener una review por su ruta de archivo
export async function getReviewByFilePath(filePath: string): Promise<Review | null> {
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8")
    return JSON.parse(fileContent) as Review
  } catch (error) {
    console.error("Error al leer el archivo:", error)
    return null
  }
}

// Función para eliminar una review
export async function deleteReview(filePath: string): Promise<boolean> {
  try {
    fs.unlinkSync(filePath)
    return true
  } catch (error) {
    console.error("Error al eliminar el archivo:", error)
    return false
  }
}

