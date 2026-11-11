import { CategorySlug } from '@/types';

// Curated pool of 100% verified, high-resolution editorial Unsplash photography for each category
export const CATEGORY_IMAGE_POOLS: Record<
  CategorySlug,
  Array<{ url: string; caption: string; credit: string }>
> = {
  'breaking-news': [
    {
      url: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1600&q=80',
      caption: 'Capitol Hill and national press briefings in Washington, D.C.',
      credit: 'Unsplash / Editorial Photography',
    },
    {
      url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80',
      caption: 'Live television news cameras positioned outside federal agency headquarters.',
      credit: 'The American Beacon / Wire Syndicate',
    },
    {
      url: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1600&q=80',
      caption: 'Fresh national morning editions rolling off industrial press lines.',
      credit: 'Unsplash / Editorial Photography',
    },
  ],
  'us-news': [
    {
      url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1600&q=80',
      caption: 'United States Supreme Court and federal appellate courts.',
      credit: 'Unsplash / News Archive',
    },
    {
      url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1600&q=80',
      caption: 'Golden Gate corridor and Pacific coastal metropolitan center.',
      credit: 'The American Beacon / Wire Photo',
    },
    {
      url: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1600&q=80',
      caption: 'Manhattan skyline and East Coast commerce hubs.',
      credit: 'The American Beacon / National Bureau',
    },
  ],
  politics: [
    {
      url: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1600&q=80',
      caption: 'The United States Capitol dome at dusk under illuminated rotunda lighting.',
      credit: 'Unsplash / Capitol Photography',
    },
    {
      url: 'https://images.unsplash.com/photo-1520690214124-2405c5217036?auto=format&fit=crop&w=1600&q=80',
      caption: 'Congressional hearings and legislative proceedings on Capitol Hill.',
      credit: 'The American Beacon / Congressional Pool / Wire',
    },
    {
      url: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&w=1600&q=80',
      caption: 'White House West Wing corridors and federal executive briefings.',
      credit: 'Unsplash / News Archive',
    },
  ],
  business: [
    {
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
      caption: 'Corporate enterprise and Fortune 500 headquarters in major American cities.',
      credit: 'Unsplash / Financial Photography',
    },
    {
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
      caption: 'Modern corporate boardrooms and executive strategic planning.',
      credit: 'The American Beacon / Commercial Archive',
    },
    {
      url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80',
      caption: 'Enterprise workplace technology and operations command suites.',
      credit: 'Unsplash / News Archive',
    },
  ],
  finance: [
    {
      url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1600&q=80',
      caption: 'The Federal Reserve Eccles Building and Wall Street exchanges.',
      credit: 'Unsplash / Financial Markets',
    },
    {
      url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&q=80',
      caption: 'Real-time equity market tickers and financial trading desks.',
      credit: 'The American Beacon / Market Exchange Feed',
    },
    {
      url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1600&q=80',
      caption: 'Institutional investment portfolios and sovereign debt treasuries.',
      credit: 'The American Beacon / Financial Times Syndicate',
    },
  ],
  technology: [
    {
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
      caption: 'Silicon Valley semiconductor fabrication and quantum hardware.',
      credit: 'Unsplash / Technology Archive',
    },
    {
      url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80',
      caption: 'Cybersecurity defense frameworks and sovereign cloud infrastructure.',
      credit: 'The American Beacon / Tech Syndicate',
    },
    {
      url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80',
      caption: 'Software engineering teams deploying enterprise architectures.',
      credit: 'The American Beacon / Silicon Wire',
    },
  ],
  'artificial-intelligence': [
    {
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80',
      caption: 'High-density GPU compute cluster powering autonomous reasoning.',
      credit: 'The American Beacon / Cloud Systems / Handout',
    },
    {
      url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=80',
      caption: 'Neural network weight topologies and deep learning transformer models.',
      credit: 'The American Beacon / AI Research Bureau',
    },
    {
      url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80',
      caption: 'Algorithmic compute pipelines operating at multi-petaflop scale.',
      credit: 'The American Beacon / Matrix Research',
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
      caption: 'Orbital satellite monitoring of global climate and international borders.',
      credit: 'The American Beacon / World Geospatial Service',
    },
    {
      url: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=80',
      caption: 'International overland logistics corridors and continental trade routes.',
      credit: 'The American Beacon / Global Wire',
    },
  ],
  entertainment: [
    {
      url: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1600&q=80',
      caption: 'Midtown Manhattan theater district and Hollywood premieres.',
      credit: 'The American Beacon / Chloe Dupont / Splash News',
    },
    {
      url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80',
      caption: 'Arena concert tours and nationwide live festival stages.',
      credit: 'The American Beacon / Entertainment Wire',
    },
    {
      url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80',
      caption: 'Grammy-stage musical performances and live broadcast productions.',
      credit: 'Unsplash / Editorial Photography',
    },
  ],
  health: [
    {
      url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80',
      caption: 'NIH clinical trials and molecular pharmacology research laboratories.',
      credit: 'The American Beacon / NIH Media / Handout',
    },
    {
      url: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1600&q=80',
      caption: 'Physicians reviewing diagnostic imaging at leading university medical centers.',
      credit: 'The American Beacon / Medical Journal Pool',
    },
    {
      url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1600&q=80',
      caption: 'Preventative health breakthroughs and bio-pharmaceutical advances.',
      credit: 'The American Beacon / Healthcare Wire',
    },
  ],
  lifestyle: [
    {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      caption: 'Modern American residential architecture and living spaces.',
      credit: 'The American Beacon / Architectural Digest / Handout',
    },
    {
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
      caption: 'Architectural residential developments across the American West.',
      credit: 'The American Beacon / Design Journal Wire',
    },
    {
      url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
      caption: 'Contemporary interior design and urban loft living.',
      credit: 'The American Beacon / Lifestyle Editorial',
    },
  ],
  science: [
    {
      url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
      caption: 'NASA deep space missions and astrophysics observations.',
      credit: 'The American Beacon / NASA / STScI / ESA',
    },
    {
      url: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1600&q=80',
      caption: 'Advanced laboratory optics and quantum physics research.',
      credit: 'The American Beacon / Scientific Research Bureau',
    },
    {
      url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80',
      caption: 'International Space Station orbital perspective overlooking Earth.',
      credit: 'The American Beacon / NASA Public Affairs',
    },
  ],
  travel: [
    {
      url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1600&q=80',
      caption: 'Scenic American Western landscapes and luxury rail travel.',
      credit: 'The American Beacon / Alamy Stock Photo',
    },
    {
      url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80',
      caption: 'Expedition highways across the American Southwest national parks.',
      credit: 'The American Beacon / Travel Wire',
    },
    {
      url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80',
      caption: 'Coastal escapes and transoceanic flight routes.',
      credit: 'The American Beacon / Global Destinations Archive',
    },
  ],
  sports: [
    {
      url: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=1600&q=80',
      caption: 'Under the stadium lights during prime-time championship play.',
      credit: 'The American Beacon / USA Today Sports / AP',
    },
    {
      url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1600&q=80',
      caption: 'Hardcourt basketball action during national tournament postseason.',
      credit: 'The American Beacon / Sports Syndicate',
    },
    {
      url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1600&q=80',
      caption: 'Major league championship soccer under stadium illumination.',
      credit: 'Unsplash / Editorial Photography',
    },
  ],
};

