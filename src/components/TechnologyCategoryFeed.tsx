'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, CheckCircle2, Cpu, Shield, Globe, Rocket, Terminal, Layers, Lightbulb, Sparkles, Eye, Filter } from 'lucide-react';
import { Article } from '@/types';
import NewsImage from '@/components/NewsImage';
import { getArticleOrigin } from '@/lib/content-origin';

interface TechnologyCategoryFeedProps {
  articles: Article[];
}

interface SubcategoryDef {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  keywords: RegExp;
}

const TECH_SUBCATEGORIES: SubcategoryDef[] = [
  { id: 'all', label: 'All Technology', icon: Layers, keywords: /.*/ },
  { id: 'ai', label: 'Artificial Intelligence', icon: Sparkles, keywords: /ai|artificial intelligence|machine learning|llm|neural|openai|deepmind|anthropic|chatgpt|model/i },
  { id: 'cybersecurity', label: 'Cybersecurity', icon: Shield, keywords: /cyber|security|hack|breach|malware|ransomware|cisa|fbi|privacy|crypto|encryption/i },
  { id: 'bigtech', label: 'Big Tech', icon: Globe, keywords: /apple|google|alphabet|microsoft|meta|amazon|nvidia|tesla|antitrust|monopoly|sec/i },
  { id: 'startups', label: 'Startups & VC', icon: Rocket, keywords: /startup|venture|funding|series [a-z]|seed|unicorn|y combinator|founder|investor/i },
  { id: 'software', label: 'Software & Cloud', icon: Terminal, keywords: /software|cloud|aws|azure|database|dev|api|code|linux|saas|platform/i },
  { id: 'hardware', label: 'Hardware & Chips', icon: Cpu, keywords: /hardware|semiconductor|chip|tsmc|intel|amd|device|processor|quantum|fab/i },
  { id: 'innovation', label: 'Innovation & Frontier', icon: Lightbulb, keywords: /innovation|breakthrough|frontier|patent|research|biotech|robot|autonomous|energy/i },
  { id: 'science-tech', label: 'Science & Tech', icon: Cpu, keywords: /science|nasa|space|quantum|physics|laboratory|climate tech|astronomy|fusion/i },
];

