'use client'

import { ResumeData } from '@/lib/resume-templates/types'

interface ATSTemplateProps {
  data: ResumeData
}

export function ATSTemplate({ data }: ATSTemplateProps) {
  const experienceEntries = data.experience.split('\n').filter(Boolean)
  const educationEntries = data.education.split('\n').filter(Boolean)
  const skillsList = data.skills.split(',').map(s => s.trim()).filter(Boolean)

  return (
    <div
      className="w-full mx-auto bg-white text-black p-8 print:p-0 print:rounded-none print:shadow-none"
      style={{
        maxWidth: '8.5in',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '11px',
        lineHeight: '1.5'
      }}
      id="resume-preview"
    >
      {/* Header - Clean, ATS-Friendly */}
      <div className="mb-4">
        {/* Name */}
        <div className="font-bold text-base mb-2">
          {(data.fullName || 'YOUR NAME').toUpperCase()}
        </div>

        {/* Contact Info - Structured, ATS-Friendly */}
        <div className="space-y-0.5">
          {data.email && <div>Email: {data.email}</div>}
          {data.phone && <div>Phone: {data.phone}</div>}
        </div>
      </div>

      {/* Horizontal Separator */}
      <div className="border-b border-gray-400 mb-4"></div>

      {/* Professional Summary */}
      {data.summary && (
        <div className="mb-4">
          <div className="font-bold mb-1">PROFESSIONAL SUMMARY</div>
          <div className="whitespace-pre-wrap text-xs leading-relaxed mb-2">
            {data.summary.substring(0, 400)}
          </div>
        </div>
      )}

      {/* Experience Section - Structured Format */}
      {experienceEntries.length > 0 && (
        <div className="mb-4">
          <div className="font-bold mb-2">PROFESSIONAL EXPERIENCE</div>
          <div className="space-y-2">
            {experienceEntries.map((entry, idx) => {
              const parts = entry.split('|')
              const roleCompany = parts[0]?.trim() || entry
              const dates = parts[1]?.trim() || ''

              return (
                <div key={idx} className="text-xs mb-2">
                  <div className="font-bold">{roleCompany}</div>
                  {dates && <div className="text-gray-700 mb-1">{dates}</div>}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Education Section - Structured Format */}
      {educationEntries.length > 0 && (
        <div className="mb-4">
          <div className="font-bold mb-2">EDUCATION</div>
          <div className="space-y-2">
            {educationEntries.map((entry, idx) => {
              const parts = entry.split('|')
              const degree = parts[0]?.trim() || entry
              const year = parts[1]?.trim() || ''

              return (
                <div key={idx} className="text-xs">
                  <div className="font-bold">{degree}</div>
                  {year && <div className="text-gray-700">{year}</div>}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Skills Section - Keyword-Rich Format */}
      {skillsList.length > 0 && (
        <div className="mb-4">
          <div className="font-bold mb-1">TECHNICAL SKILLS</div>
          <div className="text-xs">
            {skillsList.join(' • ')}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 pt-3 border-t border-gray-400 text-center text-xs text-gray-600">
        <p>Professional Resume</p>
      </div>
    </div>
  )
}
