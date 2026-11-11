import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Award, ShieldCheck, Newspaper, Globe, Users, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Independent Journalism & History | The American Beacon',
  description: 'Learn about the history, journalistic mission, editorial standards, and leadership of The American Beacon.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-4">
      {/* Page Header */}
      <div className="border-b-2 border-neutral-900 pb-6">
        <span className="text-[11px] font-black uppercase tracking-widest text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded inline-block mb-3">
          Institutional Overview
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-black text-neutral-950 tracking-tight">
          About The American Beacon
        </h1>
        <p className="font-serif text-xl text-neutral-700 mt-2 leading-relaxed">
          The Voice of the Republic: Championing independent, fact-verified American journalism in an era of unprecedented global transformation.
        </p>
      </div>

      {/* Main Narrative */}
      <div className="article-content space-y-6">
        <p className="article-lead">
          Published by The American Beacon Publishing Group, <strong>The American Beacon</strong> is an independent digital news organization based in Washington, D.C. We deliver fact-verified breaking news, investigative reporting, economic intelligence, and insightful policy analysis for readers, researchers, and decision makers.
        </p>

        <h2>Our Founding Mission</h2>
        <p>
          Founded on the conviction that a constitutional republic requires an informed and engaged citizenry, The American Beacon is dedicated to rigorous, principled, and non-partisan journalism. We hold our reporting to stringent benchmarks of accuracy, fairness, and empirical verification. We believe journalism should hold power accountable, scrutinize public institutions without bias, and remain steadfastly devoted to truth.
        </p>

        <div className="my-8 grid grid-cols-1 sm:grid-cols-3 gap-6 not-prose">
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-5 space-y-2">
            <ShieldCheck className="w-6 h-6 text-red-700" />
            <h4 className="font-bold text-sm text-neutral-950 uppercase tracking-wide">
              Empirical Verification
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Every factual assertion undergoes multi-source verification, official documentation review, and independent editorial scrutiny prior to publication.
            </p>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-5 space-y-2">
            <Award className="w-6 h-6 text-red-700" />
            <h4 className="font-bold text-sm text-neutral-950 uppercase tracking-wide">
              Editorial Independence
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Our newsroom maintains an absolute firewall separating editorial judgment from commercial advertising, sponsors, and outside corporate influence.
            </p>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-5 space-y-2">
            <Globe className="w-6 h-6 text-red-700" />
            <h4 className="font-bold text-sm text-neutral-950 uppercase tracking-wide">
              National & Global Scope
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Covering Capitol Hill legislation, federal courts, financial markets, frontier technology, and international diplomatic developments.
            </p>
          </div>
        </div>

        <h2>Newsroom Desks & Coverage Areas</h2>
        <p>
          Our editorial team organizes daily coverage across specialized editorial desks:
        </p>

        <ul>
          <li><strong>Politics & Government:</strong> Executive policy, Congressional proceedings, Supreme Court jurisprudence, and federal regulatory agencies.</li>
          <li><strong>Business & Markets:</strong> Wall Street capital markets, Federal Reserve monetary policy, corporate finance, and macroeconomics.</li>
          <li><strong>Technology & Innovation:</strong> Artificial intelligence, cybersecurity, semiconductor manufacturing, and software infrastructure.</li>
          <li><strong>World & Defense:</strong> Geopolitical affairs, national security, allied diplomacy, and global economic shifts.</li>
        </ul>

        <h2>Institutional Governance & Transparency</h2>
        <p>
          In accordance with the best practices of international digital journalism, we maintain open public disclosures regarding our institutional operations:
        </p>
        <ul className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <li className="p-3 border border-neutral-200 rounded bg-white hover:border-neutral-400 transition">
            <Link href="/team" className="font-bold text-neutral-900 hover:text-red-700 block text-sm">
              → Our Editorial Team
            </Link>
            <span className="text-xs text-neutral-500">Learn about our newsroom structure, contributors, and management.</span>
          </li>
          <li className="p-3 border border-neutral-200 rounded bg-white hover:border-neutral-400 transition">
            <Link href="/editorial-policy" className="font-bold text-neutral-900 hover:text-red-700 block text-sm">
              → Editorial Standards & Ethics
            </Link>
            <span className="text-xs text-neutral-500">Our code of conduct, anonymous sourcing protocols, and verification methods.</span>
          </li>
          <li className="p-3 border border-neutral-200 rounded bg-white hover:border-neutral-400 transition">
            <Link href="/corrections" className="font-bold text-neutral-900 hover:text-red-700 block text-sm">
              → Corrections & Clarifications Policy
            </Link>
            <span className="text-xs text-neutral-500">How we handle factual corrections, updates, and public retractions.</span>
          </li>
          <li className="p-3 border border-neutral-200 rounded bg-white hover:border-neutral-400 transition">
            <Link href="/ownership-and-funding" className="font-bold text-neutral-900 hover:text-red-700 block text-sm">
              → Ownership & Funding Disclosure
            </Link>
            <span className="text-xs text-neutral-500">Full transparency on ownership structure, revenue streams, and independence.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
