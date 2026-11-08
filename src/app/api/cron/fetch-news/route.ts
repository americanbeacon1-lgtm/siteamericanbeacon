import { NextResponse } from 'next/server';
import { syncAllFeeds } from '@/lib/news-fetcher';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const maxPerFeed = parseInt(searchParams.get('max') || '25', 10);
    const daysBack = parseInt(searchParams.get('days') || '30', 10);

    const result = await syncAllFeeds({ maxPerFeed, daysBack });

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      importedArticles: result.totalSaved,
      feedsProcessed: result.feedsProcessed,
      daysHarvested: result.daysBack,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
