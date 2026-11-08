import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE_NAME = 'beacon_admin_session';
const SESSION_TOKEN = 'authenticated-ok-2026';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect Admin APIs except the login/auth endpoint
  if (pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/auth')) {
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);
    if (!sessionCookie || sessionCookie.value !== SESSION_TOKEN) {
      return NextResponse.json(
        { error: 'Acesso não autorizado. Autenticação necessária.' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/admin/:path*'],
};
