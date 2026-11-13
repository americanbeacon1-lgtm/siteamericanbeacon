import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: [
          'Googlebot',
          'Googlebot-News',
          'Googlebot-Image',
          'Bingbot',
          'Slurp',
          'DuckDuckBot',
          'Baiduspider',
          'YandexBot',
          'Applebot',
        ],
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      // Allow AI search engines and answer engines for maximum citation authority
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'],
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: [
      'https://www.americanbeacon.online/sitemap.xml',
      'https://www.americanbeacon.online/news-sitemap.xml',
      'https://www.americanbeacon.online/rss.xml',
    ],
    host: 'https://www.americanbeacon.online',
  };
}
