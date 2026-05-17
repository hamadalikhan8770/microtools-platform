/**
 * Geo-Targeting Utility
 * Detects user location and optimizes ad serving for maximum revenue
 * Uses IP-based geolocation from Vercel or Cloudflare headers
 */

import { ADSENSE_CONFIG } from '@/lib/adsense'

export interface GeoLocation {
  country: string
  countryName: string
  region: string
  tier: 'tier1' | 'tier2' | 'tier3' | 'tier4' | 'global'
  cpmEstimate: string
  isHighValue: boolean
}

/**
 * Get country code from various sources
 * Vercel: x-vercel-ip-country
 * Cloudflare: cf-ipcountry
 * Custom: custom geo lookup service
 */
export function getCountryFromHeaders(headers: Record<string, string | string[]>): string | null {
  // Vercel edge function header
  if (headers['x-vercel-ip-country']) {
    return (headers['x-vercel-ip-country'] as string).toUpperCase()
  }

  // Cloudflare header
  if (headers['cf-ipcountry']) {
    return (headers['cf-ipcountry'] as string).toUpperCase()
  }

  // Custom geo header (if using custom geolocation service)
  if (headers['x-geo-country']) {
    return (headers['x-geo-country'] as string).toUpperCase()
  }

  return null
}

/**
 * Determine user tier based on country code
 */
export function getCountryTier(
  countryCode: string | null
): 'tier1' | 'tier2' | 'tier3' | 'tier4' | 'global' {
  if (!countryCode) return 'global'

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

/**
 * Get CPM estimate for tier
 */
export function getCpmEstimate(tier: string): string {
  switch (tier) {
    case 'tier1':
      return ADSENSE_CONFIG.geoTargeting.tier1.cpmRange
    case 'tier2':
      return ADSENSE_CONFIG.geoTargeting.tier2.cpmRange
    case 'tier3':
      return ADSENSE_CONFIG.geoTargeting.tier3.cpmRange
    case 'tier4':
      return ADSENSE_CONFIG.geoTargeting.tier4.cpmRange
    default:
      return '$0.50-2'
  }
}

/**
 * Get country name from code
 */
export function getCountryName(countryCode: string | null): string {
  if (!countryCode) return 'Global'

  const countryNames: Record<string, string> = {
    // Tier 1
    US: 'United States',
    CA: 'Canada',
    GB: 'United Kingdom',
    AU: 'Australia',
    NZ: 'New Zealand',
    IE: 'Ireland',
    // Tier 2
    DE: 'Germany',
    NL: 'Netherlands',
    CH: 'Switzerland',
    AT: 'Austria',
    SE: 'Sweden',
    NO: 'Norway',
    DK: 'Denmark',
    FI: 'Finland',
    // Tier 3
    FR: 'France',
    ES: 'Spain',
    IT: 'Italy',
    BE: 'Belgium',
    SG: 'Singapore',
    HK: 'Hong Kong',
    JP: 'Japan',
    KR: 'Korea',
    // Tier 4
    IN: 'India',
    BR: 'Brazil',
    MX: 'Mexico',
    ZA: 'South Africa',
    PH: 'Philippines',
    ID: 'Indonesia',
    TH: 'Thailand',
    VN: 'Vietnam',
  }

  return countryNames[countryCode] || countryCode
}

/**
 * Get geolocation info for user
 */
export function getGeoLocation(countryCode: string | null): GeoLocation {
  const tier = getCountryTier(countryCode)
  const countryName = getCountryName(countryCode)
  const cpmEstimate = getCpmEstimate(tier)
  const isHighValue = tier === 'tier1' || tier === 'tier2'

  return {
    country: countryCode || 'UNKNOWN',
    countryName,
    region: tier,
    tier,
    cpmEstimate,
    isHighValue,
  }
}

/**
 * Track geo performance for analytics
 */
export function trackGeoPerformance(
  countryCode: string | null,
  tier: string,
  adSlotId: string,
  adClicked: boolean
) {
  if (typeof window === 'undefined') return

  // Send to analytics
  try {
    if (window.gtag) {
      window.gtag('event', 'ad_impression_geo', {
        country_code: countryCode || 'UNKNOWN',
        country_tier: tier,
        ad_slot: adSlotId,
        clicked: adClicked,
        timestamp: new Date().toISOString(),
      })
    }
  } catch (error) {
    console.error('[Geo] Analytics tracking error:', error)
  }
}

/**
 * Determine ad frequency based on tier
 * High-value regions get more ads
 */
export function getAdFrequency(tier: string): number {
  switch (tier) {
    case 'tier1':
      return 1 // Show ad more frequently
    case 'tier2':
      return 1
    case 'tier3':
      return 0.8 // Show slightly less
    case 'tier4':
      return 0.6 // Show less frequently
    default:
      return 0.5
  }
}

declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void
  }
}
