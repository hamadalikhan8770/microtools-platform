export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import { EmailWriterForm } from '@/components/ai-tools/EmailWriterForm'

export const metadata: Metadata = {
  title: 'AI Email Writer - MicroTools',
  description: 'Generate professional emails instantly with AI. Perfect for business communication, follow-ups, and more.',
  keywords: 'email generator, email writer, professional email, email template',
  openGraph: {
    title: 'AI Email Writer - MicroTools',
    description: 'Generate professional emails instantly with AI',
    url: 'https://www.microtoolshub.org/ai-tools/email-writer',
    type: 'website',
  },
}

export default function EmailWriterPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3">AI Email Writer</h1>
        <p className="text-lg text-muted-foreground">
          Compose professional emails in seconds. Whether it's a follow-up, proposal, or general inquiry, AI helps you write the perfect message.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-12">
        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
          <h3 className="font-semibold mb-2">💼 Professional</h3>
          <p className="text-sm text-muted-foreground">Polished business-ready content</p>
        </div>
        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
          <h3 className="font-semibold mb-2">⏱️ Time-Saving</h3>
          <p className="text-sm text-muted-foreground">Draft emails in seconds</p>
        </div>
        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
          <h3 className="font-semibold mb-2">🎯 Effective</h3>
          <p className="text-sm text-muted-foreground">Clear and persuasive messaging</p>
        </div>
      </div>

      <EmailWriterForm />

      <div className="mt-12 space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">Use Cases</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Follow-ups:</strong> After meetings, interviews, or proposals</li>
            <li><strong>Outreach:</strong> To potential clients, partners, or collaborators</li>
            <li><strong>Requests:</strong> For information, meetings, or resources</li>
            <li><strong>Announcements:</strong> Internal or external communications</li>
            <li><strong>Apologies:</strong> Professional and sincere apology emails</li>
            <li><strong>Thank You:</strong> Appreciation and gratitude messages</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">Email Writing Tips</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Always include a clear subject line</li>
            <li>Personalize when possible with recipient's name</li>
            <li>Keep it concise but informative</li>
            <li>Include a clear call-to-action</li>
            <li>Proofread before sending</li>
            <li>Use a professional greeting and sign-off</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">FAQ</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Can I customize the generated email?</h3>
              <p>Yes! Copy the email and edit it to match your voice and specific needs.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Is my email content private?</h3>
              <p>Yes. Your emails are generated in real-time and not stored on our servers.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
