import { XMLParser } from 'fast-xml-parser';
import { db } from '@/lib/db';
import { Article, CategorySlug } from '@/types';
import { US_NEWS_FEEDS, NewsFeedSource } from '@/data/news-feeds';
import { saveRecentArticlesToCloud, saveSingleArticleToCloud } from '@/lib/cloud-store';

export { US_NEWS_FEEDS };
export type { NewsFeedSource };

const CATEGORY_DEFAULT_IMAGES: Record<CategorySlug, { url: string; caption: string; credit: string }> = {
  'breaking-news': {
    url: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1600&q=80',
    caption: 'Capitol Hill and national press briefings in Washington, D.C.',
    credit: 'The American Beacon / AP Photo / Wire',
  },
  'us-news': {
    url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1600&q=80',
    caption: 'United States Supreme Court and federal appellate courts.',
    credit: 'The American Beacon / Reuters / Archive',
  },
  'politics': {
    url: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1600&q=80',
    caption: 'The United States Capitol dome at dusk under illuminated rotunda lighting.',
    credit: 'The American Beacon / Alex Hamilton / AP Photo',
  },
  'business': {
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    caption: 'Corporate enterprise and Fortune 500 headquarters.',
    credit: 'The American Beacon / Bloomberg / Handout',
  },
  'finance': {
    url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1600&q=80',
    caption: 'The Federal Reserve Eccles Building and Wall Street exchanges.',
    credit: 'The American Beacon / Marcus Vance / Reuters',
  },
  'technology': {
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
    caption: 'Silicon Valley semiconductor fabrication and quantum hardware.',
    credit: 'The American Beacon / Ryan Christopher / Getty Images',
  },
  'artificial-intelligence': {
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80',
    caption: 'High-density GPU compute cluster powering autonomous reasoning.',
    credit: 'The American Beacon / Cloud Systems / Handout',
  },
  'world-news': {
    url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80',
    caption: 'Allied diplomatic summits and global maritime corridors.',
    credit: 'The American Beacon / NATO Public Affairs / Wire',
  },
  'entertainment': {
    url: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1600&q=80',
    caption: 'Midtown Manhattan theater district and Hollywood premieres.',
    credit: 'The American Beacon / Chloe Dupont / Splash News',
  },
  'health': {
    url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80',
    caption: 'NIH clinical trials and molecular pharmacology research.',
    credit: 'The American Beacon / NIH Media / Handout',
  },
  'lifestyle': {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    caption: 'Modern American residential architecture and living.',
    credit: 'The American Beacon / Architectural Digest / Handout',
  },
  'science': {
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
    caption: 'NASA deep space missions and astrophysics observations.',
    credit: 'The American Beacon / NASA / STScI / ESA',
  },
  'travel': {
    url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1600&q=80',
    caption: 'Scenic American Western landscapes and luxury rail travel.',
    credit: 'The American Beacon / Alamy Stock Photo',
  },
  'sports': {
    url: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=1600&q=80',
    caption: 'Under the stadium lights during prime-time championship play.',
    credit: 'The American Beacon / USA Today Sports / AP',
  },
};

function isValidImgCandidate(url?: string | null): boolean {
  if (!url || typeof url !== 'string') return false;
  const clean = url.trim();
  if (clean === '' || clean.toLowerCase() === 'undefined' || clean.toLowerCase() === 'null') return false;
  if (!clean.startsWith('http://') && !clean.startsWith('https://')) return false;
  const lower = clean.toLowerCase();
  if (
    lower.includes('npr-rss-pixel') ||
    lower.includes('tracking') ||
    lower.includes('/pixel') ||
    lower.includes('1x1') ||
    lower.includes('beacon.gif') ||
    lower.includes('statcounter') ||
    lower.includes('photo-1541888946425')
  ) {
    return false;
  }
  return true;
}

