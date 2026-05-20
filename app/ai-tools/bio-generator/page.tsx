export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import { BioGeneratorForm } from '@/components/ai-tools/BioGeneratorForm'

export const metadata: Metadata = {
  title: 'AI Bio Generator - MicroTools',
  description: 'Create a professional LinkedIn, Twitter, or Instagram bio instantly with AI. Perfect for your social media profile.',
  keywords: 'bio generator, profile bio, LinkedIn bio, Twitter bio, Instagram bio, professional bio',
  openGraph: {
    title: 'AI Bio Generator - MicroTools',
    description: 'Create a professional bio for any platform instantly with AI',
    url: 'https://www.microtoolshub.org/ai-tools/bio-generator',
    type: 'website',
  },
}

export default function BioGeneratorPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3">AI Bio Generator</h1>
        <p className="text-lg text-muted-foreground">
          Create a compelling professional bio for LinkedIn, Twitter, or Instagram in seconds. AI-powered writing that makes you stand out.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-12">
        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
          <h3 className="font-semibold mb-2">🎯 Targeted</h3>
          <p className="text-sm text-muted-foreground">Platform-specific bios that work</p>
        </div>
        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
          <h3 className="font-semibold mb-2">⚡ Quick</h3>
          <p className="text-sm text-muted-foreground">Generated in seconds</p>
        </div>
        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
          <h3 className="font-semibold mb-2">✨ Professional</h3>
          <p className="text-sm text-muted-foreground">Polished and engaging</p>
        </div>
      </div>

      <BioGeneratorForm />

      <div className="mt-12 space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">Tips for a Great Bio</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Include your main title or profession</li>
            <li>Highlight your unique value or expertise</li>
            <li>Use keywords relevant to your industry</li>
            <li>Add a touch of personality</li>
            <li>Include a call-to-action or link when relevant</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">Character Limits by Platform</h2>
          <div className="space-y-2">
            <p>📱 <strong>LinkedIn:</strong> 220 characters</p>
            <p>🐦 <strong>Twitter:</strong> 160 characters</p>
            <p>📷 <strong>Instagram:</strong> 150 characters (bio section)</p>
            <p>👔 <strong>Professional:</strong> 160-200 characters</p>
          </div>
        </section>
      </div>
    </div>
  )
}
