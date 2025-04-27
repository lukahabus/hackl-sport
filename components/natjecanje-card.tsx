"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { sportovi } from "@/data/sportovi"
import { CalendarIcon, MapPinIcon } from "lucide-react"
import { SubscriptionButton } from "@/components/subscription-button"
import { isSubscribedToCompetition } from "@/app/actions/subscription"
import { useEffect, useState } from "react"

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
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkSubscription = async () => {
      const subscribed = await isSubscribedToCompetition(natjecanje.id)
      setIsSubscribed(subscribed)
      setIsLoading(false)
    }

    checkSubscription()
  }, [natjecanje.id])

  let statusVariant = "default"
  let statusText = "Aktivno"
  let statusClass = "bg-zagi-green text-white"

  if (!isUpcoming) {
    statusVariant = "destructive"
    statusText = "Završeno"
    statusClass = "bg-zagi-red text-white"
  } else if (!isActive) {
    statusVariant = "warning"
    statusText = "Nadolazeće"
    statusClass = "bg-zagi-yellow text-black"
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
            className={statusClass}
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
      <CardFooter className="flex gap-2">
        <Button asChild className="flex-1 bg-[#0057B8] hover:bg-[#004494] text-white">
          <Link href={`/natjecanja/${natjecanje.id}`}>Detalji</Link>
        </Button>
        {!isLoading && isUpcoming && (
          <SubscriptionButton
            competitionId={natjecanje.id}
            initialSubscribed={isSubscribed}
            variant="outline"
            size="icon"
          />
        )}
      </CardFooter>
    </Card>
  )
}
