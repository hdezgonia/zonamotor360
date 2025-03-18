import { Loader2 } from "lucide-react"

export default function SearchLoading() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[50vh]">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <h2 className="text-2xl font-bold mb-2">Cargando resultados...</h2>
      <p className="text-gray-500">Procesando tu búsqueda</p>
    </div>
  )
}

