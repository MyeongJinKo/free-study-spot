"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const REGIONS = ["서울", "경기", "인천", "부산", "대구", "광주", "대전", "울산", "세종", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"]

export default function SubmitPage() {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({
    name: "",
    category: "",
    address: "",
    region: "",
    district: "",
    hours: "",
    closed: "",
    wifi: false,
    outlet: false,
    description: "",
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function set(key: string, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPending(true)

    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    setPending(false)

    if (res.ok) {
      setDone(true)
    } else {
      alert("제보 중 오류가 발생했습니다. 다시 시도해 주세요.")
    }
  }

  if (done) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
          <h2 className="text-xl font-bold">제보해 주셔서 감사합니다!</h2>
          <p className="text-muted-foreground text-sm">
            검토 후 2~3일 내에 반영될 예정입니다.
          </p>
          <Button variant="outline" onClick={() => router.push("/")}>
            목록으로 돌아가기
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-xl mx-auto px-4 py-10">
        <div className="mb-6 space-y-1">
          <h1 className="text-2xl font-bold">장소 제보</h1>
          <p className="text-muted-foreground text-sm">
            무료 공부 장소를 알고 계신가요? 알려주세요.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">장소 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">장소명 *</Label>
                <Input
                  id="name"
                  placeholder="예) 마포구립 서강도서관"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label>분류 *</Label>
                <Select onValueChange={(v) => set("category", v)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="분류 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="도서관">도서관</SelectItem>
                    <SelectItem value="카페">카페</SelectItem>
                    <SelectItem value="공공시설">공공시설</SelectItem>
                    <SelectItem value="기타">기타</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="address">주소 *</Label>
                <Input
                  id="address"
                  placeholder="예) 서울 마포구 서강로 100"
                  value={form.address}
                  onChange={(e) => set("address", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>지역 *</Label>
                  <Select onValueChange={(v) => set("region", v)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="시/도 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {REGIONS.map((r) => (
                        <SelectItem key={r} value={r}>{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="district">구/군 *</Label>
                  <Input
                    id="district"
                    placeholder="예) 마포구"
                    value={form.district}
                    onChange={(e) => set("district", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="hours">운영시간</Label>
                  <Input
                    id="hours"
                    placeholder="예) 09:00 - 22:00"
                    value={form.hours}
                    onChange={(e) => set("hours", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="closed">휴무일</Label>
                  <Input
                    id="closed"
                    placeholder="예) 매주 월요일"
                    value={form.closed}
                    onChange={(e) => set("closed", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="wifi"
                    checked={form.wifi}
                    onCheckedChange={(v) => set("wifi", v === true)}
                  />
                  <Label htmlFor="wifi">WiFi</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="outlet"
                    checked={form.outlet}
                    onCheckedChange={(v) => set("outlet", v === true)}
                  />
                  <Label htmlFor="outlet">콘센트</Label>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description">설명</Label>
                <Textarea
                  id="description"
                  placeholder="장소에 대해 자유롭게 설명해 주세요."
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full" disabled={pending}>
                {pending ? "제출 중..." : "제보하기"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
