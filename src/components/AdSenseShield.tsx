'use client';

import { useEffect } from 'react';

export const ADSENSE_PUB_ID = 'ca-pub-4875140581206437';

declare global {
  interface Window {
    __ADSENSE_LOADED__?: boolean;
    adsbygoogle?: any[];
  }
}

export default function AdSenseShield() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.__ADSENSE_LOADED__) return;

    // Detect official Google verification/indexing crawler (Mediapartners-Google / Googlebot)
    const ua = navigator.userAgent || '';
    const isGoogleReviewer = /Mediapartners-Google|Google-Display-Ads|Googlebot/i.test(ua);

    const activateAdSense = () => {
      if (window.__ADSENSE_LOADED__) return;
      window.__ADSENSE_LOADED__ = true;

      // Remove all interaction listeners
      cleanupListeners();

      // Inject official AdSense script into head
      const existing = document.querySelector('script[src*="pagead2.googlesyndication.com"]');
      if (!existing) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
      }

      // Initialize all waiting adsbygoogle containers
      setTimeout(() => {
        try {
          const adSlots = document.querySelectorAll('ins.adsbygoogle');
          adSlots.forEach((slot) => {
            if (!slot.getAttribute('data-adsbygoogle-status')) {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
          });
        } catch {
          // ignore
        }
      }, 100);
    };

    const cleanupListeners = () => {
      window.removeEventListener('mousemove', activateAdSense);
      window.removeEventListener('scroll', activateAdSense);
      window.removeEventListener('touchstart', activateAdSense);
      window.removeEventListener('keydown', activateAdSense);
      window.removeEventListener('click', activateAdSense);
    };

    if (isGoogleReviewer) {
      // Google's official crawler gets immediate access for domain verification
      activateAdSense();
    } else {
      // Real human users: only activate after first natural interaction (scroll, touch, mouse, key)
      // Automated bounce bots that open and close in 1-2s will NEVER trigger AdSense
      window.addEventListener('mousemove', activateAdSense, { once: true, passive: true });
      window.addEventListener('scroll', activateAdSense, { once: true, passive: true });
      window.addEventListener('touchstart', activateAdSense, { once: true, passive: true });
      window.addEventListener('keydown', activateAdSense, { once: true, passive: true });
      window.addEventListener('click', activateAdSense, { once: true, passive: true });
    }

    return cleanupListeners;
  }, []);

  return null;
}
