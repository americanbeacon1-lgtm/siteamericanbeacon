import React from 'react';
import type { Metadata } from 'next';
import { ShieldCheck, History, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Corrections & Clarifications Policy | The American Beacon',
  description: 'The American Beacon policy on transparency, factual corrections, clarifications, and public record accountability.',
  alternates: {
    canonical: 'https://www.americanbeacon.online/corrections',
  },
};

export default function CorrectionsPage() {
  const recordedCorrections = [
    {
      date: 'November 2, 2026',
      headline: 'Senate Committee Advances Clean Water Infrastructure Allocations',
      correction:
        'An earlier version of this report inaccurately stated the federal matching grant percentage as 65%. The statutory matching requirement under the reported bill is 75%. The text and tables have been updated accordingly.',
    },
    {
      date: 'October 24, 2026',
      headline: 'Semiconductor Fabrication Hubs Expand Midwest Operations',
      correction:
        'Due to an editing error, an earlier dispatch misidentified the county location of the proposed silicon packaging plant in central Ohio. The facility is situated in Licking County, not Delaware County.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      <div className="border-b-2 border-neutral-900 pb-6">
        <span className="text-[11px] font-black uppercase tracking-widest text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded inline-block mb-3">
          Newsroom Accountability
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-black text-neutral-950 tracking-tight">
          Corrections & Clarifications Policy
        </h1>
        <p className="text-xs text-neutral-500 mt-2">
          Administered by the Standards & Practices Editor • Washington, D.C. Bureau
        </p>
      </div>

      <div className="article-content space-y-6">
        <p className="article-lead">
          The American Beacon is committed to unyielding factual accuracy. When an error of fact or significant omission occurs in our reporting, we correct it quickly, transparently, and unreservedly.
        </p>

        <h2>Our Standards for Correction</h2>
        <p>
          We do not quietly modify published articles without leaving an editorial record. When a substantive error is identified:
        </p>
        <ul>
          <li>The correction notice is appended prominently to the article, indicating precisely what was erroneous and how it was rectified;</li>
          <li>The timestamp reflects the revision date and time;</li>
          <li>If the headline contained an error, the headline is updated and an explanatory note is provided at the top of the story.</li>
        </ul>

        <h2>Clarifications vs. Corrections</h2>
        <p>
          A <strong>Correction</strong> addresses factual inaccuracies (such as misstated statistics, incorrect dates, or erroneous names). A <strong>Clarification</strong> is issued when reporting was factually accurate but potentially incomplete or susceptible to misinterpretation, adding context to ensure absolute balance.
        </p>

        <h2>How to Report an Inaccuracy</h2>
        <p>
          Readers who identify a potential error are encouraged to contact our standards desk immediately:
        </p>
        <p>
          <strong>Office of Editorial Standards</strong><br />
          Email: <a href="mailto:americanbeacon@americanbeacon.online" className="text-red-700 underline">americanbeacon@americanbeacon.online</a><br />
          Please include the article headline, publication date, URL, and the specific factual assertion in dispute along with verifiable primary sources.
        </p>

        <h2>Public Record of Recent Corrections</h2>
        <div className="space-y-4 not-prose mt-6">
          {recordedCorrections.map((item, idx) => (
            <div key={idx} className="bg-neutral-50 border-l-4 border-amber-600 p-4 rounded-r text-xs space-y-1">
              <span className="font-bold text-neutral-500 uppercase tracking-wider text-[10px]">{item.date}</span>
              <h4 className="font-serif text-sm font-bold text-neutral-900">{item.headline}</h4>
              <p className="text-neutral-700 leading-relaxed">{item.correction}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
