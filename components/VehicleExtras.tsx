"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Extra {
  name: string
  description: string
  price: string
}

interface VehicleExtrasProps {
  extras: Extra[]
  basePrice: string
  totalPrice: string
}

export function VehicleExtras({ extras, basePrice, totalPrice }: VehicleExtrasProps) {
  if (!extras || extras.length === 0) {
    return null
  }

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Extras y Precios del Vehículo</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Extras Disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.ul variants={container} initial="hidden" animate="visible" className="space-y-4">
              {extras.map((extra, index) => (
                <motion.li key={index} variants={item} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{extra.name}</h3>
                    <p className="text-sm text-gray-600">{extra.description}</p>
                  </div>
                  <Badge variant="secondary">{extra.price}</Badge>
                </motion.li>
              ))}
            </motion.ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Resumen de Precios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Precio Base:</span>
                <span>{basePrice}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Extras:</span>
                <span>
                  {(
                    Number.parseInt(totalPrice.replace(/[^0-9]/g, "")) -
                    Number.parseInt(basePrice.replace(/[^0-9]/g, ""))
                  ).toLocaleString()}{" "}
                  €
                </span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="font-bold text-lg">Precio Total:</span>
                <span className="font-bold text-lg text-blue-600">{totalPrice}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

