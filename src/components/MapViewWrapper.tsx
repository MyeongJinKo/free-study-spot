"use client"

import dynamic from "next/dynamic"
import { Place } from "@/types/place"

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false })

export default function MapViewWrapper({ places }: { places: Place[] }) {
  return <MapView places={places} />
}
