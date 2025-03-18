import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface BrandCardProps {
  name: string
  logo: string
  description: string
  website: string
}

export function BrandCard({ name, logo, description, website }: BrandCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-center mb-4">
          <Image
            src={logo || "/placeholder.svg"}
            alt={`${name} logo`}
            width={100}
            height={100}
            className="object-contain"
          />
        </div>
        <h3 className="text-xl font-semibold text-center mb-2">{name}</h3>
        <p className="text-sm text-gray-600 text-center">{description}</p>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4">
        <Button asChild variant="outline" className="w-full">
          <a href={website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
            Visitar sitio web
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

