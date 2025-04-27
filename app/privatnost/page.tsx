import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PrivatnostPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Politika privatnosti</h1>

        <div className="prose prose-slate max-w-none">
          <p className="text-lg mb-6">Posljednje ažuriranje: 27. travnja 2025.</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Uvod</h2>
            <p>ZagiSport ("mi", "nas" ili "naš") upravlja web aplikacijom ZagiSport (u daljnjem tekstu "Usluga").</p>
            <p>
              Ova stranica vas obavještava o našim pravilima u vezi s prikupljanjem, korištenjem i otkrivanjem osobnih
              podataka kada koristite našu Uslugu te o izborima koje ste povezali s tim podacima.
            </p>
            <p>
              Vaše podatke koristimo za pružanje i poboljšanje Usluge. Korištenjem Usluge pristajete na prikupljanje i
              korištenje informacija u skladu s ovom politikom. Osim ako nije drugačije definirano u ovoj Politici
              privatnosti, pojmovi koji se koriste u ovoj Politici privatnosti imaju isto značenje kao u našim Uvjetima
              korištenja.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Prikupljanje i korištenje informacija</h2>
            <p>
              Prikupljamo nekoliko različitih vrsta informacija za različite svrhe kako bismo vam pružili i poboljšali
              našu Uslugu.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">2.1. Osobni podaci</h3>
            <p>
              Tijekom korištenja naše Usluge, možemo od vas zatražiti da nam pružite određene osobno identificirajuće
              informacije koje se mogu koristiti za kontaktiranje ili identifikaciju vas ("Osobni podaci"). Osobno
              identificirajuće informacije mogu uključivati, ali nisu ograničene na:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Email adresu</li>
              <li>Ime i prezime</li>
              <li>Telefonski broj</li>
              <li>Adresu</li>
              <li>Datum rođenja</li>
              <li>Kolačiće i podatke o korištenju</li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-3">2.2. Podaci o korištenju</h3>
            <p>
              Također možemo prikupljati informacije o tome kako se pristupa i koristi Usluga ("Podaci o korištenju").
              Ovi Podaci o korištenju mogu uključivati informacije poput IP adrese vašeg računala, vrste preglednika,
              verzije preglednika, stranica naše Usluge koje posjećujete, vrijeme i datum vašeg posjeta, vrijeme
              provedeno na tim stranicama, jedinstvene identifikatore uređaja i druge dijagnostičke podatke.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Korištenje podataka</h2>
            <p>ZagiSport koristi prikupljene podatke za različite svrhe:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Za pružanje i održavanje Usluge</li>
              <li>Za obavještavanje o promjenama naše Usluge</li>
              <li>Za omogućavanje sudjelovanja u interaktivnim značajkama naše Usluge kada to odlučite</li>
              <li>Za pružanje korisničke podrške</li>
              <li>Za prikupljanje analize ili vrijednih informacija kako bismo poboljšali našu Uslugu</li>
              <li>Za praćenje korištenja Usluge</li>
              <li>Za otkrivanje, sprječavanje i rješavanje tehničkih problema</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Sigurnost podataka</h2>
            <p>
              Sigurnost vaših podataka nam je važna, ali imajte na umu da nijedna metoda prijenosa putem interneta ili
              metoda elektroničkog pohranjivanja nije 100% sigurna. Iako se trudimo koristiti komercijalno prihvatljiva
              sredstva za zaštitu vaših osobnih podataka, ne možemo jamčiti njihovu apsolutnu sigurnost.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Vaša prava</h2>
            <p>
              Ako ste stanovnik Europske unije, imate određena prava na zaštitu podataka. Želimo osigurati da ste u
              potpunosti svjesni svih svojih prava zaštite podataka. Svaki korisnik ima pravo na sljedeće:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>Pravo pristupa</strong> - Imate pravo zatražiti kopije svojih osobnih podataka.
              </li>
              <li>
                <strong>Pravo na ispravak</strong> - Imate pravo zatražiti da ispravimo bilo koje informacije za koje
                vjerujete da su netočne. Također imate pravo zatražiti da dopunimo informacije za koje vjerujete da su
                nepotpune.
              </li>
              <li>
                <strong>Pravo na brisanje</strong> - Imate pravo zatražiti da izbrišemo vaše osobne podatke, pod
                određenim uvjetima.
              </li>
              <li>
                <strong>Pravo na ograničenje obrade</strong> - Imate pravo zatražiti da ograničimo obradu vaših osobnih
                podataka, pod određenim uvjetima.
              </li>
              <li>
                <strong>Pravo na prigovor na obradu</strong> - Imate pravo prigovoriti našoj obradi vaših osobnih
                podataka, pod određenim uvjetima.
              </li>
              <li>
                <strong>Pravo na prenosivost podataka</strong> - Imate pravo zatražiti da prenesemo podatke koje smo
                prikupili drugoj organizaciji ili izravno vama, pod određenim uvjetima.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Kontaktirajte nas</h2>
            <p>Ako imate bilo kakvih pitanja o ovoj Politici privatnosti, molimo vas da nas kontaktirate:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Putem e-maila: privacy@zagisport.hr</li>
              <li>Putem telefona: +385 1 234 5678</li>
              <li>Putem pošte: ZagiSport, Ilica 242, 10000 Zagreb, Hrvatska</li>
            </ul>
          </section>

          <div className="mt-8 text-center">
            <Button asChild>
              <Link href="/">Povratak na početnu stranicu</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
