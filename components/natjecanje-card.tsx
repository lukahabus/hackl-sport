import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { sportovi } from "@/data/sportovi"
import { CalendarIcon, MapPinIcon } from "lucide-react"

interface NatjecanjeCardProps {
  natjecanje: {
    id: string
    naziv: string
    sportId: string
    datum: string
    lokacija: string
  }
}

export function NatjecanjeCard({ natjecanje }: NatjecanjeCardProps) {
  const sport = sportovi.find((s) => s.id === natjecanje.sportId)
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
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge
            variant={statusVariant === "default" ? "default" : statusVariant === "warning" ? "outline" : "destructive"}
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
          {sport && <Badge variant="outline">{sport.naziv}</Badge>}
        </div>
        <h3 className="font-bold mt-2 text-lg">{natjecanje.naziv}</h3>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
            <span>{formatDate(natjecanje.datum)}</span>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="mr-2 h-4 w-4 opacity-70" />
            <span>{natjecanje.lokacija}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-primary text-white">
          <Link href={`/natjecanja/${natjecanje.id}`}>Detalji</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
