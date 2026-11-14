import React from 'react';
import Link from 'next/link';
import { Flame, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Article } from '@/types';
import { CATEGORY_MAP } from '@/data/categories';

interface TrendingSidebarProps {
  articles: Article[];
}

export default function TrendingSidebar({ articles = [] }: TrendingSidebarProps) {
  const topArticles = (articles || []).filter((a) => a && a.slug).slice(0, 5);

  return (
    <div className="bg-white border border-neutral-200 rounded p-5 shadow-2xs">
      <div className="flex items-center justify-between pb-3 border-b-2 border-neutral-900 mb-4">
        <h3 className="font-serif text-lg font-bold text-neutral-950 uppercase tracking-wide flex items-center gap-1.5">
          <Flame className="w-5 h-5 text-red-600 fill-current" /> Most Read & Trending
        </h3>
        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
          Live Tracking
        </span>
      </div>

      <div className="space-y-4">
        {topArticles.map((article, idx) => {
          const categoryInfo = CATEGORY_MAP.get(article.category);
          return (
            <div key={article.id} className="flex items-start gap-3 group">
              <span className="font-serif text-3xl font-black text-neutral-300 group-hover:text-red-700 transition leading-none shrink-0 w-6 text-center">
                {idx + 1}
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-bold uppercase tracking-widest text-red-700 block mb-0.5">
                  {categoryInfo?.name || article.category}
                </span>
                <Link href={`/news/${article.slug}`}>
                  <h4 className="font-serif text-sm font-bold text-neutral-900 group-hover:text-red-700 transition leading-snug line-clamp-2">
                    {article.title}
                  </h4>
                </Link>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-neutral-400">
                  <span>{article.viewsCount.toLocaleString()} reads</span>
                  <span>•</span>
                  <span>{article.readTimeMinutes} min read</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-neutral-200">
        <Link
          href="/category/breaking-news"
          className="text-xs font-bold text-neutral-900 hover:text-red-700 flex items-center justify-between uppercase tracking-wider group"
        >
          <span>View All Developing Stories</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
        </Link>
      </div>
    </div>
  );
}
