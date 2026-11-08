import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions | The American Beacon',
  description: 'Terms of service and user agreements governing the use of The American Beacon digital news platform.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      <div className="border-b-2 border-neutral-900 pb-6">
        <span className="text-[11px] font-black uppercase tracking-widest text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded inline-block mb-3">
          Terms of Service
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-black text-neutral-950 tracking-tight">
          Terms & Conditions of Service
        </h1>
        <p className="text-xs text-neutral-500 mt-2">
          Effective Date: January 1, 2026 • Governing Law: District of Columbia, United States
        </p>
      </div>

      <div className="article-content space-y-6">
        <p className="article-lead">
          Welcome to The American Beacon. By accessing or using our websites, mobile applications, newsletters, and syndicated feeds, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please refrain from accessing our services.
        </p>

        <h2>1. Intellectual Property & Copyright</h2>
        <p>
          All journalistic articles, photographs, infographics, audio dispatches, software code, logos, and mastheads published by The American Beacon are protected under United States and international copyright laws. Reproduction, syndication, automated scraping, or redistribution without express written authorization from our licensing department is strictly prohibited.
        </p>

        <h2>2. Permitted Educational & Fair Use</h2>
        <p>
          Readers may quote brief excerpts of our articles for critical commentary, academic scholarship, or news reporting in accordance with the Fair Use doctrine under 17 U.S.C. § 107, provided full attribution and a functional hyperlink to the original American Beacon canonical URL is included.
        </p>

        <h2>3. Prohibited Conduct</h2>
        <p>
          You agree not to: (a) deploy automated crawlers, spiders, or scrapers to harvest content or train artificial intelligence models without a commercial licensing contract; (b) disrupt or attempt to circumvent security measures or ad rendering mechanisms; (c) post defamatory, abusive, or unlawful commentary in discussion forums.
        </p>

        <h2>4. Disclaimer of Warranties & Financial Disclosures</h2>
        <p>
          The financial, legal, and medical articles published by The American Beacon are for general informational and journalistic purposes only. Nothing contained on our site constitutes individualized investment advice, securities recommendations, legal counsel, or medical diagnosis. Readers should consult qualified licensed fiduciaries before executing financial transactions.
        </p>

        <h2>5. Dispute Resolution & Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the District of Columbia and the United States of America, without regard to conflict of law principles. Any dispute arising under these Terms shall be subject to the exclusive jurisdiction of the state and federal courts located in Washington, D.C.
        </p>
      </div>
    </div>
  );
}
