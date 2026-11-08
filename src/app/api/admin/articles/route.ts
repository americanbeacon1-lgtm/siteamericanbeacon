import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const articles = db.getArticles();
  return NextResponse.json(articles);
}

export async function POST(request: Request) {
  try {
    const articleData = await request.json();
    const saved = db.saveArticle(articleData);
    return NextResponse.json({ success: true, article: saved });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erro ao salvar artigo' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'ID do artigo obrigatório' }, { status: 400 });
    }
    const success = db.deleteArticle(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erro ao excluir artigo' }, { status: 500 });
  }
}
