"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import FadeInSection from "@/components/FadeInSection"
import Stats from "@/components/Stats"
import MenuDigitalDemo from "@/components/MenuDigitalDemo"
import GestionPersonalDemo from "@/components/GestionPersonalDemo"
import GestionInventarioDemo from "@/components/GestionInventarioDemo"
import ControlFinancieroDemo from "@/components/ControlFinancieroDemo"
import Link from "next/link";
import {
  ChefHat,
  Users,
  Package,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Star,
  CheckCircle,
  Award,
  Clock,
  Shield,
} from "lucide-react"

export default function GastrofyLanding() {
  const [activeDemo, setActiveDemo] = useState<null | "menu" | "personal" | "inventario" | "financiero">(null)

  if (activeDemo === "menu") return <MenuDigitalDemo onBack={() => setActiveDemo(null)} />
  if (activeDemo === "personal") return <GestionPersonalDemo onBack={() => setActiveDemo(null)} />
  if (activeDemo === "inventario") return <GestionInventarioDemo onBack={() => setActiveDemo(null)} />
  if (activeDemo === "financiero") return <ControlFinancieroDemo onBack={() => setActiveDemo(null)} />

  
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="relative">
                <ChefHat className="h-10 w-10 text-primary" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full"></div>
              </div>
              <span className="text-3xl font-bold text-foreground tracking-tight">Gastrofy</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#inicio" className="text-foreground hover:text-primary transition-colors font-medium">Inicio</a>
              <a href="#servicios" className="text-foreground hover:text-primary transition-colors font-medium">Servicios</a>
              <a href="#nosotros" className="text-foreground hover:text-primary transition-colors font-medium">Nosotros</a>
              <a href="#contacto" className="text-foreground hover:text-primary transition-colors font-medium">Contacto</a>
              
              {/* Botón Registrate */}
              <Link href="/registro">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-2">
                  Registrate
                </Button>
              </Link>

              {/* Botón Login */}
              <Link href="/login">
                <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-2">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <FadeInSection>
        <section id="inicio" className="relative py-24 lg:py-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-muted"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,107,53,0.1),transparent_50%)] bg-[radial-gradient(circle_at_70%_80%,rgba(251,191,36,0.1),transparent_50%)]"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Award className="h-4 w-4" /> Plataforma #1 en Gestión Gastronómica
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 text-balance leading-tight">
              Gestiona tu restaurante con <span className="text-primary">Gastrofy</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto text-pretty leading-relaxed">
              La plataforma integral que necesitas para administrar menús, inventario, personal y finanzas. Optimiza tu
              restaurante y aumenta tus ganancias con herramientas diseñadas para el éxito gastronómico.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link href="/registro">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-4 text-lg">
                Prueba Gratuita 30 Días
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-lg"><a href="#servicios">
                Ver Demo en Vivo </a>
              </Button>
            </div>
            <Stats />
          </div>
        </section>
      </FadeInSection>

      {/* Services Section */}
      <FadeInSection>
        <section id="servicios" className="py-24 bg-card relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-transparent"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Shield className="h-4 w-4" /> Soluciones Completas
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">Nuestros Servicios</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Todo lo que necesitas para llevar tu restaurante al siguiente nivel con tecnología de vanguardia
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Menú Digital */}
              <Card onClick={() => setActiveDemo("menu")} className="cursor-pointer bg-background border-2 border-border hover:border-primary/50 hover:shadow-2xl transition-all duration-300 group">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <ChefHat className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-foreground text-xl mb-2">Menú Digital</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base leading-relaxed">
                    Crea y gestiona menús digitales interactivos. Actualiza precios y disponibilidad en tiempo real con análisis de popularidad.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Gestión de Inventario */}
              <Card onClick={() => setActiveDemo("inventario")} className="cursor-pointer bg-background border-2 border-border hover:border-primary/50 hover:shadow-2xl transition-all duration-300 group">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Package className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle className="text-foreground text-xl mb-2">Gestión de Inventario</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base leading-relaxed">
                    Controla tu stock, recibe alertas de productos bajos y optimiza tus compras automáticamente con IA predictiva.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Gestión de Personal */}
              <Card onClick={() => setActiveDemo("personal")} className="cursor-pointer bg-background border-2 border-border hover:border-primary/50 hover:shadow-2xl transition-all duration-300 group">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-foreground text-xl mb-2">Gestión de Personal</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base leading-relaxed">
                    Administra horarios, turnos y rendimiento de tu equipo desde una sola plataforma con métricas avanzadas.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Control Financiero */}
              <Card onClick={() => setActiveDemo("financiero")} className="cursor-pointer bg-background border-2 border-border hover:border-primary/50 hover:shadow-2xl transition-all duration-300 group">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-foreground text-xl mb-2">Control Financiero</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base leading-relaxed">
                    Monitorea ingresos, gastos y rentabilidad con reportes detallados y análisis predictivos en tiempo real.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* About Us Section */}
