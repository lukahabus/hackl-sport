"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { competitions } from "@/data/competitions"
import { sports } from "@/data/sports"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, MapPinIcon, TrophyIcon } from "lucide-react"

export default function CompetitionsPage() {
  const searchParams = useSearchParams()
  const initialSport = searchParams.get("sport") || "all"

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSport, setSelectedSport] = useState(initialSport)
  const [status, setStatus] = useState("all")

  const filteredCompetitions = competitions.filter((competition) => {
    // Filter by search query
    const matchesSearch =
      competition.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      competition.location.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by sport
    const matchesSport = selectedSport === "all" || competition.sportId === selectedSport

    // Filter by status
    const isUpcoming = new Date(competition.date) > new Date()
    const matchesStatus =
      status === "all" || (status === "upcoming" && isUpcoming) || (status === "past" && !isUpcoming)

    return matchesSearch && matchesSport && matchesStatus
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Competitions</h1>
          <p className="text-muted-foreground mt-2">Browse and discover sports competitions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Search</h3>
            <Input
              placeholder="Search competitions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Filter by Sport</h3>
            <Select value={selectedSport} onValueChange={setSelectedSport}>
              <SelectTrigger>
                <SelectValue placeholder="Select a sport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sports</SelectItem>
                {sports.map((sport) => (
                  <SelectItem key={sport.id} value={sport.id}>
                    {sport.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Status</h3>
            <Tabs defaultValue={status} onValueChange={setStatus} className="w-full">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCompetitions.length > 0 ? (
              filteredCompetitions.map((competition) => {
                const sport = sports.find((s) => s.id === competition.sportId)
                const isUpcoming = new Date(competition.date) > new Date()

                return (
                  <Card key={competition.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge variant={isUpcoming ? "default" : "secondary"}>
                          {isUpcoming ? "Upcoming" : "Completed"}
                        </Badge>
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
                        <Link href={`/competitions/${competition.id}`}>
                          {isUpcoming ? "View Details" : "View Results"}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <TrophyIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium">No competitions found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your filters or search query</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
