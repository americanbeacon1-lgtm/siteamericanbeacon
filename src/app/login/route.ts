import { NextRequest, NextResponse } from 'next/server';

const ADMIN_EMAIL = 'americanbeacon1@gmail.com';
const ADMIN_PASSWORD = 'eradogelo';
const AUTH_COOKIE = 'beacon_admin_session';
const AUTH_TOKEN = 'authenticated-ok-2026';

export async function POST(req: NextRequest) {
  let email = '';
  let password = '';

  const contentType = req.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const json = await req.json().catch(() => ({}));
    email = json.email;
    password = json.password;
  } else {
    const formData = await req.formData().catch(() => null);
    if (formData) {
      email = formData.get('email') as string;
      password = formData.get('password') as string;
    }
  }

  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPassword = (password || '').trim();

  if (cleanEmail === ADMIN_EMAIL && cleanPassword === ADMIN_PASSWORD) {
    const response = NextResponse.redirect(new URL('/admin', req.url), 302);
    response.cookies.set({
      name: AUTH_COOKIE,
      value: AUTH_TOKEN,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  }

  return NextResponse.redirect(new URL('/admin?error=invalid', req.url), 302);
}
