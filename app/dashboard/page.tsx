"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();

  // Aquí en el futuro puedes validar el token (si no existe, redirige al login)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-foreground mb-6">
        Bienvenido a tu Dashboard 🚀
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Aquí podrás gestionar tu restaurante con Gastrofy.
      </p>
      <Button
        onClick={handleLogout}
        className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
      >
        Cerrar sesión
      </Button>
    </div>
  );
}
