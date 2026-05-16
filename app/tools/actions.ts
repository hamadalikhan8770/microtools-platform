'use server'

import { getTool } from '@/lib/tools'

export async function calculateTool(toolSlug: string, inputs: Record<string, any>) {
  const tool = getTool(toolSlug)
  if (!tool) {
    throw new Error('Tool not found')
  }

  return tool.calculate(inputs)
}
