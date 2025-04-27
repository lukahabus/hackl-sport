"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { PhotoGallery } from "@/components/photo-gallery"

// Mock gallery data with thumbnails
const mockGalleries = [
  {
    id: "1",
    title: "Kup grada Zagreba 2025",
    date: "2025-04-22",
    sportId: "sah",
    photos: [
      {
        id: "1",
        url: "https://source.unsplash.com/random/800x600?chess",
        alt: "Šahovsko natjecanje 1",
        thumbnail: "https://source.unsplash.com/random/400x300?chess",
      },
      {
        id: "2",
        url: "https://source.unsplash.com/random/800x600?chess-tournament",
        alt: "Šahovsko natjecanje 2",
        thumbnail: "https://source.unsplash.com/random/400x300?chess-tournament",
      },
      {
        id: "3",
        url: "https://source.unsplash.com/random/800x600?chess-competition",
        alt: "Šahovsko natjecanje 3",
        thumbnail: "https://source.unsplash.com/random/400x300?chess-competition",
      },
      {
        id: "4",
        url: "https://source.unsplash.com/random/800x600?chess-players",
        alt: "Šahovsko natjecanje 4",
        thumbnail: "https://source.unsplash.com/random/400x300?chess-players",
      },
    ],
  },
  {
    id: "2",
    title: "Regionalno plivačko natjecanje 2024",
    date: "2024-02-28",
    sportId: "plivanje",
    photos: [
      {
        id: "1",
        url: "https://source.unsplash.com/random/800x600?swimming",
        alt: "Plivačko natjecanje 1",
        thumbnail: "https://source.unsplash.com/random/400x300?swimming",
      },
      {
        id: "2",
        url: "https://source.unsplash.com/random/800x600?swimming-pool",
        alt: "Plivačko natjecanje 2",
        thumbnail: "https://source.unsplash.com/random/400x300?swimming-pool",
      },
      {
        id: "3",
        url: "https://source.unsplash.com/random/800x600?swimming-competition",
        alt: "Plivačko natjecanje 3",
        thumbnail: "https://source.unsplash.com/random/400x300?swimming-competition",
      },
      {
        id: "4",
        url: "https://source.unsplash.com/random/800x600?swimmer",
        alt: "Plivačko natjecanje 4",
        thumbnail: "https://source.unsplash.com/random/400x300?swimmer",
      },
      {
        id: "5",
        url: "https://source.unsplash.com/random/800x600?swimming-race",
        alt: "Plivačko natjecanje 5",
        thumbnail: "https://source.unsplash.com/random/400x300?swimming-race",
      },
    ],
  },
  {
    id: "3",
    title: "Gradski maraton 2024",
    date: "2024-03-10",
    sportId: "atletika",
    photos: [
      {
        id: "1",
        url: "https://source.unsplash.com/random/800x600?marathon",
        alt: "Maraton 1",
        thumbnail: "https://source.unsplash.com/random/400x300?marathon",
      },
      {
        id: "2",
        url: "https://source.unsplash.com/random/800x600?running",
        alt: "Maraton 2",
        thumbnail: "https://source.unsplash.com/random/400x300?running",
      },
      {
        id: "3",
        url: "https://source.unsplash.com/random/800x600?marathon-finish",
        alt: "Maraton 3",
        thumbnail: "https://source.unsplash.com/random/400x300?marathon-finish",
      },
      {
        id: "4",
        url: "https://source.unsplash.com/random/800x600?runners",
        alt: "Maraton 4",
        thumbnail: "https://source.unsplash.com/random/400x300?runners",
      },
      {
        id: "5",
        url: "https://source.unsplash.com/random/800x600?marathon-start",
        alt: "Maraton 5",
        thumbnail: "https://source.unsplash.com/random/400x300?marathon-start",
      },
      {
        id: "6",
        url: "https://source.unsplash.com/random/800x600?marathon-crowd",
        alt: "Maraton 6",
        thumbnail: "https://source.unsplash.com/random/400x300?marathon-crowd",
      },
    ],
  },
]

export default function GalerijaPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSport, setSelectedSport] = useState("all")

  const filteredGalleries = mockGalleries.filter((gallery) => {
    const matchesSearch = gallery.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSport = selectedSport === "all" || gallery.sportId === selectedSport
    return matchesSearch && matchesSport
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Galerija fotografija</h1>
          <p className="text-muted-foreground mt-2">Pregledajte fotografije s naših natjecanja</p>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <img src="/images/zagi-mascot-running.png" alt="Zagi Mascot" className="h-16" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Pretraži</h3>
            <Input
              placeholder="Pretraži galerije..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Filtriraj po sportu</h3>
            <Select value={selectedSport} onValueChange={setSelectedSport}>
              <SelectTrigger>
                <SelectValue placeholder="Odaberi sport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Svi sportovi</SelectItem>
                <SelectItem value="sah">Šah</SelectItem>
                <SelectItem value="plivanje">Plivanje</SelectItem>
                <SelectItem value="atletika">Atletika</SelectItem>
                <SelectItem value="biciklizam">Biciklizam</SelectItem>
                <SelectItem value="tenis">Tenis</SelectItem>
                <SelectItem value="kosarka">Košarka</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-8">
          {filteredGalleries.length > 0 ? (
            filteredGalleries.map((gallery) => (
              <div key={gallery.id} className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">{gallery.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {new Date(gallery.date).toLocaleDateString("hr-HR", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <PhotoGallery
                  photos={gallery.photos}
                  linkUrl={`/natjecanja/${gallery.id}`}
                  linkText="Pogledaj natjecanje"
                />

                <div className="flex justify-between items-center">
                  <Button variant="outline" asChild>
                    <Link href={`/natjecanja/${gallery.id}`}>Detalji natjecanja</Link>
                  </Button>
                  <p className="text-sm text-muted-foreground">{gallery.photos.length} fotografija</p>
                </div>

                <hr className="my-6" />
              </div>
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-lg font-medium mb-4">Nema pronađenih galerija</p>
                <p className="text-muted-foreground mb-6">Pokušajte prilagoditi pretragu ili filtere</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedSport("all")
                  }}
                >
                  Resetiraj filtere
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
