'use client'

import { Tool } from '@/types/tool'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type ToolCardData = Omit<Tool, 'calculate'>

interface ToolCardProps {
  tool: ToolCardData
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={`/tools/${tool.category}/${tool.slug}`}>
      <div className="group h-full p-6 rounded-2xl border border-border bg-card hover:border-primary hover:shadow-lg transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl">{tool.icon}</div>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary capitalize">
            {tool.category}
          </span>
        </div>

        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
          {tool.name}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {tool.shortDescription}
        </p>

        <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">
          Use Tool
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}
