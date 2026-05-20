'use client'

import { ResumeData } from '@/lib/resume-templates/types'

interface MinimalTemplateProps {
  data: ResumeData
}

export function MinimalTemplate({ data }: MinimalTemplateProps) {
  const experienceEntries = data.experience.split('\n').filter(Boolean)
  const educationEntries = data.education.split('\n').filter(Boolean)
  const skillsList = data.skills.split(',').map(s => s.trim()).filter(Boolean)

  return (
    <div
      className="w-full mx-auto bg-white text-gray-900 print:shadow-none print:rounded-none"
      style={{
        maxWidth: '8.5in',
        aspectRatio: '8.5 / 11',
        padding: '0.9in',
        margin: '0 auto',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        borderRadius: '4px',
        fontFamily: '"Segoe UI", system-ui, -apple-system, sans-serif'
      }}
      id="resume-preview"
    >
      {/* Header - Centered, Elegant */}
      <div className="text-center mb-7 pb-6 border-b border-gray-300">
        {/* Name - Serif, Elegant */}
        <h1
          className="text-4xl font-light text-gray-900 mb-2 tracking-tight"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          {data.fullName || 'Your Name'}
        </h1>

        {/* Contact Info - Minimal, Centered */}
        <div className="flex flex-wrap justify-center gap-5 text-xs text-gray-600 mb-4">
          {data.email && (
            <a href={`mailto:${data.email}`} className="hover:text-gray-900 transition-colors font-medium">
              {data.email}
            </a>
          )}
          {data.phone && (
            <span className="font-medium">{data.phone}</span>
          )}
        </div>

        {/* Professional Summary - Elegant, Restrained */}
        {data.summary && (
          <p className="text-gray-700 leading-relaxed text-xs max-w-sm mx-auto">
            {data.summary.substring(0, 200)}
            {data.summary.length > 200 ? '…' : ''}
          </p>
        )}
      </div>

      {/* Experience Section */}
      {experienceEntries.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-widest letter-spacing">
            Experience
          </h2>
          <div className="space-y-4">
            {experienceEntries.map((entry, idx) => {
              const parts = entry.split('|')
              const roleCompany = parts[0]?.trim() || entry
              const dates = parts[1]?.trim() || ''

              return (
                <div key={idx}>
                  <div className="font-medium text-gray-900 text-sm mb-0.5">{roleCompany}</div>
                  {dates && <div className="text-xs text-gray-600">{dates}</div>}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Education Section */}
      {educationEntries.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-widest">
            Education
          </h2>
          <div className="space-y-3">
            {educationEntries.map((entry, idx) => {
              const parts = entry.split('|')
              const degree = parts[0]?.trim() || entry
              const year = parts[1]?.trim() || ''

              return (
                <div key={idx}>
                  <div className="font-medium text-gray-900 text-sm mb-0.5">{degree}</div>
                  {year && <div className="text-xs text-gray-600">{year}</div>}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Skills Section */}
      {skillsList.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-widest">
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {skillsList.map((skill, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-1.5 flex-shrink-0"></span>
                <span className="text-gray-700 text-xs font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer - Minimal */}
      <div className="mt-5 pt-4 border-t border-gray-300 text-center text-xs text-gray-400">
        <p style={{ fontFamily: 'Georgia, serif' }}>Professional Resume</p>
      </div>
    </div>
  )
}
