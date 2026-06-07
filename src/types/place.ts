export type Place = {
  id: number
  name: string
  category: "도서관" | "카페" | "공공시설" | "기타"
  address: string
  region: string
  district: string
  hours: string
  closed: string
  wifi: boolean
  outlet: boolean
  free: boolean
  description: string
  tags: string[]
}
