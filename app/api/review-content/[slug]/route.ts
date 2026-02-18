import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params

  // Solo permitir slugs válidos (letras, números, guiones y guiones bajos)
  if (!/^[a-z0-9_-]+$/i.test(slug)) {
    return NextResponse.json({ error: "Slug inválido" }, { status: 400 })
  }

  const mdPath = path.join(process.cwd(), "data", "reviews", `${slug}.md`)

  if (!fs.existsSync(mdPath)) {
    return NextResponse.json({ content: null }, { status: 404 })
  }

  const content = fs.readFileSync(mdPath, "utf-8")
  return NextResponse.json({ content })
}
