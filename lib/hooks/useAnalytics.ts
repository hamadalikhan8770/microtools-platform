'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { pageView } from '@/lib/ga4'

export function useAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return

    const title = document.title || 'MicroTools'
    pageView(pathname, title)
  }, [pathname])
}
