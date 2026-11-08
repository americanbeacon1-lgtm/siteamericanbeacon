import React from 'react';
import type { Metadata } from 'next';
import { ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Editorial Policy & Standards of Journalism | The American Beacon',
  description: 'The American Beacon journalistic standards, code of ethics, verification methodology, anonymous sourcing guidelines, and editorial independence.',
};

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      <div className="border-b-2 border-neutral-900 pb-6">
        <span className="text-[11px] font-black uppercase tracking-widest text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded inline-block mb-3">
          Newsroom Code of Ethics
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-black text-neutral-950 tracking-tight">
          Editorial Policy & Standards
        </h1>
        <p className="text-xs text-neutral-500 mt-2">
          Adopted by The American Beacon Editorial Board • Washington, D.C. Bureau
        </p>
      </div>

      <div className="article-content space-y-6">
        <p className="article-lead">
          The American Beacon operates under an uncompromising charter: to report the news with unwavering factual accuracy, intellectual honesty, fairness, and independence. Our reporters and editors adhere to the highest ethical benchmarks of the American journalistic tradition.
        </p>

        <h2>1. Factual Accuracy & Verification</h2>
        <p>
          We do not publish rumors, conjecture, or unverified claims. Every factual assertion must be substantiated by primary documentation, direct on-the-record eyewitness testimony, official government records, or corroborated by multiple independent sources.
        </p>

        <h2>2. Anonymous Sourcing Protocol</h2>
        <p>
          On-the-record reporting is our standard. Anonymous sources may be granted confidentiality only when:
        </p>
        <ul>
          <li>The information is vital to the public interest and cannot be obtained through any other means;</li>
          <li>The source faces genuine risks of retaliation, legal jeopardy, or physical harm;</li>
          <li>The source&apos;s direct knowledge, credibility, and motives have been independently vetted;</li>
          <li>At least one senior executive editor has been briefed on the true identity of the source.</li>
        </ul>

        <h2>3. Separation of News and Opinion</h2>
        <p>
          We maintain an unmistakable distinction between objective news reporting and commentary. Analysis and opinion columns are clearly labeled as such, and the opinions expressed in them belong solely to the authors and do not represent institutional newsroom posture.
        </p>

        <h2>4. Conflicts of Interest & Financial Independence</h2>
        <p>
          Reporters and editors are strictly prohibited from holding financial investments in companies or industries they actively cover, accepting gifts or hospitality from sources, or participating in political campaigns.
        </p>

        <h2>5. Commercial & Advertising Firewall</h2>
        <p>
          The American Beacon maintains a strict wall between our editorial newsroom and our commercial advertising operations. Advertisers exert zero influence over which stories are covered, investigated, or published. Sponsored native content is prominently labeled with clear disclosures.
        </p>
      </div>
    </div>
  );
}
