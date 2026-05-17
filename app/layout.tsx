import type { Metadata } from 'next'
import { Providers } from '@/components/layout/providers'
import { GA4DebugInitializer } from '@/components/analytics/GA4DebugInitializer'
import { CookieConsent } from '@/components/common/CookieConsent'
import '@/styles/globals.css'
import Script from 'next/script'
import { GA_MEASUREMENT_ID } from '@/lib/ga4'
import { ADSENSE_CONFIG } from '@/lib/adsense'

export const metadata: Metadata = {
  title: 'MicroTools - Free Online Tools Suite',
  description: 'Complete suite of free online tools for health, finance, SEO, and development. 60+ calculators and converters.',
  metadataBase: new URL('https://www.microtoolshub.org'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.microtoolshub.org',
    title: 'MicroTools - Free Online Tools Suite',
    description: 'Complete suite of free online tools for health, finance, SEO, and development.',
    images: [
      {
        url: 'https://www.microtoolshub.org/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MicroTools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MicroTools - Free Online Tools Suite',
    description: 'Complete suite of free online tools for health, finance, SEO, and development.',
    images: ['https://www.microtoolshub.org/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://www.microtoolshub.org" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        {/* Google Analytics 4 - Consent default and initialization */}
        <Script
          id="ga4-consent-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
              });
            `,
          }}
        />

        {/* Google Analytics 4 - Main tracking */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              async
            />
            <Script
              id="google-analytics-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  function gtag(){window.dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                    page_title: document.title,
                    anonymize_ip: true,
                    allow_google_signals: true,
                    allow_ad_personalization_signals: true,
                  });
                  gtag('consent', 'update', {
                    analytics_storage: 'granted',
                    ad_storage: 'granted',
                    ad_user_data: 'granted',
                    ad_personalization: 'granted',
                  });
                `,
              }}
            />
          </>
        )}

        {/* Google AdSense */}
        {ADSENSE_CONFIG.publisherId && (
          <Script
            strategy="afterInteractive"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CONFIG.publisherId}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body>
        <GA4DebugInitializer />
        <Providers>{children}</Providers>
        <CookieConsent />
      </body>
    </html>
  )
}
