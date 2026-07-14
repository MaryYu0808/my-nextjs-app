'use client'

import Link from 'next/link'
import { useState } from 'react'
import CompanyCard from '../components/CompanyCard'
import type { Category, Company, UseCase } from '../types'
import { generateCollectionPageSchema, generateBreadcrumbSchema } from '../lib/seo'

interface QueryState {
  category: string
  uc: string
  name: string
  page: number
}

interface Props {
  companies: Company[]
  total: number
  categories: Category[]
  useCases: UseCase[]
  query: QueryState
  pageSize: number
}

function buildQueryString(query: QueryState): string {
  const params = new URLSearchParams()
  if (query.category) params.set('category', query.category)
  if (query.uc) params.set('uc', query.uc)
  if (query.name.trim()) params.set('name', query.name.trim())
  if (query.page > 1) params.set('page', String(query.page))
  const qs = params.toString()
  return qs ? `/companies?${qs}` : '/companies'
}

function getPageNumbers(page: number, totalPages: number): (number | '...')[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
  if (page <= 4) return [1, 2, 3, 4, 5, '...', totalPages]
  if (page >= totalPages - 3) return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
  return [1, '...', page - 1, page, page + 1, '...', totalPages]
}

export default function CompaniesPage({
  companies,
  total,
  categories,
  useCases,
  query,
  pageSize,
}: Props) {
  const [filtersOpen, setFiltersOpen] = useState(false)

  const page = query.page
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const hasFilters = !!(query.category || query.uc || query.name.trim())
  const activeFilterCount = [query.category, query.uc, query.name.trim()].filter(Boolean).length

  const prevHref = buildQueryString({ ...query, page: Math.max(1, page - 1) })
  const nextHref = buildQueryString({ ...query, page: Math.min(totalPages, page + 1) })

  const sidebarStyle: React.CSSProperties = {
    background: 'var(--t-card-bg)',
    borderColor: 'var(--t-border)',
    boxShadow: 'var(--t-card-shadow)',
  }

  const inputStyle: React.CSSProperties = {
    background: 'var(--t-input-bg)',
    borderColor: 'var(--t-border-md)',
    color: 'var(--color-text-primary)',
  }

  const collectionSchema = generateCollectionPageSchema(
    'AI Procurement Companies Directory',
    'Browse AI-enabled procurement companies mapped across procurement workflows, use cases, and automation maturity levels.',
    'https://www.procurementai.ai/companies'
  )
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.procurementai.ai' },
    { name: 'Companies', url: 'https://www.procurementai.ai/companies' },
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
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
         Explore AI procurement companies
        </h1>
        <p className="text-base sm:text-lg mt-2" style={{ color: 'var(--color-text-muted)' }}>
          Browse AI-enabled procurement companies by workflow, use case, and automation maturity.
        </p>
      </div>
    </section>

    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-12 sm:pb-16">

      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-4 flex items-center gap-3">
        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full border"
          style={{ borderColor: 'var(--t-border-md)', background: 'var(--t-ghost-bg)', color: 'var(--color-text-primary)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="20" y2="12" /><line x1="12" y1="18" x2="20" y2="18" />
          </svg>
          Filters{hasFilters ? ` (${activeFilterCount})` : ''}
        </button>
        {hasFilters && (
          <Link
            href="/companies"
            className="text-xs font-bold px-3 py-1.5 rounded-full border"
            style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'var(--color-text-muted)' }}
          >
            Clear all
          </Link>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 items-stretch lg:items-start">

        {/* Sidebar */}
        <aside
          className={`${filtersOpen ? 'block' : 'hidden'} lg:block w-full lg:w-72 flex-shrink-0 lg:sticky lg:top-24 rounded-[18px] border p-4 sm:p-5`}
          style={sidebarStyle}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: 'var(--color-text-muted)' }}>
                Filters
              </div>
              <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                {`${total} results`}
              </div>
            </div>
            {hasFilters && (
              <Link
                href="/companies"
                className="text-xs font-bold px-2.5 py-1 rounded-full border transition-colors"
                style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'var(--color-text-muted)' }}
              >
                Clear
              </Link>
            )}
          </div>

          <form method="GET" action="/companies" className="flex flex-col gap-4">
            <input type="hidden" name="page" value="1" />
            {/* Name search */}
            <div>
              <div className="text-xs font-bold mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Name</div>
              <input
                type="text"
                name="name"
                defaultValue={query.name}
                placeholder="Search by name..."
                className="w-full text-xs rounded-xl border px-3 py-2"
                style={inputStyle}
              />
            </div>

            {/* Category */}
            <div>
              <div className="text-xs font-bold mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Workflow category</div>
              <select
                name="category"
                defaultValue={query.category}
                onChange={(e) => e.currentTarget.form?.requestSubmit()}
                className="w-full text-xs rounded-xl border px-3 py-2"
                style={inputStyle}
              >
                <option value="">All categories</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Use case */}
            <div>
              <div className="text-xs font-bold mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Use case</div>
              <select
                name="uc"
                defaultValue={query.uc}
                onChange={(e) => e.currentTarget.form?.requestSubmit()}
                className="w-full text-xs rounded-xl border px-3 py-2"
                style={inputStyle}
              >
                <option value="">All use cases</option>
                {useCases.map((uc) => (
                  <option key={uc.slug} value={uc.slug}>{uc.name}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="flex-1 text-xs font-bold px-3 py-2 rounded-full border"
                style={{ borderColor: 'var(--t-border-md)', color: 'var(--color-text-primary)', background: 'var(--t-ghost-bg)' }}
              >
                Apply filters
              </button>
              {hasFilters && (
                <Link
                  href="/companies"
                  className="text-xs font-bold px-3 py-2 rounded-full border"
                  style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'var(--color-text-muted)' }}
                >
                  Reset
                </Link>
              )}
            </div>
          </form>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 w-full">
          {/* Results bar */}
          <div
            className="rounded-[18px] border px-4 py-3 mb-4 flex items-center justify-between flex-wrap gap-2"
            style={sidebarStyle}
          >
            <div className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
              {total === 0
                ? 'No companies'
                : `${(page - 1) * pageSize + 1}-${Math.min(page * pageSize, total)} of ${total} companies`}
            </div>
            {hasFilters && (
              <Link
                href="/companies"
                className="text-xs font-bold px-2.5 py-1.5 rounded-full border"
                style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'var(--color-text-muted)' }}
              >
                Clear all
              </Link>
            )}
          </div>

          <div className="relative min-h-[200px] w-full">
            {companies.length === 0 ? (
              <div
                className="rounded-[18px] border py-16 text-center"
                style={{ borderColor: 'var(--t-border)', color: 'var(--color-text-muted)' }}
              >
                <p className="text-base font-bold mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                  No companies match your filters
                </p>
                <p className="text-sm mb-4">Try adjusting or clearing your filters.</p>
                {hasFilters && (
                  <Link
                    href="/companies"
                    className="text-sm font-bold px-4 py-2 rounded-full border"
                    style={{
                      background: 'rgba(124,58,237,0.14)',
                      borderColor: 'rgba(124,58,237,0.35)',
                      color: '#E9D5FF',
                    }}
                  >
                    Clear all filters
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:gap-3.5">
                {companies.map((company) => (
                  <CompanyCard key={company.tool_id} company={company} variant="row" categories={categories} useCases={useCases} />
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              className="mt-6 rounded-[18px] border p-3 sm:p-0 sm:border-0 sm:rounded-none flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2"
              style={{ borderColor: 'var(--t-border)', background: 'var(--t-card-bg)' }}
            >
              <Link
                href={prevHref}
                aria-disabled={page === 1}
                className="px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold border transition-all duration-150 disabled:opacity-30 flex-1 sm:flex-none"
                style={{
                  borderColor: 'rgba(255,255,255,0.12)',
                  color: 'var(--color-text-secondary)',
                  background: 'transparent',
                  pointerEvents: page === 1 ? 'none' : 'auto',
                  opacity: page === 1 ? 0.3 : 1,
                }}
              >
                Prev
              </Link>

              <div
                className="sm:hidden text-center text-xs font-bold px-3 py-2 rounded-full border"
                style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'var(--color-text-primary)', background: 'var(--t-ghost-bg)' }}
              >
                Page {page} / {totalPages}
              </div>

              <div className="hidden sm:flex items-center gap-1 overflow-x-auto max-w-full py-1 px-0.5">
                {getPageNumbers(page, totalPages).map((p, i) =>
                  p === '...' ? (
                    <span
                      key={`ellipsis-${i}`}
                      className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-xs sm:text-sm flex-shrink-0"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      ...
                    </span>
                  ) : (
                    <Link
                      key={p}
                      href={buildQueryString({ ...query, page: p as number })}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full text-xs sm:text-sm font-bold border transition-all duration-150 flex-shrink-0 flex items-center justify-center"
                      style={
                        p === page
                          ? { background: 'linear-gradient(135deg, rgba(124,58,237,.5), rgba(109,40,217,.4))', borderColor: 'rgba(124,58,237,.6)', color: '#E9D5FF' }
                          : { background: 'transparent', borderColor: 'rgba(255,255,255,0.08)', color: 'var(--color-text-muted)' }
                      }
                    >
                      {p}
                    </Link>
                  )
                )}
              </div>

              <Link
                href={nextHref}
                aria-disabled={page === totalPages}
                className="px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold border transition-all duration-150 disabled:opacity-30 flex-1 sm:flex-none"
                style={{
                  borderColor: 'rgba(255,255,255,0.12)',
                  color: 'var(--color-text-secondary)',
                  background: 'transparent',
                  pointerEvents: page === totalPages ? 'none' : 'auto',
                  opacity: page === totalPages ? 0.3 : 1,
                }}
              >
                Next
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
    </>
  )
}
