"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import { Place } from "@/types/place"
import "leaflet/dist/leaflet.css"

// Leaflet 기본 마커 아이콘 경로 수동 설정 (Next.js 빌드 이슈 대응)
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

const VWORLD_URL = `https://api.vworld.kr/req/wmts/1.0.0/A678B804-2AAF-304D-8FA6-581AE4E91884/Base/{z}/{y}/{x}.png`

type Props = {
  places: Place[]
}

export default function MapView({ places }: Props) {
  const placesWithCoords = places.filter((p) => p.lat && p.lng)

  useEffect(() => {
    // SSR 대응: window 객체 확인
  }, [])

  return (
    <MapContainer
      center={[36.5, 127.5]}
      zoom={7}
      className="w-full h-[450px] rounded-lg z-0"
    >
      <TileLayer
        url={VWORLD_URL}
        attribution="&copy; VWorld"
        tms={false}
      />
      {placesWithCoords.map((place) => (
        <Marker key={place.id} position={[place.lat!, place.lng!]} icon={icon}>
          <Popup>
            <div className="space-y-1">
              <p className="font-semibold">{place.name}</p>
              <p className="text-xs text-gray-500">{place.address}</p>
              {place.weekday_open && (
                <p className="text-xs">평일: {place.weekday_open} - {place.weekday_close}</p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
