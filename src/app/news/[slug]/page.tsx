import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Clock, Eye, ShieldCheck, UserCheck, Calendar, ArrowLeft } from 'lucide-react';
import { db } from '@/lib/db';
import { CATEGORY_MAP } from '@/data/categories';
import KeyTakeaways from '@/components/KeyTakeaways';
import ShareButtons from '@/components/ShareButtons';
import AudioPlayer from '@/components/AudioPlayer';
import AdBanner from '@/components/AdBanner';
import ArticleCard from '@/components/ArticleCard';
import TrendingSidebar from '@/components/TrendingSidebar';
import NewsImage from '@/components/NewsImage';
import { getArticleOrigin } from '@/lib/content-origin';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await db.findArticleBySlug(slug);
  if (!article) return { title: 'Article Not Found | The American Beacon' };

  const authorName =
    typeof article.author === 'object' && article.author?.name
      ? article.author.name
      : typeof article.author === 'string'
      ? article.author
      : 'The American Beacon Staff';

  const authorTwitter =
    typeof article.author === 'object' && article.author?.twitter
      ? article.author.twitter
      : '@AmericanBeacon';

  return {
    title: `${article.title} | The American Beacon`,
    description: article.subtitle || article.title,
    keywords: Array.isArray(article.tags) ? article.tags : ['Breaking News', 'U.S. News'],
    authors: [{ name: authorName }],
    openGraph: {
      title: article.title,
      description: article.subtitle || article.title,
      url: `https://www.americanbeacon.online/news/${article.slug}`,
      type: 'article',
      publishedTime: article.publishedAt || new Date().toISOString(),
      modifiedTime: article.updatedAt || new Date().toISOString(),
      authors: [authorName],
      section: article.category || 'us-news',
      tags: Array.isArray(article.tags) ? article.tags : [],
      images: [
        {
          url: article.imageUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80',
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.subtitle || article.title,
      images: [article.imageUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80'],
      creator: authorTwitter,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await db.findArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Guaranteed safe author object
  const safeAuthor = {
    id: typeof article.author === 'object' && article.author?.id ? article.author.id : 'auth-01',
    name:
      typeof article.author === 'object' && article.author?.name
        ? article.author.name
        : typeof article.author === 'string'
        ? article.author
        : 'The American Beacon Staff',
    role: typeof article.author === 'object' && article.author?.role ? article.author.role : 'National Newsroom Desk',
    avatar:
      typeof article.author === 'object' && article.author?.avatar
        ? article.author.avatar
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    email: typeof article.author === 'object' && article.author?.email ? article.author.email : 'americanbeacon@americanbeacon.online',
    bio:
      typeof article.author === 'object' && article.author?.bio
        ? article.author.bio
        : 'The American Beacon national reporting staff provides verified dispatches from Washington, New York, and regional bureaus.',
    twitter: typeof article.author === 'object' && article.author?.twitter ? article.author.twitter : '@AmericanBeacon',
  };

  // Increment view counter
  db.incrementViews(article.id);

  const categoryInfo = CATEGORY_MAP.get(article.category);
  const relatedArticles = db.getRelatedArticles(article.slug, article.category, 3);
  const trendingArticles = db.getArticles({ trending: true, limit: 5 });
  const inArticleAd = db.getAdByPosition('in_article');
  const sidebarAd = db.getAdByPosition('sidebar');
  const headerAd = db.getAdByPosition('header');
  const cornerLeftAd = db.getAdByPosition('corner_left');
  const cornerRightAd = db.getAdByPosition('corner_right');
  const cornerFloatingAd = db.getAdByPosition('corner_floating');

  const formattedPublishDate = new Date(article.publishedAt || Date.now()).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedTime = new Date(article.publishedAt || Date.now()).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  const origin = getArticleOrigin(article);
  const isUpdated = Boolean(article.updatedAt && article.updatedAt !== article.publishedAt);
  const formattedUpdateDate = isUpdated
    ? new Date(article.updatedAt!).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })
    : null;

  // Schema.org NewsArticle JSON-LD
  const newsArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.americanbeacon.online/news/${article.slug}`,
    },
    headline: article.title,
    description: article.subtitle,
    image: [article.imageUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80'],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: safeAuthor.name,
      jobTitle: safeAuthor.role,
    },
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: 'The American Beacon',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.americanbeacon.online/icon.png',
      },
    },
    articleSection: categoryInfo?.name || article.category,
    keywords: Array.isArray(article.tags) ? article.tags.join(', ') : 'U.S. News, Breaking News',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
      />

      {/* Desktop Gutter Corner Ads (Left and Right Margins) */}
      <AdBanner position="corner_left" adSlot={cornerLeftAd} />
      <AdBanner position="corner_right" adSlot={cornerRightAd} />

      {/* Floating Bottom-Right Corner Sticky Ad */}
      <AdBanner position="corner_floating" adSlot={cornerFloatingAd} />

      <article className="max-w-7xl mx-auto">
        {/* Top Header Leaderboard Ad */}
        <AdBanner position="header" adSlot={headerAd} className="mb-4" />

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-neutral-500 mb-4 pb-2 border-b border-neutral-200">
          <Link href="/" className="hover:text-red-700 transition">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/category/${article.category}`}
            className="hover:text-red-700 uppercase font-semibold transition"
          >
            {categoryInfo?.name || article.category}
          </Link>
          <span>/</span>
          <span className="truncate text-neutral-400 max-w-xs sm:max-w-md">{article.title}</span>
        </nav>

        {/* Article Headline & Deck */}
        <header className="mb-6 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/category/${article.category}`}
              className="text-xs font-black uppercase tracking-widest text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded inline-block"
            >
              {categoryInfo?.name || article.category}
            </Link>
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${origin.bgClass} ${origin.colorClass} ${origin.borderClass}`}
            >
              {origin.badgeLabel}
            </span>
            <span className="text-xs text-neutral-500 font-semibold">• {article.readTimeMinutes} min read</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-black text-neutral-950 leading-snug sm:leading-[1.18]">
            {article.title}
          </h1>

          <p className="font-serif text-base sm:text-xl text-neutral-700 leading-relaxed max-w-4xl">
            {article.subtitle}
          </p>

          {/* Author Byline & Date */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-neutral-200 text-xs text-neutral-600">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-neutral-200 shrink-0">
                <Image
                  src={safeAuthor.avatar}
                  alt={safeAuthor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-neutral-950 text-sm">{safeAuthor.name}</p>
                <p className="text-neutral-500">{safeAuthor.role}</p>
              </div>
            </div>

            <div className="sm:text-right text-neutral-500 space-y-0.5">
              <p className="font-medium text-neutral-900">
                <time dateTime={article.publishedAt}>Published {formattedPublishDate} at {formattedTime}</time>
              </p>
              {formattedUpdateDate && (
                <p className="text-[11px] text-neutral-600 font-medium">
                  <time dateTime={article.updatedAt}>Updated {formattedUpdateDate}</time>
                </p>
              )}
              <p className="text-[11px] text-neutral-400">
                {origin.sourceLabel} • Editorial Standards Verified
              </p>
            </div>
          </div>
        </header>

        {/* Social Share Bar */}
        <ShareButtons title={article.title} />

        {/* Audio Narration Bar */}
        <AudioPlayer
          title={article.title}
          subtitle={article.subtitle}
          content={article.content}
          readTime={article.readTimeMinutes}
        />

        {/* Lead Hero Image */}
        <figure className="my-6">
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] min-h-[200px] sm:min-h-[260px] md:min-h-[420px] overflow-hidden rounded-lg bg-neutral-200">
            <NewsImage
              src={article.imageUrl}
              alt={article.title}
              category={article.category}
              fallbackSeed={article.slug}
              priority
            />
          </div>
          <figcaption className="text-xs text-neutral-500 mt-2 flex flex-col sm:flex-row sm:justify-between gap-1">
            <span>{article.imageCaption}</span>
            <span className="font-semibold text-neutral-600 shrink-0">{article.imageCredit}</span>
          </figcaption>
        </figure>

        {/* Two-Column Layout (Article Body + Sticky Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8">
          {/* Main Article Body (8 Cols) */}
          <div className="lg:col-span-8">
            {/* Key Takeaways Box */}
            <KeyTakeaways takeaways={article.keyTakeaways} />

            {/* Formatted Journalistic Content */}
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* In-Article Ad Unit (Discreet & Clearly Disclosed) */}
            <div className="my-8">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block text-center mb-1.5">
                Advertisement
              </span>
              <AdBanner position="in_article" adSlot={inArticleAd} />
            </div>

            {/* Sourcing & Verification Notice */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-5 my-8 text-xs text-neutral-700 space-y-3">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                <div className="flex items-center gap-2 font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Sourcing & Editorial Accountability
                </div>
                <Link href="/editorial-policy" className="text-red-700 hover:underline text-[11px] font-semibold">
                  Editorial Standards →
                </Link>
              </div>
              <p>
                The American Beacon adheres to empirical standards of verification and document review. This dispatch incorporates verified primary records from:
              </p>
              <ul className="list-disc list-inside space-y-1 text-neutral-800 font-mono text-[11px]">
                {article.sources.map((src, i) => (
                  <li key={i}>
                    {src.startsWith('http') ? (
                      <a href={src} target="_blank" rel="noopener noreferrer" className="text-red-700 underline break-all">
                        {src}
                      </a>
                    ) : (
                      <span>{src}</span>
                    )}
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-neutral-500">
                <span>
                  Factual correction request? Consult our{' '}
                  <Link href="/corrections" className="text-red-700 underline font-semibold">
                    Corrections Policy
                  </Link>.
                </span>
                <a href="mailto:americanbeacon@americanbeacon.online" className="text-red-700 underline font-semibold shrink-0">
                  americanbeacon@americanbeacon.online
                </a>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-neutral-200">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Topics:</span>
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-800 px-3 py-1 rounded transition"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            {/* Author Biography Card */}
            <div className="bg-neutral-100 rounded-lg p-6 my-8 flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-xs">
                <Image
                  src={safeAuthor.avatar}
                  alt={safeAuthor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <h4 className="font-serif text-lg font-bold text-neutral-900">{safeAuthor.name}</h4>
                  <span className="text-xs font-semibold text-red-700">{safeAuthor.role}</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">{safeAuthor.bio}</p>
                <div className="pt-2 text-xs flex items-center justify-center sm:justify-start gap-4 text-neutral-500">
                  <a href={`mailto:${safeAuthor.email}`} className="hover:text-red-700 underline">
                    {safeAuthor.email}
                  </a>
                  {safeAuthor.twitter && (
                    <a
                      href={`https://twitter.com/${safeAuthor.twitter.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-neutral-900 font-semibold"
                    >
                      {safeAuthor.twitter}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Social Share */}
            <ShareButtons title={article.title} />

            {/* Related Articles Section */}
            {relatedArticles.length > 0 && (
              <div className="mt-12 pt-8 border-t-2 border-neutral-900">
                <h3 className="font-serif text-2xl font-black text-neutral-950 uppercase tracking-wide mb-6">
                  Related Coverage from {categoryInfo?.name || 'the Desk'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {relatedArticles.map((rel) => (
                    <ArticleCard key={rel.id} article={rel} variant="featured" showCategory={false} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <AdBanner position="sidebar" adSlot={sidebarAd} />
            <TrendingSidebar articles={trendingArticles} />
          </aside>
        </div>
      </article>
    </>
  );
}
