export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Tools - MicroTools',
  description: 'Free AI-powered generators for resumes, bios, emails, and more. Create professional content in seconds.',
  keywords: 'AI tools, AI generators, resume generator, bio generator, email writer',
  openGraph: {
    title: 'AI Tools - MicroTools',
    description: 'Free AI-powered generators and writers',
    url: 'https://www.microtoolshub.org/ai-tools',
    type: 'website',
  },
}

const aiTools = [
  {
    id: 'resume-generator',
    name: 'AI Resume Generator',
    description: 'Create a professional, ATS-friendly resume in seconds. Let AI help format and structure your work experience.',
    icon: '📄',
    benefits: ['ATS-optimized', 'Professional format', 'Instant generation'],
    href: '/ai-tools/resume-generator',
  },
  {
    id: 'proposal-generator',
    name: 'AI Proposal Generator',
    description: 'Generate winning business proposals instantly. Impress clients with professional, well-structured proposals.',
    icon: '💼',
    benefits: ['Professional format', 'Persuasive content', 'Customizable'],
    href: '/ai-tools/proposal-generator',
  },
  {
    id: 'email-writer',
    name: 'AI Email Writer',
    description: 'Write professional emails for any purpose. Follow-ups, proposals, outreach, and more.',
    icon: '✉️',
    benefits: ['Multiple purposes', 'Customizable tone', 'Ready to send'],
    href: '/ai-tools/email-writer',
  },
  {
    id: 'bio-generator',
    name: 'AI Bio Generator',
    description: 'Generate compelling professional bios for LinkedIn, Twitter, or Instagram. Perfect for all platforms.',
    icon: '👤',
    benefits: ['Platform-specific', 'Multiple tones', 'Character count tracking'],
    href: '/ai-tools/bio-generator',
  },
]

export default function AIToolsPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4">AI Tools Suite</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Powerful AI-powered generators to create professional content instantly. All tools are free and require no setup.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {aiTools.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            className="group block"
          >
            <div className="bg-card border border-border rounded-xl p-6 h-full hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="text-5xl mb-4">{tool.icon}</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{tool.name}</h3>
              <p className="text-muted-foreground mb-4 text-sm">{tool.description}</p>

              <div className="space-y-2 mb-6">
                {tool.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-primary">✓</span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors group-hover:shadow-md">
                Try Now →
              </button>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 bg-primary/10 border border-primary/30 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-4">Why Use AI Tools?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">⚡ Save Time</h3>
            <p className="text-muted-foreground">Create professional content in seconds instead of hours</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">✨ Professional Quality</h3>
            <p className="text-muted-foreground">AI-generated content is polished and ready to use</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">🎯 Always Available</h3>
            <p className="text-muted-foreground">Access tools anytime, anywhere - no sign up required</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">🔒 Private & Secure</h3>
            <p className="text-muted-foreground">Your data is processed instantly and never stored</p>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-6">Browse All Tools</h2>
        <Link href="/tools" className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
          View All 60+ Tools
        </Link>
      </div>
    </div>
  )
}
