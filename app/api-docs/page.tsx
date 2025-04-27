import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "API Dokumentacija | ZagiSport",
  description: "Dokumentacija za ZagiSport API",
}

export default function ApiDocsPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">ZagiSport API Dokumentacija</h1>

      <section className="mb-10">
        <Card>
          <CardHeader>
            <CardTitle>Pregled</CardTitle>
            <CardDescription>
              ZagiSport API omogućuje pristup podacima o sportskim natjecanjima, lokacijama, sudionicima i rezultatima.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Osnovni URL: <code className="bg-muted px-1 py-0.5 rounded">https://api.zagisport.hr/v1</code>
            </p>

            <Alert className="mb-4">
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Napomena</AlertTitle>
              <AlertDescription>
                Svi zahtjevi moraju uključivati <code>Authorization</code> zaglavlje s važećim API ključem.
              </AlertDescription>
            </Alert>

            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Autentifikacija</h3>
              <p className="mb-2">Za pristup API-ju potreban je API ključ. Dodajte ga u zaglavlje svakog zahtjeva:</p>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code>Authorization: Bearer YOUR_API_KEY</code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Formati odgovora</h3>
              <p>Svi odgovori su u JSON formatu. Uspješni odgovori imaju status kod 200 OK.</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <Tabs defaultValue="natjecanja" className="mb-10">
        <TabsList className="mb-4">
          <TabsTrigger value="natjecanja">Natjecanja</TabsTrigger>
          <TabsTrigger value="lokacije">Lokacije</TabsTrigger>
          <TabsTrigger value="sudionici">Sudionici</TabsTrigger>
          <TabsTrigger value="rezultati">Rezultati</TabsTrigger>
          <TabsTrigger value="korisnici">Korisnici</TabsTrigger>
        </TabsList>

        <TabsContent value="natjecanja">
          <h2 className="text-2xl font-bold mb-4">Natjecanja API</h2>

          {/* GET /natjecanja */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Badge className="bg-green-600">GET</Badge>
                  <code>/natjecanja</code>
                </CardTitle>
              </div>
              <CardDescription>Dohvaća popis svih natjecanja</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="font-medium mb-2">Parametri upita</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <code>sport_id</code> (opcionalno) - Filtriranje po sportu
                  </li>
                  <li>
                    <code>status</code> (opcionalno) - Filtriranje po statusu (aktivno, završeno)
                  </li>
                  <li>
                    <code>page</code> (opcionalno, zadano: 1) - Broj stranice
                  </li>
                  <li>
                    <code>limit</code> (opcionalno, zadano: 20) - Broj rezultata po stranici
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Primjer zahtjeva</h4>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>GET /natjecanja?sport_id=1&status=aktivno&page=1&limit=10</code>
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-2">Primjer odgovora</h4>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>{`{
  "data": [
    {
      "id": "1",
      "naziv": "Zagrebački plivački miting",
      "sportId": "1",
      "datum": "2023-06-15T10:00:00Z",
      "lokacija": "Bazeni Utrina",
      "opis": "Godišnji plivački miting za mlade plivače",
      "status": "aktivno",
      "created_at": "2023-01-15T08:30:00Z",
      "updated_at": "2023-01-15T08:30:00Z"
    },
    // ... više natjecanja
  ],
  "meta": {
    "current_page": 1,
    "total_pages": 5,
    "total_count": 48,
    "limit": 10
  }
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* GET /natjecanja/{id} */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Badge className="bg-green-600">GET</Badge>
                  <code>/natjecanja/{"{id}"}</code>
                </CardTitle>
              </div>
              <CardDescription>Dohvaća detalje određenog natjecanja</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="font-medium mb-2">Parametri puta</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <code>id</code> (obavezno) - ID natjecanja
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Primjer zahtjeva</h4>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>GET /natjecanja/1</code>
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-2">Primjer odgovora</h4>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>{`{
  "id": "1",
  "naziv": "Zagrebački plivački miting",
  "sportId": "1",
  "datum": "2023-06-15T10:00:00Z",
  "lokacija": "Bazeni Utrina",
  "opis": "Godišnji plivački miting za mlade plivače",
  "status": "aktivno",
  "koordinate": {
    "lat": 45.7789,
    "lng": 15.9941
  },
  "sudionici": [
    {
      "id": "101",
      "ime": "Ivan Horvat",
      "kategorija": "Juniori"
    },
    // ... više sudionika
  ],
  "rezultati": [
    {
      "id": "201",
      "sudionikId": "101",
      "poredak": 1,
      "rezultat": "00:52:15",
      "bodovi": 95
    },
    // ... više rezultata
  ],
  "created_at": "2023-01-15T08:30:00Z",
  "updated_at": "2023-01-15T08:30:00Z"
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* POST /natjecanja */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Badge className="bg-blue-600">POST</Badge>
                  <code>/natjecanja</code>
                </CardTitle>
              </div>
              <CardDescription>Stvara novo natjecanje</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="font-medium mb-2">Tijelo zahtjeva</h4>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>{`{
  "naziv": "Novi plivački miting",
  "sportId": "1",
  "datum": "2023-08-20T09:00:00Z",
  "lokacija": "Bazeni Mladost",
  "opis": "Natjecanje za mlade plivače",
  "koordinate": {
    "lat": 45.7823,
    "lng": 15.9721
  }
}`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-2">Primjer odgovora</h4>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>{`{
  "id": "50",
  "naziv": "Novi plivački miting",
  "sportId": "1",
  "datum": "2023-08-20T09:00:00Z",
  "lokacija": "Bazeni Mladost",
  "opis": "Natjecanje za mlade plivače",
  "status": "aktivno",
  "koordinate": {
    "lat": 45.7823,
    "lng": 15.9721
  },
  "created_at": "2023-05-10T14:22:00Z",
  "updated_at": "2023-05-10T14:22:00Z"
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* PUT /natjecanja/{id} */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Badge className="bg-yellow-600">PUT</Badge>
                  <code>/natjecanja/{"{id}"}</code>
                </CardTitle>
              </div>
              <CardDescription>Ažurira postojeće natjecanje</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="font-medium mb-2">Parametri puta</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <code>id</code> (obavezno) - ID natjecanja
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Tijelo zahtjeva</h4>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>{`{
  "naziv": "Ažurirani plivački miting",
  "datum": "2023-08-21T10:00:00Z",
  "opis": "Ažurirani opis natjecanja"
}`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-2">Primjer odgovora</h4>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>{`{
  "id": "50",
  "naziv": "Ažurirani plivački miting",
  "sportId": "1",
  "datum": "2023-08-21T10:00:00Z",
  "lokacija": "Bazeni Mladost",
  "opis": "Ažurirani opis natjecanja",
  "status": "aktivno",
  "koordinate": {
    "lat": 45.7823,
    "lng": 15.9721
  },
  "created_at": "2023-05-10T14:22:00Z",
  "updated_at": "2023-05-10T15:30:00Z"
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* DELETE /natjecanja/{id} */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Badge className="bg-red-600">DELETE</Badge>
                  <code>/natjecanja/{"{id}"}</code>
                </CardTitle>
              </div>
              <CardDescription>Briše natjecanje</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="font-medium mb-2">Parametri puta</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <code>id</code> (obavezno) - ID natjecanja
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Primjer zahtjeva</h4>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>DELETE /natjecanja/50</code>
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-2">Primjer odgovora</h4>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>{`{
  "success": true,
  "message": "Natjecanje uspješno obrisano"
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lokacije">
          <h2 className="text-2xl font-bold mb-4">Lokacije API</h2>

          {/* GET /lokacije */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Badge className="bg-green-600">GET</Badge>
                  <code>/lokacije</code>
                </CardTitle>
              </div>
              <CardDescription>Dohvaća popis svih lokacija</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="font-medium mb-2">Parametri upita</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <code>naziv</code> (opcionalno) - Filtriranje po nazivu
                  </li>
                  <li>
                    <code>page</code> (opcionalno, zadano: 1) - Broj stranice
                  </li>
                  <li>
                    <code>limit</code> (opcionalno, zadano: 20) - Broj rezultata po stranici
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Primjer zahtjeva</h4>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>GET /lokacije?naziv=bazen</code>
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-2">Primjer odgovora</h4>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>{`{
  "data": [
    {
      "id": "1",
      "naziv": "Bazeni Utrina",
      "adresa": "Kombolova ul. 4a, 10000, Zagreb",
      "koordinate": {
        "lat": 45.7789,
        "lng": 15.9941
      },
      "tip": "bazen",
      "kapacitet": 500,
      "created_at": "2023-01-10T10:00:00Z",
      "updated_at": "2023-01-10T10:00:00Z"
    },
    {
      "id": "2",
      "naziv": "Bazeni Mladost",
      "adresa": "Jarunska ul. 5, 10000, Zagreb",
      "koordinate": {
        "lat": 45.7823,
        "lng": 15.9721
      },
      "tip": "bazen",
      "kapacitet": 800,
      "created_at": "2023-01-10T10:05:00Z",
      "updated_at": "2023-01-10T10:05:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "total_pages": 1,
    "total_count": 2,
    "limit": 20
  }
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* GET /lokacije/{id} */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Badge className="bg-green-600">GET</Badge>
                  <code>/lokacije/{"{id}"}</code>
                </CardTitle>
              </div>
              <CardDescription>Dohvaća detalje određene lokacije</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="font-medium mb-2">Parametri puta</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <code>id</code> (obavezno) - ID lokacije
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Primjer zahtjeva</h4>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>GET /lokacije/1</code>
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-2">Primjer odgovora</h4>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>{`{
  "id": "1",
  "naziv": "Bazeni Utrina",
  "adresa": "Kombolova ul. 4a, 10000, Zagreb",
  "koordinate": {
    "lat": 45.7789,
    "lng": 15.9941
  },
  "tip": "bazen",
  "kapacitet": 500,
  "dodatne_informacije": {
    "parking": true,
    "pristup_invalidima": true,
    "javni_prijevoz": ["tramvaj 6", "tramvaj 7", "autobus 221"]
  },
  "nadolazeca_natjecanja": [
    {
      "id": "1",
      "naziv": "Zagrebački plivački miting",
      "datum": "2023-06-15T10:00:00Z"
    },
    {
      "id": "5",
      "naziv": "Školsko natjecanje u plivanju",
      "datum": "2023-07-10T09:00:00Z"
    }
  ],
  "created_at": "2023-01-10T10:00:00Z",
  "updated_at": "2023-01-10T10:00:00Z"
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sudionici">
          <h2 className="text-2xl font-bold mb-4">Sudionici API</h2>

          {/* GET /sudionici */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Badge className="bg-green-600">GET</Badge>
                  <code>/sudionici</code>
                </CardTitle>
              </div>
              <CardDescription>Dohvaća popis svih sudionika</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="font-medium mb-2">Parametri upita</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <code>ime</code> (opcionalno) - Filtriranje po imenu
                  </li>
                  <li>
                    <code>kategorija</code> (opcionalno) - Filtriranje po kategoriji
                  </li>
                  <li>
                    <code>natjecanje_id</code> (opcionalno) - Filtriranje po natjecanju
                  </li>
                  <li>
                    <code>page</code> (opcionalno, zadano: 1) - Broj stranice
                  </li>
                  <li>
                    <code>limit</code> (opcionalno, zadano: 20) - Broj rezultata po stranici
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Primjer zahtjeva</h4>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>GET /sudionici?natjecanje_id=1</code>
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-2">Primjer odgovora</h4>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>{`{
  "data": [
    {
      "id": "101",
      "ime": "Ivan Horvat",
      "drzava": "Hrvatska",
      "kategorija": "Juniori",
      "created_at": "2023-01-20T09:15:00Z",
      "updated_at": "2023-01-20T09:15:00Z"
    },
    {
      "id": "102",
      "ime": "Ana Kovač",
      "drzava": "Hrvatska",
      "kategorija": "Juniorke",
      "created_at": "2023-01-20T09:20:00Z",
      "updated_at": "2023-01-20T09:20:00Z"
    }
    // ... više sudionika
  ],
  "meta": {
    "current_page": 1,
    "total_pages": 3,
    "total_count": 45,
    "limit": 20
  }
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* GET /sudionici/{id} */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Badge className="bg-green-600">GET</Badge>
                  <code>/sudionici/{"{id}"}</code>
                </CardTitle>
              </div>
              <CardDescription>Dohvaća detalje određenog sudionika</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="font-medium mb-2">Parametri puta</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <code>id</code> (obavezno) - ID sudionika
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Primjer zahtjeva</h4>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>GET /sudionici/101</code>
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-2">Primjer odgovora</h4>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>{`{
  "id": "101",
  "ime": "Ivan Horvat",
  "drzava": "Hrvatska",
  "kategorija": "Juniori",
  "natjecanja": [
    {
      "id": "1",
      "naziv": "Zagrebački plivački miting",
      "datum": "2023-06-15T10:00:00Z",
      "rezultat": {
        "poredak": 1,
        "rezultat": "00:52:15",
        "bodovi": 95
      }
    },
    {
      "id": "8",
      "naziv": "Regionalno natjecanje u plivanju",
      "datum": "2023-04-20T11:00:00Z",
      "rezultat": {
        "poredak": 2,
        "rezultat": "00:53:05",
        "bodovi": 88
      }
    }
  ],
  "created_at": "2023-01-20T09:15:00Z",
  "updated_at": "2023-01-20T09:15:00Z"
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rezultati">
          <h2 className="text-2xl font-bold mb-4">Rezultati API</h2>

          {/* GET /rezultati */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Badge className="bg-green-600">GET</Badge>
                  <code>/rezultati</code>
                </CardTitle>
              </div>
              <CardDescription>Dohvaća popis svih rezultata</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="font-medium mb-2">Parametri upita</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <code>natjecanje_id</code> (opcionalno) - Filtriranje po natjecanju
                  </li>
                  <li>
                    <code>sudionik_id</code> (opcionalno) - Filtriranje po sudioniku
                  </li>
                  <li>
                    <code>page</code> (opcionalno, zadano: 1) - Broj stranice
                  </li>
                  <li>
                    <code>limit</code> (opcionalno, zadano: 20) - Broj rezultata po stranici
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Primjer zahtjeva</h4>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>GET /rezultati?natjecanje_id=1</code>
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-2">Primjer odgovora</h4>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>{`{
  "data": [
    {
      "id": "201",
      "natjecanje_id": "1",
      "sudionik_id": "101",
      "poredak": 1,
      "rezultat": "00:52:15",
      "bodovi": 95,
      "created_at": "2023-06-15T14:30:00Z",
      "updated_at": "2023-06-15T14:30:00Z"
    },
    {
      "id": "202",
      "natjecanje_id": "1",
      "sudionik_id": "102",
      "poredak": 2,
      "rezultat": "00:53:22",
      "bodovi": 90,
      "created_at": "2023-06-15T14:35:00Z",
      "updated_at": "2023-06-15T14:35:00Z"
    }
    // ... više rezultata
  ],
  "meta": {
    "current_page": 1,
    "total_pages": 2,
    "total_count": 25,
    "limit": 20
  }
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* POST /rezultati */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Badge className="bg-blue-600">POST</Badge>
                  <code>/rezultati</code>
                </CardTitle>
              </div>
              <CardDescription>Dodaje novi rezultat</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="font-medium mb-2">Tijelo zahtjeva</h4>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>{`{
  "natjecanje_id": "1",
  "sudionik_id": "103",
  "poredak": 3,
  "rezultat": "00:54:10",
  "bodovi": 85
}`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-2">Primjer odgovora</h4>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>{`{
  "id": "203",
  "natjecanje_id": "1",
  "sudionik_id": "103",
  "poredak": 3,
  "rezultat": "00:54:10",
  "bodovi": 85,
  "created_at": "2023-06-15T15:10:00Z",
  "updated_at": "2023-06-15T15:10:00Z"
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="korisnici">
          <h2 className="text-2xl font-bold mb-4">Korisnici API</h2>

          {/* POST /auth/login */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Badge className="bg-blue-600">POST</Badge>
                  <code>/auth/login</code>
                </CardTitle>
              </div>
              <CardDescription>Autentifikacija korisnika</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="font-medium mb-2">Tijelo zahtjeva</h4>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>{`{
  "email": "korisnik@example.com",
  "password": "lozinka123"
}`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-2">Primjer odgovora</h4>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>{`{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "ime": "Marko",
    "prezime": "Marković",
    "email": "korisnik@example.com",
    "uloga": "korisnik"
  }
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* GET /korisnici/profil */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Badge className="bg-green-600">GET</Badge>
                  <code>/korisnici/profil</code>
                </CardTitle>
              </div>
              <CardDescription>Dohvaća profil trenutnog korisnika</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="font-medium mb-2">Zaglavlja</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <code>Authorization</code> (obavezno) - Bearer token
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Primjer zahtjeva</h4>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>GET /korisnici/profil</code>
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-2">Primjer odgovora</h4>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>{`{
  "id": "1",
  "ime": "Marko",
  "prezime": "Marković",
  "email": "korisnik@example.com",
  "uloga": "korisnik",
  "prijavljene_natjecanja": [
    {
      "id": "1",
      "naziv": "Zagrebački plivački miting",
      "datum": "2023-06-15T10:00:00Z"
    }
  ],
  "created_at": "2023-01-05T12:30:00Z",
  "updated_at": "2023-01-05T12:30:00Z"
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Kodovi grešaka</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-2">Status kod</th>
                    <th className="text-left pb-2">Opis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">400 Bad Request</td>
                    <td>Neispravan zahtjev. Provjerite parametre i tijelo zahtjeva.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">401 Unauthorized</td>
                    <td>Neuspješna autentifikacija. Provjerite API ključ ili token.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">403 Forbidden</td>
                    <td>Nemate dozvolu za pristup ovom resursu.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">404 Not Found</td>
                    <td>Traženi resurs nije pronađen.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">422 Unprocessable Entity</td>
                    <td>Validacija nije uspjela. Provjerite format podataka.</td>
                  </tr>
                  <tr>
                    <td className="py-2">500 Internal Server Error</td>
                    <td>Došlo je do pogreške na poslužitelju. Pokušajte ponovno kasnije.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Ograničenja API-ja</h2>
        <Card>
          <CardContent className="pt-6">
            <ul className="list-disc pl-5 space-y-2">
              <li>Maksimalno 100 zahtjeva po minuti po API ključu</li>
              <li>Maksimalno 1000 zahtjeva po satu po API ključu</li>
              <li>Maksimalna veličina zahtjeva: 10 MB</li>
              <li>Maksimalni broj rezultata po stranici: 100</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
