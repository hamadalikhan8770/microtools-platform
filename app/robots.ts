import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/private'],
      },
    ],
    sitemap: 'https://microtools.io/sitemap.xml',
    host: 'https://microtools.io',
  }
}
