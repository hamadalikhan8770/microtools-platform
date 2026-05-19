export const dynamic = 'force-dynamic'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer - MicroTools',
  description: 'Important disclaimer regarding the use of MicroTools and its calculations.',
}

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Disclaimer</h1>
      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">General Disclaimer</h2>
          <p>
            The information provided by MicroTools on this website and all related tools is for general informational purposes only. While we strive to provide accurate and up-to-date information, MicroTools makes no warranties or representations, express or implied, about the accuracy, completeness, or reliability of the information contained on this website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">Use "As Is"</h2>
          <p>
            All materials, tools, and content on MicroTools are provided on an "as is" basis without any warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">Limitation of Liability</h2>
          <p>
            In no event shall MicroTools, its owners, operators, or affiliates be liable for any damages (including, without limitation, damages for loss of data, profit, or use) arising out of:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
            <li>The use or inability to use the website or tools</li>
            <li>The cost of substitute goods or services</li>
            <li>Any errors or omissions in the information provided</li>
            <li>The inaccuracy of any calculations or results</li>
            <li>Decisions made based on the tools or information provided</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">Health-Related Tools</h2>
          <p>
            The health calculators and tools on MicroTools (BMI, calorie calculator, fitness tools, etc.) are provided for educational and informational purposes only. They are not meant to diagnose, treat, cure, or prevent any disease or health condition.
          </p>
          <p className="mt-3">
            <strong>Important:</strong> These tools should not replace professional medical advice. Always consult with a qualified healthcare provider before making any health-related decisions. Your individual circumstances may require personalized medical advice that these tools cannot provide.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">Financial Tools Disclaimer</h2>
          <p>
            Financial calculators (EMI, loan calculator, mortgage calculator, investment tools, etc.) are for informational purposes only and do not constitute financial advice. Actual results may vary significantly based on market conditions, interest rate changes, and other factors.
          </p>
          <p className="mt-3">
            <strong>Important:</strong> Before making any financial decisions, please consult with a qualified financial advisor. Past performance does not guarantee future results. Investments carry risk, including the potential loss of principal.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">Accuracy of Calculations</h2>
          <p>
            While we use industry-standard formulas and methodologies, MicroTools does not guarantee the accuracy of calculations. The results are approximations and may not account for all variables relevant to your specific situation. Results should be verified with professional experts where appropriate.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">Third-Party Content and Links</h2>
          <p>
            MicroTools may contain links to external websites and resources. We are not responsible for the content, accuracy, or practices of external websites. Visiting external sites is at your own risk and subject to their terms and conditions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">Changes to Tools and Content</h2>
          <p>
            MicroTools reserves the right to modify, update, or discontinue any tools, services, or content without notice. We are not responsible for any consequences resulting from such changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">Data Accuracy</h2>
          <p>
            While we maintain our data and tools to the best of our ability, we do not guarantee that all information is current or accurate. Data sources, algorithms, and formulas may be updated periodically.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">User Responsibility</h2>
          <p>
            Users of MicroTools are responsible for:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
            <li>Verifying information before taking any action based on it</li>
            <li>Consulting with appropriate professionals for decisions</li>
            <li>Understanding that calculations are approximations</li>
            <li>Reviewing all terms and conditions before use</li>
            <li>Using the tools lawfully and ethically</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">Professional Consultation Recommended</h2>
          <p>
            For critical decisions related to:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
            <li><strong>Health:</strong> Consult with doctors, healthcare providers, or nutritionists</li>
            <li><strong>Finance:</strong> Consult with financial advisors, accountants, or tax professionals</li>
            <li><strong>Legal:</strong> Consult with qualified attorneys</li>
            <li><strong>Technical:</strong> Consult with software engineers or IT professionals</li>
          </ul>
          <p className="mt-3">
            Professional guidance ensures personalized advice tailored to your specific circumstances.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">Severability</h2>
          <p>
            If any part of this disclaimer is found to be invalid or unenforceable, the remaining parts shall continue in full force and effect.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">Governing Law</h2>
          <p>
            This disclaimer shall be governed by and construed in accordance with applicable laws.
          </p>
        </section>

        <section className="bg-yellow-500/20 border border-yellow-500/50 rounded-2xl p-6 mt-8">
          <h3 className="font-bold text-lg text-foreground mb-2">⚠️ Important Notice</h3>
          <p>
            By using MicroTools, you acknowledge that you have read this disclaimer, understand its contents, and agree to be bound by its terms. If you do not agree with any part of this disclaimer, please do not use this website or its tools.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">Questions or Concerns?</h2>
          <p>
            If you have questions about this disclaimer or our tools, please contact us at{' '}
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
