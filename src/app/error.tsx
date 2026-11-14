'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console without breaking runtime
    console.error('[American Beacon ErrorBoundary]:', error?.message || error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white border border-neutral-200 rounded-xl p-8 shadow-xs">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-50 text-red-700 mx-auto border border-red-200">
          <AlertCircle className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-red-700">Dispatch Loading Notice</span>
          <h2 className="font-serif text-2xl font-bold text-neutral-900">Temporary Dispatch Delay</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            The requested news item is updating. Please refresh or return to the main edition.
          </p>
        </div>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded transition cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" /> Reload Dispatch
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded transition"
          >
            <Home className="w-4 h-4" /> Front Page
          </Link>
        </div>
      </div>
    </div>
  );
}
