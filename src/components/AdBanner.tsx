'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ExternalLink, Info, X } from 'lucide-react';
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

    const tryPush = () => {
      try {
        if (typeof window !== 'undefined' && window.__ADSENSE_LOADED__) {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
          initialized.current = true;
          return true;
        }
      } catch {
        // ignore
      }
      return false;
    };

    if (!tryPush()) {
      const interval = setInterval(() => {
        if (tryPush()) {
          clearInterval(interval);
        }
      }, 400);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className={`google-adsense-unit w-full overflow-hidden text-center my-1 ${className}`}>
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

  // If closed or explicitly disabled
  if (closed || (adSlot && !adSlot.enabled)) {
    return null;
  }

  const rawHtml = adSlot?.htmlCode || adSlot?.adCode;
  const customBanner = adSlot?.customBanner;
  const hasRealCustomBanner = Boolean(customBanner?.imageUrl && customBanner?.imageUrl.trim() !== '');

  // 1. CORNER FLOATING (Sticky Bottom-Right Box)
  if (position === 'corner_floating') {
    return (
      <div
        className={`fixed bottom-16 sm:bottom-5 right-3 sm:right-5 z-50 w-[calc(100vw-1.5rem)] max-w-xs sm:w-80 bg-white border border-neutral-300 rounded-lg shadow-xl p-2.5 transition-all duration-300 animate-fade-in ${className}`}
      >
        <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-neutral-100 text-[9px] uppercase font-bold text-neutral-400">
          <span className="flex items-center gap-1">
            <Info className="w-2.5 h-2.5 text-neutral-400" /> Advertisement
          </span>
          <button
            onClick={() => setClosed(true)}
            className="text-neutral-400 hover:text-neutral-800 transition p-0.5 cursor-pointer"
            title="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {rawHtml ? (
          <div dangerouslySetInnerHTML={{ __html: rawHtml }} className="w-full overflow-hidden text-center" />
        ) : hasRealCustomBanner && customBanner ? (
          <div className="space-y-1.5 text-left">
            <div className="w-full h-28 overflow-hidden rounded bg-neutral-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={customBanner.imageUrl} alt={customBanner.altText} className="w-full h-full object-cover" />
            </div>
            {customBanner.sponsorName && (
              <span className="text-[9px] font-bold uppercase text-red-700 block">{customBanner.sponsorName}</span>
            )}
            <h5 className="font-serif text-xs font-bold text-neutral-950 leading-snug line-clamp-2">
              {customBanner.altText}
            </h5>
            <Link
              href={customBanner.targetUrl || '/advertise'}
              className="inline-flex items-center justify-between w-full bg-neutral-900 hover:bg-neutral-800 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded transition"
            >
              <span>{customBanner.ctaText || 'Learn More'}</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        ) : (
          <GoogleAdSlot style={{ display: 'block', minHeight: '120px', width: '100%' }} />
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

        <div className="w-40 min-h-[600px] border border-neutral-200 bg-white rounded p-1.5 text-center shadow-sm flex flex-col justify-between">
          {rawHtml ? (
            <div dangerouslySetInnerHTML={{ __html: rawHtml }} className="w-full h-full overflow-hidden" />
          ) : hasRealCustomBanner && customBanner ? (
            <div className="space-y-2 flex flex-col justify-between h-full py-1">
              <div>
                {customBanner.sponsorName && (
                  <span className="text-[9px] font-bold text-red-700 uppercase block mb-1">
                    {customBanner.sponsorName}
                  </span>
                )}
                <div className="w-full h-44 overflow-hidden rounded mb-2 bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={customBanner.imageUrl} alt={customBanner.altText} className="w-full h-full object-cover" />
                </div>
                <h5 className="font-serif text-xs font-bold text-neutral-900 leading-snug">{customBanner.altText}</h5>
              </div>
              <Link
                href={customBanner.targetUrl || '/advertise'}
                className="block w-full bg-neutral-900 hover:bg-neutral-800 text-white text-[10px] font-bold uppercase tracking-wider py-1.5 rounded text-center transition"
              >
                {customBanner.ctaText || 'Learn More'}
              </Link>
            </div>
          ) : (
            <GoogleAdSlot style={{ display: 'inline-block', width: '144px', minHeight: '600px' }} format="vertical" />
          )}
        </div>
      </div>
    );
  }

  // 3. SIDEBAR BANNER (Clean, focused Google AdSense / Sponsor unit)
  if (position === 'sidebar') {
    return (
      <div
        className={`w-full my-6 flex flex-col items-center justify-center transition ${className}`}
        data-ad-position="sidebar"
      >
        <div className="w-full flex items-center justify-between text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-1.5 px-1">
          <span className="flex items-center gap-1">
            <Info className="w-2.5 h-2.5 text-neutral-400" /> Advertisement
          </span>
          <Link href="/advertise" className="hover:text-neutral-900 underline text-[10px]">
            Advertise With Us
          </Link>
        </div>

        <div className="w-full border border-neutral-200 bg-neutral-50/60 rounded-xl overflow-hidden p-2 text-center">
          {rawHtml ? (
            <div dangerouslySetInnerHTML={{ __html: rawHtml }} className="w-full p-2 overflow-hidden text-center" />
          ) : hasRealCustomBanner && customBanner ? (
            <div className="space-y-2 text-left p-2">
              <div className="w-full h-40 overflow-hidden rounded bg-neutral-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={customBanner.imageUrl} alt={customBanner.altText} className="w-full h-full object-cover" />
              </div>
              {customBanner.sponsorName && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 block">
                  {customBanner.sponsorName}
                </span>
              )}
              <h4 className="font-serif text-sm font-bold text-neutral-950 leading-snug">{customBanner.altText}</h4>
              <Link
                href={customBanner.targetUrl || '/advertise'}
                className="w-full flex items-center justify-center gap-1 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider py-2 px-3 rounded transition"
              >
                <span>{customBanner.ctaText || 'Learn More'}</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          ) : (
            <GoogleAdSlot style={{ display: 'block', minHeight: '250px', width: '100%' }} />
          )}
        </div>
      </div>
    );
  }

  // 4. STANDARD BANNERS (Header, Feed, In-Article, Footer)
  return (
    <div
      className={`w-full my-4 flex flex-col items-center justify-center transition ${className}`}
      data-ad-position={position}
    >
      {/* Editorial Ad Disclosure Label */}
      <div className="w-full max-w-5xl flex items-center justify-between text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-1 px-2">
        <span className="flex items-center gap-1">
          <Info className="w-2.5 h-2.5 text-neutral-400" /> Advertisement
        </span>
        <Link href="/advertise" className="hover:text-neutral-700 underline transition">
          Advertise With Us
        </Link>
      </div>

      {/* Clean Ad Box Container */}
      <div className="w-full max-w-5xl border border-neutral-200 bg-neutral-50/50 rounded-lg p-2.5 sm:p-3 text-center relative overflow-hidden transition">
        {rawHtml ? (
          <div
            dangerouslySetInnerHTML={{ __html: rawHtml }}
            className="flex items-center justify-center min-h-[90px] w-full overflow-hidden"
          />
        ) : hasRealCustomBanner && customBanner ? (
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-left">
            <div className="w-full md:w-48 h-24 shrink-0 rounded overflow-hidden bg-neutral-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={customBanner.imageUrl} alt={customBanner.altText} className="w-full h-full object-cover" />
            </div>
            <div className="space-y-1 flex-1 min-w-0">
              {customBanner.sponsorName && (
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-50 px-2 py-0.5 rounded">
                  {customBanner.sponsorName}
                </span>
              )}
              <h4 className="font-serif text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                {customBanner.altText}
              </h4>
            </div>
            <div className="w-full md:w-auto shrink-0 flex items-center justify-end">
              <Link
                href={customBanner.targetUrl || '/advertise'}
                className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded transition whitespace-nowrap"
              >
                <span>{customBanner.ctaText || 'Learn More'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <GoogleAdSlot style={{ display: 'block', minHeight: '90px', width: '100%' }} />
        )}
      </div>
    </div>
  );
}
