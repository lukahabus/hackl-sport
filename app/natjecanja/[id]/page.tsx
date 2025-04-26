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
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sudionici">Sudionici</TabsTrigger>
              <TabsTrigger value="rezultati" disabled={isUpcoming}>
                Rezultati
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
        </div>
      </div>
    </div>
  )
}
