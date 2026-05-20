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
    <div className="w-full h-full bg-gray-100 rounded-lg overflow-auto p-4">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="inline-block mb-4">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-600 font-medium">Generating resume...</p>
          </div>
        </div>
      ) : (
        renderTemplate()
      )}
    </div>
  )
}
