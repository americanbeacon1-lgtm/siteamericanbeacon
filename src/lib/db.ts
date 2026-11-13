import fs from 'fs';
import path from 'path';
import os from 'os';
import { Article, AdSlot, NewsletterSubscriber, SiteSettings, CategorySlug } from '@/types';
import { SEED_ARTICLES } from '@/data/seed-articles';
import { CATEGORIES } from '@/data/categories';
import {
  fetchRecentArticlesFromCloud,
  fetchSingleArticleFromCloud,
  saveSingleArticleToCloud,
} from '@/lib/cloud-store';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'portal-db.json');
const TMP_DB_FILE = path.join(os.tmpdir ? os.tmpdir() : '/tmp', 'portal-db.json');

declare global {
  var __BEACON_DB_CACHE__: DatabaseSchema | undefined;
}

export interface DatabaseSchema {
  articles: Article[];
  adSlots: AdSlot[];
  subscribers: NewsletterSubscriber[];
  settings: SiteSettings;
}

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: 'The American Beacon',
  tagline: 'The Voice of the Republic • Independent Journalism & Global Intelligence',
  description: 'The American Beacon delivers authoritative, independent breaking news, financial intelligence, political analysis, and investigative journalism for the United States.',
  editorialBureau: 'Digital Newsroom & Editorial Operations • Washington, D.C.',
  contactEmail: 'americanbeacon@americanbeacon.online',
  phone: '',
  address: 'Washington, D.C., United States',
  googleAnalyticsId: 'G-ABN2026US99',
  googleSearchConsoleTag: 'google-site-verification=BeaconUSAuth2026OfficialJournalism',
  adsensePublisherId: 'ca-pub-4875140581206437',
  adsTxtContent: `google.com, pub-4875140581206437, DIRECT, f08c47fec0942fa0
rubiconproject.com, 14209, RESELLER, 0bfd66d529a55803
appnexus.com, 2841, RESELLER, f5ab79cb980f11d1
openx.com, 537142, RESELLER, 6a698e2ec38604c6`,
  breakingNewsAlert: 'PENTAGON AWARDS $4.2B PROLIFERATED DEFENSE SATELLITE CONSTELLATION TO COUNTER HYPERSONIC THREATS',
  breakingNewsActive: true,
};

