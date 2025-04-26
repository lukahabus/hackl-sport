"use client"

import { Button } from "@/components/ui/button"
import { BarChart3Icon, CalendarIcon, ListIcon, TrophyIcon, UsersIcon } from "lucide-react"

interface AdminSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3Icon },
    { id: "competitions", label: "Competitions", icon: CalendarIcon },
    { id: "participants", label: "Participants", icon: UsersIcon },
    { id: "results", label: "Results", icon: TrophyIcon },
    { id: "sports", label: "Sports", icon: ListIcon },
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