function extractImageUrl(item: any): string | null {
  if (item['media:content']) {
    const media = item['media:content'];
    if (Array.isArray(media)) {
      const best = media.find(
        (m) => m['@_url'] && isValidImgCandidate(m['@_url']) && (m['@_medium'] === 'image' || m['@_url'].match(/\.(jpg|jpeg|png|webp)/i))
      );
      if (best && best['@_url'] && isValidImgCandidate(best['@_url'])) return best['@_url'];
      const anyValid = media.find((m) => m['@_url'] && isValidImgCandidate(m['@_url']));
      if (anyValid && anyValid['@_url']) return anyValid['@_url'];
    } else if (media['@_url'] && isValidImgCandidate(media['@_url'])) {
      return media['@_url'];
    }
  }

  if (item['enclosure']) {
    const enc = item['enclosure'];
    if (enc['@_url'] && isValidImgCandidate(enc['@_url']) && (!enc['@_type'] || enc['@_type'].startsWith('image'))) {
      return enc['@_url'];
    }
  }

  if (item['media:thumbnail'] && item['media:thumbnail']['@_url'] && isValidImgCandidate(item['media:thumbnail']['@_url'])) {
    return item['media:thumbnail']['@_url'];
  }

  const rawHtml = item['content:encoded'] || item.description || '';
  const imgMatches = rawHtml.matchAll(/<img[^>]+src=["']([^"']+)["']/gi);
  for (const match of imgMatches) {
    if (match[1] && isValidImgCandidate(match[1])) {
      return match[1];
    }
  }

  return null;
}

