"use client"

import { natjecanja } from "@/data/natjecanja"
import { NatjecanjeCard } from "@/components/natjecanje-card"

export function IstaknutoNatjecanje() {
  // Get the 3 most recent competitions
  const istaknutoNatjecanja = [...natjecanja]
    .sort((a, b) => new Date(b.datum).getTime() - new Date(a.datum).getTime())
    .slice(0, 3)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {istaknutoNatjecanja.map((natjecanje) => (
        <NatjecanjeCard key={natjecanje.id} natjecanje={natjecanje} />
      ))}
    </div>
  )
}
