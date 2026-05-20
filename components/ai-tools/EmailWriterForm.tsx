'use client'

import { useState } from 'react'
import { Copy, Loader2 } from 'lucide-react'

export function EmailWriterForm() {
  const [formData, setFormData] = useState({
    purpose: '',
    recipient: '',
    keyPoints: '',
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
    if (!formData.purpose || !formData.recipient) {
      setError('Please fill in the email purpose and recipient')
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
          toolType: 'email',
          formData,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to generate email')
      }

      const data = await response.json()
      setResult(data.result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate email')
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
          <label className="block text-sm font-medium mb-2">Email Purpose *</label>
          <select
            name="purpose"
            value={formData.purpose}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select a purpose...</option>
            <option value="follow-up">Follow-up After Meeting</option>
            <option value="job-inquiry">Job Inquiry</option>
            <option value="business-proposal">Business Proposal</option>
            <option value="networking">Networking Outreach</option>
            <option value="request-meeting">Request a Meeting</option>
            <option value="thank-you">Thank You Email</option>
            <option value="apology">Apology Email</option>
            <option value="general-inquiry">General Inquiry</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Recipient *</label>
          <input
            type="text"
            name="recipient"
            value={formData.recipient}
            onChange={handleInputChange}
            placeholder="John Smith, Hiring Manager at Acme Corp"
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Key Points to Cover</label>
          <textarea
            name="keyPoints"
            value={formData.keyPoints}
            onChange={handleInputChange}
            placeholder="Main topics, request, or details to include..."
            rows={4}
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
            <option value="friendly">Friendly & Casual</option>
            <option value="formal">Formal & Official</option>
            <option value="persuasive">Persuasive</option>
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
            'Generate Email'
          )}
        </button>
      </div>

      {/* Preview Section */}
      <div className="space-y-4">
        {result ? (
          <>
            <div className="bg-card border border-border rounded-lg p-6 max-h-96 overflow-y-auto space-y-3">
              {result.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('Subject:')) {
                  return (
                    <div key={idx}>
                      <p className="text-xs text-muted-foreground font-semibold">SUBJECT LINE</p>
                      <p className="font-semibold text-foreground">{paragraph.replace('Subject: ', '')}</p>
                    </div>
                  )
                }
                return (
                  <div key={idx}>
                    <p className="text-sm leading-relaxed text-foreground">{paragraph}</p>
                  </div>
                )
              })}
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
              <p className="mb-2">Fill in the email details and click "Generate Email"</p>
              <p className="text-sm">Your email will appear here, ready to copy or edit</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
