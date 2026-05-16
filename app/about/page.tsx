export const dynamic = 'force-dynamic'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - MicroTools',
  description: 'Learn about MicroTools platform and our mission to provide free online tools.',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">About MicroTools</h1>
      <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
        <p>
          MicroTools is a comprehensive suite of free online tools designed to help you with health calculations, financial planning, file conversions, SEO optimization, and development utilities.
        </p>
        <p>
          Our mission is to provide accurate, fast, and user-friendly tools that help millions of people every day accomplish their tasks without any barriers.
        </p>
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Why MicroTools?</h2>
        <ul className="space-y-2 list-disc list-inside">
          <li>100% Free - No hidden fees or premium features</li>
          <li>No Sign-up Required - Use tools instantly</li>
          <li>Fast & Reliable - Optimized for speed</li>
          <li>Secure - All calculations done locally</li>
          <li>Mobile Friendly - Works on any device</li>
        </ul>
      </div>
    </div>
  )
}
