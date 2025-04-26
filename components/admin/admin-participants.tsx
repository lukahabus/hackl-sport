"use client"

import type React from "react"

import { useState } from "react"
import { participants } from "@/data/participants"
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

export function AdminParticipants() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedParticipant, setSelectedParticipant] = useState<(typeof participants)[0] | null>(null)

  // This would be replaced with actual state management in a real application
  const handleAddParticipant = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAddDialogOpen(false)
    // Add participant logic would go here
  }

  const handleEditParticipant = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditDialogOpen(false)
    // Edit participant logic would go here
  }

  const handleDeleteParticipant = () => {
    setIsDeleteDialogOpen(false)
    // Delete participant logic would go here
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Participants</CardTitle>
            <CardDescription>Manage athletes and teams</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Participant
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Participant</DialogTitle>
                <DialogDescription>Add a new athlete or team to the system.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddParticipant}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Participant name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" placeholder="Country" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" placeholder="Category (e.g., Men's Singles)" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Participant</Button>
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
                <TableHead>Country</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {participants.map((participant) => (
                <TableRow key={participant.id}>
                  <TableCell className="font-medium">{participant.name}</TableCell>
                  <TableCell>{participant.country}</TableCell>
                  <TableCell>{participant.category}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedParticipant(participant)
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
                          setSelectedParticipant(participant)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
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
            <DialogTitle>Edit Participant</DialogTitle>
            <DialogDescription>Update participant details.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditParticipant}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input id="edit-name" placeholder="Participant name" defaultValue={selectedParticipant?.name} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-country">Country</Label>
                <Input id="edit-country" placeholder="Country" defaultValue={selectedParticipant?.country} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Category</Label>
                <Input id="edit-category" placeholder="Category" defaultValue={selectedParticipant?.category} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Update Participant</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Participant</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this participant? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteParticipant}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
