import Link from "next/link"
import { Button } from "@/components/ui/button"
import { IstaknutoNatjecanje } from "@/components/istaknuto-natjecanje"
import { NadolazecaNatjecanja } from "@/components/nadolazeca-natjecanja"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />

      <section className="my-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Istaknuta natjecanja</h2>
            <p className="text-muted-foreground mt-2">Otkrijte najzanimljivije sportske događaje</p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link href="/natjecanja">Pregledaj sve</Link>
          </Button>
        </div>
        <IstaknutoNatjecanje />
      </section>

      <section className="my-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Nadolazeća natjecanja</h2>
            <p className="text-muted-foreground mt-2">Sportska natjecanja koja uskoro počinju</p>
          </div>
        </div>
        <NadolazecaNatjecanja />
      </section>
    </div>
  )
}
