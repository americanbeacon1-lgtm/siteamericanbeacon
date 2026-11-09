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

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = db.getArticleBySlug(slug);
  if (!article) return { title: 'Article Not Found | The American Beacon' };

  return {
    title: `${article.title} | The American Beacon`,
    description: article.subtitle,
    keywords: article.tags,
    authors: [{ name: article.author.name }],
    openGraph: {
      title: article.title,
      description: article.subtitle,
      url: `https://americanbeacon.com/news/${article.slug}`,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      section: article.category,
      tags: article.tags,
      images: [
        {
          url: article.imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.subtitle,
      images: [article.imageUrl],
      creator: article.author.twitter || '@AmericanBeacon',
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = db.getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

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

  const formattedPublishDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedTime = new Date(article.publishedAt).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  // Schema.org NewsArticle JSON-LD
  const newsArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://americanbeacon.com/news/${article.slug}`,
    },
    headline: article.title,
    description: article.subtitle,
    image: [article.imageUrl],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
      url: `https://americanbeacon.com/authors/${article.author.id}`,
    },
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: 'The American Beacon',
      logo: {
        '@type': 'ImageObject',
        url: 'https://americanbeacon.com/logo.png',
      },
    },
    articleSection: categoryInfo?.name || article.category,
    keywords: article.tags.join(', '),
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
          <div className="flex items-center gap-2">
            <Link
              href={`/category/${article.category}`}
              className="text-xs font-black uppercase tracking-widest text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded inline-block"
            >
              {categoryInfo?.name || article.category}
            </Link>
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
                  src={article.author.avatar}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-neutral-950 text-sm">{article.author.name}</p>
                <p className="text-neutral-500">{article.author.role}</p>
              </div>
            </div>

            <div className="sm:text-right text-neutral-500 space-y-0.5">
              <p className="font-medium text-neutral-900">
                Published {formattedPublishDate} at {formattedTime}
              </p>
              <p className="text-[11px] text-neutral-400">
                Verified by American Beacon Editorial Board • Washington Bureau
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

            {/* In-Article Mid Ad Unit */}
            <AdBanner position="in_article" adSlot={inArticleAd} className="my-8" />

            {/* Sourcing & Verification Notice */}
            <div className="bg-neutral-50 border border-neutral-200 rounded p-4 my-8 text-xs text-neutral-700 space-y-2">
              <div className="flex items-center gap-2 font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Journalistic Sourcing & Ethics Standards
              </div>
              <p>
                The American Beacon adheres to rigorous standards of accuracy and fact-verification. This report incorporates verified primary records from:
              </p>
              <ul className="list-disc list-inside space-y-1 text-neutral-600">
                {article.sources.map((src, i) => (
                  <li key={i}>{src}</li>
                ))}
              </ul>
              <p className="text-[11px] text-neutral-500 pt-1">
                For corrections or inquiries regarding this reporting, contact our standards editor at{' '}
                <a href="mailto:corrections@americanbeacon.com" className="text-red-700 underline">
                  corrections@americanbeacon.com
                </a>.
              </p>
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
                  src={article.author.avatar}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <h4 className="font-serif text-lg font-bold text-neutral-900">{article.author.name}</h4>
                  <span className="text-xs font-semibold text-red-700">{article.author.role}</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">{article.author.bio}</p>
                <div className="pt-2 text-xs flex items-center justify-center sm:justify-start gap-4 text-neutral-500">
                  <a href={`mailto:${article.author.email}`} className="hover:text-red-700 underline">
                    {article.author.email}
                  </a>
                  {article.author.twitter && (
                    <a
                      href={`https://twitter.com/${article.author.twitter.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-neutral-900 font-semibold"
                    >
                      {article.author.twitter}
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
