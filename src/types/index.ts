export interface Company {
  tool_id: string
  tool_name: string
  tool_slug: string
  vendor_name: string
  website_url: string
  logo_url?: string
  taxonomy_version?: string
  primary_category: string
  capability_tags?: string[]
  use_cases: string[]
  automation_level: 'Assistive' | 'Semi-automated' | 'Autonomous' | 'Agentic'
  one_liner?: string
  short_description?: string
  sources?: string[]
  updated_utc: string
  headquarters?: string
  founded_year?: number
  key_modules?: string[]
  tool_count?: number
  original_tool_slugs?: string[]
  tier?: string
  linkedin_url?: string
  twitter_url?: string
  contact_email?: string
}

export interface Category {
  slug: string
  name: string
  description: string
}

export interface UseCase {
  slug: string
  name: string
  description: string
}

export interface Capability {
  capability: string
  tool_count: number
  tool_slugs: string[]
}

// 添加或扩展 Company 类型
export interface Company {
  // ... existing fields
  employee_count?: string | null  // 如 "51-200"
  funding_stage?: string | null   // 如 "Series A"
  funding_source?: string | null  // 可信的 funding 来源 URL
  integrations?: string[] | null  // 公开集成列表
  security_certifications?: string[] | null // 如 ["SOC 2", "ISO 27001"]
  security_url?: string | null    // Trust Center URL
  pricing_url?: string | null     // 定价页面 URL
  pricing_visibility?: 'public' | 'request_only' | 'not_disclosed' | null
}

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'Strategy & Spend Intelligence': 'Spend visibility, classification, and cost optimization insights.',
  'Sourcing & Supplier Discovery': 'Supplier discovery, market intelligence, and sourcing workflow support.',
  'Negotiation & Decision Intelligence': 'Bid analysis, negotiation support, and guided decision-making.',
  'Contract & Commercial Intelligence': 'AI-powered contract review, clause extraction, and compliance checks.',
  'Supplier Risk & ESG Intelligence': 'Continuous monitoring of supplier risk signals, ESG, and disruptions.',
  'Intake & Orchestration': 'Automate procurement requests, triage, and workflow orchestration.',
  'Procure-to-Pay Automation': 'Invoice capture, coding, approvals, and exception handling automation.',
  'Autonomous Procurement Systems': 'Agentic and autonomous procurement execution across workflows.',
}

export const AUTOMATION_LEVELS = ['Assistive', 'Semi-automated', 'Autonomous', 'Agentic'] as const
