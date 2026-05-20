'use client'

import { ResumeData } from '@/lib/resume-templates/types'
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Star } from 'lucide-react'

interface ModernTemplateProps {
  data: ResumeData
}

export function ModernTemplate({ data }: ModernTemplateProps) {
  const sections = data.experience.split('\n').filter(Boolean)
  const educations = data.education.split('\n').filter(Boolean)
  const skillsList = data.skills.split(',').map(s => s.trim()).filter(Boolean)

  return (
    <div className="w-full max-w-4xl mx-auto bg-white text-gray-900 p-8 shadow-xl rounded-lg print:rounded-none print:shadow-none print:p-0 print:bg-white" id="resume-preview">
      {/* Header with Accent Bar */}
      <div className="flex gap-6 mb-8 pb-8 border-b-2 border-blue-600">
        {/* Blue Accent Bar */}
        <div className="w-1 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full"></div>

        <div className="flex-1">
          {/* Name */}
          <h1 className="text-4xl font-bold text-gray-900 mb-1">{data.fullName || 'Your Name'}</h1>

          {/* Contact Info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
            {data.email && (
              <div className="flex items-center gap-1">
                <Mail size={16} className="text-blue-600" />
                <a href={`mailto:${data.email}`} className="hover:text-blue-600">{data.email}</a>
              </div>
            )}
            {data.phone && (
              <div className="flex items-center gap-1">
                <Phone size={16} className="text-blue-600" />
                <span>{data.phone}</span>
              </div>
            )}
          </div>

          {/* Professional Summary */}
          {data.summary && (
            <p className="text-gray-700 leading-relaxed text-sm line-clamp-3">
              {data.summary}
            </p>
          )}
        </div>
      </div>

      {/* Experience Section */}
      {sections.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
            <Briefcase size={20} className="text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Experience</h2>
          </div>
          <div className="space-y-4">
            {sections.map((section, idx) => (
              <div key={idx} className="ml-6">
                <p className="font-semibold text-gray-900 text-base">{section}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {educations.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
            <GraduationCap size={20} className="text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Education</h2>
          </div>
          <div className="space-y-3">
            {educations.map((education, idx) => (
              <div key={idx} className="ml-6">
                <p className="font-semibold text-gray-900 text-base">{education}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Section */}
      {skillsList.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
            <Star size={20} className="text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
          </div>
          <div className="flex flex-wrap gap-2 ml-6">
            {skillsList.map((skill, idx) => (
              <span
                key={idx}
                className="inline-block px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
        <p>Professional Resume | Generated with MicroTools Resume Builder</p>
      </div>
    </div>
  )
}
