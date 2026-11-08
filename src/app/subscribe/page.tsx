'use client';

import React from 'react';
import Link from 'next/link';
import { Check, ShieldCheck, Mail, Sparkles } from 'lucide-react';

export default function SubscribePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[11px] font-black uppercase tracking-widest text-red-700 bg-red-50 border border-red-200 px-3 py-1 rounded inline-block">
          Support Independent American Journalism
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-black text-neutral-950">
          Subscribe to The American Beacon
        </h1>
        <p className="text-neutral-600 text-sm leading-relaxed">
          Unrestricted access to investigative journalism, Wall Street financial intelligence, Capitol Hill policy dispatches, and daily morning executive briefings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {/* Tier 1: Digital Free */}
        <div className="border border-neutral-200 rounded-xl p-6 bg-white space-y-4 shadow-xs">
          <div>
            <h3 className="font-serif text-xl font-bold text-neutral-900">Standard Access</h3>
            <p className="text-xs text-neutral-500">Essential national news & daily dispatch.</p>
          </div>
          <div className="text-3xl font-black text-neutral-950 font-serif">
            $0 <span className="text-xs font-normal text-neutral-500 font-sans">/ forever</span>
          </div>
          <ul className="space-y-2 text-xs text-neutral-600">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" /> Full website reading access
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" /> The Morning Dispatch newsletter
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" /> Standard audio story narration
            </li>
          </ul>
          <Link
            href="/newsletters"
            className="block w-full text-center py-2.5 border border-neutral-300 rounded text-xs font-bold uppercase tracking-wider text-neutral-800 hover:bg-neutral-50 transition"
          >
            Get Free Access
          </Link>
        </div>

        {/* Tier 2: All Access Digital (Highlighted) */}
        <div className="border-2 border-red-700 rounded-xl p-6 bg-red-50/10 space-y-4 shadow-md relative">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-700 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full">
            Most Popular
          </span>
          <div>
            <h3 className="font-serif text-xl font-bold text-neutral-900">All-Access Digital</h3>
            <p className="text-xs text-neutral-500">Full investigative reports & archive.</p>
          </div>
          <div className="text-3xl font-black text-neutral-950 font-serif">
            $4.99 <span className="text-xs font-normal text-neutral-500 font-sans">/ month</span>
          </div>
          <ul className="space-y-2 text-xs text-neutral-600">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" /> All articles & historical archive
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" /> All 4 specialized newsletters
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" /> Ad-light reading experience
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" /> Early access to investigative scoops
            </li>
          </ul>
          <button
            onClick={() => alert('Subscription checkout is in demo mode. All articles on The American Beacon are currently open to readers!')}
            className="block w-full text-center py-2.5 bg-red-700 hover:bg-red-800 text-white rounded text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer"
          >
            Start Digital Membership
          </button>
        </div>

        {/* Tier 3: Institutional & Corporate */}
        <div className="border border-neutral-200 rounded-xl p-6 bg-white space-y-4 shadow-xs">
          <div>
            <h3 className="font-serif text-xl font-bold text-neutral-900">Enterprise & Media</h3>
            <p className="text-xs text-neutral-500">For law firms, funds & corporate teams.</p>
          </div>
          <div className="text-3xl font-black text-neutral-950 font-serif">
            $49 <span className="text-xs font-normal text-neutral-500 font-sans">/ seat / month</span>
          </div>
          <ul className="space-y-2 text-xs text-neutral-600">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" /> Multi-seat corporate licenses
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" /> API / RSS news syndication feeds
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" /> Direct access to Washington Bureau calls
            </li>
          </ul>
          <Link
            href="/advertise"
            className="block w-full text-center py-2.5 border border-neutral-300 rounded text-xs font-bold uppercase tracking-wider text-neutral-800 hover:bg-neutral-50 transition"
          >
            Inquire for Enterprise
          </Link>
        </div>
      </div>
    </div>
  );
}
