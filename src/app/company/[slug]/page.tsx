import type { Metadata } from 'next'
import CompanyProfileView from '@/views/CompanyProfilePage'
import { normalizeCompany, type RawCompany } from '@/lib/normalize'
import { buildSeoMetadata } from '@/lib/seo'
import type { Category, Company, UseCase } from '@/types'

interface ApiResponse<T> {
  status: string
  data: T
}

interface CompanyListResponse {
  count: number
  list: RawCompany[]
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

async function fetchCompany(slug: string): Promise<Company | null> {
  try {
    const raw = await postSSR<RawCompany>('company/detail', { slug })
    return normalizeCompany(raw)
  } catch {
    return null
  }
}

async function fetchRelatedCompanies(category: string, slug: string): Promise<Company[]> {
  if (!category) return []
  const resp = await postSSR<CompanyListResponse>('company/list', {
    filter: { category },
    page: 1,
    page_size: 6,
  })
  return resp.list.map(normalizeCompany).filter((c) => c.tool_slug !== slug).slice(0, 5)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const company = await fetchCompany(slug)
  if (!company) {
    return buildSeoMetadata('Company not found | ProcurementAI', 'The company profile you are looking for could not be found.', `/company/${slug}`)
  }
  return buildSeoMetadata(
    `${company.tool_name} | ProcurementAI`,
    company.one_liner || company.short_description || 'AI-enabled procurement company profile on ProcurementAI.',
    `/company/${slug}`
  )
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const company = await fetchCompany(slug)
  const [relatedCompanies, categories, useCases] = await Promise.all([
    company ? fetchRelatedCompanies(company.primary_category, slug) : Promise.resolve([]),
    postSSR<Category[]>('workflow-category/list'),
    postSSR<UseCase[]>('use-case/list'),
  ])

  return <CompanyProfileView company={company} relatedCompanies={relatedCompanies} categories={categories} useCases={useCases} />
}
