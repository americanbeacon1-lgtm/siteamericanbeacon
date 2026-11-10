import { NextRequest, NextResponse } from 'next/server';
import { syncAllFeeds } from '@/lib/news-fetcher';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { days = 10, exactDay, maxPerFeed = 35, selectedFeedIds } = body;

    const result = await syncAllFeeds({
      daysBack: days !== undefined ? Number(days) : 10,
      exactDay: exactDay !== undefined && exactDay !== '' && exactDay !== null ? Number(exactDay) : undefined,
      maxPerFeed: Number(maxPerFeed) || 35,
      selectedFeedIds,
    });

    const periodDescription = result.exactDay
      ? `do dia ${result.exactDay} atrás`
      : `dos últimos ${result.daysBack} dias`;

    return NextResponse.json({
      success: true,
      totalSaved: result.totalSaved,
      daysHarvested: result.daysBack,
      exactDay: result.exactDay,
      feedsProcessed: result.feedsProcessed,
      articles: result.articles.slice(0, 50),
      message: `Sucesso! ${result.totalSaved} notícias ${periodDescription} foram extraídas e sincronizadas no portal!`,
    });
  } catch (error: any) {
    console.error('Erro ao sincronizar notícias:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Falha ao sincronizar notícias' },
      { status: 500 }
    );
  }
}
