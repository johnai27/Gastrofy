"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { XCircle, PlusCircle, Edit } from "lucide-react"
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface Transaction {
  id: number
  description: string
  amount: number
  type: "Ingreso" | "Gasto"
  date: string
}

export default function ControlFinancieroDemo({ onBack }: { onBack?: () => void }) {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, description: "Ventas turno de la mañana", amount: 180, type: "Ingreso", date: "2025-09-01" },
    { id: 2, description: "Compra Ingredientes", amount: 50, type: "Gasto", date: "2025-09-02" },
    { id: 3, description: "Ventas turno de la tarde", amount: 230, type: "Ingreso", date: "2025-09-03" },
    { id: 4, description: "Pago Sueldos", amount: 200, type: "Gasto", date: "2025-09-05" },
  ])

  const [newTransaction, setNewTransaction] = useState<Transaction>({
    id: 0,
    description: "",
    amount: 0,
    type: "Ingreso",
    date: "",
  })

  // Cards Metrics
  const totalIngresos = transactions.filter(t => t.type === "Ingreso").reduce((sum, t) => sum + t.amount, 0)
  const totalGastos = transactions.filter(t => t.type === "Gasto").reduce((sum, t) => sum + t.amount, 0)
  const rentabilidad = totalIngresos - totalGastos

  // Chart data
  const chartData = transactions.reduce<{ date: string; ingresos: number; gastos: number }[]>((acc, t) => {
    const found = acc.find(a => a.date === t.date)
    if (found) {
      if (t.type === "Ingreso") found.ingresos += t.amount
      else found.gastos += t.amount
    } else {
      acc.push({ date: t.date, ingresos: t.type === "Ingreso" ? t.amount : 0, gastos: t.type === "Gasto" ? t.amount : 0 })
    }
    return acc
  }, [])

  const addTransaction = () => {
    if (!newTransaction.description || !newTransaction.date || newTransaction.amount <= 0) return
    setTransactions([...transactions, { ...newTransaction, id: transactions.length + 1 }])
    setNewTransaction({ id: 0, description: "", amount: 0, type: "Ingreso", date: "" })
  }

  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter(t => t.id !== id))
  }

  const editTransaction = (id: number) => {
    const t = transactions.find(t => t.id === id)
    if (!t) return
    const desc = prompt("Editar descripción", t.description)
    const amount = parseFloat(prompt("Editar monto", t.amount.toString()) || "0")
    if (desc && !isNaN(amount)) {
      setTransactions(transactions.map(tr => (tr.id === id ? { ...tr, description: desc, amount } : tr)))
    }
  }

  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Button onClick={onBack} className="mb-8">
          ← Volver a Gastrofy
        </Button>

        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">
          Demo: Control Financiero
        </h1>
        <p className="text-muted-foreground text-lg text-center mb-12 max-w-3xl mx-auto text-pretty leading-relaxed">
          Visualiza ingresos, gastos y rentabilidad con datos ficticios de ejemplo. Interactúa con las transacciones para ver cómo funcionaría en tu restaurante.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-card border-2 border-border p-6 text-center">
            <CardTitle className="text-3xl font-bold text-primary">${totalIngresos}</CardTitle>
            <CardDescription className="text-muted-foreground mt-2">Ingresos Totales</CardDescription>
          </Card>
          <Card className="bg-card border-2 border-border p-6 text-center">
            <CardTitle className="text-3xl font-bold text-secondary">${totalGastos}</CardTitle>
            <CardDescription className="text-muted-foreground mt-2">Gastos Totales</CardDescription>
          </Card>
          <Card className="bg-card border-2 border-border p-6 text-center">
            <CardTitle className="text-3xl font-bold text-accent">${rentabilidad}</CardTitle>
            <CardDescription className="text-muted-foreground mt-2">Rentabilidad</CardDescription>
          </Card>
        </div>

        {/* Chart */}
        <Card className="bg-card border-2 border-border p-6 mb-12">
          <CardHeader className="pb-4">
            <CardTitle>Ingresos vs Gastos por Día</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="ingresos" stroke="#ff6b35" />
                <Line type="monotone" dataKey="gastos" stroke="#fbbf24" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Transaction Table */}
        <Card className="bg-card border-2 border-border p-6">
          <CardHeader className="flex justify-between items-center pb-4">
            <CardTitle>Transacciones</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-2">Descripción</th>
                  <th className="p-2">Monto</th>
                  <th className="p-2">Tipo</th>
                  <th className="p-2">Fecha</th>
                  <th className="p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.id} className="border-b border-border hover:bg-background/20 transition-colors">
                    <td className="p-2">{t.description}</td>
                    <td className="p-2">${t.amount}</td>
                    <td className="p-2">{t.type}</td>
                    <td className="p-2">{t.date}</td>
                    <td className="p-2 flex gap-2">
                      <Button
                        size="sm"
                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                        onClick={() => editTransaction(t.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => deleteTransaction(t.id)}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Add transaction inputs */}
            <div className="mt-6 grid md:grid-cols-5 gap-4">
              <input
                type="text"
                placeholder="Descripción"
                className="p-2 border-2 border-border rounded-md"
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
              />
              <input
                type="number"
                placeholder="Monto"
                className="p-2 border-2 border-border rounded-md"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({ ...newTransaction, amount: parseFloat(e.target.value) })}
              />
              <select
                className="p-2 border-2 border-border rounded-md"
                value={newTransaction.type}
                onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value as "Ingreso" | "Gasto" })}
              >
                <option value="Ingreso">Ingreso</option>
                <option value="Gasto">Gasto</option>
              </select>
              <input
                type="date"
                className="p-2 border-2 border-border rounded-md"
                value={newTransaction.date}
                onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={addTransaction}>
                Agregar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