<FadeInSection>
  <section id="nosotros" className="py-24 bg-background">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Texto de Nosotros */}
        <div>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Clock className="h-4 w-4" />
            Más de 5 años de experiencia
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 text-balance">Acerca de Nosotros</h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            En Gastrofy, entendemos los desafíos únicos que enfrentan los restaurantes modernos. Nuestra misión es
            simplificar la gestión gastronómica mediante tecnología innovadora y fácil de usar que impulse el
            crecimiento de tu negocio.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <span className="text-foreground font-medium text-lg">
                Más de 1,500 restaurantes confían en nosotros
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-secondary" />
              </div>
              <span className="text-foreground font-medium text-lg">Soporte 24/7 especializado en gastronomía</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-accent" />
              </div>
              <span className="text-foreground font-medium text-lg">
                Actualizaciones constantes basadas en feedback
              </span>
            </div>
          </div>
        </div>

        {/* Testimonio */}
        <div className="relative">
          <div className="bg-gradient-to-br from-card to-background rounded-3xl p-10 shadow-2xl border-2 border-border">
            {/* Estrellas */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex -space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-6 w-6 text-secondary fill-current" />
                ))}
              </div>
              <span className="text-foreground font-bold text-xl">4.9/5 estrellas</span>
            </div>

            {/* Texto del Testimonio */}
            <blockquote className="text-foreground text-lg italic mb-6 leading-relaxed">
              "Gastrofy transformó completamente la manera en que gestionamos nuestro restaurante. Ahora tenemos
              control total sobre nuestras operaciones y hemos aumentado nuestros ingresos en un 35%."
            </blockquote>

            {/* Información de la persona */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-lg">MG</span>
              </div>
              <div>
                <cite className="text-foreground font-semibold text-lg not-italic">María González</cite>
                <p className="text-muted-foreground">Chef Propietaria, Restaurante Sabores</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</FadeInSection>


      {/* Contact Section */}
     <FadeInSection>
{/* Contact Section */}
<section id="contacto" className="py-24 bg-card">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-20">
      <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
        Contáctanos
      </h2>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
        ¿Listo para revolucionar tu restaurante? Hablemos sobre cómo Gastrofy puede transformar tu negocio.
      </p>
    </div>

    <div className="grid lg:grid-cols-2 gap-16 items-start">
      {/* Información de Contacto */}
      <div className="space-y-10">
        <h3 className="text-3xl font-bold text-foreground mb-6">Información de Contacto</h3>

        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <div>
            <p className="font-bold text-foreground text-lg">Email</p>
            <p className="text-muted-foreground text-lg">contacto@gastrofy.com</p>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center shrink-0">
            <Phone className="h-8 w-8 text-secondary" />
          </div>
          <div>
            <p className="font-bold text-foreground text-lg">Teléfono</p>
            <p className="text-muted-foreground text-lg">+1 (555) 123-4567</p>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center shrink-0">
            <MapPin className="h-8 w-8 text-accent" />
          </div>
          <div>
            <p className="font-bold text-foreground text-lg">Oficina</p>
            <p className="text-muted-foreground text-lg">123 Calle Gastronómica, Ciudad</p>
          </div>
        </div>
      </div>

{/* Formulario de Contacto */}
<Card className="bg-background border-2 border-border shadow-2xl p-8 rounded-2xl">
  <CardHeader className="pb-6 text-center lg:text-left">
    <CardTitle className="text-foreground text-2xl">Envíanos un Mensaje</CardTitle>
    <CardDescription className="text-lg">
      Completa el formulario y nos pondremos en contacto contigo en menos de 24 horas.
    </CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    {/* Nombre y Apellido */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <input
        placeholder="Nombre"
        className="w-full bg-input border-2 border-border focus:border-primary h-12 rounded-lg px-4"
      />
      <input
        placeholder="Apellido"
        className="w-full bg-input border-2 border-border focus:border-primary h-12 rounded-lg px-4"
      />
    </div>

    {/* Email */}
    <input
      placeholder="Email"
      type="email"
      className="w-full bg-input border-2 border-border focus:border-primary h-12 rounded-lg px-4"
    />

    {/* Teléfono */}
    <input
      placeholder="Teléfono"
      className="w-full bg-input border-2 border-border focus:border-primary h-12 rounded-lg px-4"
    />

    {/* Mensaje (textarea) */}
    <textarea
      placeholder="Cuéntanos sobre tu restaurante y cómo podemos ayudarte..."
      className="w-full bg-input border-2 border-border focus:border-primary min-h-[160px] resize-none rounded-lg px-4 py-2"
    />

    {/* Botón */}
    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 h-12 text-lg font-medium rounded-lg">
      Enviar Mensaje
    </Button>
  </CardContent>
</Card>



    </div>
  </div>
</section>

</FadeInSection>


      {/* Footer */}
      <FadeInSection>
  <footer className="bg-foreground text-background py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-12">
        {/* Logo + descripción */}
        <div className="col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <ChefHat className="h-10 w-10 text-primary" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full"></div>
            </div>
            <span className="text-3xl font-bold">Gastrofy</span>
          </div>
          <p className="text-background/80 mb-6 text-lg leading-relaxed">
            La plataforma integral para la gestión moderna de restaurantes. Simplificamos tus operaciones para que
            te enfoques en lo que más importa: crear experiencias gastronómicas excepcionales.
          </p>
        </div>

        {/* Enlaces Rápidos */}
        <div>
          <h4 className="font-bold mb-6 text-lg">Enlaces Rápidos</h4>
          <ul className="space-y-3 text-background/80">
            <li><a href="#inicio" className="hover:text-primary transition-colors text-base">Inicio</a></li>
            <li><a href="#servicios" className="hover:text-primary transition-colors text-base">Servicios</a></li>
            <li><a href="#nosotros" className="hover:text-primary transition-colors text-base">Nosotros</a></li>
            <li><a href="#contacto" className="hover:text-primary transition-colors text-base">Contacto</a></li>
          </ul>
        </div>

        {/* Soporte */}
        <div>
          <h4 className="font-bold mb-6 text-lg">Soporte</h4>
          <ul className="space-y-3 text-background/80">
            <li><a href="#" className="hover:text-primary transition-colors text-base">Centro de Ayuda</a></li>
            <li><a href="#" className="hover:text-primary transition-colors text-base">Documentación</a></li>
            <li><a href="#" className="hover:text-primary transition-colors text-base">API</a></li>
            <li><a href="#" className="hover:text-primary transition-colors text-base">Estado del Servicio</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/20 mt-12 pt-8 text-center">
        <p className="text-background/60 text-lg">© 2024 Gastrofy. Todos los derechos reservados a JhonDev.</p>
      </div>
    </div>
  </footer>
</FadeInSection>

    </div>
  )
}
