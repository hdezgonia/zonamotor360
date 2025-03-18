import { Progress } from "@/components/ui/progress"

interface Spec {
  name: string
  value: number
  unit: string
  max: number
}

interface SpecComparisonProps {
  currentCar: Spec[]
  rivalCar: Spec[]
}

export function SpecComparison({ currentCar, rivalCar }: SpecComparisonProps) {
  return (
    <div className="space-y-4">
      {currentCar.map((spec, index) => (
        <div key={spec.name} className="grid grid-cols-5 gap-4 items-center">
          <span className="font-medium">{spec.name}</span>
          <div className="col-span-2">
            <Progress value={(spec.value / spec.max) * 100} className="h-2" />
            <span className="text-sm">{`${spec.value} ${spec.unit}`}</span>
          </div>
          <div className="col-span-2">
            <Progress value={(rivalCar[index].value / spec.max) * 100} className="h-2" />
            <span className="text-sm">{`${rivalCar[index].value} ${rivalCar[index].unit}`}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

