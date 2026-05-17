'use client'

import { useEffect, useState } from 'react'
import { ADSENSE_CONFIG, isAdSenseConfigured } from '@/lib/adsense'
import { getCountryFromHeaders, getGeoLocation, trackGeoPerformance, getAdFrequency } from '@/lib/geo-targeting'

interface AdUnitProps {
  slotId?: string
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle'
  responsive?: boolean
  className?: string
  minHeight?: string
}

export function AdUnit({
  slotId = '1234567890',
  format = 'auto',
  responsive = true,
  className = '',
  minHeight = '100px',
}: AdUnitProps) {
  const [shouldShow, setShouldShow] = useState(true)
  const [geoTier, setGeoTier] = useState<string>('global')

  useEffect(() => {
    if (!isAdSenseConfigured()) {
      setShouldShow(false)
      return
    }

    // Get user's country from headers (via API)
    try {
      fetch('/api/geo')
        .then(res => res.json())
        .then(data => {
          const tier = data.tier || 'global'
          setGeoTier(tier)

          // Determine ad frequency based on geo tier
          const frequency = getAdFrequency(tier)
          if (Math.random() > frequency) {
            setShouldShow(false)
            return
          }

          // Track geo performance
          trackGeoPerformance(data.country || 'UNKNOWN', tier, slotId, false)

          // Load ad
          try {
            ;(window.adsbygoogle = window.adsbygoogle || []).push({})
          } catch (error) {
            console.error('[AdSense] Error loading ad unit:', error)
          }
        })
        .catch(() => {
          // Fallback: load ad anyway
          try {
            ;(window.adsbygoogle = window.adsbygoogle || []).push({})
          } catch (error) {
            console.error('[AdSense] Error loading ad unit:', error)
          }
        })
    } catch (error) {
      console.error('[AdUnit] Geo-targeting error:', error)
    }
  }, [slotId])

  if (!isAdSenseConfigured() || !shouldShow) {
    return null
  }

  const publisherId = ADSENSE_CONFIG.publisherId

  return (
    <div className={`ad-container ${className}`} style={{ minHeight }}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
        }}
        data-ad-client={publisherId}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive}
        data-ad-region={geoTier}
      />
    </div>
  )
}

declare global {
  interface Window {
    adsbygoogle?: any[]
  }
}
