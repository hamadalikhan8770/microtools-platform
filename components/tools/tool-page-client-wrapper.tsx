'use client'

import { calculateTool } from '@/app/tools/actions'
import { ToolPageClient } from './tool-page-client'
import type { Tool } from '@/types/tool'

type ToolMetadata = Omit<Tool, 'calculate'>

interface ToolPageClientWrapperProps {
  tool: ToolMetadata
  category: { name: string; slug: string; icon: string }
  toolSlug: string
}

export function ToolPageClientWrapper({ tool, category, toolSlug }: ToolPageClientWrapperProps) {
  const handleCalculate = async (inputs: Record<string, any>) => {
    return calculateTool(toolSlug, inputs)
  }

  return <ToolPageClient tool={tool} category={category} onCalculate={handleCalculate} />
}
