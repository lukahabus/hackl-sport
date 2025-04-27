import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function UvjetiKoristenjaPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Uvjeti korištenja</h1>

        <div className="prose prose-slate max-w-none">
          <p className="text-lg mb-6">Posljednje ažuriranje: 27. travnja 2025.</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Prihvaćanje uvjeta</h2>
            <p>
              Dobrodošli na ZagiSport. Ovi Uvjeti korištenja ("Uvjeti") reguliraju vaš pristup i korištenje web
              aplikacije ZagiSport ("Usluga"), kojom upravlja ZagiSport ("mi", "nas" ili "naš").
            </p>
            <p>
              Pristupom ili korištenjem Usluge pristajete biti vezani ovim Uvjetima. Ako se ne slažete s bilo kojim
              dijelom uvjeta, tada nemate pravo pristupiti Usluzi.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Registracija korisnika</h2>
            <p>
              Da biste koristili određene značajke Usluge, možda ćete se morati registrirati za korisnički račun.
              Prilikom registracije morate pružiti točne, trenutne i potpune informacije. Odgovorni ste za održavanje
              povjerljivosti svojih podataka za prijavu, uključujući lozinku, i za sve aktivnosti koje se odvijaju pod
              vašim računom.
            </p>
            <p>
              Pristajete odmah obavijestiti ZagiSport o bilo kakvoj neovlaštenoj upotrebi vašeg korisničkog računa ili
              bilo kojem drugom kršenju sigurnosti. ZagiSport ne može i neće biti odgovoran za bilo kakav gubitak ili
              štetu koja proizlazi iz vašeg nepoštivanja ove odredbe.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Korištenje usluge</h2>
            <p>
              Usluga je namijenjena za pregled i upravljanje sportskim natjecanjima. Pristajete koristiti Uslugu samo za
              zakonite svrhe i na način koji ne krši prava drugih ili ne ograničava ili sprječava njihovo korištenje i
              uživanje Usluge.
            </p>
            <p>Zabranjeno je koristiti Uslugu za bilo koju od sljedećih aktivnosti:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Kršenje bilo kojeg primjenjivog zakona ili propisa</li>
              <li>Kršenje intelektualnog vlasništva ili drugih prava bilo koje osobe ili subjekta</li>
              <li>
                Prijenos virusa, trojanaca, crva, logičkih bombi ili drugog materijala koji je zlonamjeran ili
                tehnološki štetan
              </li>
              <li>Prikupljanje ili prikupljanje podataka ili osobnih informacija o drugim korisnicima</li>
              <li>Ometanje normalnog funkcioniranja Usluge</li>
              <li>Lažno predstavljanje svoje povezanosti s bilo kojom osobom ili subjektom</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Intelektualno vlasništvo</h2>
            <p>
              Usluga i njezin izvorni sadržaj, značajke i funkcionalnost vlasništvo su ZagiSport i zaštićeni su
              međunarodnim autorskim pravima, zaštitnim znakovima, patentima, poslovnim tajnama i drugim zakonima o
              intelektualnom vlasništvu ili vlasničkim pravima.
            </p>
            <p>
              Pristajete da nećete kopirati, modificirati, stvarati izvedena djela, javno prikazivati, javno izvoditi,
              ponovno objavljivati, preuzimati, pohranjivati ili prenositi bilo koji materijal s naše Usluge, osim ako
              to nije izričito dopušteno u ovim Uvjetima.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Korisnički sadržaj</h2>
            <p>
              Naša Usluga može vam omogućiti objavljivanje, povezivanje, pohranjivanje, dijeljenje i na drugi način
              stavljanje na raspolaganje određenih informacija, teksta, grafike, videozapisa ili drugih materijala
              ("Korisnički sadržaj"). Odgovorni ste za Korisnički sadržaj koji objavljujete na ili putem Usluge,
              uključujući njegovu zakonitost, pouzdanost i prikladnost.
            </p>
            <p>
              Objavljivanjem Korisničkog sadržaja na ili putem Usluge, dajete nam pravo i licencu za korištenje,
              izmjenu, javno izvođenje, javno prikazivanje, reprodukciju i distribuciju takvog sadržaja na i putem
              Usluge. Ova licenca nam omogućuje da učinimo vaš Korisnički sadržaj dostupnim drugim korisnicima Usluge,
              koji također mogu koristiti vaš Korisnički sadržaj u skladu s ovim Uvjetima.
            </p>
            <p>
              Izjavljujete i jamčite da: (i) Korisnički sadržaj je vaš ili imate pravo koristiti ga i dati nam prava i
              licence navedene u ovim Uvjetima, i (ii) objavljivanje vašeg Korisničkog sadržaja na ili putem Usluge ne
              krši prava privatnosti, prava javnosti, autorska prava, ugovorna prava ili bilo koja druga prava bilo koje
              osobe ili subjekta.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Odricanje od odgovornosti</h2>
            <p>
              Vaše korištenje Usluge je na vlastiti rizik. Usluga se pruža "kakva jest" i "kako je dostupna". Usluga se
              pruža bez jamstava bilo koje vrste, bilo izričitih ili impliciranih, uključujući, ali ne ograničavajući se
              na, implicirana jamstva utrživosti, prikladnosti za određenu svrhu, nekršenja ili tijeka poslovanja.
            </p>
            <p>
              ZagiSport ne jamči da će (i) Usluga ispuniti vaše specifične zahtjeve, (ii) Usluga biti neprekinuta,
              pravovremena, sigurna ili bez pogrešaka, (iii) rezultati koji se mogu dobiti korištenjem Usluge biti točni
              ili pouzdani, ili (iv) kvaliteta bilo kojih proizvoda, usluga, informacija ili drugog materijala kupljenog
              ili dobivenog od vas putem Usluge ispuniti vaša očekivanja.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Ograničenje odgovornosti</h2>
            <p>
              U najvećoj mjeri dopuštenoj zakonom, ZagiSport neće biti odgovoran za bilo kakve neizravne, slučajne,
              posebne, posljedične ili kaznene štete, ili bilo kakve gubitke profita ili prihoda, bez obzira jesu li
              nastali izravno ili neizravno, ili bilo kakve gubitke podataka, korištenja, dobre volje, ili druge
              nematerijalne gubitke, koji proizlaze iz (i) vašeg pristupa ili korištenja ili nemogućnosti pristupa ili
              korištenja Usluge; (ii) bilo kojeg ponašanja ili sadržaja bilo koje treće strane na Usluzi; (iii) bilo
              kojeg sadržaja dobivenog s Usluge; i (iv) neovlaštenog pristupa, korištenja ili izmjene vaših prijenosa
              ili sadržaja.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Izmjene uvjeta</h2>
            <p>
              Zadržavamo pravo, po vlastitom nahođenju, izmijeniti ili zamijeniti ove Uvjete u bilo kojem trenutku. Ako
              je revizija značajna, nastojat ćemo pružiti obavijest najmanje 30 dana prije stupanja na snagu bilo kojih
              novih uvjeta. Što predstavlja značajnu promjenu bit će određeno po našem vlastitom nahođenju.
            </p>
            <p>
              Nastavkom pristupa ili korištenja naše Usluge nakon što te revizije stupe na snagu, pristajete biti vezani
              revidiranim uvjetima. Ako se ne slažete s novim uvjetima, više niste ovlašteni koristiti Uslugu.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Kontaktirajte nas</h2>
            <p>Ako imate bilo kakvih pitanja o ovim Uvjetima, molimo vas da nas kontaktirate:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Putem e-maila: terms@zagisport.hr</li>
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
