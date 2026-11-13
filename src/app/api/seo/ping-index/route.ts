import { NextRequest, NextResponse } from 'next/server';
import { pingSearchEngines } from '@/lib/seo-mesh';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    let targetUrls: string[] = body.urls || [];

    if (targetUrls.length === 0) {
      // If no specific URLs provided, collect the 40 most recent dispatches
      const articles = db.getArticles({ limit: 40 });
      targetUrls = articles.map((a) => `/news/${a.slug}`);
      targetUrls.unshift('/');
    }

    const result = await pingSearchEngines(targetUrls);

    return NextResponse.json({
      success: true,
      message: `IndexNow & Google Ping disparado com sucesso para ${result.urlsPinged} URLs!`,
      result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Falha ao disparar pings de SEO' },
      { status: 500 }
    );
  }
}
