import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const baseUrl = 'https://americanbeacon.com';
  const articles = db.getArticles();

  const xmlItems = articles
    .map((art) => {
      const pubDate = new Date(art.publishedAt).toISOString();
      const escapedTitle = art.title
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');

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
    </news:news>
  </url>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${xmlItems}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
