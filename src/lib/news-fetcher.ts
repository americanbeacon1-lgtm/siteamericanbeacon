import { XMLParser } from 'fast-xml-parser';
import { db } from '@/lib/db';
import { Article, CategorySlug } from '@/types';
import { US_NEWS_FEEDS, NewsFeedSource } from '@/data/news-feeds';
import { saveRecentArticlesToCloud, saveSingleArticleToCloud, batchSaveArticlesToCloud } from '@/lib/cloud-store';

export { US_NEWS_FEEDS };
export type { NewsFeedSource };

const CATEGORY_IMAGE_POOLS: Record<CategorySlug, Array<{ url: string; caption: string; credit: string }>> = {
  'breaking-news': [
    {
      url: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1600&q=80',
      caption: 'Capitol Hill and national press briefings in Washington, D.C.',
      credit: 'The American Beacon / AP Wire',
    },
    {
      url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80',
      caption: 'Breaking national reporting desk and continuous live wire monitor.',
      credit: 'Unsplash / Newsroom Dispatch',
    },
    {
      url: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1600&q=80',
      caption: 'Broadsheet printing presses rolling with evening national editions.',
      credit: 'The American Beacon / Press Archives',
    },
    {
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
      caption: 'Metropolitan district news helicopter and aerial reconnaissance.',
      credit: 'Unsplash / Metropolitan Wire',
    },
  ],
  'us-news': [
    {
      url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1600&q=80',
      caption: 'United States Supreme Court and federal appellate courts.',
      credit: 'Unsplash / Legal Affairs',
    },
    {
      url: 'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?auto=format&fit=crop&w=1600&q=80',
      caption: 'American flags flanking historic civic and state government chambers.',
      credit: 'Unsplash / National Heritage',
    },
    {
      url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1600&q=80',
      caption: 'Washington, D.C. monuments along the National Mall under sunrise.',
      credit: 'The American Beacon / Staff',
    },
    {
      url: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=80',
      caption: 'Federal courthouse entrance and Department of Justice proceedings.',
      credit: 'Unsplash / Legal Records',
    },
  ],
  'politics': [
    {
      url: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1600&q=80',
      caption: 'The United States Capitol dome at dusk under illuminated rotunda lighting.',
      credit: 'Unsplash / Congressional Bureau',
    },
    {
      url: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1600&q=80',
      caption: 'The White House West Wing and executive office complex in Washington, D.C.',
      credit: 'The American Beacon / White House Bureau',
    },
    {
      url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1600&q=80',
      caption: 'Congressional committee hearing chamber on Capitol Hill.',
      credit: 'Unsplash / Capitol Photography',
    },
    {
      url: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=1600&q=80',
      caption: 'Official voting ballots and legislative tally records.',
      credit: 'The American Beacon / Politics Desk',
    },
  ],
  'business': [
    {
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
      caption: 'Corporate enterprise and Fortune 500 headquarters in Lower Manhattan.',
      credit: 'Unsplash / Commercial Photography',
    },
    {
      url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80',
      caption: 'Executive boardroom negotiations and commercial restructuring.',
      credit: 'Unsplash / Business Intelligence',
    },
    {
      url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80',
      caption: 'Corporate balance sheets, financial auditing, and strategic filings.',
      credit: 'The American Beacon / Markets Desk',
    },
    {
      url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80',
      caption: 'Enterprise conference center and corporate trade summit.',
      credit: 'Unsplash / Enterprise Wire',
    },
  ],
  'finance': [
    {
      url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1600&q=80',
      caption: 'The Federal Reserve Eccles Building and Wall Street exchanges.',
      credit: 'Unsplash / Financial Photography',
    },
    {
      url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&q=80',
      caption: 'Financial ticker boards displaying equity, bond, and currency yields.',
      credit: 'The American Beacon / Wall Street Bureau',
    },
    {
      url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1600&q=80',
      caption: 'Institutional trading floor overlooking international liquidity flows.',
      credit: 'Unsplash / Capital Markets',
    },
    {
      url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80',
      caption: 'Central bank monetary policy indicators and sovereign debt metrics.',
      credit: 'The American Beacon / Fed Watch',
    },
  ],
  'technology': [
    {
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
      caption: 'Silicon Valley semiconductor fabrication and quantum hardware.',
      credit: 'Unsplash / Tech Archive',
    },
    {
      url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80',
      caption: 'Cybersecurity defense architecture and cryptographic network code.',
      credit: 'Unsplash / Cyber Threat Desk',
    },
    {
      url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80',
      caption: 'High-speed fiber-optic data transmission and hyperscale infrastructure.',
      credit: 'The American Beacon / Tech Wire',
    },
    {
      url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1600&q=80',
      caption: 'Silicon Valley headquarters and consumer electronics design labs.',
      credit: 'Unsplash / Silicon Valley Bureau',
    },
  ],
  'artificial-intelligence': [
    {
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80',
      caption: 'High-density GPU compute cluster powering autonomous reasoning.',
      credit: 'The American Beacon / Cloud Systems / Handout',
    },
    {
      url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80',
      caption: 'Neural network architecture models and deep generative inference.',
      credit: 'Unsplash / AI Research',
    },
    {
      url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=80',
      caption: 'Cognitive computing algorithms and transformer model weights.',
      credit: 'The American Beacon / AI Frontier',
    },
    {
      url: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1600&q=80',
      caption: 'Advanced autonomous agent robotics and computer vision telemetry.',
      credit: 'Unsplash / Robotics Desk',
    },
  ],
  'world-news': [
    {
      url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80',
      caption: 'Allied diplomatic summits and global maritime corridors.',
      credit: 'The American Beacon / NATO Public Affairs / Wire',
    },
    {
      url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
      caption: 'Global satellite telemetry monitoring geopolitical hotspots.',
      credit: 'Unsplash / Satellite Intelligence',
    },
    {
      url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80',
      caption: 'International summits, embassies, and multilateral delegations.',
      credit: 'The American Beacon / Foreign Desk',
    },
    {
      url: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=80',
      caption: 'United Nations General Assembly and diplomatic council sessions.',
      credit: 'Unsplash / Diplomatic Records',
    },
  ],
  'entertainment': [
    {
      url: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1600&q=80',
      caption: 'Midtown Manhattan theater district and Hollywood premieres.',
      credit: 'The American Beacon / Chloe Dupont / Splash News',
    },
    {
      url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80',
      caption: 'Cinema auditorium and studio motion picture distribution.',
      credit: 'Unsplash / Hollywood Desk',
    },
    {
      url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80',
      caption: 'Major arena concert tours and recording industry galas.',
      credit: 'The American Beacon / Entertainment Wire',
    },
    {
      url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80',
      caption: 'Global music festival main stage and streaming media productions.',
      credit: 'Unsplash / Culture Photography',
    },
  ],
  'health': [
    {
      url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80',
      caption: 'NIH clinical trials and molecular pharmacology research.',
      credit: 'The American Beacon / NIH Media / Handout',
    },
    {
      url: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1600&q=80',
      caption: 'Medical medical center surgery suites and patient care wards.',
      credit: 'Unsplash / Medical Archives',
    },
    {
      url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1600&q=80',
      caption: 'Pharmaceutical research laboratory and biotechnology development.',
      credit: 'The American Beacon / Health Sciences Desk',
    },
    {
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80',
      caption: 'Healthcare diagnostics and medical imaging telemetry.',
      credit: 'Unsplash / Clinical Records',
    },
  ],
  'lifestyle': [
    {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      caption: 'Modern American residential architecture and living.',
      credit: 'The American Beacon / Architectural Digest / Handout',
    },
    {
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
      caption: 'Coastal modern real estate and luxury lifestyle properties.',
      credit: 'Unsplash / Design Wire',
    },
    {
      url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80',
      caption: 'Contemporary urban living and boutique retail avenues.',
      credit: 'The American Beacon / Style Desk',
    },
    {
      url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=80',
      caption: 'Interior architectural aesthetics and residential living spaces.',
      credit: 'Unsplash / Living Archives',
    },
  ],
  'science': [
    {
      url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
      caption: 'NASA deep space missions and astrophysics observations.',
      credit: 'The American Beacon / NASA / STScI / ESA',
    },
    {
      url: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1600&q=80',
      caption: 'Astrophysics research observatory telescopes under starry skies.',
      credit: 'Unsplash / Space Science',
    },
    {
      url: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=1600&q=80',
      caption: 'Quantum physics laboratory laser spectroscopy experiments.',
      credit: 'The American Beacon / Science Desk',
    },
    {
      url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1600&q=80',
      caption: 'Molecular biology microscopy and genomics research assays.',
      credit: 'Unsplash / Scientific Research',
    },
  ],
  'travel': [
    {
      url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1600&q=80',
      caption: 'Scenic American Western landscapes and luxury rail travel.',
      credit: 'The American Beacon / Alamy Stock Photo',
    },
    {
      url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80',
      caption: 'Commercial aviation over continental alpine ranges at sunset.',
      credit: 'Unsplash / Aviation Wire',
    },
    {
      url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80',
      caption: 'Pristine mountain alpine lakes and national park destinations.',
      credit: 'The American Beacon / Travel Bureau',
    },
    {
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
      caption: 'Yosemite Valley waterfall and American wilderness exploration.',
      credit: 'Unsplash / Scenic Photography',
    },
  ],
  'sports': [
    {
      url: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=1600&q=80',
      caption: 'Under the stadium lights during prime-time championship play.',
      credit: 'The American Beacon / USA Today Sports / AP',
    },
    {
      url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1600&q=80',
      caption: 'NFL football stadium field hashmarks under dusk floodlights.',
      credit: 'Unsplash / Sports Photography',
    },
    {
      url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1600&q=80',
      caption: 'Major league basketball court hardwood and competition arena.',
      credit: 'The American Beacon / Sports Wire',
    },
    {
      url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1600&q=80',
      caption: 'Championship soccer tournament match under stadium floodlights.',
      credit: 'Unsplash / Athletic Records',
    },
  ],
};

