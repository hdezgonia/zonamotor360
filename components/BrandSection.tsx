import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Vehicle {
  id: number
  model: string
  trim: string
  year: number
  reviewType: string
}

interface BrandProps {
  name: string
  logo: string
  vehicles: Vehicle[]
}

const getReviewTypeLabel = (reviewType: string) => {
  switch (reviewType) {
    case "short":
      return "Corta"
    case "detailed":
      return "Detallada"
    case "first-impression":
      return "Primera Impresión"
    case "presentation":
      return "Presentación"
    default:
      return reviewType
  }
}

export function BrandSection({ name, logo, vehicles }: BrandProps) {
  return (
    <Card className="mb-8 overflow-hidden shadow-lg">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">{name}</h2>
            <Image
              src={logo || "/placeholder.svg"}
              alt={name}
              width={48}
              height={48}
              className="rounded-full bg-white p-1"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {vehicles.map((vehicle) => (
            <Link key={vehicle.id} href={`/review/${vehicle.id}`} className="block">
              <div className="bg-white hover:bg-gray-50 p-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {name} {vehicle.model} {vehicle.trim}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {vehicle.year}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{getReviewTypeLabel(vehicle.reviewType)}</span>
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

