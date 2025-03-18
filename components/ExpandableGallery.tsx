"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface ExpandableGalleryProps {
  images: string[]
}

export function ExpandableGallery({ images }: ExpandableGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <div className="relative aspect-square cursor-pointer hover:opacity-80 transition-opacity">
              <Image src={image || "/placeholder.svg"} alt={`Imagen ${index + 1}`} layout="fill" objectFit="cover" />
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-4xl w-full h-full flex items-center justify-center bg-black bg-opacity-90">
            <button onClick={prevImage} className="absolute left-4 text-white">
              <ChevronLeft size={32} />
            </button>
            <div className="relative w-full h-full">
              <Image
                src={images[currentImageIndex] || "/placeholder.svg"}
                alt={`Imagen ${currentImageIndex + 1}`}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <button onClick={nextImage} className="absolute right-4 text-white">
              <ChevronRight size={32} />
            </button>
            <button className="absolute top-4 right-4 text-white">
              <X size={24} />
            </button>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}

