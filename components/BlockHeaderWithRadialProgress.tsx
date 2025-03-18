import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ReviewBlockProps {
  title: string
  icon: React.ReactNode
  rating: number
  content: string
  details: Array<{ name: string; score: number }>
}

export function BlockHeaderWithRadialProgress({ title, icon, rating, content, details }: ReviewBlockProps) {
  const getRatingColor = (score: number) => {
    if (score >= 9) return "text-green-500"
    if (score >= 7) return "text-blue-500"
    if (score >= 5) return "text-yellow-500"
    return "text-red-500"
  }

  const circumference = 2 * Math.PI * 45 // 45 is the radius of the circle

  return (
    <Card className="w-full mb-8 overflow-hidden shadow-lg">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon}
            <span className="text-xl font-semibold">{title}</span>
          </div>
          <div className="relative w-24 h-24">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-gray-200"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
              />
              <circle
                className={`${getRatingColor(rating)} transition-all duration-300 ease-in-out`}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (rating / 10) * circumference}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
              {rating.toFixed(1)}
            </div>
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

