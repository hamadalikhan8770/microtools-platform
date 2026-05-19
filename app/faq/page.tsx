export const dynamic = 'force-dynamic'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ - MicroTools',
  description: 'Frequently asked questions about MicroTools and how to use our free online tools.',
}

export default function FAQPage() {
  const faqs = [
    {
      question: 'Are all MicroTools really free?',
      answer: 'Yes, 100% free. All our tools are completely free to use with no hidden fees, subscriptions, or premium features. We support ourselves through ethical advertising.'
    },
    {
      question: 'Do I need to create an account?',
      answer: 'No, account creation is not required. You can use all tools instantly without signing up. Your calculations are performed locally in your browser.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, your data is secure. All calculations happen in your browser locally, and we never store or transmit your personal data to external servers. Your privacy is our priority.'
    },
    {
      question: 'How accurate are the calculations?',
      answer: 'Our tools use industry-standard formulas and calculations. However, these tools are for informational purposes. For critical decisions (medical, financial), consult with professionals.'
    },
    {
      question: 'Can I use these tools offline?',
      answer: 'Yes, once a tool is loaded in your browser, it continues to work offline. All calculations happen locally without requiring an internet connection.'
    },
    {
      question: 'Which browsers are supported?',
      answer: 'MicroTools works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience.'
    },
    {
      question: 'Can I share my results?',
      answer: 'Yes, you can copy results and share them. Tools also support exporting data in various formats. You have full control over your results.'
    },
    {
      question: 'How often are tools updated?',
      answer: 'We regularly update our tools to improve accuracy and add new features. Formula updates are based on the latest standards and user feedback.'
    },
    {
      question: 'Do you collect any personal data?',
      answer: 'We collect minimal data through Google Analytics to understand how users interact with our platform. We do not collect sensitive personal information. You can control personalized ads through your browser settings.'
    },
    {
      question: 'How can I report a bug or suggest a feature?',
      answer: 'We welcome feedback. Please contact us at hamadali0032@gmail.com with details about bugs or feature requests. We review and implement suggestions regularly.'
    },
    {
      question: 'Is MicroTools available on mobile devices?',
      answer: 'Yes, MicroTools is fully responsive and works perfectly on mobile devices including smartphones and tablets.'
    },
    {
      question: 'Can I embed MicroTools on my website?',
      answer: 'Currently, we do not offer embedding features, but this is something we may explore in the future. Contact us if you are interested.'
    }
  ]

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
      <p className="text-muted-foreground mb-12">
        Find answers to common questions about MicroTools. If you don't find what you're looking for, feel free to contact us.
      </p>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors">
            <h3 className="font-bold text-lg mb-3 text-foreground">{faq.question}</h3>
            <p className="text-muted-foreground">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-primary/10 border border-primary/30 rounded-2xl">
        <h3 className="font-bold text-lg mb-2">Didn't find what you're looking for?</h3>
        <p className="text-muted-foreground mb-4">
          Have another question? We'd love to help. Reach out to our team.
        </p>
        <a
          href="/contact"
          className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          Contact Us
        </a>
      </div>
    </div>
  )
}
