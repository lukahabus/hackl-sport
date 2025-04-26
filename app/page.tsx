import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FeaturedCompetitions } from "@/components/featured-competitions"
import { UpcomingEvents } from "@/components/upcoming-events"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />

      <section className="my-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Competitions</h2>
            <p className="text-muted-foreground mt-2">Discover the most exciting sports events</p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link href="/competitions">View All Competitions</Link>
          </Button>
        </div>
        <FeaturedCompetitions />
      </section>

      <section className="my-12">
        <h2 className="text-3xl font-bold tracking-tight mb-8">About HACKL</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Innovation</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                HACKL brings cutting-edge technology to sports competitions, enhancing the experience for athletes,
                organizers, and spectators alike.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Accessibility</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We believe sports should be accessible to everyone. Our platform makes it easy to discover and follow
                competitions across all disciplines.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                HACKL connects sports enthusiasts, athletes, and federations, creating a vibrant community centered
                around the love of sports.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="my-12">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Upcoming Events</h2>
        <UpcomingEvents />
      </section>
    </div>
  )
}
