'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ExternalLink, Info, X, Mail, Sparkles, TrendingUp } from 'lucide-react';
import { AdPosition, AdSlot } from '@/types';

export const GOOGLE_ADSENSE_PUB_ID = 'ca-pub-4875140581206437';

export function GoogleAdSlot({
  client = GOOGLE_ADSENSE_PUB_ID,
  slot = 'auto',
  format = 'auto',
  responsive = true,
  style = { display: 'block' },
  className = '',
}: {
  client?: string;
  slot?: string;
  format?: string;
  responsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    try {
      if (typeof window !== 'undefined') {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        initialized.current = true;
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className={`google-adsense-unit w-full overflow-hidden text-center my-1.5 ${className}`}>
      {/* Google AdSense Official Script Tag */}
      <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
        crossOrigin="anonymous"
      />
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}

interface AdBannerProps {
  position: AdPosition;
  adSlot?: AdSlot | null;
  className?: string;
}

export default function AdBanner({ position, adSlot, className = '' }: AdBannerProps) {
  const [closed, setClosed] = useState(false);

  // If ad slot is explicitly disabled or not configured
  if (closed || (adSlot && !adSlot.enabled)) {
    return null;
  }

  // Fallback defaults if no specific ad slot is passed
  const fallbackSponsors: Record<
    AdPosition,
    { title: string; subtitle: string; sponsor: string; link: string; cta: string; dimension: string }
  > = {
    header: {
      title: 'Institutional Wealth & Capital Allocation Forum 2026',
      subtitle: 'Connecting leading North American pension funds, sovereign entities, and private equity chiefs.',
      sponsor: 'Vanguard Global Advisory Group',
      link: '/advertise',
      cta: 'Explore Executive Briefing',
      dimension: '728x90 / 970x250',
    },
    header_top: {
      title: 'Wall Street Premier Market Briefing & Institutional Analysis',
      subtitle: 'Exclusive market intelligence delivering real-time Alpha to US fund managers.',
      sponsor: 'Goldman Sachs Asset Management',
      link: '/advertise',
      cta: 'Access Research',
      dimension: '970x90 Super Leaderboard',
    },
    sidebar: {
      title: 'Advertise on The American Beacon — Reach 2.4M+ US Decision Makers',
      subtitle: 'Position your brand in front of senior executives, investors, and consumers across the United States.',
      sponsor: 'Commercial Advertising Desk',
      link: 'mailto:americanbeacon@americanbeacon.online?subject=Advertising%20Inquiry%20-%20The%20American%20Beacon&body=Hello%20Commercial%20Desk,%0D%0A%0D%0AI%20am%20interested%20in%20advertising%20on%20The%20American%20Beacon.%20Please%20send%20your%20media%20kit%20and%20rates.%0D%0A%0D%0ACompany:%0D%0AName:%0D%0ABudget:',
      cta: 'Advertise Here • Contact Desk',
      dimension: '300x600 Half-Page',
    },
    in_article: {
      title: 'Commercial Real Estate Debt Strategies in an Easing Rate Cycle',
      subtitle: 'Analyze institutional opportunities across industrial logistics and prime multifamily assets.',
      sponsor: 'Beacon Real Estate Partners',
      link: '/advertise',
      cta: 'Download Institutional Report',
      dimension: '728x90 / 300x250',
    },
    feed: {
      title: 'Real-Time Financial Intelligence Terminal & Algorithmic Feeds',
      subtitle: 'Sub-millisecond market execution, macro sentiment tracking, and SEC regulatory filings.',
      sponsor: 'Dow Jones Market Data Corp',
      link: '/advertise',
      cta: 'Schedule Corporate Demo',
      dimension: '970x90 Banner',
    },
    footer: {
      title: 'Partner with The American Beacon — Reach 1.2M Affluent US Readers',
      subtitle: 'High-impact programmatic takeovers, newsletter sponsorships, and executive roundtables.',
      sponsor: 'The American Beacon Media Network',
      link: '/advertise',
      cta: 'Download 2026 Media Kit',
      dimension: '728x90 Anchor',
    },
    corner_left: {
      title: 'Goldman Sachs Private Wealth',
      subtitle: 'Tailored institutional liquidity management.',
      sponsor: 'Goldman Sachs',
      link: '/advertise',
      cta: 'Learn More',
      dimension: '160x600 Skyscraper',
    },
    corner_right: {
      title: 'Amazon Web Services Cloud AI',
      subtitle: 'Next-generation sovereign enterprise infrastructure.',
      sponsor: 'AWS Cloud',
      link: '/advertise',
      cta: 'Deploy Now',
      dimension: '160x600 Skyscraper',
    },
    corner_floating: {
      title: 'Bloomberg Professional Terminal',
      subtitle: 'The definitive data network for Wall Street.',
      sponsor: 'Bloomberg LP',
      link: '/advertise',
      cta: 'Request Trial',
      dimension: '300x250 Sticky',
    },
  };

  const currentFallback = fallbackSponsors[position] || fallbackSponsors.header;
  const rawHtml = adSlot?.htmlCode || adSlot?.adCode;

  // 1. CORNER FLOATING (Sticky Bottom-Right Box)
  if (position === 'corner_floating') {
    return (
      <div className={`fixed bottom-16 sm:bottom-5 right-3 sm:right-5 z-50 w-[calc(100vw-1.5rem)] max-w-xs sm:w-80 bg-white border-2 border-neutral-800 rounded-lg shadow-2xl p-3 transition-all duration-300 animate-fade-in ${className}`}>
        <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-neutral-200 text-[10px] uppercase font-bold text-neutral-500">
          <span className="flex items-center gap-1">
            <Info className="w-3 h-3 text-red-700" /> PAID ADVERTISEMENT
          </span>
          <button
            onClick={() => setClosed(true)}
            className="text-neutral-400 hover:text-neutral-900 transition p-0.5 cursor-pointer"
            title="Close advertisement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Google AdSense Placement */}
        <GoogleAdSlot style={{ display: 'block', minHeight: '120px', width: '100%' }} />

        {rawHtml ? (
          <div
            dangerouslySetInnerHTML={{ __html: rawHtml }}
            className="w-full overflow-hidden text-center"
          />
        ) : (
          <div className="space-y-2 text-left">
            {adSlot?.customBanner?.imageUrl && (
              <div className="w-full h-28 overflow-hidden rounded bg-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={adSlot.customBanner.imageUrl}
                  alt={adSlot.customBanner.altText}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <span className="text-[9px] font-black uppercase text-red-700 block">
              {adSlot?.customBanner?.sponsorName || currentFallback.sponsor}
            </span>
            <h5 className="font-serif text-xs font-bold text-neutral-950 leading-snug line-clamp-2">
              {adSlot?.customBanner?.altText || currentFallback.title}
            </h5>
            <Link
              href={adSlot?.customBanner?.targetUrl || currentFallback.link}
              className="inline-flex items-center justify-between w-full bg-neutral-900 hover:bg-red-700 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded transition"
            >
              <span>{adSlot?.customBanner?.ctaText || currentFallback.cta}</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>
    );
  }

  // 2. CORNER GUTTERS (Left & Right Fixed Skyscraper 160x600 for wide desktop screens)
  if (position === 'corner_left' || position === 'corner_right') {
    const isLeft = position === 'corner_left';
    return (
      <div
        className={`hidden 2xl:block fixed ${isLeft ? 'left-3' : 'right-3'} top-36 w-40 z-30 transition-all ${className}`}
      >
        <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-neutral-400 font-bold mb-1 px-1">
          <span>ADVERTISEMENT</span>
          <button onClick={() => setClosed(true)} className="hover:text-neutral-700">
            <X className="w-3 h-3" />
          </button>
        </div>

        <div className="w-40 min-h-[600px] border border-neutral-300 bg-neutral-50 rounded p-2 text-center shadow-md flex flex-col justify-between">
          {/* Google AdSense Gutter Unit */}
          <GoogleAdSlot style={{ display: 'inline-block', width: '144px', minHeight: '300px' }} format="vertical" />
          {rawHtml ? (
            <div
              dangerouslySetInnerHTML={{ __html: rawHtml }}
              className="w-full h-full overflow-hidden"
            />
          ) : (
            <div className="space-y-3 flex flex-col justify-between h-full py-2">
              <div>
                <span className="text-[9px] font-bold text-red-700 uppercase block mb-1">
                  {adSlot?.customBanner?.sponsorName || currentFallback.sponsor}
                </span>
                {adSlot?.customBanner?.imageUrl && (
                  <div className="w-full h-44 overflow-hidden rounded mb-2 bg-neutral-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={adSlot.customBanner.imageUrl}
                      alt={adSlot.customBanner.altText}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h5 className="font-serif text-xs font-bold text-neutral-900 leading-snug">
                  {adSlot?.customBanner?.altText || currentFallback.title}
                </h5>
                <p className="text-[10px] text-neutral-500 mt-2 leading-relaxed">
                  {currentFallback.subtitle}
                </p>
              </div>

              <Link
                href={adSlot?.customBanner?.targetUrl || currentFallback.link}
                className="block w-full bg-neutral-900 hover:bg-neutral-800 text-white text-[10px] font-bold uppercase tracking-wider py-2 rounded text-center transition"
              >
                {adSlot?.customBanner?.ctaText || currentFallback.cta}
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 3. SIDEBAR BANNER (Dedicated vertical column layout, strictly formatted for sidebars ~300px without squeezing)
  if (position === 'sidebar') {
    const directEmail = 'americanbeacon@americanbeacon.online';
    const mailtoSubject = encodeURIComponent('Advertising Placement Inquiry — The American Beacon');
    const mailtoBody = encodeURIComponent(
      'Hello American Beacon Commercial Desk,\n\nI am interested in advertising on The American Beacon. Please send your 2026 media kit, available banner positions, and pricing.\n\nCompany / Agency:\nContact Name:\nEstimated Budget:\nTarget Launch Date:\n'
    );
    const mailtoUrl = `mailto:${directEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

    return (
      <div
        className={`w-full my-6 flex flex-col items-center justify-center transition ${className}`}
        data-ad-position="sidebar"
      >
        {/* Disclosure label */}
        <div className="w-full flex items-center justify-between text-[10px] uppercase tracking-wider text-neutral-400 font-bold mb-1.5 px-1">
          <span className="flex items-center gap-1 text-red-700">
            <Sparkles className="w-3.5 h-3.5 text-red-600 animate-pulse" /> ADVERTISING SPOTLIGHT
          </span>
          <Link href="/advertise" className="hover:text-neutral-900 underline text-[10px]">
            Media Kit
          </Link>
        </div>

        {/* Executive Chamativo Card */}
        <div className="w-full border-2 border-neutral-900 bg-gradient-to-b from-[#0b1220] via-[#0f172a] to-[#070b14] text-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-2 sm:p-3">
          {/* Google AdSense Sidebar Placement */}
          <GoogleAdSlot style={{ display: 'block', minHeight: '250px', width: '100%' }} className="mb-2 bg-white/5 rounded p-1" />
          {rawHtml ? (
            <div
              dangerouslySetInnerHTML={{ __html: rawHtml }}
              className="w-full p-4 overflow-hidden text-center"
            />
          ) : (
            <div className="flex flex-col">
              {/* Image with overlay badge */}
              <div className="relative w-full h-44 overflow-hidden bg-neutral-900 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                  alt="Advertise on The American Beacon"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-[#0b1220]/50 to-transparent"></div>
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider bg-red-600 text-white px-2.5 py-1 rounded shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                    FEATURE YOUR BRAND HERE
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] font-mono font-bold text-cyan-300">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-cyan-400" /> 2.4M+ US READERS
                  </span>
                  <span className="text-emerald-400 font-semibold">HIGH IMPACT</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 space-y-3.5 text-left">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                    THE AMERICAN BEACON • COMMERCIAL DESK
                  </span>
                  <h4
                    className="font-serif text-lg font-black !text-white leading-tight"
                    style={{ color: '#ffffff' }}
                  >
                    Promote Your Company to Millions of U.S. Decision Makers
                  </h4>
                  <p
                    className="text-xs !text-slate-200 mt-1.5 leading-relaxed"
                    style={{ color: '#e2e8f0' }}
                  >
                    Place your brand directly in front of senior executives, investors, and affluent American consumers with high-impact editorial placement.
                  </p>
                </div>

                {/* Email Direct Contact Box */}
                <div className="p-3 rounded-lg bg-[#070b14] border border-cyan-800/60 space-y-1.5 shadow-inner">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Direct Commercial Contact:</span>
                  </div>
                  <a
                    href={mailtoUrl}
                    className="block text-xs font-mono font-bold text-cyan-300 hover:text-cyan-200 transition break-all underline decoration-cyan-500/50"
                  >
                    {directEmail}
                  </a>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-1">
                  <a
                    href={mailtoUrl}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-lg shadow-lg shadow-red-950/60 transition cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Advertising Inquiry</span>
                  </a>

                  <Link
                    href="/advertise"
                    className="w-full flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold py-2 px-3 rounded-lg border border-slate-700 transition"
                  >
                    <span>View 2026 Media Kit & Rates</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 4. STANDARD BANNERS (Header, Feed, In-Article, Footer)
  return (
    <div
      className={`w-full my-6 flex flex-col items-center justify-center transition ${className}`}
      data-ad-position={position}
    >
      {/* Editorial Ad Disclosure Label */}
      <div className="w-full max-w-5xl flex items-center justify-between text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-1 px-2">
        <span className="flex items-center gap-1">
          <Info className="w-2.5 h-2.5 text-neutral-400" /> Advertisement • Sponsored Partner
        </span>
        <Link href="/advertise" className="hover:text-neutral-700 underline transition">
          Advertise With Us
        </Link>
      </div>

      {/* Ad Box Container */}
      <div className="w-full max-w-5xl border border-neutral-200 bg-neutral-50 rounded p-4 text-center relative overflow-hidden shadow-2xs hover:border-neutral-300 transition">
        {/* Google AdSense Responsive Leaderboard / Banner */}
        <GoogleAdSlot style={{ display: 'block', minHeight: '90px', width: '100%' }} className="mb-3" />

        {rawHtml ? (
          <div
            dangerouslySetInnerHTML={{ __html: rawHtml }}
            className="flex items-center justify-center min-h-[90px] w-full overflow-hidden"
          />
        ) : (
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-left">
            {adSlot?.customBanner?.imageUrl && (
              <div className="w-full md:w-48 h-24 shrink-0 rounded overflow-hidden bg-neutral-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={adSlot.customBanner.imageUrl}
                  alt={adSlot.customBanner.altText}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="space-y-1 flex-1 min-w-0">
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-100 px-2 py-0.5 rounded break-normal">
                Sponsored by {adSlot?.customBanner?.sponsorName || currentFallback.sponsor}
              </span>
              <h4 className="font-serif text-base sm:text-lg font-bold text-neutral-900 leading-snug break-words">
                {adSlot?.customBanner?.altText || currentFallback.title}
              </h4>
              <p className="text-xs text-neutral-600 line-clamp-2 break-words">
                {currentFallback.subtitle}
              </p>
            </div>

            <div className="w-full md:w-auto shrink-0 flex items-center justify-end">
              <Link
                href={adSlot?.customBanner?.targetUrl || currentFallback.link}
                className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded transition shadow-xs whitespace-nowrap"
              >
                <span>{adSlot?.customBanner?.ctaText || currentFallback.cta}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
