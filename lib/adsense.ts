/**
 * Google AdSense Configuration
 * Global Geo-Targeted Setup with High-Demand Region Focus
 * Premium CPM/CPC Countries: US, UK, CA, AU, NZ, DE, NL, CH, SE, etc.
 */

export const ADSENSE_CONFIG = {
  // Replace with your AdSense Publisher ID
  // Format: pub-xxxxxxxxxxxxxxxx
  publisherId: process.env.NEXT_PUBLIC_ADSENSE_ID || '',

  // Enable auto ads (Google automatically places ads)
  autoAdsEnabled: true,

  // GLOBAL GEO-TARGETING - HIGH DEMAND REGIONS
  // These regions have highest CPM/CPC rates and strong advertiser demand
  geoTargeting: {
    enabled: true,
    // Tier 1: Premium High-Value Markets (Highest CPM)
    tier1: {
      name: 'Premium Markets',
      regions: ['US', 'CA', 'GB', 'AU', 'NZ', 'IE'],
      description: 'United States, Canada, UK, Australia, New Zealand, Ireland',
      cpmRange: '$8-15+',
      focus: true,
    },
    // Tier 2: High-Value European Markets
    tier2: {
      name: 'Europe - High Value',
      regions: ['DE', 'NL', 'CH', 'AT', 'SE', 'NO', 'DK', 'FI'],
      description: 'Germany, Netherlands, Switzerland, Austria, Scandinavia',
      cpmRange: '$5-10',
      focus: true,
    },
    // Tier 3: Developed European & Asia-Pacific
    tier3: {
      name: 'Developed Markets',
      regions: ['FR', 'ES', 'IT', 'BE', 'SG', 'HK', 'JP', 'KR'],
      description: 'France, Spain, Italy, Singapore, Hong Kong, Japan, Korea',
      cpmRange: '$3-8',
      focus: true,
    },
    // Tier 4: Emerging High-Growth Markets
    tier4: {
      name: 'Emerging Markets',
      regions: ['IN', 'BR', 'MX', 'ZA', 'PH', 'ID', 'TH', 'VN'],
      description: 'India, Brazil, Mexico, South Africa, SE Asia growth markets',
      cpmRange: '$0.5-3',
      focus: true,
    },
    // Global: Allow all, but optimize for high-demand
    globalStrategy: 'multi-tier-optimization',
  },

  // Target audience configuration - GLOBAL FOCUS
  targetAudience: {
    health: {
      keywords: [
        'health',
        'fitness',
        'wellness',
        'diet',
        'exercise',
        'nutrition',
        'bmi',
        'weight loss',
        'healthy living',
        'fitness calculator',
      ],
      interests: ['health-fitness', 'medical', 'wellness', 'nutrition'],
      categories: ['Health & Fitness', 'Healthcare'],
      globalInterest: 'high', // Popular worldwide
    },
    finance: {
      keywords: [
        'finance',
        'investment',
        'money',
        'savings',
        'retirement',
        'loan',
        'mortgage',
        'emi',
        'financial planning',
        'wealth management',
      ],
      interests: ['finance', 'investing', 'banking', 'crypto', 'stocks'],
      categories: ['Finance', 'Business'],
      globalInterest: 'very-high', // High demand globally
      premiumMarkets: true,
    },
    seo: {
      keywords: [
        'seo',
        'marketing',
        'content',
        'keywords',
        'optimization',
        'digital marketing',
        'web optimization',
        'search ranking',
      ],
      interests: ['business-finance', 'web-design', 'marketing', 'business'],
      categories: ['Business', 'Technology'],
      globalInterest: 'very-high',
      premiumMarkets: true,
    },
    developer: {
      keywords: [
        'coding',
        'programming',
        'development',
        'web',
        'software',
        'json',
        'api',
        'tools',
        'formatter',
        'developer tools',
      ],
      interests: ['technology', 'computers', 'programming', 'coding'],
      categories: ['Technology', 'Computers'],
      globalInterest: 'very-high',
      premiumMarkets: true,
    },
    converter: {
      keywords: [
        'converter',
        'tools',
        'calculation',
        'units',
        'image converter',
        'file converter',
        'temperature',
        'currency',
      ],
      interests: ['technology', 'productivity-tools', 'utilities'],
      categories: ['Technology', 'Tools'],
      globalInterest: 'high',
    },
  },

  // Ad unit configurations
  adUnits: {
    // Homepage banner ads
    homepageBanner: {
      slotId: '1234567890',
      type: 'display',
      size: 'auto',
      responsive: true,
      formats: ['display', 'in-feed'],
    },
    // Homepage sidebar ad
    homepageSidebar: {
      slotId: '1234567891',
      type: 'display',
      size: [300, 250],
      responsive: true,
    },
    // Tool page - results
    toolPageTop: {
      slotId: '1234567892',
      type: 'display',
      size: 'auto',
      responsive: true,
      highValue: true, // Higher CTR expected
    },
    // Tool page - FAQs
    toolPageBottom: {
      slotId: '1234567893',
      type: 'display',
      size: [728, 90],
      responsive: true,
    },
    // Blog page - header
    blogHeader: {
      slotId: '1234567894',
      type: 'display',
      size: 'auto',
      responsive: true,
    },
    // Blog page - content
    blogSidebar: {
      slotId: '1234567895',
      type: 'display',
      size: [300, 600],
      responsive: true,
      highValue: true, // Premium placement
    },
  },

  // Content targeting - GLOBAL OPTIMIZATION
  contentTargeting: {
    excludedCategories: [
      'alcohol',
      'tobacco',
      'gambling',
      'violence',
      'sexual-content',
      'illegal-content',
    ],
    // Allow high-value content
    allowedCategories: [
      'finance',
      'business',
      'technology',
      'health',
      'wellness',
      'education',
      'productivity',
    ],
    restrictedPlacement: false,
    safeSearch: true,
  },

  // Language support for global reach
  languages: {
    primary: ['en'], // English
    supported: [
      'en',
      'es',
      'fr',
      'de',
      'it',
      'pt',
      'ru',
      'ja',
      'zh',
      'hi',
      'ko',
    ],
  },

  // Ad serving optimization
  adServing: {
    strategy: 'geo-optimized', // Serve based on geographic CPM value
    rotateAds: true,
    highValueFirst: true, // Serve premium ads first in high-value regions
    fallback: 'standard-fill', // Fallback for low-value regions
  },

  // Analytics tracking
  trackAdClicks: true,
  trackAdImpressions: true,
  trackGeoPerformance: true, // Track which regions generate most revenue
  trackCategoryPerformance: true,
}

export function isAdSenseConfigured(): boolean {
  return !!ADSENSE_CONFIG.publisherId
}

/**
 * Get user's country code from IP (requires IP geolocation service)
 * Used to determine which tier they fall into
 */
export function getCountryTier(countryCode: string): 'tier1' | 'tier2' | 'tier3' | 'tier4' | 'global' {
  const tier1 = ADSENSE_CONFIG.geoTargeting.tier1.regions
  const tier2 = ADSENSE_CONFIG.geoTargeting.tier2.regions
  const tier3 = ADSENSE_CONFIG.geoTargeting.tier3.regions
  const tier4 = ADSENSE_CONFIG.geoTargeting.tier4.regions

  if (tier1.includes(countryCode)) return 'tier1'
  if (tier2.includes(countryCode)) return 'tier2'
  if (tier3.includes(countryCode)) return 'tier3'
  if (tier4.includes(countryCode)) return 'tier4'
  return 'global'
}
