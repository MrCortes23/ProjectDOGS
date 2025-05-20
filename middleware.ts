import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Verificar si la ruta es del dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Verificar si existe la cookie de usuario
    const userCookie = request.cookies.get('user');
    
    if (!userCookie) {
      // Redirigir a login si no hay cookie
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*']
}
