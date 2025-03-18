import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

interface ReviewBlockProps {
  title: string
  icon: React.ReactNode
  rating: number
  content: string
  details: Array<{ name: string; score: number }>
}

export function ReviewBlockTabs({ title, icon, rating, content, details }: ReviewBlockProps) {
  const getRatingColor = (score: number) => {
    if (score >= 9) return "text-green-500"
    if (score >= 7) return "text-blue-500"
    if (score >= 5) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <Card className="w-full mb-8 overflow-hidden shadow-lg">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon}
            <span className="text-xl font-semibold">{title}</span>
          </div>
          <div className={`text-2xl font-bold ${getRatingColor(rating)}`}>{rating.toFixed(1)}</div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="details">Detalles</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="p-4">
            <Progress value={rating * 10} className="h-1 mb-4" />
            <p className="text-gray-700 leading-relaxed">{content}</p>
          </TabsContent>
          <TabsContent value="details" className="p-4">
            <ul className="space-y-2">
              {details.map((detail, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{detail.name}</span>
                  <div className="flex items-center gap-2">
                    <Progress value={detail.score * 10} className="w-24 h-1" />
                    <span className="text-sm font-semibold">{detail.score.toFixed(1)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

