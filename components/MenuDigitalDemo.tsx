"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CoffeeIcon } from "lucide-react"

interface MenuItem {
  id: number
  name: string
  price: number
  score: number
}

export default function MenuDigitalDemo({ onBack }: { onBack?: () => void }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: 1, name: "Pizza Margarita", price: 12.99, score: 95 },
    { id: 2, name: "Hamburguesa Gourmet", price: 14.5, score: 89 },
    { id: 3, name: "Ensalada César", price: 9.75, score: 78 },
    { id: 4, name: "Pasta Alfredo", price: 11.2, score: 85 },
    { id: 5, name: "Sopa de Tomate", price: 7.5, score: 84 },
    { id: 6, name: "Lasagna", price: 9.5, score: 92 },
  ])

  const [editingId, setEditingId] = useState<number | null>(null)
  const [newItem, setNewItem] = useState<MenuItem>({ id: 0, name: "", price: 0, score: 0 })

  const handleSaveEdit = (id: number, updatedItem: MenuItem) => {
    setMenuItems(menuItems.map((item) => (item.id === id ? updatedItem : item)))
    setEditingId(null)
  }

  const handleAddNew = () => {
    if (!newItem.name) return
    const nextId = Math.max(...menuItems.map((i) => i.id)) + 1
    setMenuItems([...menuItems, { ...newItem, id: nextId }])
    setNewItem({ id: 0, name: "", price: 0, score: 0 })
  }

  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Button onClick={onBack} className="mb-8">
          ← Volver a Gastrofy
        </Button>

        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">
          Demo: Menú Digital
        </h1>
        <p className="text-muted-foreground text-lg text-center mb-12 max-w-3xl mx-auto leading-relaxed">
          Explora cómo sería tu menú digital. Edita, crea y organiza tus platos fácilmente.
        </p>

        {/* Agregar nuevo plato */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <input
            type="text"
            placeholder="Nombre del plato"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="border px-3 py-2 rounded-lg w-64"
          />
          <input
            type="number"
            placeholder="Precio"
            value={newItem.price || ""}
            onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
            className="border px-3 py-2 rounded-lg w-32"
          />
          <input
            type="number"
            placeholder="Puntuación"
            value={newItem.score || ""}
            onChange={(e) => setNewItem({ ...newItem, score: parseInt(e.target.value) })}
            className="border px-3 py-2 rounded-lg w-32"
          />
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
            onClick={handleAddNew}
          >
            + Agregar Plato
          </Button>
        </div>

        {/* Lista de Platillos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <Card key={item.id} className="bg-card border-2 border-border hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4 text-center">
                <div className="mx-auto w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-4">
                  <CoffeeIcon className="h-8 w-8 text-primary" />
                </div>
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      setMenuItems(menuItems.map((i) => (i.id === item.id ? { ...i, name: e.target.value } : i)))
                    }
                    className="text-foreground text-xl font-bold text-center w-full border-b border-primary focus:outline-none"
                  />
                ) : (
                  <CardTitle className="text-foreground text-xl">{item.name}</CardTitle>
                )}
              </CardHeader>
              <CardContent className="text-center space-y-2">
                {editingId === item.id ? (
                  <>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        setMenuItems(menuItems.map((i) => (i.id === item.id ? { ...i, price: parseFloat(e.target.value) } : i)))
                      }
                      className="border px-2 py-1 rounded-lg w-32 text-center"
                    />
                    <input
                      type="number"
                      value={item.score}
                      onChange={(e) =>
                        setMenuItems(menuItems.map((i) => (i.id === item.id ? { ...i, score: parseInt(e.target.value) } : i)))
                      }
                      className="border px-2 py-1 rounded-lg w-32 text-center"
                    />
                  </>
                ) : (
                  <>
                    <CardDescription className="text-muted-foreground">
                      Precio: ${item.price.toFixed(2)}
                    </CardDescription>
                    <CardDescription className="text-muted-foreground">
                      Puntuación: {item.score}%
                    </CardDescription>
                  </>
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
                    onClick={() => setMenuItems(menuItems.filter((i) => i.id !== item.id))}
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
