import { NextResponse } from 'next/server';
import { US_NEWS_FEEDS } from '@/data/news-feeds';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(US_NEWS_FEEDS);
}
