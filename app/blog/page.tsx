import { Metadata } from 'next'
import Link from 'next/link'
import { getAllBlogPosts, formatDate } from '@/lib/blog/utils'
import { SchemaMarkup } from '@/components/common/SchemaMarkup'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog - MicroTools',
  description: 'Read articles about health, finance, SEO, and developer tools to help you get the most out of MicroTools.',
  openGraph: {
    title: 'Blog - MicroTools',
    description: 'Read articles about health, finance, SEO, and developer tools.',
    url: 'https://www.microtoolshub.org/blog',
    type: 'website',
  },
}

function generateBlogCollectionSchema() {
  const posts = getAllBlogPosts()
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'MicroTools Blog',
    description: 'Articles about health, finance, SEO, and developer tools',
    url: 'https://www.microtoolshub.org/blog',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.slice(0, 5).map((post, idx) => ({
        '@type': 'BlogPosting',
        position: idx + 1,
        headline: post.title,
        description: post.description,
        url: `https://www.microtoolshub.org/blog/${post.slug}`,
        datePublished: post.publishedDate,
        dateModified: post.modifiedDate,
      })),
    },
  }
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, { bg: string; text: string; emoji: string }> = {
    health: { bg: 'bg-red-500/20', text: 'text-red-400', emoji: '🏥' },
    finance: { bg: 'bg-green-500/20', text: 'text-green-400', emoji: '💰' },
    seo: { bg: 'bg-blue-500/20', text: 'text-blue-400', emoji: '🔍' },
    developer: { bg: 'bg-purple-500/20', text: 'text-purple-400', emoji: '👨‍💻' },
    converter: { bg: 'bg-orange-500/20', text: 'text-orange-400', emoji: '🔄' },
  }
  return colors[category] || { bg: 'bg-slate-500/20', text: 'text-slate-400', emoji: '📝' }
}

export default function BlogPage() {
  const posts = getAllBlogPosts()
  const schema = generateBlogCollectionSchema()

  return (
    <>
      <SchemaMarkup schema={schema} />
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <div className="mb-16">
          <h1 className="text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground">
            Tips, guides, and insights to help you make the most of our tools.
          </p>
        </div>

        <div className="space-y-8">
          {posts.map((post) => {
            const categoryColor = getCategoryColor(post.category)
            return (
            <article
              key={post.id}
              className="group border-b border-border pb-8 hover:opacity-80 transition-opacity"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="flex gap-6 cursor-pointer">
                  <div className={`flex-shrink-0 w-48 h-32 ${categoryColor.bg} rounded-lg overflow-hidden flex items-center justify-center`}>
                    <span className="text-6xl">{categoryColor.emoji}</span>
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full capitalize">
                        {post.category}
                      </span>
                      <span className="text-sm text-muted-foreground">{post.readTime} min read</span>
                    </div>

                    <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {post.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>By {post.author}</span>
                      <span>{formatDate(post.publishedDate)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
            )
          })}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No blog posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </>
  )
}
