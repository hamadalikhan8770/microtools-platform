/**
 * Google Analytics 4 Integration Module
 * Production-ready GA4 tracking with event handling
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || ''

// Page view tracking
export function pageView(url: string, title: string) {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title,
  })
}

// Generic event tracking
export function trackEvent(
  eventName: string,
  eventData?: Record<string, string | number | boolean>
) {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', eventName, {
    ...eventData,
  })
}

// Tool-specific tracking
export function trackToolUsage(toolName: string, category: string, inputCount?: number) {
  trackEvent('tool_used', {
    tool_name: toolName,
    tool_category: category,
    input_count: inputCount || 0,
  })
}

// Tool calculation result tracking
export function trackToolCalculation(toolName: string, category: string, resultType: string) {
  trackEvent('tool_calculation', {
    tool_name: toolName,
    tool_category: category,
    result_type: resultType,
  })
}

// Button/Link click tracking
export function trackClick(elementLabel: string, elementType: string = 'button', location?: string) {
  trackEvent('element_click', {
    element_label: elementLabel,
    element_type: elementType,
    location: location || 'unknown',
  })
}

// Form submission tracking
export function trackFormSubmission(formName: string, formType: string = 'contact') {
  trackEvent('form_submission', {
    form_name: formName,
    form_type: formType,
  })
}

// Navigation tracking
export function trackNavigation(source: string, destination: string) {
  trackEvent('navigation', {
    source_page: source,
    destination_page: destination,
  })
}

// Search/filter tracking
export function trackSearch(searchQuery: string, resultCount: number) {
  trackEvent('search', {
    search_query: searchQuery,
    result_count: resultCount,
  })
}

// Blog view tracking
export function trackBlogView(postTitle: string, postCategory: string) {
  trackEvent('blog_view', {
    post_title: postTitle,
    post_category: postCategory,
  })
}

// Scroll depth tracking
export function trackScrollDepth(scrollPercentage: number, pageTitle: string) {
  trackEvent('scroll_depth', {
    scroll_percentage: scrollPercentage,
    page_title: pageTitle,
  })
}

// External link click tracking
export function trackExternalLinkClick(url: string, domain: string) {
  trackEvent('external_link_click', {
    link_url: url,
    link_domain: domain,
  })
}

// Error tracking
export function trackError(errorMessage: string, errorCode?: string, location?: string) {
  trackEvent('error', {
    error_message: errorMessage,
    error_code: errorCode || 'unknown',
    location: location || 'unknown',
  })
}

// User engagement tracking
export function trackEngagement(engagementType: string, duration?: number) {
  trackEvent('user_engagement', {
    engagement_type: engagementType,
    duration_seconds: duration || 0,
  })
}

// Declare gtag global type
declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void
  }
}
