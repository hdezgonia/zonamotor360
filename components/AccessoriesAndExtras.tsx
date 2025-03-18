"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Item {
  name: string
  description: string
  price: string
}

interface AccessoriesAndExtrasProps {
  accessories: Item[]
  extras: Item[]
  basePrice: string
  totalPrice: string
}

export function AccessoriesAndExtras({ accessories, extras, basePrice, totalPrice }: AccessoriesAndExtrasProps) {
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
      <h2 className="text-2xl font-bold mb-4">Accesorios y Extras</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Accesorios</CardTitle>
            <CardDescription>Equipamiento incluido en esta versión</CardDescription>
          </CardHeader>
          <CardContent>
            <motion.ul variants={container} initial="hidden" animate="visible" className="space-y-4">
              {accessories.map((accessory, index) => (
                <motion.li key={index} variants={item} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{accessory.name}</h3>
                    <p className="text-sm text-gray-600">{accessory.description}</p>
                  </div>
                  <Badge variant="secondary">{accessory.price}</Badge>
                </motion.li>
              ))}
            </motion.ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Extras</CardTitle>
            <CardDescription>Opciones adicionales disponibles</CardDescription>
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
      </div>
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Precio base:</span>
          <span className="text-lg">{basePrice}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xl font-bold">Precio total:</span>
          <span className="text-xl font-bold text-blue-600">{totalPrice}</span>
        </div>
      </div>
    </div>
  )
}

