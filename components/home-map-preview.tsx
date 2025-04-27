"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MapIcon, Loader2 } from "lucide-react"

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

// Dynamically import the map components with no SSR
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })

export function HomeMapPreview() {
  const [isClient, setIsClient] = useState(false)
  const [leafletLoaded, setLeafletLoaded] = useState(false)
  const [customIcon, setCustomIcon] = useState<any>(null)

  useEffect(() => {
    setIsClient(true)

    // Dynamically import Leaflet CSS
    const linkElement = document.createElement("link")
    linkElement.rel = "stylesheet"
    linkElement.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    linkElement.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
    linkElement.crossOrigin = ""
    document.head.appendChild(linkElement)

    // Dynamically import Leaflet
    import("leaflet").then((L) => {
      // Create custom icon
      const icon = new L.Icon({
        iconUrl: "/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "/images/marker-shadow.png",
        shadowSize: [41, 41],
      })

      setCustomIcon(icon)
      setLeafletLoaded(true)
    })
  }, [])

  if (!isClient || !leafletLoaded) {
    return (
      <div className="h-[300px] bg-gray-100 flex items-center justify-center rounded-lg">
        <div className="flex flex-col items-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary mb-2" />
          <p>Učitavanje pregleda karte...</p>
        </div>
      </div>
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
