"use client"
import { natjecanja } from "@/data/natjecanja"
import { NatjecanjeCard } from "@/components/natjecanje-card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useState } from "react"
import { PhotoGallery } from "@/components/photo-gallery"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Mock photo data for finished competitions
const competitionPhotos = {
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
  ],
}

export function IstaknutoNatjecanje() {
  const [activeTab, setActiveTab] = useState("zavrsena")

  // Get upcoming competitions
  const nadolazeca = [...natjecanja]
    .filter((comp) => new Date(comp.datum) > new Date())
    .sort((a, b) => new Date(a.datum).getTime() - new Date(b.datum).getTime())
    .slice(0, 6)

  // Get finished competitions
  const zavrsena = [...natjecanja]
    .filter((comp) => new Date(comp.datum) <= new Date())
    .sort((a, b) => new Date(b.datum).getTime() - new Date(a.datum).getTime())
    .slice(0, 6)

  // Get featured competition with photos
  const featuredCompetition = zavrsena.find((comp) => competitionPhotos[comp.id])
  const featuredPhotos = featuredCompetition ? competitionPhotos[featuredCompetition.id] : []

  return (
    <div className="space-y-8">
      <Tabs defaultValue="zavrsena" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="zavrsena">Završena</TabsTrigger>
          <TabsTrigger value="nadolazeca">Nadolazeća</TabsTrigger>
        </TabsList>

        <TabsContent value="zavrsena" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {zavrsena.map((natjecanje) => (
              <NatjecanjeCard key={natjecanje.id} natjecanje={natjecanje} />
            ))}
          </div>

          {featuredCompetition && featuredPhotos.length > 0 && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">Galerija: {featuredCompetition.naziv}</h3>
                <Button variant="outline" asChild>
                  <Link href={`/natjecanja/${featuredCompetition.id}`}>Pogledaj natjecanje</Link>
                </Button>
              </div>
              <PhotoGallery
                photos={featuredPhotos}
                linkUrl={`/natjecanja/${featuredCompetition.id}`}
                linkText="Pogledaj sve fotografije"
              />
            </div>
          )}
        </TabsContent>

        <TabsContent value="nadolazeca" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nadolazeca.map((natjecanje) => (
              <NatjecanjeCard key={natjecanje.id} natjecanje={natjecanje} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
