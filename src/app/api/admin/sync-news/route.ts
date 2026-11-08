import { NextResponse } from 'next/server';
import { syncAllFeeds, US_NEWS_FEEDS } from '@/lib/news-fetcher';

export async function GET() {
  return NextResponse.json({
    availableFeeds: US_NEWS_FEEDS.map((f) => ({
      id: f.id,
      name: f.name,
      outlet: f.outlet,
      category: f.category,
      url: f.url,
    })),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { selectedFeedIds, maxPerFeed, daysBack } = body;

    const result = await syncAllFeeds({
      selectedFeedIds,
      maxPerFeed: maxPerFeed || 35,
      daysBack: daysBack !== undefined ? daysBack : 30, // Default: full 30-day month
    });

    return NextResponse.json({
      success: true,
      message: `Sincronização concluída! ${result.totalSaved} notícias do último mês foram extraídas dos portais dos EUA e adicionadas ao portal.`,
      result,
    });
  } catch (error: any) {
    console.error('Erro na sincronização de notícias:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Falha ao sincronizar notícias dos portais dos EUA',
      },
      { status: 500 }
    );
  }
}
