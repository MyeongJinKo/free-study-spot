"use client"

import { useEffect, useRef, useState } from "react"
import { Place, Category } from "@/types/place"

const CATEGORY_COLORS: Record<Category, string> = {
  도서관: "#3B82F6",
  청년센터: "#F59E0B",
  주민센터: "#10B981",
  복지관: "#8B5CF6",
  문화센터: "#EC4899",
  기타: "#64748B",
}

function formatTime(open: string | null, close: string | null): string | null {
  if (!open || !close) return null
  const fmt = (t: string) => t.includes(":") ? t : `${t}시`
  return `${fmt(open)} ~ ${fmt(close)}`
}

type Props = {
  places: Place[]
  selectedId: number | null
  onSelect: (id: number) => void
}

declare global {
  interface Window {
    naver: any
  }
}

export default function MapView({ places, selectedId, onSelect }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  const placesWithCoords = places.filter((p) => p.lat && p.lng)

  // 네이버 지도 SDK 로드
  useEffect(() => {
    if (document.getElementById("naver-map-script")) {
      setIsLoaded(true)
      return
    }
    const script = document.createElement("script")
    script.id = "naver-map-script"
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`
    script.onload = () => setIsLoaded(true)
    document.head.appendChild(script)
  }, [])

  // 지도 초기화
  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstanceRef.current) return
    mapInstanceRef.current = new window.naver.maps.Map(mapRef.current, {
      center: new window.naver.maps.LatLng(37.5665, 126.978),
      zoom: 12,
    })
  }, [isLoaded])

  // 마커 렌더링
  useEffect(() => {
    if (!isLoaded || !mapInstanceRef.current) return

    // 기존 마커 제거
    markersRef.current.forEach((m) => m.setMap(null))
    markersRef.current = []

    placesWithCoords.forEach((place) => {
      const isSelected = selectedId === place.id
      const color = CATEGORY_COLORS[place.category] ?? CATEGORY_COLORS["기타"]
      const size = isSelected ? 24 : 18
      const border = isSelected ? 4 : 2

      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(place.lat!, place.lng!),
        map: mapInstanceRef.current,
        icon: {
          content: `<div style="width:${size}px;height:${size}px;background:${color};border:${border}px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.25);cursor:pointer;display:flex;align-items:center;justify-content:center;">${isSelected ? `<div style="width:7px;height:7px;background:white;border-radius:50%;"></div>` : ""}</div>`,
          anchor: new window.naver.maps.Point(size / 2, size / 2),
        },
        zIndex: isSelected ? 100 : 1,
      })

      // 정보창
      const infoWindow = new window.naver.maps.InfoWindow({
        content: `
          <div style="padding:10px;min-width:180px;line-height:1.5;font-family:sans-serif;">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
              <div style="width:10px;height:10px;border-radius:50%;background:${color};flex-shrink:0;"></div>
              <strong style="font-size:13px;">${place.name}</strong>
            </div>
            <p style="font-size:11px;color:#888;margin:0 0 6px;">${place.address}</p>
            <div style="font-size:11px;color:#444;">
              ${formatTime(place.weekday_open, place.weekday_close) ? `<p style="margin:2px 0;">평일: ${formatTime(place.weekday_open, place.weekday_close)}</p>` : ""}
              ${place.weekend_open ? `<p style="margin:2px 0;">주말: ${formatTime(place.weekend_open, place.weekend_close)}</p>` : `<p style="margin:2px 0;color:#bbb;">주말: 미운영</p>`}
              ${place.holiday_open ? `<p style="margin:2px 0;">공휴일: ${formatTime(place.holiday_open, place.holiday_close)}</p>` : `<p style="margin:2px 0;color:#bbb;">공휴일: 미운영</p>`}
              ${place.closed_day ? `<p style="margin:2px 0;color:#888;">휴무: ${place.closed_day}</p>` : ""}
            </div>
          </div>
        `,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        anchorSize: new window.naver.maps.Size(10, 10),
      })

      window.naver.maps.Event.addListener(marker, "click", () => {
        onSelect(place.id)
        markersRef.current.forEach((m) => {
          if (m._infoWindow) m._infoWindow.close()
        })
        infoWindow.open(mapInstanceRef.current, marker)
      })

      marker._infoWindow = infoWindow
      markersRef.current.push(marker)
    })
  }, [isLoaded, places, selectedId])

  return (
    <div
      ref={mapRef}
      className="w-full h-[300px] sm:h-[450px] rounded-lg"
      style={{ background: "#e5e7eb" }}
    />
  )
}
