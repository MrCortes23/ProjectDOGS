import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { nombre, correo, telefono, direccion, contrasena } = await request.json();

    if (!nombre || !correo || !telefono || !direccion || !contrasena) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    const client = await db.connect();
    
    try {
      await client.query('BEGIN');

      // Solo insertamos en cliente, el trigger sincronizar_inicio_sesion se encargará de inicio_de_sesion
      const clienteResult = await client.query(
        'INSERT INTO cliente (nombre, correo, telefono, direccion, contrasena) VALUES ($1, LOWER($2), $3, $4, $5) RETURNING *',
        [nombre, correo, telefono, direccion, contrasena]
      );

      await client.query('COMMIT');

      return NextResponse.json({
        success: true,
        user: {
          id: clienteResult.rows[0].id_cliente_pk,
          nombre,
          correo: correo.toLowerCase(),
          rol: 'cliente'
        }
      });

    } catch (error: unknown) {
      await client.query('ROLLBACK');
      
      if (error instanceof Error && error.code === '23505') {
        return NextResponse.json(
          { error: 'Este correo ya está registrado' },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { error: 'Error al registrar usuario' },
        { status: 500 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: 'Error al registrar usuario' },
      { status: 500 }
    );
  }
}