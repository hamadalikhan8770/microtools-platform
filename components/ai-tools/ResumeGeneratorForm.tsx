'use client'

import { useState } from 'react'
import { Copy, Download, FileText, Loader2, Check } from 'lucide-react'
import { ResumePreview } from './ResumePreview'
import { formatResumeData, validateResumeData } from '@/lib/resume-formatting'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export function ResumeGeneratorForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    summary: '',
    experience: '',
    education: '',
    skills: '',
    selectedTemplate: 'modern',
  })

  const [aiGenerated, setAiGenerated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [exporting, setExporting] = useState(false)

  const completionPercentage = [
    formData.fullName,
    formData.email,
    formData.phone,
    formData.summary,
    formData.experience,
    formData.education,
    formData.skills,
  ].filter(Boolean).length * (100 / 7)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleGenerateWithAI = async () => {
    const validation = validateResumeData(formData)
    if (!validation.isValid) {
      setError(validation.errors[0])
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
          template: formData.selectedTemplate,
          formData,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate resume')
      }

      const data = await response.json()
      const formattedData = formatResumeData({
        ...formData,
        summary: data.summary || formData.summary,
        experience: data.experience || formData.experience,
        education: data.education || formData.education,
      })
      setFormData(prev => ({ ...prev, ...formattedData }))
      setAiGenerated(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate resume')
    } finally {
      setLoading(false)
    }
  }

  const handleExportPDF = async () => {
    if (!formData.fullName) {
      setError('Please fill in at least your name')
      return
    }

    setExporting(true)
    try {
      const element = document.getElementById('resume-preview')
      if (!element) {
        throw new Error('Resume preview not found')
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
      })

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      })

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, canvas.width, canvas.height)
      pdf.save(`${formData.fullName.replace(/\s+/g, '_')}_resume.pdf`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export PDF')
    } finally {
      setExporting(false)
    }
  }

  const handleCopy = async () => {
    try {
      const element = document.getElementById('resume-preview')
      if (!element) throw new Error('Resume not found')
      await navigator.clipboard.writeText(element.innerText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      setError('Failed to copy to clipboard')
    }
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Form Section - Left */}
      <div className="lg:col-span-1 space-y-6">
        {/* Progress Indicator */}
        <div className="card-premium">
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-foreground">Form Progress</p>
              <p className="text-sm font-semibold text-primary">{Math.round(completionPercentage)}%</p>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Template Selector */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Choose Template</h3>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'modern', label: 'Modern', desc: 'Professional blue accent' },
              { id: 'minimal', label: 'Minimal', desc: 'Elegant & clean' },
              { id: 'ats', label: 'ATS', desc: 'Optimized for systems' },
            ].map((template) => (
              <button
                key={template.id}
                onClick={() => setFormData(prev => ({ ...prev, selectedTemplate: template.id }))}
                className={`p-3 rounded-lg border-2 transition-all text-center ${
                  formData.selectedTemplate === template.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-xs font-semibold text-foreground">{template.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{template.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Contact Information *</h3>
          <div>
            <label className="block text-xs font-medium mb-1.5 text-foreground">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="John Doe"
              className="input-premium"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5 text-foreground">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
              className="input-premium"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5 text-foreground">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="(123) 456-7890"
              className="input-premium"
            />
          </div>
        </div>

        {/* Professional Content */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Professional Content</h3>
          <div>
            <label className="block text-xs font-medium mb-1.5 text-foreground">Professional Summary</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleInputChange}
              placeholder="Brief overview of your professional background..."
              rows={3}
              className="textarea-premium text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5 text-foreground">Work Experience</label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              placeholder="Job Title at Company (2020-2023)&#10;Key achievements..."
              rows={3}
              className="textarea-premium text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5 text-foreground">Education</label>
            <textarea
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              placeholder="Degree Name, University (2020)"
              rows={2}
              className="textarea-premium text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5 text-foreground">Skills</label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              placeholder="Leadership, Project Management, Python, JavaScript..."
              rows={2}
              className="textarea-premium text-sm"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-600 text-xs">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleGenerateWithAI}
            disabled={loading}
            className="w-full button-primary text-sm gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" />
                Generate with AI
              </>
            )}
          </button>
          <button
            onClick={handleExportPDF}
            disabled={!formData.fullName || exporting}
            className="w-full button-secondary text-sm gap-2"
          >
            {exporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Export as PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preview Section - Right */}
      <div className="lg:col-span-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Resume Preview</h3>
            {formData.fullName && (
              <button
                onClick={handleCopy}
                className="button-ghost text-sm gap-1 px-3 py-1.5"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            )}
          </div>

          {/* Resume Preview Container */}
          <div className="border-2 border-border rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900/20">
            <ResumePreview data={formData} isLoading={loading} />
          </div>
        </div>
      </div>
    </div>
  )
}
