import type { Metadata } from 'next'
import HomeView from '@/views/HomePage'
import { buildSeoMetadata } from '@/lib/seo'
import type { Category } from '@/types'

export const metadata: Metadata = buildSeoMetadata(
  'ProcurementAI – Navigate the AI Procurement Technology Market',
  'A structured, independent directory of AI-enabled procurement companies — mapped by workflow, use case, and automation maturity.',
  '/'
)

interface ApiResponse<T> {
  status: string
  data: T
}

interface Stats {
  companies: number
  categories: number
  cases: number
  verified_at: string
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

export default async function HomePage() {
  // Fetch data on the server
  const [categories, stats] = await Promise.all([
    postSSR<Category[]>('workflow-category/list').then(uniqueBySlug),
    postSSR<Stats>('statistics/get').catch(() => ({
      companies: 0,
      categories: 0,
      cases: 0,
      verified_at: '—',
    })),
  ])

  return <HomeView categories={categories} stats={stats} />
}
