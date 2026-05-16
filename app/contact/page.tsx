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
        Have feedback or questions? We'd love to hear from you.
      </p>
      <div className="bg-card border border-border rounded-2xl p-8">
        <p className="text-muted-foreground">
          Email us at:{' '}
          <a
            href="mailto:hamadali0032@gmail.com"
            className="text-primary hover:text-primary/80 font-semibold"
          >
            hamadali0032@gmail.com
          </a>
        </p>
      </div>
    </div>
  )
}
