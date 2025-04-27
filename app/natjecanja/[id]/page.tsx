"use client"
import { notFound } from "next/navigation"
import Link from "next/link"
import { natjecanja } from "@/data/natjecanja"
import { sportovi } from "@/data/sportovi"
import { sudionici } from "@/data/sudionici"
import { rezultati } from "@/data/rezultati"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, MapPinIcon, TrophyIcon, UsersIcon, ArrowLeftIcon } from "lucide-react"
import { PhotoGallery } from "@/components/photo-gallery"

// Mock photo data for finished competitions
const mockPhotos = {
  "regionalno-plivanje-2024": [
    {
      id: "p1",
      url: "https://source.unsplash.com/random/800x600?swimming",
      alt: "Plivačko natjecanje 1",
      thumbnail: "https://source.unsplash.com/random/400x300?swimming",
    },
    {
      id: "p2",
      url: "https://source.unsplash.com/random/800x600?swimming-pool",
      alt: "Plivačko natjecanje 2",
      thumbnail: "https://source.unsplash.com/random/400x300?swimming-pool",
    },
    {
      id: "p3",
      url: "https://source.unsplash.com/random/800x600?swimming-competition",
      alt: "Plivačko natjecanje 3",
      thumbnail: "https://source.unsplash.com/random/400x300?swimming-competition",
    },
    {
      id: "p4",
      url: "https://source.unsplash.com/random/800x600?swimmer",
      alt: "Plivačko natjecanje 4",
      thumbnail: "https://source.unsplash.com/random/400x300?swimmer",
    },
    {
      id: "p5",
      url: "https://source.unsplash.com/random/800x600?swimming-race",
      alt: "Plivačko natjecanje 5",
      thumbnail: "https://source.unsplash.com/random/400x300?swimming-race",
    },
    {
      id: "p6",
      url: "https://source.unsplash.com/random/800x600?pool",
      alt: "Plivačko natjecanje 6",
      thumbnail: "https://source.unsplash.com/random/400x300?pool",
    },
  ],
  "maraton-grad-2024": [
    {
      id: "m1",
      url: "https://source.unsplash.com/random/800x600?marathon",
      alt: "Maraton 1",
      thumbnail: "https://source.unsplash.com/random/400x300?marathon",
    },
    {
      id: "m2",
      url: "https://source.unsplash.com/random/800x600?running",
      alt: "Maraton 2",
      thumbnail: "https://source.unsplash.com/random/400x300?running",
    },
    {
      id: "m3",
      url: "https://source.unsplash.com/random/800x600?marathon-finish",
      alt: "Maraton 3",
      thumbnail: "https://source.unsplash.com/random/400x300?marathon-finish",
    },
    {
      id: "m4",
      url: "https://source.unsplash.com/random/800x600?runners",
      alt: "Maraton 4",
      thumbnail: "https://source.unsplash.com/random/400x300?runners",
    },
    {
      id: "m5",
      url: "https://source.unsplash.com/random/800x600?marathon-start",
      alt: "Maraton 5",
      thumbnail: "https://source.unsplash.com/random/400x300?marathon-start",
    },
    {
      id: "m6",
      url: "https://source.unsplash.com/random/800x600?marathon-crowd",
      alt: "Maraton 6",
      thumbnail: "https://source.unsplash.com/random/400x300?marathon-crowd",
    },
  ],
  "grand-slam-open-2023": [
    {
      id: "t1",
      url: "https://source.unsplash.com/random/800x600?tennis",
      alt: "Tenis 1",
      thumbnail: "https://source.unsplash.com/random/400x300?tennis",
    },
    {
      id: "t2",
      url: "https://source.unsplash.com/random/800x600?tennis-court",
      alt: "Tenis 2",
      thumbnail: "https://source.unsplash.com/random/400x300?tennis-court",
    },
    {
      id: "t3",
      url: "https://source.unsplash.com/random/800x600?tennis-match",
      alt: "Tenis 3",
      thumbnail: "https://source.unsplash.com/random/400x300?tennis-match",
    },
    {
      id: "t4",
      url: "https://source.unsplash.com/random/800x600?tennis-player",
      alt: "Tenis 4",
      thumbnail: "https://source.unsplash.com/random/400x300?tennis-player",
    },
    {
      id: "t5",
      url: "https://source.unsplash.com/random/800x600?tennis-tournament",
      alt: "Tenis 5",
      thumbnail: "https://source.unsplash.com/random/400x300?tennis-tournament",
    },
    {
      id: "t6",
      url: "https://source.unsplash.com/random/800x600?tennis-racket",
      alt: "Tenis 6",
      thumbnail: "https://source.unsplash.com/random/400x300?tennis-racket",
    },
  ],
  "kosarkaska-liga-finale-2024": [
    {
      id: "b1",
      url: "https://source.unsplash.com/random/800x600?basketball",
      alt: "Košarka 1",
      thumbnail: "https://source.unsplash.com/random/400x300?basketball",
    },
    {
      id: "b2",
      url: "https://source.unsplash.com/random/800x600?basketball-court",
      alt: "Košarka 2",
      thumbnail: "https://source.unsplash.com/random/400x300?basketball-court",
    },
    {
      id: "b3",
      url: "https://source.unsplash.com/random/800x600?basketball-game",
      alt: "Košarka 3",
      thumbnail: "https://source.unsplash.com/random/400x300?basketball-game",
    },
    {
      id: "b4",
      url: "https://source.unsplash.com/random/800x600?basketball-player",
      alt: "Košarka 4",
      thumbnail: "https://source.unsplash.com/random/400x300?basketball-player",
    },
  ],
}

