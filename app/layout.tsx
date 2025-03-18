import "./globals.css"
import { Poppins } from "next/font/google"
import { Navbar } from "../components/navbar"
import Link from "next/link"
import type { ReactNode } from "react"
import { CookieConsent } from "../components/CookieConsent"

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata = {
  title: "ZonaMotor360",
  description: "Las últimas pruebas y reviews de coches",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="es" className={poppins.className}>
      <body className="bg-gray-50 text-gray-900 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <footer className="bg-gray-800 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">ZonaMotor360</h3>
                <p className="text-gray-400">Las últimas pruebas y reviews de coches</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Enlaces útiles</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/faqs" className="text-gray-400 hover:text-white transition-colors">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href="/como-trabajamos" className="text-gray-400 hover:text-white transition-colors">
                      Cómo trabajamos
                    </Link>
                  </li>
                  <li>
                    <Link href="/equipo-grabacion" className="text-gray-400 hover:text-white transition-colors">
                      Equipo de grabación
                    </Link>
                  </li>
                  <li>
                    <Link href="/legal" className="text-gray-400 hover:text-white transition-colors">
                      Información Legal
                    </Link>
                  </li>
                  <li>
                    <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                      Política de Cookies
                    </Link>
                  </li>
                  <li>
                    <Link href="/sistema-medallas" className="text-gray-400 hover:text-white transition-colors">
                      Sistema de Medallas
                    </Link>
                  </li>
                  <li>
                    <Link href="/marcas" className="text-gray-400 hover:text-white transition-colors">
                      Marcas
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contacto</h3>
                <p className="text-gray-400">info@zonamotor360.com</p>
                <p className="text-gray-400">+34 123 456 789</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
              <p>&copy; 2023 ZonaMotor360. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
        <CookieConsent />
      </body>
    </html>
  )
}



import './globals.css'