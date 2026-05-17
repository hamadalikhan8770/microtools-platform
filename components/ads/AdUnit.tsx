'use client'

import { useEffect } from 'react'
import { ADSENSE_CONFIG, isAdSenseConfigured } from '@/lib/adsense'

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
  useEffect(() => {
    if (!isAdSenseConfigured()) {
      return
    }

    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (error) {
      console.error('[AdSense] Error loading ad unit:', error)
    }
  }, [])

  if (!isAdSenseConfigured()) {
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
      />
    </div>
  )
}

declare global {
  interface Window {
    adsbygoogle?: any[]
  }
}
