'use client'

import { ResumeData } from '@/lib/resume-templates/types'

interface MinimalTemplateProps {
  data: ResumeData
}

export function MinimalTemplate({ data }: MinimalTemplateProps) {
  const sections = data.experience.split('\n').filter(Boolean)
  const educations = data.education.split('\n').filter(Boolean)
  const skillsList = data.skills.split(',').map(s => s.trim()).filter(Boolean)

  return (
    <div className="w-full max-w-4xl mx-auto bg-white text-gray-900 p-12 shadow-xl rounded-lg print:rounded-none print:shadow-none print:p-0 print:bg-white" id="resume-preview">
      {/* Header - Centered, Elegant */}
      <div className="text-center mb-12 pb-8 border-b border-gray-300">
        {/* Name */}
        <h1 className="text-5xl font-light text-gray-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
          {data.fullName || 'Your Name'}
        </h1>

        {/* Contact Info - Minimal, Centered */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-6">
          {data.email && (
            <a href={`mailto:${data.email}`} className="hover:text-gray-900 transition-colors">
              {data.email}
            </a>
          )}
          {data.phone && (
            <span>{data.phone}</span>
          )}
        </div>

        {/* Professional Summary */}
        {data.summary && (
          <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto italic">
            {data.summary}
          </p>
        )}
      </div>

      {/* Experience Section */}
      {sections.length > 0 && (
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-300 uppercase tracking-wide">
            Experience
          </h2>
          <div className="space-y-6">
            {sections.map((section, idx) => (
              <div key={idx}>
                <p className="font-medium text-gray-900 text-base leading-relaxed">{section}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {educations.length > 0 && (
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-300 uppercase tracking-wide">
            Education
          </h2>
          <div className="space-y-4">
            {educations.map((education, idx) => (
              <div key={idx}>
                <p className="font-medium text-gray-900 text-base">{education}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Section */}
      {skillsList.length > 0 && (
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-300 uppercase tracking-wide">
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {skillsList.map((skill, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                <span className="text-gray-700">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-300 text-center text-xs text-gray-500">
        <p style={{ fontFamily: 'Georgia, serif' }}>
          Professional Resume | Generated with MicroTools Resume Builder
        </p>
      </div>
    </div>
  )
}
