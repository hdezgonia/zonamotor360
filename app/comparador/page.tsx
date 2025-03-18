"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { reviews } from "../../data/posts"
import { Slider } from "../../components/ui/slider"
import { Switch } from "../../components/ui/switch"
import { Label } from "../../components/ui/label"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { ChevronDown, Zap, Droplet, Flame } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip, Legend } from "recharts"

const formatPrice = (price: string) => {
  const numericPrice = Number.parseInt(price.replace(/[^0-9]/g, ""))
  return numericPrice >= 1000000
    ? `${(numericPrice / 1000000).toFixed(1)}M €`
    : `${(numericPrice / 1000).toFixed(0)}K €`
}

const getRatingColor = (rating: number) => {
  if (rating > 7) return "bg-green-500"
  if (rating >= 5) return "bg-yellow-500"
  return "bg-red-500"
}

interface ComparisonCriteria {
  performance: number
  comfort: number
  practicality: number
  value: number
  design: number
  technology: number
  efficiency: number
  safety: number
  chargingEase: number
  range: number
  routeGeneration: number
  engine: number
}

export default function ComparadorPage() {
  const [criteria, setCriteria] = useState<ComparisonCriteria>({
    performance: 12,
    comfort: 12,
    practicality: 12,
    value: 12,
    design: 12,
    technology: 12,
    efficiency: 12,
    safety: 16,
    chargingEase: 0,
    range: 0,
    routeGeneration: 0,
    engine: 10,
  })
  const [showOnlyElectric, setShowOnlyElectric] = useState(false)
  const [scores, setScores] = useState<{ [key: number]: number }>({})
  const [maxPrice, setMaxPrice] = useState<number | null>(null)
  const [fuelTypeFilter, setFuelTypeFilter] = useState<string>("all")
  const [selectedCars, setSelectedCars] = useState<number[]>([])

  useEffect(() => {
    const newScores: { [key: number]: number } = {}
    reviews.forEach((car) => {
      let score = 0
      let totalWeight = 0
      Object.entries(criteria).forEach(([key, weight]) => {
        if (car.rating[key as keyof typeof car.rating] !== undefined) {
          score += (car.rating[key as keyof typeof car.rating] || 0) * weight
          totalWeight += weight
        }
      })
      newScores[car.id] = totalWeight > 0 ? Number.parseFloat((score / totalWeight).toFixed(1)) : 0
    })
    setScores(newScores)
  }, [criteria])

  const handleCriteriaChange = (criterionName: keyof ComparisonCriteria, newValue: number) => {
    setCriteria((prev) => {
      const oldValue = prev[criterionName]
      const diff = newValue - oldValue

      const activeKeys = Object.keys(prev).filter(
        (key) => showOnlyElectric || (key !== "chargingEase" && key !== "range" && key !== "routeGeneration"),
      ) as (keyof ComparisonCriteria)[]

      const otherKeys = activeKeys.filter((key) => key !== criterionName)
      const totalOtherValues = otherKeys.reduce((sum, key) => sum + prev[key], 0)

      const newCriteria = { ...prev, [criterionName]: newValue }

      if (totalOtherValues > 0) {
        const adjustmentFactor = diff / totalOtherValues
        otherKeys.forEach((key) => {
          newCriteria[key] = Math.max(0, prev[key] - adjustmentFactor * prev[key])
        })
      }

      // Normalize to ensure sum is exactly 100
      const sum = Object.values(newCriteria).reduce((a, b) => a + b, 0)
      if (sum > 0) {
        activeKeys.forEach((key) => {
          newCriteria[key] = Number.parseFloat(((newCriteria[key] * 100) / sum).toFixed(1))
        })
      } else {
        // If sum is 0, distribute evenly
        const equalValue = Number.parseFloat((100 / activeKeys.length).toFixed(1))
        activeKeys.forEach((key) => {
          newCriteria[key] = equalValue
        })
      }

      return newCriteria
    })
  }

  const toggleElectricCriteria = () => {
    setShowOnlyElectric((prev) => {
      const newShowOnlyElectric = !prev
      setCriteria((prevCriteria) => {
        const newCriteria = { ...prevCriteria }
        if (newShowOnlyElectric) {
          // Redistribute some weight to electric criteria
          const weightToRedistribute = 30
          const regularCriteria = Object.keys(newCriteria).filter(
            (key) => key !== "chargingEase" && key !== "range" && key !== "routeGeneration",
          ) as (keyof ComparisonCriteria)[]

          regularCriteria.forEach((key) => {
            newCriteria[key] *= (100 - weightToRedistribute) / 100
          })

          newCriteria.chargingEase = 10
          newCriteria.range = 10
          newCriteria.routeGeneration = 10
        } else {
          // Redistribute weight from electric criteria back to regular criteria
          const electricWeight = newCriteria.chargingEase + newCriteria.range + newCriteria.routeGeneration
          const regularCriteria = Object.keys(newCriteria).filter(
            (key) => key !== "chargingEase" && key !== "range" && key !== "routeGeneration",
          ) as (keyof ComparisonCriteria)[]

          const weightPerRegularCriterion = electricWeight / regularCriteria.length
          regularCriteria.forEach((key) => {
            newCriteria[key] += weightPerRegularCriterion
          })

          newCriteria.chargingEase = 0
          newCriteria.range = 0
          newCriteria.routeGeneration = 0
        }

        // Normalize to ensure sum is exactly 100
        const sum = Object.values(newCriteria).reduce((a, b) => a + b, 0)
        Object.keys(newCriteria).forEach((key) => {
          newCriteria[key as keyof ComparisonCriteria] = Number.parseFloat(
            ((newCriteria[key as keyof ComparisonCriteria] * 100) / sum).toFixed(1),
          )
        })

        return newCriteria
      })
      return newShowOnlyElectric
    })
  }

  const equalizeAllCriteria = () => {
    setCriteria((prev) => {
      const activeKeys = Object.keys(prev).filter(
        (key) => showOnlyElectric || (key !== "chargingEase" && key !== "range" && key !== "routeGeneration"),
      ) as (keyof ComparisonCriteria)[]

      const equalValue = Number.parseFloat((100 / activeKeys.length).toFixed(1))
      const newCriteria = { ...prev }

      activeKeys.forEach((key) => {
        newCriteria[key] = equalValue
      })

      // Set non-active keys to 0
      Object.keys(prev).forEach((key) => {
        if (!activeKeys.includes(key as keyof ComparisonCriteria)) {
          newCriteria[key as keyof ComparisonCriteria] = 0
        }
      })

      return newCriteria
    })
  }

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value ? Number.parseInt(event.target.value) : null
    setMaxPrice(value)
  }

  const filteredReviews = reviews
    .filter((car) => (showOnlyElectric ? car.isElectric : true))
    .filter((car) => (maxPrice ? Number.parseInt(car.price.replace(/[^0-9]/g, "")) <= maxPrice * 1000 : true))
    .filter((car) => {
      if (fuelTypeFilter === "all") return true
      if (fuelTypeFilter === "electric") return car.isElectric
      if (!car.fuelType && !car.isElectric) return fuelTypeFilter === "gasoline" // Assume non-electric cars without specified fuelType are gasoline
      return car.fuelType === fuelTypeFilter
    })
    .sort((a, b) => scores[b.id] - scores[a.id])

  const handleCarSelection = (carId: number) => {
    setSelectedCars((prev) => {
      if (prev.includes(carId)) {
        return prev.filter((id) => id !== carId)
      } else {
        return [...prev, carId]
      }
    })
  }

  const generateRadarData = () => {
    const selectedCarData = filteredReviews.filter((car) => selectedCars.includes(car.id))
    const categories = [
      "performance",
      "comfort",
      "practicality",
      "value",
      "design",
      "technology",
      "efficiency",
      "safety",
    ]

    return categories.map((category) => {
      const dataPoint: { [key: string]: string | number } = { category }
      selectedCarData.forEach((car) => {
        dataPoint[car.make] = car.rating[category as keyof typeof car.rating] || 0
      })
      return dataPoint
    })
  }

  useEffect(() => {
    if (selectedCars.length > 0) {
      console.log("Radar Chart Data:", generateRadarData())
    }
  }, [selectedCars, filteredReviews])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Comparador de Coches</h1>

      <div className="mb-8 w-full mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">Ajusta la importancia de cada criterio:</h2>
        <div className="flex flex-wrap justify-center items-center mb-4 gap-4">
          <div className="flex items-center">
            <Switch id="show-only-electric" checked={showOnlyElectric} onCheckedChange={toggleElectricCriteria} />
            <Label htmlFor="show-only-electric" className="ml-2">
              Mostrar solo coches eléctricos
            </Label>
          </div>
          <Button onClick={equalizeAllCriteria}>Igualar todos los criterios</Button>
          <div className="flex items-center">
            <Label htmlFor="max-price" className="mr-2">
              Precio máximo (en miles):
            </Label>
            <Input
              type="number"
              id="max-price"
              placeholder="Ej: 50 para 50.000€"
              value={maxPrice || ""}
              onChange={handleMaxPriceChange}
              className="w-40"
            />
          </div>
          <div className="flex items-center">
            <Label htmlFor="fuel-type" className="mr-2">
              Tipo de combustible:
            </Label>
            <select
              id="fuel-type"
              value={fuelTypeFilter}
              onChange={(e) => setFuelTypeFilter(e.target.value)}
              className="border rounded-md px-3 py-2"
            >
              <option value="all">Todos</option>
              <option value="electric">Eléctrico</option>
              <option value="gasoline">Gasolina</option>
              <option value="diesel">Diésel</option>
              <option value="hybrid">Híbrido</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(criteria).map(([key, value]) => {
            if (!showOnlyElectric && (key === "chargingEase" || key === "range" || key === "routeGeneration")) {
              return null
            }
            return (
              <div key={key} className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg">
                <span className="w-32 text-right capitalize font-medium">{key}:</span>
                <div className="flex-grow">
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={[value]}
                    onValueChange={(newValue) => handleCriteriaChange(key as keyof ComparisonCriteria, newValue[0])}
                    className="w-full"
                  />
                </div>
                <span className="w-16 text-right font-semibold">{value.toFixed(1)}%</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left sticky left-0 bg-gray-200 z-20">Coche</th>
              <th className="p-3 text-center whitespace-nowrap">Año</th>
              <th className="p-3 text-center whitespace-nowrap min-w-[150px]">Motor</th>
              <th className="p-3 text-center whitespace-nowrap">Kilómetros</th>
              <th className="p-3 text-center whitespace-nowrap">Combustible</th>
              {Object.keys(criteria).map((key) =>
                !showOnlyElectric && (key === "chargingEase" || key === "range" || key === "routeGeneration") ? null : (
                  <th key={key} className="p-3 text-center whitespace-nowrap">
                    <span className="font-semibold capitalize flex items-center justify-center">{key}</span>
                  </th>
                ),
              )}
              <th className="p-3 text-center whitespace-nowrap">
                <span className="font-semibold flex items-center justify-center">
                  Puntuación Final
                  <ChevronDown className="ml-1 h-4 w-4" />
                </span>
              </th>
              <th className="p-3 text-center whitespace-nowrap">
                <span className="font-semibold flex items-center justify-center">Precio</span>
              </th>
              <th className="p-3 text-center whitespace-nowrap">
                <span className="font-semibold flex items-center justify-center">Comparar</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredReviews.map((car, index) => (
                <motion.tr
                  key={car.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  layout
                  className={`border-t border-gray-200 hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className="p-3 pl-4 pr-8 sticky left-0 bg-inherit z-10 min-w-[250px]">
                    <div className="flex items-center">
                      <Image
                        src={car.logoUrl || "/placeholder.svg"}
                        alt={car.make}
                        width={32}
                        height={32}
                        className="rounded-full mr-3"
                      />
                      <div className="flex flex-col">
                        <div className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px]">
                          {car.make} {car.model}
                        </div>
                        <div className="text-sm text-gray-500">{car.trim}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-center">{car.year}</td>
                  <td className="p-3 text-center whitespace-nowrap min-w-[150px]">
                    <div>{car.specs.power}</div>
                    <div className="text-sm text-gray-500">{car.specs.engine || "N/A"}</div>
                  </td>
                  <td className="p-3 text-center">
                    {car.kilometersRecorded ? `${car.kilometersRecorded.toLocaleString()} km` : "N/A"}
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center">
                      {car.isElectric ? (
                        <Zap className="h-5 w-5 text-blue-500 mr-2" />
                      ) : car.fuelType === "diesel" ? (
                        <Droplet className="h-5 w-5 text-gray-500 mr-2" />
                      ) : (
                        <Flame className="h-5 w-5 text-orange-500 mr-2" />
                      )}
                      <span>{car.isElectric ? "Eléctrico" : car.fuelType === "diesel" ? "Diésel" : "Gasolina"}</span>
                    </div>
                  </td>
                  {Object.entries(criteria).map(([key, _]) => {
                    if (!showOnlyElectric && (key === "chargingEase" || key === "range" || key === "routeGeneration")) {
                      return null
                    }
                    const rating = car.rating[key as keyof typeof car.rating]
                    return (
                      <td key={key} className="p-3">
                        <div className="flex items-center justify-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full ${getRatingColor(rating || 0)}`}
                              style={{ width: `${(rating || 0) * 10}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 font-medium whitespace-nowrap w-8 text-right">
                            {rating?.toFixed(1) || "N/A"}
                          </span>
                        </div>
                      </td>
                    )
                  })}
                  <td className="p-3 font-bold text-lg text-center">{scores[car.id]?.toFixed(1)}</td>
                  <td className="p-3 text-center whitespace-nowrap">{formatPrice(car.price)}</td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={selectedCars.includes(car.id)}
                      onChange={() => handleCarSelection(car.id)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {selectedCars.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Comparación de coches seleccionados</h2>
          <div className="h-[500px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={generateRadarData()}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" />
                <Tooltip />
                {selectedCars.map((carId, index) => {
                  const car = filteredReviews.find((c) => c.id === carId)
                  const color = `hsl(${index * 137.5}, 70%, 50%)`
                  return (
                    <Radar
                      key={carId}
                      name={`${car?.make} ${car?.model}`}
                      dataKey={car?.make}
                      stroke={color}
                      fill={color}
                      fillOpacity={0.6}
                    />
                  )
                })}
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}