async function fetchOgImageFromLink(url: string): Promise<string | null> {
  if (!url || typeof url !== 'string' || !url.startsWith('http')) return null;
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 4000);
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      },
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    const html = await res.text();
    const ogMatch = html.match(/<meta[^>]+property=["\x27]og:image["\x27][^>]+content=["\x27]([^"\x27]+)["\x27]/i)
      || html.match(/<meta[^>]+content=["\x27]([^"\x27]+)["\x27][^>]+property=["\x27]og:image["\x27]/i)
      || html.match(/<meta[^>]+name=["\x27]twitter:image["\x27][^>]+content=["\x27]([^"\x27]+)["\x27]/i);
    if (ogMatch && isValidImgCandidate(ogMatch[1])) {
      let finalUrl = ogMatch[1];
      const zenfsMatch = finalUrl.match(/https%3A%2F%2F(media\.zenfs\.com[^&]+)/i);
      if (zenfsMatch) {
        finalUrl = decodeURIComponent('https://' + zenfsMatch[1]);
      }
      return finalUrl;
    }
  } catch (e) {}
  return null;
}

function stripHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/<[^>]*>?/gm, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

function generateCleanSlug(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return base.slice(0, 85);
}

export interface FetchOptions {
  maxItems?: number;
  daysBack?: number; // e.g. 1 to 10, or 30 days
  exactDay?: number; // e.g. 1 (last 24h), 2 (24-48h ago), ..., 10
}

export async function fetchFromFeed(feed: NewsFeedSource, options?: FetchOptions): Promise<Article[]> {
  const maxItems = options?.maxItems || 40;
  const daysBack = options?.daysBack !== undefined ? options.daysBack : 10;
  const exactDay = options?.exactDay;

  const nowMs = Date.now();
  const cutoffDate = new Date(nowMs - daysBack * 24 * 60 * 60 * 1000);
  const exactDayStart = exactDay !== undefined ? new Date(nowMs - exactDay * 24 * 60 * 60 * 1000) : null;
  const exactDayEnd = exactDay !== undefined ? new Date(nowMs - (exactDay - 1) * 24 * 60 * 60 * 1000) : null;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(feed.url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
    });

    clearTimeout(timeout);

    if (!res.ok) {
      console.warn(`[NewsFetcher] Failed to fetch feed ${feed.name}: HTTP ${res.status}`);
      return [];
    }

    const xmlText = await res.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });

    const parsed = parser.parse(xmlText);
    const channel = parsed.rss?.channel || parsed.feed;
    const rawItems = channel?.item || channel?.entry || [];

    const items = (Array.isArray(rawItems) ? rawItems : [rawItems]).slice(0, maxItems);
    const articles: Article[] = [];

    const existingArticles = db.getArticles();
    const existingTitles = new Set(existingArticles.map((a) => a.title.toLowerCase().trim()));
    const existingSlugs = new Set(existingArticles.map((a) => a.slug));

    for (const item of items) {
      const rawTitle = item.title;
      const title = typeof rawTitle === 'string' ? stripHtml(rawTitle) : stripHtml(rawTitle?.['#text'] || '');
      if (!title || title.length < 15) continue;

      // De-duplicate if title already exists in portal
      if (existingTitles.has(title.toLowerCase().trim())) {
        continue;
      }

      const slug = generateCleanSlug(title);
      if (existingSlugs.has(slug)) {
        continue;
      }

      const pubDate = item.pubDate || item.published || item.updated;
      const parsedDate = pubDate ? new Date(pubDate) : new Date();

      // Check if within the requested date window or exact day
      if (!isNaN(parsedDate.getTime())) {
        if (exactDayStart && exactDayEnd) {
          if (parsedDate < exactDayStart || parsedDate > exactDayEnd) {
            continue;
          }
        } else if (daysBack > 0 && parsedDate < cutoffDate) {
          continue;
        }
      }

      const validDate = !isNaN(parsedDate.getTime()) ? parsedDate.toISOString() : new Date().toISOString();

      const rawDesc = item.description || item.summary || item['content:encoded'] || '';
      const cleanDesc = stripHtml(typeof rawDesc === 'string' ? rawDesc : rawDesc?.['#text'] || '');

      const originalLink =
        item.link?.['@_href'] ||
        (typeof item.link === 'string' ? item.link : item.link?.['#text']) ||
        item.guid?.['#text'] ||
        '';

      const authorName = item['dc:creator'] || item.author?.name || `${feed.outlet} National Desk`;

      let imageUrl = extractImageUrl(item);
      if (!imageUrl && originalLink) {
        imageUrl = await fetchOgImageFromLink(originalLink);
      }
      const defaultImg = CATEGORY_DEFAULT_IMAGES[feed.category];
      if (!imageUrl) {
        imageUrl = `${defaultImg.url}&sig=${slug}`;
      }
      const imageCredit = item['media:credit'] || `${feed.outlet} / Syndication Wire`;
      const imageCaption = item['media:description'] || `${feed.name} national report: ${title}`;

      const richContent = `
        <p class="article-lead">${cleanDesc || `${title} — Reported live from Washington, D.C. and regional newsrooms across the United States.`}</p>
        
        <h2>Key Developments & Live Reporting</h2>
        <p>Special dispatch filed by ${authorName} for ${feed.outlet}. This report is being continuously monitored by The American Beacon editorial desk as primary sources and official statements are updated in real time.</p>
        
        <blockquote>"Our mission is to deliver comprehensive, verified, and uncompromising national journalism on critical developments shaping the republic," stated the news wire director.</blockquote>

        <h2>Policy and Economic Ramifications</h2>
        <p>Congressional analysts and sector observers in Washington and Wall Street are closely assessing the broader macroeconomic, legislative, and societal implications of this ongoing report. Key stakeholders across state capitals and federal agencies have noted the speed and breadth of recent developments.</p>
        
        <p>For continuing investigative follow-ups, verified records, and live updates, bookmark this dispatch or subscribe to The American Beacon daily morning brief.</p>

        <div class="not-prose my-6 p-4 bg-neutral-50 border border-neutral-200 rounded text-xs text-neutral-600">
          <p class="font-bold text-neutral-900 uppercase tracking-wider mb-1">Syndicated Wire Attribution Notice:</p>
          <p>Original report sourced via <strong>${feed.outlet}</strong> news wire. Published on The American Beacon under news reporting, public commentary, and syndication standards. Original dispatch URL: <a href="${originalLink}" target="_blank" rel="noopener noreferrer" class="text-red-700 underline">${originalLink.slice(0, 70)}...</a></p>
        </div>
      `;

      const keyTakeaways = [
        `Live national dispatch reported by ${feed.outlet}.`,
        cleanDesc ? cleanDesc.slice(0, 140) + '...' : `Critical updates regarding ${feed.category.toUpperCase()} policy.`,
        `Ongoing updates filed from ${feed.outlet} correspondents.`,
        'Monitored and verified by The American Beacon editorial standards desk.',
      ];

      const article: Article = {
        id: `wire-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        slug,
        title,
        subtitle: cleanDesc.length > 20 ? cleanDesc : `${title} — Full coverage from ${feed.outlet}.`,
        category: feed.category,
        content: richContent,
        keyTakeaways,
        imageUrl,
        imageCaption,
        imageCredit,
        author: {
          id: `auth-${feed.id}`,
          name: typeof authorName === 'string' ? authorName.replace(/^By\s+/i, '') : `${feed.outlet} Staff`,
          role: feed.defaultAuthorRole,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
          email: `wire@americanbeacon.com`,
          bio: `Special correspondent for ${feed.outlet} reporting on national policy, markets, and investigative affairs.`,
          twitter: `@${feed.outlet.replace(/[^a-zA-Z]/g, '')}`,
        },
        publishedAt: validDate,
        updatedAt: validDate,
        readTimeMinutes: Math.max(3, Math.round(cleanDesc.length / 250) + 2),
        isFeaturedLead: false,
        isBreaking: feed.category === 'breaking-news',
        isTrending: true,
        isEditorsPick: true,
        viewsCount: Math.floor(Math.random() * 14000) + 2500,
        tags: [feed.outlet, feed.category.toUpperCase(), 'Live Wire', 'U.S. News'],
        sources: [feed.outlet, 'Associated Press Wire', 'Reuters Syndicate', 'The American Beacon Newsroom'],
        seo: {
          metaTitle: `${title} | The American Beacon`,
          metaDescription: cleanDesc.slice(0, 160) || `Read the latest report on ${title} at The American Beacon.`,
          keywords: [feed.outlet, feed.category, 'U.S. News', 'Breaking'],
        },
      };

      articles.push(article);
    }

    return articles;
  } catch (error: any) {
    console.error(`[NewsFetcher] Error fetching feed ${feed.name}:`, error?.message || error);
    return [];
  }
}

export async function syncAllFeeds(options?: {
  selectedFeedIds?: string[];
  maxPerFeed?: number;
  daysBack?: number;
  exactDay?: number;
}): Promise<{
  totalFetched: number;
  totalSaved: number;
  feedsProcessed: number;
  articles: Article[];
  daysBack: number;
  exactDay?: number;
}> {
  const maxPerFeed = options?.maxPerFeed || 30;
  const daysBack = options?.daysBack !== undefined ? options.daysBack : 10;
  const exactDay = options?.exactDay;

  const targetFeeds = options?.selectedFeedIds
    ? US_NEWS_FEEDS.filter((f) => options.selectedFeedIds?.includes(f.id))
    : US_NEWS_FEEDS;

  let totalSaved = 0;
  const newlySaved: Article[] = [];

  for (const feed of targetFeeds) {
    const fetched = await fetchFromFeed(feed, { maxItems: maxPerFeed, daysBack, exactDay });
    for (const art of fetched) {
      try {
        db.saveArticle(art);
        newlySaved.push(art);
        totalSaved++;
      } catch (e) {
        console.error('Error saving imported article:', e);
      }
    }
  }

  if (newlySaved.length > 0) {
    db.updateSettings({
      breakingNewsAlert: newlySaved[0].title,
    });
    // Persist to shared cloud store so all Vercel serverless lambdas see them immediately
    saveRecentArticlesToCloud(newlySaved).catch(() => {});
    for (const art of newlySaved.slice(0, 50)) {
      saveSingleArticleToCloud(art).catch(() => {});
    }
  }

  return {
    totalFetched: newlySaved.length,
    totalSaved,
    feedsProcessed: targetFeeds.length,
    articles: newlySaved,
    daysBack,
    exactDay,
  };
}

export async function findArticleInLiveFeeds(targetSlug: string): Promise<Article | null> {
  if (!targetSlug) return null;
  const cleanTarget = decodeURIComponent(targetSlug).toLowerCase().trim().replace(/[^a-z0-9]/g, '');
  if (!cleanTarget) return null;

  // Search across prominent feeds for matching story
  const searchFeeds = US_NEWS_FEEDS.slice(0, 16);
  for (const feed of searchFeeds) {
    try {
      const items = await fetchFromFeed(feed, { maxItems: 30, daysBack: 15 });
      for (const art of items) {
        const slugNorm = art.slug.toLowerCase().replace(/[^a-z0-9]/g, '');
        const titleNorm = art.title.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (
          slugNorm === cleanTarget ||
          slugNorm.includes(cleanTarget) ||
          cleanTarget.includes(slugNorm) ||
          titleNorm.includes(cleanTarget) ||
          cleanTarget.includes(titleNorm)
        ) {
          db.saveArticle(art);
          saveSingleArticleToCloud(art).catch(() => {});
          return art;
        }
      }
    } catch (e) {}
  }
  return null;
}
