import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { db } from '@/lib/db';
import { CATEGORY_MAP, CATEGORIES } from '@/data/categories';
import { CategorySlug } from '@/types';
import ArticleCard from '@/components/ArticleCard';
import AdBanner from '@/components/AdBanner';
import TrendingSidebar from '@/components/TrendingSidebar';
import TechnologyCategoryFeed from '@/components/TechnologyCategoryFeed';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORY_MAP.get(slug as CategorySlug);
  if (!category) return { title: 'Category Not Found | The American Beacon' };

  return {
    title: category.seoTitle,
    description: category.seoDescription,
    openGraph: {
      title: category.seoTitle,
      description: category.seoDescription,
      url: `https://www.americanbeacon.online/category/${category.slug}`,
      siteName: 'The American Beacon',
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = CATEGORY_MAP.get(slug as CategorySlug);

  if (!category) {
    notFound();
  }

  await db.syncLatestArticles();
  let categoryArticles = db.getArticles({ category: category.slug });

  // For the Technology desk, dynamically pull all technology and AI dispatches
  if (category.slug === 'technology') {
    const allArticles = db.getArticles();
    const techRelated = allArticles.filter(
      (a) =>
        a.category === 'technology' ||
        a.category === 'artificial-intelligence' ||
        a.tags?.some((t) => /ai|tech|cyber|software|hardware|startup|computing|semiconductor|cloud|intel|apple|nvidia/i.test(t))
    );
    const seen = new Set<string>();
    const merged = [...categoryArticles, ...techRelated].filter((a) => {
      if (seen.has(a.id)) return false;
      seen.add(a.id);
      return true;
    });
    categoryArticles = merged;
  }

  const trendingArticles = db.getArticles({ trending: true, limit: 5 });
  const headerAd = db.getAdByPosition('header');
  const sidebarAd = db.getAdByPosition('sidebar');

  const leadArticle = categoryArticles[0];
  const remainingArticles = categoryArticles.slice(1);

  return (
    <div className="space-y-8">
      {/* Top Category Header Banner */}
      <div className="border-b-4 border-neutral-900 pb-6 pt-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span
              className="text-[11px] font-black uppercase tracking-widest px-2.5 py-1 rounded inline-block text-white"
              style={{ backgroundColor: category.accentColor }}
            >
              Editorial Desk
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-black text-neutral-950 uppercase tracking-tight">
              {category.name}
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
              {category.description}
            </p>
          </div>

          <div className="text-xs text-neutral-500 font-semibold shrink-0">
            {categoryArticles.length} Verified {categoryArticles.length === 1 ? 'Dispatch' : 'Dispatches'}
          </div>
        </div>
      </div>

      {/* Leaderboard Ad */}
      <AdBanner position="header" adSlot={headerAd} />

      {/* Content Layout */}
      {categoryArticles.length === 0 ? (
        <div className="text-center py-20 bg-neutral-50 rounded-xl border border-neutral-200">
          <h3 className="font-serif text-2xl font-bold text-neutral-800">
            Fresh dispatches being filed for {category.name}
          </h3>
          <p className="text-sm text-neutral-600 mt-2">
            Our Washington and national correspondents are currently verifying breaking reports in this section.
          </p>
          <Link
            href="/"
            className="inline-block mt-4 text-xs font-bold uppercase tracking-wider text-red-700 hover:text-red-800"
          >
            ← Return to Front Page
          </Link>
        </div>
      ) : category.slug === 'technology' ? (
        /* Enhanced Technology Desk Experience */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <TechnologyCategoryFeed articles={categoryArticles} />
          </div>
          <aside className="lg:col-span-4 space-y-6">
            <TrendingSidebar articles={trendingArticles} />
            <AdBanner position="sidebar" adSlot={sidebarAd} />
          </aside>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Category Feed (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            {leadArticle && (
              <ArticleCard article={leadArticle} variant="hero" showCategory={false} />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-200">
              {remainingArticles.map((art) => (
                <ArticleCard key={art.id} article={art} variant="standard" showCategory={false} />
              ))}
            </div>
          </div>

          {/* Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <TrendingSidebar articles={trendingArticles} />
            <AdBanner position="sidebar" adSlot={sidebarAd} />
          </aside>
        </div>
      )}
    </div>
  );
}
