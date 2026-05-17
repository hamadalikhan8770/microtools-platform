'use client'

import { useEffect } from 'react'
import { trackScrollDepth } from '@/lib/ga4'

const SCROLL_THRESHOLDS = [25, 50, 75, 100]

export function useScrollDepth() {
  useEffect(() => {
    const trackedThresholds = new Set<number>()

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0

      SCROLL_THRESHOLDS.forEach((threshold) => {
        if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
          trackedThresholds.add(threshold)
          trackScrollDepth(scrollPercent, document.title)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
}
