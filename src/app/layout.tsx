import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import { db } from '@/lib/db';

export async function generateMetadata(): Promise<Metadata> {
  const settings = db.getSettings();

  return {
    title: {
      template: `%s | ${settings.siteName}`,
      default: `${settings.siteName} — Breaking News, Politics, Finance, & World Intelligence`,
    },
    description: settings.description,
    keywords: [
      'U.S. News',
      'Breaking News',
      'Capitol Hill Politics',
      'Wall Street Finance',
      'Artificial Intelligence',
      'American Economy',
      'World News',
      'Supreme Court',
      'Federal Reserve',
    ],
    authors: [{ name: 'The American Beacon Editorial Board' }],
    creator: 'The American Beacon Publishing Group Inc.',
    publisher: 'The American Beacon Publishing Group Inc.',
    metadataBase: new URL('https://www.americanbeacon.online'),
    alternates: {
      canonical: 'https://www.americanbeacon.online',
      types: {
        'application/rss+xml': '/rss.xml',
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://www.americanbeacon.online',
      siteName: settings.siteName,
      title: `${settings.siteName} — The Voice of the Republic`,
      description: settings.description,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&h=630&q=80',
          width: 1200,
          height: 630,
          alt: 'The American Beacon — Independent American Journalism',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@AmericanBeacon',
      creator: '@AmericanBeacon',
      title: `${settings.siteName} — The Voice of the Republic`,
      description: settings.description,
      images: ['https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&h=630&q=80'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: settings.googleSearchConsoleTag,
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/icon.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      shortcut: '/favicon.ico',
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = db.getSettings();

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: settings.siteName,
    url: 'https://www.americanbeacon.online',
    logo: 'https://www.americanbeacon.online/icon.png',
    sameAs: [
      'https://twitter.com/AmericanBeacon',
      'https://www.linkedin.com/company/american-beacon',
      'https://www.facebook.com/americanbeacon',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Washington',
      addressRegion: 'DC',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'editorial newsroom',
      email: settings.contactEmail,
    },
  };

  return (
    <html lang="en">
      <head>
        {/* Favicon & App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        
        {/* Google Tag Manager (GTM-5NVRRVC2) */}
        <script async src="https://www.googletagmanager.com/gtm.js?id=GTM-5NVRRVC2" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* AdSense Publisher Script Placeholder */}
        {settings.adsensePublisherId && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${settings.adsensePublisherId}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="flex flex-col min-h-screen bg-white overflow-x-hidden">
        <Header />
        <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 pb-20 md:pb-6">
          {children}
        </main>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
