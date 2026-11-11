import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Eye, Sparkles } from 'lucide-react';
import { Article } from '@/types';
import { CATEGORY_MAP } from '@/data/categories';
import NewsImage from '@/components/NewsImage';
import { getArticleOrigin } from '@/lib/content-origin';

interface ArticleCardProps {
  article: Article;
  variant?: 'hero' | 'featured' | 'standard' | 'compact' | 'horizontal';
  showCategory?: boolean;
}

export default function ArticleCard({
  article,
  variant = 'standard',
  showCategory = true,
}: ArticleCardProps) {
  const categoryInfo = CATEGORY_MAP.get(article.category);
  const origin = getArticleOrigin(article);

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  if (variant === 'hero') {
    return (
      <article className="group flex flex-col justify-between border-b border-neutral-300 pb-8">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {showCategory && (
              <span className="text-[11px] font-black uppercase tracking-widest text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                {categoryInfo?.name || article.category}
              </span>
            )}
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${origin.bgClass} ${origin.colorClass} ${origin.borderClass}`}
            >
              {origin.badgeLabel}
            </span>
            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
              • {article.readTimeMinutes} min read
            </span>
          </div>

          <Link href={`/news/${article.slug}`} className="block">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-950 group-hover:text-red-700 transition leading-[1.15] mb-4">
              {article.title}
            </h2>
          </Link>

          <p className="font-sans text-base sm:text-lg text-neutral-700 leading-relaxed mb-4">
            {article.subtitle}
          </p>
        </div>

        <Link
          href={`/news/${article.slug}`}
          className="relative w-full aspect-[16/9] min-h-[220px] sm:min-h-[280px] overflow-hidden rounded-lg mb-4 bg-neutral-200 block group/img cursor-pointer"
          title={article.title}
        >
          <NewsImage
            src={article.imageUrl}
            alt={article.title}
            category={article.category}
            fallbackSeed={article.slug}
            priority
            className="group-hover/img:scale-105 transition-transform duration-300"
          />
        </Link>

        <div className="flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-200">
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0">
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="font-bold text-neutral-900">{article.author.name}</span>
            <span className="text-neutral-400">|</span>
            <time dateTime={article.publishedAt}>{formattedDate}</time>
            {!origin.isOriginal && (
              <span className="hidden sm:inline text-[10px] font-mono text-neutral-500">
                ({origin.sourceLabel})
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-neutral-400 text-[11px]">
            <Eye className="w-3.5 h-3.5" />
            <span>{(article.viewsCount || 1).toLocaleString()} reads</span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'featured') {
    return (
      <article className="group flex flex-col justify-between border-b border-neutral-200 pb-6">
        <div>
          <Link
            href={`/news/${article.slug}`}
            className="relative w-full aspect-[16/10] min-h-[180px] overflow-hidden rounded-lg mb-3 bg-neutral-200 block group/img cursor-pointer"
            title={article.title}
          >
            <NewsImage
              src={article.imageUrl}
              alt={article.title}
              category={article.category}
              fallbackSeed={article.slug}
              className="group-hover/img:scale-105 transition-transform duration-300"
            />
          </Link>

          <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
            {showCategory && (
              <span className="text-[10px] font-bold uppercase tracking-widest text-red-700">
                {categoryInfo?.name || article.category}
              </span>
            )}
            <span
              className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border ${origin.bgClass} ${origin.colorClass} ${origin.borderClass}`}
            >
              {origin.badgeLabel}
            </span>
          </div>

          <Link href={`/news/${article.slug}`}>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 group-hover:text-red-700 transition leading-snug mb-2">
              {article.title}
            </h3>
          </Link>

          <p className="text-xs text-neutral-600 line-clamp-3 mb-3 leading-relaxed">
            {article.subtitle}
          </p>
        </div>

        <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-2 border-t border-neutral-100">
          <span className="font-medium text-neutral-700">{article.author.name}</span>
          <time dateTime={article.publishedAt}>{formattedDate}</time>
        </div>
      </article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article className="group flex gap-4 py-4 border-b border-neutral-200 items-start">
        <Link
          href={`/news/${article.slug}`}
          className="relative w-28 h-20 sm:w-36 sm:h-24 shrink-0 rounded-lg overflow-hidden bg-neutral-200 block group/img cursor-pointer"
          title={article.title}
        >
          <NewsImage
            src={article.imageUrl}
            alt={article.title}
            category={article.category}
            fallbackSeed={article.slug}
            className="group-hover/img:scale-105 transition-transform duration-300"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            {showCategory && (
              <span className="text-[10px] font-bold uppercase tracking-widest text-red-700">
                {categoryInfo?.name || article.category}
              </span>
            )}
            <span
              className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border ${origin.bgClass} ${origin.colorClass} ${origin.borderClass}`}
            >
              {origin.badgeLabel}
            </span>
          </div>
          <Link href={`/news/${article.slug}`}>
            <h4 className="font-serif text-sm sm:text-base font-bold text-neutral-900 group-hover:text-red-700 transition line-clamp-2 leading-snug">
              {article.title}
            </h4>
          </Link>
          <div className="flex items-center gap-2 mt-1.5 text-[11px] text-neutral-400">
            <span>{article.author.name}</span>
            <span>•</span>
            <time dateTime={article.publishedAt}>{formattedDate}</time>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="group py-3 border-b border-neutral-200">
        <div className="flex items-center gap-2 mb-1">
          {showCategory && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-700">
              {categoryInfo?.name || article.category}
            </span>
          )}
          <span
            className={`text-[9px] font-bold uppercase tracking-wider px-1.5 rounded border ${origin.bgClass} ${origin.colorClass} ${origin.borderClass}`}
          >
            {origin.badgeLabel}
          </span>
        </div>
        <Link href={`/news/${article.slug}`}>
          <h4 className="font-serif text-sm font-bold text-neutral-900 group-hover:text-red-700 transition leading-snug">
            {article.title}
          </h4>
        </Link>
        <span className="text-[10px] text-neutral-400 mt-1 block">
          <time dateTime={article.publishedAt}>{formattedDate}</time> • {article.readTimeMinutes} min read
        </span>
      </article>
    );
  }

  // Standard Variant
  return (
    <article className="group flex flex-col justify-between border-b border-neutral-200 pb-5">
      <div>
        <Link
          href={`/news/${article.slug}`}
          className="relative w-full aspect-[16/10] min-h-[180px] overflow-hidden rounded-lg mb-3 bg-neutral-200 block group/img cursor-pointer"
          title={article.title}
        >
          <NewsImage
            src={article.imageUrl}
            alt={article.title}
            category={article.category}
            fallbackSeed={article.slug}
            className="group-hover/img:scale-105 transition-transform duration-300"
          />
        </Link>

        <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
          {showCategory && (
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-700">
              {categoryInfo?.name || article.category}
            </span>
          )}
          <span
            className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border ${origin.bgClass} ${origin.colorClass} ${origin.borderClass}`}
          >
            {origin.badgeLabel}
          </span>
        </div>

        <Link href={`/news/${article.slug}`}>
          <h3 className="font-serif text-lg font-bold text-neutral-950 group-hover:text-red-700 transition leading-snug mb-2">
            {article.title}
          </h3>
        </Link>

        <p className="text-xs text-neutral-600 line-clamp-2 mb-3 leading-relaxed">
          {article.subtitle}
        </p>
      </div>

      <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-2 border-t border-neutral-100">
        <span>By {article.author.name}</span>
        <time dateTime={article.publishedAt}>{formattedDate}</time>
      </div>
    </article>
  );
}
