"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { natjecanja } from "@/data/natjecanja"
import { sportovi } from "@/data/sportovi"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CalendarIcon, Loader2 } from "lucide-react"

// Define the venue type with coordinates
interface Venue {
  id: string
  name: string
  lat: number
  lng: number
  competitions: Array<{
    id: string
    naziv: string
    datum: string
    sportId: string
    isUpcoming: boolean
  }>
}

// Zagreb's coordinates
const ZAGREB_CENTER = { lat: 45.815, lng: 15.982 }

// Dynamically import the map components with no SSR
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })
const ZoomControl = dynamic(() => import("react-leaflet").then((mod) => mod.ZoomControl), { ssr: false })

export function VenueMap() {
  const [venues, setVenues] = useState<Venue[]>([])
  const [isClient, setIsClient] = useState(false)
  const [leafletLoaded, setLeafletLoaded] = useState(false)
  const [customIcon, setCustomIcon] = useState<any>(null)

  // Format date to Croatian format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("hr-HR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

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

    // Mock venue data with coordinates for Zagreb locations
    const mockVenues = [
      { id: "v1", name: "Zagrebački šahovski savez", lat: 45.815, lng: 15.9819 },
      { id: "v2", name: "Atletski stadion", lat: 45.7833, lng: 15.9558 },
      { id: "v3", name: "Sportska arena", lat: 45.7719, lng: 15.9406 },
      { id: "v4", name: "Gradski bazen", lat: 45.8039, lng: 15.9644 },
      { id: "v5", name: "Središnji teren", lat: 45.8233, lng: 15.9722 },
      { id: "v6", name: "Vanjski tereni", lat: 45.7925, lng: 15.9514 },
      { id: "v7", name: "Jarun", lat: 45.7839, lng: 15.9208 },
      { id: "v8", name: "Medvednica", lat: 45.8689, lng: 15.975 },
      { id: "v9", name: "Park Maksimir", lat: 45.8217, lng: 16.0181 },
      { id: "v10", name: "Kongresni centar", lat: 45.8033, lng: 15.97 },
    ]

    // Map competitions to venues
    const venuesWithCompetitions = mockVenues.map((venue) => {
      // Find competitions at this venue
      const venueCompetitions = natjecanja
        .filter((comp) => comp.lokacija.includes(venue.name))
        .map((comp) => ({
          id: comp.id,
          naziv: comp.naziv,
          datum: comp.datum,
          sportId: comp.sportId,
          isUpcoming: new Date(comp.datum) > new Date(),
        }))

      // If no exact matches, try partial matches based on keywords
      if (venueCompetitions.length === 0) {
        const keywords = venue.name.toLowerCase().split(" ")

        natjecanja.forEach((comp) => {
          const locationLower = comp.lokacija.toLowerCase()
          if (keywords.some((keyword) => locationLower.includes(keyword))) {
            venueCompetitions.push({
              id: comp.id,
              naziv: comp.naziv,
              datum: comp.datum,
              sportId: comp.sportId,
              isUpcoming: new Date(comp.datum) > new Date(),
            })
          }
        })
      }

      return {
        ...venue,
        competitions: venueCompetitions,
      }
    })

    // Filter out venues with no competitions
    const filteredVenues = venuesWithCompetitions.filter((venue) => venue.competitions.length > 0)
    setVenues(filteredVenues)
  }, [])

  if (!isClient || !leafletLoaded) {
    return (
      <div className="h-[600px] bg-gray-100 flex items-center justify-center rounded-lg">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
          <p>Učitavanje karte...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[600px] w-full rounded-lg overflow-hidden border border-border relative">
      <MapContainer center={ZAGREB_CENTER} zoom={13} style={{ height: "100%", width: "100%" }} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />

        {venues.map((venue) => (
          <Marker key={venue.id} position={[venue.lat, venue.lng]} icon={customIcon}>
            <Popup className="venue-popup">
              <div className="p-1">
                <h3 className="font-bold text-lg mb-2">{venue.name}</h3>
                <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1">
                  {venue.competitions.map((comp) => {
                    const sport = sportovi.find((s) => s.id === comp.sportId)
                    return (
                      <div key={comp.id} className="border-b pb-2 last:border-b-0">
                        <div className="flex items-center gap-2 mb-1">
                          {sport && (
                            <Badge variant="outline" className="text-xs">
                              {sport.naziv}
                            </Badge>
                          )}
                          <Badge
                            variant={comp.isUpcoming ? "outline" : "destructive"}
                            className={comp.isUpcoming ? "bg-zagi-yellow text-black text-xs" : "text-xs"}
                          >
                            {comp.isUpcoming ? "Nadolazeće" : "Završeno"}
                          </Badge>
                        </div>
                        <p className="font-medium text-sm">{comp.naziv}</p>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <CalendarIcon className="mr-1 h-3 w-3" />
                          <span>{formatDate(comp.datum)}</span>
                        </div>
                        <Button variant="link" asChild className="p-0 h-auto text-xs mt-1">
                          <Link href={`/natjecanja/${comp.id}`}>Detalji natjecanja</Link>
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
