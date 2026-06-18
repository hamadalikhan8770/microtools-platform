'use client'

import { useState, useEffect } from 'react'
import { Copy, Share2 } from 'lucide-react'
import { AdUnit } from '@/components/ads/AdUnit'
import type { Tool } from '@/types/tool'
import { trackToolUsage, trackToolCalculation, trackClick } from '@/lib/ga4'
import { useAnalytics } from '@/lib/hooks/useAnalytics'
import { useScrollDepth } from '@/lib/hooks/useScrollDepth'

type ToolMetadata = Omit<Tool, 'calculate'>

interface ToolPageClientProps {
  tool: ToolMetadata
  category: { name: string; slug: string; icon: string }
  onCalculate: (inputs: Record<string, any>) => Promise<any>
}

export function ToolPageClient({ tool, category, onCalculate }: ToolPageClientProps) {
  const [inputs, setInputs] = useState<Record<string, any>>({})
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [explanation, setExplanation] = useState<string>('')
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false)

  useAnalytics()
  useScrollDepth()

  useEffect(() => {
    trackToolUsage(tool.name, category.name, Object.keys(inputs).length)
  }, [tool.name, category.name, inputs])

  const handleInputChange = (name: string, value: any) => {
    setInputs(prev => ({ ...prev, [name]: value }))
  }

  const handleCalculate = async () => {
    trackClick('Calculate', 'button', 'tool-page')
    try {
      setError('')
      setIsLoading(true)
      setExplanation('')
      const result = await onCalculate(inputs)
      setResult(result)

      trackToolCalculation(tool.name, category.name, result.outputs[0]?.label || 'calculation')

      // Generate AI explanation
      setIsLoadingExplanation(true)
      try {
        const explanationResponse = await fetch('/api/explain', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            toolName: tool.name,
            result: result.outputs,
          }),
        })
        if (explanationResponse.ok) {
          const data = await explanationResponse.json()
          setExplanation(data.explanation)
        }
      } catch (e) {
        console.error('Failed to generate explanation:', e)
      } finally {
        setIsLoadingExplanation(false)
      }
    } catch (e) {
      setError(`Error: ${String(e)}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyResult = () => {
    if (result) {
      trackClick('Copy Results', 'button', 'tool-page')
      const text = result.outputs.map((o: any) => `${o.label}: ${o.value} ${o.unit || ''}`).join('\n')
      navigator.clipboard.writeText(text)
    }
  }

  const handleShare = () => {
    trackClick('Share', 'button', 'tool-page')
    navigator.share?.({ title: tool.name, text: `Check out ${tool.name}` })
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">{tool.icon}</span>
          <div>
            <h1 className="text-4xl font-bold">{tool.name}</h1>
            <p className="text-muted-foreground capitalize">
              {category.name} Tool
            </p>
          </div>
        </div>
        <p className="text-lg text-muted-foreground">{tool.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Enter Values</h2>

            <div className="space-y-4 mb-6">
              {tool.inputs.map(input => (
                <div key={input.name}>
                  <label className="block text-sm font-medium mb-2">
                    {input.label}
                    {input.unit && <span className="text-muted-foreground"> ({input.unit})</span>}
                  </label>

                  {input.type === 'number' && (
                    <input
                      type="number"
                      placeholder={input.placeholder}
                      value={inputs[input.name] || ''}
                      onChange={(e) => handleInputChange(input.name, e.target.value)}
                      min={input.min}
                      max={input.max}
                      step={input.step}
                      className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  )}

                  {input.type === 'text' && (
                    <input
                      type="text"
                      placeholder={input.placeholder}
                      value={inputs[input.name] || ''}
                      onChange={(e) => handleInputChange(input.name, e.target.value)}
                      className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  )}

                  {input.type === 'select' && (
                    <select
                      value={inputs[input.name] || ''}
                      onChange={(e) => handleInputChange(input.name, e.target.value)}
                      className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select...</option>
                      {input.options?.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={handleCalculate}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Calculating...' : 'Calculate'}
            </button>

            {error && (
              <div className="mt-4 p-3 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2">
          {result && (
            <div className="space-y-6">
              {/* Output Values */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">Results</h2>

                <div className="space-y-4 mb-6">
                  {result.outputs.map((output: any, idx: number) => (
                    <div key={idx} className="p-4 bg-secondary rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">{output.label}</p>
                      <p className="text-2xl font-bold">
                        {output.value}
                        {output.unit && <span className="text-lg ml-2 text-muted-foreground">{output.unit}</span>}
                      </p>
                      {output.description && (
                        <p className="text-xs text-muted-foreground mt-2">{output.description}</p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleCopyResult}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>

              {/* Tool Page Ad - After Results */}
              <div className="bg-secondary/30 rounded-2xl p-4 border border-border">
                <AdUnit slotId="1234567892" format="auto" responsive={true} minHeight="200px" />
              </div>

              {/* AI Explanation */}
              {isLoadingExplanation && (
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <span>✨ Preview by Claude</span>
                  </h3>
                  <div className="animate-pulse space-y-2">
                    <div className="h-4 bg-secondary rounded w-full"></div>
                    <div className="h-4 bg-secondary rounded w-5/6"></div>
                  </div>
                </div>
              )}

              {explanation && !isLoadingExplanation && (
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-6">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <span className="text-lg">✨</span>
                    <span>Preview by Claude</span>
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground">
                    {explanation}
                  </p>
                </div>
              )}

              {/* Tips */}
              {result.tips && (
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="font-bold mb-3">💡 Tips</h3>
                  <ul className="space-y-2 text-sm">
                    {result.tips.map((tip: string, idx: number) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Details */}
              {result.details && (
                <div className="space-y-4">
                  {result.details.map((detail: any, idx: number) => (
                    <div key={idx} className="bg-card border border-border rounded-2xl p-6">
                      <h3 className="font-bold mb-3">{detail.title}</h3>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap font-mono bg-secondary p-3 rounded-lg overflow-x-auto">
                        {detail.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {!result && (
            <div className="bg-card border border-border rounded-2xl p-12 text-center">
              <p className="text-lg text-muted-foreground mb-2">
                Fill in the values and click "Calculate" to see results
              </p>
            </div>
          )}
        </div>
      </div>

      {/* FAQs */}
      {tool.faqs && tool.faqs.length > 0 && (
        <div className="mt-16 border-t border-border pt-12">
          <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {tool.faqs.map((faq, idx) => (
              <details key={idx} className="group p-4 bg-card border border-border rounded-lg">
                <summary className="font-semibold cursor-pointer">
                  {faq.q}
                </summary>
                <p className="mt-3 text-muted-foreground text-sm">{faq.a}</p>
              </details>
            ))}
          </div>

          {/* Tool Page Ad - After FAQs */}
          <div className="mt-12 bg-secondary/30 rounded-2xl p-6 border border-border">
            <AdUnit slotId="1234567893" format="auto" responsive={true} minHeight="250px" />
          </div>
        </div>
      )}
    </div>
  )
}
