import Link from "next/link"

export default function LegalPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Información Legal</h1>
      <div className="prose max-w-none">
        <h2>1. Información del titular</h2>
        <p>
          ZonaMotor360 es un sitio web propiedad de ZonaMotor360 S.L., con CIF B12345678 y domicilio social en Calle
          Ejemplo, 123, 28001 Madrid, España.
        </p>

        <h2>2. Condiciones de uso</h2>
        <p>
          El uso de este sitio web implica la aceptación plena de los términos y condiciones del presente aviso legal.
          Estos términos pueden ser modificados sin notificación previa.
        </p>

        <h2>3. Propiedad intelectual</h2>
        <p>
          Todos los contenidos de este sitio web, incluyendo textos, gráficos, logotipos, iconos, imágenes y software,
          son propiedad de ZonaMotor360 S.L. o de sus proveedores de contenidos y están protegidos por las leyes de
          propiedad intelectual.
        </p>

        <h2>4. Política de privacidad</h2>
        <p>
          Nuestra política de privacidad describe cómo recogemos, guardamos o utilizamos la información que recabamos a
          través de los diferentes servicios o páginas disponibles en este sitio. Es importante que entienda qué
          información recogemos y cómo la utilizamos.
        </p>

        <h2>5. Política de cookies</h2>
        <p>
          Este sitio web utiliza cookies para mejorar la experiencia del usuario. Puede consultar nuestra{" "}
          <Link href="/cookies" className="text-blue-600 hover:underline">
            política de cookies
          </Link>{" "}
          para más información.
        </p>

        <h2>6. Limitación de responsabilidad</h2>
        <p>
          ZonaMotor360 S.L. no se hace responsable de los errores u omisiones en los contenidos de este sitio web, ni de
          los problemas que se puedan producir a raíz de la utilización de este sitio o sitios externos enlazados.
        </p>

        <h2>7. Legislación aplicable y jurisdicción</h2>
        <p>
          Este aviso legal se rige por la legislación española. Cualquier disputa que pudiera surgir en relación con el
          uso de este sitio web estará sujeta a la jurisdicción exclusiva de los juzgados y tribunales de Madrid,
          España.
        </p>
      </div>
    </div>
  )
}