const DEFAULT_ADS: AdSlot[] = [
  {
    id: 'ad-header-leaderboard',
    position: 'header',
    name: 'Top Header Leaderboard (728x90 / 970x250 Billboard)',
    dimension: '728x90 / 970x250',
    enabled: true,
    type: 'custom',
    customBanner: {
      imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
      targetUrl: '/advertise',
      altText: 'Vanguard Capital Markets - Institutional Asset Management',
      sponsorName: 'Vanguard Global Advisory',
      ctaText: 'Explore Private Portfolio Solutions',
    },
  },
  {
    id: 'ad-sidebar-mpu',
    position: 'sidebar',
    name: 'Sidebar Half-Page & Medium Rectangle (300x250 / 300x600)',
    dimension: '300x600 Half-Page',
    enabled: true,
    type: 'custom',
    customBanner: {
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      targetUrl: '/advertise',
      altText: 'Advertise on The American Beacon — Reach 2.4M+ US Decision Makers',
      sponsorName: 'Commercial Advertising Desk • americanbeacon@americanbeacon.online',
      ctaText: 'Inquire via Email / Book Placement',
    },
  },
  {
    id: 'ad-in-article',
    position: 'in_article',
    name: 'In-Article Sponsored Native Unit',
    dimension: 'Fluid / 728x90 Native',
    enabled: true,
    type: 'custom',
    customBanner: {
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      targetUrl: '/advertise',
      altText: 'Commercial Real Estate Credit Opportunities',
      sponsorName: 'Beacon Commercial Lending',
      ctaText: 'Review Yield Strategies',
    },
  },
  {
    id: 'ad-feed-between',
    position: 'feed',
    name: 'Homepage In-Feed Billboard',
    dimension: '970x90 Banner',
    enabled: true,
    type: 'custom',
    customBanner: {
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      targetUrl: '/advertise',
      altText: 'Dow Jones Real-Time Enterprise Analytics',
      sponsorName: 'Financial Data Corp',
      ctaText: 'Request Institutional Trial',
    },
  },
  {
    id: 'ad-footer-sticky',
    position: 'footer',
    name: 'Bottom Anchor Bar',
    dimension: '728x90 Mobile / Desktop Anchor',
    enabled: true,
    type: 'custom',
    customBanner: {
      imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
      targetUrl: '/advertise',
      altText: 'Advertise with The American Beacon - Reach High-Net-Worth US Readers',
      sponsorName: 'Beacon Partner Network',
      ctaText: 'Download 2026 Media Kit',
    },
  },
  {
    id: 'ad-corner-left',
    position: 'corner_left',
    name: 'Banner Canto Esquerdo da Notícia (160x600 Skyscraper)',
    dimension: '160x600 Skyscraper',
    enabled: true,
    type: 'custom',
    htmlCode: '',
    customBanner: {
      imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=400&q=80',
      targetUrl: '/advertise',
      altText: 'Goldman Sachs Institutional Wealth Management',
      sponsorName: 'Goldman Sachs',
      ctaText: 'Learn More',
    },
  },
  {
    id: 'ad-corner-right',
    position: 'corner_right',
    name: 'Banner Canto Direito da Notícia (160x600 Skyscraper)',
    dimension: '160x600 Skyscraper',
    enabled: true,
    type: 'custom',
    htmlCode: '',
    customBanner: {
      imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80',
      targetUrl: '/advertise',
      altText: 'AWS Cloud Sovereign Infrastructure',
      sponsorName: 'Amazon Web Services',
      ctaText: 'Explore Cloud',
    },
  },
  {
    id: 'ad-corner-floating',
    position: 'corner_floating',
    name: 'Banner Flutuante no Canto da Tela (300x250 Sticky)',
    dimension: '300x250 Sticky Box',
    enabled: true,
    type: 'custom',
    htmlCode: '',
    customBanner: {
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      targetUrl: '/advertise',
      altText: 'Bloomberg Terminal Professional Edition',
      sponsorName: 'Bloomberg LP',
      ctaText: 'Start Trial',
    },
  },
];

function ensureDataFile(): DatabaseSchema {
  if (globalThis.__BEACON_DB_CACHE__) {
    return globalThis.__BEACON_DB_CACHE__;
  }

  // 1. Check /tmp on serverless environments
  try {
    if (fs.existsSync(TMP_DB_FILE)) {
      const content = fs.readFileSync(TMP_DB_FILE, 'utf8');
      const parsed = JSON.parse(content) as DatabaseSchema;
      if (parsed && Array.isArray(parsed.articles) && parsed.articles.length > 0) {
        if (!parsed.settings) parsed.settings = { ...DEFAULT_SETTINGS };
        if (!parsed.settings.contactEmail || parsed.settings.contactEmail.includes('americanbeacon.com')) {
          parsed.settings.contactEmail = DEFAULT_SETTINGS.contactEmail;
        }
        if (parsed.settings.phone && parsed.settings.phone.includes('555-0192')) {
          parsed.settings.phone = '';
        }
        if (parsed.settings.editorialBureau && parsed.settings.editorialBureau.includes('National Press Building')) {
          parsed.settings.editorialBureau = DEFAULT_SETTINGS.editorialBureau;
        }
        globalThis.__BEACON_DB_CACHE__ = parsed;
        return parsed;
      }
    }
  } catch (e) {}

  // 2. Check local data directory
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf8');
      const parsed = JSON.parse(content) as DatabaseSchema;
      if (parsed && Array.isArray(parsed.articles) && parsed.articles.length > 0) {
        if (!parsed.settings) parsed.settings = { ...DEFAULT_SETTINGS };
        if (!parsed.settings.contactEmail || parsed.settings.contactEmail.includes('americanbeacon.com')) {
          parsed.settings.contactEmail = DEFAULT_SETTINGS.contactEmail;
        }
        if (parsed.settings.phone && parsed.settings.phone.includes('555-0192')) {
          parsed.settings.phone = '';
        }
        if (parsed.settings.editorialBureau && parsed.settings.editorialBureau.includes('National Press Building')) {
          parsed.settings.editorialBureau = DEFAULT_SETTINGS.editorialBureau;
        }
        globalThis.__BEACON_DB_CACHE__ = parsed;
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error reading portal database:', error);
  }

  // 3. Fallback to initial seeds
  const initialData: DatabaseSchema = {
    articles: SEED_ARTICLES,
    adSlots: DEFAULT_ADS,
    subscribers: [
      {
        id: 'sub-01',
        email: 'executive.reader@nycapital.com',
        subscribedAt: '2026-11-06T10:00:00Z',
        edition: 'Morning Dispatch',
        status: 'active',
      },
      {
        id: 'sub-02',
        email: 'policy.director@dcstrategy.org',
        subscribedAt: '2026-11-07T08:30:00Z',
        edition: 'Capitol Hill Insider',
        status: 'active',
      },
    ],
    settings: DEFAULT_SETTINGS,
  };

  writeDataFile(initialData);
  globalThis.__BEACON_DB_CACHE__ = initialData;
  return initialData;
}

