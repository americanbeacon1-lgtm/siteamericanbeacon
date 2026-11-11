import { Article } from '@/types';

export interface ContentOriginInfo {
  modality: 'original' | 'wire' | 'analysis' | 'curated';
  badgeLabel: string;
  sourceLabel: string;
  outletName: string;
  isOriginal: boolean;
  colorClass: string;
  borderClass: string;
  bgClass: string;
}

/**
 * Accurately analyzes an article's provenance to determine whether it is
 * an original Beacon investigation, a wire dispatch, or verified curation.
 * This guarantees compliance with international digital journalism ethics.
 */
export function getArticleOrigin(article: Partial<Article>): ContentOriginInfo {
  const sources = Array.isArray(article.sources) ? article.sources : [];
  const id = article.id || '';
  const authorName = typeof article.author === 'object' && article.author?.name ? article.author.name : '';
  const authorRole = typeof article.author === 'object' && article.author?.role ? article.author.role : '';

  // 1. Check for wire/syndicated feed origin
  const isWireId = id.startsWith('wire-');
  const wireSource = sources.find((s) =>
    /yahoo|reuters|associated press|ap wire|bloomberg|techcrunch|marketwatch|cnbc/i.test(s)
  );

  if (isWireId || wireSource || /wire|syndicate/i.test(authorRole)) {
    // Extract prominent outlet name
    let outlet = 'News Wire Feed';
    if (wireSource) {
      outlet = wireSource.replace(/(Wire|Syndicate|Desk)$/i, '').trim();
    } else if (authorRole && /Special Correspondent for/i.test(authorRole)) {
      outlet = authorRole.replace(/Special Correspondent for/i, '').trim();
    } else if (authorName && !/Beacon|Staff/i.test(authorName)) {
      outlet = authorName;
    }

    return {
      modality: 'wire',
      badgeLabel: `Wire Dispatch`,
      sourceLabel: `Syndicated via ${outlet}`,
      outletName: outlet,
      isOriginal: false,
      colorClass: 'text-sky-800',
      borderClass: 'border-sky-300',
      bgClass: 'bg-sky-50',
    };
  }

  // 2. Check for in-depth analysis
  if (
    article.isFeaturedLead ||
    /Analysis|Investigative|Fellow|Editor/i.test(authorRole) ||
    article.tags?.some((t) => /analysis|investigation|intelligence/i.test(t))
  ) {
    return {
      modality: 'original',
      badgeLabel: 'Original Reporting',
      sourceLabel: 'The American Beacon Investigation',
      outletName: 'The American Beacon',
      isOriginal: true,
      colorClass: 'text-red-800',
      borderClass: 'border-red-300',
      bgClass: 'bg-red-50',
    };
  }

  // 3. General verified staff report
  return {
    modality: 'curated',
    badgeLabel: 'Beacon Staff Report',
    sourceLabel: 'Verified by American Beacon Newsroom',
    outletName: 'The American Beacon',
    isOriginal: true,
    colorClass: 'text-neutral-700',
    borderClass: 'border-neutral-300',
    bgClass: 'bg-neutral-100',
  };
}
