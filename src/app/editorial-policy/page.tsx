import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, AlertCircle, FileText, Cpu, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Editorial Standards & Code of Ethics | The American Beacon',
  description: 'The American Beacon journalistic standards, verification methodology, anonymous sourcing guidelines, attribution rules, and AI ethics.',
  alternates: {
    canonical: 'https://www.americanbeacon.online/editorial-policy',
  },
};

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-4">
      <div className="border-b-2 border-neutral-900 pb-6">
        <span className="text-[11px] font-black uppercase tracking-widest text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded inline-block mb-3">
          Newsroom Code of Ethics
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-black text-neutral-950 tracking-tight">
          Editorial Standards & Code of Ethics
        </h1>
        <p className="font-serif text-lg text-neutral-700 mt-2 leading-relaxed">
          The principles, verification protocols, and ethical benchmarks governing all reporting published by The American Beacon.
        </p>
      </div>

      <div className="article-content space-y-8">
        <p className="article-lead">
          The American Beacon operates under an uncompromising charter: to report the news with unwavering factual accuracy, intellectual honesty, fairness, and independence. Our reporters, editors, and researchers adhere to the highest ethical benchmarks of the American journalistic tradition.
        </p>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2>1. Factual Accuracy & Multi-Source Verification</h2>
          <p>
            We do not publish rumors, conjecture, unverified social media claims, or speculation. Every factual assertion must be substantiated by primary documentation, direct on-the-record eyewitness testimony, official government records, regulatory filings, or corroborated by multiple independent sources.
          </p>
          <p>
            When reporting on contentious disputes or accusations, we make every reasonable, documented effort to obtain and fairly represent the perspectives of all affected parties prior to publication.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2>2. Clear Content Attribution & Transparent Sourcing</h2>
          <p>
            The American Beacon is committed to intellectual honesty and source transparency:
          </p>
          <ul>
            <li><strong>Original Reporting:</strong> Denotes investigative stories, enterprise features, and dispatches produced directly by American Beacon journalists and staff correspondents through firsthand reporting.</li>
            <li><strong>Wire & Syndicated Dispatches:</strong> When incorporating reports from public news services, financial data providers, or partner feeds, we state the origin unequivocally. We never present third-party wire copy as our own exclusive original reporting.</li>
            <li><strong>Document Links:</strong> Wherever possible, our reporting links directly to primary sources—including bills, court filings, regulatory agency decisions, corporate financial statements, and academic studies.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2>3. Anonymous Sourcing Protocol</h2>
          <p>
            On-the-record reporting is our standard. Anonymous sources may be granted confidentiality only under stringent conditions:
          </p>
          <ul>
            <li>The information is vital to the public interest and cannot be obtained through on-the-record channels or public documentation;</li>
            <li>The source faces genuine risks of retaliation, legal jeopardy, commercial retribution, or physical harm;</li>
            <li>The source&apos;s direct knowledge, credibility, and motives have been independently vetted;</li>
            <li>At least one senior executive editor has been briefed on the true identity and background of the confidential source.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2>4. Separation of News, Analysis & Opinion</h2>
          <p>
            We maintain an unmistakable distinction between objective factual reporting, expert analysis, and opinion columns:
          </p>
          <ul>
            <li><strong>News Dispatches:</strong> Pure factual accounts adhering to strict neutrality and objective tone.</li>
            <li><strong>Analysis:</strong> Contextual examination and interpretation of complex events, clearly marked with an &quot;Analysis&quot; badge.</li>
            <li><strong>Opinion / Commentary:</strong> Distinctly labeled columns reflecting the author&apos;s personal viewpoints, not institutional editorial stance.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2>5. Artificial Intelligence & Automation Ethics</h2>
          <p>
            In an era of generative technologies, The American Beacon maintains explicit ethical rules regarding artificial intelligence:
          </p>
          <ul>
            <li>AI tools may be utilized as research assistants—to help synthesize large datasets, monitor public news feeds, or generate initial audio narrations—under strict human supervision.</li>
            <li>No article is published on The American Beacon without human editorial oversight, fact-checking, and final approval.</li>
            <li>We do not publish fabricated synthetic imagery as genuine photographic evidence. Any conceptual, computer-generated visual is explicitly labeled as illustration.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2>6. Commercial Firewall & Independence</h2>
          <p>
            The American Beacon maintains an impenetrable wall between our newsroom and commercial advertising operations:
          </p>
          <ul>
            <li>Advertisers, sponsors, and investors exert zero influence over story selection, investigative findings, or headlines.</li>
            <li>All sponsored commercial placements are labeled with unmistakable disclosure tags.</li>
            <li>Reporters are prohibited from holding direct financial interests in entities they actively cover.</li>
          </ul>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2>7. Public Accountability & Corrections</h2>
          <p>
            When errors of fact occur, we correct them transparently and promptly. We do not quietly delete mistakes. Every substantive correction is documented in accordance with our public{' '}
            <Link href="/corrections" className="text-red-700 underline font-semibold">
              Corrections & Clarifications Policy
            </Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
