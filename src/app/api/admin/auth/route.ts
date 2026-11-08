import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const ADMIN_EMAIL = 'americanbeacon1@gmail.com';
const ADMIN_PASSWORD = 'eradogelo';
const SESSION_COOKIE_NAME = 'beacon_admin_session';
const SESSION_TOKEN = 'authenticated-ok-2026';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    if (cleanEmail === ADMIN_EMAIL && cleanPassword === ADMIN_PASSWORD) {
      const response = NextResponse.json({
        success: true,
        message: 'Acesso autorizado com sucesso.',
        user: {
          email: ADMIN_EMAIL,
          role: 'Editor-in-Chief / Administrator',
        },
      });

      response.cookies.set({
        name: SESSION_COOKIE_NAME,
        value: SESSION_TOKEN,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 dias de persistência
      });

      return response;
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Credenciais inválidas. E-mail ou senha incorretos.',
      },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro ao processar autenticação.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get(SESSION_COOKIE_NAME);
  if (cookie && cookie.value === SESSION_TOKEN) {
    return NextResponse.json({
      authenticated: true,
      email: ADMIN_EMAIL,
    });
  }
  return NextResponse.json({ authenticated: false });
}

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: 'Sessão encerrada com sucesso.',
  });

  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
}