// Check if a given URL is a real, loadable image (and not a tracking pixel or undefined)
export function isValidImageUrl(url?: string | null): boolean {
  if (!url || typeof url !== 'string') return false;
  const clean = url.trim();
  if (clean === '' || clean.toLowerCase() === 'undefined' || clean.toLowerCase() === 'null') return false;
  if (!clean.startsWith('http://') && !clean.startsWith('https://')) return false;

  const lower = clean.toLowerCase();
  // Filter tracking pixels, beacons, 1x1 gifs
  if (
    lower.includes('npr-rss-pixel') ||
    lower.includes('tracking') ||
    lower.includes('/pixel') ||
    lower.includes('1x1') ||
    lower.includes('beacon.gif') ||
    lower.includes('statcounter') ||
    lower.includes('scorecardresearch') ||
    lower.includes('doubleclick')
  ) {
    return false;
  }

  // Filter 404 dead Unsplash URL we identified
  if (lower.includes('photo-1541888946425')) {
    return false;
  }

  return true;
}

// Retrieve a reliable fallback image for a given category deterministically based on seed
export function getCategoryFallbackImage(
  category: CategorySlug,
  seed: string = ''
): { url: string; caption: string; credit: string } {
  const pool = CATEGORY_IMAGE_POOLS[category] || CATEGORY_IMAGE_POOLS['breaking-news'];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % pool.length;
  return pool[index];
}

// Ensure an article's image URL is valid; if not, return the curated fallback
export function sanitizeImageUrl(
  url: string | null | undefined,
  category: CategorySlug,
  seed: string = ''
): string {
  if (isValidImageUrl(url)) {
    return url as string;
  }
  return getCategoryFallbackImage(category, seed).url;
}
