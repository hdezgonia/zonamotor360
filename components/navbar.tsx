"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-gray-900 flex items-center">
            ZonaMotor<span className="text-blue-600 text-3xl">.</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/reviews" className="text-gray-700 hover:text-gray-900">
              Reviews
            </Link>
            <Link href="/comparador" className="text-gray-700 hover:text-gray-900">
              Comparador
            </Link>
            <Link href="/noticias" className="text-gray-700 hover:text-gray-900">
              Noticias
            </Link>
            <Link href="/marcas" className="text-gray-700 hover:text-gray-900">
              Marcas
            </Link>
            <Link href="/cinemotion-showcase" className="text-gray-700 hover:text-gray-900">
              CineMotion
            </Link>
            <Button asChild variant="default">
              <Link href="/como-trabajamos">Cómo trabajamos</Link>
            </Button>
          </div>
          <form onSubmit={handleSearch} className="flex items-center">
            <Input
              type="search"
              placeholder="Buscar reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mr-2"
            />
            <Button type="submit" size="icon" variant="ghost">
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </Button>
          </form>
        </div>
      </div>
    </nav>
  )
}

