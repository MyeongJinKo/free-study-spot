"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import L from "leaflet"
import { Place, Category } from "@/types/place"
import "leaflet/dist/leaflet.css"
import "react-leaflet-cluster/dist/assets/MarkerCluster.css"
import "react-leaflet-cluster/dist/assets/MarkerCluster.Default.css"

const VWORLD_URL = `https://api.vworld.kr/req/wmts/1.0.0/A678B804-2AAF-304D-8FA6-581AE4E91884/Base/{z}/{y}/{x}.png`

const CATEGORY_COLORS: Record<Category, string> = {
  도서관: "#3B82F6",
  청년센터: "#F59E0B",
  주민센터: "#10B981",
  복지관: "#8B5CF6",
  문화센터: "#EC4899",
  기타: "#64748B",
}

function createCustomIcon(category: Category, isSelected: boolean) {
  if (typeof window === "undefined") return null

  const color = CATEGORY_COLORS[category] ?? CATEGORY_COLORS["기타"]
  const size = isSelected ? 48 : 36
  const borderWidth = isSelected ? 4 : 2
  const shadow = isSelected
    ? "0 4px 12px rgba(0,0,0,0.4)"
    : "0 2px 6px rgba(0,0,0,0.2)"
  const innerDot = isSelected
    ? `<div style="width:14px;height:14px;background:white;border-radius:50%;"></div>`
    : ""

  return L.divIcon({
    html: `<div style="width:${size}px;height:${size}px;background:${color};border:${borderWidth}px solid white;border-radius:50%;box-shadow:${shadow};display:flex;align-items:center;justify-content:center;">${innerDot}</div>`,
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2)],
  })
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

export default function MapView({ places, selectedId, onSelect }: Props) {
  const placesWithCoords = places.filter((p) => p.lat && p.lng)

  return (
    <MapContainer
      center={[36.5, 127.5]}
      zoom={7}
      className="w-full h-[300px] sm:h-[450px] rounded-lg z-0"
    >
      <TileLayer url={VWORLD_URL} attribution="&copy; VWorld" tms={false} />
      <MarkerClusterGroup chunkedLoading maxClusterRadius={50}>
        {placesWithCoords.map((place) => {
          const isSelected = selectedId === place.id
          const icon = createCustomIcon(place.category, isSelected)
          if (!icon) return null

          return (
            <Marker
              key={place.id}
              position={[place.lat!, place.lng!]}
              icon={icon}
              zIndexOffset={isSelected ? 1000 : 0}
              eventHandlers={{ click: () => onSelect(place.id) }}
            >
              <Popup>
                <div style={{ minWidth: 170, lineHeight: 1.4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: CATEGORY_COLORS[place.category] ?? "#64748B", flexShrink: 0 }} />
                    <p style={{ fontWeight: 600, fontSize: 13, margin: 0 }}>{place.name}</p>
                  </div>
                  <p style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>{place.address}</p>
                  <div style={{ fontSize: 11 }}>
                    {formatTime(place.weekday_open, place.weekday_close) && (
                      <p style={{ margin: "1px 0" }}>평일: {formatTime(place.weekday_open, place.weekday_close)}</p>
                    )}
                    {place.weekend_open
                      ? <p style={{ margin: "1px 0" }}>주말: {formatTime(place.weekend_open, place.weekend_close)}</p>
                      : <p style={{ margin: "1px 0", color: "#aaa" }}>주말: 미운영</p>
                    }
                    {place.holiday_open
                      ? <p style={{ margin: "1px 0" }}>공휴일: {formatTime(place.holiday_open, place.holiday_close)}</p>
                      : <p style={{ margin: "1px 0", color: "#aaa" }}>공휴일: 미운영</p>
                    }
                    {place.closed_day && (
                      <p style={{ margin: "1px 0", color: "#888" }}>휴무: {place.closed_day}</p>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MarkerClusterGroup>
    </MapContainer>
  )
}