export default function TechnologyCategoryFeed({ articles }: TechnologyCategoryFeedProps) {
  const [activeSubcategory, setActiveSubcategory] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState<number>(12);

  const filteredArticles = useMemo(() => {
    if (activeSubcategory === 'all') return articles;
    const subcat = TECH_SUBCATEGORIES.find((s) => s.id === activeSubcategory);
    if (!subcat) return articles;

    return articles.filter((art) => {
      const titleMatch = subcat.keywords.test(art.title);
      const subMatch = subcat.keywords.test(art.subtitle || '');
      const tagMatch = art.tags?.some((t) => subcat.keywords.test(t));
      const catMatch = subcat.keywords.test(art.category);
      return titleMatch || subMatch || tagMatch || catMatch;
    });
  }, [articles, activeSubcategory]);

  const displayedArticles = useMemo(() => {
    return filteredArticles.slice(0, visibleCount);
  }, [filteredArticles, visibleCount]);

  const hasMore = visibleCount < filteredArticles.length;

  const handleSelectSubcat = (id: string) => {
    setActiveSubcategory(id);
    setVisibleCount(12);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  const leadStory = displayedArticles[0];
  const secondaryStories = displayedArticles.slice(1, 3);
  const streamStories = displayedArticles.slice(3);

  const formatPublishDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return isNaN(d.getTime())
      ? 'Recent'
      : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="space-y-8">
      {/* 1. Subcategory Filter Ribbon */}
      <div className="bg-neutral-900 text-white p-3.5 sm:p-4 rounded-xl border border-neutral-800 shadow-md">
        <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-neutral-800 text-xs">
          <span className="font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 text-[11px]">
            <Filter className="w-3.5 h-3.5 text-red-500" /> Technology Topics & Desks
          </span>
          <span className="font-mono text-[11px] text-neutral-400">
            {filteredArticles.length} {filteredArticles.length === 1 ? 'Dispatch' : 'Dispatches'}
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 scroll-smooth">
          {TECH_SUBCATEGORIES.map((subcat) => {
            const Icon = subcat.icon;
            const isActive = activeSubcategory === subcat.id;
            return (
              <button
                key={subcat.id}
                onClick={() => handleSelectSubcat(subcat.id)}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-red-700 text-white shadow-md'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                <span>{subcat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {displayedArticles.length === 0 ? (
        <div className="text-center py-20 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3">
          <Cpu className="w-10 h-10 text-neutral-400 mx-auto" />
          <h3 className="font-serif text-xl font-bold text-neutral-900">
            No dispatches filed under this technology subcategory yet
          </h3>
          <p className="text-xs text-neutral-500 max-w-md mx-auto">
            Our technology correspondents monitor SEC filings and enterprise releases around the clock. Try selecting another topic above.
          </p>
          <button
            onClick={() => handleSelectSubcat('all')}
            className="text-xs font-bold uppercase tracking-wider text-red-700 hover:underline pt-2 cursor-pointer"
          >
            ← View All Technology Coverage
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {/* 2. Top Lead Hero Dispatch (Large prominent card) */}
          {leadStory && (
            <div className="border-b-2 border-neutral-900 pb-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7">
                  <Link
                    href={`/news/${encodeURIComponent(leadStory.slug)}`}
                    className="block relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-neutral-100 group shadow-md"
                  >
                    <NewsImage
                      src={leadStory.imageUrl}
                      alt={leadStory.title}
                      category={leadStory.category}
                      fallbackSeed={leadStory.slug}
                      priority
                      className="group-hover:scale-105 transition duration-500 object-cover"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="bg-red-700 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-md">
                        FEATURED TECHNOLOGY LEAD
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="lg:col-span-5 space-y-3">
                  {(() => {
                    const origin = getArticleOrigin(leadStory);
                    return (
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${origin.bgClass} ${origin.colorClass} ${origin.borderClass}`}>
                          {origin.badgeLabel}
                        </span>
                        <span className="text-[11px] text-neutral-500 font-semibold uppercase tracking-wider">
                          • {leadStory.readTimeMinutes || 4} min read
                        </span>
                      </div>
                    );
                  })()}

                  <Link href={`/news/${encodeURIComponent(leadStory.slug)}`}>
                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-950 hover:text-red-700 transition leading-tight">
                      {leadStory.title}
                    </h2>
                  </Link>

                  <p className="font-sans text-sm sm:text-base text-neutral-700 leading-relaxed line-clamp-3">
                    {leadStory.subtitle}
                  </p>

                  <div className="flex items-center justify-between text-xs text-neutral-500 pt-3 border-t border-neutral-200">
                    <span className="font-bold text-neutral-900">
                      By {typeof leadStory.author === 'object' && leadStory.author?.name ? leadStory.author.name : 'Technology Desk'}
                    </span>
                    <time dateTime={leadStory.publishedAt}>{formatPublishDate(leadStory.publishedAt)}</time>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. Secondary Spotlight (2-column prominent cards) */}
          {secondaryStories.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pb-8 border-b border-neutral-200">
              {secondaryStories.map((art) => {
                const origin = getArticleOrigin(art);
                return (
                  <article key={art.id} className="group flex flex-col justify-between space-y-3">
                    <Link
                      href={`/news/${encodeURIComponent(art.slug)}`}
                      className="block relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-neutral-100 shadow-xs"
                    >
                      <NewsImage
                        src={art.imageUrl}
                        alt={art.title}
                        category={art.category}
                        fallbackSeed={art.slug}
                        className="group-hover:scale-105 transition duration-500 object-cover"
                      />
                    </Link>

                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border ${origin.bgClass} ${origin.colorClass} ${origin.borderClass}`}>
                          {origin.badgeLabel}
                        </span>
                        <span className="text-[11px] text-neutral-400">
                          • {art.readTimeMinutes || 3} min read
                        </span>
                      </div>

                      <Link href={`/news/${encodeURIComponent(art.slug)}`}>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-950 group-hover:text-red-700 transition leading-snug line-clamp-2">
                          {art.title}
                        </h3>
                      </Link>

                      <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed">
                        {art.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-2 border-t border-neutral-100">
                      <span className="font-medium text-neutral-700">
                        By {typeof art.author === 'object' && art.author?.name ? art.author.name : 'Technology Desk'}
                      </span>
                      <time dateTime={art.publishedAt}>{formatPublishDate(art.publishedAt)}</time>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* 4. Main Stream of Dispatches (3-column uniform grid) */}
          {streamStories.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-2">
              {streamStories.map((art) => {
                const origin = getArticleOrigin(art);
                return (
                  <article
                    key={art.id}
                    className="group flex flex-col justify-between border-b border-neutral-200 pb-5 hover:border-neutral-400 transition"
                  >
                    <div>
                      <Link
                        href={`/news/${encodeURIComponent(art.slug)}`}
                        className="block relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-neutral-100 mb-3 shadow-xs"
                      >
                        <NewsImage
                          src={art.imageUrl}
                          alt={art.title}
                          category={art.category}
                          fallbackSeed={art.slug}
                          className="group-hover:scale-105 transition duration-300 object-cover"
                        />
                      </Link>

                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border ${origin.bgClass} ${origin.colorClass} ${origin.borderClass}`}>
                          {origin.badgeLabel}
                        </span>
                        <span className="text-[11px] text-neutral-400">
                          • {art.readTimeMinutes || 3} min
                        </span>
                      </div>

                      <Link href={`/news/${encodeURIComponent(art.slug)}`}>
                        <h4 className="font-serif text-base sm:text-lg font-bold text-neutral-950 group-hover:text-red-700 transition leading-snug line-clamp-2 mb-1.5">
                          {art.title}
                        </h4>
                      </Link>

                      <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-3">
                        {art.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-2 border-t border-neutral-100">
                      <span className="truncate max-w-[65%] font-medium text-neutral-700">
                        By {typeof art.author === 'object' && art.author?.name ? art.author.name : 'Technology Desk'}
                      </span>
                      <time dateTime={art.publishedAt}>{formatPublishDate(art.publishedAt)}</time>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* 5. Load More Pagination */}
          {hasMore && (
            <div className="text-center pt-8 pb-4">
              <button
                onClick={handleLoadMore}
                className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <span>Load More Technology Dispatches</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-neutral-500 mt-2">
                Showing {displayedArticles.length} of {filteredArticles.length} stories in this topic
              </p>
            </div>
          )}

          {!hasMore && filteredArticles.length > 12 && (
            <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 pt-6 pb-2 font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>You have reached the end of dispatches in this topic.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
