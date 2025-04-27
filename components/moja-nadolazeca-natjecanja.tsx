"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, MapPinIcon } from "lucide-react"

// Mock data for user's upcoming competitions
const userUpcomingCompetitions = [
  {
    id: "kup-zagreba-2025",
    naziv: "Kup grada Zagreba 2025",
    sportId: "sah",
    datum: "2025-04-22T09:00:00Z",
    lokacija: "Zagrebački šahovski savez, Zagreb",
    status: "registered", // registered, confirmed
  },
  {
    id: "atletsko-prvenstvo-2024",
    naziv: "Proljetno atletsko prvenstvo",
    sportId: "atletika",
    datum: "2024-04-20T10:00:00Z",
    lokacija: "Atletski stadion, Zagreb",
    status: "confirmed",
  },
  {
    id: "tour-de-planina-2024",
    naziv: "Tour de Planina 2024",
    sportId: "biciklizam",
    datum: "2024-06-10T08:00:00Z",
    lokacija: "Planinski putevi, Medvednica",
    status: "registered",
  },
]

export function MojaNadolazecaNatjecanja() {
  // Format date to Croatian format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("hr-HR", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Moja nadolazeća natjecanja</CardTitle>
        <CardDescription>Natjecanja na koja ste prijavljeni</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {userUpcomingCompetitions.map((competition) => {
            // Determine badge style based on status
            let badgeVariant = "outline"
            let badgeText = "Registrirano"
            let badgeClass = "bg-zagi-light-blue text-black"

            if (competition.status === "confirmed") {
              badgeVariant = "default"
              badgeText = "Potvrđeno"
              badgeClass = "bg-zagi-green text-white"
            }

            return (
              <Link key={competition.id} href={`/natjecanja/${competition.id}`}>
                <Card className="hover:bg-muted/50 transition-colors">
                  <CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={badgeVariant} className={badgeClass}>
                          {badgeText}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{formatDate(competition.datum)}</span>
                      </div>
                      <h3 className="font-medium">{competition.naziv}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPinIcon className="mr-1 h-3 w-3" />
                        {competition.lokacija}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-sm">
                        <CalendarIcon className="mr-1 h-4 w-4" />
                        <span>
                          {new Date(competition.datum).toLocaleDateString("hr-HR", {
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

          <div className="flex justify-center mt-6">
            <Button variant="outline" asChild>
              <Link href="/profil?tab=natjecanja">Pregledaj sva moja natjecanja</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
