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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  try {
    const raw = await postSSR<RawCompany>('company/detail', { slug })
    const company = normalizeCompany(raw)
    return buildSeoMetadata(
      `Update ${company.tool_name} | ProcurementAI`,
      `Request updates to the ${company.tool_name} company profile on ProcurementAI.`,
      `/update/${slug}`
    )
  } catch {
    return buildSeoMetadata('Edit Company Profile | ProcurementAI', 'Edit to a company profile on ProcurementAI.', `/update/${slug}`)
  }
}

export default async function UpdatePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

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
