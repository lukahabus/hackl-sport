"use client"

import type React from "react"

import { useState } from "react"
import { rezultati } from "@/data/rezultati"
import { natjecanja } from "@/data/natjecanja"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusIcon, Pencil, Trash2 } from "lucide-react"

export function AdminRezultati() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedRezultat, setSelectedRezultat] = useState<(typeof rezultati)[0] | null>(null)

  // This would be replaced with actual state management in a real application
  const handleAddRezultat = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAddDialogOpen(false)
    // Add result logic would go here
  }

  const handleEditRezultat = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditDialogOpen(false)
    // Edit result logic would go here
  }

  const handleDeleteRezultat = () => {
    setIsDeleteDialogOpen(false)
    // Delete result logic would go here
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Rezultati</CardTitle>
            <CardDescription>Upravljanje rezultatima natjecanja</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon className="mr-2 h-4 w-4" />
                Dodaj rezultat
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dodaj novi rezultat</DialogTitle>
                <DialogDescription>Zabilježi novi rezultat natjecanja.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddRezultat}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="natjecanje">Natjecanje</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Odaberi natjecanje" />
                      </SelectTrigger>
                      <SelectContent>
                        {natjecanja.map((natjecanje) => (
                          <SelectItem key={natjecanje.id} value={natjecanje.id}>
                            {natjecanje.naziv}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sudionik">Sudionik</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Odaberi sudionika" />
                      </SelectTrigger>
                      <SelectContent>
                        {sudionici.map((sudionik) => (
                          <SelectItem key={sudionik.id} value={sudionik.id}>
                            {sudionik.ime}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="poredak">Poredak</Label>
                    <Input id="poredak" type="number" min="1" placeholder="Poredak" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="rezultat">Rezultat/Vrijeme</Label>
                    <Input id="rezultat" placeholder="Rezultat ili vrijeme" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bodovi">Bodovi</Label>
                    <Input id="bodovi" type="number" placeholder="Bodovi" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Spremi rezultat</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Natjecanje</TableHead>
                <TableHead>Sudionik</TableHead>
                <TableHead>Poredak</TableHead>
                <TableHead>Rezultat/Vrijeme</TableHead>
                <TableHead>Bodovi</TableHead>
                <TableHead className="text-right">Akcije</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rezultati.map((rezultat) => {
                const natjecanje = natjecanja.find((c) => c.id === rezultat.natjecanjeId)
                const sudionik = sudionici.find((p) => p.id === rezultat.sudionikId)

                return (
                  <TableRow key={rezultat.id}>
                    <TableCell>{natjecanje?.naziv || "Nepoznato"}</TableCell>
                    <TableCell>{sudionik?.ime || "Nepoznato"}</TableCell>
                    <TableCell>{rezultat.poredak}</TableCell>
                    <TableCell>{rezultat.rezultat}</TableCell>
                    <TableCell>{rezultat.bodovi}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedRezultat(rezultat)
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
                            setSelectedRezultat(rezultat)
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
            <DialogTitle>Uredi rezultat</DialogTitle>
            <DialogDescription>Ažuriraj rezultat natjecanja.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditRezultat}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-natjecanje">Natjecanje</Label>
                <Select defaultValue={selectedRezultat?.natjecanjeId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Odaberi natjecanje" />
                  </SelectTrigger>
                  <SelectContent>
                    {natjecanja.map((natjecanje) => (
                      <SelectItem key={natjecanje.id} value={natjecanje.id}>
                        {natjecanje.naziv}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-sudionik">Sudionik</Label>
                <Select defaultValue={selectedRezultat?.sudionikId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Odaberi sudionika" />
                  </SelectTrigger>
                  <SelectContent>
                    {sudionici.map((sudionik) => (
                      <SelectItem key={sudionik.id} value={sudionik.id}>
                        {sudionik.ime}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-poredak">Poredak</Label>
                <Input
                  id="edit-poredak"
                  type="number"
                  min="1"
                  placeholder="Poredak"
                  defaultValue={selectedRezultat?.poredak}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-rezultat">Rezultat/Vrijeme</Label>
                <Input
                  id="edit-rezultat"
                  placeholder="Rezultat ili vrijeme"
                  defaultValue={selectedRezultat?.rezultat}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-bodovi">Bodovi</Label>
                <Input id="edit-bodovi" type="number" placeholder="Bodovi" defaultValue={selectedRezultat?.bodovi} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Ažuriraj rezultat</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Obriši rezultat</DialogTitle>
            <DialogDescription>
              Jeste li sigurni da želite obrisati ovaj rezultat? Ova radnja se ne može poništiti.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Odustani
            </Button>
            <Button variant="destructive" onClick={handleDeleteRezultat}>
              Obriši
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
