"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Place, Category } from "@/types/place"
import PlaceCard from "@/components/PlaceCard"
import MapViewWrapper from "@/components/MapViewWrapper"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const CATEGORIES: ("전체" | Category)[] = ["전체", "도서관", "청년센터", "주민센터", "복지관", "문화센터", "기타"]

type Props = {
  places: Place[]
}

export default function PlaceList({ places }: Props) {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [region, setRegion] = useState("전체")
  const [district, setDistrict] = useState("전체")
  const [category, setCategory] = useState("전체")
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleMarkerSelect = useCallback((id: number) => {
    setSelectedId(id)
    cardRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "center" })
  }, [])

  // 데이터 기반 region/district 목록
  const availableRegions = [
    "전체",
    ...Array.from(new Set(places.map((p) => p.region))).sort(),
  ]

  const availableDistricts = [
    "전체",
    ...Array.from(
      new Set(
        places
          .filter((p) => region === "전체" || p.region === region)
          .map((p) => p.district)
      )
    ).sort(),
  ]

  const suggestions = query.trim().length > 0
    ? places.filter((p) =>
        p.name.includes(query) ||
        p.address.includes(query) ||
        p.district.includes(query)
      ).slice(0, 6)
    : []

  const filtered = places.filter((p) => {
    const matchRegion = region === "전체" || p.region === region
    const matchDistrict = district === "전체" || p.district === district
    const matchCategory = category === "전체" || p.category === category
    const matchQuery = query.trim() === "" ||
      p.name.includes(query) ||
      p.address.includes(query) ||
      p.district.includes(query)
    return matchRegion && matchDistrict && matchCategory && matchQuery
  })

  function selectSuggestion(name: string) {
    setQuery(name)
    setOpen(false)
  }

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !inputRef.current?.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <div className="space-y-6">
      {/* 검색 + 필터 */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Input
            ref={inputRef}
            placeholder="장소명, 주소, 지역구 검색"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setOpen(true)
            }}
            onFocus={() => query.trim() && setOpen(true)}
          />
          {open && suggestions.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute top-full mt-1 w-full bg-background border rounded-lg shadow-md z-50 overflow-hidden"
            >
              {suggestions.map((p) => (
                <button
                  key={p.id}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted flex items-center justify-between gap-2"
                  onMouseDown={() => selectSuggestion(p.name)}
                >
                  <span>{p.name}</span>
                  <span className="text-xs text-muted-foreground shrink-0">{p.district}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <Select value={region} onValueChange={(v) => { setRegion(v ?? "전체"); setDistrict("전체") }}>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {availableRegions.map((r) => (
              <SelectItem key={r} value={r}>{r}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={district} onValueChange={(v) => setDistrict(v ?? "전체")}>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {availableDistricts.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={category} onValueChange={(v) => setCategory(v ?? "전체")}>
          <SelectTrigger className="w-full sm:w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 지도 */}
      <MapViewWrapper places={filtered} selectedId={selectedId} onSelect={handleMarkerSelect} />

      {/* 결과 수 */}
      <p className="text-sm text-muted-foreground">
        {filtered.length}개의 장소
      </p>

      {/* 카드 목록 */}
      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">조건에 맞는 장소가 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((place) => (
            <div
              key={place.id}
              ref={(el) => { cardRefs.current[place.id] = el }}
              onClick={() => setSelectedId(place.id)}
              className={`rounded-xl transition-shadow cursor-pointer ring-2 ${
                selectedId === place.id ? "ring-primary" : "ring-transparent"
              }`}
            >
              <PlaceCard place={place} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
