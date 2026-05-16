'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Header />
      <main className="min-h-[calc(100vh-8rem)]">
        {children}
      </main>
      <Footer />
    </ThemeProvider>
  )
}
