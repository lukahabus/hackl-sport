"use client"
import { notFound } from "next/navigation"
import Link from "next/link"
import { competitions } from "@/data/competitions"
import { sports } from "@/data/sports"
import { participants } from "@/data/participants"
import { results } from "@/data/results"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, MapPinIcon, TrophyIcon, UsersIcon, ArrowLeftIcon } from "lucide-react"

export default function CompetitionDetailsPage({ params }: { params: { id: string } }) {
  const competition = competitions.find((c) => c.id === params.id)

  if (!competition) {
    notFound()
  }

  const sport = sports.find((s) => s.id === competition.sportId)
  const competitionResults = results.filter((r) => r.competitionId === competition.id)
  const competitionParticipants = participants.filter((p) => competitionResults.some((r) => r.participantId === p.id))

  // Sort participants by their rank in the results
  const rankedParticipants = [...competitionParticipants].sort((a, b) => {
    const resultA = competitionResults.find((r) => r.participantId === a.id)
    const resultB = competitionResults.find((r) => r.participantId === b.id)
    return (resultA?.rank || 999) - (resultB?.rank || 999)
  })

  const isUpcoming = new Date(competition.date) > new Date()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/competitions">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Competitions
          </Link>
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {sport && <Badge variant="outline">{sport.name}</Badge>}
              <Badge variant={isUpcoming ? "default" : "secondary"}>{isUpcoming ? "Upcoming" : "Completed"}</Badge>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">{competition.name}</h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Competition Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4" /> Date
                    </h3>
                    <p>
                      {new Date(competition.date).toLocaleDateString(undefined, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium flex items-center">
                      <MapPinIcon className="mr-2 h-4 w-4" /> Location
                    </h3>
                    <p>{competition.location}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium flex items-center">
                      <UsersIcon className="mr-2 h-4 w-4" /> Participants
                    </h3>
                    <p>{competitionParticipants.length} participants</p>
                  </div>
                  <div>
                    <h3 className="font-medium flex items-center">
                      <TrophyIcon className="mr-2 h-4 w-4" /> Status
                    </h3>
                    <p>{isUpcoming ? "Upcoming" : "Completed"}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-2">Description</h3>
                <p>{competition.description}</p>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue={isUpcoming ? "participants" : "results"}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="participants">Participants</TabsTrigger>
              <TabsTrigger value="results" disabled={isUpcoming}>
                Results
              </TabsTrigger>
            </TabsList>
            <TabsContent value="participants" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Participants</CardTitle>
                  <CardDescription>Athletes and teams participating in this competition</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Category</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {competitionParticipants.map((participant) => (
                        <TableRow key={participant.id}>
                          <TableCell className="font-medium">{participant.name}</TableCell>
                          <TableCell>{participant.country}</TableCell>
                          <TableCell>{participant.category}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="results" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Results</CardTitle>
                  <CardDescription>Final rankings and scores</CardDescription>
                </CardHeader>
                <CardContent>
                  {!isUpcoming ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Rank</TableHead>
                          <TableHead>Participant</TableHead>
                          <TableHead>Score/Time</TableHead>
                          <TableHead>Points</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rankedParticipants.map((participant) => {
                          const result = competitionResults.find((r) => r.participantId === participant.id)
                          return (
                            <TableRow key={participant.id}>
                              <TableCell>{result?.rank || "-"}</TableCell>
                              <TableCell className="font-medium">{participant.name}</TableCell>
                              <TableCell>{result?.score || "-"}</TableCell>
                              <TableCell>{result?.points || "-"}</TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-muted-foreground">Results will be available after the competition</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {competition.schedule?.map((item, index) => (
                  <div key={index} className="border-l-2 border-primary pl-4 pb-4">
                    <p className="text-sm text-muted-foreground">{item.time}</p>
                    <p className="font-medium">{item.event}</p>
                    {item.description && <p className="text-sm">{item.description}</p>}
                  </div>
                ))}
                {(!competition.schedule || competition.schedule.length === 0) && (
                  <p className="text-muted-foreground">No schedule available</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Competitions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {competitions
                  .filter((c) => c.id !== competition.id && c.sportId === competition.sportId)
                  .slice(0, 3)
                  .map((relatedComp) => (
                    <div key={relatedComp.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                      <Link href={`/competitions/${relatedComp.id}`} className="font-medium hover:underline">
                        {relatedComp.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">{new Date(relatedComp.date).toLocaleDateString()}</p>
                    </div>
                  ))}
                {competitions.filter((c) => c.id !== competition.id && c.sportId === competition.sportId).length ===
                  0 && <p className="text-muted-foreground">No related competitions</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
