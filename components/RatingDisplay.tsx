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
}

export function RatingDisplay({
  ratings,
  size = "md",
  showValue = true,
  className,
  compact = false,
  useColorScale = false,
  honorMatriculas = [], // Valor por defecto: array vacío
}: RatingDisplayProps) {
  const getColor = (rating: number, useColorScale: boolean) => {
    if (!useColorScale) return "bg-blue-600"
    if (rating >= 9) return "bg-green-500"
    if (rating >= 7) return "bg-lime-500"
    if (rating >= 5) return "bg-yellow-500"
    if (rating >= 3) return "bg-orange-500"
    return "bg-red-500"
  }

  return (
    <div className={cn("space-y-2", className)}>
      {Object.entries(ratings).map(([label, rating]) => {
        const ratingValue = rating ?? 0

        // Detectar si es una matrícula de honor (valor 12 o está en el array honorMatriculas)
        const isHonorMatricula = Math.abs(ratingValue - 12) < 0.001 || honorMatriculas.includes(label)

        // Normalizar el valor para mostrar (si es 12, mostrar como 10.0)
        const displayValue = Math.abs(ratingValue - 12) < 0.001 ? 10 : ratingValue

        // Calcular el porcentaje para la barra de progreso (máximo 100%)
        const percentage = Math.min((displayValue / 10) * 100, 100)

        return (
          <div
            key={label}
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
                  isHonorMatricula && "h-3", // Hacer la barra más grande para matrículas de honor
                )}
              >
                <div
                  className={cn(
                    "h-full rounded-full",
                    isHonorMatricula ? "bg-purple-600" : getColor(displayValue, useColorScale),
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
                  isHonorMatricula && "text-purple-700 font-bold",
                )}
              >
                {displayValue.toFixed(1)}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

