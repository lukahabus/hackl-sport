import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VenueMap } from "@/components/venue-map"
import { MapPinIcon } from "lucide-react"

export default function LokacijePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Lokacije natjecanja</h1>
          <p className="text-muted-foreground mt-2">Interaktivna karta sportskih lokacija u Zagrebu</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>O karti</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Istražite sve lokacije sportskih natjecanja u Zagrebu. Kliknite na marker za više informacija o
                natjecanjima na toj lokaciji.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <MapPinIcon className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium text-sm">Interaktivna karta</h3>
                    <p className="text-xs text-muted-foreground">
                      Povećajte, smanjite i pomičite kartu za detaljniji pregled
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPinIcon className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium text-sm">Detalji natjecanja</h3>
                    <p className="text-xs text-muted-foreground">
                      Kliknite na marker za prikaz natjecanja na toj lokaciji
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPinIcon className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium text-sm">Brza navigacija</h3>
                    <p className="text-xs text-muted-foreground">
                      Kliknite na "Detalji natjecanja" za više informacija
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Legenda</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-zagi-yellow"></div>
                  <span className="text-sm">Nadolazeća natjecanja</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-zagi-red"></div>
                  <span className="text-sm">Završena natjecanja</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-zagi-green"></div>
                  <span className="text-sm">Aktivna natjecanja</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <VenueMap />
      </div>
    </div>
  )
}
