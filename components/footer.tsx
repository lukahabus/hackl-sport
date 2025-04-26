import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start md:gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">HACKL</span>
          </Link>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} HACKL Sports Innovation. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/competitions" className="text-sm text-muted-foreground hover:text-foreground">
            Competitions
          </Link>
          <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground">
            Admin
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Privacy
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  )
}
