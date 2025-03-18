"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Car {
  id: number
  make: string
  model: string
  specs: {
    power: string
    acceleration: string
    efficiency: string
  }
  price: string
}

interface InteractiveComparisonProps {
  currentCar: Car
  rivals: Car[]
}

export function InteractiveComparison({ currentCar, rivals }: InteractiveComparisonProps) {
  const [selectedCars, setSelectedCars] = useState<number[]>([currentCar.id])
  const allCars = [currentCar, ...rivals]

  const toggleCar = (id: number) => {
    setSelectedCars((prev) => (prev.includes(id) ? prev.filter((carId) => carId !== id) : [...prev, id]))
  }

  const compareSpecs = (spec: keyof Car["specs"]) => {
    const values = selectedCars.map((id) => {
      const car = allCars.find((c) => c.id === id)
      return car ? Number.parseFloat(car.specs[spec]) : 0
    })
    const bestValue = Math.max(...values)
    return bestValue
  }

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Selecciona coches para comparar:</h3>
        <div className="flex flex-wrap gap-4">
          {allCars.map((car) => (
            <div key={car.id} className="flex items-center">
              <Checkbox
                id={`car-${car.id}`}
                checked={selectedCars.includes(car.id)}
                onCheckedChange={() => toggleCar(car.id)}
              />
              <label htmlFor={`car-${car.id}`} className="ml-2">
                {car.make} {car.model}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Modelo</TableHead>
            <TableHead>Potencia</TableHead>
            <TableHead>0-100 km/h</TableHead>
            <TableHead>Consumo</TableHead>
            <TableHead>Precio</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allCars
            .filter((car) => selectedCars.includes(car.id))
            .map((car) => (
              <TableRow key={car.id}>
                <TableCell>
                  {car.make} {car.model}
                </TableCell>
                <TableCell className={car.specs.power === compareSpecs("power").toString() ? "font-bold" : ""}>
                  {car.specs.power}
                </TableCell>
                <TableCell
                  className={car.specs.acceleration === compareSpecs("acceleration").toString() ? "font-bold" : ""}
                >
                  {car.specs.acceleration}
                </TableCell>
                <TableCell
                  className={car.specs.efficiency === compareSpecs("efficiency").toString() ? "font-bold" : ""}
                >
                  {car.specs.efficiency}
                </TableCell>
                <TableCell>{car.price}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}

