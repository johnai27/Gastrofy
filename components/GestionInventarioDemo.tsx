"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Package } from "lucide-react"

interface InventoryItem {
  id: number
  name: string
  quantity: number
}

export default function InventoryDemo({ onBack }: { onBack?: () => void }) {
  const [items, setItems] = useState<InventoryItem[]>([
    { id: 1, name: "Tomate", quantity: 50 },
    { id: 2, name: "Lechuga", quantity: 30 },
    { id: 3, name: "Queso", quantity: 20 },
    { id: 4, name: "Pan", quantity: 100 },
  ])

  const [editingId, setEditingId] = useState<number | null>(null)
  const [newItem, setNewItem] = useState<InventoryItem>({ id: 0, name: "", quantity: 0 })

  const handleSaveEdit = (id: number, updatedItem: InventoryItem) => {
    setItems(items.map((item) => (item.id === id ? updatedItem : item)))
    setEditingId(null)
  }

  const handleAddNew = () => {
    if (!newItem.name) return
    const nextId = Math.max(...items.map((i) => i.id)) + 1
    setItems([...items, { ...newItem, id: nextId }])
    setNewItem({ id: 0, name: "", quantity: 0 })
  }

  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Button onClick={onBack} className="mb-8">
          ← Volver a Gastrofy
        </Button>

        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">
          Demo: Gestión de Inventario
        </h1>
        <p className="text-muted-foreground text-lg text-center mb-12 max-w-3xl mx-auto leading-relaxed">
          Controla tu stock, añade nuevos productos y ajusta las cantidades fácilmente.
        </p>

        {/* Agregar nuevo producto */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <input
            type="text"
            placeholder="Nombre del producto"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="border px-3 py-2 rounded-lg w-64"
          />
          <input
            type="number"
            placeholder="Cantidad"
            value={newItem.quantity || ""}
            onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
            className="border px-3 py-2 rounded-lg w-32"
          />
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
            onClick={handleAddNew}
          >
            + Agregar Producto
          </Button>
        </div>

        {/* Lista de productos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <Card key={item.id} className="bg-card border-2 border-border hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4 text-center">
                <div className="mx-auto w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-4">
                  <Package className="h-8 w-8 text-primary" />
                </div>
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      setItems(items.map((i) => (i.id === item.id ? { ...i, name: e.target.value } : i)))
                    }
                    className="text-foreground text-xl font-bold text-center w-full border-b border-primary focus:outline-none"
                  />
                ) : (
                  <CardTitle className="text-foreground text-xl">{item.name}</CardTitle>
                )}
              </CardHeader>
              <CardContent className="text-center space-y-2">
                {editingId === item.id ? (
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      setItems(items.map((i) => (i.id === item.id ? { ...i, quantity: parseInt(e.target.value) } : i)))
                    }
                    className="border px-2 py-1 rounded-lg w-32 text-center"
                  />
                ) : (
                  <CardDescription className="text-muted-foreground">
                    Cantidad: {item.quantity}
                  </CardDescription>
                )}

                <div className="mt-4 flex justify-center gap-2">
                  {editingId === item.id ? (
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => handleSaveEdit(item.id, item)}
                    >
                      Guardar
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => setEditingId(item.id)}
                    >
                      Editar
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={() => setItems(items.filter((i) => i.id !== item.id))}
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
