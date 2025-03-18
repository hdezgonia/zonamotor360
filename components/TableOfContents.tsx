"use client"

import { useState, useEffect } from "react"
import { Link as ScrollLink } from "react-scroll"

interface TableOfContentsProps {
  headings: { id: string; text: string; level: number }[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeHeading, setActiveHeading] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id)
          }
        })
      },
      { rootMargin: "0px 0px -80% 0px" },
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) observer.observe(element)
    })

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id)
        if (element) observer.unobserve(element)
      })
    }
  }, [headings])

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-auto">
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`${heading.level === 2 ? "ml-0" : "ml-4"} ${
              activeHeading === heading.id ? "font-bold text-blue-600" : "text-gray-600"
            }`}
          >
            <ScrollLink
              to={heading.id}
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-blue-600 transition-colors"
            >
              {heading.text}
            </ScrollLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

