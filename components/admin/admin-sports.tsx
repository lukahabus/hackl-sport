"use client"

import type React from "react"

import { useState } from "react"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { PlusIcon, Pencil, Trash2 } from "lucide-react"

export function AdminSports() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedSport, setSelectedSport] = useState<(typeof sports)[0] | null>(null)

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
            <CardTitle>Sports</CardTitle>
            <CardDescription>Manage sports categories</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Sport
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Sport</DialogTitle>
                <DialogDescription>Create a new sport category.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddSport}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Sport name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Sport description" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Sport</Button>
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
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sports.map((sport) => (
                <TableRow key={sport.id}>
                  <TableCell className="font-medium">{sport.name}</TableCell>
                  <TableCell>{sport.description}</TableCell>
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
                        <span className="sr-only">Edit</span>
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
            <DialogTitle>Edit Sport</DialogTitle>
            <DialogDescription>Update sport details.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSport}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input id="edit-name" placeholder="Sport name" defaultValue={selectedSport?.name} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  placeholder="Sport description"
                  defaultValue={selectedSport?.description}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Update Sport</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Sport</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this sport? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteSport}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
