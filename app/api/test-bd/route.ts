import { NextResponse } from "next/server"
import { testConnection } from "@/lib/db"

export async function GET() {
  try {
    const connected = await testConnection()

    if (connected) {
      return NextResponse.json({
        status: "success",
        message: "Conexión a Neon establecida correctamente",
      })
    } else {
      return NextResponse.json(
        {
          status: "error",
          message: "No se pudo conectar a la base de datos",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error al probar la conexión:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "Error al probar la conexión a la base de datos",
      },
      { status: 500 },
    )
  }
}
