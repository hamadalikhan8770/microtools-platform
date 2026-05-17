'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { useExternalLinkTracking } from '@/lib/hooks/useExternalLinkTracking'

function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useExternalLinkTracking()
  return <>{children}</>
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AnalyticsProvider>
        <Header />
        <main className="min-h-[calc(100vh-8rem)]">
          {children}
        </main>
        <Footer />
      </AnalyticsProvider>
    </ThemeProvider>
  )
}
