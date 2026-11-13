import { Article } from '@/types';

// In-memory fast cache to replace kvdb.io and avoid external subrequests/errors
let cachedArticles: Article[] = [];
const articleMap = new Map<string, Article>();

export async function saveRecentArticlesToCloud(newArticles: Article[]): Promise<boolean> {
  if (!newArticles || newArticles.length === 0) return true;
  for (const art of newArticles) {
    if (art && art.slug) {
      const key = art.slug.toLowerCase().trim();
      articleMap.set(key, art);
      if (art.id) articleMap.set(art.id.toLowerCase().trim(), art);
    }
  }
  cachedArticles = Array.from(articleMap.values()).slice(0, 150);
  return true;
}

export async function saveSingleArticleToCloud(article: Article): Promise<boolean> {
  if (!article || !article.slug) return true;
  const key = article.slug.toLowerCase().trim();
  articleMap.set(key, article);
  if (article.id) articleMap.set(article.id.toLowerCase().trim(), article);
  return true;
}

export async function batchSaveArticlesToCloud(articles: Article[]): Promise<{ saved: number; failed: number }> {
  if (!articles || articles.length === 0) return { saved: 0, failed: 0 };
  for (const art of articles) {
    saveSingleArticleToCloud(art);
  }
  return { saved: articles.length, failed: 0 };
}

export async function fetchRecentArticlesFromCloud(): Promise<Article[]> {
  return cachedArticles;
}

export async function fetchSingleArticleFromCloud(slug: string): Promise<Article | null> {
  if (!slug) return null;
  const cleanSlug = decodeURIComponent(slug).toLowerCase().trim();
  const found = articleMap.get(cleanSlug);
  if (found) return found;

  const simplified = cleanSlug.replace(/[^a-z0-9]/g, '');
  for (const [k, v] of articleMap.entries()) {
    if (k.replace(/[^a-z0-9]/g, '') === simplified) {
      return v;
    }
  }

  return null;
}
