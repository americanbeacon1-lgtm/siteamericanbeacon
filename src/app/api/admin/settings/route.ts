import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const settings = db.getSettings();
  return NextResponse.json(settings);
}

export async function POST(request: Request) {
  try {
    const updates = await request.json();
    const updated = db.updateSettings(updates);
    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erro ao atualizar configurações' }, { status: 500 });
  }
}
