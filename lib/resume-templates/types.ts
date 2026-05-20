export interface ResumeData {
  fullName: string
  email: string
  phone: string
  summary: string
  experience: string
  education: string
  skills: string
  selectedTemplate: string
}

export interface ResumeTemplate {
  id: string
  name: string
  description: string
  preview: string
  styling: {
    colors: {
      primary: string
      secondary: string
      text: string
      background: string
      accent?: string
    }
    fontSizes: {
      h1: string
      h2: string
      body: string
      small: string
    }
    spacing: {
      padding: string
      margin: string
      lineHeight: string
    }
  }
  sections: TemplateSection[]
}

export interface TemplateSection {
  id: string
  title: string
  icon?: string
  content?: string
}

export type TemplateType = 'modern' | 'minimal' | 'ats'
