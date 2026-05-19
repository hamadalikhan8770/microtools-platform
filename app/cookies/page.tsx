export const dynamic = 'force-dynamic'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy - MicroTools',
  description: 'Learn about cookies and tracking technologies used on MicroTools.',
}

export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">What Are Cookies?</h2>
          <p>
            Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit websites. They help websites remember information about your visit and provide a better user experience.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">How We Use Cookies</h2>
          <p>
            MicroTools uses cookies and similar tracking technologies to:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
            <li>Remember your preferences and settings (theme, language)</li>
            <li>Understand how you use our platform through Google Analytics</li>
            <li>Serve personalized advertisements through Google AdSense</li>
            <li>Track ad performance and prevent ad fraud</li>
            <li>Improve our services based on user behavior</li>
            <li>Ensure our website functions properly</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">Types of Cookies</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Essential Cookies</h3>
              <p>
                These cookies are necessary for the website to function properly. They are used for security and basic functionality. You cannot disable these cookies as they are required for the site to work.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Analytics Cookies</h3>
              <p>
                We use Google Analytics cookies to understand how visitors interact with our site. This information helps us improve content and user experience. These cookies are anonymous and do not identify you personally.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Advertising Cookies</h3>
              <p>
                Google AdSense uses cookies to serve advertisements tailored to your interests. These cookies help track ad performance and prevent fraud. You can control personalized ads through your Google Ads Settings.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Preference Cookies</h3>
              <p>
                We use preference cookies to remember your settings like theme preference (dark/light mode) and language choice, enhancing your user experience on subsequent visits.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">Third-Party Cookies</h2>
          <p>
            We use third-party services that may place cookies on your device:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
            <li><strong>Google Analytics:</strong> Analyzes website traffic and user behavior</li>
            <li><strong>Google AdSense:</strong> Serves advertisements and tracks ad performance</li>
            <li><strong>Google Tag Manager:</strong> Manages tracking and analytics tags</li>
          </ul>
          <p className="mt-4">
            These services have their own privacy policies that you can review on their respective websites.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">How to Control Cookies</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Browser Settings</h3>
              <p>
                You can control cookies through your browser settings. Most browsers allow you to refuse cookies or alert you when a cookie is being sent. Here are instructions for popular browsers:
              </p>
              <ul className="list-disc list-inside space-y-1 mt-2 ml-2 text-sm">
                <li><a href="https://support.google.com/chrome/answer/95647" className="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">Chrome Cookie Settings</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" className="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">Firefox Cookie Settings</a></li>
                <li><a href="https://support.apple.com/en-us/guide/safari/sfri11471/mac" className="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">Safari Cookie Settings</a></li>
                <li><a href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies" className="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">Edge Cookie Settings</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Google Analytics Opt-out</h3>
              <p>
                You can opt out of Google Analytics by installing the{' '}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Google Ads Personalization</h3>
              <p>
                Control personalized ads by visiting{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Google Ads Settings
                </a>.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">Cookie Consent</h2>
          <p>
            When you first visit MicroTools, you will see a cookie consent banner. By continuing to use our site, you consent to the use of cookies as described in this policy. You can manage your preferences at any time through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">Legal Basis for Cookies</h2>
          <p>
            We use cookies based on your consent (obtained through the cookie banner) and our legitimate interests in improving your experience and understanding how our platform is used. For users in the EU/EEA, we comply with GDPR and ePrivacy Directive requirements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">Changes to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. We encourage you to review this policy periodically to stay informed about how we use cookies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">Contact Us</h2>
          <p>
            If you have questions about our cookie practices or this policy, please contact us at{' '}
            <a
              href="mailto:hamadali0032@gmail.com"
              className="text-primary hover:text-primary/80 font-semibold"
            >
              hamadali0032@gmail.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  )
}
