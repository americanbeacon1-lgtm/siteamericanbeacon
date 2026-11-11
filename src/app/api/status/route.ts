import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { US_NEWS_FEEDS } from '@/data/news-feeds';

export const dynamic = 'force-dynamic';

export async function GET() {
  await db.syncLatestArticles();
  const articles = db.getArticles();
  const subscribers = db.getSubscribers();
  const adSlots = db.getAdSlots();

  return NextResponse.json({
    status: 'ONLINE',
    adminRoute: '/admin',
    publicPort: 3000,
    articlesCount: articles.length,
    subscribersCount: subscribers.length,
    adSlotsCount: adSlots.length,
    feedsCount: US_NEWS_FEEDS.length,
    timestamp: new Date().toISOString(),
  });
}
