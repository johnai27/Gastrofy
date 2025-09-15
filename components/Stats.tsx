"use client"
import CountUp from "react-countup"
import FadeInSection from "@/components/FadeInSection"

export default function Stats() {
  const stats = [
    { value: 1500, suffix: "+", label: "Restaurantes Activos" },
    { value: 99.9, suffix: "%", label: "Tiempo de Actividad" },
    { value: 24, suffix: "/7", label: "Soporte Técnico" },
    { value: 4.9, suffix: "★", label: "Calificación Promedio" },
  ]

  return (
    <FadeInSection>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              <CountUp
                start={0}
                end={stat.value}
                duration={2.5}
                decimals={stat.value % 1 !== 0 ? 1 : 0}
                suffix={stat.suffix}
              />
            </div>
            <div className="text-muted-foreground font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </FadeInSection>
  )
}
