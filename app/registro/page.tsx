"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function RegistroPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validaciones simples en cliente
    if (!formData.nombre || !formData.apellido || !formData.email || !formData.password) {
      setError("Por favor completa los campos obligatorios.")
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          telefono: formData.telefono,
          password: formData.password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data?.error || "Error en el servidor")
        setLoading(false)
        return
      }

      // Registro correcto -> redirigir al dashboard
      router.push("/dashboard")
    } catch (err) {
      console.error("Registro error:", err)
      setError("Error en el servidor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-20 px-4">
      <Card className="w-full max-w-lg p-8 rounded-2xl shadow-2xl border-2 border-border bg-card">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl text-foreground mb-1">Crea tu cuenta</CardTitle>
          <CardDescription className="text-muted-foreground">
            Regístrate para comenzar tu prueba gratuita y gestionar tu restaurante
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="flex-1 bg-input border-2 border-border focus:border-primary h-12 rounded-lg px-4"
                required
              />
              <Input
                name="apellido"
                placeholder="Apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="flex-1 bg-input border-2 border-border focus:border-primary h-12 rounded-lg px-4"
                required
              />
            </div>

            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-input border-2 border-border focus:border-primary h-12 rounded-lg px-4"
              required
            />

            <Input
              name="telefono"
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full bg-input border-2 border-border focus:border-primary h-12 rounded-lg px-4"
            />

            <Input
              name="password"
              type="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-input border-2 border-border focus:border-primary h-12 rounded-lg px-4"
              required
            />

            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirmar Contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-input border-2 border-border focus:border-primary h-12 rounded-lg px-4"
              required
            />

            {error && <p className="text-destructive text-sm">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 h-12 text-lg font-medium rounded-lg"
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrarse"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
