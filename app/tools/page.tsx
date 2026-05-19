import { Metadata } from 'next'
import { ToolCard } from '@/components/tools/tool-card'
import { tools, categories } from '@/lib/tools'
import { SchemaMarkup } from '@/components/common/SchemaMarkup'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'All Tools - MicroTools',
  description: 'Browse all 60+ free online tools for health, finance, converters, SEO, and development. Find the perfect tool for your needs.',
  keywords: 'free online tools, calculators, converters, health tools, finance tools, SEO tools, developer tools',
  openGraph: {
    title: 'All Tools - MicroTools',
    description: 'Browse all 60+ free online tools for your needs',
    url: 'https://www.microtoolshub.org/tools',
    type: 'website',
  },
}

function generateToolsSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'MicroTools - All Tools',
    description: 'Complete collection of 60+ free online tools',
    url: 'https://www.microtoolshub.org/tools',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: tools.map((tool, idx) => ({
        '@type': 'SoftwareApplication',
        position: idx + 1,
        name: tool.name,
        description: tool.description,
        url: `https://www.microtoolshub.org/tools/${tool.category}/${tool.slug}`,
        applicationCategory: 'Utility',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      })),
    },
  }
}

export default function ToolsPage() {
  const toolsSchema = generateToolsSchema()

  // Group tools by category
  const groupedTools = categories.map(category => ({
    ...category,
    tools: tools.filter(tool => tool.category === category.slug)
  }))

  return (
    <>
      <SchemaMarkup schema={toolsSchema} />
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">All Tools</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Explore our complete collection of 60+ free online tools designed to help you with calculations, conversions, optimization, and development tasks.
          </p>
        </div>

        {groupedTools.map(category => (
          <div key={category.id} className="mb-16">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{category.icon}</span>
                <h2 className="text-3xl font-bold">{category.name}</h2>
              </div>
              <p className="text-sm text-muted-foreground/70">{category.tools.length} tools in this category</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.tools.map(tool => {
                const { calculate, ...toolData } = tool
                return <ToolCard key={tool.id} tool={toolData} />
              })}
            </div>
          </div>
        ))}

        <div className="mt-16 p-8 bg-primary/10 border border-primary/30 rounded-2xl">
          <h3 className="text-2xl font-bold text-foreground mb-3">Can't find what you're looking for?</h3>
          <p className="text-muted-foreground mb-6">
            We're constantly adding new tools to MicroTools. If you have a suggestion for a tool you'd like to see, please let us know.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Suggest a Tool
          </a>
        </div>
      </div>
    </>
  )
}
