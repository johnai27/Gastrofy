"use client"

import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="text-center py-20">
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl font-bold mb-4"
      >
        Plataforma #1 en Gestión Gastronómica
      </motion.h1>

      <motion.h2
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
        className="text-3xl font-semibold mb-4"
      >
        Gestiona tu restaurante con Gastrofy
      </motion.h2>

      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        className="text-lg text-muted-foreground max-w-2xl mx-auto"
      >
        La plataforma integral que necesitas para administrar menús, inventario, personal y finanzas. 
        Optimiza tu restaurante y aumenta tus ganancias con herramientas diseñadas para el éxito gastronómico.
      </motion.p>
    </section>
  )
}
