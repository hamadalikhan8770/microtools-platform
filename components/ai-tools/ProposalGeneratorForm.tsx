'use client'

import { useState } from 'react'
import { Copy, Download, Loader2 } from 'lucide-react'

export function ProposalGeneratorForm() {
  const [formData, setFormData] = useState({
    projectName: '',
    clientName: '',
    projectDescription: '',
    timeline: '',
    budget: '',
    deliverables: '',
    company: '',
  })

  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleGenerate = async () => {
    if (!formData.projectName || !formData.clientName || !formData.projectDescription) {
      setError('Please fill in Project Name, Client Name, and Project Description')
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
          toolType: 'proposal',
          formData,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to generate proposal')
      }

      const data = await response.json()
      setResult(data.result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate proposal')
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

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([result], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `${formData.projectName.replace(/\s+/g, '_')}_proposal.md`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Form Section */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Project Name *</label>
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleInputChange}
            placeholder="Web Application Development"
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Client Name *</label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleInputChange}
            placeholder="Acme Corporation"
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Your Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Your Company Name"
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Project Description *</label>
          <textarea
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleInputChange}
            placeholder="Describe the project scope, goals, and requirements..."
            rows={3}
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Deliverables</label>
          <textarea
            name="deliverables"
            value={formData.deliverables}
            onChange={handleInputChange}
            placeholder="List what you will deliver (features, reports, documentation, etc.)"
            rows={3}
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Timeline</label>
            <input
              type="text"
              name="timeline"
              value={formData.timeline}
              onChange={handleInputChange}
              placeholder="e.g., 3 months, 12 weeks"
              className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Budget</label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              placeholder="e.g., $25,000"
              className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
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
            'Generate Proposal'
          )}
        </button>
      </div>

      {/* Preview Section */}
      <div className="space-y-4">
        {result ? (
          <>
            <div className="bg-card border border-border rounded-lg p-6 max-h-96 overflow-y-auto">
              <div className="prose prose-sm dark:prose-invert max-w-none space-y-3">
                {result.split('\n\n').map((section, idx) => {
                  if (section.startsWith('# ')) {
                    return (
                      <h1 key={idx} className="text-2xl font-bold mt-4 mb-2">
                        {section.replace('# ', '')}
                      </h1>
                    )
                  }
                  if (section.startsWith('## ')) {
                    return (
                      <h2 key={idx} className="text-xl font-bold mt-3 mb-1">
                        {section.replace('## ', '')}
                      </h2>
                    )
                  }
                  if (section.startsWith('- ')) {
                    return (
                      <ul key={idx} className="list-disc list-inside space-y-1">
                        {section.split('\n').map((item, i) => (
                          <li key={i}>{item.replace('- ', '')}</li>
                        ))}
                      </ul>
                    )
                  }
                  return (
                    <p key={idx} className="text-sm leading-relaxed">
                      {section}
                    </p>
                  )
                })}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex-1 px-4 py-2 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4" />
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 px-4 py-2 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </>
        ) : (
          <div className="bg-card border border-border rounded-lg p-8 h-96 flex items-center justify-center text-center">
            <div className="text-muted-foreground">
              <p className="mb-2">Fill in your project details and click "Generate Proposal"</p>
              <p className="text-sm">Your professional proposal will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
