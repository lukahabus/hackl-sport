import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-zagi-blue text-white py-8">
      <div className="container flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
          <div className="flex items-center mb-2">
            <img src="/images/zagisport-footer-logo.png" alt="ZagiSport Logo" className="h-10" />
          </div>
          <p className="text-sm">© 2025. Sva prava pridržana.</p>
        </div>
        <div className="flex items-center mb-4 md:mb-0 md:mx-4">
          <img src="/images/zagi-mascot-running.png" alt="Zagi Mascot" className="h-16" />
        </div>
        <div className="flex gap-6">
          <Link href="/natjecanja" className="text-sm hover:underline">
            Natjecanja
          </Link>
          <Link href="/roditelji" className="text-sm hover:underline">
            Za roditelje
          </Link>
          <Link href="/admin" className="text-sm hover:underline">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
