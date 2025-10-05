import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nombre, apellido, email, telefono, password } = body;

    // Validaciones básicas
    if (!nombre || !apellido || !email || !password) {
      return NextResponse.json(
        { error: "Todos los campos obligatorios deben completarse" },
        { status: 400 }
      );
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "El correo ya está registrado" },
        { status: 400 }
      );
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = await prisma.user.create({
      data: {
        nombre,
        apellido,
        email,
        telefono,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "Usuario registrado con éxito", user: { id: newUser.id, email: newUser.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en /api/auth/register:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
