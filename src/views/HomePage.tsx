import Link from 'next/link'
import { Card } from '../components/Card'
import { CountUp } from '../components/CountUp'
import { generateOrganizationSchema, generateWebSiteSchema } from '../lib/seo'
import type { Category } from '../types'

interface Stats {
  companies: number
  categories: number
  cases: number
  verified_at: string
}

interface HomePageProps {
  categories: Category[]
  stats: Stats
}

export default function HomePage({ categories, stats }: HomePageProps) {
  const organizationSchema = generateOrganizationSchema()
  const websiteSchema = generateWebSiteSchema()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {/* Hero — full viewport width */}
      <section
        className="w-full pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-28 lg:pb-20"
        style={{
          backgroundImage: [
            'radial-gradient(ellipse 140% 120% at 50% -15%, rgba(124,58,237,0.44) 0%, transparent 60%)',
            'radial-gradient(ellipse 70% 60% at 96% 28%, rgba(99,102,241,0.18) 0%, transparent 55%)',
            'radial-gradient(ellipse 60% 50% at 4% 85%, rgba(159,123,255,0.14) 0%, transparent 50%)',
            'repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,0.03) 79px, rgba(255,255,255,0.03) 80px)',
            'repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(255,255,255,0.03) 79px, rgba(255,255,255,0.03) 80px)',
            'var(--t-hero-bg-image)',
          ].join(','),
          backgroundSize: 'auto, auto, auto, auto, auto, cover',
          backgroundPosition: '0 0, 0 0, 0 0, 0 0, 0 0, center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.05] tracking-tight mb-2"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Navigate the AI Procurement Technology Market
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl leading-relaxed max-w-4xl mt-5 sm:mt-6" style={{ color: 'var(--color-text-secondary)' }}>
            <b className='text-[#EAF0FF] italic'>
              <span className="relative inline-block">
                Discover
                <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 100 8" preserveAspectRatio="none">
                  <path d="M0 4 Q 12.5 0, 25 4 T 50 4 T 75 4 T 100 4" stroke="#EAF0FF" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
                </svg>
              </span>,
              <span className="relative inline-block ml-2">
                understand
                <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 100 8" preserveAspectRatio="none">
                  <path d="M0 4 Q 12.5 0, 25 4 T 50 4 T 75 4 T 100 4" stroke="#EAF0FF" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
                </svg>
              </span>, and
              <span className="relative inline-block ml-2">
                 compare
                <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 100 8" preserveAspectRatio="none">
                  <path d="M0 4 Q 12.5 0, 25 4 T 50 4 T 75 4 T 100 4" stroke="#EAF0FF" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
                </svg>
              </span>
            </b> AI-enabled procurement companies
          </p>
          <div className="flex gap-3 flex-wrap mt-5 sm:mt-6">
            <Link
              href="/companies"
              className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-bold border transition-all duration-200 hero-cta-primary"
            >
              Explore Companies
            </Link>
            <Link
              href="/submit-company"
              className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-bold border transition-all duration-200 hero-cta-ghost"
            >
              Submit a Company
            </Link>
          </div>

        </div>
      </section>

      {/* Stats section */}
      <section className="w-full border-b" style={{ borderColor: 'var(--t-border)' }}>
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: 'Companies', numeric: true, value: stats.companies, text: null },
            { label: 'Workflow categories', numeric: true, value: stats.categories, text: null },
            { label: 'Use cases', numeric: true, value: stats.cases, text: null },
            { label: 'Data last verified', numeric: false, value: 0, text: stats.verified_at },
          ].map(({ label, numeric, value, text }) => (
            <div
              key={label}
              className="rounded-[18px] border px-4 py-4 sm:px-6 sm:py-5 flex flex-col gap-1"
              style={{
                background: 'var(--t-card-bg)',
                borderColor: 'var(--t-border)',
                boxShadow: 'var(--t-card-shadow)',
              }}
            >
              <span className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                {numeric ? <CountUp target={value} /> : text}
              </span>
              <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Page content */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* What this site is */}
        <section className="mt-10 mb-10 sm:mt-14 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-5" style={{ color: 'var(--color-text-primary)' }}>
            What is ProcurementAI?
          </h2>
          <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            <p>ProcurementAI is a structured market intelligence resource for AI-enabled procurement solutions.</p>
            <p>It helps procurement teams explore companies by workflow, use case, and automation maturity — without paid rankings or vendor endorsements.</p>
          </div>
        </section>

        {/* Browse by workflow category */}
        <section className="mt-8 mb-12 sm:mt-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-black mb-2" style={{ color: 'var(--color-text-primary)' }}>
            Browse by workflow category
          </h2>
          <p className="text-base mb-6" style={{ color: 'var(--color-text-muted)' }}>
            Explore companies by workflow category across the procurement lifecycle.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/companies?category=${encodeURIComponent(cat.slug)}`}
                className="block"
              >
                <Card className="h-full flex flex-col gap-2 group cursor-pointer hover:border-violet-500/30 transition-all duration-200">
                  <h3
                    className="text-base font-bold leading-snug group-hover:text-violet-300 transition-colors"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {cat.name}
                  </h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--color-text-muted)' }}>
                    {cat.description}
                  </p>
                  <div
                    className="border-t pt-2 flex items-center justify-between"
                    style={{ borderColor: 'var(--t-border)' }}
                  >
                    <span
                      className="text-xs font-bold group-hover:text-violet-300 transition-colors"
                      style={{ color: 'var(--color-accent-soft)' }}
                    >
                      Explore →
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
