import { Metadata } from 'next'
import { ToolCard } from '@/components/tools/tool-card'
import { getToolsByCategory, getCategory, categories } from '@/lib/tools'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params
  const category = getCategory(categorySlug)
  if (!category) return { title: 'Not Found' }

  return {
    title: `${category.name} Tools - MicroTools`,
    description: `Free ${category.name.toLowerCase()} tools and calculators. Simple, fast, and accurate.`,
    openGraph: {
      title: `${category.name} Tools - MicroTools`,
      description: `Free ${category.name.toLowerCase()} tools and calculators.`,
      url: `https://microtools.io/tools/${categorySlug}`,
    },
  }
}

export async function generateStaticParams() {
  return categories.map(cat => ({
    category: cat.slug,
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params
  const category = getCategory(categorySlug)
  const tools = getToolsByCategory(categorySlug)

  if (!category || tools.length === 0) {
    notFound()
  }

  const toolsMetadata = tools.map(({ calculate, ...tool }) => tool)

  return (
    <div className="container mx-auto max-w-7xl px-4 py-16">
      <div className="mb-12">
        <div className="text-6xl mb-4">{category.icon}</div>
        <h1 className="text-4xl font-bold mb-4">{category.name} Tools</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          {tools.length} free {category.name.toLowerCase()} tools to help you calculate, convert, and optimize.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {toolsMetadata.map(tool => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  )
}
