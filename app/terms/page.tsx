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
      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">1. Agreement to Terms</h2>
          <p>
            By accessing and using MicroTools, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software) on MicroTools for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">3. Disclaimer</h2>
          <p>
            The materials on MicroTools are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">4. Limitations</h2>
          <p>
            In no event shall MicroTools or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit) arising out of the use or inability to use the materials on MicroTools.
          </p>
        </section>
      </div>
    </div>
  )
}
