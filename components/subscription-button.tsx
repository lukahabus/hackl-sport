"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bell, BellOff, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { subscribeToCompetition, unsubscribeFromCompetition } from "@/app/actions/subscription"

interface SubscriptionButtonProps {
  competitionId: string
  initialSubscribed: boolean
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}

export function SubscriptionButton({
  competitionId,
  initialSubscribed,
  variant = "outline",
  size = "default",
}: SubscriptionButtonProps) {
  const [isSubscribed, setIsSubscribed] = useState(initialSubscribed)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubscriptionToggle = async () => {
    setIsLoading(true)
    try {
      if (isSubscribed) {
        await unsubscribeFromCompetition(competitionId)
        toast({
          title: "Pretplata otkazana",
          description: "Više nećete primati obavijesti za ovo natjecanje.",
        })
        setIsSubscribed(false)
      } else {
        await subscribeToCompetition(competitionId)
        toast({
          title: "Pretplaćeni ste",
          description: "Primat ćete obavijesti o ovom natjecanju.",
        })
        setIsSubscribed(true)
      }
    } catch (error) {
      toast({
        title: "Greška",
        description: "Došlo je do greške. Molimo pokušajte ponovno.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleSubscriptionToggle}
      disabled={isLoading}
      className={isSubscribed ? "bg-zagi-light-blue text-white hover:bg-zagi-blue" : ""}
      title={isSubscribed ? "Otkaži pretplatu" : "Pretplati se"}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isSubscribed ? (
        <BellOff className="h-4 w-4" />
      ) : (
        <Bell className="h-4 w-4" />
      )}
    </Button>
  )
}
