/**
 * GA4 Debug Helper Utilities
 * Use in browser console to inspect and test analytics
 */

export function setupGA4DebugHelper() {
  if (typeof window === 'undefined') return

  ;(window as any).__GA4_DEBUG__ = {
    checkGtag: () => {
      const hasGtag = !!(window as any).gtag
      console.log(`[GA4] gtag available: ${hasGtag}`)
      if (hasGtag) {
        console.log('[GA4] gtag function:', (window as any).gtag.toString())
      }
      return hasGtag
    },

    getMeasurementId: () => {
      const id = process.env.NEXT_PUBLIC_GA_ID || ''
      console.log(`[GA4] Measurement ID: ${id || 'NOT CONFIGURED'}`)
      return id
    },

    fireTestEvent: (eventName = 'test_event', eventData = {}) => {
      if (!(window as any).gtag) {
        console.error('[GA4] gtag not available')
        return
      }
      console.log(`[GA4] Firing test event: ${eventName}`, eventData)
      ;(window as any).gtag('event', eventName, eventData)
    },

    checkScriptLoaded: () => {
      const scripts = Array.from(document.querySelectorAll('script'))
      const gtagScript = scripts.find(s => s.src.includes('googletagmanager'))
      if (gtagScript) {
        console.log('[GA4] gtag.js script loaded:', gtagScript.src)
        return true
      } else {
        console.warn('[GA4] gtag.js script not found')
        return false
      }
    },

    inspectDataLayer: () => {
      if (!(window as any).dataLayer) {
        console.warn('[GA4] dataLayer not found')
        return
      }
      console.log('[GA4] dataLayer contents:', (window as any).dataLayer)
      return (window as any).dataLayer
    },

    verifyTracking: () => {
      const results = {
        gtag: !!(window as any).gtag,
        scriptLoaded: !!document.querySelector('script[src*="googletagmanager"]'),
        measurementId: process.env.NEXT_PUBLIC_GA_ID ? 'configured' : 'missing',
        dataLayer: !!(window as any).dataLayer,
      }
      console.table(results)
      return results
    },

    help: () => {
      console.log(`
╔════════════════════════════════════════════════════════════════╗
║              GA4 Debug Helper - Available Commands             ║
╚════════════════════════════════════════════════════════════════╝

window.__GA4_DEBUG__.checkGtag()
  → Check if gtag function is available

window.__GA4_DEBUG__.getMeasurementId()
  → Get configured Measurement ID

window.__GA4_DEBUG__.fireTestEvent(eventName, eventData)
  → Fire a test event to GA4
  → Example: fireTestEvent('test_click', {value: 123})

window.__GA4_DEBUG__.checkScriptLoaded()
  → Verify gtag.js script is loaded

window.__GA4_DEBUG__.inspectDataLayer()
  → View all dataLayer events

window.__GA4_DEBUG__.verifyTracking()
  → Run full verification check

window.__GA4_DEBUG__.help()
  → Show this help message
      `)
    },
  }

  console.log('[GA4] Debug helper initialized. Type: window.__GA4_DEBUG__.help()')
}
