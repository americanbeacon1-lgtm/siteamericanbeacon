import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const baseUrl = 'https://americanbeacon.com';
  const articles = db.getArticles({ limit: 25 });

  const items = articles
    .map((art) => {
      const pubDate = new Date(art.publishedAt).toUTCString();
      const escapedTitle = art.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const escapedDesc = art.subtitle.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      return `
    <item>
      <title>${escapedTitle}</title>
      <link>${baseUrl}/news/${art.slug}</link>
      <guid>${baseUrl}/news/${art.slug}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapedDesc}</description>
      <category>${art.category}</category>
      <author>${art.author.email} (${art.author.name})</author>
    </item>`;
    })
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The American Beacon — Independent Journalism</title>
    <link>${baseUrl}</link>
    <description>The Voice of the Republic: Breaking news, political analysis, Wall Street finance, and global intelligence.</description>
    <language>en-us</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
