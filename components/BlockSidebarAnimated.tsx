"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

interface ReviewBlockProps {
  title: string
  icon: React.ReactNode
  rating: number
  content: string
  details: Array<{ name: string; score: number }>
}

export function BlockSidebarAnimated({ title, icon, rating, content, details }: ReviewBlockProps) {
  const getRatingColor = (score: number) => {
    if (score >= 9) return "bg-green-500"
    if (score >= 7) return "bg-blue-500"
    if (score >= 5) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <Card className="w-full mb-8 overflow-hidden shadow-lg">
      <div className="flex">
        <motion.div
          className={`w-2 ${getRatingColor(rating)}`}
          initial={{ height: 0 }}
          animate={{ height: "100%" }}
          transition={{ duration: 0.5 }}
        />
        <CardContent className="flex-1 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {icon}
              <h3 className="text-xl font-semibold">{title}</h3>
            </div>
            <motion.div
              className="text-2xl font-bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {rating.toFixed(1)}
            </motion.div>
          </div>
          <Progress value={rating * 10} className="h-1 mb-4" />
          <p className="text-gray-700 leading-relaxed mb-6">{content}</p>
          <div className="grid grid-cols-2 gap-4">
            {details.map((detail, index) => (
              <motion.div
                key={index}
                className="flex flex-col"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <span className="text-sm font-medium mb-1">{detail.name}</span>
                <div className="flex items-center gap-2">
                  <Progress value={detail.score * 10} className="flex-grow h-1" />
                  <span className="text-sm font-semibold">{detail.score.toFixed(1)}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

