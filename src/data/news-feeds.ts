import { CategorySlug } from '@/types';

export interface NewsFeedSource {
  id: string;
  name: string;
  outlet: string;
  category: CategorySlug;
  url: string;
  defaultAuthorRole: string;
}

export const US_NEWS_FEEDS: NewsFeedSource[] = [
  // --- 1. BREAKING NEWS ---
  {
    id: 'cnbc-top',
    name: 'CNBC Breaking & Top News',
    outlet: 'CNBC News',
    category: 'breaking-news',
    url: 'https://www.cnbc.com/id/100003114/device/rss/rss.html',
    defaultAuthorRole: 'National Breaking News Desk',
  },
  {
    id: 'nyt-home',
    name: 'The New York Times — Live Top Headlines',
    outlet: 'The New York Times',
    category: 'breaking-news',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
    defaultAuthorRole: 'Senior National Desk Editor',
  },
  {
    id: 'npr-news-main',
    name: 'NPR News — Live National Wire',
    outlet: 'NPR News',
    category: 'breaking-news',
    url: 'https://feeds.npr.org/1001/rss.xml',
    defaultAuthorRole: 'NPR National Desk',
  },

  // --- 2. U.S. NEWS ---
  {
    id: 'nyt-us',
    name: 'The New York Times — U.S. News',
    outlet: 'The New York Times',
    category: 'us-news',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/US.xml',
    defaultAuthorRole: 'National News Correspondent',
  },
  {
    id: 'npr-us',
    name: 'NPR — National Society & Courts',
    outlet: 'NPR News',
    category: 'us-news',
    url: 'https://feeds.npr.org/1003/rss.xml',
    defaultAuthorRole: 'Courts & Legal Affairs Correspondent',
  },

  // --- 3. POLITICS & CAPITOL HILL ---
  {
    id: 'nyt-politics',
    name: 'The New York Times — Capitol Hill & White House',
    outlet: 'The New York Times',
    category: 'politics',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/Politics.xml',
    defaultAuthorRole: 'Senior White House Correspondent',
  },
  {
    id: 'npr-politics',
    name: 'NPR — Congressional & Federal Politics',
    outlet: 'NPR News',
    category: 'politics',
    url: 'https://feeds.npr.org/1014/rss.xml',
    defaultAuthorRole: 'Capitol Hill Correspondent',
  },
  {
    id: 'cnbc-politics',
    name: 'CNBC — Washington Politics & Regulatory Policy',
    outlet: 'CNBC News',
    category: 'politics',
    url: 'https://www.cnbc.com/id/10000113/device/rss/rss.html',
    defaultAuthorRole: 'Washington Bureau Chief',
  },

  // --- 4. BUSINESS & CORPORATE AMERICA ---
  {
    id: 'nyt-business',
    name: 'The New York Times — Business & Industry',
    outlet: 'The New York Times',
    category: 'business',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/Business.xml',
    defaultAuthorRole: 'Corporate Enterprise Reporter',
  },
  {
    id: 'cnbc-business',
    name: 'CNBC — Corporate Strategy & Industry',
    outlet: 'CNBC News',
    category: 'business',
    url: 'https://www.cnbc.com/id/10001147/device/rss/rss.html',
    defaultAuthorRole: 'Senior Business Correspondent',
  },
  {
    id: 'npr-business',
    name: 'NPR — Economy & Workforce',
    outlet: 'NPR News',
    category: 'business',
    url: 'https://feeds.npr.org/1006/rss.xml',
    defaultAuthorRole: 'Economy & Labor Correspondent',
  },

  // --- 5. FINANCE & MARKETS ---
  {
    id: 'cnbc-finance',
    name: 'CNBC — Wall Street & Market Intelligence',
    outlet: 'CNBC News',
    category: 'finance',
    url: 'https://www.cnbc.com/id/10000664/device/rss/rss.html',
    defaultAuthorRole: 'Chief Financial Markets Analyst',
  },
  {
    id: 'nyt-economy',
    name: 'The New York Times — Fed & Macro Economy',
    outlet: 'The New York Times',
    category: 'finance',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/Economy.xml',
    defaultAuthorRole: 'Economics & Central Banking Editor',
  },
  {
    id: 'cnbc-investing',
    name: 'CNBC — Institutional Investing & Bonds',
    outlet: 'CNBC News',
    category: 'finance',
    url: 'https://www.cnbc.com/id/15839069/device/rss/rss.html',
    defaultAuthorRole: 'Markets & Asset Allocation Strategist',
  },

  // --- 6. TECHNOLOGY ---
  {
    id: 'wired-tech',
    name: 'Wired — Technology & Cyber Warfare',
    outlet: 'Wired',
    category: 'technology',
    url: 'https://www.wired.com/feed/rss',
    defaultAuthorRole: 'Silicon Valley Bureau Chief',
  },
  {
    id: 'nyt-technology',
    name: 'The New York Times — Silicon Valley & Tech',
    outlet: 'The New York Times',
    category: 'technology',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml',
    defaultAuthorRole: 'Senior Technology Correspondent',
  },
  {
    id: 'cnbc-tech',
    name: 'CNBC — Big Tech & Semiconductors',
    outlet: 'CNBC News',
    category: 'technology',
    url: 'https://www.cnbc.com/id/19854910/device/rss/rss.html',
    defaultAuthorRole: 'Tech Sector Analyst',
  },

  // --- 7. ARTIFICIAL INTELLIGENCE ---
  {
    id: 'techcrunch-ai',
    name: 'TechCrunch — Frontier AI & Autonomous Systems',
    outlet: 'TechCrunch',
    category: 'artificial-intelligence',
    url: 'https://techcrunch.com/category/artificial-intelligence/feed/',
    defaultAuthorRole: 'Artificial Intelligence Correspondent',
  },
  {
    id: 'techcrunch-enterprise',
    name: 'TechCrunch — Enterprise Compute & Cloud AI',
    outlet: 'TechCrunch',
    category: 'artificial-intelligence',
    url: 'https://techcrunch.com/category/enterprise/feed/',
    defaultAuthorRole: 'Deep Tech Systems Architect',
  },

  // --- 8. WORLD NEWS ---
  {
    id: 'nyt-world',
    name: 'The New York Times — Global Geopolitics & Alliances',
    outlet: 'The New York Times',
    category: 'world-news',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml',
    defaultAuthorRole: 'Foreign Affairs Bureau Chief',
  },
  {
    id: 'npr-world',
    name: 'NPR — International Dispatches',
    outlet: 'NPR News',
    category: 'world-news',
    url: 'https://feeds.npr.org/1004/rss.xml',
    defaultAuthorRole: 'International Diplomatic Correspondent',
  },

  // --- 9. ENTERTAINMENT & CULTURE ---
  {
    id: 'nyt-arts',
    name: 'The New York Times — Arts, Hollywood & Broadway',
    outlet: 'The New York Times',
    category: 'entertainment',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/Arts.xml',
    defaultAuthorRole: 'Arts & Cultural Critic',
  },
  {
    id: 'npr-culture',
    name: 'NPR — Contemporary Culture & Media',
    outlet: 'NPR News',
    category: 'entertainment',
    url: 'https://feeds.npr.org/1008/rss.xml',
    defaultAuthorRole: 'Cultural Affairs Correspondent',
  },

  // --- 10. HEALTH & MEDICINE ---
  {
    id: 'nyt-health',
    name: 'The New York Times — Health & Medical Science',
    outlet: 'The New York Times',
    category: 'health',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/Health.xml',
    defaultAuthorRole: 'Medical Science Correspondent',
  },
  {
    id: 'npr-health',
    name: 'NPR — Public Health & Clinical Trials',
    outlet: 'NPR News',
    category: 'health',
    url: 'https://feeds.npr.org/1128/rss.xml',
    defaultAuthorRole: 'Public Health Journalist',
  },
  {
    id: 'cnbc-health',
    name: 'CNBC — Pharma & Biotech Innovations',
    outlet: 'CNBC News',
    category: 'health',
    url: 'https://www.cnbc.com/id/10000108/device/rss/rss.html',
    defaultAuthorRole: 'Biotech & Healthcare Analyst',
  },

  // --- 11. LIFESTYLE & DESIGN ---
  {
    id: 'nyt-style',
    name: 'The New York Times — Architecture, Living & Design',
    outlet: 'The New York Times',
    category: 'lifestyle',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/FashionandStyle.xml',
    defaultAuthorRole: 'Lifestyle & Living Columnist',
  },
  {
    id: 'nyt-realestate',
    name: 'The New York Times — Residential Real Estate',
    outlet: 'The New York Times',
    category: 'lifestyle',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/RealEstate.xml',
    defaultAuthorRole: 'Real Estate & Architecture Writer',
  },

  // --- 12. SCIENCE & SPACE ---
  {
    id: 'nyt-science',
    name: 'The New York Times — Science, Space & NASA',
    outlet: 'The New York Times',
    category: 'science',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/Science.xml',
    defaultAuthorRole: 'Senior Science Editor',
  },
  {
    id: 'npr-science',
    name: 'NPR — Space Discoveries & Physics',
    outlet: 'NPR News',
    category: 'science',
    url: 'https://feeds.npr.org/1007/rss.xml',
    defaultAuthorRole: 'Science & Aerospace Correspondent',
  },
  {
    id: 'nasa-news',
    name: 'NASA — Official Aerospace & Missions Wire',
    outlet: 'NASA',
    category: 'science',
    url: 'https://www.nasa.gov/news-release/feed/',
    defaultAuthorRole: 'Aerospace Operations Specialist',
  },

  // --- 13. TRAVEL & DESTINATIONS ---
  {
    id: 'nyt-travel',
    name: 'The New York Times — Travel & Great Expeditions',
    outlet: 'The New York Times',
    category: 'travel',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/Travel.xml',
    defaultAuthorRole: 'Travel & Destinations Editor',
  },

  // --- 14. SPORTS ---
  {
    id: 'cbs-sports-headlines',
    name: 'CBS Sports — National Headlines & Scores',
    outlet: 'CBS Sports',
    category: 'sports',
    url: 'https://www.cbssports.com/rss/headlines/',
    defaultAuthorRole: 'Senior Sports Columnist',
  },
  {
    id: 'yahoo-sports-wire',
    name: 'Yahoo Sports — Major League Sports Wire',
    outlet: 'Yahoo Sports',
    category: 'sports',
    url: 'https://sports.yahoo.com/rss/',
    defaultAuthorRole: 'National Sports Desk',
  },
];
