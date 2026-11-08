import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const settings = db.getSettings();
  const content = settings.adsTxtContent || `google.com, pub-9842104820194821, DIRECT, f08c47fec0942fa0`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
