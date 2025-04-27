import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/chess-hero.png')" }} />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 py-16 md:py-24">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">Kup grada Zagreba 2025.</h1>
            <p className="text-lg mb-6 text-white">
              Pridruži se šahovskom natjecanju u Zagrebačkom šahovskom savezu od 22.4.2025. do 30.4.2025.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-primary text-white">
                <Link href="/natjecanja">Pregled natjecanja</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="bg-white bg-opacity-20 text-white hover:bg-white hover:bg-opacity-30"
              >
                <Link href="/admin">Admin dashboard</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img src="/images/zagi-mascot-tennis.png" alt="Zagi Mascot" className="h-48 md:h-64" />
          </div>
        </div>
      </div>
    </section>
  )
}
