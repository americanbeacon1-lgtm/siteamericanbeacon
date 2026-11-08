'use client';

import React, { useState } from 'react';
import { Share2, Link as LinkIcon, Check, Mail } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : (url || '');

  const copyToClipboard = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const emailUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Read this article on The American Beacon: ${shareUrl}`)}`;

  return (
    <div className="flex items-center gap-2 py-3 border-y border-neutral-200 text-xs">
      <span className="font-bold text-neutral-500 uppercase tracking-wider text-[10px] mr-1 flex items-center gap-1">
        <Share2 className="w-3.5 h-3.5" /> Share:
      </span>

      {/* X (formerly Twitter) SVG */}
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X (Twitter)"
        className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-700 hover:text-white hover:bg-neutral-900 hover:border-neutral-900 transition"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* LinkedIn SVG */}
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-700 hover:text-white hover:bg-[#0077b5] hover:border-[#0077b5] transition"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      </a>

      {/* Facebook SVG */}
      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-700 hover:text-white hover:bg-[#1877f2] hover:border-[#1877f2] transition"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>

      {/* Email */}
      <a
        href={emailUrl}
        aria-label="Share via Email"
        className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-700 hover:text-white hover:bg-red-700 hover:border-red-700 transition"
      >
        <Mail className="w-3.5 h-3.5" />
      </a>

      {/* Copy Link */}
      <button
        onClick={copyToClipboard}
        aria-label="Copy article link"
        className="flex items-center gap-1 text-[11px] font-semibold text-neutral-600 hover:text-neutral-900 border border-neutral-200 rounded-full px-3 py-1.5 transition ml-auto"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700">Link Copied</span>
          </>
        ) : (
          <>
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
}
