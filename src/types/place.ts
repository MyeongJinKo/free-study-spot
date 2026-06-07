export type Category = "도서관" | "청년센터" | "주민센터" | "복지관" | "문화센터" | "기타"
export type AgeLimit = "전연령" | "청년"

export type Place = {
  id: number
  name: string
  category: Category
  address: string
  region: string
  district: string
  age_limit: AgeLimit
  weekday_open: string | null
  weekday_close: string | null
  weekend_open: string | null
  weekend_close: string | null
  holiday_open: string | null
  holiday_close: string | null
  closed_day: string | null
  wifi: boolean
  outlet: boolean
  description: string | null
  tags: string[] | null
  geom: unknown | null
  created_at: string
}

export type Submission = {
  name: string
  category: Category
  address: string
  region: string
  district: string
  age_limit: AgeLimit
  weekday_open?: string
  weekday_close?: string
  weekend_open?: string
  weekend_close?: string
  holiday_open?: string
  holiday_close?: string
  closed_day?: string
  wifi: boolean
  outlet: boolean
  description?: string
  tags?: string[]
}
