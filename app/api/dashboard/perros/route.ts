import { NextResponse } from 'next/server'
import { Pool } from 'pg'
import { cookies } from 'next/headers'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function GET() {
  try {
    console.log('Iniciando petición GET...')
    
    const allCookies = await cookies()
    const userCookie = allCookies.get('user')?.value
    
    if (!userCookie) {
      console.log('No se encontró cookie de usuario')
      return NextResponse.json({
        success: false,
        error: 'No hay sesión activa',
        details: 'No se encontró cookie de usuario'
      }, { status: 401 })
    }

    const userData = JSON.parse(decodeURIComponent(userCookie))
    console.log('Usuario decodificado:', userData)

    if (!userData.id) {
      console.log('Usuario sin ID')
      return NextResponse.json({
        success: false,
        error: 'Usuario inválido',
        details: 'El usuario no tiene un ID válido'
      }, { status: 401 })
    }

    const perrosRes = await pool.query(
      `
        SELECT 
          id_perro_pk,
          id_cliente_fk,
          nombre,
          edad,
          sexo
        FROM perro
        WHERE id_cliente_fk = $1
        ORDER BY nombre ASC
      `,
      [userData.id]
    )

    console.log('Perros encontrados:', perrosRes.rows)

    return NextResponse.json({
      success: true,
      perros: perrosRes.rows
    })
  } catch (error) {
    console.error('Error en la API:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
      details: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const requiredFields = ['nombre', 'edad', 'sexo', 'id_cliente_fk']
    const missingFields = requiredFields.filter(field => !data[field])
    
    if (missingFields.length > 0) {
      console.log('Campos faltantes:', missingFields)
      return NextResponse.json({
        success: false,
        error: `Faltan campos requeridos: ${missingFields.join(', ')}`,
        details: 'Campos requeridos: nombre, edad, sexo, id_cliente_fk'
      }, { status: 400 })
    }

    if (isNaN(data.id_cliente_fk)) {
      console.log('ID de cliente inválido:', data.id_cliente_fk)
      return NextResponse.json({
        success: false,
        error: 'ID de cliente inválido',
        details: 'El ID del cliente debe ser un número'
      }, { status: 400 })
    }

    const result = await pool.query(
      `
        INSERT INTO perro (nombre, edad, sexo, id_cliente_fk)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
      [
        data.nombre,
        data.edad,
        data.sexo,
        parseInt(data.id_cliente_fk)
      ]
    )

    console.log('Nuevo perro registrado:', result.rows[0])

    return NextResponse.json({
      success: true,
      perro: result.rows[0]
    })
  } catch (error) {
    console.error('Error en la API:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
      details: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    
    const requiredFields = ['id_perro_pk', 'nombre', 'edad', 'sexo', 'id_cliente_fk']
    const missingFields = requiredFields.filter(field => !data[field])
    
    if (missingFields.length > 0) {
      console.log('Campos faltantes:', missingFields)
      return NextResponse.json({
        success: false,
        error: `Faltan campos requeridos: ${missingFields.join(', ')}`,
        details: 'Campos requeridos: id_perro_pk, nombre, edad, sexo, id_cliente_fk'
      }, { status: 400 })
    }

    if (isNaN(data.id_perro_pk) || isNaN(data.id_cliente_fk)) {
      console.log('IDs inválidos')
      return NextResponse.json({
        success: false,
        error: 'IDs inválidos',
        details: 'Los IDs deben ser números'
      }, { status: 400 })
    }

    const result = await pool.query(
      `
        UPDATE perro 
        SET 
          nombre = $1,
          edad = $2,
          sexo = $3,
          id_cliente_fk = $4
        WHERE id_perro_pk = $5
        RETURNING *
      `,
      [
        data.nombre,
        data.edad,
        data.sexo,
        parseInt(data.id_cliente_fk),
        parseInt(data.id_perro_pk)
      ]
    )

    if (result.rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Perro no encontrado',
        details: 'No se encontró ningún perro con el ID especificado'
      }, { status: 404 })
    }

    console.log('Perro actualizado:', result.rows[0])

    return NextResponse.json({
      success: true,
      perro: result.rows[0]
    })
  } catch (error) {
    console.error('Error en la API:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
      details: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id_perro_pk')
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({
        success: false,
        error: 'ID inválido',
        details: 'Debe proporcionar un ID de perro válido'
      }, { status: 400 })
    }

    const result = await pool.query(
      `
        DELETE FROM perro 
        WHERE id_perro_pk = $1
        RETURNING *
      `,
      [parseInt(id)]
    )

    if (result.rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Perro no encontrado',
        details: 'No se encontró ningún perro con el ID especificado'
      }, { status: 404 })
    }

    console.log('Perro eliminado:', result.rows[0])

    return NextResponse.json({
      success: true,
      perro: result.rows[0]
    })
  } catch (error) {
    console.error('Error en la API:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
      details: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}