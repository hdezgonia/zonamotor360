export type RoadmapCategory = "review" | "video" | "feature"
export type RoadmapStatus = "planned" | "confirmed" | "recorded" | "in-production" | "in-development" | "delayed"
export type RoadmapPriority = "low" | "medium" | "high"

export interface RoadmapItem {
  id: number
  title: string
  description: string
  category: RoadmapCategory
  status: RoadmapStatus
  date: string // Fecha de publicación en formato YYYY-MM-DD
  recordingDate: string | null // Fecha de grabación en formato YYYY-MM-DD
  priority: RoadmapPriority
  percentComplete: number
  image?: string
}

