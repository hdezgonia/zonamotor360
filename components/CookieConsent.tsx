"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent")
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true")
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white py-4 px-6 z-50">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-center sm:text-left mb-2 sm:mb-0">
          Utilizamos cookies para mejorar su experiencia en nuestro sitio web. Al continuar navegando, usted acepta
          nuestro uso de cookies.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/cookies" className="text-sm text-blue-400 hover:text-blue-300 underline">
            Más información
          </Link>
          <Button
            onClick={acceptCookies}
            variant="default"
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  )
}

