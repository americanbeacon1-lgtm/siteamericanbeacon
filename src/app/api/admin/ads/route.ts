import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const ads = db.getAdSlots();
  return NextResponse.json(ads);
}

export async function POST(request: Request) {
  try {
    const { id, updates } = await request.json();
    if (!id) {
      return NextResponse.json({ success: false, error: 'ID do slot de anúncio obrigatório' }, { status: 400 });
    }
    const updated = db.updateAdSlot(id, updates);
    return NextResponse.json({ success: true, adSlot: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erro ao atualizar slot de anúncio' }, { status: 500 });
  }
}
