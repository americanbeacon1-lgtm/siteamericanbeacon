import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const limit = parseInt(searchParams.get('limit') || '100', 10);

  let articles = db.getArticles();

  if (category) {
    articles = articles.filter((a) => a.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    articles = articles.filter(
      (a) => a.title.toLowerCase().includes(q) || a.subtitle?.toLowerCase().includes(q)
    );
  }

  articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  return NextResponse.json(articles.slice(0, limit));
}

export async function POST(req: NextRequest) {
  try {
    const articleData = await req.json();
    const saved = db.saveArticle(articleData);
    return NextResponse.json({ success: true, article: saved });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erro ao salvar artigo' }, { status: 500 });
  }
}
