"use client"

import Link from "next/link"
import { competitions } from "@/data/competitions"
import { sports } from "@/data/sports"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, MapPinIcon } from "lucide-react"

export function FeaturedCompetitions() {
  // Get the 3 most recent competitions
  const featuredCompetitions = [...competitions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {featuredCompetitions.map((competition) => {
        const sport = sports.find((s) => s.id === competition.sportId)
        const isUpcoming = new Date(competition.date) > new Date()

        return (
          <Card key={competition.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Badge variant={isUpcoming ? "default" : "secondary"}>{isUpcoming ? "Upcoming" : "Completed"}</Badge>
                {sport && <Badge variant="outline">{sport.name}</Badge>}
              </div>
              <CardTitle className="line-clamp-2 mt-2">{competition.name}</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex flex-col space-y-2 text-sm">
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                  <span>{new Date(competition.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="mr-2 h-4 w-4 opacity-70" />
                  <span>{competition.location}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/competitions/${competition.id}`}>{isUpcoming ? "View Details" : "View Results"}</Link>
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
