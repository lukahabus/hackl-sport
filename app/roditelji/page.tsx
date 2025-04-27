import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RoditeljPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Za roditelje</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Informacije za roditelje</h2>
            <p className="mb-4">
              Dobrodošli na ZagiSport stranicu za roditelje! Ovdje možete pronaći sve potrebne informacije o sportskim
              aktivnostima za vašu djecu, savjete za podršku mladim sportašima i odgovore na najčešća pitanja.
            </p>
            <p>
              Naš cilj je osigurati da sva djeca imaju pozitivno iskustvo u sportu, razvijaju zdrave navike i uživaju u
              fizičkoj aktivnosti. Vjerujemo da roditelji igraju ključnu ulogu u tom procesu.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Prednosti sporta za djecu</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Fizički razvoj</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Razvoj motoričkih vještina</li>
                    <li>Poboljšanje koordinacije</li>
                    <li>Jačanje mišića i kostiju</li>
                    <li>Održavanje zdrave tjelesne težine</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Psihološki razvoj</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Povećanje samopouzdanja</li>
                    <li>Razvoj discipline i upornosti</li>
                    <li>Učenje nošenja s pobjedama i porazima</li>
                    <li>Smanjenje stresa i anksioznosti</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Socijalni razvoj</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Razvoj timskog rada</li>
                    <li>Učenje poštovanja prema drugima</li>
                    <li>Stvaranje prijateljstava</li>
                    <li>Razvoj komunikacijskih vještina</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Akademski uspjeh</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Poboljšana koncentracija</li>
                    <li>Bolje organizacijske vještine</li>
                    <li>Razvoj radnih navika</li>
                    <li>Veća motivacija za uspjeh</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Kako podržati svoje dijete u sportu</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2">1. Budite pozitivan uzor</h3>
                <p>
                  Djeca uče promatrajući svoje roditelje. Pokažite pozitivan stav prema sportu i fizičkoj aktivnosti, i
                  sami budite aktivni koliko možete.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2">2. Fokusirajte se na zabavu i učenje</h3>
                <p>
                  Naglašavajte važnost zabave, učenja novih vještina i timskog rada umjesto samo pobjeđivanja. Pitajte
                  dijete je li se zabavilo nakon treninga ili utakmice, a ne samo je li pobijedilo.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2">3. Pružite podršku, ne pritisak</h3>
                <p>
                  Budite tu za svoje dijete, ali izbjegavajte stvarati pritisak za postizanjem određenih rezultata.
                  Dopustite djetetu da razvije vlastitu motivaciju za sport.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2">4. Poštujte trenere i suce</h3>
                <p>
                  Pokažite poštovanje prema trenerima, sucima i drugim roditeljima. Vaše dijete će slijediti vaš
                  primjer.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Često postavljana pitanja</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2">Kada bi dijete trebalo početi sa sportom?</h3>
                <p>
                  Djeca mogu početi s organiziranim sportskim aktivnostima već od 3-4 godine, ali fokus treba biti na
                  zabavi i razvoju osnovnih motoričkih vještina. Strukturiraniji sportski programi prikladniji su za
                  djecu od 6-7 godina nadalje.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2">Koliko sportskih aktivnosti je previše?</h3>
                <p>
                  To ovisi o dobi djeteta, njegovim interesima i drugim obavezama. Važno je osigurati ravnotežu između
                  sporta, škole, odmora i slobodnog vremena. Obratite pažnju na znakove preopterećenosti kao što su
                  umor, pad interesa ili pad školskog uspjeha.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2">Što ako moje dijete želi odustati od sporta?</h3>
                <p>
                  Razgovarajte s djetetom o razlozima. Ako je riječ o privremenom gubitku interesa ili manjku
                  samopouzdanja, potaknite ga da izdrži još neko vrijeme. Međutim, ako dijete zaista ne uživa u tom
                  sportu, razmislite o promjeni aktivnosti. Važno je da sport ostane pozitivno iskustvo.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Kontaktirajte nas</h2>
            <p className="mb-4">Imate dodatna pitanja ili vam je potrebna pomoć? Naš tim je tu za vas.</p>
            <Button asChild>
              <Link href="/kontakt">Kontaktirajte nas</Link>
            </Button>
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-2">Roditelj si?</h3>
            <p className="mb-4">
              Pridruži se našoj zajednici roditelja i dobivaj redovite savjete, informacije o nadolazećim događajima i
              posebne ponude za sportske aktivnosti.
            </p>
            <Button className="w-full">Roditelji i djeca</Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Nadolazeći događaji za roditelje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-2 border-primary pl-4 pb-2">
                <p className="text-sm text-muted-foreground">15.05.2025.</p>
                <p className="font-medium">Radionica: Prehrana mladih sportaša</p>
                <p className="text-sm">Sportski centar Jarun, Zagreb</p>
              </div>
              <div className="border-l-2 border-primary pl-4 pb-2">
                <p className="text-sm text-muted-foreground">22.05.2025.</p>
                <p className="font-medium">Predavanje: Psihološka priprema djece za natjecanja</p>
                <p className="text-sm">Online webinar</p>
              </div>
              <div className="border-l-2 border-primary pl-4 pb-2">
                <p className="text-sm text-muted-foreground">05.06.2025.</p>
                <p className="font-medium">Obiteljski sportski dan</p>
                <p className="text-sm">Park Maksimir, Zagreb</p>
              </div>
              <Button variant="outline" className="w-full">
                Svi događaji
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Korisni resursi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="#" className="block hover:underline text-primary">
                Vodič za roditelje mladih sportaša
              </Link>
              <Link href="#" className="block hover:underline text-primary">
                Prehrana i hidratacija u sportu
              </Link>
              <Link href="#" className="block hover:underline text-primary">
                Prevencija sportskih ozljeda kod djece
              </Link>
              <Link href="#" className="block hover:underline text-primary">
                Kako razgovarati s trenerom vašeg djeteta
              </Link>
              <Link href="#" className="block hover:underline text-primary">
                Balansiranje sporta i škole
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
