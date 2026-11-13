import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 900; // 15 minutes cache

export async function GET() {
  const baseUrl = 'https://www.americanbeacon.online';
  const now = Date.now();
  const twoDaysAgo = new Date(now - 48 * 60 * 60 * 1000);

  // Google News guidelines: only dispatches from the last 48 hours
  const allArticles = db.getArticles();
  let newsArticles = allArticles.filter((art) => {
    const pub = new Date(art.publishedAt);
    return !isNaN(pub.getTime()) && pub >= twoDaysAgo;
  });

  // Fallback: if fewer than 20 dispatches in 48h, supply the latest 40 to ensure sitemap is always robust
  if (newsArticles.length < 20) {
    newsArticles = allArticles.slice(0, 40);
  }

  const xmlItems = newsArticles
    .map((art) => {
      const pubDate = new Date(art.publishedAt || Date.now()).toISOString();
      const escapedTitle = (art.title || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');

      const keywords = Array.isArray(art.tags) && art.tags.length > 0
        ? art.tags.slice(0, 5).join(', ').replace(/&/g, '&amp;')
        : `${art.category}, Breaking News, U.S. News`;

      const escapedImageUrl = (art.imageUrl || '').replace(/&/g, '&amp;');

      return `
  <url>
    <loc>${baseUrl}/news/${art.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>The American Beacon</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${escapedTitle}</news:title>
      <news:keywords>${keywords}</news:keywords>
    </news:news>
    ${
      escapedImageUrl
        ? `
    <image:image>
      <image:loc>${escapedImageUrl}</image:loc>
      <image:title>${escapedTitle}</image:title>
    </image:image>`
        : ''
    }
  </url>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${xmlItems}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800',
    },
  });
}