export default function NatjecanjeDetailsPage({ params }: { params: { id: string } }) {
  const natjecanje = natjecanja.find((c) => c.id === params.id)

  if (!natjecanje) {
    notFound()
  }

  const sport = sportovi.find((s) => s.id === natjecanje.sportId)
  const natjecanjeRezultati = rezultati.filter((r) => r.natjecanjeId === natjecanje.id)
  const natjecanjeSudionici = sudionici.filter((p) => natjecanjeRezultati.some((r) => r.sudionikId === p.id))

  // Sort participants by their rank in the results
  const rankedSudionici = [...natjecanjeSudionici].sort((a, b) => {
    const resultA = natjecanjeRezultati.find((r) => r.sudionikId === a.id)
    const resultB = natjecanjeRezultati.find((r) => r.sudionikId === b.id)
    return (resultA?.poredak || 999) - (resultB?.poredak || 999)
  })

  const isUpcoming = new Date(natjecanje.datum) > new Date()
  const isActive = isUpcoming && new Date(natjecanje.datum) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  let statusVariant = "default"
  let statusText = "Aktivno"

  if (!isUpcoming) {
    statusVariant = "destructive"
    statusText = "Završeno"
  } else if (!isActive) {
    statusVariant = "warning"
    statusText = "Nadolazeće"
  }

  // Get photos for this competition
  const competitionPhotos = mockPhotos[natjecanje.id] || []

  // Format date to Croatian format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("hr-HR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  // Determine which mascot image to show based on sport type
  const getMascotImage = () => {
    if (natjecanje.sportId === "plivanje") {
      return "/images/zagi-mascot-waterpolo.png"
    } else if (natjecanje.sportId === "tenis") {
      return "/images/zagi-mascot-tennis.png"
    } else {
      return "/images/zagi-mascot-running.png"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/natjecanja">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Natrag na natjecanja
          </Link>
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {sport && <Badge variant="outline">{sport.naziv}</Badge>}
              <Badge
                variant={
                  statusVariant === "default" ? "default" : statusVariant === "warning" ? "outline" : "destructive"
                }
                className={
                  statusVariant === "default"
                    ? "bg-zagi-green text-white"
                    : statusVariant === "warning"
                      ? "bg-zagi-yellow text-black"
                      : "bg-zagi-red text-white"
                }
              >
                {statusText}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">{natjecanje.naziv}</h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detalji natjecanja</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4" /> Datum
                    </h3>
                    <p>{formatDate(natjecanje.datum)}</p>
                  </div>
                  <div>
                    <h3 className="font-medium flex items-center">
                      <MapPinIcon className="mr-2 h-4 w-4" /> Lokacija
                    </h3>
                    <p>{natjecanje.lokacija}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium flex items-center">
                      <UsersIcon className="mr-2 h-4 w-4" /> Sudionici
                    </h3>
                    <p>{natjecanjeSudionici.length} sudionika</p>
                  </div>
                  <div>
                    <h3 className="font-medium flex items-center">
                      <TrophyIcon className="mr-2 h-4 w-4" /> Status
                    </h3>
                    <p>{statusText}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-2">Opis</h3>
                <p>{natjecanje.opis}</p>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue={isUpcoming ? "sudionici" : "rezultati"}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="sudionici">Sudionici</TabsTrigger>
              <TabsTrigger value="rezultati" disabled={isUpcoming}>
                Rezultati
              </TabsTrigger>
              <TabsTrigger value="galerija" disabled={isUpcoming || competitionPhotos.length === 0}>
                Galerija
              </TabsTrigger>
            </TabsList>
            <TabsContent value="sudionici" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sudionici</CardTitle>
                  <CardDescription>Sportaši i timovi koji sudjeluju u natjecanju</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ime</TableHead>
                        <TableHead>Država</TableHead>
                        <TableHead>Kategorija</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {natjecanjeSudionici.map((sudionik) => (
                        <TableRow key={sudionik.id}>
                          <TableCell className="font-medium">{sudionik.ime}</TableCell>
                          <TableCell>{sudionik.drzava}</TableCell>
                          <TableCell>{sudionik.kategorija}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="rezultati" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Rezultati</CardTitle>
                  <CardDescription>Konačni poredak i bodovi</CardDescription>
                </CardHeader>
                <CardContent>
                  {!isUpcoming ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Poredak</TableHead>
                          <TableHead>Sudionik</TableHead>
                          <TableHead>Rezultat/Vrijeme</TableHead>
                          <TableHead>Bodovi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rankedSudionici.map((sudionik) => {
                          const rezultat = natjecanjeRezultati.find((r) => r.sudionikId === sudionik.id)
                          return (
                            <TableRow key={sudionik.id}>
                              <TableCell>{rezultat?.poredak || "-"}</TableCell>
                              <TableCell className="font-medium">{sudionik.ime}</TableCell>
                              <TableCell>{rezultat?.rezultat || "-"}</TableCell>
                              <TableCell>{rezultat?.bodovi || "-"}</TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-muted-foreground">Rezultati će biti dostupni nakon natjecanja</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="galerija" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Galerija fotografija</CardTitle>
                  <CardDescription>Fotografije s natjecanja</CardDescription>
                </CardHeader>
                <CardContent>
                  {!isUpcoming && competitionPhotos.length > 0 ? (
                    <PhotoGallery photos={competitionPhotos} />
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-muted-foreground">Fotografije će biti dostupne nakon natjecanja</p>
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
              <CardTitle>Raspored</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {natjecanje.raspored?.map((item, index) => (
                  <div key={index} className="border-l-2 border-primary pl-4 pb-4">
                    <p className="text-sm text-muted-foreground">{item.vrijeme}</p>
                    <p className="font-medium">{item.dogadaj}</p>
                    {item.opis && <p className="text-sm">{item.opis}</p>}
                  </div>
                ))}
                {(!natjecanje.raspored || natjecanje.raspored.length === 0) && (
                  <p className="text-muted-foreground">Raspored nije dostupan</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Povezana natjecanja</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {natjecanja
                  .filter((c) => c.id !== natjecanje.id && c.sportId === natjecanje.sportId)
                  .slice(0, 3)
                  .map((relatedComp) => (
                    <div key={relatedComp.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                      <Link href={`/natjecanja/${relatedComp.id}`} className="font-medium hover:underline">
                        {relatedComp.naziv}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {new Date(relatedComp.datum).toLocaleDateString("hr-HR", {
                          day: "numeric",
                          month: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  ))}
                {natjecanja.filter((c) => c.id !== natjecanje.id && c.sportId === natjecanje.sportId).length === 0 && (
                  <p className="text-muted-foreground">Nema povezanih natjecanja</p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <img src={getMascotImage() || "/placeholder.svg"} alt="Zagi Mascot" className="h-48" />
          </div>
        </div>
      </div>
    </div>
  )
}
