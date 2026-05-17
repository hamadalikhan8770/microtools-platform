'use client'

import { useEffect } from 'react'
import { setupGA4DebugHelper } from '@/lib/ga4-debug'

export function GA4DebugInitializer() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setupGA4DebugHelper()
    }
  }, [])

  return null
}
