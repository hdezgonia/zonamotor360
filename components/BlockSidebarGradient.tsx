import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ReviewBlockProps {
  title: string
  icon: React.ReactNode
  rating: number
  content: string
  details: Array<{ name: string; score: number }>
}

export function BlockSidebarGradient({ title, icon, rating, content, details }: ReviewBlockProps) {
  const getRatingGradient = (score: number) => {
    if (score >= 9) return "from-green-400 to-green-600"
    if (score >= 7) return "from-blue-400 to-blue-600"
    if (score >= 5) return "from-yellow-400 to-yellow-600"
    return "from-red-400 to-red-600"
  }

  return (
    <Card className="w-full mb-8 overflow-hidden shadow-lg">
      <div className="flex">
        <div className={`w-2 bg-gradient-to-b ${getRatingGradient(rating)}`} />
        <CardContent className="flex-1 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {icon}
              <h3 className="text-xl font-semibold">{title}</h3>
            </div>
            <div className="text-2xl font-bold">{rating.toFixed(1)}</div>
          </div>
          <Progress value={rating * 10} className="h-1 mb-4" />
          <p className="text-gray-700 leading-relaxed mb-6">{content}</p>
          <div className="grid grid-cols-2 gap-4">
            {details.map((detail, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-sm font-medium mb-1">{detail.name}</span>
                <div className="flex items-center gap-2">
                  <Progress value={detail.score * 10} className="flex-grow h-1" />
                  <span className="text-sm font-semibold">{detail.score.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

