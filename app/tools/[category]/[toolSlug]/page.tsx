import { getTool, getCategory } from '@/lib/tools'
import { ToolPageClientWrapper } from '@/components/tools/tool-page-client-wrapper'
import { SchemaMarkup } from '@/components/common/SchemaMarkup'
import { generateToolSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo/schema'

export const dynamic = 'force-dynamic'

interface ToolPageProps {
  params: Promise<{
    category: string
    toolSlug: string
  }>
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { category: categorySlug, toolSlug } = await params
  const tool = getTool(toolSlug)
  const category = getCategory(categorySlug)

  if (!tool || !category) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <h1 className="text-4xl font-bold">Tool Not Found</h1>
      </div>
    )
  }

  const { calculate, ...toolMetadata } = tool

  const toolSchema = generateToolSchema(toolMetadata)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.microtoolshub.org' },
    { name: category.name, url: `https://www.microtoolshub.org/tools/${category.slug}` },
    { name: tool.name, url: `https://www.microtoolshub.org/tools/${category.slug}/${tool.slug}` },
  ])
  const faqSchema = tool.faqs && tool.faqs.length > 0 ? generateFAQSchema(tool.faqs) : null

  return (
    <>
      <SchemaMarkup schema={toolSchema} />
      <SchemaMarkup schema={breadcrumbSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}
      <ToolPageClientWrapper tool={toolMetadata} category={category} toolSlug={toolSlug} />
    </>
  )
}
