import { Metadata } from 'next'
import { createElement } from 'react'
import Link from 'next/link'
import { getBlogPost, getAllBlogPosts, getRelatedBlogPosts, formatDate } from '@/lib/blog/utils'
import { SchemaMarkup } from '@/components/common/SchemaMarkup'
import { generateArticleSchema } from '@/lib/seo/schema'

export const dynamic = 'force-dynamic'

interface BlogDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} - MicroTools`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedDate,
      modifiedTime: post.modifiedDate,
      authors: [post.author],
      tags: post.tags,
      url: `https://www.microtoolshub.org/blog/${post.slug}`,
      images: [{ url: post.image || 'https://www.microtoolshub.org/og-image.png' }],
    },
  }
}

export async function generateStaticParams() {
  return getAllBlogPosts().map(post => ({
    slug: post.slug,
  }))
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-4xl font-bold">Post Not Found</h1>
      </div>
    )
  }

  const related = getRelatedBlogPosts(post)
  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.description,
    content: post.content,
    publishedDate: post.publishedDate,
    modifiedDate: post.modifiedDate,
    author: post.author,
    image: post.image,
  })

  return (
    <>
      <SchemaMarkup schema={articleSchema} />
      <div className="container mx-auto max-w-3xl px-4 py-16">
        <article>
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full capitalize">
                {post.category}
              </span>
              <span className="text-sm text-muted-foreground">{post.readTime} min read</span>
            </div>

            <h1 className="text-5xl font-bold mb-4">{post.title}</h1>

            <div className="flex items-center justify-between text-muted-foreground border-b border-border pb-6">
              <div>
                <p className="mb-1">By {post.author}</p>
                <p className="text-sm">Published on {formatDate(post.publishedDate)}</p>
              </div>
              {post.modifiedDate !== post.publishedDate && (
                <p className="text-sm">Updated on {formatDate(post.modifiedDate)}</p>
              )}
            </div>
          </header>

          {post.image && (
            <div className="mb-12 rounded-lg overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-96 object-cover" />
            </div>
          )}

          <div className="prose prose-invert max-w-none mb-12">
            {post.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('#')) {
                const level = paragraph.match(/^#+/)?.[0].length || 1
                const text = paragraph.replace(/^#+\s/, '')
                const headingLevel = Math.min(level + 1, 6)
                const tagName = `h${headingLevel}` as const
                return createElement(tagName, { key: idx, className: 'mt-8 mb-4' }, text)
              }

              if (paragraph.startsWith('-') || paragraph.startsWith('*')) {
                const items = paragraph.split('\n').filter(line => line.trim())
                return (
                  <ul key={idx} className="list-disc pl-6 mb-4 space-y-2">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace(/^[-*]\s/, '')}</li>
                    ))}
                  </ul>
                )
              }

              if (paragraph.startsWith('1.')) {
                const items = paragraph.split('\n').filter(line => line.trim())
                return (
                  <ol key={idx} className="list-decimal pl-6 mb-4 space-y-2">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace(/^\d+\.\s/, '')}</li>
                    ))}
                  </ol>
                )
              }

              return (
                <p key={idx} className="mb-4">
                  {paragraph}
                </p>
              )
            })}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="border-t border-border pt-6 mb-12">
              <p className="text-sm font-semibold mb-3">Tags:</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-border">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(relatedPost => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group p-4 rounded-lg border border-border bg-card hover:border-primary hover:shadow-lg transition-all"
                >
                  <p className="text-xs font-semibold text-primary capitalize mb-2">{relatedPost.category}</p>
                  <h3 className="font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{relatedPost.description}</p>
                  <div className="text-xs text-muted-foreground flex justify-between">
                    <span>{relatedPost.readTime} min</span>
                    <span>{formatDate(relatedPost.publishedDate)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    </>
  )
}
