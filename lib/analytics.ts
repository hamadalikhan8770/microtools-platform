export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'

export function trackPageView(path: string, title: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title,
    })
  }
}

export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

export function trackToolUsage(toolName: string, toolCategory: string) {
  trackEvent('use_tool', 'tool_interaction', `${toolCategory}/${toolName}`)
}

export function trackBlogView(postTitle: string) {
  trackEvent('view_blog', 'content', postTitle)
}

declare global {
  interface Window {
    gtag: any
  }
}
