"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { NotificationCenter } from "@/components/notification-center"

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Update the routes array to include the API docs page
  const routes = [
    { href: "/", label: "Naslovnica" },
    { href: "/natjecanja", label: "Natjecanja" },
    { href: "/lokacije", label: "Lokacije" },
    { href: "/roditelji", label: "Za roditelje" },
    { href: "/api-docs", label: "API Dokumentacija" },
    { href: "/profil", label: "Moj profil" },
  ]

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") {
      return false
    }
    return pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <div className="flex items-center mb-8">
                <img src="/images/zagisport-logo-notext.png" alt="ZagiSport Logo" className="h-12" />
              </div>
              <nav className="flex flex-col gap-4">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      isActive(route.href) ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {route.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 pt-6 border-t flex flex-col gap-3">
                <Button variant="outline" size="sm" asChild className="justify-start">
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="bg-[#0057B8] text-white hover:bg-[#004494] justify-start"
                  asChild
                >
                  <Link href="/registracija">Registracija</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <img src="/images/zagisport-logo-notext.png" alt="ZagiSport Logo" className="h-10" />
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 ml-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(route.href) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <NotificationCenter />
          <div className="hidden lg:flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button variant="default" size="sm" className="bg-[#0057B8] text-white hover:bg-[#004494]" asChild>
              <Link href="/registracija">Registracija</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
