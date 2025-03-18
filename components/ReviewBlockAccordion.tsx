"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Progress } from "@/components/ui/progress"
import { ChevronDown, ChevronUp } from "lucide-react"

interface ReviewBlockProps {
  title: string
  icon: React.ReactNode
  rating: number
  content: string
  details: Array<{ name: string; score: number }>
}

export function ReviewBlockAccordion({ title, icon, rating, content, details }: ReviewBlockProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getRatingColor = (score: number) => {
    if (score >= 9) return "text-green-500"
    if (score >= 7) return "text-blue-500"
    if (score >= 5) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <Card className="w-full mb-8 overflow-hidden shadow-lg">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="bg-gray-50 border-b">
          <CollapsibleTrigger className="w-full">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {icon}
                <span className="text-xl font-semibold">{title}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`text-2xl font-bold ${getRatingColor(rating)}`}>{rating.toFixed(1)}</div>
                {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
            </CardTitle>
          </CollapsibleTrigger>
        </CardHeader>
        <CardContent className="p-4">
          <Progress value={rating * 10} className="h-1 mb-4" />
          <p className="text-gray-700 leading-relaxed mb-4">{content}</p>
          <CollapsibleContent>
            <h4 className="font-semibold mb-2">Detalles</h4>
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
          </CollapsibleContent>
        </CardContent>
      </Collapsible>
    </Card>
  )
}

