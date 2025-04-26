"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { natjecanja } from "@/data/natjecanja"
import { sportovi } from "@/data/sportovi"
import { NatjecanjeCard } from "@/components/natjecanje-card"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"

export default function NatjecanjaPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSport, setSelectedSport] = useState("all")
  const [status, setStatus] = useState("all")
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  const filteredNatjecanja = natjecanja.filter((natjecanje) => {
    // Filter by search query
    const matchesSearch =
      natjecanje.naziv.toLowerCase().includes(searchQuery.toLowerCase()) ||
      natjecanje.lokacija.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by sport
    const matchesSport = selectedSport === "all" || natjecanje.sportId === selectedSport

    // Filter by status
    const isUpcoming = new Date(natjecanje.datum) > new Date()
    const isActive = isUpcoming && new Date(natjecanje.datum) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const matchesStatus =
      status === "all" ||
      (status === "active" && isActive) ||
      (status === "upcoming" && isUpcoming && !isActive) ||
      (status === "finished" && !isUpcoming)

    return matchesSearch && matchesSport && matchesStatus
  })

  const monthNames = [
    "Siječanj",
    "Veljača",
    "Ožujak",
    "Travanj",
    "Svibanj",
    "Lipanj",
    "Srpanj",
    "Kolovoz",
    "Rujan",
    "Listopad",
    "Studeni",
    "Prosinac",
  ]

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  // Adjust for Sunday being 0 in JavaScript but we want Monday as first day (1)
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const previousMonthDays = Array.from({ length: adjustedFirstDay }, (_, i) => i + 1)

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Natjecanja</h1>
        <p className="text-muted-foreground mt-2">Pretražuj i otkrij sportska natjecanja</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Pretraži</h3>
            <Input
              placeholder="Pretraži natjecanja..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Filtriraj po sportu...</h3>
            <Select value={selectedSport} onValueChange={setSelectedSport}>
              <SelectTrigger>
                <SelectValue placeholder="Odaberi sport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Svi sportovi</SelectItem>
                {sportovi.map((sport) => (
                  <SelectItem key={sport.id} value={sport.id}>
                    {sport.naziv}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Status</h3>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={status === "all" ? "default" : "outline"}
                onClick={() => setStatus("all")}
                className="w-full"
              >
                Svi
              </Button>
              <Button
                variant={status === "active" ? "default" : "outline"}
                onClick={() => setStatus("active")}
                className="w-full"
              >
                Nadolazeći
              </Button>
              <Button
                variant={status === "finished" ? "default" : "outline"}
                onClick={() => setStatus("finished")}
                className="w-full"
              >
                Gotovi
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Kalendar</h3>
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <Button variant="ghost" size="icon" onClick={handlePreviousMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="font-medium">
                    {monthNames[currentMonth]} {currentYear}
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleNextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-7 text-center text-xs mb-2">
                  <div>Po</div>
                  <div>Ut</div>
                  <div>Sr</div>
                  <div>Če</div>
                  <div>Pe</div>
                  <div>Su</div>
                  <div>Ne</div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-sm">
                  {previousMonthDays.map((_, index) => (
                    <div key={`prev-${index}`} className="h-8 flex items-center justify-center text-gray-400"></div>
                  ))}
                  {days.map((day) => {
                    const date = new Date(currentYear, currentMonth, day)
                    const hasEvent = natjecanja.some((n) => {
                      const eventDate = new Date(n.datum)
                      return (
                        eventDate.getDate() === day &&
                        eventDate.getMonth() === currentMonth &&
                        eventDate.getFullYear() === currentYear
                      )
                    })

                    return (
                      <div
                        key={day}
                        className={`h-8 flex items-center justify-center rounded-full cursor-pointer
                          ${hasEvent ? "bg-primary text-white" : "hover:bg-gray-100"}`}
                      >
                        {day}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNatjecanja.map((natjecanje) => (
              <NatjecanjeCard key={natjecanje.id} natjecanje={natjecanje} />
            ))}

            {filteredNatjecanja.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium">Nema pronađenih natjecanja</h3>
                <p className="text-muted-foreground mt-2">Pokušajte prilagoditi filtere ili pretragu</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
