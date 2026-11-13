/**
 * Advanced SEO Engine & IndexNow Ping Protocol for The American Beacon
 * Implements topical siloing, semantic entity auto-linking, and instant crawler dispatch.
 */

export const INDEXNOW_KEY = '07f59a35e89a4ce6a10065ad71676839';
export const SITE_DOMAIN = 'www.americanbeacon.online';
export const BASE_URL = `https://${SITE_DOMAIN}`;

export interface KeyEntityLink {
  phrase: string;
  url: string;
  category: string;
}

export const TOPICAL_ENTITIES: KeyEntityLink[] = [
  { phrase: 'Artificial Intelligence', url: '/category/technology', category: 'technology' },
  { phrase: 'Capitol Hill', url: '/category/politics', category: 'politics' },
  { phrase: 'Wall Street', url: '/category/business', category: 'business' },
  { phrase: 'Federal Reserve', url: '/category/finance', category: 'finance' },
  { phrase: 'Supreme Court', url: '/category/us-news', category: 'us-news' },
  { phrase: 'White House', url: '/category/politics', category: 'politics' },
  { phrase: 'Silicon Valley', url: '/category/technology', category: 'technology' },
  { phrase: 'Cybersecurity', url: '/category/technology', category: 'technology' },
  { phrase: 'United States Senate', url: '/category/politics', category: 'politics' },
  { phrase: 'House of Representatives', url: '/category/politics', category: 'politics' },
  { phrase: 'Department of Defense', url: '/category/breaking-news', category: 'breaking-news' },
  { phrase: 'Treasury Department', url: '/category/finance', category: 'finance' },
  { phrase: 'Stock Market', url: '/category/business', category: 'business' },
  { phrase: 'National Security', url: '/category/breaking-news', category: 'breaking-news' },
  { phrase: 'World News', url: '/category/world-news', category: 'world-news' },
];

/**
 * Injects contextual internal links into article HTML paragraphs,
 * establishing a high-potency PageRank topical siloing mesh for Googlebot.
 * Only links the first occurrence of each entity to avoid over-optimization.
 */
export function injectSemanticEntityLinks(htmlContent: string, currentCategory?: string): string {
  if (!htmlContent) return '';

  let enrichedHtml = htmlContent;
  const linkedPhrases = new Set<string>();

  for (const entity of TOPICAL_ENTITIES) {
    // Avoid linking to the exact same category if already on it, unless it's a cross-topic entity
    if (linkedPhrases.has(entity.phrase)) continue;

    // Regex to match the phrase outside of existing <a> or <h[1-6]> tags
    const escaped = entity.phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(?<!<[^>]*)\\b(${escaped})\\b(?![^<]*<\\/a>)`, 'i');

    if (regex.test(enrichedHtml)) {
      enrichedHtml = enrichedHtml.replace(
        regex,
        `<a href="${entity.url}" class="font-semibold text-red-700 hover:text-red-900 underline decoration-red-300 underline-offset-2 transition" title="Explore ${entity.phrase} coverage on The American Beacon">$1</a>`
      );
      linkedPhrases.add(entity.phrase);
      if (linkedPhrases.size >= 4) break; // Limit to maximum 4 deep links per article
    }
  }

  return enrichedHtml;
}

/**
 * Instantly pings IndexNow API (Bing, Yandex, Seznam) and Google Sitemap endpoints
 * to trigger immediate high-velocity crawling of new or updated URLs.
 */
export async function pingSearchEngines(urls: string[]): Promise<{
  indexNowSuccess: boolean;
  googleSuccess: boolean;
  urlsPinged: number;
}> {
  if (!urls || urls.length === 0) {
    return { indexNowSuccess: false, googleSuccess: false, urlsPinged: 0 };
  }

  const cleanUrls = urls.map((u) => (u.startsWith('http') ? u : `${BASE_URL}${u}`));

  let indexNowSuccess = false;
  let googleSuccess = false;

  // 1. IndexNow API Protocol (Notifies Microsoft Bing, Yandex, Seznam, Yahoo instantly)
  try {
    const payload = {
      host: SITE_DOMAIN,
      key: INDEXNOW_KEY,
      keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: cleanUrls.slice(0, 100),
    };

    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 4000);

    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'TheAmericanBeacon-SeoBot/2.0',
      },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    });
    clearTimeout(timeout);

    indexNowSuccess = res.status === 200 || res.status === 202;
  } catch (e) {
    indexNowSuccess = false;
  }

  // 2. Google Sitemap Direct Ping
  try {
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 3500);

    const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(
      `${BASE_URL}/news-sitemap.xml`
    )}`;

    const res = await fetch(googlePingUrl, {
      signal: ctrl.signal,
      headers: {
        'User-Agent': 'TheAmericanBeacon-SeoBot/2.0',
      },
    });
    clearTimeout(timeout);

    googleSuccess = res.ok;
  } catch (e) {
    googleSuccess = false;
  }

  return {
    indexNowSuccess,
    googleSuccess,
    urlsPinged: cleanUrls.length,
  };
}
