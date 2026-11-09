import { NextRequest, NextResponse } from 'next/server';
import { renderLoginPage, renderConsoleHTML } from '@/lib/admin-console-html';

export const dynamic = 'force-dynamic';

const AUTH_COOKIE = 'beacon_admin_session';
const AUTH_TOKEN = 'authenticated-ok-2026';

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get(AUTH_COOKIE);
  const isAuthenticated = cookie?.value === AUTH_TOKEN;

  const url = new URL(req.url);
  const hasError = url.searchParams.get('error') === 'invalid';

  if (!isAuthenticated) {
    return new NextResponse(renderLoginPage(hasError), {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  }

  return new NextResponse(renderConsoleHTML(), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
