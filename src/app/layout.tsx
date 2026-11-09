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
    metadataBase: new URL('https://americanbeacon.com'),
    alternates: {
      canonical: '/',
      types: {
        'application/rss+xml': '/rss.xml',
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://americanbeacon.com',
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
    url: 'https://americanbeacon.com',
    logo: 'https://americanbeacon.com/logo.png',
    sameAs: [
      'https://twitter.com/AmericanBeacon',
      'https://www.linkedin.com/company/american-beacon',
      'https://www.facebook.com/americanbeacon',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '529 14th Street NW, Suite 800',
      addressLocality: 'Washington',
      addressRegion: 'DC',
      postalCode: '20045',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-202-555-0192',
      contactType: 'editorial newsroom',
      email: settings.contactEmail,
    },
  };

  return (
    <html lang="en">
      <head>
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
