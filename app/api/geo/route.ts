/**
 * Geo-Detection API Endpoint
 * Returns user's country and geo-tier based on IP
 * Works with Vercel, Cloudflare, and other platforms
 */

import { getCountryFromHeaders, getCountryTier, getGeoLocation } from '@/lib/geo-targeting'

export async function GET(request: Request) {
  try {
    const headers: Record<string, string> = {}

    // Extract headers from request
    request.headers.forEach((value, key) => {
      headers[key.toLowerCase()] = value
    })

    // Get country code from various sources
    const countryCode = getCountryFromHeaders(headers)

    if (!countryCode) {
      return Response.json(
        {
          country: 'UNKNOWN',
          tier: 'global',
          countryName: 'Unknown',
          cpmEstimate: '$0.50-2',
          isHighValue: false,
        },
        {
          headers: {
            'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
          },
        }
      )
    }

    // Get geo location info
    const geoInfo = getGeoLocation(countryCode)

    return Response.json(geoInfo, {
      headers: {
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('[API/Geo] Error:', error)

    return Response.json(
      {
        error: 'Unable to determine location',
        tier: 'global',
      },
      { status: 500 }
    )
  }
}
