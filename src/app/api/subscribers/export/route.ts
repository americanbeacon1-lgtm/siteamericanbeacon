import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const subs = db.getSubscribers();
  let csv = 'ID,Email,Edition,Status,SubscribedAt\n';
  subs.forEach((s) => {
    csv += `"${s.id}","${s.email}","${s.edition || 'Morning Dispatch'}","${s.status || 'active'}","${s.subscribedAt}"\n`;
  });

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="american-beacon-subscribers.csv"',
    },
  });
}
