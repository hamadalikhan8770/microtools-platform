type SchemaType = Record<string, any>

export function generateOrganizationSchema(): SchemaType {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MicroTools',
    url: 'https://www.microtoolshub.org',
    logo: 'https://www.microtoolshub.org/logo.png',
    description: 'Complete suite of free online tools for health, finance, SEO, and development.',
    sameAs: [
      'https://twitter.com/microtools',
      'https://github.com/microtools',
      'https://linkedin.com/company/microtools',
    ],
  }
}

export function generateWebsiteSchema(): SchemaType {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MicroTools',
    url: 'https://www.microtoolshub.org',
    description: 'Free online tools for various calculations and conversions',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.microtoolshub.org?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateToolSchema(
  tool: {
    name: string
    description: string
    slug: string
    category: string
    shortDescription: string
  }
): SchemaType {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: 'Utility',
    url: `https://www.microtoolshub.org/tools/${tool.category}/${tool.slug}`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]): SchemaType {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateFAQSchema(
  faqs: { q: string; a: string }[]
): SchemaType {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }
}

export function generateArticleSchema(article: {
  title: string
  description: string
  content: string
  publishedDate: string
  modifiedDate: string
  author?: string
  image?: string
}): SchemaType {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    image: article.image || 'https://www.microtoolshub.org/og-image.png',
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate,
    author: {
      '@type': 'Organization',
      name: article.author || 'MicroTools',
    },
    publisher: {
      '@type': 'Organization',
      name: 'MicroTools',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.microtoolshub.org/logo.png',
      },
    },
  }
}
