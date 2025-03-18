import { Badge } from "@/components/ui/badge"
import { Medal } from "lucide-react"
import { getHonorMatriculasCount } from "@/data/posts"
import type { CarReview } from "@/data/posts"

interface ReviewBadgeProps {
  type: "short" | "detailed" | "first-impression" | "presentation"
  review?: CarReview
}

export function ReviewBadge({ type, review }: ReviewBadgeProps) {
  const getBadgeColor = () => {
    switch (type) {
      case "detailed":
        return "border-blue-500"
      case "short":
        return "border-green-500"
      case "first-impression":
        return "border-amber-500"
      case "presentation":
        return "border-purple-500"
      default:
        return "border-gray-500"
    }
  }

  const getLabel = () => {
    switch (type) {
      case "detailed":
        return "Review Detallada"
      case "short":
        return "Review Corta"
      case "first-impression":
        return "Primera Impresión"
      case "presentation":
        return "Presentación"
      default:
        return "Review"
    }
  }

  const honorCount = review ? getHonorMatriculasCount(review) : 0

  return (
    <div className="flex gap-2">
      <Badge className={`${getBadgeColor()} bg-transparent text-black border hover:bg-transparent`}>{getLabel()}</Badge>
      {honorCount > 0 && (
        <Badge className="border-purple-600 bg-transparent text-black border hover:bg-purple-50 flex items-center gap-1">
          <Medal className="h-3 w-3 text-purple-600" />
          {honorCount > 1 ? `${honorCount} M.H.` : "M.H."}
        </Badge>
      )}
    </div>
  )
}

