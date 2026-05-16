import blogData from '@/data/blog.json'

export interface BlogPost {
  id: string
  title: string
  slug: string
  description: string
  content: string
  author: string
  publishedDate: string
  modifiedDate: string
  category: string
  image: string
  readTime: number
  tags: string[]
}

export function getAllBlogPosts(): BlogPost[] {
  return blogData.sort((a, b) =>
    new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  )
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogData.find(post => post.slug === slug)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogData.filter(post => post.category === category).sort((a, b) =>
    new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  )
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return blogData.filter(post => post.tags.includes(tag)).sort((a, b) =>
    new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  )
}

export function getRelatedBlogPosts(post: BlogPost, limit = 3): BlogPost[] {
  return blogData
    .filter(p => p.id !== post.id && p.tags.some(tag => post.tags.includes(tag)))
    .sort((a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    )
    .slice(0, limit)
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
