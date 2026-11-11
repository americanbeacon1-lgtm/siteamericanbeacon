import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, ShieldCheck, Newspaper, Award, Users, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Team & Newsroom Structure | The American Beacon',
  description: 'Meet the editorial leadership, desk editors, and journalistic contributors of The American Beacon.',
  alternates: {
    canonical: 'https://www.americanbeacon.online/team',
  },
};

export default function TeamPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-4">
      {/* Page Header */}
      <div className="border-b-2 border-neutral-900 pb-6">
        <span className="text-[11px] font-black uppercase tracking-widest text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded inline-block mb-3">
          Editorial Leadership & Masthead
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-black text-neutral-950 tracking-tight">
          Our Team
        </h1>
        <p className="font-serif text-lg text-neutral-700 mt-2 leading-relaxed">
          The journalists, editors, and researchers driving independent coverage at The American Beacon.
        </p>
      </div>

      {/* Leadership Profile */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-neutral-950 border-b border-neutral-200 pb-2">
          Executive Leadership
        </h2>

        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-6">
          <div className="w-20 h-20 rounded-full bg-neutral-900 text-white font-serif font-black text-2xl flex items-center justify-center shrink-0 border-2 border-red-700 shadow-sm">
            GM
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <h3 className="font-serif text-xl font-bold text-neutral-950">Gustavo Moura Barbosa</h3>
                <p className="text-xs font-bold uppercase tracking-wider text-red-700">Publisher & Managing Director</p>
              </div>
              <a
                href="mailto:americanbeacon@americanbeacon.online?subject=Attn:%20Publisher%20Gustavo%20Moura%20Barbosa"
                className="inline-flex items-center gap-1.5 text-xs text-neutral-600 hover:text-red-700 font-semibold"
              >
                <Mail className="w-3.5 h-3.5 text-red-700" />
                <span>Contact Office</span>
              </a>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pt-1">
              Oversees institutional strategy, commercial publishing operations, platform technology, and newsroom compliance for The American Beacon. Committed to sustaining independent, self-funded digital journalism that serves the American public interest without partisan bias or institutional conflicts of interest.
            </p>
          </div>
        </div>
      </div>

      {/* Editorial Desks & Structure */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-neutral-950 border-b border-neutral-200 pb-2">
          Newsroom Desks & Editorial Structure
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
          Our newsroom operates through specialized editorial units tasked with verifying information from primary government records, regulatory disclosures, economic data feeds, and eyewitness accounts:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-neutral-200 rounded-lg p-5 space-y-2 bg-white">
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 block">
              National Affairs & Politics
            </span>
            <h4 className="font-serif text-base font-bold text-neutral-950">The Washington & Congressional Desk</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Monitors federal legislation, executive orders, committee testimony, Supreme Court decisions, and regulatory enforcement across federal agencies.
            </p>
            <p className="text-[11px] text-neutral-400 font-mono pt-1">Lead: National Political Correspondents</p>
          </div>

          <div className="border border-neutral-200 rounded-lg p-5 space-y-2 bg-white">
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 block">
              Financial Intelligence
            </span>
            <h4 className="font-serif text-base font-bold text-neutral-950">Markets & Macroeconomics Desk</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Reports on Wall Street market dynamics, Federal Reserve monetary policy, SEC regulatory filings, corporate earnings, and global commodity trends.
            </p>
            <p className="text-[11px] text-neutral-400 font-mono pt-1">Lead: Economics & Markets Reporting Staff</p>
          </div>

          <div className="border border-neutral-200 rounded-lg p-5 space-y-2 bg-white">
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 block">
              Frontier Innovation
            </span>
            <h4 className="font-serif text-base font-bold text-neutral-950">Technology & Cybersecurity Desk</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Analyzes artificial intelligence safety, enterprise software, semiconductor geopolitics, cloud infrastructure, and consumer privacy rights.
            </p>
            <p className="text-[11px] text-neutral-400 font-mono pt-1">Lead: Technology & AI Correspondents</p>
          </div>

          <div className="border border-neutral-200 rounded-lg p-5 space-y-2 bg-white">
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 block">
              Verification & Ethics
            </span>
            <h4 className="font-serif text-base font-bold text-neutral-950">Standards & Fact-Checking Bureau</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Dedicated to upholding our newsroom charter: verifying data, corroborating sources, ensuring balanced coverage, and managing reader correction requests.
            </p>
            <p className="text-[11px] text-neutral-400 font-mono pt-1">Lead: Office of Editorial Standards</p>
          </div>
        </div>
      </div>

      {/* Contributor Network & Pitching */}
      <div className="bg-neutral-900 text-neutral-200 rounded-xl p-6 sm:p-8 space-y-4">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
          Join Our Network of Independent Journalists & Researchers
        </h3>
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          The American Beacon accepts pitches and original investigative reporting from freelance journalists, policy scholars, econometricians, and domain specialists. We maintain competitive contributor compensation and prioritize deeply researched, document-driven reporting.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <a
            href="mailto:americanbeacon@americanbeacon.online?subject=Editorial%20Pitch%20-%20The%20American%20Beacon"
            className="inline-flex items-center justify-center gap-2 bg-red-700 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-lg transition"
          >
            <Mail className="w-4 h-4" />
            <span>Submit an Editorial Pitch</span>
          </a>
          <Link
            href="/editorial-policy"
            className="inline-flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs px-5 py-3 rounded-lg border border-neutral-700 transition"
          >
            <ShieldCheck className="w-4 h-4 text-neutral-400" />
            <span>Review Editorial Guidelines</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
