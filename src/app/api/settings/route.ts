import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(db.getSettings());
}

export async function POST(req: NextRequest) {
  try {
    const updates = await req.json();
    const updated = db.updateSettings(updates);
    return NextResponse.json({ success: true, settings: updated });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Erro ao salvar configurações' }, { status: 500 });
  }
}
