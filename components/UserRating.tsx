"use client"

import { useState } from "react"
import { Star } from "lucide-react"

interface UserRatingProps {
  initialRating?: number
  onRatingChange?: (rating: number) => void
}

export function UserRating({ initialRating = 0, onRatingChange }: UserRatingProps) {
  const [rating, setRating] = useState(initialRating)
  const [hover, setHover] = useState(0)

  const handleRating = (value: number) => {
    setRating(value)
    if (onRatingChange) {
      onRatingChange(value)
    }
  }

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1
        return (
          <Star
            key={index}
            className={`w-8 h-8 cursor-pointer transition-colors ${
              ratingValue <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
            }`}
            onClick={() => handleRating(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
            fill={ratingValue <= (hover || rating) ? "currentColor" : "none"}
          />
        )
      })}
    </div>
  )
}

