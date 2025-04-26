import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-zagi-blue text-white py-8">
      <div className="container flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
          <div className="flex items-center mb-2">
            <div className="relative h-8 w-24">
              <img src="/logo.png" alt="ZagiSport Logo" className="h-8" />
            </div>
          </div>
          <p className="text-sm">© 2025 ZagiSport. All rights reserved.</p>
        </div>
        <div className="flex gap-6">
          <Link href="/natjecanja" className="text-sm hover:underline">
            Natjecanja
          </Link>
          <Link href="/admin" className="text-sm hover:underline">
            Admin
          </Link>
          <Link href="/privacy" className="text-sm hover:underline">
            Privacy
          </Link>
          <Link href="/terms" className="text-sm hover:underline">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  )
}
