export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import { ResumeGeneratorForm } from '@/components/ai-tools/ResumeGeneratorForm'

export const metadata: Metadata = {
  title: 'AI Resume Generator - MicroTools',
  description: 'Create a professional resume instantly with AI. Customize your resume with your information and download in minutes.',
  keywords: 'resume generator, AI resume builder, professional resume, resume maker',
  openGraph: {
    title: 'AI Resume Generator - MicroTools',
    description: 'Create a professional resume instantly with AI',
    url: 'https://www.microtoolshub.org/ai-tools/resume-generator',
    type: 'website',
  },
}

export default function ResumeGeneratorPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3">AI Resume Generator</h1>
        <p className="text-lg text-muted-foreground">
          Create a professional, ATS-friendly resume in seconds. Enter your information and let AI help you craft the perfect resume.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
          <h3 className="font-semibold mb-2">⚡ Instant Generation</h3>
          <p className="text-sm text-muted-foreground">Get a professionally formatted resume in seconds</p>
        </div>
        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
          <h3 className="font-semibold mb-2">📋 ATS-Friendly</h3>
          <p className="text-sm text-muted-foreground">Optimized for applicant tracking systems</p>
        </div>
        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
          <h3 className="font-semibold mb-2">✏️ Customizable</h3>
          <p className="text-sm text-muted-foreground">Edit and refine your resume easily</p>
        </div>
      </div>

      <ResumeGeneratorForm />

      <div className="mt-12 space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-3">How It Works</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Enter your personal information, work experience, education, and skills</li>
            <li>Click "Generate Resume" and let AI format your information professionally</li>
            <li>Review the generated resume in the preview</li>
            <li>Make any adjustments directly in the preview</li>
            <li>Copy or download your resume</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Tips for Best Results</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Include specific achievements and quantifiable results in your experience</li>
            <li>List relevant skills that match job descriptions you're targeting</li>
            <li>Use action verbs like "Led", "Designed", "Developed", "Managed"</li>
            <li>Include dates for all positions and education</li>
            <li>Proofread the generated resume before submitting to employers</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">FAQ</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">Is my information stored?</h3>
              <p className="text-muted-foreground">No. All information is processed in real-time and not stored on our servers.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Can I edit the generated resume?</h3>
              <p className="text-muted-foreground">Yes. You can copy the text and edit it in any word processor or use our editor.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">What format will my resume be in?</h3>
              <p className="text-muted-foreground">The resume is generated in markdown format, which can be easily copied to Word, Google Docs, or other editors.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
