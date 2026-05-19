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
      <p className="text-muted-foreground mb-8">
        <strong>Last Updated:</strong> May 2026
      </p>

      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">Introduction</h2>
          <p>
            MicroTools ("we", "our", "us", or "MicroTools") operates the www.microtoolshub.org website and service (the "Service"). This Privacy Policy explains our practices regarding the collection, use, disclosure, and protection of your information when you use our Service.
          </p>
          <p className="mt-3">
            We are committed to protecting your privacy. If you have any questions about this Privacy Policy or our privacy practices, please contact us at hamadali0032@gmail.com.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">1. Information We Collect</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-foreground mb-2">Information You Provide</h3>
              <p>
                We collect minimal personal information. Our tools are designed to work locally on your device without requiring you to share personal data. However, when you contact us or submit feedback, we may collect:
              </p>
              <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                <li>Email address</li>
                <li>Name (optional)</li>
                <li>Message content</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-2">Automatically Collected Information</h3>
              <p>
                When you use our Service, we automatically collect certain information through Google Analytics and similar technologies:
              </p>
              <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device type and operating system</li>
                <li>Pages visited and time spent on each page</li>
                <li>Referral source</li>
                <li>Approximate geographic location (country level)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-2">Calculation Data</h3>
              <p>
                <strong>Important:</strong> All calculations performed on our tools are done entirely in your browser and are NOT transmitted to our servers or stored anywhere. Your data never leaves your device.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">2. How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
            <li><strong>Service Improvement:</strong> To understand how users interact with our tools and improve our platform</li>
            <li><strong>Communication:</strong> To respond to your inquiries and send updates if requested</li>
            <li><strong>Analytics:</strong> To track usage patterns and optimize performance</li>
            <li><strong>Advertising:</strong> To serve relevant advertisements through Google AdSense</li>
            <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
            <li><strong>Security:</strong> To prevent fraud and ensure the security of our Service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">3. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies, web beacons, and similar tracking technologies to collect information about your browsing activities and preferences. These technologies help us:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
            <li>Remember your preferences (theme, language)</li>
            <li>Understand how you use our Service</li>
            <li>Serve personalized advertisements</li>
            <li>Prevent fraud and ensure security</li>
          </ul>
          <p className="mt-3">
            For detailed information about cookies, please see our <a href="/cookies" className="text-primary hover:text-primary/80 font-semibold">Cookie Policy</a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">4. Third-Party Services</h2>
          <p>We use third-party services that may collect information about you:</p>
          <div className="space-y-3 mt-3">
            <div>
              <h3 className="font-bold text-foreground mb-1">Google Analytics</h3>
              <p>
                We use Google Analytics to track and analyze how users interact with our Service. Google may use cookies and similar technologies to collect and analyze information about your use of the Service. For more information about Google's privacy practices, visit{' '}
                <a href="https://www.google.com/policies/privacy/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                  Google Privacy Policy
                </a>.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-1">Google AdSense</h3>
              <p>
                We use Google AdSense to serve advertisements on our Service. Google AdSense uses cookies to track ad performance and serve targeted ads. You can opt out of personalized ads through{' '}
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                  Google Ads Settings
                </a>.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">5. Data Security</h2>
          <p>
            We take the security of your data seriously. We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security of your data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">6. Your Rights (GDPR - EU/EEA Users)</h2>
          <p>
            If you are a resident of the European Union or European Economic Area, you have certain rights regarding your personal data under the General Data Protection Regulation (GDPR):
          </p>
          <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
            <li><strong>Right to Access:</strong> You can request a copy of your personal data</li>
            <li><strong>Right to Rectification:</strong> You can request correction of inaccurate data</li>
            <li><strong>Right to Erasure:</strong> You can request deletion of your data ("right to be forgotten")</li>
            <li><strong>Right to Restrict Processing:</strong> You can request we limit how we process your data</li>
            <li><strong>Right to Data Portability:</strong> You can request your data in a portable format</li>
            <li><strong>Right to Object:</strong> You can object to processing of your data</li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, please contact us at hamadali0032@gmail.com.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">7. Children's Privacy</h2>
          <p>
            Our Service is not targeted to children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information immediately. Parents or guardians who believe their child has provided information to us should contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">8. Data Retention</h2>
          <p>
            We retain your data only for as long as necessary to provide our Service and comply with legal obligations. Automatically collected data through Google Analytics is typically retained for 26 months. You can adjust retention settings through your Google Analytics account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">9. International Data Transfers</h2>
          <p>
            Your information may be transferred to, stored in, and processed in countries other than your country of residence. These countries may not have data protection laws that provide the same level of protection as your home country. By using our Service, you consent to the transfer of your information to countries outside your country of residence, which may have different data protection rules.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">10. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by updating the "Last Updated" date at the top of this policy. Your continued use of the Service constitutes your acceptance of the updated Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">11. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
          </p>
          <div className="mt-3 p-4 bg-card border border-border rounded-lg">
            <p className="text-foreground font-semibold">Email: hamadali0032@gmail.com</p>
            <p className="text-foreground font-semibold">Website: www.microtoolshub.org</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">12. Legal Basis for Processing</h2>
          <p>
            We process your personal data based on the following legal grounds:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
            <li><strong>Consent:</strong> When you consent to data processing (through our cookie banner)</li>
            <li><strong>Legitimate Interest:</strong> To improve our Service and understand user needs</li>
            <li><strong>Legal Obligation:</strong> To comply with applicable laws and regulations</li>
          </ul>
        </section>
      </div>

      <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/30 rounded-2xl">
        <h3 className="font-bold text-lg text-foreground mb-2">Your Privacy Matters to Us</h3>
        <p className="text-muted-foreground text-sm">
          We are committed to protecting your privacy. If you have concerns about how your data is being used, please don't hesitate to contact us. We will work with you to resolve any privacy issues.
        </p>
      </div>
    </div>
  )
}