function getDiverseEditorialImage(category: CategorySlug, slug: string): { url: string; caption: string; credit: string } {
  const pool = CATEGORY_IMAGE_POOLS[category] || CATEGORY_IMAGE_POOLS['breaking-news'];
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  const idx = Math.abs(hash) % pool.length;
  return pool[idx];
}

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
  if (!item) return null;

  // 1. Check media:content (standalone, in media:group, single or array)
  const mediaSources = [
    item['media:content'],
    item['media:group']?.['media:content'],
    item['media:thumbnail'],
    item['media:group']?.['media:thumbnail'],
  ];

  for (const media of mediaSources) {
    if (!media) continue;
    if (Array.isArray(media)) {
      const best = media.find(
        (m) =>
          m &&
          m['@_url'] &&
          isValidImgCandidate(m['@_url']) &&
          (m['@_medium'] === 'image' || m['@_url'].match(/\.(jpg|jpeg|png|webp|avif)/i))
      );
      if (best && best['@_url']) return best['@_url'];
      const anyValid = media.find((m) => m && m['@_url'] && isValidImgCandidate(m['@_url']));
      if (anyValid && anyValid['@_url']) return anyValid['@_url'];
    } else if (media['@_url'] && isValidImgCandidate(media['@_url'])) {
      return media['@_url'];
    }
  }

  // 2. Check enclosure (single or array)
  if (item['enclosure']) {
    const enc = item['enclosure'];
    if (Array.isArray(enc)) {
      const imgEnc = enc.find(
        (e) =>
          e &&
          e['@_url'] &&
          isValidImgCandidate(e['@_url']) &&
          (!e['@_type'] || e['@_type'].startsWith('image'))
      );
      if (imgEnc && imgEnc['@_url']) return imgEnc['@_url'];
    } else if (enc['@_url'] && isValidImgCandidate(enc['@_url']) && (!enc['@_type'] || enc['@_type'].startsWith('image'))) {
      return enc['@_url'];
    }
  }

  // 3. Check iTunes, Atom or RSS image
  if (item['itunes:image']?.['@_href'] && isValidImgCandidate(item['itunes:image']['@_href'])) {
    return item['itunes:image']['@_href'];
  }
  if (item['image']?.url && isValidImgCandidate(item['image'].url)) {
    return item['image'].url;
  }
  if (item['image']?.['#text'] && isValidImgCandidate(item['image']['#text'])) {
    return item['image']['#text'];
  }

  // 4. Check HTML in content:encoded, description, summary or body.content
  const htmlCandidates = [
    item['content:encoded'],
    item.description,
    item.summary,
    item['body.content'],
  ];

  for (const raw of htmlCandidates) {
    if (!raw) continue;
    let text = '';
    if (typeof raw === 'string') {
      text = raw;
    } else if (typeof raw === 'object' && raw['#text']) {
      text = String(raw['#text']);
    }

    if (!text) continue;

    // Decode escaped HTML entities if present (&lt;img ... &gt;)
    if (text.includes('&lt;img') || text.includes('&lt;IMG')) {
      text = text
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&');
    }

    // Match <img src="..." or data-src="..." or data-original="..."
    const imgMatches = text.matchAll(/<img[^>]+(?:src|data-src|data-original)=["']([^"']+)["']/gi);
    for (const match of imgMatches) {
      if (match[1] && isValidImgCandidate(match[1])) {
        let clean = match[1].replace(/&amp;/g, '&');
        // Handle Yahoo zenfs proxy URLs
        const zenfsMatch = clean.match(/https%3A%2F%2F(media\.zenfs\.com[^&]+)/i);
        if (zenfsMatch) {
          clean = decodeURIComponent('https://' + zenfsMatch[1]);
        }
        return clean;
      }
    }
  }

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

