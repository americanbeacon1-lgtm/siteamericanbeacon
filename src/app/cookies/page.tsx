import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | Tracking & Ad Preferences | The American Beacon',
  description: 'Learn about our cookie usage, essential site cookies, analytics tracking, and advertising network preferences.',
};

export default function CookiePolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      <div className="border-b-2 border-neutral-900 pb-6">
        <span className="text-[11px] font-black uppercase tracking-widest text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded inline-block mb-3">
          Transparency & Reader Controls
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-black text-neutral-950 tracking-tight">
          Cookie Policy & Tracking Preferences
        </h1>
        <p className="text-xs text-neutral-500 mt-2">
          Effective Date: January 1, 2026 • Compliant with ePrivacy, CCPA, and Global Privacy Control (GPC)
        </p>
      </div>

      <div className="article-content space-y-6">
        <p className="article-lead">
          This Cookie Policy explains how The American Beacon uses cookies, local storage, pixel tags, and similar technologies when you visit our publication.
        </p>

        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small alphanumeric text files stored on your browser or device by web servers. They enable websites to remember your device, preferences, and session state between visits.
        </p>

        <h2>Categories of Cookies We Deploy</h2>
        <ul>
          <li><strong>Strictly Necessary Cookies:</strong> Essential for core website operations, load balancing, security firewall checks, and font rendering. These cannot be switched off.</li>
          <li><strong>Performance & Analytics Cookies:</strong> Used by Google Analytics 4 to measure reader engagement, count page views, monitor site speed, and discover popular articles. All analytics telemetry is aggregated and anonymized.</li>
          <li><strong>Advertising & Targeting Cookies:</strong> Set by our certified advertising partners, including Google AdSense and Google Ad Manager. These cookies build a profile of your interests to deliver relevant commercial advertisements and cap ad frequency so you don&apos;t see the same sponsor repeatedly.</li>
        </ul>

        <h2>Managing Your Cookie Settings</h2>
        <p>
          You can configure your internet browser to reject non-essential cookies, alert you when a cookie is placed, or delete existing cookies. Most modern browsers (Google Chrome, Apple Safari, Mozilla Firefox, Microsoft Edge) provide intuitive privacy settings.
        </p>

        <p>
          Additionally, our website respects the <strong>Global Privacy Control (GPC)</strong> browser signal. If your browser broadcasts a GPC signal, we automatically suppress non-essential marketing cookies.
        </p>
      </div>
    </div>
  );
}
