"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { EyeIcon, EyeOffIcon, CheckCircle2 } from "lucide-react"

export default function RegistracijaPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    ime: "",
    prezime: "",
    email: "",
    password: "",
    confirmPassword: "",
    prihvacamUvjete: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.ime.trim()) {
      newErrors.ime = "Ime je obavezno"
    }

    if (!formData.prezime.trim()) {
      newErrors.prezime = "Prezime je obavezno"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email je obavezan"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Unesite ispravnu email adresu"
    }

    if (!formData.password) {
      newErrors.password = "Lozinka je obavezna"
    } else if (formData.password.length < 8) {
      newErrors.password = "Lozinka mora imati najmanje 8 znakova"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Lozinke se ne podudaraju"
    }

    if (!formData.prihvacamUvjete) {
      newErrors.prihvacamUvjete = "Morate prihvatiti uvjete korištenja"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate registration delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setSuccess(true)

    // Redirect to profile page after successful registration
    setTimeout(() => {
      router.push("/profil")
    }, 2000)
  }

  return (
    <div className="container flex items-center justify-center py-8">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Registracija</CardTitle>
          <CardDescription className="text-center">Kreirajte svoj račun za pristup ZagiSport platformi</CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <Alert className="mb-4 bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600">
                Registracija uspješna! Preusmjeravamo vas na vaš profil...
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="ime">Ime</Label>
                    <Input
                      id="ime"
                      name="ime"
                      placeholder="Ivan"
                      value={formData.ime}
                      onChange={handleChange}
                      className={errors.ime ? "border-red-500" : ""}
                    />
                    {errors.ime && <p className="text-red-500 text-xs mt-1">{errors.ime}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="prezime">Prezime</Label>
                    <Input
                      id="prezime"
                      name="prezime"
                      placeholder="Horvat"
                      value={formData.prezime}
                      onChange={handleChange}
                      className={errors.prezime ? "border-red-500" : ""}
                    />
                    {errors.prezime && <p className="text-red-500 text-xs mt-1">{errors.prezime}</p>}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ivan.horvat@primjer.hr"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Lozinka</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className={errors.password ? "border-red-500" : ""}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <EyeIcon className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="sr-only">{showPassword ? "Sakrij lozinku" : "Prikaži lozinku"}</span>
                    </Button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Potvrdi lozinku</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? "border-red-500" : ""}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="prihvacamUvjete"
                    name="prihvacamUvjete"
                    checked={formData.prihvacamUvjete}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        prihvacamUvjete: checked as boolean,
                      })
                    }
                  />
                  <label
                    htmlFor="prihvacamUvjete"
                    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                      errors.prihvacamUvjete ? "text-red-500" : ""
                    }`}
                  >
                    Prihvaćam{" "}
                    <Link href="/uvjeti-koristenja" className="text-primary hover:underline">
                      uvjete korištenja
                    </Link>{" "}
                    i{" "}
                    <Link href="/privatnost" className="text-primary hover:underline">
                      politiku privatnosti
                    </Link>
                  </label>
                </div>
                {errors.prihvacamUvjete && <p className="text-red-500 text-xs mt-1">{errors.prihvacamUvjete}</p>}
                <Button type="submit" className="w-full bg-primary" disabled={isLoading}>
                  {isLoading ? "Registracija u tijeku..." : "Registriraj se"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm text-muted-foreground mt-2">
            Već imate račun?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Prijavite se
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
