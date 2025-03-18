import Link from "next/link"

export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Política de Cookies</h1>
      <div className="prose max-w-none">
        <h2>¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Se
          utilizan ampliamente para hacer que los sitios web funcionen de manera más eficiente, así como para
          proporcionar información a los propietarios del sitio.
        </p>

        <h2>¿Cómo utilizamos las cookies?</h2>
        <p>
          Utilizamos cookies por varias razones, detalladas a continuación. Desafortunadamente, en la mayoría de los
          casos, no existen opciones estándar de la industria para deshabilitar las cookies sin deshabilitar por
          completo la funcionalidad y las características que agregan a este sitio. Se recomienda que deje activadas
          todas las cookies si no está seguro de si las necesita o no, en caso de que se utilicen para proporcionar un
          servicio que usted utiliza.
        </p>

        <h2>Tipos de cookies que utilizamos</h2>
        <ul>
          <li>
            <strong>Cookies esenciales:</strong> Algunas cookies son esenciales para el funcionamiento de nuestro sitio
            web. Por ejemplo, para recordar su sesión de inicio de sesión.
          </li>
          <li>
            <strong>Cookies de análisis:</strong> Utilizamos estas cookies para analizar cómo los visitantes usan
            nuestro sitio web y para monitorear el rendimiento del sitio. Esto nos permite proporcionar una experiencia
            de alta calidad al personalizar nuestra oferta.
          </li>
          <li>
            <strong>Cookies de funcionalidad:</strong> Estas cookies permiten que nuestro sitio web recuerde las
            elecciones que usted realiza (como su nombre de usuario, idioma o la región en la que se encuentra) y
            proporcione características mejoradas y más personales.
          </li>
          <li>
            <strong>Cookies de publicidad:</strong> Estas cookies se utilizan para hacer que los anuncios sean más
            relevantes para usted y sus intereses.
          </li>
        </ul>

        <h2>Control de cookies</h2>
        <p>
          Puede controlar y/o eliminar las cookies como desee. Puede eliminar todas las cookies que ya están en su
          dispositivo y puede configurar la mayoría de los navegadores para evitar que se coloquen. Sin embargo, si hace
          esto, es posible que tenga que ajustar manualmente algunas preferencias cada vez que visite un sitio y que
          algunos servicios y funcionalidades no funcionen.
        </p>

        <h2>Más información</h2>
        <p>
          Para obtener más información sobre cómo utilizamos las cookies, puede contactarnos a través de nuestro{" "}
          <Link href="/contacto" className="text-blue-600 hover:underline">
            formulario de contacto
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

