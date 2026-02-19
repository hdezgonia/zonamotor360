import type { CarReview } from "./types"
export * from "./utils"
export * from "./types"

import civicTypeR from "./civic_type_r.json"
import cupraBorn from "./cupra_born.json"
import cupraTavascan from "./cupra_tavascan.json"
import dongfeng_box from "./dongfeng_box.json"
import mazda3 from "./mazda_3.json"
import mercedesB180D from "./mercedes-b180d-progressive.json"
import polestar2Single from "./polestar_2_lrsm.json"
import polestar2Performance from "./polestar_2_performance.json"
import polestar4Single from "./polestar_4_lrsm.json"
import polestar4Performance from "./polestar_4_performance.json"
import xpengG6 from "./xpeng_g6.json"
import xpengP7Wing from "./xpeng_p7_wing.json"


export const reviews: CarReview[] = [
  civicTypeR,
  cupraBorn,
  cupraTavascan,
  dongfeng_box,
  mazda3,
  mercedesB180D,
  polestar2Single,
  polestar2Performance,
  polestar4Single,
  polestar4Performance,
  xpengG6,
  xpengP7Wing
].sort((a, b) => new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime()) as CarReview[]

export const getAllCategories = () => {
  return Array.from(new Set(reviews.flatMap((r) => r.categories)))
}
export const categories = getAllCategories()

export const getAllMakes = () => {
  return Array.from(new Set(reviews.map((r) => r.make)))
}
export const makes = getAllMakes()
