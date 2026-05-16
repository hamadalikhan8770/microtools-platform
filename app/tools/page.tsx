import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'All Tools - MicroTools',
  description: 'Browse all 60+ free online tools for health, finance, converters, SEO, and development.',
}

export default function ToolsPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">All Tools</h1>
      <p className="text-muted-foreground mb-12">
        Coming soon. Browse tools by category from the navigation menu above.
      </p>
    </div>
  )
}
