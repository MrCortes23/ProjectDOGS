import { NextResponse } from 'next/server';
import  pool  from '@/lib/db';

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const cookies = request.headers.get('cookie');

    if (!cookies) {
      return NextResponse.json(
        { success: false, error: 'No hay sesión activa' },
        { status: 401 }
      );
    }

    // Extraer el ID del usuario de las cookies
    const userCookieMatch = cookies.match(/user=([^;]+)/);
    if (!userCookieMatch) {
      return NextResponse.json(
        { success: false, error: 'No hay sesión activa' },
        { status: 401 }
      );
    }

    // Decodificar y parsear los datos del usuario
    const userData = JSON.parse(decodeURIComponent(userCookieMatch[1]));
    const userId = userData.id;

    // Actualizar los datos del usuario
    const updateQuery = `
      UPDATE cliente 
      SET 
        nombre = $1,
        correo = $2,
        telefono = $3,
        direccion = $4
      WHERE id_cliente_pk = $5
      RETURNING *;
    `;

    const values = [
      data.nombre,
      data.correo,
      data.telefono,
      data.direccion,
      userId
    ];

    const result = await pool.query(updateQuery, values);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No se pudo actualizar el perfil' },
        { status: 400 }
      );
    }

    // Actualizar la cookie con los nuevos datos
    const updatedUserData = { ...userData, ...result.rows[0] };
    const updatedCookie = `user=${encodeURIComponent(JSON.stringify(updatedUserData))}`;

    return NextResponse.json(
      { success: true, message: 'Perfil actualizado exitosamente' },
      {
        status: 200,
        headers: {
          'Set-Cookie': updatedCookie,
        },
      }
    );

  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    return NextResponse.json(
      { success: false, error: 'Error al actualizar el perfil' },
      { status: 500 }
    );
  }
}
