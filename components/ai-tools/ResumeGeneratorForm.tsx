'use client'

import { useState } from 'react'
import { Copy, Download, Loader2 } from 'lucide-react'

export function ResumeGeneratorForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    summary: '',
    experience: '',
    education: '',
    skills: '',
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
    if (!formData.fullName || !formData.email || !formData.phone) {
      setError('Please fill in your name, email, and phone number')
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
          toolType: 'resume',
          formData,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to generate resume')
      }

      const data = await response.json()
      setResult(data.result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate resume')
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
    element.download = `${formData.fullName.replace(/\s+/g, '_')}_resume.md`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Form Section */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="John Doe"
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
              className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="(123) 456-7890"
              className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Professional Summary</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleInputChange}
            placeholder="Brief overview of your professional background and career goals..."
            rows={3}
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Work Experience</label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            placeholder="Job Title at Company (2020-2023)&#10;Key responsibilities and achievements..."
            rows={4}
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Education</label>
          <textarea
            name="education"
            value={formData.education}
            onChange={handleInputChange}
            placeholder="Degree Name, University Name (2016-2020)&#10;Additional certifications..."
            rows={3}
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Skills</label>
          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
            placeholder="Project Management, Leadership, Data Analysis, Python, JavaScript..."
            rows={2}
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
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
            'Generate Resume'
          )}
        </button>
      </div>

      {/* Preview Section */}
      <div className="space-y-4">
        {result ? (
          <>
            <div className="bg-card border border-border rounded-lg p-6 max-h-96 overflow-y-auto">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {result.split('\n').map((line, idx) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={idx} className="text-2xl font-bold mt-4 mb-2">{line.replace('# ', '')}</h1>
                  }
                  if (line.startsWith('## ')) {
                    return <h2 key={idx} className="text-xl font-bold mt-3 mb-1">{line.replace('## ', '')}</h2>
                  }
                  if (line.startsWith('- ')) {
                    return <li key={idx} className="ml-4">{line.replace('- ', '')}</li>
                  }
                  return line.trim() ? <p key={idx} className="mb-2">{line}</p> : <div key={idx} className="mb-2" />
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
              <p className="mb-2">Fill in your information and click "Generate Resume"</p>
              <p className="text-sm">Your resume will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
