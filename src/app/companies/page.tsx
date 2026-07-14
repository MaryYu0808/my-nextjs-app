import type { Metadata } from 'next'
import CompaniesView from '@/views/CompaniesPage'
import { normalizeCompany, type RawCompany } from '@/lib/normalize'
import { buildSeoMetadata } from '@/lib/seo'
import type { Category, Company, UseCase } from '@/types'

export const metadata: Metadata = buildSeoMetadata(
  'Explore AI procurement companies | ProcurementAI',
  'Browse AI-enabled procurement companies mapped across procurement workflows, use cases, and automation maturity levels.',
  '/companies'
)

interface ApiResponse<T> {
  status: string
  data: T
}

interface CompanyListResponse {
  count: number
  list: RawCompany[]
}

interface CompanyFilter {
  category?: string
  use_case?: string
  name?: string
}

interface SearchQuery {
  category: string
  uc: string
  name: string
  page: number
}

const PAGE_SIZE = 10

function uniqueBySlug<T extends { slug: string }>(items: T[]): T[] {
  const seen = new Set<string>()
  return items.filter((item) => {
    if (seen.has(item.slug)) return false
    seen.add(item.slug)
    return true
  })
}

function first(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? ''
  return value ?? ''
}

function parsePage(pageRaw: string): number {
  const n = Number.parseInt(pageRaw, 10)
  return Number.isFinite(n) && n > 0 ? n : 1
}

function buildFilter(query: SearchQuery): CompanyFilter {
  const filter: CompanyFilter = {}
  if (query.category) filter.category = query.category
  if (query.uc) filter.use_case = query.uc
  if (query.name.trim()) filter.name = query.name.trim()
  return filter
}

async function postSSR<T>(path: string, body?: unknown): Promise<T> {
  const baseUrl = process.env.BASEURL_SSR
  const res = await fetch(`${baseUrl}/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`SSR fetch failed: ${res.status} (${path})`)
  const json: ApiResponse<T> = await res.json()
  return json.data
}

export default async function CompaniesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const query: SearchQuery = {
    category: first(params.category),
    uc: first(params.uc),
    name: first(params.name),
    page: parsePage(first(params.page)),
  }

  const filter = buildFilter(query)

  const [companiesResp, categories, useCases] = await Promise.all([
    postSSR<CompanyListResponse>('company/list', {
      filter,
      page: query.page,
      page_size: PAGE_SIZE,
    }),
    postSSR<Category[]>('workflow-category/list'),
    postSSR<UseCase[]>('use-case/list'),
  ])

  const companies: Company[] = companiesResp.list.map(normalizeCompany)
  const uniqueCategories = uniqueBySlug(categories)
  const uniqueUseCases = uniqueBySlug(useCases)

  return (
    <CompaniesView
      companies={companies}
      total={companiesResp.count}
      categories={uniqueCategories}
      useCases={uniqueUseCases}
      query={query}
      pageSize={PAGE_SIZE}
    />
  )
}
