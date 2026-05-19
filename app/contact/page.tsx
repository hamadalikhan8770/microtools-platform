export const dynamic = 'force-dynamic'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact - MicroTools',
  description: 'Get in touch with the MicroTools team.',
}

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-muted-foreground mb-8">
        Have feedback, questions, or need support? We're here to help. Reach out to us using any of the methods below.
      </p>

      <div className="space-y-6">
        <div className="bg-card border border-border rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Get in Touch</h2>
          <p className="text-muted-foreground mb-4">
            We'd love to hear from you. Whether you have a question about a tool, found a bug, want to suggest a feature, or just want to say hello - feel free to contact us.
          </p>
          <a
            href="mailto:hamadali0032@gmail.com"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Send Email
          </a>
          <p className="text-muted-foreground mt-4">
            Email: <span className="font-semibold">hamadali0032@gmail.com</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-3">📧 Support</h3>
            <p className="text-muted-foreground text-sm mb-4">
              For general questions, bug reports, or tool support
            </p>
            <a
              href="mailto:hamadali0032@gmail.com?subject=Support Request"
              className="text-primary hover:text-primary/80 font-semibold"
            >
              Get Support →
            </a>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-3">💡 Suggestions</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Have an idea for a new tool? We'd love to hear it!
            </p>
            <a
              href="mailto:hamadali0032@gmail.com?subject=Feature Suggestion"
              className="text-primary hover:text-primary/80 font-semibold"
            >
              Share Idea →
            </a>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-3">🐛 Bug Report</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Found a bug or issue? Help us improve
            </p>
            <a
              href="mailto:hamadali0032@gmail.com?subject=Bug Report"
              className="text-primary hover:text-primary/80 font-semibold"
            >
              Report Bug →
            </a>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-3">🤝 Partnerships</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Interested in collaborating? Let's talk
            </p>
            <a
              href="mailto:hamadali0032@gmail.com?subject=Partnership Inquiry"
              className="text-primary hover:text-primary/80 font-semibold"
            >
              Inquire →
            </a>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6">
          <h3 className="font-bold text-lg text-foreground mb-3">What to Include in Your Email</h3>
          <ul className="text-muted-foreground space-y-2 text-sm">
            <li>• <strong>Subject:</strong> Clear subject line describing your inquiry</li>
            <li>• <strong>Details:</strong> Specific information about your issue or suggestion</li>
            <li>• <strong>Tool Name:</strong> Which tool you're referring to (if applicable)</li>
            <li>• <strong>Device/Browser:</strong> What device and browser you're using</li>
            <li>• <strong>Steps to Reproduce:</strong> How to reproduce the issue (for bugs)</li>
          </ul>
        </div>

        <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6">
          <h3 className="font-bold text-lg text-foreground mb-3">Response Time</h3>
          <p className="text-muted-foreground text-sm">
            We typically respond to inquiries within 24-48 hours during business days. We appreciate your patience and your interest in MicroTools!
          </p>
        </div>
      </div>

      <div className="mt-12 border-t border-border pt-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground mb-6">
          Before contacting us, check if your question is answered in our FAQ.
        </p>
        <a
          href="/faq"
          className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          View FAQ
        </a>
      </div>
    </div>
  )
}
