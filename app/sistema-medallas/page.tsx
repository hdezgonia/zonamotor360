"use client"

import type React from "react"
import { medals } from "../../components/Medals"
import { useSearchParams } from "next/navigation"
import { reviews } from "../../data/posts"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type MedalType = keyof typeof medals

export default function SistemaMedallasPage() {
  const searchParams = useSearchParams()
  const selectedMedal = searchParams.get("medal")

  const getCarsWithMedal = (medal: MedalType) => {
    return reviews.filter((car) => car.medals.includes(medal))
  }

  const getCriteriaForMedal = (medal: MedalType) => {
    switch (medal) {
      case "performance":
        return [
          "Potencia superior a 300 CV",
          "Aceleración de 0 a 100 km/h en menos de 5 segundos",
          "Puntuación de rendimiento superior a 9.0",
        ]
      case "efficiency":
        return [
          "Medalla eficiencia",
          "Consumo inferior a 5L/100km o equivalente eléctrico",
          "Emisiones de CO2 por debajo de 100 g/km",
          "Puntuación de eficiencia superior a 9.0",
        ]
      case "luxury":
        return [
          "Materiales de alta calidad en el interior",
          "Tecnologías de confort avanzadas",
          "Puntuación de confort superior a 9.0",
        ]
      case "technology":
        return [
          "Sistema de infoentretenimiento de última generación",
          "Asistentes de conducción avanzados",
          "Puntuación de tecnología superior a 9.0",
        ]
      case "safety":
        return [
          "5 estrellas en pruebas Euro NCAP",
          "Sistemas de seguridad activa y pasiva avanzados",
          "Puntuación de seguridad superior a 9.0",
        ]
      case "design":
        return [
          "Diseño exterior innovador y atractivo",
          "Interior bien diseñado y ergonómico",
          "Puntuación de diseño superior a 9.0",
        ]
      case "value":
        return [
          "Precio competitivo en su segmento",
          "Equipamiento superior a la media de su categoría",
          "Puntuación de valor superior a 9.0",
        ]
      case "electric":
        return [
          "Vehículo 100% eléctrico",
          "Autonomía superior a 400 km (WLTP)",
          "Capacidad de carga rápida (0-80% en menos de 40 minutos)",
        ]
      case "versatility":
        return [
          "Capacidad para adaptarse a diferentes terrenos",
          "Configuración flexible del interior",
          "Múltiples modos de conducción",
        ]
      case "eco":
        return [
          "Emisiones de CO2 extremadamente bajas",
          "Uso de materiales sostenibles en la producción",
          "Puntuación de eficiencia superior a 9.5",
        ]
      case "offroad":
        return [
          "Tracción a las cuatro ruedas",
          "Altura al suelo elevada",
          "Sistemas específicos para conducción off-road",
        ]
      case "reliability":
        return [
          "Historial probado de baja tasa de fallos",
          "Garantía extendida del fabricante",
          "Altas puntuaciones en estudios de fiabilidad a largo plazo",
        ]
      case "innovation":
        return [
          "Introducción de tecnologías pioneras en el mercado",
          "Características únicas no presentes en otros vehículos",
          "Reconocimientos de la industria por innovación",
        ]
      case "handling":
        return [
          "Dirección precisa y respuesta inmediata",
          "Excelente agarre en curvas",
          "Puntuación de manejo superior a 9.0",
        ]
      case "comfort":
        return [
          "Suspensión adaptativa de alta calidad",
          "Aislamiento acústico excepcional",
          "Asientos ergonómicos con múltiples ajustes",
        ]
      case "lightweight":
        return [
          "Uso extensivo de materiales ligeros como aluminio o fibra de carbono",
          "Peso total significativamente menor que la media de su categoría",
          "Mejora notable en la relación peso-potencia",
        ]
      case "fuelEfficiency":
        return [
          "Consumo de combustible líder en su clase",
          "Tecnologías avanzadas de ahorro de combustible",
          "Emisiones de CO2 excepcionalmente bajas para motores de combustión",
        ]
      case "connectivity":
        return [
          "Sistema de infoentretenimiento de última generación",
          "Integración perfecta con smartphones y dispositivos móviles",
          "Actualizaciones de software over-the-air (OTA)",
        ]
      case "familyFriendly":
        return [
          "Amplio espacio interior y de carga",
          "Múltiples características de seguridad para niños",
          "Configuración flexible de asientos",
        ]
      case "solarPowered":
        return [
          "Paneles solares integrados en el vehículo",
          "Capacidad de carga de batería mediante energía solar",
          "Aumento significativo de la eficiencia energética",
        ]
      default:
        return ["Criterios no especificados"]
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Sistema de Medallas de ZonaMotor360</h1>
      <p className="mb-8 text-lg">
        En ZonaMotor360, utilizamos un sistema de medallas para destacar las características sobresalientes de los
        vehículos que revisamos. Cada medalla representa un aspecto en el que el vehículo ha demostrado excelencia. Las
        medallas se asignan automáticamente basándose en criterios específicos para cada categoría.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(medals).map(([key, medal]) => (
          <Card key={key} className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-4">
                <Link
                  href={`/sistema-medallas?medal=${key}`}
                  className="flex items-center gap-4 transform hover:scale-110 transition-transform duration-200"
                >
                  {medal}
                  <span className="text-xl">{(medal as React.ReactElement<any>).props.name}</span>
                </Link>
              </CardTitle>
              <CardDescription>{(medal as React.ReactElement<any>).props.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold mb-2">Criterios de obtención:</h4>
              <ul className="list-disc list-inside mb-4">
                {getCriteriaForMedal(key as MedalType).map((criterion, index) => (
                  <li key={index}>{criterion}</li>
                ))}
              </ul>
              <Accordion type="single" collapsible>
                <AccordionItem value="cars">
                  <AccordionTrigger>Ver coches con esta medalla</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 gap-4">
                      {getCarsWithMedal(key as MedalType).map((car) => (
                        <div key={car.id} className="flex items-center gap-4 p-2 bg-gray-100 rounded-lg">
                          <Image
                            src={car.imageUrl || "/placeholder.svg"}
                            alt={car.title}
                            width={60}
                            height={60}
                            className="rounded-md object-cover"
                          />
                          <div>
                            <h3 className="font-semibold">
                              {car.make} {car.model}
                            </h3>
                            <p className="text-sm text-gray-600">{car.year}</p>
                          </div>
                          <Button asChild variant="outline" size="sm" className="ml-auto">
                            <Link href={`/review/${car.id}`}>Ver review</Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedMedal && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            Coches con la medalla:{" "}
            {typeof medals[selectedMedal as MedalType] === "object" && "props" in medals[selectedMedal as MedalType]
              ? medals[selectedMedal as MedalType].props.name
              : selectedMedal}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getCarsWithMedal(selectedMedal as MedalType).map((car) => (
              <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image src={car.imageUrl || "/placeholder.svg"} alt={car.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">
                    {car.make} {car.model}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{car.excerpt}</p>
                  <Button asChild>
                    <Link href={`/review/${car.id}`}>Ver review</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
;("")

