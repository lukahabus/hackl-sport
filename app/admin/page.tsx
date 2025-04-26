"use client"

import { useState } from "react"
import { natjecanja } from "@/data/natjecanja"
import { sportovi } from "@/data/sportovi"
import { sudionici } from "@/data/sudionici"
import { rezultati } from "@/data/rezultati"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminNatjecanja } from "@/components/admin/admin-natjecanja"
import { AdminSudionici } from "@/components/admin/admin-sudionici"
import { AdminRezultati } from "@/components/admin/admin-rezultati"
import { AdminSportovi } from "@/components/admin/admin-sportovi"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("pregled")

  // Count statistics for the overview
  const stats = {
    natjecanja: natjecanja.length,
    sportovi: sportovi.length,
    sudionici: sudionici.length,
    rezultati: rezultati.length,
    nadolazecaNatjecanja: natjecanja.filter((c) => new Date(c.datum) > new Date()).length,
    zavrsanaNatjecanja: natjecanja.filter((c) => new Date(c.datum) <= new Date()).length,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="space-y-6">
          {activeTab === "pregled" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl">{stats.natjecanja}</CardTitle>
                    <CardDescription>Ukupno natjecanja</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      <div>{stats.nadolazecaNatjecanja} nadolazećih</div>
                      <div>{stats.zavrsanaNatjecanja} završenih</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl">{stats.sportovi}</CardTitle>
                    <CardDescription>Sportske kategorije</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">Upravljanje svim sportskim disciplinama</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl">{stats.sudionici}</CardTitle>
                    <CardDescription>Registrirani sudionici</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">Sportaši i timovi</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Nedavne aktivnosti</CardTitle>
                  <CardDescription>Najnovije promjene i ažuriranja</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* This would typically be populated with real activity data */}
                    <div className="border-l-2 border-primary pl-4 pb-2">
                      <p className="text-sm text-muted-foreground">Danas, 10:30</p>
                      <p>Novo natjecanje dodano: Ljetno atletsko prvenstvo</p>
                    </div>
                    <div className="border-l-2 border-primary pl-4 pb-2">
                      <p className="text-sm text-muted-foreground">Jučer, 15:45</p>
                      <p>Rezultati ažurirani za: Regionalni plivački turnir</p>
                    </div>
                    <div className="border-l-2 border-primary pl-4 pb-2">
                      <p className="text-sm text-muted-foreground">Jučer, 11:15</p>
                      <p>5 novih sudionika registrirano za: Izazov brdskog biciklizma</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "natjecanja" && <AdminNatjecanja />}
          {activeTab === "sudionici" && <AdminSudionici />}
          {activeTab === "rezultati" && <AdminRezultati />}
          {activeTab === "sportovi" && <AdminSportovi />}
        </div>
      </div>
    </div>
  )
}
