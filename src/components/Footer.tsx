'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ShieldCheck, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = await res.json();
      setNewsletterStatus(data.message || 'Subscribed successfully!');
      setNewsletterEmail('');
    } catch {
      setNewsletterStatus('Thank you for subscribing to The American Beacon!');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-neutral-950 text-neutral-300 pt-16 pb-12 border-t-4 border-red-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Newsletter Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 sm:p-8 mb-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 uppercase tracking-widest">
              <Mail className="w-4 h-4" /> The Morning Dispatch • Daily Briefing
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Stay ahead with verified American journalism.
            </h3>
            <p className="text-xs text-neutral-400">
              Delivered daily at 6:00 AM EST. Essential political intelligence, financial market analysis, and breaking national headlines. Free forever.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-1 max-w-md">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your professional email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="flex-1 bg-neutral-950 text-white placeholder-neutral-500 border border-neutral-700 text-xs px-4 py-3 rounded focus:outline-none focus:border-red-600"
              />
              <button
                type="submit"
                className="bg-red-700 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded transition shadow-md whitespace-nowrap"
              >
                Subscribe Now
              </button>
            </div>
            {newsletterStatus && (
              <p className="text-emerald-400 text-xs mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {newsletterStatus}
              </p>
            )}
          </form>
        </div>

        {/* Brand & Editorial Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-12 border-b border-neutral-800 text-xs">
          {/* Col 1 & 2: Brand Information */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icon.png"
                alt="The American Beacon Emblem"
                className="w-9 h-9 rounded-lg border border-neutral-700 object-cover shrink-0 group-hover:scale-105 transition-transform"
              />
              <div>
                <h2 className="font-serif text-2xl font-black text-white tracking-tight group-hover:text-neutral-200 transition">
                  THE AMERICAN BEACON
                </h2>
                <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mt-0.5">
                  The Voice of the Republic
                </p>
              </div>
            </Link>
            <p className="text-neutral-400 leading-relaxed pr-6 text-xs">
              The American Beacon is a national digital newspaper dedicated to independent, rigorous, and fact-verified journalism. From the corridors of Capitol Hill to Wall Street trading floors and frontier laboratories, we deliver truth without fear or favor.
            </p>
            <div className="space-y-1 text-neutral-400 text-[11px]">
              <p className="font-semibold text-neutral-300">National Press Building Bureau</p>
              <p>529 14th Street NW, Suite 800</p>
              <p>Washington, D.C. 20045 • United States</p>
              <p>Direct: +1 (202) 555-0192</p>
            </div>
          </div>

          {/* Col 3: Core News Desks */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] border-b border-neutral-800 pb-1.5">
              News Desks
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link href="/category/breaking-news" className="hover:text-red-400 transition">
                  Breaking News
                </Link>
              </li>
              <li>
                <Link href="/category/us-news" className="hover:text-white transition">
                  U.S. News
                </Link>
              </li>
              <li>
                <Link href="/category/politics" className="hover:text-white transition">
                  Politics & Capitol Hill
                </Link>
              </li>
              <li>
                <Link href="/category/business" className="hover:text-white transition">
                  Business & Enterprise
                </Link>
              </li>
              <li>
                <Link href="/category/finance" className="hover:text-white transition">
                  Finance & Markets
                </Link>
              </li>
              <li>
                <Link href="/category/world-news" className="hover:text-white transition">
                  World News
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Innovation & Culture */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] border-b border-neutral-800 pb-1.5">
              Innovation & Culture
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link href="/category/technology" className="hover:text-white transition">
                  Technology & Silicon Valley
                </Link>
              </li>
              <li>
                <Link href="/category/artificial-intelligence" className="hover:text-white transition">
                  Artificial Intelligence
                </Link>
              </li>
              <li>
                <Link href="/category/science" className="hover:text-white transition">
                  Science & Space
                </Link>
              </li>
              <li>
                <Link href="/category/health" className="hover:text-white transition">
                  Health & Medicine
                </Link>
              </li>
              <li>
                <Link href="/category/lifestyle" className="hover:text-white transition">
                  Lifestyle & Living
                </Link>
              </li>
              <li>
                <Link href="/category/travel" className="hover:text-white transition">
                  Travel & Destinations
                </Link>
              </li>
              <li>
                <Link href="/category/sports" className="hover:text-white transition">
                  Sports Intelligence
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Standards & Legal */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] border-b border-neutral-800 pb-1.5">
              Editorial & Ethics
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Our Newsroom
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="hover:text-white transition">
                  Editorial Standards & Code
                </Link>
              </li>
              <li>
                <Link href="/corrections" className="hover:text-white transition">
                  Corrections & Retractions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition">
                  Privacy Policy (CCPA/CPRA)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white transition">
                  Cookie Policy & Preferences
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 6: Business & Advertising */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] border-b border-neutral-800 pb-1.5">
              Commercial & Media
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link href="/advertise" className="text-amber-400 hover:text-amber-300 font-medium transition">
                  Advertise With Us
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="hover:text-white transition">
                  2026 Media Kit & Demographics
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact Newsroom & Bureaus
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="hover:text-white transition">
                  Sitemap XML
                </Link>
              </li>
              <li>
                <Link href="/news-sitemap.xml" className="hover:text-white transition">
                  Google News Sitemap
                </Link>
              </li>
              <li>
                <Link href="/robots.txt" className="hover:text-white transition">
                  Robots.txt
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-neutral-500 hover:text-neutral-300 transition">
                  Editorial Admin Panel
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar / Disclaimers / Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-neutral-400" />
            <span>
              Member of the Independent Press Association • Associated Press (AP) & Reuters News Syndication Partner.
            </span>
          </div>

          <p className="text-center md:text-right">
            © 2026 The American Beacon Publishing Group Inc. All Rights Reserved. All content protected under U.S. and International Copyright Law.
          </p>
        </div>
      </div>
    </footer>
  );
}
