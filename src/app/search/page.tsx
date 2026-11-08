import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Search as SearchIcon, ArrowLeft } from 'lucide-react';
import { db } from '@/lib/db';
import ArticleCard from '@/components/ArticleCard';
import TrendingSidebar from '@/components/TrendingSidebar';

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export const metadata: Metadata = {
  title: 'Search News & Dispatches | The American Beacon',
  description: 'Search breaking news, political investigations, financial market reports, and editorial essays across The American Beacon.',
};

export default async function SearchPage({ searchParams }: PageProps) {
  const { q = '' } = await searchParams;
  const query = q.trim();

  const results = query ? db.getArticles({ search: query }) : [];
  const trendingArticles = db.getArticles({ trending: true, limit: 5 });

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="border-b-2 border-neutral-900 pb-6">
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-neutral-950 uppercase tracking-tight mb-4">
          News Archive & Keyword Search
        </h1>

        <form action="/search" method="GET" className="max-w-2xl flex items-center gap-2">
          <div className="relative flex-1">
            <SearchIcon className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search by keyword, company, politician, topic..."
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
          </div>
          <button
            type="submit"
            className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded transition"
          >
            Search
          </button>
        </form>

        {query && (
          <p className="text-xs text-neutral-500 mt-3">
            Showing {results.length} verified results for &quot;<span className="font-bold text-neutral-800">{query}</span>&quot;
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          {query ? (
            results.length > 0 ? (
              <div className="space-y-4">
                {results.map((art) => (
                  <ArticleCard key={art.id} article={art} variant="horizontal" />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center bg-neutral-50 rounded border border-neutral-200">
                <h3 className="font-serif text-xl font-bold text-neutral-800">
                  No matching dispatches found
                </h3>
                <p className="text-xs text-neutral-600 mt-2 max-w-md mx-auto">
                  Try searching with broader terms or check spelling. You can also explore our core sections from the top menu.
                </p>
              </div>
            )
          ) : (
            <div className="py-12 text-center text-neutral-500 text-sm">
              Please enter a keyword above to search our national editorial database.
            </div>
          )}
        </div>

        <aside className="lg:col-span-4 space-y-6">
          <TrendingSidebar articles={trendingArticles} />
        </aside>
      </div>
    </div>
  );
}
