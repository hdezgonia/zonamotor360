import { BrandSection } from "@/components/BrandSection"
import { reviews } from "@/data/posts"

export default function BrandsPage() {
  const brandMap = reviews.reduce(
    (acc, review) => {
      if (!acc[review.make]) {
        acc[review.make] = {
          name: review.make,
          logo: review.logoUrl,
          vehicles: [],
        }
      }
      acc[review.make].vehicles.push({
        id: review.id,
        model: review.model,
        trim: review.trim,
        year: review.year,
        reviewType: review.reviewType,
      })
      return acc
    },
    {} as Record<string, { name: string; logo: string; vehicles: any[] }>,
  )

  const brands = Object.values(brandMap).sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Marcas Analizadas</h1>
      <div className="space-y-8">
        {brands.map((brand) => (
          <BrandSection key={brand.name} name={brand.name} logo={brand.logo} vehicles={brand.vehicles} />
        ))}
      </div>
    </div>
  )
}

