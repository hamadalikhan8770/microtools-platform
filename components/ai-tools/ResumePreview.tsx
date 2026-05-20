'use client'

import { ResumeData } from '@/lib/resume-templates/types'
import { ModernTemplate } from './resume-templates/ModernTemplate'
import { MinimalTemplate } from './resume-templates/MinimalTemplate'
import { ATSTemplate } from './resume-templates/ATSTemplate'

interface ResumePreviewProps {
  data: ResumeData
  isLoading?: boolean
}

export function ResumePreview({ data, isLoading }: ResumePreviewProps) {
  const selectedTemplate = data.selectedTemplate || 'modern'

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'minimal':
        return <MinimalTemplate data={data} />
      case 'ats':
        return <ATSTemplate data={data} />
      case 'modern':
      default:
        return <ModernTemplate data={data} />
    }
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden flex flex-col">
      {/* Preview Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          <span className="text-sm font-medium text-gray-700">
            {selectedTemplate === 'modern' ? 'Modern Professional' : selectedTemplate === 'minimal' ? 'Minimal Elegant' : 'ATS Optimized'} Template
          </span>
        </div>
        <span className="text-xs text-gray-500">Preview</span>
      </div>

      {/* Document Viewer Container */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-16 h-16 mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute inset-2 border-4 border-transparent border-t-blue-600 border-r-blue-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-600 font-medium mb-1">Generating your resume...</p>
            <p className="text-xs text-gray-500">Using Gemini AI to craft your professional summary</p>
          </div>
        ) : (
          <div
            className="transition-all duration-500 ease-out opacity-100"
            style={{
              transform: isLoading ? 'scale(0.95)' : 'scale(1)',
              filter: isLoading ? 'blur(4px)' : 'blur(0px)'
            }}
          >
            {/* Document Frame */}
            <div className="bg-white rounded-sm shadow-2xl overflow-hidden" style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)' }}>
              <div className="overflow-hidden">
                {renderTemplate()}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Preview Footer */}
      <div className="bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">8.5" × 11" Document</span>
          <span className="text-xs text-gray-500">100% scale</span>
        </div>
      </div>
    </div>
  )
}
