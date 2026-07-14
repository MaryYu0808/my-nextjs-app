'use client'

import Link from 'next/link'
import { Card } from '../components/Card'
import { generateOrganizationSchema, generateBreadcrumbSchema } from '../lib/seo'

type IconName =
  | 'spark'
  | 'grid'
  | 'shield'
  | 'compass'
  | 'scope'
  | 'layers'
  | 'brain'
  | 'check'
  | 'eyeoff'
  | 'users'
  | 'building'
  | 'arrow'

function Icon({ name, className = 'h-4 w-4' }: { name: IconName; className?: string }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  const themedStyle = { color: 'var(--color-accent-soft)' }

  if (name === 'spark') {
    return (
      <svg viewBox="0 0 24 24" className={className} style={themedStyle} aria-hidden="true">
        <path {...common} d="m12 3 1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3Z" />
        <path {...common} d="m19 14 1 2.2L22 17l-2 0.8L19 20l-0.9-2.2L16 17l2.1-0.8L19 14Z" />
      </svg>
    )
  }

  if (name === 'grid') {
    return (
      <svg viewBox="0 0 24 24" className={className} style={themedStyle} aria-hidden="true">
        <rect {...common} x="4" y="4" width="7" height="7" rx="1.2" />
        <rect {...common} x="13" y="4" width="7" height="7" rx="1.2" />
        <rect {...common} x="4" y="13" width="7" height="7" rx="1.2" />
        <rect {...common} x="13" y="13" width="7" height="7" rx="1.2" />
      </svg>
    )
  }

  if (name === 'shield') {
    return (
      <svg viewBox="0 0 24 24" className={className} style={themedStyle} aria-hidden="true">
        <path {...common} d="M12 3 5 6.2v5.4c0 4.5 2.9 7.2 7 9.4 4.1-2.2 7-4.9 7-9.4V6.2L12 3Z" />
        <path {...common} d="m9.2 12.3 2 2 3.6-3.7" />
      </svg>
    )
  }

  if (name === 'compass') {
    return (
      <svg viewBox="0 0 24 24" className={className} style={themedStyle} aria-hidden="true">
        <circle {...common} cx="12" cy="12" r="8.5" />
        <path {...common} d="m15.8 8.2-2.3 6-6 2.3 2.3-6 6-2.3Z" />
      </svg>
    )
  }

  if (name === 'scope') {
    return (
      <svg viewBox="0 0 24 24" className={className} style={themedStyle} aria-hidden="true">
        <circle {...common} cx="12" cy="12" r="7.5" />
        <path {...common} d="M12 2.8v4.1M12 17.1v4.1M21.2 12h-4.1M6.9 12H2.8" />
      </svg>
    )
  }

  if (name === 'layers') {
    return (
      <svg viewBox="0 0 24 24" className={className} style={themedStyle} aria-hidden="true">
        <path {...common} d="m12 4 8 4-8 4-8-4 8-4Z" />
        <path {...common} d="m4 12 8 4 8-4" />
        <path {...common} d="m4 16 8 4 8-4" />
      </svg>
    )
  }

  if (name === 'brain') {
    return (
      <svg viewBox="0 0 24 24" className={className} style={themedStyle} aria-hidden="true">
        <path {...common} d="M9.5 5a3 3 0 0 0-3 3v.3A2.7 2.7 0 0 0 4 11a2.8 2.8 0 0 0 2.2 2.7V14a3 3 0 0 0 3 3h1.3" />
        <path {...common} d="M14.5 5a3 3 0 0 1 3 3v.3A2.7 2.7 0 0 1 20 11a2.8 2.8 0 0 1-2.2 2.7V14a3 3 0 0 1-3 3h-1.3" />
        <path {...common} d="M10.5 8.2a2.2 2.2 0 0 1 3 0M12 8v8" />
      </svg>
    )
  }

  if (name === 'check') {
    return (
      <svg viewBox="0 0 24 24" className={className} style={themedStyle} aria-hidden="true">
        <circle {...common} cx="12" cy="12" r="8.5" />
        <path {...common} d="m8.5 12.3 2.4 2.4 4.8-4.8" />
      </svg>
    )
  }

  if (name === 'eyeoff') {
    return (
      <svg viewBox="0 0 24 24" className={className} style={themedStyle} aria-hidden="true">
        <path {...common} d="M3.5 12s3-5 8.5-5 8.5 5 8.5 5-3 5-8.5 5-8.5-5-8.5-5Z" />
        <path {...common} d="m4 4 16 16" />
      </svg>
    )
  }

  if (name === 'users') {
    return (
      <svg viewBox="0 0 24 24" className={className} style={themedStyle} aria-hidden="true">
        <circle {...common} cx="9" cy="9" r="3" />
        <circle {...common} cx="17" cy="10" r="2.5" />
        <path {...common} d="M4.5 18a4.5 4.5 0 0 1 9 0M14 18a3.5 3.5 0 0 1 6 0" />
      </svg>
    )
  }

  if (name === 'building') {
    return (
      <svg viewBox="0 0 24 24" className={className} style={themedStyle} aria-hidden="true">
        <path {...common} d="M4 20V6.5L12 4l8 2.5V20" />
        <path {...common} d="M9 20v-4h6v4M8 9h.01M12 9h.01M16 9h.01M8 12h.01M12 12h.01M16 12h.01" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className={className} style={themedStyle} aria-hidden="true">
      <path {...common} d="m8 6 8 6-8 6" />
    </svg>
  )
}

export default function AboutPage() {
  const maturityLevels = [
    {
      title: 'Assistive',
      text: 'AI supports human research, analysis, drafting, classification, or decision-making, while users remain responsible for most actions.',
    },
    {
      title: 'Semi-automated',
      text: 'AI automates defined steps within a procurement workflow, usually with human review, approval, or configuration.',
    },
    {
      title: 'Autonomous',
      text: 'AI can execute specific procurement-related tasks or workflow actions within defined rules, permissions, or system boundaries.',
    },
    {
      title: 'Agentic',
      text: 'AI agents can plan, coordinate, and perform multi-step tasks across tools, workflows, or systems, often adapting based on context or feedback.',
    },
  ]

  const marketDimensions = [
    {
      title: 'Workflow category',
      icon: 'grid' as const,
      text: 'The primary procurement workflow where the company appears most relevant.',
    },
    {
      title: 'Use cases',
      icon: 'check' as const,
      text: 'The specific procurement tasks or business problems the company helps address.',
    },
    {
      title: 'Automation maturity',
      icon: 'brain' as const,
      text: 'The apparent level of AI-enabled automation described by available product information, public sources, submitted evidence, and AI-assisted classification.',
    },
  ]

  const organizationSchema = generateOrganizationSchema()
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.procurementai.ai' },
    { name: 'About', url: 'https://www.procurementai.ai/about' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="w-full border-b" style={{ background: 'var(--t-page-header-bg)', borderColor: 'var(--t-border)' }}>
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.08]" style={{ color: 'var(--color-text-primary)' }}>
            About ProcurementAI
          </h1>
          <p className="text-base sm:text-lg mt-3 max-w-4xl leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            A structured methodology for understanding the AI procurement technology market.
          </p>
        </div>
      </section>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-16 sm:pb-20 space-y-6 sm:space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">
          <Card id="what-is" className="p-6 sm:p-7 lg:p-8">
            <h2 className="text-2xl font-black mb-3 tracking-tight" style={{ color: 'var(--color-text-primary)' }}>What ProcurementAI is</h2>
            <p className="text-[15px] leading-7 mb-3 max-w-[72ch]" style={{ color: 'var(--color-text-primary)' }}>
              ProcurementAI is a structured market intelligence resource for AI-enabled procurement solutions.
            </p>
            <p className="text-[15px] leading-7 mb-3 max-w-[72ch]" style={{ color: 'var(--color-text-primary)' }}>
              We help procurement teams discover, understand, and compare companies across the AI procurement technology market by organizing vendors around procurement workflows, use cases, automation maturity, and evidence-based classification.
            </p>
            <p className="text-[15px] leading-7 max-w-[72ch]" style={{ color: 'var(--color-text-primary)' }}>
              Our goal is to make a fast-changing and often confusing market easier to navigate.
            </p>
          </Card>

          <Card id="what-covers" className="p-6 sm:p-7 lg:p-8">
            <h2 className="text-2xl font-black mb-3 tracking-tight" style={{ color: 'var(--color-text-primary)' }}>What ProcurementAI covers</h2>
            <p className="text-[15px] leading-7 mb-3 max-w-[72ch]" style={{ color: 'var(--color-text-primary)' }}>
              ProcurementAI focuses on companies with a clear connection to procurement workflows, procurement decision-making, sourcing, supplier management, contracts, spend intelligence, procure-to-pay, supplier risk, and related enterprise procurement processes.
            </p>
            <p className="text-[15px] leading-7 max-w-[72ch]" style={{ color: 'var(--color-text-primary)' }}>
              A company does not need to be a full procurement suite to be included. However, it should have a clear and explainable relevance to procurement teams or procurement-related workflows.
            </p>
          </Card>
        </div>

        <Card id="market-structure" className="p-6 sm:p-7 lg:p-8">
          <h2 className="text-2xl font-black mb-3 tracking-tight" style={{ color: 'var(--color-text-primary)' }}>How ProcurementAI structures the market</h2>
          <p className="text-[15px] leading-7 mb-3 max-w-[72ch]" style={{ color: 'var(--color-text-primary)' }}>
            ProcurementAI uses a standardized taxonomy to organize AI-enabled procurement companies across three core dimensions:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {marketDimensions.map((dimension) => (
              <div
                key={dimension.title}
                className="rounded-xl border px-3.5 py-3"
                style={{
                  borderColor: 'var(--t-border)',
                  background: 'linear-gradient(180deg, var(--t-card-bg), var(--t-ghost-bg))',
                }}
              >
                <h3 className="text-sm font-black mb-1.5 flex items-center gap-1.5" style={{ color: 'var(--color-text-primary)' }}><Icon name={dimension.icon} className="h-3.5 w-3.5" />{dimension.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {dimension.text}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[15px] leading-7 mt-4 max-w-[72ch]" style={{ color: 'var(--color-text-primary)' }}>
            This structure helps buyers understand where a company fits in the procurement technology landscape. It is not a ranking, rating, or endorsement.
          </p>
        </Card>

        <Card id="automation-maturity" className="p-6 sm:p-7 lg:p-8">
          <h2 className="text-2xl font-black mb-3 tracking-tight" style={{ color: 'var(--color-text-primary)' }}>Automation maturity</h2>
          <p className="text-[15px] leading-7 mb-3 max-w-[72ch]" style={{ color: 'var(--color-text-primary)' }}>
            Automation maturity describes how AI appears to be used in a product. It is designed to provide context, not to rank vendor quality.
          </p>
          <p className="text-[15px] leading-7 mb-3 max-w-[72ch]" style={{ color: 'var(--color-text-primary)' }}>
            ProcurementAI currently uses four maturity levels:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {maturityLevels.map((level) => (
              <div
                key={level.title}
                className="rounded-xl border px-4 py-3"
                style={{
                  borderColor: 'rgba(159,123,255,0.35)',
                  background: 'linear-gradient(140deg, rgba(124,58,237,0.12), rgba(11,18,32,0.55) 68%)',
                }}
              >
                <h3 className="text-sm font-black mb-1.5 flex items-center gap-1.5" style={{ color: 'var(--color-text-primary)' }}><Icon name="spark" className="h-3.5 w-3.5" />{level.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {level.text}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[15px] leading-7 mt-4 max-w-[72ch]" style={{ color: 'var(--color-text-primary)' }}>
            Automation maturity is assessed by ProcurementAI based on available information. It is not selected directly by vendors and should not be interpreted as a measure of overall vendor quality.
          </p>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">
          <Card id="review-process" className="p-6 sm:p-7 lg:p-8">
            <h2 className="text-2xl font-black mb-3 tracking-tight" style={{ color: 'var(--color-text-primary)' }}>How submissions and updates are reviewed</h2>
            <p className="text-[15px] leading-7 mb-3 max-w-[72ch]" style={{ color: 'var(--color-text-primary)' }}>
              ProcurementAI accepts open submissions and correction requests.
            </p>
            <p className="text-[15px] leading-7 mb-3 max-w-[72ch]" style={{ color: 'var(--color-text-primary)' }}>
              All submissions are reviewed against our procurement relevance, AI capability, source quality, and taxonomy standards before publication.
            </p>
            <p className="text-[15px] leading-7 max-w-[72ch]" style={{ color: 'var(--color-text-primary)' }}>
              Submitted information may be accepted, edited, rejected, or reclassified. Submission does not guarantee inclusion, update, ranking, endorsement, or partnership.
            </p>
          </Card>

          <Card id="independence" className="p-6 sm:p-7 lg:p-8">
            <h2 className="text-2xl font-black mb-3 tracking-tight" style={{ color: 'var(--color-text-primary)' }}>Independence and transparency</h2>
            <p className="text-[15px] leading-7 mb-3 max-w-[72ch]" style={{ color: 'var(--color-text-primary)' }}>
              ProcurementAI does not rank companies based on payment, sponsorship, or partnership.
            </p>
            <p className="text-[15px] leading-7 mb-3 max-w-[72ch]" style={{ color: 'var(--color-text-primary)' }}>
              If sponsored placements or commercial programs are introduced in the future, they will be clearly labeled.
            </p>
            <p className="text-[15px] leading-7 max-w-[72ch]" style={{ color: 'var(--color-text-primary)' }}>
              Submitting or updating a listing does not imply endorsement, ranking, or preferred status.
            </p>
          </Card>
        </div>

        <Card id="what-not" className="p-6 sm:p-7 lg:p-8">
          <h2 className="text-2xl font-black mb-3 tracking-tight" style={{ color: 'var(--color-text-primary)' }}>What ProcurementAI is not</h2>
          <ul className="space-y-2.5 list-disc pl-4 text-[15px] leading-7" style={{ color: 'var(--color-text-primary)' }}>
            <li>ProcurementAI is not a paid ranking site.</li>
            <li>ProcurementAI is not a vendor endorsement platform.</li>
            <li>ProcurementAI is not a substitute for buyer due diligence, security review, legal review, or procurement-led vendor evaluation.</li>
            <li>ProcurementAI does not provide open user ratings or qualitative vendor reviews.</li>
          </ul>
          <p className="text-[15px] leading-7 mt-3 max-w-[72ch]" style={{ color: 'var(--color-text-primary)' }}>
            Instead, ProcurementAI provides structured evaluation context to support independent buyer research.
          </p>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">
          <Card id="for-teams" className="p-6 sm:p-7 lg:p-8">
            <h2 className="text-2xl font-black mb-3 tracking-tight" style={{ color: 'var(--color-text-primary)' }}>For procurement teams</h2>
            <p className="text-[15px] leading-7 mb-3 max-w-[72ch]" style={{ color: 'var(--color-text-primary)' }}>
              ProcurementAI helps procurement teams explore AI-enabled procurement companies by workflow, use case, and automation maturity.
            </p>
            <p className="text-[15px] leading-7 max-w-[72ch]" style={{ color: 'var(--color-text-primary)' }}>
              It is designed to support early-stage market research, category understanding, vendor discovery, and shortlist development.
            </p>
          </Card>

          <Card id="for-vendors" className="p-6 sm:p-7 lg:p-8">
            <h2 className="text-2xl font-black mb-3 tracking-tight" style={{ color: 'var(--color-text-primary)' }}>For vendors</h2>
            <p className="text-[15px] leading-7 mb-4 max-w-[72ch]" style={{ color: 'var(--color-text-primary)' }}>
              Vendors and community members may submit new companies or suggest updates to existing listings.
            </p>
            <p className="text-[15px] leading-7 mb-4 max-w-[72ch]" style={{ color: 'var(--color-text-primary)' }}>
              All submitted information is reviewed before publication. ProcurementAI may edit, reject, or reclassify submitted information to maintain taxonomy consistency and data quality.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/submit-company"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold border transition-transform duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, rgba(124,58,237,.22), rgba(159,123,255,.14))',
                  borderColor: 'rgba(124,58,237,.45)',
                  color: 'var(--color-text-primary)',
                }}
              >
                <Icon name="spark" className="h-4 w-4" />
                Submit a company
              </Link>
              <Link
                href="/companies"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold border transition-transform duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'transparent',
                  borderColor: 'var(--t-border-lg)',
                  color: 'var(--color-text-primary)',
                }}
              >
                <Icon name="arrow" className="h-4 w-4" />
                Explore companies
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
