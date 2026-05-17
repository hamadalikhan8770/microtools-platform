'use client'

import { useState, useEffect } from 'react'
import { setUserConsent } from '@/lib/ga4'

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const hasConsent = localStorage.getItem('cookie-consent')
    if (!hasConsent) {
      setShowConsent(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setUserConsent(true)
    setShowConsent(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setUserConsent(false)
    setShowConsent(false)
  }

  if (!mounted || !showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-4 z-50 max-h-40 overflow-y-auto">
      <div className="container mx-auto max-w-4xl px-4 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-sm text-slate-300 flex-1">
            <p className="mb-2">
              We use cookies and similar technologies to enhance your experience, analyze traffic, and for advertising purposes. By accepting, you consent to our use of cookies.
            </p>
            <a href="/privacy" className="text-blue-400 hover:text-blue-300 underline text-xs">
              Privacy Policy
            </a>
          </div>
          <div className="flex gap-3 flex-shrink-0 w-full sm:w-auto">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800 rounded hover:bg-slate-700 transition-colors"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
