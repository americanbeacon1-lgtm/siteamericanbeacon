import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Flame, ShieldAlert, TrendingUp, Sparkles, Newspaper, ChevronRight } from 'lucide-react';
import { db } from '@/lib/db';
import ArticleCard from '@/components/ArticleCard';
import AdBanner from '@/components/AdBanner';
import TrendingSidebar from '@/components/TrendingSidebar';
import LatestNewsFeed from '@/components/LatestNewsFeed';

export const revalidate = 300; // 5-minute Edge Cache for Homepage

export default async function HomePage() {
  await db.syncLatestArticles();
  const allArticles = db.getArticles();
  // Ensure the newest news always appears first on the homepage
  const leadArticle = allArticles[0];
  const sideLeadArticles = allArticles.slice(1, 4);
  const trendingArticles = allArticles.filter((a) => a.isTrending);
  const politicsArticles = db.getArticles({ category: 'politics', limit: 4 });
  const businessFinanceArticles = allArticles.filter((a) => a.category === 'business' || a.category === 'finance').slice(0, 4);
  const aiTechArticles = allArticles.filter((a) => a.category === 'technology' || a.category === 'artificial-intelligence').slice(0, 4);
  const scienceHealthArticles = allArticles.filter((a) => a.category === 'science' || a.category === 'health').slice(0, 4);
  const cultureLifeArticles = allArticles.filter((a) => a.category === 'lifestyle' || a.category === 'travel' || a.category === 'entertainment' || a.category === 'sports').slice(0, 4);

  const headerAd = db.getAdByPosition('header');
  const feedAd = db.getAdByPosition('feed');
  const sidebarAd = db.getAdByPosition('sidebar');

  return (
    <div className="space-y-6 sm:space-y-10">
      {/* 1. TOP HEADER LEADERBOARD AD */}
      <AdBanner position="header" adSlot={headerAd} />

      {/* 2. BROADSHEET HERO GRID (Lead Story + Side In-Depth Columns) */}
      <section className="border-b-2 border-neutral-900 pb-6 sm:pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Lead Story (Center/Left 8 Columns) */}
          <div className="lg:col-span-8">
            <ArticleCard article={leadArticle} variant="hero" />

            {/* Sub-lead stories row below main hero */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              {sideLeadArticles.slice(0, 2).map((art) => (
                <ArticleCard key={art.id} article={art} variant="standard" />
              ))}
            </div>
          </div>

          {/* Right Column (4 Columns): Developing Dispatch & Trending Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Developing Alert Card */}
            <div className="bg-red-50 border border-red-200 rounded p-4">
              <div className="flex items-center gap-1.5 text-red-700 text-xs font-black uppercase tracking-widest mb-2">
                <ShieldAlert className="w-4 h-4" /> Developing Dispatch
              </div>
              <h4 className="font-serif text-base font-bold text-neutral-900 leading-snug">
                Capitol Hill Reaches Key Threshold on Federal Appropriations
              </h4>
              <p className="text-xs text-neutral-700 mt-1 leading-relaxed">
                Senate negotiators report breakthrough on agency funding ceilings, averting short-term agency disruptions ahead of the fiscal deadline.
              </p>
              <Link
                href="/category/politics"
                className="text-xs font-bold text-red-700 hover:text-red-800 inline-flex items-center gap-1 mt-2 uppercase tracking-wide"
              >
                Follow Live Updates <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Trending / Most Read Sidebar */}
            <TrendingSidebar articles={trendingArticles.length ? trendingArticles : allArticles} />

            {/* Sticky Sidebar Ad */}
            <AdBanner position="sidebar" adSlot={sidebarAd} />
          </div>
        </div>
      </section>

      {/* 2.5 ALL RECENT EXTRACTED WIRE DISPATCHES (Continuous Stream) */}
      <LatestNewsFeed
        articles={allArticles.slice(1)}
        title="Continuous National News Wire • U.S. Dispatches"
        subtitle="Chronological verified reporting, policy analysis, and wire dispatches from Washington, Wall Street, and national correspondents."
      />

      {/* 3. IN-DEPTH: ARTIFICIAL INTELLIGENCE & TECH FRONTIER */}
      <section className="pt-2">
        <div className="flex items-center justify-between pb-3 border-b-2 border-neutral-900 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-indigo-700 rounded-sm"></span>
            <h2 className="font-serif text-2xl font-black text-neutral-950 uppercase tracking-wide">
              Artificial Intelligence & Technology
            </h2>
          </div>
          <Link
            href="/category/artificial-intelligence"
            className="text-xs font-bold text-red-700 hover:text-red-800 flex items-center gap-1 uppercase tracking-wider"
          >
            Explore Tech Desk <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiTechArticles.map((article) => (
            <ArticleCard key={article.id} article={article} variant="standard" />
          ))}
        </div>
      </section>

      {/* 4. MID-PAGE BILLBOARD ADVERTISEMENT */}
      <AdBanner position="feed" adSlot={feedAd} />

      {/* 5. POLITICS & CAPITOL HILL */}
      <section className="pt-2">
        <div className="flex items-center justify-between pb-3 border-b-2 border-neutral-900 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-700 rounded-sm"></span>
            <h2 className="font-serif text-2xl font-black text-neutral-950 uppercase tracking-wide">
              Politics & White House Desk
            </h2>
          </div>
          <Link
            href="/category/politics"
            className="text-xs font-bold text-red-700 hover:text-red-800 flex items-center gap-1 uppercase tracking-wider"
          >
            All Political Analysis <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {politicsArticles.map((article) => (
            <ArticleCard key={article.id} article={article} variant="featured" />
          ))}
        </div>
      </section>

      {/* 6. BUSINESS & WALL STREET */}
      <section className="pt-2">
        <div className="flex items-center justify-between pb-3 border-b-2 border-neutral-900 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-emerald-700 rounded-sm"></span>
            <h2 className="font-serif text-2xl font-black text-neutral-950 uppercase tracking-wide">
              Wall Street, Markets & Corporate America
            </h2>
          </div>
          <Link
            href="/category/finance"
            className="text-xs font-bold text-red-700 hover:text-red-800 flex items-center gap-1 uppercase tracking-wider"
          >
            Financial Markets Desk <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {businessFinanceArticles.map((article) => (
            <ArticleCard key={article.id} article={article} variant="standard" />
          ))}
        </div>
      </section>

      {/* 7. SCIENCE, HEALTH & MEDICINE */}
      <section className="pt-2">
        <div className="flex items-center justify-between pb-3 border-b-2 border-neutral-900 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-cyan-700 rounded-sm"></span>
            <h2 className="font-serif text-2xl font-black text-neutral-950 uppercase tracking-wide">
              Science & Health Discoveries
            </h2>
          </div>
          <Link
            href="/category/science"
            className="text-xs font-bold text-red-700 hover:text-red-800 flex items-center gap-1 uppercase tracking-wider"
          >
            All Science News <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scienceHealthArticles.map((article) => (
            <ArticleCard key={article.id} article={article} variant="featured" />
          ))}
        </div>
      </section>

      {/* 8. CULTURE, LIFESTYLE & SPORTS */}
      <section className="pt-2">
        <div className="flex items-center justify-between pb-3 border-b-2 border-neutral-900 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-amber-600 rounded-sm"></span>
            <h2 className="font-serif text-2xl font-black text-neutral-950 uppercase tracking-wide">
              American Living, Culture & Sports
            </h2>
          </div>
          <Link
            href="/category/lifestyle"
            className="text-xs font-bold text-red-700 hover:text-red-800 flex items-center gap-1 uppercase tracking-wider"
          >
            Explore Lifestyle <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cultureLifeArticles.map((article) => (
            <ArticleCard key={article.id} article={article} variant="standard" />
          ))}
        </div>
      </section>
    </div>
  );
}
