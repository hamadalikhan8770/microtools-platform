export type ToolCategory = 'health' | 'finance' | 'converter' | 'seo' | 'developer'

export interface ToolInput {
  name: string
  type: 'number' | 'text' | 'select' | 'file'
  label: string
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
  min?: number
  max?: number
  step?: number
  unit?: string
}

export interface ToolOutput {
  label: string
  value: string | number
  unit?: string
  description?: string
}

export interface ToolResult {
  outputs: ToolOutput[]
  details?: {
    title: string
    content: string
  }[]
  tips?: string[]
}

export interface Tool {
  id: string
  name: string
  slug: string
  category: ToolCategory
  description: string
  shortDescription: string
  keywords: string[]
  icon: string
  featured: boolean
  inputs: ToolInput[]
  calculate: (inputs: Record<string, any>) => ToolResult
  examples?: {
    inputs: Record<string, any>
    outputs: Record<string, any>
  }[]
  faqs?: {
    q: string
    a: string
  }[]
  sections?: {
    title: string
    content: string
  }[]
  relatedTools?: string[]
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  count?: number
}

export interface SearchResult {
  id: string
  name: string
  slug: string
  category: string
  description: string
  categorySlug: string
}
