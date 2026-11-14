import React from 'react';
import Link from 'next/link';
import { Newspaper, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white border border-neutral-200 rounded-xl p-8 shadow-xs">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 text-neutral-700 mx-auto">
          <Newspaper className="w-8 h-8 text-neutral-800" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-red-700">404 • Dispatch Not Found</span>
          <h1 className="font-serif text-3xl font-bold text-neutral-900">Story Not Found</h1>
          <p className="text-sm text-neutral-600 leading-relaxed">
            The dispatch or page you requested could not be located. It may have been archived or updated.
          </p>
        </div>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded transition"
          >
            <Home className="w-4 h-4" /> Front Page
          </Link>
          <Link
            href="/category/breaking-news"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded transition"
          >
            Latest News
          </Link>
        </div>
      </div>
    </div>
  );
}
