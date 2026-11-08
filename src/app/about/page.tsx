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
          Headquartered in the National Press Building in Washington, D.C., with major bureaus in New York, San Francisco, Chicago, and London, <strong>The American Beacon</strong> serves as an indispensable digital news publication for discerning American readers, policymakers, institutional investors, and global citizens.
        </p>

        <h2>Our Founding Mission</h2>
        <p>
          Founded on the conviction that a self-governing republic depends on an informed citizenry, The American Beacon is dedicated to rigorous, fearless reporting. We adhere to the highest standards of accuracy, impartiality, and fairness. We believe journalism should be fair-minded, skeptical of concentrated power, and relentlessly devoted to empirical fact.
        </p>

        <div className="my-8 grid grid-cols-1 sm:grid-cols-3 gap-6 not-prose">
          <div className="bg-neutral-50 border border-neutral-200 rounded p-5 space-y-2">
            <ShieldCheck className="w-6 h-6 text-red-700" />
            <h4 className="font-bold text-sm text-neutral-950 uppercase tracking-wide">
              Empirical Verification
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Every factual assertion undergoes multi-source verification and independent editorial scrutiny before publication.
            </p>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 rounded p-5 space-y-2">
            <Award className="w-6 h-6 text-red-700" />
            <h4 className="font-bold text-sm text-neutral-950 uppercase tracking-wide">
              Editorial Independence
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Our newsroom operates with an impenetrable wall separating editorial investigations from advertising and corporate influence.
            </p>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 rounded p-5 space-y-2">
            <Globe className="w-6 h-6 text-red-700" />
            <h4 className="font-bold text-sm text-neutral-950 uppercase tracking-wide">
              National & Global Scope
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              From Capitol Hill hearing rooms to Wall Street algorithmic trading desks and deep-space observation stations.
            </p>
          </div>
        </div>

        <h2>Newsroom Organization & Leadership</h2>
        <p>
          Our newsroom brings together veteran investigative journalists, Pulitzer-honored correspondents, econometricians, and technology researchers. Major editorial divisions include:
        </p>

        <ul>
          <li><strong>The Washington Bureau:</strong> Executive policy, Congressional proceedings, Supreme Court jurisprudence, and federal regulatory oversight.</li>
          <li><strong>The Financial & Markets Desk:</strong> Wall Street capital markets, Federal Reserve monetary policy, macroeconomic data, and corporate enterprise.</li>
          <li><strong>The Tech & AI Frontier Lab:</strong> Silicon Valley breakthroughs, sovereign computing, artificial intelligence safety, and semiconductor infrastructure.</li>
          <li><strong>The Science & Medicine Division:</strong> NIH clinical trials, space exploration, astrophysics, and public health science.</li>
        </ul>

        <h2>Commitment to Transparency</h2>
        <p>
          We hold ourselves to the exact same standards of accountability we demand of the institutions we cover. When errors occur, we correct them transparently and promptly in accordance with our public <Link href="/corrections" className="text-red-700 underline font-semibold">Corrections Policy</Link>.
        </p>
      </div>
    </div>
  );
}