function writeDataFile(data: DatabaseSchema): void {
  globalThis.__BEACON_DB_CACHE__ = data;

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    // Expected on Vercel / read-only filesystem
  }

  try {
    fs.writeFileSync(TMP_DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    // Ignored if tmp not writable
  }
}

export const db = {
  getArticles(filter?: {
    category?: CategorySlug | string;
    featured?: boolean;
    breaking?: boolean;
    trending?: boolean;
    limit?: number;
    search?: string;
  }): Article[] {
    const data = ensureDataFile();
    let result = [...data.articles];

    if (filter?.category) {
      result = result.filter((a) => a.category === filter.category);
    }
    if (filter?.featured !== undefined) {
      result = result.filter((a) => a.isFeaturedLead === filter.featured);
    }
    if (filter?.breaking !== undefined) {
      result = result.filter((a) => a.isBreaking === filter.breaking);
    }
    if (filter?.trending !== undefined) {
      result = result.filter((a) => a.isTrending === filter.trending);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.subtitle.toLowerCase().includes(q) ||
          a.content.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort primarily by extraction recency, then publication date
    result.sort((a, b) => {
      const updA = new Date(a.updatedAt || a.publishedAt).getTime();
      const updB = new Date(b.updatedAt || b.publishedAt).getTime();
      const pubA = new Date(a.publishedAt).getTime();
      const pubB = new Date(b.publishedAt).getTime();

      const dayA = Math.floor(updA / (24 * 60 * 60 * 1000));
      const dayB = Math.floor(updB / (24 * 60 * 60 * 1000));
      if (dayA !== dayB) {
        return dayB - dayA;
      }

      if (!isNaN(pubA) && !isNaN(pubB) && pubA !== pubB) {
        return pubB - pubA;
      }

      return updB - updA;
    });

    if (filter?.limit) {
      result = result.slice(0, filter.limit);
    }

    return result;
  },

  getArticleBySlug(slug: string): Article | null {
    if (!slug) return null;
    const data = ensureDataFile();
    const cleanSlug = decodeURIComponent(slug).trim().toLowerCase();

    // 1. Exact match
    let match = data.articles.find((a) => a.slug === slug);
    if (match) return match;

    // 2. Case-insensitive decoded slug match
    match = data.articles.find((a) => a.slug.toLowerCase() === cleanSlug);
    if (match) return match;

    // 3. Match by ID (in case link passes art-id or wire-id)
    match = data.articles.find((a) => a.id === slug || a.id.toLowerCase() === cleanSlug);
    if (match) return match;

    // 4. Normalized slug match ignoring hyphens/punctuation
    const simplifiedSlug = cleanSlug.replace(/[^a-z0-9]/g, '');
    match = data.articles.find((a) => a.slug.toLowerCase().replace(/[^a-z0-9]/g, '') === simplifiedSlug);
    return match || null;
  },

  getRelatedArticles(currentSlug: string, category: CategorySlug | string, limit = 4): Article[] {
    const data = ensureDataFile();
    return data.articles
      .filter((a) => a.slug !== currentSlug && a.category === category)
      .slice(0, limit);
  },

  saveArticle(articleData: Partial<Article>): Article {
    const data = ensureDataFile();
    const now = new Date().toISOString();

    if (articleData.id) {
      const index = data.articles.findIndex((a) => a.id === articleData.id);
      if (index !== -1) {
        data.articles[index] = {
          ...data.articles[index],
          ...articleData,
          updatedAt: now,
        } as Article;
        writeDataFile(data);
        return data.articles[index];
      }
    }

    const newArticle: Article = {
      id: articleData.id || `art-${Date.now()}`,
      slug:
        articleData.slug ||
        (articleData.title || 'untitled-article')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, ''),
      title: articleData.title || 'Breaking Dispatch',
      subtitle: articleData.subtitle || '',
      category: (articleData.category as CategorySlug) || 'us-news',
      content: articleData.content || '',
      keyTakeaways: articleData.keyTakeaways || [],
      imageUrl: articleData.imageUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1600&q=80',
      imageCaption: articleData.imageCaption || 'Washington, D.C. Bureau reporting.',
      imageCredit: articleData.imageCredit || 'The American Beacon / Staff',
      author: articleData.author || {
        id: 'auth-01',
        name: 'The American Beacon Staff',
        role: 'National Newsroom Desk',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
        email: 'americanbeacon@americanbeacon.online',
        bio: 'The American Beacon national reporting staff provides verified dispatches from Washington, New York, and regional bureaus.',
      },
      publishedAt: articleData.publishedAt || now,
      updatedAt: now,
      readTimeMinutes: articleData.readTimeMinutes || 4,
      isFeaturedLead: Boolean(articleData.isFeaturedLead),
      isBreaking: Boolean(articleData.isBreaking),
      isTrending: Boolean(articleData.isTrending),
      isEditorsPick: Boolean(articleData.isEditorsPick),
      viewsCount: articleData.viewsCount || 1,
      tags: articleData.tags || ['U.S. News'],
      sources: articleData.sources || ['The American Beacon Newsroom'],
      seo: articleData.seo || {
        metaTitle: `${articleData.title} | The American Beacon`,
        metaDescription: articleData.subtitle || 'Read verified, authoritative news coverage on The American Beacon.',
        keywords: ['Breaking News', 'U.S. News', 'The American Beacon'],
      },
    };

    data.articles.unshift(newArticle);
    writeDataFile(data);
    saveSingleArticleToCloud(newArticle).catch(() => {});
    return newArticle;
  },

  saveArticles(articles: Article[]): Article[] {
    if (!articles || articles.length === 0) return [];
    const data = ensureDataFile();
    const existingIds = new Set(data.articles.map((a) => a.id));
    const existingSlugs = new Set(data.articles.map((a) => a.slug.toLowerCase()));
    const addedArticles: Article[] = [];

    for (const art of articles) {
      if (!art || !art.title) continue;
      const cleanSlug = (
        art.slug ||
        art.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      ).toLowerCase();

      if (!existingIds.has(art.id) && !existingSlugs.has(cleanSlug)) {
        data.articles.unshift(art);
        existingIds.add(art.id);
        existingSlugs.add(cleanSlug);
        addedArticles.push(art);
      }
    }

    if (addedArticles.length > 0) {
      writeDataFile(data);
    }
    return addedArticles;
  },

  async syncLatestArticles(): Promise<void> {
    try {
      const cloudArticles = await fetchRecentArticlesFromCloud();
      if (cloudArticles && cloudArticles.length > 0) {
        const data = ensureDataFile();
        const existingIds = new Set(data.articles.map((a) => a.id));
        const existingSlugs = new Set(data.articles.map((a) => a.slug.toLowerCase()));

        let added = 0;
        for (const art of cloudArticles) {
          if (!existingIds.has(art.id) && !existingSlugs.has(art.slug.toLowerCase())) {
            data.articles.unshift(art);
            existingIds.add(art.id);
            existingSlugs.add(art.slug.toLowerCase());
            added++;
          }
        }
        if (added > 0) {
          writeDataFile(data);
        }
      }
    } catch (e) {
      console.warn('[DB] syncLatestArticles error:', e);
    }
  },

  async findArticleBySlug(slug: string): Promise<Article | null> {
    if (!slug) return null;

    // 1. Check local in-memory/file articles
    const local = this.getArticleBySlug(slug);
    if (local) return local;

    // 2. Direct lookup in cloud key-value store (instant)
    try {
      const cloudDirect = await fetchSingleArticleFromCloud(slug);
      if (cloudDirect) {
        this.saveArticle(cloudDirect);
        return cloudDirect;
      }
    } catch (e) {}

    // 3. Sync recent cloud articles and re-check
    await this.syncLatestArticles();
    const afterSync = this.getArticleBySlug(slug);
    if (afterSync) return afterSync;

    // 4. Live feed deep resolver fallback (prevents false 404 for newly extracted wire items)
    try {
      const { findArticleInLiveFeeds } = await import('@/lib/news-fetcher');
      const liveArticle = await findArticleInLiveFeeds(slug);
      if (liveArticle) return liveArticle;
    } catch (e) {}

    return null;
  },

  deleteArticle(id: string): boolean {
    const data = ensureDataFile();
    const initialLength = data.articles.length;
    data.articles = data.articles.filter((a) => a.id !== id);
    if (data.articles.length !== initialLength) {
      writeDataFile(data);
      return true;
    }
    return false;
  },

  incrementViews(id: string): void {
    const data = ensureDataFile();
    const art = data.articles.find((a) => a.id === id);
    if (art) {
      art.viewsCount = (art.viewsCount || 0) + 1;
      writeDataFile(data);
    }
  },

  getAdSlots(): AdSlot[] {
    const data = ensureDataFile();
    return data.adSlots;
  },

  getAdByPosition(position: string): AdSlot | null {
    const data = ensureDataFile();
    return data.adSlots.find((a) => a.position === position && a.enabled) || null;
  },

  updateAdSlot(id: string, updates: Partial<AdSlot>): AdSlot | null {
    const data = ensureDataFile();
    const index = data.adSlots.findIndex((a) => a.id === id);
    if (index !== -1) {
      data.adSlots[index] = { ...data.adSlots[index], ...updates };
      writeDataFile(data);
      return data.adSlots[index];
    }
    return null;
  },

  getSettings(): SiteSettings {
    const data = ensureDataFile();
    return data.settings;
  },

  updateSettings(updates: Partial<SiteSettings>): SiteSettings {
    const data = ensureDataFile();
    data.settings = { ...data.settings, ...updates };
    writeDataFile(data);
    return data.settings;
  },

  subscribeNewsletter(email: string, edition = 'Morning Dispatch'): { success: boolean; message: string } {
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Please provide a valid email address.' };
    }
    const data = ensureDataFile();
    const existing = data.subscribers.find((s) => s.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: true, message: 'You are already subscribed to The American Beacon daily briefing.' };
    }

    data.subscribers.push({
      id: `sub-${Date.now()}`,
      email: email.trim().toLowerCase(),
      subscribedAt: new Date().toISOString(),
      edition,
      status: 'active',
    });

    writeDataFile(data);
    return { success: true, message: 'Thank you for subscribing! Your first morning dispatch will arrive tomorrow.' };
  },

  getSubscribers(): NewsletterSubscriber[] {
    const data = ensureDataFile();
    return data.subscribers;
  },

  getCategories() {
    return CATEGORIES;
  },
};
