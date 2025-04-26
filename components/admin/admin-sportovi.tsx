"\"use client"

import type React from "react"

import { useState } from "react"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { PlusIcon, Pencil, Trash2 } from "lucide-react"

export function AdminSportovi() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedSport, setSelectedSport] = useState<(typeof sportovi)[0] | null>(null)

  // This would be replaced with actual state management in a real application
  const handleAddSport = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAddDialogOpen(false)
    // Add sport logic would go here
  }

  const handleEditSport = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditDialogOpen(false)
    // Edit sport logic would go here
  }

  const handleDeleteSport = () => {
    setIsDeleteDialogOpen(false)
    // Delete sport logic would go here
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Sportovi</CardTitle>
            <CardDescription>Upravljanje sportskim kategorijama</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon className="mr-2 h-4 w-4" />
                Dodaj sport
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dodaj novi sport</DialogTitle>
                <DialogDescription>Kreiraj novu sportsku kategoriju.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddSport}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="naziv">Naziv</Label>
                    <Input id="naziv" placeholder="Naziv sporta" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="opis">Opis</Label>
                    <Textarea id="opis" placeholder="Opis sporta" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Spremi sport</Button>
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
                <TableHead>Opis</TableHead>
                <TableHead className="text-right">Akcije</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sportovi.map((sport) => (
                <TableRow key={sport.id}>
                  <TableCell className="font-medium">{sport.naziv}</TableCell>
                  <TableCell>{sport.opis}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedSport(sport)
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
                          setSelectedSport(sport)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Obriši</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Uredi sport</DialogTitle>
            <DialogDescription>Ažuriraj detalje sporta.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSport}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-naziv">Naziv</Label>
                <Input id="edit-naziv" placeholder="Naziv sporta" defaultValue={selectedSport?.naziv} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-opis">Opis</Label>
                <Textarea id="edit-opis" placeholder="Opis sporta" defaultValue={selectedSport?.opis} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Ažuriraj sport</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Obriši sport</DialogTitle>
            <DialogDescription>
              Jeste li sigurni da želite obrisati ovaj sport? Ova radnja se ne može poništiti.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Odustani
            </Button>
            <Button variant="destructive" onClick={handleDeleteSport}>
              Obriši
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
