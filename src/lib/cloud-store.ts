import { Article } from '@/types';

const KV_BASE = 'https://kvdb.io/12rW1J2aDFpkXPUJj5ThfS';

let lastFetchTime = 0;
let cachedCloudArticles: Article[] = [];
const CACHE_TTL_MS = 25000; // 25 seconds memory cache

export async function saveRecentArticlesToCloud(newArticles: Article[]): Promise<boolean> {
  if (!newArticles || newArticles.length === 0) return false;
  try {
    const existing = await fetchRecentArticlesFromCloud();
    const map = new Map<string, Article>();

    // Put new articles first
    for (const art of newArticles) {
      if (art && art.slug) {
        map.set(art.slug.toLowerCase().trim(), art);
      }
    }
    // Then existing articles
    for (const art of existing) {
      if (art && art.slug) {
        const key = art.slug.toLowerCase().trim();
        if (!map.has(key)) {
          map.set(key, art);
        }
      }
    }

    // Keep the top 75 most recent articles with full content (~180KB total)
    // This fits easily within KV limits and uploads in under 1 second without timing out
    const payload = Array.from(map.values()).slice(0, 75);
    cachedCloudArticles = payload;
    lastFetchTime = Date.now();

    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 7000);

    const res = await fetch(`${KV_BASE}/recent_articles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    });
    clearTimeout(timeout);

    return res.ok;
  } catch (error) {
    console.warn('[CloudStore] Failed to save recent articles:', error);
    return false;
  }
}

export async function saveSingleArticleToCloud(article: Article): Promise<boolean> {
  if (!article || !article.slug) return false;
  try {
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 2500);

    const cleanSlug = article.slug.toLowerCase().trim();
    const res = await fetch(`${KV_BASE}/art_${cleanSlug}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(article),
      signal: ctrl.signal,
    });
    clearTimeout(timeout);
    return res.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Fast parallel saver for top dispatches (up to 20 articles in parallel),
 * ensuring individual cloud endpoints are immediately ready.
 */
export async function batchSaveArticlesToCloud(articles: Article[]): Promise<{ saved: number; failed: number }> {
  if (!articles || articles.length === 0) return { saved: 0, failed: 0 };

  const target = articles.slice(0, 20);
  const results = await Promise.allSettled(target.map((art) => saveSingleArticleToCloud(art)));
  let saved = 0;
  let failed = 0;
  for (const r of results) {
    if (r.status === 'fulfilled' && r.value) {
      saved++;
    } else {
      failed++;
    }
  }

  return { saved, failed };
}

export async function fetchRecentArticlesFromCloud(): Promise<Article[]> {
  const now = Date.now();
  if (cachedCloudArticles.length > 0 && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedCloudArticles;
  }

  try {
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 4000);

    const res = await fetch(`${KV_BASE}/recent_articles`, {
      signal: ctrl.signal,
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        cachedCloudArticles = data;
        lastFetchTime = now;
        return data;
      }
    }
  } catch (error) {
    // Cloud fetch timeout or error, fallback silently
  }

  return cachedCloudArticles;
}

export async function fetchSingleArticleFromCloud(slug: string): Promise<Article | null> {
  if (!slug) return null;
  const cleanSlug = decodeURIComponent(slug).toLowerCase().trim();

  // 1. Instant check in memory cached articles
  if (cachedCloudArticles.length > 0) {
    const found = cachedCloudArticles.find(
      (a) => a.slug?.toLowerCase().trim() === cleanSlug || a.id?.toLowerCase().trim() === cleanSlug
    );
    if (found) return found;
  }

  // 2. Direct key lookup in KV
  try {
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 3000);

    const res = await fetch(`${KV_BASE}/art_${cleanSlug}`, {
      signal: ctrl.signal,
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
    });
    clearTimeout(timeout);

    if (res.ok) {
      const article = await res.json();
      if (article && article.id && article.title) {
        return article as Article;
      }
    }
  } catch (e) {}

  // 3. Fallback: refresh recent articles and check
  try {
    const fresh = await fetchRecentArticlesFromCloud();
    const found = fresh.find(
      (a) => a.slug?.toLowerCase().trim() === cleanSlug || a.id?.toLowerCase().trim() === cleanSlug
    );
    if (found) return found;
  } catch (e) {}

  return null;
}
