"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import L from "leaflet"
import { Place } from "@/types/place"
import "leaflet/dist/leaflet.css"
import "react-leaflet-cluster/dist/assets/MarkerCluster.css"
import "react-leaflet-cluster/dist/assets/MarkerCluster.Default.css"

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

const activeIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [31, 51],
  iconAnchor: [15, 51],
  popupAnchor: [1, -42],
  className: "hue-rotate-180",
})

const VWORLD_URL = `https://api.vworld.kr/req/wmts/1.0.0/A678B804-2AAF-304D-8FA6-581AE4E91884/Base/{z}/{y}/{x}.png`

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
      <TileLayer
        url={VWORLD_URL}
        attribution="&copy; VWorld"
        tms={false}
      />
      <MarkerClusterGroup chunkedLoading>
        {placesWithCoords.map((place) => (
          <Marker
            key={place.id}
            position={[place.lat!, place.lng!]}
            icon={selectedId === place.id ? activeIcon : icon}
            eventHandlers={{ click: () => onSelect(place.id) }}
          >
            <Popup>
              <div className="space-y-1.5 min-w-[180px]">
                <p className="font-semibold text-sm">{place.name}</p>
                <p className="text-xs text-gray-500">{place.address}</p>
                <div className="text-xs space-y-0.5 pt-1">
                  {formatTime(place.weekday_open, place.weekday_close) && (
                    <p>평일: {formatTime(place.weekday_open, place.weekday_close)}</p>
                  )}
                  {place.weekend_open
                    ? <p>주말: {formatTime(place.weekend_open, place.weekend_close)}</p>
                    : <p className="text-gray-400">주말: 미운영</p>
                  }
                  {place.holiday_open
                    ? <p>공휴일: {formatTime(place.holiday_open, place.holiday_close)}</p>
                    : <p className="text-gray-400">공휴일: 미운영</p>
                  }
                  {place.closed_day && (
                    <p className="text-gray-500">휴무: {place.closed_day}</p>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  )
}
