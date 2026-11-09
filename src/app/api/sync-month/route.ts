import { NextRequest, NextResponse } from 'next/server';
import { syncAllFeeds } from '@/lib/news-fetcher';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { days = 30, maxPerFeed = 35, selectedFeedIds } = body;

    const result = await syncAllFeeds({
      daysBack: days,
      maxPerFeed,
      selectedFeedIds,
    });

    return NextResponse.json({
      success: true,
      totalSaved: result.totalSaved,
      daysHarvested: days,
      feedsProcessed: result.feedsProcessed,
      articles: result.articles.slice(0, 50),
      message: `Sucesso! ${result.totalSaved} matérias dos últimos ${days} dias foram extraídas e sincronizadas no portal!`,
    });
  } catch (error: any) {
    console.error('Erro ao sincronizar mês:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Falha ao sincronizar mês' },
      { status: 500 }
    );
  }
}
