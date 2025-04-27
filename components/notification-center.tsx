"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// Mock notifications data
const mockNotifications = [
  {
    id: "1",
    type: "competition_start",
    title: "Natjecanje uskoro počinje",
    message: "Kup grada Zagreba 2025 počinje za 24 sata.",
    competitionId: "kup-zagreba-2025",
    date: "2025-04-21T09:00:00Z",
    read: false,
  },
  {
    id: "2",
    type: "result",
    title: "Rezultati objavljeni",
    message: "Rezultati za Regionalno plivačko natjecanje 2024 su objavljeni.",
    competitionId: "regionalno-plivanje-2024",
    date: "2024-02-28T18:00:00Z",
    read: true,
  },
  {
    id: "3",
    type: "schedule_change",
    title: "Promjena u rasporedu",
    message: "Došlo je do promjene u rasporedu za Proljetno atletsko prvenstvo.",
    competitionId: "atletsko-prvenstvo-2024",
    date: "2024-04-18T14:30:00Z",
    read: false,
  },
  {
    id: "4",
    type: "reminder",
    title: "Podsjetnik za natjecanje",
    message: "Ne zaboravite: Proljetno atletsko prvenstvo je sutra u 10:00.",
    competitionId: "atletsko-prvenstvo-2024",
    date: "2024-04-19T10:00:00Z",
    read: false,
  },
]

export function NotificationCenter() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [open, setOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) {
      return "Danas"
    } else if (diffInDays === 1) {
      return "Jučer"
    } else if (diffInDays < 7) {
      return `Prije ${diffInDays} dana`
    } else {
      return date.toLocaleDateString("hr-HR")
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500 text-white">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-2 border-b">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Obavijesti</h4>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs h-8">
                Označi sve kao pročitano
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2 p-1">
            <TabsTrigger value="all">Sve</TabsTrigger>
            <TabsTrigger value="unread" disabled={unreadCount === 0}>
              Nepročitane ({unreadCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="max-h-[300px] overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 hover:bg-muted/50 cursor-pointer ${!notification.read ? "bg-blue-50" : ""}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h5 className="font-medium text-sm">{notification.title}</h5>
                      <span className="text-xs text-muted-foreground">{formatDate(notification.date)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{notification.message}</p>
                    <Link
                      href={`/natjecanja/${notification.competitionId}`}
                      className="text-xs text-zagi-blue hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Pogledaj detalje
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground">Nema obavijesti</div>
            )}
          </TabsContent>

          <TabsContent value="unread" className="max-h-[300px] overflow-y-auto">
            {unreadCount > 0 ? (
              <div className="divide-y">
                {notifications
                  .filter((n) => !n.read)
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="p-3 hover:bg-muted/50 cursor-pointer bg-blue-50"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="font-medium text-sm">{notification.title}</h5>
                        <span className="text-xs text-muted-foreground">{formatDate(notification.date)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{notification.message}</p>
                      <Link
                        href={`/natjecanja/${notification.competitionId}`}
                        className="text-xs text-zagi-blue hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Pogledaj detalje
                      </Link>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground">Nema nepročitanih obavijesti</div>
            )}
          </TabsContent>
        </Tabs>

        <div className="p-2 border-t">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link href="/profil?tab=pretplate">Upravljaj pretplatama</Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
