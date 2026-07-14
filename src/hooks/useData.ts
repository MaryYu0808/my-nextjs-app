import { useState, useEffect } from 'react'
import type { Company, Category, UseCase } from '../types'
import { apiPost } from '../lib/api'
import { normalizeCompany, type RawCompany } from '../lib/normalize'


interface DirectoryData {
  companies: Company[]
  categories: Category[]
  useCases: UseCase[]
  loading: boolean
  error: string | null
}

function uniqueBySlug<T extends { slug: string }>(items: T[]): T[] {
  const seen = new Set<string>()
  return items.filter((item) => {
    if (seen.has(item.slug)) return false
    seen.add(item.slug)
    return true
  })
}

let cache: Partial<DirectoryData> = {}

export function useDirectoryData(): DirectoryData {
  const [data, setData] = useState<DirectoryData>({
    companies: cache.companies ?? [],
    categories: cache.categories ?? [],
    useCases: cache.useCases ?? [],
    loading: !cache.companies,
    error: null,
  })

  useEffect(() => {
    if (cache.companies) return
    let cancelled = false
    Promise.all([
      apiPost<{ count: number; list: RawCompany[] }>('company/list', { filter: {} }).then(({ list }) => list.map(normalizeCompany)),
      apiPost<Category[]>('workflow-category/list'),
      apiPost<UseCase[]>('use-case/list'),
    ])
      .then(([companies, categories, useCases]) => {
        const uniqueCategories = uniqueBySlug(categories)
        const uniqueUseCases = uniqueBySlug(useCases)
        cache = { companies, categories: uniqueCategories, useCases: uniqueUseCases }
        if (!cancelled) {
          setData({ companies, categories: uniqueCategories, useCases: uniqueUseCases, loading: false, error: null })
        }
      })
      .catch((err: unknown) => {
        const msg = String(err)
        if (!cancelled) {
          setData((prev) => ({ ...prev, loading: false, error: msg }))
          alert(`Data loading failed: ${msg}`)
        }
      })
    return () => { cancelled = true }
  }, [])

  return data
}

export function useWeeklyCompanies(): { companies: Company[]; total: number; dateBegin: string; dateEnd: string; loading: boolean; error: string | null } {
  const [state, setState] = useState<{ companies: Company[]; total: number; dateBegin: string; dateEnd: string; loading: boolean; error: string | null }>({
    companies: [], total: 0, dateBegin: '', dateEnd: '', loading: true, error: null,
  })

  useEffect(() => {
    let cancelled = false
    apiPost<{ count: number; list: RawCompany[]; date_begin: string; date_end: string }>('company/weekly')
      .then(({ count, list, date_begin, date_end }) => {
        if (!cancelled) setState({ companies: list.map(normalizeCompany), total: count, dateBegin: date_begin ?? '', dateEnd: date_end ?? '', loading: false, error: null })
      })
      .catch((err: unknown) => {
        const msg = String(err)
        if (!cancelled) {
          setState((prev) => ({ ...prev, loading: false, error: msg }))
          alert(`Failed to load weekly updates: ${msg}`)
        }
      })
    return () => { cancelled = true }
  }, [])

  return state
}

export interface CompanyFilter {
  category?: string
  use_case?: string
  automation_maturity?: number
  name?: string
}

const LIST_PAGE_SIZE = 10

export function useCompanyList(
  filter: CompanyFilter,
  page: number,
): { companies: Company[]; total: number; loading: boolean; error: string | null } {
  const [state, setState] = useState<{
    companies: Company[]
    total: number
    loading: boolean
    error: string | null
  }>({ companies: [], total: 0, loading: true, error: null })

  const filterKey = JSON.stringify(filter)

  useEffect(() => {
    let cancelled = false
    setState((prev) => ({ ...prev, loading: true, error: null }))
    apiPost<{ count: number; list: RawCompany[] }>('company/list', {
      filter,
      page,
      page_size: LIST_PAGE_SIZE,
    })
      .then(({ count, list }) => {
        if (!cancelled) {
          setState({ companies: list.map(normalizeCompany), total: count, loading: false, error: null })
        }
      })
      .catch((err: unknown) => {
        const msg = String(err)
        if (!cancelled) {
          setState((prev) => ({ ...prev, loading: false, error: msg }))
          alert(`Failed to load companies: ${msg}`)
        }
      })
    return () => { cancelled = true }
  }, [filterKey, page]) // eslint-disable-line react-hooks/exhaustive-deps

  return state
}

export function useCompany(slug: string): { company: Company | null; loading: boolean; error: string | null } {
  const [state, setState] = useState<{ company: Company | null; loading: boolean; error: string | null }>({
    company: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    setState({ company: null, loading: true, error: null })
    apiPost<RawCompany>('company/detail', { slug })
      .then((raw) => {
        if (!cancelled) {
          setState({ company: normalizeCompany(raw), loading: false, error: null })
        }
      })
      .catch((err: unknown) => {
        const msg = String(err)
        if (!cancelled) {
          setState({ company: null, loading: false, error: msg })
          alert(`Failed to load company: ${msg}`)
        }
      })
    return () => { cancelled = true }
  }, [slug])

  return state
}
