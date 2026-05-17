/**
 * Google Analytics 4 Integration Module
 * Production-grade GA4 tracking with deduplication, error handling, and debug support
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || ''

const DEBUG = process.env.NODE_ENV === 'development'
const eventDeduplicationMap = new Map<string, number>()
const DEDUP_WINDOW_MS = 100

function shouldTrackEvent(eventKey: string): boolean {
  const now = Date.now()
  const lastTime = eventDeduplicationMap.get(eventKey)

  if (lastTime && now - lastTime < DEDUP_WINDOW_MS) {
    if (DEBUG) console.log(`[GA4] Dropped duplicate event: ${eventKey}`)
    return false
  }

  eventDeduplicationMap.set(eventKey, now)
  return true
}

function isGAEnabled(): boolean {
  if (typeof window === 'undefined') return false
  if (!GA_MEASUREMENT_ID) {
    if (DEBUG) console.warn('[GA4] GA_MEASUREMENT_ID not configured')
    return false
  }
  if (!window.gtag) {
    if (DEBUG) console.warn('[GA4] gtag not available')
    return false
  }
  return true
}

export function pageView(url: string, title: string) {
  try {
    if (!isGAEnabled()) return

    const eventKey = `pageView_${url}`
    if (!shouldTrackEvent(eventKey)) return

    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: title,
    })

    if (DEBUG) console.log('[GA4] pageView:', { url, title })
  } catch (error) {
    if (DEBUG) console.error('[GA4] pageView error:', error)
  }
}

export function trackEvent(
  eventName: string,
  eventData?: Record<string, string | number | boolean>
) {
  try {
    if (!isGAEnabled()) return

    const eventKey = `${eventName}_${JSON.stringify(eventData || {})}`
    if (!shouldTrackEvent(eventKey)) return

    window.gtag('event', eventName, {
      ...eventData,
    })

    if (DEBUG) console.log('[GA4] trackEvent:', { eventName, eventData })
  } catch (error) {
    if (DEBUG) console.error('[GA4] trackEvent error:', error)
  }
}

export function trackToolUsage(toolName: string, category: string, inputCount?: number) {
  trackEvent('tool_used', {
    tool_name: toolName,
    tool_category: category,
    input_count: inputCount || 0,
  })
}

export function trackToolCalculation(toolName: string, category: string, resultType: string) {
  trackEvent('tool_calculation', {
    tool_name: toolName,
    tool_category: category,
    result_type: resultType,
  })
}

export function trackClick(elementLabel: string, elementType: string = 'button', location?: string) {
  trackEvent('element_click', {
    element_label: elementLabel,
    element_type: elementType,
    location: location || 'unknown',
  })
}

export function trackFormSubmission(formName: string, formType: string = 'contact') {
  trackEvent('form_submission', {
    form_name: formName,
    form_type: formType,
  })
}

export function trackNavigation(source: string, destination: string) {
  trackEvent('navigation', {
    source_page: source,
    destination_page: destination,
  })
}

export function trackSearch(searchQuery: string, resultCount: number) {
  trackEvent('search', {
    search_query: searchQuery,
    result_count: resultCount,
  })
}

export function trackBlogView(postTitle: string, postCategory: string) {
  trackEvent('blog_view', {
    post_title: postTitle,
    post_category: postCategory,
  })
}

export function trackScrollDepth(scrollPercentage: number, pageTitle: string) {
  trackEvent('scroll_depth', {
    scroll_percentage: scrollPercentage,
    page_title: pageTitle,
  })
}

export function trackExternalLinkClick(url: string, domain: string) {
  trackEvent('external_link_click', {
    link_url: url,
    link_domain: domain,
  })
}

export function trackError(errorMessage: string, errorCode?: string, location?: string) {
  trackEvent('error', {
    error_message: errorMessage,
    error_code: errorCode || 'unknown',
    location: location || 'unknown',
  })
}

export function trackEngagement(engagementType: string, duration?: number) {
  trackEvent('user_engagement', {
    engagement_type: engagementType,
    duration_seconds: duration || 0,
  })
}

export function setUserConsent(consentGranted: boolean) {
  try {
    if (typeof window === 'undefined' || !window.gtag) return

    window.gtag('consent', 'update', {
      analytics_storage: consentGranted ? 'granted' : 'denied',
      ad_storage: consentGranted ? 'granted' : 'denied',
      ad_user_data: consentGranted ? 'granted' : 'denied',
      ad_personalization: consentGranted ? 'granted' : 'denied',
    })

    if (DEBUG) console.log('[GA4] User consent updated:', consentGranted)
  } catch (error) {
    if (DEBUG) console.error('[GA4] setUserConsent error:', error)
  }
}

declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void
  }
}
