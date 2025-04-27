import Link from "next/link"
import { Button } from "@/components/ui/button"
import { IstaknutoNatjecanje } from "@/components/istaknuto-natjecanje"
import { NadolazecaNatjecanja } from "@/components/nadolazeca-natjecanja"
import { HeroSection } from "@/components/hero-section"
import { MojaNadolazecaNatjecanja } from "@/components/moja-nadolazeca-natjecanja"

// Import the HomeMapPreview component
import { HomeMapPreview } from "@/components/home-map-preview"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />

      <section className="my-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Natjecanja</h2>
            <p className="text-muted-foreground mt-2">Završena i nadolazeća sportska natjecanja</p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link href="/natjecanja">Pregledaj sve</Link>
          </Button>
        </div>
        <IstaknutoNatjecanje />
      </section>

      <section className="my-12">
        <MojaNadolazecaNatjecanja />
      </section>

      <section className="my-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Uskoro počinju</h2>
            <p className="text-muted-foreground mt-2">Sportska natjecanja koja uskoro počinju</p>
          </div>
        </div>
        <NadolazecaNatjecanja />
      </section>

      {/* Add the map preview section after the NadolazecaNatjecanja section */}
      <section className="my-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Lokacije natjecanja</h2>
            <p className="text-muted-foreground mt-2">Pregledajte sve lokacije sportskih natjecanja u Zagrebu</p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link href="/lokacije">Pregledaj sve lokacije</Link>
          </Button>
        </div>
        <HomeMapPreview />
      </section>
    </div>
  )
}
