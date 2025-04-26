"use client"

import type React from "react"

import { useState } from "react"
import { competitions } from "@/data/competitions"
import { sports } from "@/data/sports"
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

export function AdminCompetitions() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCompetition, setSelectedCompetition] = useState<(typeof competitions)[0] | null>(null)

  // This would be replaced with actual state management in a real application
  const handleAddCompetition = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAddDialogOpen(false)
    // Add competition logic would go here
  }

  const handleEditCompetition = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditDialogOpen(false)
    // Edit competition logic would go here
  }

  const handleDeleteCompetition = () => {
    setIsDeleteDialogOpen(false)
    // Delete competition logic would go here
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Competitions</CardTitle>
            <CardDescription>Manage all competitions</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Competition
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Competition</DialogTitle>
                <DialogDescription>Create a new competition with all details.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddCompetition}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Competition name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sport">Sport</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a sport" />
                      </SelectTrigger>
                      <SelectContent>
                        {sports.map((sport) => (
                          <SelectItem key={sport.id} value={sport.id}>
                            {sport.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Competition location" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Competition description" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Competition</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Sport</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {competitions.map((competition) => {
                const sport = sports.find((s) => s.id === competition.sportId)
                return (
                  <TableRow key={competition.id}>
                    <TableCell className="font-medium">{competition.name}</TableCell>
                    <TableCell>{sport?.name || "Unknown"}</TableCell>
                    <TableCell>{new Date(competition.date).toLocaleDateString()}</TableCell>
                    <TableCell>{competition.location}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedCompetition(competition)
                            setIsEditDialogOpen(true)
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedCompetition(competition)
                            setIsDeleteDialogOpen(true)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
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
            <DialogTitle>Edit Competition</DialogTitle>
            <DialogDescription>Update competition details.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditCompetition}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input id="edit-name" placeholder="Competition name" defaultValue={selectedCompetition?.name} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-sport">Sport</Label>
                <Select defaultValue={selectedCompetition?.sportId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a sport" />
                  </SelectTrigger>
                  <SelectContent>
                    {sports.map((sport) => (
                      <SelectItem key={sport.id} value={sport.id}>
                        {sport.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-date">Date</Label>
                <Input id="edit-date" type="date" defaultValue={selectedCompetition?.date.split("T")[0]} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  placeholder="Competition location"
                  defaultValue={selectedCompetition?.location}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  placeholder="Competition description"
                  defaultValue={selectedCompetition?.description}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Update Competition</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Competition</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this competition? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCompetition}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
