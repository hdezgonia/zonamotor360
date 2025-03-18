import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ReviewBlockProps {
  title: string
  icon: React.ReactNode
  rating: number
  content: string
  details: Array<{ name: string; score: number }>
}

export function BlockHeaderCircular({ title, icon, rating, content, details }: ReviewBlockProps) {
  const getRatingColor = (score: number) => {
    if (score >= 9) return "text-green-500 border-green-500"
    if (score >= 7) return "text-blue-500 border-blue-500"
    if (score >= 5) return "text-yellow-500 border-yellow-500"
    return "text-red-500 border-red-500"
  }

  return (
    <Card className="w-full mb-8 overflow-hidden shadow-lg">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon}
            <span className="text-xl font-semibold">{title}</span>
          </div>
          <div
            className={`text-3xl font-bold w-16 h-16 rounded-full border-4 flex items-center justify-center ${getRatingColor(rating)}`}
          >
            {rating.toFixed(1)}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-gray-700 leading-relaxed mb-6">{content}</p>
        <div className="grid grid-cols-2 gap-4">
          {details.map((detail, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-sm font-medium mb-1">{detail.name}</span>
              <div className="flex items-center gap-2">
                <div className="flex-grow bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getRatingColor(detail.score)}`}
                    style={{ width: `${detail.score * 10}%` }}
                  />
                </div>
                <span className="text-sm font-semibold">{detail.score.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

