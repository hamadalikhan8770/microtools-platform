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
          MicroTools is a comprehensive suite of free online tools designed to help you with health calculations, financial planning, file conversions, SEO optimization, and development utilities. Our platform serves millions of users worldwide who need quick, reliable, and accurate calculations without sign-ups or subscriptions.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Our Mission</h2>
        <p>
          We believe that access to useful tools should be free and available to everyone. Our mission is to provide accurate, fast, and user-friendly tools that help people accomplish their daily tasks without any barriers. Whether you're a student calculating your BMI, a freelancer estimating project rates, or a developer formatting JSON, MicroTools is here to help.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">What We Offer</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-foreground mb-2">60+ Free Tools</h3>
            <p>
              Our platform includes tools across multiple categories: Health (BMI, calories, fitness), Finance (loans, investments, taxes), Converters (file formats, units), SEO (analytics, optimization), and Developer Tools (formatters, generators, encoders).
            </p>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-2">Quality & Accuracy</h3>
            <p>
              All tools are built using industry-standard formulas and best practices. We regularly update our calculations to reflect the latest standards and methodologies. However, for critical decisions, we recommend consulting with professionals.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-2">Privacy First</h3>
            <p>
              Your privacy is our top priority. All calculations happen locally in your browser. We do not store or transmit your personal data to external servers. You have complete control over your information.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Why Choose MicroTools?</h2>
        <ul className="space-y-3 list-disc list-inside">
          <li><strong>100% Free</strong> - No hidden fees, subscriptions, or premium features</li>
          <li><strong>No Sign-up Required</strong> - Use tools instantly without creating an account</li>
          <li><strong>Lightning Fast</strong> - Optimized for speed with instant calculations</li>
          <li><strong>Completely Secure</strong> - All calculations done locally in your browser</li>
          <li><strong>Mobile Friendly</strong> - Works perfectly on smartphones, tablets, and computers</li>
          <li><strong>Always Available</strong> - Works offline once loaded in your browser</li>
          <li><strong>Regularly Updated</strong> - New tools added and existing ones improved continuously</li>
          <li><strong>No Ads Tracking</strong> - We're transparent about how we use cookies and data</li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Our Values</h2>
        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-foreground mb-1">Accessibility</h3>
            <p>
              Tools should be accessible to everyone, regardless of technical skill or financial means. We maintain zero barriers to entry.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-1">Accuracy</h3>
            <p>
              We use proven formulas and regularly validate our calculations against industry standards.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-1">Privacy</h3>
            <p>
              Your data belongs to you. We never sell, share, or misuse your information.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-1">Quality</h3>
            <p>
              We maintain high standards for code quality, performance, and user experience.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Contact & Support</h2>
        <p>
          Have questions, found a bug, or want to suggest a feature? We'd love to hear from you! Reach out to us at{' '}
          <a
            href="mailto:hamadali0032@gmail.com"
            className="text-primary hover:text-primary/80 font-semibold"
          >
            hamadali0032@gmail.com
          </a>.
        </p>

        <div className="bg-primary/10 border border-primary/30 rounded-2xl p-6 mt-8">
          <h3 className="font-bold text-lg text-foreground mb-2">Ready to explore?</h3>
          <p className="mb-4">
            Check out our full collection of tools to see how we can help you.
          </p>
          <a
            href="/tools"
            className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Explore All Tools
          </a>
        </div>
      </div>
    </div>
  )
}
