"use client"

import Link from "next/link"
import { competitions } from "@/data/competitions"
import { sports } from "@/data/sports"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPinIcon } from "lucide-react"

export function UpcomingEvents() {
  // Get upcoming competitions sorted by date
  const upcomingCompetitions = [...competitions]
    .filter((comp) => new Date(comp.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-4">
      {upcomingCompetitions.map((competition) => {
        const sport = sports.find((s) => s.id === competition.sportId)

        return (
          <Link key={competition.id} href={`/competitions/${competition.id}`}>
            <Card className="hover:bg-muted/50 transition-colors">
              <CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{sport?.name || "General"}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(competition.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-medium">{competition.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPinIcon className="mr-1 h-3 w-3" />
                    {competition.location}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-sm">
                    <CalendarIcon className="mr-1 h-4 w-4" />
                    <span>
                      {new Date(competition.date).toLocaleDateString(undefined, {
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

      {upcomingCompetitions.length === 0 && (
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-muted-foreground">No upcoming events</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
