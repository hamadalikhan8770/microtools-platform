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
    sitemap: 'https://www.microtoolshub.org/sitemap.xml',
    host: 'https://www.microtoolshub.org',
  }
}
