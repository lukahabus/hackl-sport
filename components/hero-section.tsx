import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="py-12 md:py-24 lg:py-32 xl:py-36">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Discover Sports Competitions with HACKL
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Your platform for browsing, tracking, and managing sports competitions across all disciplines.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/competitions">Browse Competitions</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/admin">Admin Dashboard</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[300px] w-full overflow-hidden rounded-xl bg-muted md:h-[400px] lg:h-[500px]">
              {/* This would typically be an image */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-muted-foreground/20 flex items-center justify-center">
                <span className="text-4xl font-bold text-primary/40">HACKL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
