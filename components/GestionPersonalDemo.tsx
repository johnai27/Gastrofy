"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Users } from "lucide-react"

interface Employee {
  id: number
  name: string
  role: string
  schedule: string
  shift: string
}

export default function GestionPersonalDemo({ onBack }: { onBack?: () => void }) {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: "María González", role: "Chef", schedule: "9:00-17:00", shift: "Mañana" },
    { id: 2, name: "Carlos Pérez", role: "Mesero", schedule: "14:00-22:00", shift: "Tarde" },
    { id: 3, name: "Lucía Torres", role: "Cajero", schedule: "12:00-20:00", shift: "Tarde" },
  ])

  const [editingId, setEditingId] = useState<number | null>(null)
  const [newEmployee, setNewEmployee] = useState<Employee>({ id: 0, name: "", role: "", schedule: "", shift: "" })

  const handleSaveEdit = (id: number, updated: Employee) => {
    setEmployees(employees.map((e) => (e.id === id ? updated : e)))
    setEditingId(null)
  }

  const handleAddNew = () => {
    if (!newEmployee.name || !newEmployee.role) return
    const nextId = Math.max(...employees.map((e) => e.id)) + 1
    setEmployees([...employees, { ...newEmployee, id: nextId }])
    setNewEmployee({ id: 0, name: "", role: "", schedule: "", shift: "" })
  }

  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Button onClick={onBack} className="mb-8">
          ← Volver a Gastrofy
        </Button>

        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">
          Demo: Gestión de Personal
        </h1>
        <p className="text-muted-foreground text-lg text-center mb-12 max-w-3xl mx-auto leading-relaxed">
          Administra horarios, turnos y rendimiento de tu equipo desde una sola plataforma con métricas avanzadas.
        </p>

        {/* Formulario nuevo empleado */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <input
            type="text"
            placeholder="Nombre"
            value={newEmployee.name}
            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
            className="border px-3 py-2 rounded-lg w-48"
          />
          <input
            type="text"
            placeholder="Rol"
            value={newEmployee.role}
            onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
            className="border px-3 py-2 rounded-lg w-48"
          />
          <input
            type="text"
            placeholder="Horario"
            value={newEmployee.schedule}
            onChange={(e) => setNewEmployee({ ...newEmployee, schedule: e.target.value })}
            className="border px-3 py-2 rounded-lg w-32"
          />
          <input
            type="text"
            placeholder="Turno"
            value={newEmployee.shift}
            onChange={(e) => setNewEmployee({ ...newEmployee, shift: e.target.value })}
            className="border px-3 py-2 rounded-lg w-32"
          />
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
            onClick={handleAddNew}
          >
            + Agregar Empleado
          </Button>
        </div>

        {/* Lista de empleados */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {employees.map((emp) => (
            <Card key={emp.id} className="bg-card border-2 border-border hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4 text-center">
                <div className="mx-auto w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                {editingId === emp.id ? (
                  <input
                    type="text"
                    value={emp.name}
                    onChange={(e) => setEmployees(employees.map((i) => i.id === emp.id ? { ...i, name: e.target.value } : i))}
                    className="text-foreground text-xl font-bold text-center w-full border-b border-secondary focus:outline-none"
                  />
                ) : (
                  <CardTitle className="text-foreground text-xl">{emp.name}</CardTitle>
                )}
              </CardHeader>
              <CardContent className="text-center space-y-2">
                {editingId === emp.id ? (
                  <>
                    <input
                      type="text"
                      value={emp.role}
                      onChange={(e) => setEmployees(employees.map((i) => i.id === emp.id ? { ...i, role: e.target.value } : i))}
                      className="border px-2 py-1 rounded-lg w-40 text-center"
                    />
                    <input
                      type="text"
                      value={emp.schedule}
                      onChange={(e) => setEmployees(employees.map((i) => i.id === emp.id ? { ...i, schedule: e.target.value } : i))}
                      className="border px-2 py-1 rounded-lg w-32 text-center"
                    />
                    <input
                      type="text"
                      value={emp.shift}
                      onChange={(e) => setEmployees(employees.map((i) => i.id === emp.id ? { ...i, shift: e.target.value } : i))}
                      className="border px-2 py-1 rounded-lg w-32 text-center"
                    />
                  </>
                ) : (
                  <>
                    <CardDescription className="text-muted-foreground">Rol: {emp.role}</CardDescription>
                    <CardDescription className="text-muted-foreground">Horario: {emp.schedule}</CardDescription>
                    <CardDescription className="text-muted-foreground">Turno: {emp.shift}</CardDescription>
                  </>
                )}

                <div className="mt-4 flex justify-center gap-2">
                  {editingId === emp.id ? (
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => handleSaveEdit(emp.id, emp)}
                    >
                      Guardar
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => setEditingId(emp.id)}
                    >
                      Editar
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={() => setEmployees(employees.filter((i) => i.id !== emp.id))}
                  >
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
