import type React from "react"
import { Card, CardContent } from "@/components/ui/card"

interface ReviewBlockProps {
  title: string
  icon: React.ReactNode
  rating: number
  content: string
  details: Array<{ name: string; score: number }>
}

export function BlockSidebarWithCards({ title, icon, rating, content, details }: ReviewBlockProps) {
  const getRatingColor = (score: number) => {
    if (score >= 9) return "bg-green-500"
    if (score >= 7) return "bg-blue-500"
    if (score >= 5) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <Card className="w-full mb-8 overflow-hidden shadow-lg">
      <div className="flex">
        <div className={`w-2 ${getRatingColor(rating)}`} />
        <CardContent className="flex-1 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {icon}
              <h3 className="text-xl font-semibold">{title}</h3>
            </div>
            <div className="text-2xl font-bold">{rating.toFixed(1)}</div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">{content}</p>
          <div className="grid grid-cols-2 gap-4">
            {details.map((detail, index) => (
              <Card key={index} className="p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                <h4 className="text-sm font-semibold mb-2">{detail.name}</h4>
                <div className="flex items-center justify-between">
                  <div className="w-3/4 bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${getRatingColor(detail.score)}`}
                      style={{ width: `${detail.score * 10}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold">{detail.score.toFixed(1)}</span>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

