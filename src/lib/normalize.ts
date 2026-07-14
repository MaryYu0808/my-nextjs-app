import type { Company } from '../types'

interface RawCompanyMeta {
  logo_url?: string
  employee_range_name?: string
  industry_name?: string
  type_name?: string
  linkedin_count_employee?: number
  linkedin_count_follower?: number
  key_modules?: string[]
  specialties?: string[]
  linkedin_identifier?: string
}

export interface RawCompany {
  id: number
  slug: string
  name: string
  has_logo: number
  category: string
  use_cases: string
  automation_maturity: number
  tier: number
  country_code: string
  founded_year: number
  employee_range: string
  website_domain: string
  score: number
  is_claimed: string
  status: string
  intro: string
  meta: RawCompanyMeta | null
  data: { description?: string } | null
  created_at: number
  updated_at: number
}

const AUTOMATION_MAP: Record<number, Company['automation_level']> = {
  1: 'Assistive',
  2: 'Semi-automated',
  3: 'Autonomous',
  4: 'Agentic',
}

function uniqueStrings(list: string[]): string[] {
  return Array.from(new Set(list))
}

export function normalizeCompany(raw: RawCompany): Company {
  return {
    tool_id: `company_${raw.slug}`,
    tool_name: raw.name,
    tool_slug: raw.slug,
    vendor_name: raw.name,
    website_url: raw.website_domain ? `https://${raw.website_domain}` : '',
    logo_url: raw.meta?.logo_url,
    primary_category: raw.category,
    use_cases: raw.use_cases
      ? uniqueStrings(raw.use_cases.split(/\|\||,/).map((item) => item.trim()).filter(Boolean))
      : [],
    automation_level: AUTOMATION_MAP[raw.automation_maturity] ?? 'Assistive',
    one_liner: raw.intro,
    short_description: raw.data?.description,
    sources: [],
    updated_utc: new Date(raw.updated_at * 1000).toISOString(),
    headquarters: raw.country_code || undefined,
    founded_year: raw.founded_year || undefined,
    key_modules: raw.meta?.key_modules?.length ? raw.meta.key_modules : raw.meta?.specialties,
    linkedin_url: raw.meta?.linkedin_identifier ? `https://www.linkedin.com/company/${raw.meta.linkedin_identifier}/` : undefined,
    tier: String(raw.tier),
  }
}
