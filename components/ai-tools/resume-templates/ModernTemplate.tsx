'use client'

import { ResumeData } from '@/lib/resume-templates/types'
import { Mail, Phone, Briefcase, GraduationCap, Star } from 'lucide-react'

interface ModernTemplateProps {
  data: ResumeData
}

export function ModernTemplate({ data }: ModernTemplateProps) {
  const experienceEntries = data.experience.split('\n').filter(Boolean)
  const educationEntries = data.education.split('\n').filter(Boolean)
  const skillsList = data.skills.split(',').map(s => s.trim()).filter(Boolean)

  return (
    <div
      className="w-full mx-auto bg-white text-gray-900 print:shadow-none print:rounded-none"
      style={{
        maxWidth: '8.5in',
        aspectRatio: '8.5 / 11',
        padding: '0.75in',
        margin: '0 auto',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        borderRadius: '4px'
      }}
      id="resume-preview"
    >
      {/* Header Section */}
      <div className="mb-6 pb-6 border-b-3 border-blue-600">
        {/* Name */}
        <h1 className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">
          {data.fullName || 'Your Name'}
        </h1>

        {/* Contact Info - Professional Layout */}
        <div className="flex flex-wrap gap-4 text-xs text-gray-600 mb-3">
          {data.email && (
            <a href={`mailto:${data.email}`} className="hover:text-blue-600 transition-colors font-medium">
              {data.email}
            </a>
          )}
          {data.phone && (
            <span className="font-medium">{data.phone}</span>
          )}
        </div>

        {/* Professional Summary - Constrained Height */}
        {data.summary && (
          <p className="text-gray-700 leading-snug text-sm">
            {data.summary.substring(0, 250)}
            {data.summary.length > 250 ? '...' : ''}
          </p>
        )}
      </div>

      {/* Experience Section */}
      {experienceEntries.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <Briefcase size={16} className="text-blue-600 flex-shrink-0" />
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Professional Experience</h2>
          </div>

          <div className="space-y-3">
            {experienceEntries.map((entry, idx) => {
              // Parse: "Role at Company, Location | MM/YYYY - MM/YYYY" or just text
              const parts = entry.split('|')
              const roleCompany = parts[0]?.trim() || entry
              const dates = parts[1]?.trim() || ''

              return (
                <div key={idx} className="pl-5 border-l-2 border-blue-200">
                  {/* Role & Company */}
                  <div className="font-semibold text-gray-900 text-sm mb-0.5">
                    {roleCompany}
                  </div>
                  {/* Dates */}
                  {dates && (
                    <div className="text-xs text-gray-600 font-medium mb-1">
                      {dates}
                    </div>
                  )}
                  {/* Achievement bullet points are in the parsed data */}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Education Section */}
      {educationEntries.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap size={16} className="text-blue-600 flex-shrink-0" />
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Education</h2>
          </div>

          <div className="space-y-2">
            {educationEntries.map((entry, idx) => {
              const parts = entry.split('|')
              const degree = parts[0]?.trim() || entry
              const year = parts[1]?.trim() || ''

              return (
                <div key={idx} className="pl-5 border-l-2 border-blue-200">
                  <div className="font-semibold text-gray-900 text-sm mb-0.5">{degree}</div>
                  {year && <div className="text-xs text-gray-600">{year}</div>}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Skills Section */}
      {skillsList.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <Star size={16} className="text-blue-600 flex-shrink-0" />
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Core Skills</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {skillsList.map((skill, idx) => (
              <span
                key={idx}
                className="inline-block px-2.5 py-1.5 bg-blue-50 text-blue-700 rounded text-xs font-semibold border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer - Minimal */}
      <div className="mt-4 pt-3 border-t border-gray-200 text-center text-xs text-gray-400">
        <p>Professional Resume</p>
      </div>
    </div>
  )
}
