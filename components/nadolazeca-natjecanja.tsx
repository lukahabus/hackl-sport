"use client"

import Link from "next/link"
import { natjecanja } from "@/data/natjecanja"
import { sportovi } from "@/data/sportovi"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPinIcon } from "lucide-react"

export function NadolazecaNatjecanja() {
  // Get upcoming competitions sorted by date
  const nadolazecaNatjecanja = [...natjecanja]
    .filter((comp) => new Date(comp.datum) > new Date())
    .sort((a, b) => new Date(a.datum).getTime() - new Date(b.datum).getTime())
    .slice(0, 5)

  // Format date to Croatian format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("hr-HR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-4">
      {nadolazecaNatjecanja.map((natjecanje) => {
        const sport = sportovi.find((s) => s.id === natjecanje.sportId)

        return (
          <Link key={natjecanje.id} href={`/natjecanja/${natjecanje.id}`}>
            <Card className="hover:bg-muted/50 transition-colors">
              <CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{sport?.naziv || "Općenito"}</Badge>
                    <span className="text-sm text-muted-foreground">{formatDate(natjecanje.datum)}</span>
                  </div>
                  <h3 className="font-medium">{natjecanje.naziv}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPinIcon className="mr-1 h-3 w-3" />
                    {natjecanje.lokacija}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-sm">
                    <CalendarIcon className="mr-1 h-4 w-4" />
                    <span>
                      {new Date(natjecanje.datum).toLocaleDateString("hr-HR", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}

      {nadolazecaNatjecanja.length === 0 && (
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-muted-foreground">Nema nadolazećih događaja</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
