"use client"

import type React from "react"

import { useState } from "react"
import { sudionici } from "@/data/sudionici"
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
import { PlusIcon, Pencil, Trash2 } from "lucide-react"

export function AdminSudionici() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedSudionik, setSelectedSudionik] = useState<(typeof sudionici)[0] | null>(null)

  // This would be replaced with actual state management in a real application
  const handleAddSudionik = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAddDialogOpen(false)
    // Add participant logic would go here
  }

  const handleEditSudionik = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditDialogOpen(false)
    // Edit participant logic would go here
  }

  const handleDeleteSudionik = () => {
    setIsDeleteDialogOpen(false)
    // Delete participant logic would go here
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Sudionici</CardTitle>
            <CardDescription>Upravljanje sportašima i timovima</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon className="mr-2 h-4 w-4" />
                Dodaj sudionika
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dodaj novog sudionika</DialogTitle>
                <DialogDescription>Dodaj novog sportaša ili tim u sustav.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddSudionik}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="ime">Ime</Label>
                    <Input id="ime" placeholder="Ime sudionika" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="drzava">Država</Label>
                    <Input id="drzava" placeholder="Država" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="kategorija">Kategorija</Label>
                    <Input id="kategorija" placeholder="Kategorija (npr. Muški singl)" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Spremi sudionika</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ime</TableHead>
                <TableHead>Država</TableHead>
                <TableHead>Kategorija</TableHead>
                <TableHead className="text-right">Akcije</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sudionici.map((sudionik) => (
                <TableRow key={sudionik.id}>
                  <TableCell className="font-medium">{sudionik.ime}</TableCell>
                  <TableCell>{sudionik.drzava}</TableCell>
                  <TableCell>{sudionik.kategorija}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedSudionik(sudionik)
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
                          setSelectedSudionik(sudionik)
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
            <DialogTitle>Uredi sudionika</DialogTitle>
            <DialogDescription>Ažuriraj detalje sudionika.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSudionik}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-ime">Ime</Label>
                <Input id="edit-ime" placeholder="Ime sudionika" defaultValue={selectedSudionik?.ime} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-drzava">Država</Label>
                <Input id="edit-drzava" placeholder="Država" defaultValue={selectedSudionik?.drzava} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-kategorija">Kategorija</Label>
                <Input id="edit-kategorija" placeholder="Kategorija" defaultValue={selectedSudionik?.kategorija} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Ažuriraj sudionika</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Obriši sudionika</DialogTitle>
            <DialogDescription>
              Jeste li sigurni da želite obrisati ovog sudionika? Ova radnja se ne može poništiti.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Odustani
            </Button>
            <Button variant="destructive" onClick={handleDeleteSudionik}>
              Obriši
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
