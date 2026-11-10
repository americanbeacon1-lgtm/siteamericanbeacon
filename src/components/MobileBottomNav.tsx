'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Flame,
  Search,
  LayoutGrid,
  X,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { CATEGORIES } from '@/data/categories';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [sectionsOpen, setSectionsOpen] = useState(false);

  return (
    <>
      {/* 1. SLIDE-UP CATEGORIES DRAWER FOR MOBILE */}
      {sectionsOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setSectionsOpen(false)}
          />

          {/* Drawer Sheet */}
          <div className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-neutral-950 text-white rounded-t-2xl shadow-2xl flex flex-col z-10 animate-in slide-in-from-bottom duration-200 border-t border-neutral-800">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse"></span>
                <h3 className="font-serif text-lg font-bold text-white tracking-tight">
                  Editorial Desks & Sections
                </h3>
              </div>
              <button
                onClick={() => setSectionsOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white"
                aria-label="Close sections"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Category Grid */}
            <div className="p-4 overflow-y-auto space-y-4 max-h-[60vh]">
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((cat) => {
                  const isActive = pathname === `/category/${cat.slug}`;
                  const isBreaking = cat.slug === 'breaking-news';
                  return (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      onClick={() => setSectionsOpen(false)}
                      className={`flex items-center justify-between p-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                        isActive
                          ? 'bg-red-700 text-white'
                          : isBreaking
                          ? 'bg-red-950/60 text-red-400 border border-red-800/50'
                          : 'bg-neutral-900 text-neutral-200 hover:bg-neutral-800'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                    </Link>
                  );
                })}
              </div>

              {/* Direct Quick Links */}
              <div className="pt-3 border-t border-neutral-800 space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2 text-neutral-400 text-[11px] pt-1">
                  <Link
                    href="/newsletters"
                    className="p-2 bg-neutral-900 rounded hover:text-white"
                    onClick={() => setSectionsOpen(false)}
                  >
                    📬 Newsletters
                  </Link>
                  <Link
                    href="/subscribe"
                    className="p-2 bg-neutral-900 rounded text-red-400 font-bold hover:text-red-300"
                    onClick={() => setSectionsOpen(false)}
                  >
                    ⭐ Subscribe
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. FIXED MOBILE BOTTOM NAVIGATION BAR */}
      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-neutral-200 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] px-2 py-1.5"
        style={{ paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom))' }}
      >
        <div className="grid grid-cols-4 items-center justify-around text-center">
          {/* Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center py-1 px-1 rounded transition ${
              pathname === '/'
                ? 'text-red-700 font-bold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Home</span>
          </Link>

          {/* Sections / Desks */}
          <button
            onClick={() => setSectionsOpen(!sectionsOpen)}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded transition ${
              sectionsOpen
                ? 'text-red-700 font-bold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <LayoutGrid className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Sections</span>
          </button>

          {/* Trending / Breaking */}
          <Link
            href="/category/breaking-news"
            className={`flex flex-col items-center justify-center py-1 px-1 rounded transition ${
              pathname === '/category/breaking-news'
                ? 'text-red-700 font-bold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Flame className="w-5 h-5 mb-0.5 text-red-600 fill-current" />
            <span className="text-[10px] tracking-tight text-red-700 font-bold">Trending</span>
          </Link>

          {/* Search */}
          <Link
            href="/search"
            className={`flex flex-col items-center justify-center py-1 px-1 rounded transition ${
              pathname === '/search'
                ? 'text-red-700 font-bold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Search className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Search</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
