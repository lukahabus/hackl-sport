"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import { Icon } from "leaflet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MapIcon } from "lucide-react"

// Import Leaflet CSS
import "leaflet/dist/leaflet.css"

// Zagreb's coordinates
const ZAGREB_CENTER = { lat: 45.815, lng: 15.982 }

// Sample venue locations
const SAMPLE_VENUES = [
  { id: "v1", name: "Zagrebački šahovski savez", lat: 45.815, lng: 15.9819 },
  { id: "v2", name: "Atletski stadion", lat: 45.7833, lng: 15.9558 },
  { id: "v3", name: "Sportska arena", lat: 45.7719, lng: 15.9406 },
  { id: "v4", name: "Gradski bazen", lat: 45.8039, lng: 15.9644 },
  { id: "v5", name: "Središnji teren", lat: 45.8233, lng: 15.9722 },
]

export function HomeMapPreview() {
  const [isClient, setIsClient] = useState(false)

  // Custom icon for markers
  const customIcon = new Icon({
    iconUrl: "/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "/images/marker-shadow.png",
    shadowSize: [41, 41],
  })

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="h-[300px] bg-gray-100 flex items-center justify-center rounded-lg">Loading map preview...</div>
    )
  }

  return (
    <div className="relative h-[300px] rounded-lg overflow-hidden border border-border">
      <MapContainer
        center={ZAGREB_CENTER}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        dragging={false}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {SAMPLE_VENUES.map((venue) => (
          <Marker key={venue.id} position={[venue.lat, venue.lng]} icon={customIcon} />
        ))}
      </MapContainer>

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center p-4">
        <Button asChild className="bg-white text-black hover:bg-white/90">
          <Link href="/lokacije" className="flex items-center gap-2">
            <MapIcon className="h-4 w-4" />
            Pregledaj kartu lokacija
          </Link>
        </Button>
      </div>
    </div>
  )
}
