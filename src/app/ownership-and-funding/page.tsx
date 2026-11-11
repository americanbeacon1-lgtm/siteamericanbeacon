import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { DollarSign, ShieldCheck, Scale, FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ownership & Funding Disclosure | The American Beacon',
  description: 'Full transparency regarding the ownership structure, revenue streams, and financial independence of The American Beacon.',
  alternates: {
    canonical: 'https://www.americanbeacon.online/ownership-and-funding',
  },
};

export default function OwnershipAndFundingPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-4">
      {/* Header */}
      <div className="border-b-2 border-neutral-900 pb-6">
        <span className="text-[11px] font-black uppercase tracking-widest text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded inline-block mb-3">
          Institutional Governance & Transparency
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-black text-neutral-950 tracking-tight">
          Ownership & Funding Disclosure
        </h1>
        <p className="font-serif text-lg text-neutral-700 mt-2 leading-relaxed">
          Our commitment to complete transparency regarding our corporate entity, financial structure, and editorial independence.
        </p>
      </div>

      <div className="article-content space-y-8">
        <p className="article-lead">
          Financial transparency is the cornerstone of journalistic credibility. <strong>The American Beacon</strong> believes that readers have an absolute right to know who owns, funds, and operates the news organizations they rely upon for critical information.
        </p>

        {/* Section 1: Ownership Structure */}
        <section className="space-y-3">
          <h2>1. Legal Entity & Ownership Structure</h2>
          <p>
            The American Beacon is owned and operated by <strong>The American Beacon Publishing Group</strong>, an independent digital media organization founded and managed by publisher Gustavo Moura Barbosa.
          </p>
          <p>
            The American Beacon is completely privately owned and operated. We have no parent conglomerate, sovereign state backing, political party affiliation, or venture capital controlling stake dictating our reporting decisions or editorial posture.
          </p>
        </section>

        {/* Section 2: Revenue & Funding Model */}
        <section className="space-y-3">
          <h2>2. Revenue Streams & Funding Model</h2>
          <p>
            To sustain our newsroom and investigative reporting without compromising our editorial integrity, The American Beacon utilizes a multi-stream commercial model:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 not-prose my-4">
            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-lg space-y-2">
              <DollarSign className="w-5 h-5 text-red-700" />
              <h4 className="font-bold text-sm text-neutral-900">Programmatic Advertising</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Automated digital display ads served via verified programmatic exchanges (such as Google AdSense). Advertisers have zero advance access to or influence over editorial content.
              </p>
            </div>
            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-lg space-y-2">
              <FileText className="w-5 h-5 text-red-700" />
              <h4 className="font-bold text-sm text-neutral-900">Direct Sponsorships</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Direct commercial advertising and newsletter sponsorships managed through our commercial desk, always clearly marked with prominent &quot;ADVERTISEMENT&quot; labels.
              </p>
            </div>
            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-lg space-y-2">
              <Scale className="w-5 h-5 text-red-700" />
              <h4 className="font-bold text-sm text-neutral-900">Reader Subscriptions</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Voluntary digital subscriptions and institutional intelligence briefings that directly fund in-depth investigative reporting and primary research.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Commercial Firewall */}
        <section className="space-y-3">
          <h2>3. The Commercial & Editorial Firewall</h2>
          <p>
            We maintain a strict and impenetrable firewall between our commercial advertising operations and our editorial reporting staff:
          </p>
          <ul>
            <li>No advertiser, sponsor, or subscriber is ever granted pre-publication review or veto power over any article, headline, or investigative finding.</li>
            <li>Reporters and editors do not participate in commercial sponsorship discussions, and commercial personnel have no role in newsroom story assignments.</li>
            <li>Sponsored native content, when present, is labeled unequivocally with disclosures distinguishing it from independent journalism.</li>
          </ul>
        </section>

        {/* Section 4: Conflict of Interest Policy */}
        <section className="space-y-3">
          <h2>4. Conflict of Interest Guidelines</h2>
          <p>
            Editorial staff and contributing journalists must adhere to rigorous conflict-of-interest standards:
          </p>
          <ul>
            <li>Staff members are forbidden from covering entities, companies, or individuals with whom they possess direct financial, personal, or fiduciary ties.</li>
            <li>Acceptance of gifts, honoraria, subsidized travel, or complimentary accommodations from subjects of coverage is strictly prohibited.</li>
            <li>Any potential unavoidable conflict of interest must be disclosed prominently within the published dispatch.</li>
          </ul>
        </section>

        {/* Contact and Questions */}
        <section className="bg-neutral-50 border border-neutral-200 rounded-lg p-5 not-prose text-xs text-neutral-700 space-y-2">
          <div className="flex items-center gap-2 font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Public Inquiries Regarding Ownership & Standards
          </div>
          <p>
            Readers or researchers with questions concerning our corporate structure, funding, or compliance may contact our office directly:
          </p>
          <p className="font-mono text-neutral-900">
            Email: <a href="mailto:americanbeacon@americanbeacon.online?subject=Ownership%20Inquiry" className="text-red-700 underline font-semibold">americanbeacon@americanbeacon.online</a>
          </p>
        </section>
      </div>
    </div>
  );
}
