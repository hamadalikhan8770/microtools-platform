import type { Metadata } from 'next'
import { Providers } from '@/components/layout/providers'
import '@/styles/globals.css'
import Script from 'next/script'

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
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
