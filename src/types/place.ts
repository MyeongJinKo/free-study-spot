export type Place = {
  id: number
  name: string
  category: "도서관" | "카페" | "공공시설" | "기타"
  address: string
  region: string
  district: string
  hours: string | null
  closed: string | null
  wifi: boolean
  outlet: boolean
  description: string | null
  tags: string[] | null
  geom: unknown | null
  created_at: string
}

export type Submission = {
  name: string
  category: string
  address: string
  region: string
  district: string
  hours?: string
  closed?: string
  wifi: boolean
  outlet: boolean
  description?: string
  tags?: string[]
}
