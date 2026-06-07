"use client"

import dynamic from "next/dynamic"
import { Place } from "@/types/place"

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false })

type Props = {
  places: Place[]
  selectedId: number | null
  onSelect: (id: number) => void
}

export default function MapViewWrapper({ places, selectedId, onSelect }: Props) {
  return <MapView places={places} selectedId={selectedId} onSelect={onSelect} />
}
