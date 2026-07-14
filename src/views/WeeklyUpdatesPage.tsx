import Link from 'next/link'
import CompanyCard from '../components/CompanyCard'
import type { Category, Company, UseCase } from '../types'
import { generateCollectionPageSchema, generateBreadcrumbSchema } from '../lib/seo'

interface Props {
  companies: Company[]
  total: number
  dateBegin: string
  dateEnd: string
  categories: Category[]
  useCases: UseCase[]
}

export default function WeeklyUpdatesPage({ companies, total, dateBegin, dateEnd, categories, useCases }: Props) {
  const subtitle = dateBegin && dateEnd
    ? `${total} companies updated · ${dateBegin} – ${dateEnd}`
    : `${total} companies updated this week`

  const collectionSchema = generateCollectionPageSchema(
    'Weekly Updates - AI Procurement Companies',
    'Track the latest additions and structured updates across the AI procurement technology market.',
    'https://www.procurementai.ai/weekly-updates'
  )
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.procurementai.ai' },
    { name: 'Weekly Updates', url: 'https://www.procurementai.ai/weekly-updates' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="w-full border-b" style={{ background: 'var(--t-page-header-bg)', borderColor: 'var(--t-border)' }}>
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.08]" style={{ color: 'var(--color-text-primary)' }}>
            Weekly Updates
          </h1>
          <p className="text-lg mt-2" style={{ color: 'var(--color-text-secondary)' }}>
            Track the latest additions and structured updates across the AI procurement technology market.
          </p>
          <div
            className="mt-4 rounded-2xl border px-4 py-4 sm:px-5 sm:py-5"
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,.10), rgba(159,123,255,.05))',
              borderColor: 'rgba(124,58,237,.30)',
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="mt-0.5 h-8 w-8 rounded-full border flex items-center justify-center shrink-0"
                style={{ borderColor: 'rgba(124,58,237,.45)', color: 'var(--color-text-secondary)' }}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 10v6" />
                  <circle cx="12" cy="7" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-sm sm:text-[15px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  ProcurementAI updates its company database on a recurring basis to reflect:
                </p>
                <ul className="mt-2.5 space-y-1.5 text-sm sm:text-[15px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  <li>• Newly indexed companies and revised classifications</li>
                  <li>• Improved procurement context aligned with workflow standards</li>
                  <li>• Use case relevance and automation maturity benchmarks</li>
                </ul>
                <p className="mt-3 text-sm sm:text-[15px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  Each update is reviewed against ProcurementAI&apos;s procurement relevance standards.
                </p>
              </div>
            </div>
          </div>
          <p className="text-lg mt-4" style={{ color: 'var(--color-text-secondary)' }}>
            {subtitle}
          </p>
        </div>
      </section>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-12 sm:pb-16">
        {companies.length === 0 ? (
          <div
            className="rounded-[18px] border py-16 text-center"
            style={{ borderColor: 'var(--t-border)', color: 'var(--color-text-muted)' }}
          >
            <p className="text-base font-bold mb-1" style={{ color: 'var(--color-text-secondary)' }}>No updates this week</p>
            <p className="text-sm">Check back next week for newly added or updated companies.</p>
          </div>
        ) : (
          <div className="space-y-3.5">
            {companies.map((company) => (
              <CompanyCard key={company.tool_id} company={company} variant="row" categories={categories} useCases={useCases} />
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Link
            href="/companies"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border transition-transform duration-200 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,.22), rgba(159,123,255,.14))',
              borderColor: 'rgba(124,58,237,.45)',
              color: 'var(--color-text-primary)',
            }}
          >
            Explore all companies
          </Link>
        </div>
      </div>
    </>
  )
}

