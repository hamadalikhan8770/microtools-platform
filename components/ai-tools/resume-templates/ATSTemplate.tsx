'use client'

import { ResumeData } from '@/lib/resume-templates/types'

interface ATSTemplateProps {
  data: ResumeData
}

export function ATSTemplate({ data }: ATSTemplateProps) {
  const sections = data.experience.split('\n').filter(Boolean)
  const educations = data.education.split('\n').filter(Boolean)
  const skillsList = data.skills.split(',').map(s => s.trim()).filter(Boolean)

  return (
    <div className="w-full max-w-4xl mx-auto bg-white text-black p-8 font-mono text-sm leading-relaxed print:p-0 print:rounded-none print:shadow-none" id="resume-preview">
      {/* Header - ATS Optimized */}
      <div className="mb-6">
        {/* Name */}
        <div className="text-base font-bold mb-2">
          {data.fullName || 'YOUR NAME'}
        </div>

        {/* Contact Info - Plain Text, ATS Friendly */}
        <div className="space-y-1 text-xs">
          {data.email && <div>Email: {data.email}</div>}
          {data.phone && <div>Phone: {data.phone}</div>}
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <div className="mb-6">
          <div className="font-bold mb-2">PROFESSIONAL SUMMARY</div>
          <div className="whitespace-pre-wrap text-xs">{data.summary}</div>
        </div>
      )}

      {/* Experience Section */}
      {sections.length > 0 && (
        <div className="mb-6">
          <div className="font-bold mb-2">PROFESSIONAL EXPERIENCE</div>
          <div className="space-y-3">
            {sections.map((section, idx) => (
              <div key={idx} className="text-xs whitespace-pre-wrap">
                {section}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {educations.length > 0 && (
        <div className="mb-6">
          <div className="font-bold mb-2">EDUCATION</div>
          <div className="space-y-2">
            {educations.map((education, idx) => (
              <div key={idx} className="text-xs whitespace-pre-wrap">
                {education}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Section */}
      {skillsList.length > 0 && (
        <div className="mb-6">
          <div className="font-bold mb-2">SKILLS</div>
          <div className="text-xs">
            {skillsList.join(' | ')}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-gray-400 text-center text-xs text-gray-600">
        <p>Generated with MicroTools Resume Builder</p>
      </div>
    </div>
  )
}
