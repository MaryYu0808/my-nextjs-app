'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { AutomationBadge, Pill } from '../components/Chip'
import { Card, KvRow } from '../components/Card'
import CompanyCard from '../components/CompanyCard'
import LogoFallback from '../components/LogoFallback'
import type { Category, Company, UseCase } from '../types'
import { workflowCategoryLabel, useCaseLabel } from '../lib/taxonomy'
import { generateCompanySchema, generateBreadcrumbSchema } from '../lib/seo'

const DESCRIPTION_CHAR_LIMIT = 300

function ExpandableText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false)
  const isLong = text.length > DESCRIPTION_CHAR_LIMIT
  const displayed = isLong && !expanded ? text.slice(0, DESCRIPTION_CHAR_LIMIT).trimEnd() + '…' : text
  return (
    <div>
      <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--color-text-muted)' }}>
        {displayed}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-xs font-bold transition-colors"
          style={{ color: 'var(--color-accent-soft)' }}
        >
          {expanded ? 'Show less ↑' : 'Show more ↓'}
        </button>
      )}
    </div>
  )
}

const STRUCTURED_CONTEXT_FIELDS = [
  {
    title: 'Procurement workflow fit',
    text: 'The main procurement workflow where this company appears most relevant.',
  },
  {
    title: 'Core use case fit',
    text: 'The specific procurement tasks or business problems associated with this company.',
  },
  {
    title: 'Automation maturity',
    text: 'The apparent level of AI-enabled automation based on available product information and supporting evidence.',
  },
  {
    title: 'Evidence basis',
    text: 'The source context used to structure this listing, such as public vendor sources, submitted information, or reviewed updates.',
  },
  {
    title: 'Buyer evaluation notes',
    text: 'Neutral context to help procurement teams understand what to verify when evaluating this company, such as product scope, data requirements, integrations, deployment maturity, regional coverage, and procurement-specific proof points.',
  },
]

interface Props {
  company: Company | null
  relatedCompanies: Company[]
  categories: Category[]
  useCases: UseCase[]
}

function ProfileLogo({ company }: { company: Company }) {
  const [logoFailed, setLogoFailed] = useState(false)
  const showImage = Boolean(company.logo_url) && !logoFailed

  return (
    <div
      className="w-14 h-14 rounded-xl border flex items-center justify-center overflow-hidden flex-shrink-0 relative"
      style={{ background: 'var(--t-logo-bg)', borderColor: 'var(--t-logo-border)' }}
    >
      {showImage ? (
        <Image
          src={company.logo_url!}
          alt={company.tool_name}
          fill
          unoptimized
          className="object-contain"
          sizes="56px"
          onError={() => setLogoFailed(true)}
        />
      ) : (
        <LogoFallback size="lg" />
      )}
    </div>
  )
}

