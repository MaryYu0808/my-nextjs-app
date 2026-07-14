import type { Metadata } from 'next'
import WeeklyUpdatesView from '@/views/WeeklyUpdatesPage'
import { normalizeCompany, type RawCompany } from '@/lib/normalize'
import { buildSeoMetadata } from '@/lib/seo'
import type { Category, Company, UseCase } from '@/types'

export const metadata: Metadata = buildSeoMetadata(
  'Weekly Updates | ProcurementAI',
  'See which AI-enabled procurement companies were newly added or updated in the ProcurementAI directory this week.',
  '/weekly-updates'
)

interface WeeklyResponse {
  count: number
  list: RawCompany[]
  date_begin?: string
  date_end?: string
}

interface ApiResponse<T> {
  status: string
  data: T
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

async function fetchWeeklyCompanies(): Promise<{
  companies: Company[]
  total: number
  dateBegin: string
  dateEnd: string
}> {
  const baseUrl = process.env.BASEURL_SSR
  const res = await fetch(`${baseUrl}/company/weekly`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`SSR fetch failed: ${res.status}`)
  const json: ApiResponse<WeeklyResponse> = await res.json()
  const { count, list, date_begin, date_end } = json.data
  return {
    companies: list.map(normalizeCompany),
    total: count,
    dateBegin: date_begin ?? '',
    dateEnd: date_end ?? '',
  }
}

export default async function WeeklyUpdatesPage() {
  const [{ companies, total, dateBegin, dateEnd }, categories, useCases] = await Promise.all([
    fetchWeeklyCompanies(),
    postSSR<Category[]>('workflow-category/list'),
    postSSR<UseCase[]>('use-case/list'),
  ])
  return (
    <WeeklyUpdatesView
      companies={companies}
      total={total}
      dateBegin={dateBegin}
      dateEnd={dateEnd}
      categories={categories}
      useCases={useCases}
    />
  )
}
