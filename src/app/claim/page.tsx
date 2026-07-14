import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import UpdateCompanyView from '@/views/ClaimPage'
import { normalizeCompany, type RawCompany } from '@/lib/normalize'
import { buildSeoMetadata } from '@/lib/seo'
import type { Category, Company, UseCase } from '@/types'

interface ApiResponse<T> {
  status: string
  data: T
}

function uniqueBySlug<T extends { slug: string }>(items: T[]): T[] {
  const seen = new Set<string>()
  return items.filter((item) => {
    if (seen.has(item.slug)) return false
    seen.add(item.slug)
    return true
  })
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

function first(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? ''
  return value ?? ''
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}): Promise<Metadata> {
  const params = await searchParams
  const slug = first(params.slug)
  if (!slug) {
    return buildSeoMetadata('Update Company Info | ProcurementAI', 'Request updates to a company profile on ProcurementAI.', '/claim')
  }
  try {
    const raw = await postSSR<RawCompany>('company/detail', { slug })
    const company = normalizeCompany(raw)
    return buildSeoMetadata(
      `Update ${company.tool_name} | ProcurementAI`,
      `Request updates to the ${company.tool_name} company profile on ProcurementAI.`,
      `/claim?slug=${slug}`
    )
  } catch {
    return buildSeoMetadata('Update Company Info | ProcurementAI', 'Request updates to a company profile on ProcurementAI.', '/claim')
  }
}

export default async function ClaimPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const slug = first(params.slug)

  if (!slug) notFound()

  let company: Company | null = null
  let categories: Category[] = []
  let useCases: UseCase[] = []

  try {
    const [rawCompany, rawCategories, rawUseCases] = await Promise.all([
      postSSR<RawCompany>('company/detail', { slug }),
      postSSR<Category[]>('workflow-category/list'),
      postSSR<UseCase[]>('use-case/list'),
    ])
    company = normalizeCompany(rawCompany)
    categories = uniqueBySlug(rawCategories)
    useCases = uniqueBySlug(rawUseCases)
  } catch {
    notFound()
  }

  if (!company) notFound()

  return <UpdateCompanyView company={company} categories={categories} useCases={useCases} />
}
