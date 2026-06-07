import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "장소 제보",
  description: "무료 공부 장소를 알고 계신가요? 제보해 주세요.",
}

export default function SubmitLayout({ children }: { children: React.ReactNode }) {
  return children
}
