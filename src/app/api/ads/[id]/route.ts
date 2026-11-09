import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const updates = await req.json();
  const updated = db.updateAdSlot(id, updates);
  if (!updated) {
    return NextResponse.json({ success: false, error: 'Slot não encontrado' }, { status: 404 });
  }
  return NextResponse.json({ success: true, adSlot: updated });
}
