import React from "react"
import { cn } from "../lib/utils"

// Modificar la interfaz RatingDisplayProps para aceptar ratings con valores mayores a 10
interface RatingDisplayProps {
  ratings: { [key: string]: number | undefined }
  size?: "sm" | "md" | "lg"
  showValue?: boolean
  className?: string
  compact?: boolean
  useColorScale?: boolean
  honorMatriculas?: string[] // Mantenemos esto para compatibilidad con código existente
  subcategories?: { [key: string]: string[] } // Nueva propiedad para definir subcategorías
}

export function RatingDisplay({
  ratings,
  size = "md",
  showValue = true,
  className,
  compact = false,
  useColorScale = false,
  honorMatriculas = [], // Valor por defecto: array vacío
  subcategories = {}, // Valor por defecto: objeto vacío
}: RatingDisplayProps) {
  const getColor = (rating: number, useColorScale: boolean) => {
    if (!useColorScale) return "bg-blue-600"
    if (rating >= 9) return "bg-green-500"
    if (rating >= 7) return "bg-lime-500"
    if (rating >= 5) return "bg-yellow-500"
    if (rating >= 3) return "bg-orange-500"
    return "bg-red-500"
  }

  // Función para determinar si una categoría es una subcategoría
  const isSubcategory = (label: string): boolean => {
    for (const mainCategory in subcategories) {
      if (subcategories[mainCategory]?.includes(label)) {
        return true
      }
    }
    return false
  }

  // Función para obtener la categoría principal de una subcategoría
  const getMainCategory = (label: string): string | null => {
    for (const mainCategory in subcategories) {
      if (subcategories[mainCategory]?.includes(label)) {
        return mainCategory
      }
    }
    return null
  }

  return (
    <div className={cn("space-y-2", className)}>
      {Object.entries(ratings).map(([label, rating]) => {
        // Saltamos las subcategorías, se mostrarán después de su categoría principal
        if (isSubcategory(label) && !subcategories["Rendimiento"]?.includes(label)) {
          return null
        }

        const ratingValue = rating ?? 0

        // Detectar si es una matrícula de honor (valor 12 o está en el array honorMatriculas)
        const isHonorMatricula = Math.abs(ratingValue - 12) < 0.001 || honorMatriculas.includes(label)

        // Normalizar el valor para mostrar (si es 12, mostrar como 10.0)
        const displayValue = Math.abs(ratingValue - 12) < 0.001 ? 10 : ratingValue

        // Calcular el porcentaje para la barra de progreso (máximo 100%)
        const percentage = Math.min((displayValue / 10) * 100, 100)

        return (
          <React.Fragment key={label}>
            <div
              className={cn(
                "flex items-center",
                compact && "flex-col",
                isHonorMatricula && "bg-purple-50 p-2 rounded-lg border-l-4 border-purple-600 my-3", // Destacar toda la fila
              )}
            >
              <span
                className={cn(
                  "text-gray-600 font-medium flex items-center gap-2",
                  size === "sm" && "text-xs",
                  size === "md" && "text-sm",
                  size === "lg" && "text-base",
                  compact ? "text-center mb-1" : "w-28 mr-2",
                  isHonorMatricula && "text-purple-700 font-bold",
                )}
              >
                {label}
                {isHonorMatricula && (
                  <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-purple-600 rounded-full animate-pulse">
                    M.H.
                  </span>
                )}
              </span>
              <div className={cn("flex items-center gap-2", compact ? "w-full" : "flex-grow")}>
                <div
                  className={cn(
                    "bg-gray-200 rounded-full overflow-hidden",
                    size === "sm" && "h-1.5",
                    size === "md" && "h-2",
                    size === "lg" && "h-2.5",
                    compact ? "w-full" : "w-full max-w-[200px]",
                    isHonorMatricula && "h-3", // Hacer la barra más grande para matrículas de honor
                  )}
                >
                  <div
                    className={cn(
                      "h-full rounded-full",
                      isHonorMatricula ? "bg-purple-600 shadow-md" : getColor(displayValue, useColorScale), // Añadir sombra para destacar
                    )}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span
                  className={cn(
                    "font-semibold",
                    size === "sm" && "text-xs",
                    size === "md" && "text-sm",
                    size === "lg" && "text-base",
                    isHonorMatricula && "text-purple-700 font-bold text-lg", // Hacer el texto más grande
                  )}
                >
                  {displayValue.toFixed(1)}
                  {isHonorMatricula && <span className="ml-1 text-purple-800 font-bold">(M.H.)</span>}
                </span>
              </div>
            </div>

            {/* Mostrar subcategorías si existen para esta categoría */}
            {subcategories[label] &&
              subcategories[label].map((subcat) => {
                const subcatRating = ratings[subcat] ?? 0
                const isSubHonorMatricula = Math.abs(subcatRating - 12) < 0.001 || honorMatriculas.includes(subcat)
                const subcatDisplayValue = Math.abs(subcatRating - 12) < 0.001 ? 10 : subcatRating
                const subcatPercentage = Math.min((subcatDisplayValue / 10) * 100, 100)

                return (
                  <div
                    key={subcat}
                    className={cn(
                      "flex items-center pl-8", // Indentación para mostrar jerarquía
                      compact && "flex-col",
                      isSubHonorMatricula && "bg-purple-50 p-2 rounded-lg border-l-4 border-purple-600 my-3",
                    )}
                  >
                    <span
                      className={cn(
                        "text-gray-600 font-medium flex items-center gap-2",
                        size === "sm" && "text-xs",
                        size === "md" && "text-sm",
                        size === "lg" && "text-base",
                        compact ? "text-center mb-1" : "w-28 mr-2",
                        isSubHonorMatricula && "text-purple-700 font-bold",
                      )}
                    >
                      ↳ {subcat}
                      {isSubHonorMatricula && (
                        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-purple-600 rounded-full">
                          M.H.
                        </span>
                      )}
                    </span>
                    <div className={cn("flex items-center gap-2", compact ? "w-full" : "flex-grow")}>
                      <div
                        className={cn(
                          "bg-gray-200 rounded-full overflow-hidden",
                          size === "sm" && "h-1.5",
                          size === "md" && "h-2",
                          size === "lg" && "h-2.5",
                          compact ? "w-full" : "w-full max-w-[200px]",
                          isSubHonorMatricula && "h-3",
                        )}
                      >
                        <div
                          className={cn(
                            "h-full rounded-full",
                            isSubHonorMatricula ? "bg-purple-600" : getColor(subcatDisplayValue, useColorScale),
                          )}
                          style={{ width: `${subcatPercentage}%` }}
                        />
                      </div>
                      <span
                        className={cn(
                          "font-semibold",
                          size === "sm" && "text-xs",
                          size === "md" && "text-sm",
                          size === "lg" && "text-base",
                          isSubHonorMatricula && "text-purple-700 font-bold",
                        )}
                      >
                        {subcatDisplayValue.toFixed(1)}
                        {isSubHonorMatricula && <span className="ml-1 text-purple-800 font-bold">(M.H.)</span>}
                      </span>
                    </div>
                  </div>
                )
              })}
          </React.Fragment>
        )
      })}
    </div>
  )
}

