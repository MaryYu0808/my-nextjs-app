'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import type { Category, Company, UseCase } from '../types'
import { AutomationBadge, Pill } from './Chip'
import LogoFallback from './LogoFallback'
import { workflowCategoryLabel, useCaseLabel } from '../lib/taxonomy'

interface CompanyCardProps {
  company: Company
  variant?: 'card' | 'row'
  categories?: Category[]
  useCases?: UseCase[]
}

function CompanyLogo({ company, size = 'md' }: { company: Company; size?: 'md' | 'lg' }) {
  const [logoFailed, setLogoFailed] = useState(false)
  const sizeClass = size === 'lg' ? 'w-14 h-14 rounded-2xl' : 'w-10 h-10 rounded-xl'
  const showImage = Boolean(company.logo_url) && !logoFailed

  return (
    <div
      className={`${sizeClass} border flex items-center justify-center overflow-hidden flex-shrink-0 relative`}
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
        <LogoFallback size={size} />
      )}
    </div>
  )
}

// const LinkedInIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
// )

// const XIcon = () => (
//   <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
// )

// const MailIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>
// )

export default function CompanyCard({ company, variant = 'card', categories = [], useCases = [] }: CompanyCardProps) {
  if (variant === 'row') {
    // const socialLinks = [
    //   company.linkedin_url && { href: company.linkedin_url, label: 'LinkedIn', icon: <LinkedInIcon /> },
    //   company.twitter_url  && { href: company.twitter_url,  label: 'X / Twitter', icon: <XIcon /> },
    //   company.contact_email && { href: `mailto:${company.contact_email}`, label: 'Email', icon: <MailIcon /> },
    // ].filter(Boolean) as { href: string; label: string; icon: React.ReactNode }[]

    return (
      <article
        className="rounded-[18px] border p-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row items-start gap-4 sm:gap-5 transition-all duration-200 hover:border-violet-500/30 hover:shadow-lg"
        style={{
          background: 'var(--t-card-bg)',
          borderColor: 'var(--t-border)',
          boxShadow: 'var(--t-card-shadow)',
        }}
      >
        <CompanyLogo company={company} size="lg" />

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Name + badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={`/company/${company.tool_slug}`}
              style={{ color: 'var(--color-text-primary)' }}
            >
              {company.tool_name}
            </Link>
            <AutomationBadge level={company.automation_level} />
          </div>

          {/* Meta: HQ • Founded • Category */}
          <div className="flex items-center flex-wrap gap-1.5 mt-1 text-xs sm:text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {company.headquarters && <span>{company.headquarters}</span>}
            {company.headquarters && company.founded_year && <span className="opacity-40">•</span>}
            {company.founded_year && <span>Founded {company.founded_year}</span>}
            {(company.headquarters || company.founded_year) && (
              <span className="opacity-40">•</span>
            )}
            <Link
              href={`/companies?category=${encodeURIComponent(company.primary_category)}`}
              className="hover:underline transition-colors"
              style={{ color: 'var(--color-accent-soft)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {workflowCategoryLabel(company.primary_category, categories)}
            </Link>
          </div>

          {/* Description */}
          <p
            className="text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-2 mt-2"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {company.short_description || company.one_liner || ''}
          </p>

          {/* Use cases */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {company.use_cases.slice(0, 5).map((uc, idx) => (
              <Pill key={`${uc}-${idx}`} variant="gray">{useCaseLabel(uc, useCases)}</Pill>
            ))}
            {company.use_cases.length > 5 && (
              <Pill variant="gray">+{company.use_cases.length - 5} more</Pill>
            )}
          </div>
        </div>

        {/* Right action column */}
        <div className="w-full sm:w-auto flex-shrink-0 flex flex-col items-center sm:items-stretch gap-2" style={{ minWidth: '0' }}>
          <div className="grid grid-cols-1 gap-2 w-full sm:w-auto">
            <Link
              href={`/company/${company.tool_slug}`}
              className="text-sm font-bold px-4 py-2.5 rounded-full text-center transition-all duration-150 hover:opacity-90 w-full max-w-[240px] mx-auto sm:max-w-none sm:mx-0"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', color: '#fff' }}
            >
              View Profile
            </Link>
            {company.website_url && (
              <a
                href={company.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold px-4 py-2 rounded-full text-center border transition-all duration-150 hover:border-violet-400/50 w-full max-w-[240px] mx-auto sm:max-w-none sm:mx-0"
                style={{ background: 'transparent', borderColor: 'rgba(255,255,255,0.12)', color: 'var(--color-text-secondary)' }}
                onClick={(e) => e.stopPropagation()}
              >
                Visit Website ↗
              </a>
            )}
          </div>
          {/* {socialLinks.length > 0 && (
            <div className="mt-1 sm:mt-2">
              <div
                className="font-bold tracking-widest uppercase mb-1.5"
                style={{ color: 'var(--color-text-muted)', fontSize: '10px' }}
              >
                Social
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {socialLinks.map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors hover:border-violet-400/50 hover:text-violet-300"
                    style={{ borderColor: 'rgba(255,255,255,0.10)', color: 'var(--color-text-muted)' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          )} */}
        </div>
      </article>
    )
  }

  return (
    <article
      className="rounded-[18px] border p-4 flex flex-col gap-3 transition-all duration-200 hover:border-violet-500/30 hover:shadow-lg"
      style={{
        background: 'var(--t-card-bg)',
        borderColor: 'var(--t-border)',
        boxShadow: 'var(--t-card-shadow)',
      }}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <CompanyLogo company={company} />
        <div className="min-w-0 flex-1">
          <Link
            href={`/company/${company.tool_slug}`}
            className="font-bold text-sm leading-tight hover:text-violet-300 transition-colors block"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {company.tool_name}
          </Link>
          <div className="text-xs mt-0.5 flex items-center gap-1.5 flex-wrap" style={{ color: 'var(--color-text-muted)' }}>
            {company.headquarters && <span>{company.headquarters}</span>}
            {company.headquarters && company.founded_year && <span>·</span>}
            {company.founded_year && <span>Est. {company.founded_year}</span>}
          </div>
        </div>
        <AutomationBadge level={company.automation_level} />
      </div>

      {/* Description */}
      <p
        className="text-xs leading-relaxed line-clamp-3"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {company.short_description || company.one_liner || ''}
      </p>

      {/* Category + Use cases */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        <Pill variant="accent">{workflowCategoryLabel(company.primary_category, categories)}</Pill>
        {company.use_cases.slice(0, 2).map((uc, idx) => (
          <Pill key={`${uc}-${idx}`} variant="gray">{useCaseLabel(uc, useCases)}</Pill>
        ))}
        {company.use_cases.length > 2 && (
          <Pill variant="gray">+{company.use_cases.length - 2} more</Pill>
        )}
      </div>

      {/* Footer link */}
      <div
        className="pt-2 border-t flex justify-between items-center"
        style={{ borderColor: 'var(--t-border)' }}
      >
        <Link
          href={`/company/${company.tool_slug}`}
          style={{ color: 'var(--color-accent-soft)' }}
        >
          View profile →
        </Link>
        {company.website_url && (
          <a
            href={company.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold py-1 hover:text-violet-300 transition-colors"
            style={{ color: 'var(--color-text-muted)' }}
            onClick={(e) => e.stopPropagation()}
          >
            Website ↗
          </a>
        )}
      </div>
    </article>
  )
}
