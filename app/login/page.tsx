"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log("Respuesta login:", data);

    if (!res.ok) {
      setError(data.error || "Error al iniciar sesión");
      setLoading(false);
      return;
    }

    console.log("✅ Login correcto, redirigiendo al dashboard...");
    
    // Guardar token
    localStorage.setItem("token", data.token);

    // Redirigir
    window.location.href = "/dashboard"; // <- fuerza la navegación
  } catch (err) {
    console.error(err);
    setError("Error en el servidor");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl border-2 border-border bg-card">
        <h2 className="text-2xl text-foreground font-bold mb-6 text-center">
          Inicia Sesión
        </h2>
        <div className="space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-input border-2 border-border focus:border-primary h-12 rounded-lg px-4"
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-input border-2 border-border focus:border-primary h-12 rounded-lg px-4"
            required
          />
          {error && <p className="text-destructive text-sm">{error}</p>}
          <Button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 h-12 text-lg font-medium"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </Button>
        </div>
      </div>
    </div>
  );
}
