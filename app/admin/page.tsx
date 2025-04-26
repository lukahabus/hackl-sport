"use client"

import { useState } from "react"
import { competitions } from "@/data/competitions"
import { sports } from "@/data/sports"
import { participants } from "@/data/participants"
import { results } from "@/data/results"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminCompetitions } from "@/components/admin/admin-competitions"
import { AdminParticipants } from "@/components/admin/admin-participants"
import { AdminResults } from "@/components/admin/admin-results"
import { AdminSports } from "@/components/admin/admin-sports"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Count statistics for the overview
  const stats = {
    competitions: competitions.length,
    sports: sports.length,
    participants: participants.length,
    results: results.length,
    upcomingCompetitions: competitions.filter((c) => new Date(c.date) > new Date()).length,
    completedCompetitions: competitions.filter((c) => new Date(c.date) <= new Date()).length,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="space-y-6">
          {activeTab === "overview" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl">{stats.competitions}</CardTitle>
                    <CardDescription>Total Competitions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      <div>{stats.upcomingCompetitions} upcoming</div>
                      <div>{stats.completedCompetitions} completed</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl">{stats.sports}</CardTitle>
                    <CardDescription>Sports Categories</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">Manage all sports disciplines</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl">{stats.participants}</CardTitle>
                    <CardDescription>Registered Participants</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">Athletes and teams</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates and changes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* This would typically be populated with real activity data */}
                    <div className="border-l-2 border-primary pl-4 pb-2">
                      <p className="text-sm text-muted-foreground">Today, 10:30 AM</p>
                      <p>New competition added: Summer Athletics Championship</p>
                    </div>
                    <div className="border-l-2 border-primary pl-4 pb-2">
                      <p className="text-sm text-muted-foreground">Yesterday, 3:45 PM</p>
                      <p>Results updated for: Regional Swimming Tournament</p>
                    </div>
                    <div className="border-l-2 border-primary pl-4 pb-2">
                      <p className="text-sm text-muted-foreground">Yesterday, 11:15 AM</p>
                      <p>5 new participants registered for: Mountain Biking Challenge</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "competitions" && <AdminCompetitions />}
          {activeTab === "participants" && <AdminParticipants />}
          {activeTab === "results" && <AdminResults />}
          {activeTab === "sports" && <AdminSports />}
        </div>
      </div>
    </div>
  )
}
