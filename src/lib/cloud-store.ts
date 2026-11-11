import { Article } from '@/types';

const KV_BASE = 'https://kvdb.io/12rW1J2aDFpkXPUJj5ThfS';

let lastFetchTime = 0;
let cachedCloudArticles: Article[] = [];
const CACHE_TTL_MS = 15000; // 15 seconds memory cache

export async function saveRecentArticlesToCloud(newArticles: Article[]): Promise<boolean> {
  if (!newArticles || newArticles.length === 0) return false;
  try {
    const existing = await fetchRecentArticlesFromCloud();
    const map = new Map<string, Article>();

    // Put new articles first
    for (const art of newArticles) {
      if (art && art.slug) {
        map.set(art.slug.toLowerCase(), art);
      }
    }
    // Then existing articles
    for (const art of existing) {
      if (art && art.slug && !map.has(art.slug.toLowerCase())) {
        map.set(art.slug.toLowerCase(), art);
      }
    }

    const payload = Array.from(map.values()).slice(0, 300);
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 4000);

    const res = await fetch(`${KV_BASE}/recent_articles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    });
    clearTimeout(timeout);

    cachedCloudArticles = payload;
    lastFetchTime = Date.now();
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
    const timeout = setTimeout(() => ctrl.abort(), 3000);

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

export async function fetchRecentArticlesFromCloud(): Promise<Article[]> {
  const now = Date.now();
  if (cachedCloudArticles.length > 0 && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedCloudArticles;
  }

  try {
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 3500);

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

  try {
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 3500);

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

  return null;
}
