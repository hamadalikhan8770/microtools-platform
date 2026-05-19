export const dynamic = 'force-dynamic'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - MicroTools',
  description: 'Read our terms of service for using MicroTools platform.',
}

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <p className="text-muted-foreground mb-8">
        <strong>Last Updated:</strong> May 2026
      </p>

      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">1. Agreement to Terms</h2>
          <p>
            By accessing and using MicroTools (www.microtoolshub.org), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
          </p>
          <p className="mt-3">
            We may modify these Terms of Service at any time. Your continued use of our Service following the posting of modified Terms means that you accept and agree to the changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">2. Use License</h2>
          <p>
            Permission is granted to use MicroTools and access its tools for personal, non-commercial purposes only. You may:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
            <li>Access and view all available tools</li>
            <li>Perform calculations and use tool features</li>
            <li>Share results with others</li>
            <li>Access the Service from any device</li>
          </ul>
          <p className="mt-3">
            This is a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
            <li>Modify or copy the materials or tools</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to reverse engineer or decompile any software</li>
            <li>Remove any copyright or proprietary notices</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            <li>Attempt to gain unauthorized access to any portion or feature of the Service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">3. Disclaimer of Warranties</h2>
          <p>
            The materials, tools, and information on MicroTools are provided on an "as is" basis without warranties of any kind. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
            <li>Implied warranties of merchantability</li>
            <li>Fitness for a particular purpose</li>
            <li>Non-infringement of third-party rights</li>
            <li>Accuracy or completeness of information</li>
            <li>Compatibility with your device or software</li>
          </ul>
          <p className="mt-3">
            We do not warrant that the Service will be uninterrupted, secure, or error-free, or that defects will be corrected.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">4. Limitations of Liability</h2>
          <p>
            In no event shall MicroTools, its officers, directors, employees, or suppliers be liable for any damages (including, without limitation, damages for loss of data, profit, or use) arising out of:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
            <li>The use or inability to use the Service or materials</li>
            <li>Any inaccuracy or error in the materials or calculations</li>
            <li>The cost of substitute goods or services</li>
            <li>Unauthorized access to your data</li>
            <li>Statements or conduct of any third parties on the Service</li>
            <li>Any other matter relating to the Service</li>
          </ul>
          <p className="mt-3">
            This limitation applies even if we have been advised of the possibility of such damages.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">5. Accuracy of Materials and Information</h2>
          <p>
            The materials appearing on MicroTools could include technical, typographical, or photographic errors. MicroTools does not warrant that any of the materials on its Service are accurate, complete, or current. MicroTools may make changes to the materials contained on its Service at any time without notice.
          </p>
          <p className="mt-3">
            While we strive for accuracy in our calculations and information, we do not guarantee 100% accuracy. All tools should be used for informational purposes only. For critical decisions, consult with appropriate professionals.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">6. Links and Third-Party Materials</h2>
          <p>
            MicroTools has not reviewed all of the sites linked to its Service and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by MicroTools of the site. Use of any such linked website is at the user's own risk.
          </p>
          <p className="mt-3">
            If you believe that a link on our Service violates any rights, please notify us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">7. Modifications to Service</h2>
          <p>
            MicroTools may revise these Terms of Service for its Service at any time without notice. By using this Service, you are agreeing to be bound by the then current version of these Terms of Service.
          </p>
          <p className="mt-3">
            We may modify, suspend, or discontinue the Service (or any part thereof) at any time without liability to you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">8. Governing Law</h2>
          <p>
            These Terms of Service and any separate agreements whereby we provide Services to you are governed by and construed in accordance with the laws of the jurisdiction where the Services are provided.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">9. Prohibited Activities</h2>
          <p>
            You agree that you will not:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
            <li>Use the Service for any illegal purpose or in violation of any applicable laws</li>
            <li>Attempt to gain unauthorized access to the Service or its systems</li>
            <li>Disrupt or interfere with the security or operation of the Service</li>
            <li>Use bots, scrapers, or automated tools to extract data from our Service</li>
            <li>Harass, abuse, or threaten other users</li>
            <li>Post spam, malware, or any harmful content</li>
            <li>Violate the rights of others (intellectual property, privacy, etc.)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">10. Intellectual Property Rights</h2>
          <p>
            All content, features, and functionality of MicroTools (including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, and data compilations) are the exclusive property of MicroTools and are protected by international copyright and other intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">11. User-Generated Content</h2>
          <p>
            If you submit, post, or display content on MicroTools, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, adapt, and distribute your content.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">12. Professional Consultation Disclaimer</h2>
          <p>
            MicroTools provides tools for informational purposes only. Our tools are not a substitute for professional advice from:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
            <li>Healthcare providers for health-related calculations</li>
            <li>Financial advisors for financial calculations</li>
            <li>Attorneys for legal matters</li>
            <li>Licensed professionals in any relevant field</li>
          </ul>
          <p className="mt-3">
            Always consult with qualified professionals before making important decisions based on our tools.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">13. Limitation Period</h2>
          <p>
            Except as otherwise expressly provided by applicable law, any claim arising out of or relating to these Terms or the Service must be filed within one year after such claim arises, or such claim is forever waived.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">14. Severability</h2>
          <p>
            If any provision of these Terms of Service is found to be invalid or unenforceable by a court of competent jurisdiction, such provision shall be modified to the minimum extent necessary to make it valid and enforceable. The remaining provisions shall continue in full force and effect.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">15. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <div className="mt-3 p-4 bg-card border border-border rounded-lg">
            <p className="text-foreground font-semibold">Email: hamadali0032@gmail.com</p>
            <p className="text-foreground font-semibold">Website: www.microtoolshub.org</p>
          </div>
        </section>

        <section className="bg-yellow-500/20 border border-yellow-500/50 rounded-2xl p-6 mt-8">
          <h3 className="font-bold text-lg text-foreground mb-2">⚠️ Acknowledgment</h3>
          <p>
            By using MicroTools, you acknowledge that you have read these Terms of Service, understand them, and agree to be bound by them. If you do not agree to these terms, you must stop using the Service immediately.
          </p>
        </section>
      </div>
    </div>
  )
}
