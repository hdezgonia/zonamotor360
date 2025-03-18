import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ReviewBlockProps {
  title: string
  icon: React.ReactNode
  rating: number
  content: string
  details: Array<{ name: string; score: number }>
}

export function BlockHeaderGradient({ title, icon, rating, content, details }: ReviewBlockProps) {
  const getRatingGradient = (score: number) => {
    if (score >= 9) return "from-green-400 to-green-600"
    if (score >= 7) return "from-blue-400 to-blue-600"
    if (score >= 5) return "from-yellow-400 to-yellow-600"
    return "from-red-400 to-red-600"
  }

  return (
    <Card className="w-full mb-8 overflow-hidden shadow-lg">
      <CardHeader className={`bg-gradient-to-r ${getRatingGradient(rating)} text-white`}>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon}
            <span className="text-xl font-semibold">{title}</span>
          </div>
          <div className="text-3xl font-bold">{rating.toFixed(1)}</div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-gray-700 leading-relaxed mb-6">{content}</p>
        <div className="space-y-4">
          {details.map((detail, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">{detail.name}</span>
                <span className="text-sm font-semibold">{detail.score.toFixed(1)}</span>
              </div>
              <Progress value={detail.score * 10} className="h-2 rounded-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

