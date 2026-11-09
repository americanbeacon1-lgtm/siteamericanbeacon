'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Bell,
  Menu,
  X,
  TrendingUp,
  CloudSun,
  ShieldAlert,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Globe,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { CATEGORIES } from '@/data/categories';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentDateStr, setCurrentDateStr] = useState('');
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  const navScrollRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (navScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navScrollRef.current;
      setCanScrollLeft(scrollLeft > 6);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
    }
  };

  useEffect(() => {
    // Initial check and resize observer
    checkScroll();
    const handleResize = () => checkScroll();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMoreMenuOpen(false);
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Click outside to close More dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setMoreMenuOpen(false);
      }
    }
    if (moreMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [moreMenuOpen]);

  const scrollNav = (direction: 'left' | 'right') => {
    if (navScrollRef.current) {
      const scrollAmount = 260;
      navScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 320);
    }
  };

  useEffect(() => {
    // Standard US date formatting: "Sunday, November 8, 2026"
    const now = new Date();
    const formatted = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setCurrentDateStr(formatted);
  }, []);

  const marketTickers = [
    { symbol: 'S&P 500', value: '5,983.42', change: '+0.38%', up: true },
    { symbol: 'DOW 30', value: '43,729.34', change: '+0.59%', up: true },
    { symbol: 'NASDAQ', value: '19,269.46', change: '+0.09%', up: true },
    { symbol: '10-YR YIELD', value: '4.30%', change: '-0.02', up: false },
    { symbol: 'CRUDE OIL', value: '$70.38', change: '+0.44%', up: true },
    { symbol: 'GOLD (OZ)', value: '$2,684.50', change: '+0.12%', up: true },
    { symbol: 'BITCOIN', value: '$76,410.00', change: '+1.25%', up: true },
  ];

  return (
    <header className="w-full bg-white border-b border-neutral-200">
      {/* 1. TOP UTILITY BAR */}
      <div className="bg-neutral-900 text-neutral-300 text-xs py-1 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
            <span className="font-semibold text-white tracking-wider flex items-center gap-1.5 text-[11px] sm:text-xs">
              <Globe className="w-3.5 h-3.5 text-red-500" /> U.S. EDITION
            </span>
            <span className="hidden md:inline text-neutral-400">|</span>
            <span className="hidden md:inline text-neutral-300">
              {currentDateStr || 'Sunday, November 8, 2026'}
            </span>
            <span className="hidden lg:inline text-neutral-400">|</span>
            <span className="hidden lg:inline-flex items-center gap-1 text-neutral-300">
              <CloudSun className="w-3.5 h-3.5 text-amber-400" /> Washington, D.C. 54°F
            </span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <a
              href="/admin"
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold transition bg-amber-950/40 px-2 sm:px-2.5 py-0.5 rounded border border-amber-600/30 text-[10px] sm:text-[11px]"
              title="Abrir Console Editorial Administrativo"
            >
              <Sliders className="w-3 h-3" />
              <span className="hidden sm:inline">Painel Admin</span>
              <span className="sm:hidden">Admin</span>
            </a>
            <span className="hidden sm:inline text-neutral-600">|</span>
            <Link href="/newsletters" className="hidden sm:inline hover:text-white transition">
              Newsletters
            </Link>
            <Link
              href="/subscribe"
              className="bg-red-700 hover:bg-red-600 text-white font-semibold px-2 sm:px-2.5 py-0.5 rounded text-[10px] sm:text-[11px] uppercase tracking-wide transition"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </div>

      {/* 2. REAL-TIME FINANCIAL MARKET TICKER */}
      <div className="bg-neutral-950 text-neutral-200 border-b border-neutral-800 text-[11px] font-mono overflow-x-auto py-1 px-4 scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center space-x-6 whitespace-nowrap min-w-max">
          <span className="text-neutral-400 uppercase text-[10px] tracking-wider font-sans font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-red-500" /> Wall Street Pulse
          </span>
          {marketTickers.map((t) => (
            <div key={t.symbol} className="flex items-center space-x-1.5">
              <span className="text-neutral-400 font-semibold">{t.symbol}</span>
              <span className="text-white font-bold">{t.value}</span>
              <span className={`text-[10px] ${t.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                {t.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. MASTHEAD / BRANDING */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3.5 sm:py-5 border-b border-neutral-200">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Left Action / Search & Mobile Drawer Buttons */}
          <div className="flex items-center space-x-1.5 sm:space-x-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-800 hover:text-neutral-950 md:hidden rounded-lg hover:bg-neutral-100 transition focus:outline-none"
              aria-label="Open Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden md:flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 border border-neutral-300 rounded px-3 py-1.5 transition"
            >
              <Search className="w-3.5 h-3.5" />
              <span>SEARCH</span>
            </button>
          </div>

          {/* Centered Grand Masthead */}
          <div className="text-center flex-1 min-w-0">
            <Link href="/" className="inline-block group">
              <span className="block text-[8px] sm:text-[10px] font-bold tracking-[0.18em] sm:tracking-[0.25em] text-neutral-500 uppercase mb-0.5 truncate">
                The Voice of the Republic • Washington, D.C.
              </span>
              <h1 className="font-serif text-2xl sm:text-5xl md:text-6xl font-black tracking-tight text-neutral-950 group-hover:text-neutral-800 transition leading-none">
                THE AMERICAN BEACON
              </h1>
              <div className="flex items-center justify-center gap-2 mt-1 hidden sm:flex">
                <span className="h-[1px] w-8 bg-red-700"></span>
                <p className="text-[11px] font-sans text-neutral-600 tracking-wider uppercase font-semibold">
                  Independent American Journalism & Global Perspectives
                </p>
                <span className="h-[1px] w-8 bg-red-700"></span>
              </div>
            </Link>
          </div>

          {/* Right Action / Mobile Search Icon & Newsletter */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-neutral-700 hover:text-neutral-950 md:hidden rounded-lg hover:bg-neutral-100 transition focus:outline-none"
              aria-label="Toggle Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <div className="hidden sm:flex items-center space-x-3">
              <Link
                href="/advertise"
                className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition"
              >
                Advertise
              </Link>
              <Link
                href="/newsletters"
                className="text-xs font-bold uppercase tracking-wider text-red-700 hover:text-red-800 border border-red-700 rounded px-3 py-1.5 transition"
              >
                Get Daily Brief
              </Link>
            </div>
          </div>
        </div>

        {/* Expandable Search Input */}
        {searchOpen && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
              }
            }}
            className="mt-4 pt-3 border-t border-neutral-200 flex items-center max-w-xl mx-auto"
          >
            <input
              type="text"
              placeholder="Search news, topics, authors, companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-sm border border-neutral-300 rounded-l px-4 py-2 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              autoFocus
            />
            <button
              type="submit"
              className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-r"
            >
              Search
            </button>
          </form>
        )}
      </div>

      {/* 4. BREAKING NEWS RIBBON */}
      <div className="bg-red-700 text-white text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center space-x-3">
          <div className="flex items-center gap-1.5 bg-red-950 text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded animate-pulse shrink-0">
            <ShieldAlert className="w-3 h-3 text-red-400" /> BREAKING NEWS
          </div>
          <Link
            href="/news/pentagon-accelerates-next-generation-satellite-constellation-procurement"
            className="truncate text-white font-medium hover:underline text-xs"
          >
            Pentagon Awards $4.2 Billion for Proliferated Low-Earth Orbit Satellite Constellation to Counter Hypersonic Threats
          </Link>
        </div>
      </div>

      {/* 5. PRIMARY CATEGORY NAVIGATION (Responsive, Auto-Fit, Never Cut Off) */}
      <nav className="border-b border-neutral-300 bg-white shadow-xs relative z-30">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          {/* Desktop & Tablet Navigation */}
          <div className="hidden md:flex items-center justify-between relative">
            {/* Left Scroll Arrow */}
            {canScrollLeft && (
              <button
                type="button"
                onClick={() => scrollNav('left')}
                className="absolute left-0 z-20 h-full px-2 bg-gradient-to-r from-white via-white/95 to-transparent text-neutral-700 hover:text-red-700 flex items-center justify-center transition"
                aria-label="Scroll menu left"
              >
                <ChevronLeft className="w-4 h-4 bg-white/90 rounded-full shadow-xs border border-neutral-200" />
              </button>
            )}

            {/* Scrollable Category List */}
            <div
              ref={navScrollRef}
              onScroll={checkScroll}
              className="flex-1 overflow-x-auto scrollbar-none scroll-smooth py-2.5"
            >
              <ul className="flex items-center space-x-1 lg:space-x-1.5 xl:space-x-2.5 text-xs xl:text-[13px] font-semibold tracking-tight uppercase text-neutral-800 min-w-max">
                {CATEGORIES.map((cat) => {
                  const isActive = pathname === `/category/${cat.slug}`;
                  const isBreaking = cat.slug === 'breaking-news';
                  return (
                    <li key={cat.slug} className="shrink-0">
                      <Link
                        href={`/category/${cat.slug}`}
                        className={`px-2 lg:px-2.5 xl:px-3 py-1 rounded transition duration-150 inline-flex items-center whitespace-nowrap ${
                          isActive
                            ? 'text-red-700 font-bold border-b-2 border-red-700 -mb-2.5 pb-2'
                            : isBreaking
                            ? 'text-red-700 font-bold hover:text-red-800'
                            : 'text-neutral-800 hover:text-red-700 font-semibold'
                        }`}
                      >
                        {/* On compact viewports, use shortName (e.g. AI, Tech) to prevent squishing or clipping */}
                        <span className="hidden xl:inline">{cat.name}</span>
                        <span className="xl:hidden">{cat.shortName || cat.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right Scroll Arrow */}
            {canScrollRight && (
              <button
                type="button"
                onClick={() => scrollNav('right')}
                className="absolute right-24 lg:right-28 z-20 h-full px-2 bg-gradient-to-l from-white via-white/95 to-transparent text-neutral-700 hover:text-red-700 flex items-center justify-center transition"
                aria-label="Scroll menu right"
              >
                <ChevronRight className="w-4 h-4 bg-white/90 rounded-full shadow-xs border border-neutral-200" />
              </button>
            )}

            {/* "More Sections" Dropdown Menu */}
            <div ref={moreMenuRef} className="relative shrink-0 pl-2 lg:pl-3 border-l border-neutral-200 ml-1">
              <button
                type="button"
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs xl:text-[13px] font-bold uppercase tracking-wider rounded transition ${
                  moreMenuOpen
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-700 hover:text-red-700 hover:bg-neutral-100'
                }`}
                aria-expanded={moreMenuOpen}
                aria-label="Toggle all editorial sections"
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu Panel */}
              {moreMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white border border-neutral-300 rounded-xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-neutral-200">
                    <span className="text-[11px] font-black uppercase tracking-widest text-neutral-600">
                      All Editorial Desks & Sections
                    </span>
                    <button
                      type="button"
                      onClick={() => setMoreMenuOpen(false)}
                      className="text-neutral-400 hover:text-neutral-700 p-0.5 rounded"
                      aria-label="Close menu"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        onClick={() => setMoreMenuOpen(false)}
                        className={`py-1.5 px-2 rounded hover:bg-neutral-100 flex items-center justify-between group transition ${
                          pathname === `/category/${cat.slug}` ? 'font-bold text-red-700 bg-red-50' : 'text-neutral-800'
                        }`}
                      >
                        <span className="group-hover:text-red-700 transition truncate pr-1">{cat.name}</span>
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: cat.accentColor || '#b91c1c' }}
                        />
                      </Link>
                    ))}
                  </div>

                  <div className="mt-3 pt-3 border-t border-neutral-200 grid grid-cols-2 gap-2 text-[11px]">
                    <Link
                      href="/advertise"
                      onClick={() => setMoreMenuOpen(false)}
                      className="p-1.5 rounded bg-neutral-50 hover:bg-neutral-100 font-semibold text-neutral-800 flex items-center justify-between"
                    >
                      <span>Advertise / Media Kit</span>
                      <span className="text-red-700 font-bold">→</span>
                    </Link>
                    <Link
                      href="/newsletters"
                      onClick={() => setMoreMenuOpen(false)}
                      className="p-1.5 rounded bg-neutral-50 hover:bg-neutral-100 font-semibold text-neutral-800 flex items-center justify-between"
                    >
                      <span>Daily Newsletters</span>
                      <span className="text-red-700 font-bold">→</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Category Ribbon (Smooth Swipeable Strip, Never Cut Off) */}
          <div className="md:hidden flex items-center overflow-x-auto scrollbar-none py-2 space-x-1.5 px-1 scroll-smooth">
            {CATEGORIES.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`;
              const isBreaking = cat.slug === 'breaking-news';
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition ${
                    isActive
                      ? 'bg-red-700 text-white'
                      : isBreaking
                      ? 'bg-red-50 text-red-700 border border-red-300'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* 6. MOBILE DRAWER NAVIGATION */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-900 text-white border-b border-neutral-800 px-4 py-6 space-y-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
              }
            }}
            className="flex items-center"
          >
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-neutral-800 text-sm text-white px-3 py-2 rounded-l border border-neutral-700 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-r uppercase"
            >
              Go
            </button>
          </form>

          <div className="grid grid-cols-2 gap-2 text-sm pt-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-2 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded font-medium"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-800 space-y-2 text-xs">
            <a
              href="/admin"
              className="block text-amber-400 font-bold py-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              ⚙ Painel de Controle Editorial
            </a>
            <Link
              href="/about"
              className="block text-neutral-400 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              About The American Beacon
            </Link>
            <Link
              href="/editorial-policy"
              className="block text-neutral-400 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Editorial Standards
            </Link>
            <Link
              href="/advertise"
              className="block text-neutral-400 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Advertise With Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
