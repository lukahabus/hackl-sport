"use client"

import type React from "react"

import { useState } from "react"
import { results } from "@/data/results"
import { competitions } from "@/data/competitions"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusIcon, Pencil, Trash2 } from "lucide-react"

export function AdminResults() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedResult, setSelectedResult] = useState<(typeof results)[0] | null>(null)

  // This would be replaced with actual state management in a real application
  const handleAddResult = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAddDialogOpen(false)
    // Add result logic would go here
  }

  const handleEditResult = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditDialogOpen(false)
    // Edit result logic would go here
  }

  const handleDeleteResult = () => {
    setIsDeleteDialogOpen(false)
    // Delete result logic would go here
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Results</CardTitle>
            <CardDescription>Manage competition results</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Result
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Result</DialogTitle>
                <DialogDescription>Record a new competition result.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddResult}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="competition">Competition</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a competition" />
                      </SelectTrigger>
                      <SelectContent>
                        {competitions.map((competition) => (
                          <SelectItem key={competition.id} value={competition.id}>
                            {competition.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="participant">Participant</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a participant" />
                      </SelectTrigger>
                      <SelectContent>
                        {participants.map((participant) => (
                          <SelectItem key={participant.id} value={participant.id}>
                            {participant.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="rank">Rank</Label>
                    <Input id="rank" type="number" min="1" placeholder="Rank" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="score">Score/Time</Label>
                    <Input id="score" placeholder="Score or time" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="points">Points</Label>
                    <Input id="points" type="number" placeholder="Points" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Result</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Competition</TableHead>
                <TableHead>Participant</TableHead>
                <TableHead>Rank</TableHead>
                <TableHead>Score/Time</TableHead>
                <TableHead>Points</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => {
                const competition = competitions.find((c) => c.id === result.competitionId)
                const participant = participants.find((p) => p.id === result.participantId)

                return (
                  <TableRow key={result.id}>
                    <TableCell>{competition?.name || "Unknown"}</TableCell>
                    <TableCell>{participant?.name || "Unknown"}</TableCell>
                    <TableCell>{result.rank}</TableCell>
                    <TableCell>{result.score}</TableCell>
                    <TableCell>{result.points}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedResult(result)
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
                            setSelectedResult(result)
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
            <DialogTitle>Edit Result</DialogTitle>
            <DialogDescription>Update competition result.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditResult}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-competition">Competition</Label>
                <Select defaultValue={selectedResult?.competitionId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a competition" />
                  </SelectTrigger>
                  <SelectContent>
                    {competitions.map((competition) => (
                      <SelectItem key={competition.id} value={competition.id}>
                        {competition.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-participant">Participant</Label>
                <Select defaultValue={selectedResult?.participantId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a participant" />
                  </SelectTrigger>
                  <SelectContent>
                    {participants.map((participant) => (
                      <SelectItem key={participant.id} value={participant.id}>
                        {participant.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-rank">Rank</Label>
                <Input id="edit-rank" type="number" min="1" placeholder="Rank" defaultValue={selectedResult?.rank} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-score">Score/Time</Label>
                <Input id="edit-score" placeholder="Score or time" defaultValue={selectedResult?.score} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-points">Points</Label>
                <Input id="edit-points" type="number" placeholder="Points" defaultValue={selectedResult?.points} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Update Result</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Result</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this result? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteResult}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
