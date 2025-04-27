"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, Camera, LogOut, MapPinIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { SubscriptionManagement } from "@/components/subscription-management"

// Mock data for user's competitions
const userCompetitions = [
  {
    id: "kup-zagreba-2025",
    naziv: "Kup grada Zagreba 2025",
    sportId: "sah",
    datum: "2025-04-22T09:00:00Z",
    lokacija: "Zagrebački šahovski savez, Zagreb",
    status: "registered", // registered, confirmed, completed
  },
  {
    id: "atletsko-prvenstvo-2024",
    naziv: "Proljetno atletsko prvenstvo",
    sportId: "atletika",
    datum: "2024-04-20T10:00:00Z",
    lokacija: "Atletski stadion, Zagreb",
    status: "confirmed",
  },
  {
    id: "regionalno-plivanje-2024",
    naziv: "Regionalno plivačko natjecanje 2024",
    sportId: "plivanje",
    datum: "2024-02-28T10:00:00Z",
    lokacija: "Gradski bazen, Zagreb",
    status: "completed",
  },
]

export default function ProfilPage() {
  const [user, setUser] = useState({
    ime: "Ivan",
    prezime: "Horvat",
    email: "ivan.horvat@primjer.hr",
    telefon: "+385 91 234 5678",
    datumRodjenja: "1990-05-15",
    grad: "Zagreb",
    drzava: "Hrvatska",
    bio: "Strastveni šahist i sportski entuzijast.",
    omiljeniSport: "sah",
    primajObavijesti: true,
    primajNewsletter: false,
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(user)
  const [successMessage, setSuccessMessage] = useState("")
  const [activeTab, setActiveTab] = useState("osobni-podaci")

  const searchParams = useSearchParams()

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab && ["osobni-podaci", "postavke", "natjecanja", "pretplate"].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedUser({
      ...editedUser,
      [name]: value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setEditedUser({
      ...editedUser,
      [name]: value,
    })
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setEditedUser({
      ...editedUser,
      [name]: checked,
    })
  }

  const handleSave = () => {
    setUser(editedUser)
    setIsEditing(false)
    setSuccessMessage("Profil je uspješno ažuriran")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleCancel = () => {
    setEditedUser(user)
    setIsEditing(false)
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Moj profil</h1>

      {successMessage && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-600">{successMessage}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 flex flex-col items-center">
              <div className="relative mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.ime} ${user.prezime}`} />
                  <AvatarFallback>{`${user.ime[0]}${user.prezime[0]}`}</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-white"
                >
                  <Camera className="h-4 w-4" />
                  <span className="sr-only">Promijeni sliku</span>
                </Button>
              </div>
              <h2 className="text-xl font-bold">{`${user.ime} ${user.prezime}`}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <Button variant="outline" className="mt-4 w-full" size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                Odjava
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="osobni-podaci">Osobni podaci</TabsTrigger>
              <TabsTrigger value="postavke">Postavke računa</TabsTrigger>
              <TabsTrigger value="natjecanja">Moja natjecanja</TabsTrigger>
              <TabsTrigger value="pretplate">Moje pretplate</TabsTrigger>
            </TabsList>

            <TabsContent value="osobni-podaci" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Osobni podaci</CardTitle>
                      <CardDescription>Pregledajte i uredite svoje osobne podatke</CardDescription>
                    </div>
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)}>Uredi</Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={handleCancel}>
                          Odustani
                        </Button>
                        <Button onClick={handleSave}>Spremi</Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="ime">Ime</Label>
                        <Input
                          id="ime"
                          name="ime"
                          value={isEditing ? editedUser.ime : user.ime}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="prezime">Prezime</Label>
                        <Input
                          id="prezime"
                          name="prezime"
                          value={isEditing ? editedUser.prezime : user.prezime}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={isEditing ? editedUser.email : user.email}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="telefon">Telefon</Label>
                        <Input
                          id="telefon"
                          name="telefon"
                          value={isEditing ? editedUser.telefon : user.telefon}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="datumRodjenja">Datum rođenja</Label>
                        <Input
                          id="datumRodjenja"
                          name="datumRodjenja"
                          type="date"
                          value={isEditing ? editedUser.datumRodjenja : user.datumRodjenja}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="grad">Grad</Label>
                        <Input
                          id="grad"
                          name="grad"
                          value={isEditing ? editedUser.grad : user.grad}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="drzava">Država</Label>
                        <Input
                          id="drzava"
                          name="drzava"
                          value={isEditing ? editedUser.drzava : user.drzava}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="omiljeniSport">Omiljeni sport</Label>
                        {isEditing ? (
                          <Select
                            value={editedUser.omiljeniSport}
                            onValueChange={(value) => handleSelectChange("omiljeniSport", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sah">Šah</SelectItem>
                              <SelectItem value="plivanje">Plivanje</SelectItem>
                              <SelectItem value="atletika">Atletika</SelectItem>
                              <SelectItem value="biciklizam">Biciklizam</SelectItem>
                              <SelectItem value="tenis">Tenis</SelectItem>
                              <SelectItem value="kosarka">Košarka</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            id="omiljeniSport"
                            value={
                              user.omiljeniSport === "sah"
                                ? "Šah"
                                : user.omiljeniSport.charAt(0).toUpperCase() + user.omiljeniSport.slice(1)
                            }
                            disabled
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Label htmlFor="bio">O meni</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={isEditing ? editedUser.bio : user.bio}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="h-24"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="postavke" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Postavke računa</CardTitle>
                  <CardDescription>Upravljajte postavkama svog računa</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Obavijesti</h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="primajObavijesti">Obavijesti o natjecanjima</Label>
                        <p className="text-sm text-muted-foreground">
                          Primajte obavijesti o nadolazećim natjecanjima i rezultatima
                        </p>
                      </div>
                      <Switch
                        id="primajObavijesti"
                        checked={isEditing ? editedUser.primajObavijesti : user.primajObavijesti}
                        onCheckedChange={(checked) => handleSwitchChange("primajObavijesti", checked)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="primajNewsletter">Newsletter</Label>
                        <p className="text-sm text-muted-foreground">
                          Primajte mjesečni newsletter s novostima i savjetima
                        </p>
                      </div>
                      <Switch
                        id="primajNewsletter"
                        checked={isEditing ? editedUser.primajNewsletter : user.primajNewsletter}
                        onCheckedChange={(checked) => handleSwitchChange("primajNewsletter", checked)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Sigurnost</h3>
                    <Button variant="outline">Promijeni lozinku</Button>
                    <Button variant="outline" className="ml-2">
                      Dvofaktorska autentifikacija
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Opasna zona</h3>
                    <Button variant="destructive">Deaktiviraj račun</Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {isEditing && (
                    <>
                      <Button variant="outline" onClick={handleCancel}>
                        Odustani
                      </Button>
                      <Button onClick={handleSave}>Spremi promjene</Button>
                    </>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="natjecanja" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Moja natjecanja</CardTitle>
                  <CardDescription>Pregled natjecanja u kojima sudjelujete</CardDescription>
                </CardHeader>
                <CardContent>
                  {userCompetitions.length > 0 ? (
                    <div className="space-y-4">
                      {userCompetitions.map((competition) => {
                        // Format date to Croatian format
                        const date = new Date(competition.datum)
                        const formattedDate = date.toLocaleDateString("hr-HR", {
                          day: "numeric",
                          month: "numeric",
                          year: "numeric",
                        })

                        // Determine badge style based on status
                        let badgeVariant = "outline"
                        let badgeText = "Registrirano"
                        let badgeClass = "bg-zagi-light-blue text-black"

                        if (competition.status === "confirmed") {
                          badgeVariant = "default"
                          badgeText = "Potvrđeno"
                          badgeClass = "bg-zagi-green text-white"
                        } else if (competition.status === "completed") {
                          badgeVariant = "destructive"
                          badgeText = "Završeno"
                          badgeClass = "bg-zagi-red text-white"
                        }

                        return (
                          <Card key={competition.id} className="overflow-hidden">
                            <CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                  <Badge variant={badgeVariant} className={badgeClass}>
                                    {badgeText}
                                  </Badge>
                                  <span className="text-sm text-muted-foreground">{formattedDate}</span>
                                </div>
                                <h3 className="font-medium">{competition.naziv}</h3>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <MapPinIcon className="mr-1 h-3 w-3" />
                                  {competition.lokacija}
                                </div>
                              </div>
                              <Button asChild className="whitespace-nowrap">
                                <Link href={`/natjecanja/${competition.id}`}>
                                  {competition.status === "completed" ? "Pregledaj rezultate" : "Detalji natjecanja"}
                                </Link>
                              </Button>
                            </CardContent>
                          </Card>
                        )
                      })}

                      <div className="flex justify-center mt-6">
                        <Button variant="outline">
                          <Link href="/natjecanja">Pregledaj sva natjecanja</Link>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Trenutno niste prijavljeni ni na jedno natjecanje.</p>
                      <Button className="mt-4">
                        <Link href="/natjecanja">Pregledaj natjecanja</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pretplate" className="mt-6">
              <SubscriptionManagement />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
