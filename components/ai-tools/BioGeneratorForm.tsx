'use client'

import { useState } from 'react'
import { Copy, Loader2 } from 'lucide-react'

export function BioGeneratorForm() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    industry: '',
    skills: '',
    tone: 'professional',
  })

  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleGenerate = async () => {
    if (!formData.name || !formData.title || !formData.industry) {
      setError('Please fill in your name, title, and industry')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toolType: 'bio',
          formData,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to generate bio')
      }

      const data = await response.json()
      setResult(data.result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate bio')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      setError('Failed to copy to clipboard')
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Form Section */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Your Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Jane Smith"
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Job Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Senior Product Manager"
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Industry *</label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleInputChange}
            placeholder="Technology, Finance, Marketing, etc."
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Key Skills</label>
          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
            placeholder="Product Strategy, Leadership, Data Analysis..."
            rows={3}
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tone</label>
          <select
            name="tone"
            value={formData.tone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="professional">Professional</option>
            <option value="friendly">Friendly & Approachable</option>
            <option value="creative">Creative & Innovative</option>
            <option value="confident">Confident & Bold</option>
          </select>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Bio'
          )}
        </button>
      </div>

      {/* Preview Section */}
      <div className="space-y-4">
        {result ? (
          <>
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div>
                <p className="text-xs text-muted-foreground font-semibold mb-2">YOUR BIO</p>
                <div className="bg-background/50 p-4 rounded border border-border/50">
                  <p className="text-sm leading-relaxed">{result}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground font-semibold mb-2">CHARACTER COUNT</p>
                <p className="text-2xl font-bold text-primary">{result.length}</p>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="w-full px-4 py-2 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors flex items-center justify-center gap-2"
            >
              <Copy className="w-4 h-4" />
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
          </>
        ) : (
          <div className="bg-card border border-border rounded-lg p-8 h-96 flex items-center justify-center text-center">
            <div className="text-muted-foreground">
              <p className="mb-2">Fill in your information and click "Generate Bio"</p>
              <p className="text-sm">Your bio will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
