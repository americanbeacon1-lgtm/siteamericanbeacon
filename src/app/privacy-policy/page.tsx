import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | CCPA, CPRA & CalOPPA Compliance | The American Beacon',
  description: 'The American Beacon privacy policy outlining data collection, cookies, California Consumer Privacy Act compliance, and your digital privacy rights.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      <div className="border-b-2 border-neutral-900 pb-6">
        <span className="text-[11px] font-black uppercase tracking-widest text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded inline-block mb-3">
          Legal & Regulatory Compliance
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-black text-neutral-950 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-neutral-500 mt-2">
          Effective Date: January 1, 2026 • Last Reviewed: November 2026 • Compliant with California Consumer Privacy Act (CCPA/CPRA) & Virginia CDPA
        </p>
      </div>

      <div className="article-content space-y-6">
        <p className="article-lead">
          The American Beacon Publishing Group Inc. (&quot;The American Beacon&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy and ensuring transparency regarding how your personal information is collected, utilized, and secured across our digital platforms.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          We collect information that you voluntarily provide to us when you subscribe to our morning dispatch, submit letters to the editor, participate in community discussions, or contact our newsroom bureaus. This may include your name, professional email address, postal code, and demographic interests.
        </p>

        <h2>2. Automated Data Collection & Analytics</h2>
        <p>
          When you navigate our website, our servers automatically record standard internet telemetry, including your Internet Protocol (IP) address, browser configuration, operating system, referring URLs, reading time per article, and interaction with programmatic advertising units. We utilize industry-standard analytics tools such as Google Analytics 4 to understand reader interest and improve editorial coverage.
        </p>

        <h2>3. Advertising & Programmatic Networks</h2>
        <p>
          We partner with third-party advertising networks, including Google AdSense, Google Ad Manager, and certified programmatic exchanges, to display contextual and interest-based advertisements. These third-party vendors may use cookies, web beacons, and mobile identifiers to serve ads based on your visits to this and other websites. You may opt out of personalized advertising by visiting the <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-red-700 underline">Digital Advertising Alliance Opt-Out Page</a> or Google Ads Settings.
        </p>

        <h2>4. California Consumer Privacy Act (CCPA / CPRA) Rights</h2>
        <p>
          If you are a California resident, the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA) grant you specific statutory rights regarding your personal information:
        </p>
        <ul>
          <li><strong>Right to Know:</strong> You have the right to request disclosure of the categories and specific pieces of personal information collected over the preceding 12 months.</li>
          <li><strong>Right to Delete:</strong> You have the right to request deletion of personal information collected from you.</li>
          <li><strong>Right to Opt-Out:</strong> We do not sell your personal data for monetary consideration. For programmatic ad sharing, you may exercise your &quot;Do Not Sell or Share My Personal Information&quot; right by emailing americanbeacon@americanbeacon.online.</li>
          <li><strong>Right to Non-Discrimination:</strong> We will never discriminate against any reader for exercising privacy rights.</li>
        </ul>

        <h2>5. Information Security</h2>
        <p>
          We implement rigorous technical, administrative, and physical safeguards designed to protect personal data against unauthorized access, disclosure, or alteration. All web traffic is encrypted using Transport Layer Security (TLS 1.3).
        </p>

        <h2>6. Contact the Data Protection Officer</h2>
        <p>
          For questions, data access requests, or privacy inquiries, contact our Legal & Privacy Bureau:
        </p>
        <p>
          <strong>The American Beacon Publishing Group Inc.</strong><br />
          Attention: Privacy Officer<br />
          529 14th Street NW, Suite 800, Washington, D.C. 20045<br />
          Email: <a href="mailto:americanbeacon@americanbeacon.online" className="text-red-700 underline">americanbeacon@americanbeacon.online</a>
        </p>
      </div>
    </div>
  );
}
