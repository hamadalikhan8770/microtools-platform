import { Metadata } from 'next'
import { ToolCard } from '@/components/tools/tool-card'
import { AdUnit } from '@/components/ads/AdUnit'
import { tools, categories, getFeaturedTools } from '@/lib/tools'
import { SchemaMarkup } from '@/components/common/SchemaMarkup'
import { generateOrganizationSchema, generateWebsiteSchema } from '@/lib/seo/schema'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'MicroTools - Home',
  description: 'Discover 60+ free online tools for health, finance, SEO, and development.',
}

export default function Home() {
  const featured = getFeaturedTools().length > 0 ? getFeaturedTools() : tools.slice(0, 6)
  const featuredMetadata = featured.map(({ calculate, ...tool }) => tool)
  const orgSchema = generateOrganizationSchema()
  const websiteSchema = generateWebsiteSchema()

  return (
    <>
      <SchemaMarkup schema={orgSchema} />
      <SchemaMarkup schema={websiteSchema} />
      <div>
      {/* Hero Section */}
      <div className="container mx-auto max-w-7xl px-4 py-20">
        <div className="text-center mb-16 animate-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            MicroTools
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            60+ free online tools for health calculations, financial planning, data conversion, SEO optimization, and developer utilities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/tools/health"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Explore All Tools
            </a>
            <a
              href="/blog"
              className="px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
            >
              Read Our Blog
            </a>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-20">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`/tools/${category.slug}`}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary hover:shadow-lg hover:scale-105 transition-all"
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="font-bold text-lg mb-2">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.count} tools</p>
            </a>
          ))}
        </div>

        {/* Homepage Ad - Below Categories */}
        <div className="mb-20 bg-secondary/30 rounded-2xl p-6 border border-border">
          <AdUnit slotId="1234567890" format="auto" responsive={true} minHeight="250px" />
        </div>
      </div>

      {/* Featured Tools */}
      <div className="bg-secondary/30 py-20 border-y border-border">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-4xl font-bold mb-12">Popular Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMetadata.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto max-w-7xl px-4 py-20">
        <h2 className="text-4xl font-bold mb-12">Why Choose MicroTools?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: '⚡', title: 'Lightning Fast', desc: 'Calculations happen instantly in your browser' },
            { icon: '🔒', title: 'Completely Private', desc: 'Your data never leaves your device' },
            { icon: '📱', title: 'Mobile Friendly', desc: 'Works perfectly on any device, anytime' },
            { icon: '💯', title: '100% Free', desc: 'No signup, no ads, no hidden costs' },
            { icon: '🎯', title: 'Accurate', desc: 'Based on proven mathematical formulas' },
            { icon: '🔄', title: 'Always Available', desc: 'Works offline once loaded' },
          ].map((feature, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-card border border-border">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Homepage Ad - After Features */}
        <div className="mt-20 bg-secondary/30 rounded-2xl p-6 border border-border">
          <AdUnit slotId="1234567891" format="auto" responsive={true} minHeight="250px" />
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-y border-border py-16">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Choose a tool above or explore by category to find exactly what you need.
          </p>
          <a
            href="/tools/health"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Explore Now
          </a>
        </div>
      </div>
    </div>
    </>
  )
}
