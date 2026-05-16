'use client'

import { useEffect } from 'react'

interface AdUnitProps {
  slotId: string
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle'
  responsive?: boolean
  className?: string
}

export function AdUnit({ slotId, format = 'auto', responsive = true, className = '' }: AdUnitProps) {
  useEffect(() => {
    // Load Google AdSense script if not already loaded
    if (typeof window !== 'undefined' && !window.adsbygoogle) {
      const script = document.createElement('script')
      script.async = true
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxxxxxx'
      script.onload = () => {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      }
      document.head.appendChild(script)
    } else if (window.adsbygoogle) {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    }
  }, [])

  return (
    <div className={`ad-unit ${className}`}>
      <ins
        className="adsbygoogle"
        style={{
          display: responsive ? 'block' : 'inline-block',
          textAlign: 'center',
        }}
        data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  )
}

declare global {
  interface Window {
    adsbygoogle: any
  }
}
