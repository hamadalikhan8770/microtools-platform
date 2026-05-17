export const dynamic = 'force-dynamic'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - MicroTools',
  description: 'Read our privacy policy to learn how we handle your data.',
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">Introduction</h2>
          <p>
            MicroTools ("we", "our", or "us") operates the www.microtoolshub.org website and service. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">Data Collection</h2>
          <p>
            We collect minimal personal data. Most tools work entirely offline without collecting any information. When you use features that require data storage (like saved tools), we use secure, encrypted storage.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">Analytics</h2>
          <p>
            We use Google Analytics to understand how users interact with our platform. This helps us improve our services. No sensitive personal information is collected. You can opt-out by installing the{' '}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">Advertising (Google AdSense)</h2>
          <p>
            We use Google AdSense to serve advertisements on our service. Google AdSense uses cookies and similar technologies to display personalized ads, track ad performance, and prevent ad fraud.
          </p>
          <p className="mt-3">
            You can control personalized ads by visiting{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Google Ads Settings
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our service. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. Most browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal information at any time. Contact us for any privacy-related questions. If you are in the European Union, you have rights under GDPR including the right to data portability and erasure.
          </p>
        </section>
      </div>
    </div>
  )
}
