"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { BellOff, Trash2 } from "lucide-react"
import { getUserSubscriptions, unsubscribeFromCompetition } from "@/app/actions/subscription"
import { natjecanja } from "@/data/natjecanja"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export function SubscriptionManagement() {
  const [subscriptions, setSubscriptions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sms: false,
  })
  const { toast } = useToast()

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const userSubscriptions = await getUserSubscriptions()
        setSubscriptions(userSubscriptions)
      } catch (error) {
        console.error("Error fetching subscriptions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubscriptions()
  }, [])

  const handleUnsubscribe = async (competitionId: string) => {
    try {
      await unsubscribeFromCompetition(competitionId)
      setSubscriptions((prev) => prev.filter((id) => id !== competitionId))
      toast({
        title: "Pretplata otkazana",
        description: "Više nećete primati obavijesti za ovo natjecanje.",
      })
    } catch (error) {
      toast({
        title: "Greška",
        description: "Došlo je do greške. Molimo pokušajte ponovno.",
        variant: "destructive",
      })
    }
  }

  const handleNotificationToggle = (type: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  // Get competition details for subscribed competitions
  const subscribedCompetitions = subscriptions
    .map((id) => natjecanja.find((n) => n.id === id))
    .filter(Boolean)
    .sort((a, b) => new Date(a!.datum).getTime() - new Date(b!.datum).getTime())

  const upcomingSubscriptions = subscribedCompetitions.filter((comp) => new Date(comp!.datum) > new Date())
  const pastSubscriptions = subscribedCompetitions.filter((comp) => new Date(comp!.datum) <= new Date())

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upravljanje pretplatama</CardTitle>
        <CardDescription>Pregledajte i upravljajte svojim pretplatama na natjecanja</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pretplate" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pretplate">Moje pretplate</TabsTrigger>
            <TabsTrigger value="postavke">Postavke obavijesti</TabsTrigger>
          </TabsList>

          <TabsContent value="pretplate" className="mt-4">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            ) : subscriptions.length === 0 ? (
              <div className="text-center py-8">
                <BellOff className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Nema aktivnih pretplata</h3>
                <p className="text-muted-foreground mb-4">
                  Trenutno niste pretplaćeni ni na jedno natjecanje. Pretplatite se na natjecanja kako biste primali
                  obavijesti o njima.
                </p>
                <Button asChild>
                  <Link href="/natjecanja">Pregledaj natjecanja</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {upcomingSubscriptions.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-3">Nadolazeća natjecanja</h3>
                    <div className="space-y-3">
                      {upcomingSubscriptions.map((competition) => (
                        <div
                          key={competition!.id}
                          className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0"
                        >
                          <div>
                            <Link
                              href={`/natjecanja/${competition!.id}`}
                              className="font-medium hover:underline text-zagi-blue"
                            >
                              {competition!.naziv}
                            </Link>
                            <div className="text-sm text-muted-foreground">
                              {new Date(competition!.datum).toLocaleDateString("hr-HR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUnsubscribe(competition!.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Otkaži
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {pastSubscriptions.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-3">Završena natjecanja</h3>
                    <div className="space-y-3">
                      {pastSubscriptions.map((competition) => (
                        <div
                          key={competition!.id}
                          className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0"
                        >
                          <div>
                            <Link href={`/natjecanja/${competition!.id}`} className="font-medium hover:underline">
                              {competition!.naziv}
                            </Link>
                            <div className="text-sm text-muted-foreground">
                              {new Date(competition!.datum).toLocaleDateString("hr-HR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUnsubscribe(competition!.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Otkaži
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="postavke" className="mt-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Kanali obavijesti</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Odaberite kako želite primati obavijesti o natjecanjima na koja ste pretplaćeni.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications" className="font-medium">
                        Email obavijesti
                      </Label>
                      <p className="text-sm text-muted-foreground">Primajte obavijesti putem email poruka</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notificationSettings.email}
                      onCheckedChange={() => handleNotificationToggle("email")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications" className="font-medium">
                        Push obavijesti
                      </Label>
                      <p className="text-sm text-muted-foreground">Primajte obavijesti u pregledniku</p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={notificationSettings.push}
                      onCheckedChange={() => handleNotificationToggle("push")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-notifications" className="font-medium">
                        SMS obavijesti
                      </Label>
                      <p className="text-sm text-muted-foreground">Primajte obavijesti putem SMS poruka</p>
                    </div>
                    <Switch
                      id="sms-notifications"
                      checked={notificationSettings.sms}
                      onCheckedChange={() => handleNotificationToggle("sms")}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Vrste obavijesti</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Odaberite koje vrste obavijesti želite primati za pretplaćena natjecanja.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="notification-start" defaultChecked />
                    <Label htmlFor="notification-start">Početak natjecanja</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notification-results" defaultChecked />
                    <Label htmlFor="notification-results">Rezultati natjecanja</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notification-changes" defaultChecked />
                    <Label htmlFor="notification-changes">Promjene u rasporedu</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notification-reminders" defaultChecked />
                    <Label htmlFor="notification-reminders">Podsjetnici (24h prije)</Label>
                  </div>
                </div>
              </div>

              <Button className="w-full">Spremi postavke</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
