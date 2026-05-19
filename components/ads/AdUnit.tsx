'use client'

import { useEffect, useState } from 'react'
import { ADSENSE_CONFIG, isAdSenseConfigured } from '@/lib/adsense'
import { trackGeoPerformance } from '@/lib/geo-targeting'

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

  useEffect(() => {
    if (!isAdSenseConfigured()) {
      setShouldShow(false)
      return
    }

    // Get user's country and load ad
    fetch('/api/geo')
      .then(res => res.json())
      .then(data => {
        const tier = data.tier || 'global'

        // Track geo performance
        trackGeoPerformance(data.country || 'UNKNOWN', tier, slotId, false)

        // Load ad
        if (window.adsbygoogle) {
          window.adsbygoogle.push({})
        }
      })
      .catch(() => {
        // Fallback: still try to load ad
        if (window.adsbygoogle) {
          window.adsbygoogle.push({})
        }
      })
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
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  )
}

declare global {
  interface Window {
    adsbygoogle?: any[]
  }
}
