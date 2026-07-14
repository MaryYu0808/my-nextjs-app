'use client'

import { Card } from '../components/Card'
import { generateFAQSchema, generateBreadcrumbSchema } from '../lib/seo'

const FAQS = [
  {
    q: 'What is ProcurementAI?',
    a: [
      'ProcurementAI is a structured market intelligence resource for AI-enabled procurement companies.',
      'It helps procurement teams discover, understand, and compare companies by workflow category, use case, automation maturity, and evidence-based classification.',
    ],
  },
  {
    q: 'Who is ProcurementAI built for?',
    a: [
      'ProcurementAI is built for procurement leaders, sourcing teams, category managers, supplier management teams, procurement transformation teams, consultants, investors, and vendors tracking the AI procurement technology market.',
    ],
  },
  {
    q: 'Is ProcurementAI independent?',
    a: [
      'Yes. ProcurementAI does not rank companies based on payment, sponsorship, or partnership.',
      'If sponsored placements or commercial programs are introduced in the future, they will be clearly labeled.',
    ],
  },
  {
    q: 'How are companies categorized?',
    a: [
      'Companies are categorized using a standardized taxonomy that includes workflow category, use cases, and automation maturity.',
      'This structure helps buyers understand where a company appears to fit in the procurement technology landscape. It is not a ranking or endorsement.',
    ],
  },
  {
    q: 'What does automation maturity mean?',
    a: [
      'Automation maturity describes how AI appears to be used in a product.',
      'ProcurementAI currently uses four maturity levels: Assistive, Semi-automated, Autonomous, and Agentic.',
      'Automation maturity is assessed based on available product information, public sources, submitted evidence, and AI-assisted classification. It is not a vendor ranking or measure of overall vendor quality.',
    ],
  },
  {
    q: 'Does ProcurementAI provide reviews or ratings?',
    a: [
      'No. ProcurementAI does not provide open user ratings, paid rankings, or qualitative vendor reviews.',
      'Instead, ProcurementAI provides structured evaluation context, including workflow mapping, use case classification, automation maturity, and evidence-based company information.',
    ],
  },
  {
    q: 'Can anyone submit or edit a company?',
    a: [
      'Yes. ProcurementAI accepts open submissions and correction requests.',
      'However, all submissions are reviewed before publication. Submitted information may be accepted, edited, rejected, or reclassified based on procurement relevance, AI capability evidence, source quality, and taxonomy consistency.',
    ],
  },
  {
    q: 'Does submission guarantee inclusion?',
    a: [
      'No. Submission does not guarantee inclusion, update, ranking, endorsement, or partnership.',
      'ProcurementAI only includes companies that appear relevant to AI-enabled procurement workflows and can be structured consistently within the taxonomy.',
    ],
  },
  {
    q: 'What are related companies?',
    a: [
      'Related companies are selected based on workflow category, use case overlap, and procurement relevance signals.',
      'They are designed to help users explore similar companies within the same or closely related areas of the AI procurement technology market.',
    ],
  },
  {
    q: 'Are related companies direct alternatives?',
    a: [
      'Not necessarily.',
      'Related companies are not ranked recommendations or direct alternatives. They are taxonomy-based discovery suggestions.',
    ],
  },
  {
    q: 'How often is ProcurementAI updated?',
    a: [
      'ProcurementAI is updated on a recurring basis.',
      'Updates may include newly indexed companies, corrections to existing listings, taxonomy improvements, classification changes, and structured revisions based on public sources or submitted evidence.',
    ],
  },
  {
    q: 'Can vendors claim their profiles?',
    a: [
      'Vendor claim is not currently available.',
      'ProcurementAI may introduce claimed profiles in the future to help vendors keep information accurate, provide product evidence, and support buyer evaluation workflows.',
    ],
  },
]

export default function FaqPage() {
  const faqSchema = generateFAQSchema(
    FAQS.map(({ q, a }) => ({
      question: q,
      answer: a.join(' '),
    }))
  )
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.procurementai.ai' },
    { name: 'FAQ', url: 'https://www.procurementai.ai/faq' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="w-full border-b" style={{ background: 'var(--t-page-header-bg)', borderColor: 'var(--t-border)' }}>
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.08]" style={{ color: 'var(--color-text-primary)' }}>
            Frequently Asked Questions
          </h1>
          <p className="text-lg mt-2" style={{ color: 'var(--color-text-secondary)' }}>
            How ProcurementAI works, how listings are organized, and how vendors can keep information accurate.
          </p>
        </div>
      </section>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 mt-6 sm:mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {FAQS.map(({ q, a }) => (
            <Card key={q}>
              <div className="flex gap-3 mb-3">
                <span className="text-sm font-black shrink-0 mt-0.5" style={{ color: 'var(--color-accent-soft)', minWidth: '1rem' }}>Q</span>
                <h2 className="text-sm font-bold leading-snug" style={{ color: 'var(--color-text-primary)' }}>
                  {q}
                </h2>
              </div>
              <div className="border-t mb-3" style={{ borderColor: 'var(--t-border)' }} />
              <div className="flex gap-3">
                <span className="text-sm font-black shrink-0 mt-0.5" style={{ color: 'var(--color-text-muted)', minWidth: '1rem' }}>A</span>
                <div className="space-y-2">
                  {a.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
