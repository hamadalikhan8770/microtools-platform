import { ToolResult, ToolInput } from '@/types/tool'

export const seoToolCalculations = {
  metaTagGenerator: {
    inputs: [
      { name: 'title', type: 'text', label: 'Page Title', placeholder: 'e.g., Best Health Tools Online', required: true },
      { name: 'description', type: 'text', label: 'Description', placeholder: 'e.g., Free online health calculators...', required: true },
      { name: 'keywords', type: 'text', label: 'Keywords (comma-separated)', placeholder: 'e.g., bmi, health, calculator', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      return {
        outputs: [
          { label: 'Title Length', value: inputs.title.length.toString(), unit: 'characters' },
          { label: 'Description Length', value: inputs.description.length.toString(), unit: 'characters' },
          { label: 'Keywords Count', value: inputs.keywords.split(',').length.toString() },
        ],
        details: [
          {
            title: 'Meta Tags HTML',
            content: `<title>${inputs.title}</title>\n<meta name="description" content="${inputs.description}">\n<meta name="keywords" content="${inputs.keywords}">`,
          },
        ],
        tips: [
          'Title should be 50-60 characters',
          'Description should be 150-160 characters',
          'Use 4-6 relevant keywords',
        ],
      }
    },
  },

  slugGenerator: {
    inputs: [
      { name: 'text', type: 'text', label: 'Text to convert', placeholder: 'e.g., Best BMI Calculator Online', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const slug = inputs.text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')

      return {
        outputs: [
          { label: 'Generated Slug', value: slug },
          { label: 'Length', value: slug.length.toString() },
        ],
        tips: [
          'Slugs should be lowercase',
          'Use hyphens between words',
          'Keep slugs concise and descriptive',
        ],
      }
    },
  },

  wordCounter: {
    inputs: [
      { name: 'text', type: 'text', label: 'Text', placeholder: 'Paste your text here...', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const text = inputs.text as string
      const words = text.trim().split(/\s+/).filter((w: string) => w.length > 0).length
      const characters = text.length
      const charactersNoSpaces = text.replace(/\s/g, '').length
      const sentences = text.split(/[.!?]+/).filter((s: string) => s.trim().length > 0).length
      const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0).length

      return {
        outputs: [
          { label: 'Words', value: words.toString() },
          { label: 'Characters', value: characters.toString() },
          { label: 'Characters (no spaces)', value: charactersNoSpaces.toString() },
          { label: 'Sentences', value: sentences.toString() },
          { label: 'Paragraphs', value: paragraphs.toString() },
        ],
        tips: [
          'Average reading speed is 200 words per minute',
          `Reading time: ${Math.ceil(words / 200)} minutes`,
        ],
      }
    },
  },

  characterCounter: {
    inputs: [
      { name: 'text', type: 'text', label: 'Text', placeholder: 'Enter your text...', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const text = inputs.text as string
      const characters = text.length
      const charactersNoSpaces = text.replace(/\s/g, '').length
      const spaces = text.length - charactersNoSpaces
      const letters = text.replace(/[^a-zA-Z]/g, '').length
      const numbers = text.replace(/[^0-9]/g, '').length

      return {
        outputs: [
          { label: 'Total Characters', value: characters.toString() },
          { label: 'Characters (no spaces)', value: charactersNoSpaces.toString() },
          { label: 'Spaces', value: spaces.toString() },
          { label: 'Letters', value: letters.toString() },
          { label: 'Numbers', value: numbers.toString() },
        ],
      }
    },
  },

  robotstxtGenerator: {
    inputs: [
      { name: 'disallowPaths', type: 'text', label: 'Disallow paths (comma-separated)', placeholder: '/admin, /private', required: false },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      let robotsTxt = 'User-agent: *\nAllow: /\n'

      if (inputs.disallowPaths) {
        const paths = inputs.disallowPaths.split(',').map((p: string) => p.trim())
        paths.forEach((path: string) => {
          robotsTxt += `Disallow: ${path}\n`
        })
      }

      robotsTxt += '\nSitemap: https://example.com/sitemap.xml'

      return {
        outputs: [
          { label: 'Lines', value: robotsTxt.split('\n').length.toString() },
        ],
        details: [
          {
            title: 'robots.txt Content',
            content: robotsTxt,
          },
        ],
        tips: [
          'Place robots.txt in website root',
          'Specify sitemap URL',
          'Use Disallow judiciously',
        ],
      }
    },
  },

  xmlSitemapGenerator: {
    inputs: [
      { name: 'domain', type: 'text', label: 'Domain', placeholder: 'https://example.com', required: true },
      { name: 'pageCount', type: 'number', label: 'Number of pages', placeholder: 'e.g., 50', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const domain = inputs.domain.replace(/\/$/, '')
      const pageCount = parseFloat(inputs.pageCount)

      let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

      for (let i = 0; i < Math.min(pageCount, 50000); i++) {
        sitemap += `  <url>\n    <loc>${domain}/page-${i + 1}</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n    <priority>0.8</priority>\n  </url>\n`
      }

      sitemap += '</urlset>'

      return {
        outputs: [
          { label: 'URLs in sitemap', value: Math.min(pageCount, 50000).toString() },
          { label: 'Domain', value: domain },
        ],
        details: [
          {
            title: 'Sitemap XML (first 5 entries)',
            content: sitemap.split('\n').slice(0, 20).join('\n') + '\n  ...',
          },
        ],
        tips: [
          'XML Sitemap helps search engines discover pages',
          'Max 50,000 URLs per file',
          'Submit to Google Search Console',
        ],
      }
    },
  },

  keywordDensity: {
    inputs: [
      { name: 'text', type: 'text', label: 'Text', placeholder: 'Paste your content...', required: true },
      { name: 'keyword', type: 'text', label: 'Keyword to analyze', placeholder: 'e.g., health', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const text = inputs.text.toLowerCase()
      const keyword = inputs.keyword.toLowerCase()
      const words = text.split(/\s+/).filter(w => w.length > 0)
      const keywordCount = words.filter(w => w === keyword).length
      const density = (keywordCount / words.length) * 100

      return {
        outputs: [
          { label: 'Keyword', value: keyword },
          { label: 'Occurrences', value: keywordCount.toString() },
          { label: 'Total Words', value: words.length.toString() },
          { label: 'Keyword Density', value: density.toFixed(2), unit: '%' },
        ],
        tips: [
          'Ideal keyword density is 1-2%',
          'Avoid keyword stuffing',
          'Use related keywords naturally',
        ],
      }
    },
  },

  seoTitleAnalyzer: {
    inputs: [
      { name: 'title', type: 'text', label: 'Page Title', placeholder: 'Enter your title...', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const title = inputs.title
      const length = title.length
      let score = 0
      let feedback: string[] = []

      if (length >= 50 && length <= 60) {
        score += 40
        feedback.push('✓ Title length is optimal (50-60 characters)')
      } else if (length > 0) {
        feedback.push(`✗ Title length is ${length} characters (ideal: 50-60)`)
      }

      if (title.includes('|') || title.includes('-')) {
        score += 20
        feedback.push('✓ Title uses good separators')
      }

      const words = title.split(' ').length
      if (words >= 4 && words <= 8) {
        score += 20
        feedback.push('✓ Title word count is good')
      }

      if (/[A-Z]/.test(title)) {
        score += 10
        feedback.push('✓ Title uses proper capitalization')
      }

      if (/[0-9]/.test(title)) {
        score += 10
        feedback.push('✓ Title includes numbers (attracts clicks)')
      }

      return {
        outputs: [
          { label: 'Title Length', value: length.toString(), unit: 'characters' },
          { label: 'Word Count', value: words.toString() },
          { label: 'SEO Score', value: score.toString(), unit: '/100' },
        ],
        details: [
          {
            title: 'Feedback',
            content: feedback.join('\n'),
          },
        ],
      }
    },
  },

  openGraphGenerator: {
    inputs: [
      { name: 'title', type: 'text', label: 'Title', placeholder: 'Page title', required: true },
      { name: 'description', type: 'text', label: 'Description', placeholder: 'Page description', required: true },
      { name: 'image', type: 'text', label: 'Image URL', placeholder: 'https://example.com/image.jpg', required: true },
      { name: 'url', type: 'text', label: 'Page URL', placeholder: 'https://example.com/page', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const og = `<meta property="og:title" content="${inputs.title}">\n<meta property="og:description" content="${inputs.description}">\n<meta property="og:image" content="${inputs.image}">\n<meta property="og:url" content="${inputs.url}">\n<meta property="og:type" content="website">\n\n<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="${inputs.title}">\n<meta name="twitter:description" content="${inputs.description}">\n<meta name="twitter:image" content="${inputs.image}">`

      return {
        outputs: [
          { label: 'Title', value: inputs.title },
          { label: 'Description', value: inputs.description },
        ],
        details: [
          {
            title: 'Open Graph & Twitter Tags',
            content: og,
          },
        ],
        tips: [
          'Use 1200x630px images for best display',
          'Keep description under 160 characters',
          'Test with social media debuggers',
        ],
      }
    },
  },

  readabilityChecker: {
    inputs: [
      { name: 'text', type: 'text', label: 'Text', placeholder: 'Paste your content...', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const text = inputs.text
      const words = text.split(/\s+/).filter(w => w.length > 0).length
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
      const avgWordLength = text.replace(/\s/g, '').length / words
      const avgSentenceLength = words / sentences

      const fleschKincaidScore = 0.39 * avgSentenceLength + 11.8 * (avgWordLength / 5) - 15.59

      let readability = 'Hard to read'
      if (fleschKincaidScore < 6) readability = 'Very easy'
      else if (fleschKincaidScore < 9) readability = 'Easy'
      else if (fleschKincaidScore < 12) readability = 'Moderate'
      else if (fleschKincaidScore < 14) readability = 'Fairly difficult'
      else readability = 'Difficult'

      return {
        outputs: [
          { label: 'Readability Grade', value: fleschKincaidScore.toFixed(1), unit: 'grade level' },
          { label: 'Readability', value: readability },
          { label: 'Reading Time', value: Math.ceil(words / 200).toString(), unit: 'minutes' },
        ],
        tips: [
          'Use shorter sentences for better readability',
          'Use simpler words where possible',
          'Break content into paragraphs',
        ],
      }
    },
  },
}
