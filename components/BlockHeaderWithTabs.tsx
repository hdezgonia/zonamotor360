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

export function BlockHeaderWithTabs({ title, icon, rating, content, details }: ReviewBlockProps) {
  const getRatingColor = (score: number) => {
    if (score >= 9) return "bg-green-500"
    if (score >= 7) return "bg-blue-500"
    if (score >= 5) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <Card className="w-full mb-8 overflow-hidden shadow-lg">
      <CardHeader className={`${getRatingColor(rating)} text-white`}>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon}
            <span className="text-xl font-semibold">{title}</span>
          </div>
          <div className="text-3xl font-bold">{rating.toFixed(1)}</div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="details">Detalles</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="p-6">
            <p className="text-gray-700 leading-relaxed">{content}</p>
          </TabsContent>
          <TabsContent value="details" className="p-6">
            <div className="space-y-4">
              {details.map((detail, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{detail.name}</span>
                    <span className="text-sm font-semibold">{detail.score.toFixed(1)}</span>
                  </div>
                  <Progress value={detail.score * 10} className="h-2" />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

