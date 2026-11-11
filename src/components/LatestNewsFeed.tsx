'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Newspaper, ChevronRight, Clock, Flame, Filter, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Article, CategorySlug } from '@/types';
import { CATEGORY_MAP } from '@/data/categories';
import NewsImage from '@/components/NewsImage';

interface LatestNewsFeedProps {
  articles: Article[];
  title?: string;
  subtitle?: string;
}

const CATEGORY_TABS: { label: string; value: string }[] = [
  { label: 'Todas as Notícias', value: 'all' },
  { label: 'Plantão / Breaking', value: 'breaking-news' },
  { label: 'U.S. News', value: 'us-news' },
  { label: 'Politics', value: 'politics' },
  { label: 'Business & Finance', value: 'business' },
  { label: 'AI & Tech', value: 'technology' },
  { label: 'World News', value: 'world-news' },
  { label: 'Science & Health', value: 'science' },
  { label: 'Sports', value: 'sports' },
];

export default function LatestNewsFeed({
  articles = [],
  title = 'Plantão Contínuo de Notícias Recentes',
  subtitle = 'Todas as reportagens extraídas e atualizadas dos principais veículos dos Estados Unidos.',
}: LatestNewsFeedProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState<number>(18);

  // Filter articles based on active category tab
  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'all') return articles;
    if (selectedCategory === 'business') {
      return articles.filter((a) => a.category === 'business' || a.category === 'finance');
    }
    if (selectedCategory === 'technology') {
      return articles.filter((a) => a.category === 'technology' || a.category === 'artificial-intelligence');
    }
    if (selectedCategory === 'science') {
      return articles.filter((a) => a.category === 'science' || a.category === 'health');
    }
    return articles.filter((a) => a.category === selectedCategory);
  }, [articles, selectedCategory]);

  const displayedArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 18);
  };

  const formatPublishDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <section className="pt-4 border-t-2 border-neutral-900">
      {/* Header with Title and Real-Time Count */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 text-red-700 text-xs font-black uppercase tracking-widest mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
            <span>WIRE DESK EM TEMPO REAL</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-950 uppercase tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            {subtitle}
          </p>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-2 text-xs font-mono bg-neutral-100 text-neutral-700 px-3 py-1.5 rounded-full border border-neutral-200 self-start md:self-auto">
          <Newspaper className="w-3.5 h-3.5 text-red-700" />
          <span>
            Exibindo <strong>{displayedArticles.length}</strong> de <strong>{filteredArticles.length}</strong> matérias
          </span>
        </div>
      </div>

      {/* Filter Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-3 scrollbar-none border-b border-neutral-100">
        {CATEGORY_TABS.map((tab) => {
          const isActive = selectedCategory === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => {
                setSelectedCategory(tab.value);
                setVisibleCount(18);
              }}
              className={`shrink-0 px-3 py-1 text-xs font-semibold rounded-full transition cursor-pointer ${
                isActive
                  ? 'bg-neutral-950 text-white shadow-sm'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Grid of Articles */}
      {displayedArticles.length === 0 ? (
        <div className="text-center py-12 text-neutral-500">
          <p className="font-serif text-lg">Nenhuma notícia encontrada nesta categoria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-6">
          {displayedArticles.map((article, idx) => {
            const catInfo = CATEGORY_MAP.get(article.category);
            const isFreshLead = idx < 3;

            return (
              <article
                key={article.id || `${article.slug}-${idx}`}
                className="group flex flex-col justify-between border-b border-neutral-200 pb-6 hover:border-neutral-400 transition"
              >
                <div>
                  {/* Image */}
                  <Link href={`/news/${encodeURIComponent(article.slug)}`} className="block overflow-hidden rounded bg-neutral-100 mb-3 relative aspect-[16/10]">
                    <NewsImage
                      src={article.imageUrl}
                      alt={article.title}
                      category={article.category}
                      fill
                      className="object-cover group-hover:scale-103 transition duration-300"
                    />
                    {isFreshLead && (
                      <span className="absolute top-2 left-2 bg-red-700 text-white font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                        RECÉM-EXTRAÍDA
                      </span>
                    )}
                  </Link>

                  {/* Metadata Bar */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                      {catInfo?.name || article.category}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-medium">
                      • {article.readTimeMinutes || 3} min read
                    </span>
                  </div>

                  {/* Headline */}
                  <Link href={`/news/${encodeURIComponent(article.slug)}`} className="block">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-900 group-hover:text-red-700 transition leading-snug line-clamp-3 mb-2">
                      {article.title}
                    </h3>
                  </Link>

                  {/* Subtitle / Deck snippet */}
                  {article.subtitle && (
                    <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed mb-3">
                      {article.subtitle}
                    </p>
                  )}
                </div>

                {/* Card Footer: Source / Author & Date */}
                <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-3 border-t border-neutral-100 mt-2">
                  <span className="truncate max-w-[65%] font-medium text-neutral-700">
                    By {typeof article.author === 'object' && article.author?.name ? article.author.name : (typeof article.author === 'string' ? article.author : 'National Desk')}
                  </span>
                  <span className="shrink-0">{formatPublishDate(article.publishedAt)}</span>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center pt-8 pb-4">
          <button
            onClick={handleLoadMore}
            className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <span>Carregar Mais Notícias Recentes (+18)</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <p className="text-[11px] text-neutral-500 mt-2">
            Mostrando {displayedArticles.length} de {filteredArticles.length} matérias disponíveis no portal
          </p>
        </div>
      )}

      {!hasMore && filteredArticles.length > 18 && (
        <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 pt-8 pb-4 font-mono">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Você visualizou todas as reportagens recentes extraídas no portal.</span>
        </div>
      )}
    </section>
  );
}