export default function CompanyProfilePage({ company, relatedCompanies, categories, useCases }: Props) {

  if (!company) {
    return (
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 py-16 text-center">
        <h1 className="text-2xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
          Company not found
        </h1>
        <p className="mb-6" style={{ color: 'var(--color-text-muted)' }}>
          This company isn&apos;t in the current dataset.
        </p>
        <Link
          href="/companies"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold border"
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,.22), rgba(159,123,255,.14))',
            borderColor: 'rgba(124,58,237,.45)',
            color: 'var(--color-text-primary)',
          }}
        >
          Back to directory
        </Link>
      </div>
    )
  }

  const modules = company.key_modules ?? []
  const sources = company.sources ?? []

  const companySchema = generateCompanySchema({
    name: company.tool_name,
    slug: company.tool_slug,
    description: company.one_liner || company.short_description || 'AI-enabled procurement company',
    website: company.website_url,
    logo: company.logo_url || '',
    founded: company.founded_year,
    headquarters: company.headquarters,
  })
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.procurementai.ai' },
    { name: 'Companies', url: 'https://www.procurementai.ai/companies' },
    { name: company.tool_name, url: `https://www.procurementai.ai/company/${company.tool_slug}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(companySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    <div className="max-w-[1120px] mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
      {/* Breadcrumbs */}
      <div className="pt-6 pb-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        {' › '}
        <Link href="/companies" className="hover:text-white transition-colors">Companies</Link>
        {' › '}
        <span style={{ color: 'var(--color-text-secondary)' }}>{company.tool_name}</span>
      </div>

      <div className="py-5 sm:py-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <ProfileLogo company={company} />
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
              {company.tool_name}
            </h1>
            {company.one_liner && (
              <p className="text-base mt-1 leading-relaxed max-w-2xl" style={{ color: 'var(--color-text-secondary)' }}>
                {company.one_liner}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3 flex-wrap mt-4">
          {company.website_url && (
            <a
              href={company.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-bold border transition-all duration-150"
              style={{
                background: 'transparent',
                borderColor: 'var(--t-border-lg)',
                color: 'var(--color-text-primary)',
              }}
            >
              Visit website ↗
            </a>
          )}
          <Link
            href={`/update/${company.tool_slug}`}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-bold border transition-all duration-150"
            style={{
              background: 'var(--t-ghost-bg)',
              borderColor: 'var(--t-border)',
              color: 'var(--color-text-primary)',
            }}
          >
            Edit Company Profile
          </Link>
          <Link
            href="/companies"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-bold border transition-all duration-150"
            style={{
              background: 'transparent',
              borderColor: 'var(--t-border-md)',
              color: 'var(--color-text-muted)',
            }}
          >
            Back to directory
          </Link>
        </div>
      </div>

      <div className="pt-5 sm:pt-6 space-y-4">
        <Card>
          <h2 className="text-base font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>Overview</h2>
          {company.short_description
            ? <ExpandableText text={company.short_description} />
            : company.one_liner
              ? <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{company.one_liner}</p>
              : null}
          <div className="space-y-0 mt-3">
            {company.website_url && (
              <KvRow label="Website">
                <a href={company.website_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent-soft)' }} className="hover:underline">
                  {company.website_url}
                </a>
              </KvRow>
            )}
            {company.linkedin_url && (
              <KvRow label="LinkedIn URL">
                <a href={company.linkedin_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent-soft)' }} className="hover:underline">
                  {company.linkedin_url}
                </a>
              </KvRow>
            )}
            {company.headquarters && <KvRow label="Headquarters">{company.headquarters}</KvRow>}
            {company.founded_year && <KvRow label="Founded year">{company.founded_year}</KvRow>}
            <KvRow label="Data last verified">{company.updated_utc ? company.updated_utc.slice(0, 10) : '—'}</KvRow>
          </div>
        </Card>

        <Card>
          <h2 className="text-base font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>Classification</h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-text-muted)' }}>
            This classification helps buyers understand where the company appears to fit within the AI procurement technology market. It is not a ranking or endorsement.
          </p>
          <div className="space-y-0">
            <KvRow label="Primary workflow category">
              <Link
                href={`/companies?category=${encodeURIComponent(company.primary_category)}`}
                style={{ color: 'var(--color-accent-soft)' }}
                className="hover:underline"
              >
                {workflowCategoryLabel(company.primary_category, categories)}
              </Link>
            </KvRow>
            <KvRow label="Use cases">
              <div className="flex flex-wrap gap-1.5">
                {company.use_cases.length > 0 ? company.use_cases.map((uc, idx) => (
                  <Link key={`${uc}-${idx}`} href={`/companies?uc=${encodeURIComponent(uc)}`}>
                    <Pill variant="gray">{useCaseLabel(uc, useCases)}</Pill>
                  </Link>
                )) : '—'}
              </div>
            </KvRow>
            <KvRow label="Automation maturity">
              <AutomationBadge level={company.automation_level} />
            </KvRow>
          </div>
        </Card>

        {modules.length > 0 && (
          <Card>
            <h2 className="text-base font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>Key Modules</h2>
            <div className="flex flex-wrap gap-2">
              {modules.map((m) => (
                <Pill key={m} variant="accent">{m}</Pill>
              ))}
            </div>
          </Card>
        )}

        <Card>
          <h2 className="text-base font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>Structured Evaluation Context</h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-text-muted)' }}>
            ProcurementAI provides structured context to help buyers understand where this company may fit within the AI procurement market. This is not a ranking, rating, endorsement, or substitute for buyer due diligence.
          </p>
          <div className="space-y-0">
            {STRUCTURED_CONTEXT_FIELDS.map((item) => (
              <KvRow key={item.title} label={item.title}>
                <span style={{ color: 'var(--color-text-secondary)' }}>{item.text}</span>
              </KvRow>
            ))}
          </div>
          {sources.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-bold mb-1" style={{ color: 'var(--color-text-muted)' }}>Source links</p>
              <div className="flex flex-col gap-1">
                {sources.map((src) => (
                  <a
                    key={src}
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs hover:underline truncate block"
                    style={{ color: 'var(--color-accent-soft)' }}
                  >
                    {src}
                  </a>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Related + Explore */}
      <div className="grid grid-cols-1 gap-4 mt-4">
        <Card>
          <h2 className="text-base font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>Related Companies</h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-text-muted)' }}>
            Related companies are selected based on workflow category, use case overlap, and procurement relevance signals. They are not ranked recommendations or direct alternatives.
          </p>
          {relatedCompanies.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:gap-3.5">
              {relatedCompanies.map((c) => (
                <CompanyCard key={c.tool_slug} company={c} variant="row" categories={categories} useCases={useCases} />
              ))}
            </div>
          ) : (
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>No related companies found.</p>
          )}
          <p className="text-xs mt-3" style={{ color: 'var(--color-text-muted)' }}>
            Based on shared category and overlapping use cases.
          </p>
        </Card>
      </div>
    </div>
    </>
  )
}