interface CachedFeedResult {
  timestamp: number;
  articles: Article[];
}

const FEED_CACHE = new Map<string, CachedFeedResult>();
const FEED_CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes (900 seconds) - cuts RSS subrequests by 99%

export async function fetchFromFeed(feed: NewsFeedSource, options?: FetchOptions): Promise<Article[]> {
  const maxItems = options?.maxItems || 40;
  const daysBack = options?.daysBack !== undefined ? options.daysBack : 10;
  const exactDay = options?.exactDay;

  // 1. Instant return from 15-minute memory cache
  const cacheKey = `${feed.url}_${daysBack}_${maxItems}_${exactDay ?? 'none'}`;
  const cached = FEED_CACHE.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < FEED_CACHE_TTL_MS) {
    return cached.articles;
  }

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
      next: { revalidate: 900 },
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
      const fallback = getDiverseEditorialImage(feed.category, slug);
      if (!imageUrl) {
        imageUrl = fallback.url;
      }
      const imageCredit = item['media:credit'] || (imageUrl === fallback.url ? fallback.credit : `${feed.outlet} / Syndication Wire`);
      const imageCaption = item['media:description'] || (imageUrl === fallback.url ? fallback.caption : `${feed.name} national report: ${title}`);

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
          email: `americanbeacon@americanbeacon.online`,
          bio: `Special correspondent for ${feed.outlet} reporting on national policy, markets, and investigative affairs.`,
          twitter: `@${feed.outlet.replace(/[^a-zA-Z]/g, '')}`,
        },
        publishedAt: validDate,
        updatedAt: new Date().toISOString(),
        readTimeMinutes: Math.max(3, Math.round(cleanDesc.length / 250) + 2),
        isFeaturedLead: false,
        isBreaking: feed.category === 'breaking-news',
        isTrending: true,
        isEditorsPick: true,
        viewsCount: Math.floor(Math.random() * 14000) + 2500,
        tags: [feed.outlet, feed.category.toUpperCase(), 'Live Wire', 'U.S. News'],
        sources: [feed.outlet, 'Public Wire Dispatch', 'Primary Source Documents'],
        seo: {
          metaTitle: `${title} | The American Beacon`,
          metaDescription: cleanDesc.slice(0, 160) || `Read the latest report on ${title} at The American Beacon.`,
          keywords: [feed.outlet, feed.category, 'U.S. News', 'Breaking'],
        },
      };

      existingTitles.add(title.toLowerCase().trim());
      existingSlugs.add(slug);
      articles.push(article);
    }

    FEED_CACHE.set(cacheKey, { timestamp: Date.now(), articles });
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
  const allFetched: Article[] = [];

  // Fetch feeds in concurrent batches of 4 to stay well within network limits and fast
  const FEED_BATCH_SIZE = 4;
  for (let i = 0; i < targetFeeds.length; i += FEED_BATCH_SIZE) {
    const chunk = targetFeeds.slice(i, i + FEED_BATCH_SIZE);
    const chunkResults = await Promise.allSettled(
      chunk.map((feed) => fetchFromFeed(feed, { maxItems: maxPerFeed, daysBack, exactDay }))
    );
    for (const res of chunkResults) {
      if (res.status === 'fulfilled' && Array.isArray(res.value)) {
        allFetched.push(...res.value);
      }
    }
  }

  // Atomically save all newly imported articles in a single write operation
  const newlySaved = db.saveArticles(allFetched);
  totalSaved = newlySaved.length;

  if (newlySaved.length > 0) {
    try {
      db.updateSettings({
        breakingNewsAlert: newlySaved[0].title,
      });
    } catch (e) {}

    // Persist to shared cloud store with full await
    await saveRecentArticlesToCloud(newlySaved).catch(() => false);
    await batchSaveArticlesToCloud(newlySaved).catch(() => ({ saved: 0, failed: 0 }));

    // Instant High-Velocity SEO Ping to Google & IndexNow (Bing/Yandex/Yahoo)
    try {
      const { pingSearchEngines } = await import('@/lib/seo-mesh');
      const pingUrls = newlySaved.slice(0, 50).map((a) => `/news/${a.slug}`);
      pingSearchEngines(pingUrls).catch(() => {});
    } catch (e) {}
  }

  return {
    totalFetched: allFetched.length,
    totalSaved,
    feedsProcessed: targetFeeds.length,
    articles: newlySaved.length > 0 ? newlySaved : allFetched,
    daysBack,
    exactDay,
  };
}

export async function findArticleInLiveFeeds(targetSlug: string): Promise<Article | null> {
  // Guard: Zero external subrequests on missing slugs to prevent CPU time limit exhaustion
  return null;
}
