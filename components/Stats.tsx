"use client"

import React from "react"
import { motion } from "framer-motion"
import CountUp from "react-countup"

export default function Stats() {
  const stats = [
    { value: 1500, suffix: "+", label: "Restaurantes Activos" },
    { value: 99.9, suffix: "%", label: "Tiempo de Actividad" },
    { value: 24, suffix: "/7", label: "Soporte Técnico" },
    { value: 4.9, suffix: "★", label: "Calificación Promedio" },
  ]

  const [startCount, setStartCount] = React.useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.5 }}
      onViewportEnter={() => setStartCount(true)}
      className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16"
    >
      {stats.map((stat, i) => (
        <div key={i} className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
            {startCount ? (
              <CountUp
                start={0}
                end={stat.value}
                duration={2.5}
                decimals={stat.value % 1 !== 0 ? 1 : 0}
                suffix={stat.suffix}
                delay={i * 0.4} // retraso secuencial
              />
            ) : (
              0
            )}
          </div>
          <div className="text-muted-foreground font-medium">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  )
}
