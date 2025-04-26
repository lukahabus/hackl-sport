"use client"

import type React from "react"

import { useState } from "react"
import { natjecanja } from "@/data/natjecanja"
import { sportovi } from "@/data/sportovi"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { PlusIcon, Pencil, Trash2 } from "lucide-react"

export function AdminNatjecanja() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedNatjecanje, setSelectedNatjecanje] = useState<(typeof natjecanja)[0] | null>(null)

  // This would be replaced with actual state management in a real application
  const handleAddNatjecanje = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAddDialogOpen(false)
    // Add competition logic would go here
  }

  const handleEditNatjecanje = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditDialogOpen(false)
    // Edit competition logic would go here
  }

  const handleDeleteNatjecanje = () => {
    setIsDeleteDialogOpen(false)
    // Delete competition logic would go here
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Natjecanja</CardTitle>
            <CardDescription>Upravljanje svim natjecanjima</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon className="mr-2 h-4 w-4" />
                Dodaj natjecanje
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dodaj novo natjecanje</DialogTitle>
                <DialogDescription>Kreiraj novo natjecanje sa svim detaljima.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddNatjecanje}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="naziv">Naziv</Label>
                    <Input id="naziv" placeholder="Naziv natjecanja" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sport">Sport</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Odaberi sport" />
                      </SelectTrigger>
                      <SelectContent>
                        {sportovi.map((sport) => (
                          <SelectItem key={sport.id} value={sport.id}>
                            {sport.naziv}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="datum">Datum</Label>
                    <Input id="datum" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lokacija">Lokacija</Label>
                    <Input id="lokacija" placeholder="Lokacija natjecanja" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="opis">Opis</Label>
                    <Textarea id="opis" placeholder="Opis natjecanja" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Spremi natjecanje</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Naziv</TableHead>
                <TableHead>Sport</TableHead>
                <TableHead>Datum</TableHead>
                <TableHead>Lokacija</TableHead>
                <TableHead className="text-right">Akcije</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {natjecanja.map((natjecanje) => {
                const sport = sportovi.find((s) => s.id === natjecanje.sportId)
                return (
                  <TableRow key={natjecanje.id}>
                    <TableCell className="font-medium">{natjecanje.naziv}</TableCell>
                    <TableCell>{sport?.naziv || "Nepoznato"}</TableCell>
                    <TableCell>{new Date(natjecanje.datum).toLocaleDateString("hr-HR")}</TableCell>
                    <TableCell>{natjecanje.lokacija}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedNatjecanje(natjecanje)
                            setIsEditDialogOpen(true)
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Uredi</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedNatjecanje(natjecanje)
                            setIsDeleteDialogOpen(true)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Obriši</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Uredi natjecanje</DialogTitle>
            <DialogDescription>Ažuriraj detalje natjecanja.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditNatjecanje}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-naziv">Naziv</Label>
                <Input id="edit-naziv" placeholder="Naziv natjecanja" defaultValue={selectedNatjecanje?.naziv} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-sport">Sport</Label>
                <Select defaultValue={selectedNatjecanje?.sportId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Odaberi sport" />
                  </SelectTrigger>
                  <SelectContent>
                    {sportovi.map((sport) => (
                      <SelectItem key={sport.id} value={sport.id}>
                        {sport.naziv}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-datum">Datum</Label>
                <Input id="edit-datum" type="date" defaultValue={selectedNatjecanje?.datum.split("T")[0]} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-lokacija">Lokacija</Label>
                <Input
                  id="edit-lokacija"
                  placeholder="Lokacija natjecanja"
                  defaultValue={selectedNatjecanje?.lokacija}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-opis">Opis</Label>
                <Textarea id="edit-opis" placeholder="Opis natjecanja" defaultValue={selectedNatjecanje?.opis} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Ažuriraj natjecanje</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Obriši natjecanje</DialogTitle>
            <DialogDescription>
              Jeste li sigurni da želite obrisati ovo natjecanje? Ova radnja se ne može poništiti.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Odustani
            </Button>
            <Button variant="destructive" onClick={handleDeleteNatjecanje}>
              Obriši
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
