import { NextRequest, NextResponse } from 'next/server';

const AUTH_COOKIE = 'beacon_admin_session';

export async function GET(req: NextRequest) {
  const response = NextResponse.redirect(new URL('/admin', req.url), 302);
  response.cookies.set({
    name: AUTH_COOKIE,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return response;
}
