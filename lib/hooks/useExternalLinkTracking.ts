'use client'

import { useEffect } from 'react'
import { trackExternalLinkClick } from '@/lib/ga4'

export function useExternalLinkTracking() {
  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const link = target.closest('a')

      if (!link) return

      const href = link.getAttribute('href')
      if (!href) return

      const isExternal =
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('//')

      if (!isExternal) return

      try {
        const url = new URL(href, window.location.origin)
        const isOwnDomain = url.hostname === window.location.hostname

        if (!isOwnDomain) {
          const domain = url.hostname || 'unknown'
          trackExternalLinkClick(href, domain)
        }
      } catch {
        trackExternalLinkClick(href, 'invalid-url')
      }
    }

    document.addEventListener('click', handleLinkClick, true)
    return () => document.removeEventListener('click', handleLinkClick, true)
  }, [])
}
