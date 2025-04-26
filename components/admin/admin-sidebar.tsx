"use client"

import { Button } from "@/components/ui/button"
import { BarChart3Icon, CalendarIcon, ListIcon, TrophyIcon, UsersIcon } from "lucide-react"

interface AdminSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  const tabs = [
    { id: "pregled", label: "Pregled", icon: BarChart3Icon },
    { id: "natjecanja", label: "Natjecanja", icon: CalendarIcon },
    { id: "sudionici", label: "Sudionici", icon: UsersIcon },
    { id: "rezultati", label: "Rezultati", icon: TrophyIcon },
    { id: "sportovi", label: "Sportovi", icon: ListIcon },
  ]

  return (
    <div className="space-y-2">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab(tab.id)}
        >
          <tab.icon className="mr-2 h-4 w-4" />
          {tab.label}
        </Button>
      ))}
    </div>
  )
}
