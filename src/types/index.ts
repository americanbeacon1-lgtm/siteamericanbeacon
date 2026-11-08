export type CategorySlug =
  | 'breaking-news'
  | 'us-news'
  | 'politics'
  | 'business'
  | 'finance'
  | 'technology'
  | 'artificial-intelligence'
  | 'world-news'
  | 'entertainment'
  | 'health'
  | 'lifestyle'
  | 'science'
  | 'travel'
  | 'sports';

export interface CategoryInfo {
  slug: CategorySlug;
  name: string;
  shortName: string;
  description: string;
  accentColor: string;
  seoTitle: string;
  seoDescription: string;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
  bio: string;
  twitter?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: CategorySlug;
  content: string;
  keyTakeaways: string[];
  imageUrl: string;
  imageCaption: string;
  imageCredit: string;
  author: Author;
  publishedAt: string;
  updatedAt: string;
  readTimeMinutes: number;
  isFeaturedLead: boolean;
  isBreaking: boolean;
  isTrending: boolean;
  isEditorsPick: boolean;
  viewsCount: number;
  tags: string[];
  sources: string[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export type AdPosition =
  | 'header'
  | 'header_top'
  | 'sidebar'
  | 'in_article'
  | 'feed'
  | 'footer'
  | 'corner_left'
  | 'corner_right'
  | 'corner_floating';

export interface AdSlot {
  id: string;
  position: AdPosition;
  name: string;
  dimension: string;
  enabled: boolean;
  type: 'custom' | 'adsense' | 'gam' | 'html';
  adCode?: string;
  htmlCode?: string;
  customBanner?: {
    imageUrl: string;
    targetUrl: string;
    altText: string;
    sponsorName: string;
    ctaText?: string;
  };
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  edition: string;
  status: 'active' | 'unsubscribed';
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  description: string;
  editorialBureau: string;
  contactEmail: string;
  phone: string;
  address: string;
  googleAnalyticsId: string;
  googleSearchConsoleTag: string;
  adsensePublisherId: string;
  adsTxtContent: string;
  breakingNewsAlert: string;
  breakingNewsActive: boolean;
}
