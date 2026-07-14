// lib/mock-alternatives.ts

import type { Category, UseCase } from '../types'

// ===================== 扩展类型定义 =====================

export interface AlternativeCompany {
  tool_slug: string
  tool_name: string
  one_liner: string | null
  short_description: string | null
  logo_url: string | null
  website_url: string | null
  linkedin_url: string | null
  headquarters: string | null
  founded_year: number | null
  employee_count: string | null  // e.g. "51-200"
  primary_category: string | null
  use_cases: string[]  // use case slugs
  key_modules: string[]
  automation_level: 'Manual' | 'Semi-automated' | 'Agentic' | null
  updated_utc: string | null
  
  // Alternatives-specific fields
  alternativeType: 'Direct substitute' | 'Broader suite' | 'Specialized option'
  bestFitUseCase: string
  whyConsidered: string
  verificationNotes: string
  fundingDisplay: string | null
  pricingVisibility: string | null
  integrationsDisplay: string | null
  securityDisplay: string | null
}

export interface ScenarioGroup {
  title: string
  note: string
  companies: AlternativeCompany[]
}

export interface ComparisonRow {
  name: string
  slug: string
  context: string
  overlap: string
  difference: string
}

export interface AlternativesPageData {
  company: {
    tool_slug: string
    tool_name: string
    one_liner: string | null
    short_description: string | null
    logo_url: string | null
    website_url: string | null
    linkedin_url: string | null
    headquarters: string | null
    founded_year: number | null
    employee_count: string | null
    primary_category: string | null
    use_cases: string[]
    key_modules: string[]
    automation_level: 'Manual' | 'Semi-automated' | 'Agentic' | null
    updated_utc: string | null
  }
  alternatives: AlternativeCompany[]
  scenarioGroups: ScenarioGroup[]
  comparisonRows: ComparisonRow[]
}

// ===================== Mock 分类数据（匹配您的类型） =====================

export const mockCategories: Category[] = [
  { 
    slug: 'sourcing-supplier-discovery', 
    name: 'Sourcing & Supplier Discovery',
    description: 'Platforms that automate RFx processes, supplier discovery, and strategic sourcing workflows.'
  },
  { 
    slug: 'intake-orchestration', 
    name: 'Intake & Orchestration',
    description: 'Platforms that orchestrate intake-to-procure workflows with cross-functional approvals.'
  },
  { 
    slug: 'procurement-analytics', 
    name: 'Procurement Analytics',
    description: 'Platforms that provide spend analytics, should-cost modeling, and procurement intelligence.'
  },
  { 
    slug: 'contract-management', 
    name: 'Contract Management',
    description: 'Platforms that automate contract lifecycle management and CLM workflows.'
  },
  { 
    slug: 'supplier-management', 
    name: 'Supplier Management',
    description: 'Platforms that manage supplier onboarding, performance, and risk.'
  },
  { 
    slug: 'spend-management', 
    name: 'Spend Management',
    description: 'Platforms that provide spend visibility, control, and optimization.'
  },
]

// ===================== Mock 用例数据（匹配您的类型） =====================

export const mockUseCases: UseCase[] = [
  { 
    slug: 'rfx-automation', 
    name: 'RFx Automation',
    description: 'Automate the creation and management of RFx processes.'
  },
  { 
    slug: 'supplier-discovery', 
    name: 'Supplier Discovery',
    description: 'Discover and evaluate potential suppliers.'
  },
  { 
    slug: 'spend-analytics', 
    name: 'Spend Analytics',
    description: 'Analyze spend patterns and identify savings opportunities.'
  },
  { 
    slug: 'should-cost-modeling', 
    name: 'Should-cost Modeling',
    description: 'Model and estimate product costs for negotiation.'
  },
  { 
    slug: 'intake-orchestration', 
    name: 'Intake Orchestration',
    description: 'Orchestrate purchase requests through approval workflows.'
  },
  { 
    slug: 'approval-workflows', 
    name: 'Approval Workflows',
    description: 'Automate cross-functional approval processes.'
  },
  { 
    slug: 'po-automation', 
    name: 'PO Automation',
    description: 'Automate purchase order creation and management.'
  },
  { 
    slug: 'contract-management', 
    name: 'Contract Management',
    description: 'Manage contract lifecycle and compliance.'
  },
  { 
    slug: 'market-intelligence', 
    name: 'Market Intelligence',
    description: 'Gather and analyze market data for procurement.'
  },
  { 
    slug: 'ai-agents', 
    name: 'AI Agents',
    description: 'AI-powered agents for automated procurement tasks.'
  },
  { 
    slug: 'negotiation-intelligence', 
    name: 'Negotiation Intelligence',
    description: 'AI-powered insights for supplier negotiations.'
  },
  { 
    slug: 'tail-spend-sourcing', 
    name: 'Tail-spend Sourcing',
    description: 'Sourcing automation for tail-spend purchases.'
  },
  { 
    slug: 'bid-evaluation', 
    name: 'Bid Evaluation',
    description: 'Intelligent bid analysis and comparison.'
  },
]

// ===================== Mock 公司数据 =====================

// 主公司: Procol
const procol: AlternativesPageData['company'] = {
  tool_slug: 'procol',
  tool_name: 'Procol',
  one_liner: 'AI-powered sourcing and procurement platform',
  short_description: 'Procol provides an AI-enabled sourcing platform that automates RFx processes, supplier discovery, and negotiation workflows for procurement teams. The platform focuses on streamlining strategic sourcing with intelligent bid analysis and supplier recommendations.',
  logo_url: null,
  website_url: 'https://www.procol.io',
  linkedin_url: 'https://linkedin.com/company/procol',
  headquarters: 'India',
  founded_year: 2018,
  employee_count: '51-200',
  primary_category: 'sourcing-supplier-discovery',
  use_cases: ['rfx-automation', 'supplier-discovery', 'bid-evaluation', 'negotiation-intelligence'],
  key_modules: ['RFx Automation', 'Supplier Discovery', 'Bid Evaluation', 'Negotiation Intelligence', 'Analytics'],
  automation_level: 'Semi-automated',
  updated_utc: '2026-06-29T10:00:00Z',
}

// 替代公司 1: Fairmarkit
const fairmarkit: AlternativeCompany = {
  tool_slug: 'fairmarkit',
  tool_name: 'Fairmarkit',
  one_liner: 'Autonomous sourcing for tail-spend and strategic procurement',
  short_description: 'Fairmarkit automates tail-spend sourcing, auto-generating RFQs and recommending suppliers for high-volume, low-value purchases.',
  logo_url: null,
  website_url: 'https://www.fairmarkit.com',
  linkedin_url: 'https://linkedin.com/company/fairmarkit',
  headquarters: 'US',
  founded_year: 2017,
  employee_count: '51-200',
  primary_category: 'sourcing-supplier-discovery',
  use_cases: ['rfx-automation', 'supplier-discovery', 'tail-spend-sourcing', 'bid-evaluation'],
  key_modules: ['RFx Automation', 'Supplier Discovery', 'Tail-spend Sourcing', 'Bid Evaluation'],
  automation_level: 'Semi-automated',
  updated_utc: '2026-06-29T10:00:00Z',
  
  // Alternatives-specific
  alternativeType: 'Direct substitute',
  bestFitUseCase: 'May fit evaluations focused on RFx automation, supplier discovery, and tail-spend sourcing.',
  whyConsidered: 'May fit evaluations focused on RFx automation, supplier discovery, and tail-spend sourcing. Classified as direct substitute based on workflow fit, use case overlap, and public product positioning.',
  verificationNotes: 'Sourcing event coverage · ERP / P2P integration · AI agent scope · Governance controls',
  fundingDisplay: 'Series C · $50M+ raised',
  pricingVisibility: 'Not publicly disclosed',
  integrationsDisplay: 'SAP, Oracle, NetSuite, Coupa, Ariba',
  securityDisplay: 'SOC 2 Type II · ISO 27001',
}

// 替代公司 2: Part Analytics
const partAnalytics: AlternativeCompany = {
  tool_slug: 'part-analytics',
  tool_name: 'Part Analytics',
  one_liner: 'Direct-material procurement intelligence',
  short_description: 'Part Analytics focuses on direct-material procurement, harmonizing multi-source data for should-cost modeling and supply risk.',
  logo_url: null,
  website_url: 'https://www.partanalytics.com',
  linkedin_url: 'https://linkedin.com/company/part-analytics',
  headquarters: 'US',
  founded_year: 2019,
  employee_count: '11-50',
  primary_category: 'sourcing-supplier-discovery',
  use_cases: ['spend-analytics', 'should-cost-modeling', 'supplier-discovery', 'rfx-automation'],
  key_modules: ['Spend Analytics', 'Should-cost Modeling', 'Supplier Discovery', 'RFx Automation'],
  automation_level: 'Semi-automated',
  updated_utc: '2026-06-29T10:00:00Z',
  
  // Alternatives-specific
  alternativeType: 'Specialized option',
  bestFitUseCase: 'May fit evaluations focused on direct-material procurement, spend analytics, and should-cost modeling.',
  whyConsidered: 'May fit evaluations focused on direct-material procurement, spend analytics, and should-cost modeling. Classified as specialized option based on workflow fit, use case overlap, and public product positioning.',
  verificationNotes: 'Direct-material fit · Spend data model · Integration requirements · Regional support',
  fundingDisplay: 'Series A · $10M+ raised',
  pricingVisibility: 'Not publicly disclosed',
  integrationsDisplay: 'SAP, Oracle, NetSuite',
  securityDisplay: 'SOC 2 Type II',
}

// 替代公司 3: Zip
const zip: AlternativeCompany = {
  tool_slug: 'zip',
  tool_name: 'Zip',
  one_liner: 'Intake-to-procure orchestration platform',
  short_description: 'Zip provides an intake-to-procure orchestration platform that routes purchase requests through automated approval workflows across finance, legal, and procurement.',
  logo_url: null,
  website_url: 'https://www.ziphq.com',
  linkedin_url: 'https://linkedin.com/company/zip',
  headquarters: 'US',
  founded_year: 2020,
  employee_count: '501-1,000',
  primary_category: 'intake-orchestration',
  use_cases: ['intake-orchestration', 'approval-workflows', 'po-automation', 'contract-management'],
  key_modules: ['Intake Orchestration', 'Approval Workflows', 'PO Automation', 'Contract Management'],
  automation_level: 'Agentic',
  updated_utc: '2026-06-29T10:00:00Z',
  
  // Alternatives-specific
  alternativeType: 'Broader suite',
  bestFitUseCase: 'May fit evaluations focused on intake orchestration and cross-functional approval workflows.',
  whyConsidered: 'May fit evaluations focused on intake orchestration and cross-functional approval workflows. Classified as broader suite based on workflow fit, use case overlap, and public product positioning.',
  verificationNotes: 'Intake vs full S2P scope · Approval workflow depth · Integration architecture · Implementation scope',
  fundingDisplay: 'Series D · $100M+ raised',
  pricingVisibility: 'Not publicly disclosed',
  integrationsDisplay: 'SAP, Oracle, NetSuite, Slack, Microsoft Teams',
  securityDisplay: 'SOC 2 Type II · ISO 27001 · Trust Center available',
}

// 替代公司 4: Delvo
const delvo: AlternativeCompany = {
  tool_slug: 'delvo',
  tool_name: 'Delvo',
  one_liner: 'Agentic sourcing with real-time market intelligence',
  short_description: 'Delvo is an agentic sourcing system delivering real-time market intelligence and automated negotiation support.',
  logo_url: null,
  website_url: 'https://www.delvo.ai',
  linkedin_url: 'https://linkedin.com/company/delvo',
  headquarters: 'DE',
  founded_year: 2023,
  employee_count: '1-10',
  primary_category: 'sourcing-supplier-discovery',
  use_cases: ['supplier-discovery', 'market-intelligence', 'ai-agents', 'negotiation-intelligence'],
  key_modules: ['Supplier Discovery', 'Market Intelligence', 'AI Agents', 'Negotiation Intelligence'],
  automation_level: 'Agentic',
  updated_utc: '2026-06-29T10:00:00Z',
  
  // Alternatives-specific
  alternativeType: 'Specialized option',
  bestFitUseCase: 'May fit evaluations focused on agentic sourcing workflows and procurement market intelligence.',
  whyConsidered: 'May fit evaluations focused on agentic sourcing workflows and procurement market intelligence. Classified as specialized option based on workflow fit, use case overlap, and public product positioning.',
  verificationNotes: 'Agentic AI scope · Workflow maturity · Integration requirements · Regional support',
  fundingDisplay: null, // Hidden - no credible public source
  pricingVisibility: 'Not publicly disclosed',
  integrationsDisplay: null,
  securityDisplay: null,
}

// 所有替代公司列表
const allAlternatives = [fairmarkit, partAnalytics, zip, delvo]

// ===================== Mock 数据生成函数 =====================

/**
 * 根据主公司 slug 获取 Alternatives 页面所需的所有数据
 */
export function getAlternativesPageData(slug: string): AlternativesPageData | null {
  // 如果是 procol，返回完整数据
  if (slug === 'procol') {
    return {
      company: procol,
      alternatives: allAlternatives,
      scenarioGroups: buildScenarioGroups(allAlternatives),
      comparisonRows: buildComparisonRows(procol, allAlternatives),
    }
  }
  
  // 如果是其他公司，基于分类和用例动态生成
  const company = getMockCompanyBySlug(slug)
  if (!company) return null
  
  // 根据公司的分类和用例找到相关的替代公司
  const related = allAlternatives.filter(alt => {
    // 排除自己
    if (alt.tool_slug === slug) return false
    // 共享至少一个 use case
    return alt.use_cases.some(uc => company.use_cases.includes(uc))
  })
  
  return {
    company: company as AlternativesPageData['company'],
    alternatives: related.length > 0 ? related : allAlternatives.slice(0, 3),
    scenarioGroups: buildScenarioGroups(related.length > 0 ? related : allAlternatives.slice(0, 3)),
    comparisonRows: buildComparisonRows(company, related.length > 0 ? related : allAlternatives.slice(0, 3)),
  }
}

/**
 * 获取单个公司的 mock 数据（通过 slug）
 */
function getMockCompanyBySlug(slug: string): AlternativesPageData['company'] | null {
  // 扩展其他公司的 mock 数据
  const companies: Record<string, AlternativesPageData['company']> = {
    procol: procol,
    fairmarkit: {
      tool_slug: 'fairmarkit',
      tool_name: 'Fairmarkit',
      one_liner: 'Autonomous sourcing for tail-spend and strategic procurement',
      short_description: 'Fairmarkit automates tail-spend sourcing, auto-generating RFQs and recommending suppliers for high-volume, low-value purchases.',
      logo_url: null,
      website_url: 'https://www.fairmarkit.com',
      linkedin_url: 'https://linkedin.com/company/fairmarkit',
      headquarters: 'US',
      founded_year: 2017,
      employee_count: '51-200',
      primary_category: 'sourcing-supplier-discovery',
      use_cases: ['rfx-automation', 'supplier-discovery', 'tail-spend-sourcing'],
      key_modules: ['RFx Automation', 'Supplier Discovery', 'Tail-spend Sourcing'],
      automation_level: 'Semi-automated',
      updated_utc: '2026-06-29T10:00:00Z',
    },
    'part-analytics': {
      tool_slug: 'part-analytics',
      tool_name: 'Part Analytics',
      one_liner: 'Direct-material procurement intelligence',
      short_description: 'Part Analytics focuses on direct-material procurement, harmonizing multi-source data for should-cost modeling and supply risk.',
      logo_url: null,
      website_url: 'https://www.partanalytics.com',
      linkedin_url: 'https://linkedin.com/company/part-analytics',
      headquarters: 'US',
      founded_year: 2019,
      employee_count: '11-50',
      primary_category: 'sourcing-supplier-discovery',
      use_cases: ['spend-analytics', 'should-cost-modeling', 'supplier-discovery'],
      key_modules: ['Spend Analytics', 'Should-cost Modeling', 'Supplier Discovery'],
      automation_level: 'Semi-automated',
      updated_utc: '2026-06-29T10:00:00Z',
    },
    zip: {
      tool_slug: 'zip',
      tool_name: 'Zip',
      one_liner: 'Intake-to-procure orchestration platform',
      short_description: 'Zip provides an intake-to-procure orchestration platform that routes purchase requests through automated approval workflows.',
      logo_url: null,
      website_url: 'https://www.ziphq.com',
      linkedin_url: 'https://linkedin.com/company/zip',
      headquarters: 'US',
      founded_year: 2020,
      employee_count: '501-1,000',
      primary_category: 'intake-orchestration',
      use_cases: ['intake-orchestration', 'approval-workflows', 'po-automation'],
      key_modules: ['Intake Orchestration', 'Approval Workflows', 'PO Automation'],
      automation_level: 'Agentic',
      updated_utc: '2026-06-29T10:00:00Z',
    },
    delvo: {
      tool_slug: 'delvo',
      tool_name: 'Delvo',
      one_liner: 'Agentic sourcing with real-time market intelligence',
      short_description: 'Delvo is an agentic sourcing system delivering real-time market intelligence and automated negotiation support.',
      logo_url: null,
      website_url: 'https://www.delvo.ai',
      linkedin_url: 'https://linkedin.com/company/delvo',
      headquarters: 'DE',
      founded_year: 2023,
      employee_count: '1-10',
      primary_category: 'sourcing-supplier-discovery',
      use_cases: ['supplier-discovery', 'market-intelligence', 'ai-agents'],
      key_modules: ['Supplier Discovery', 'Market Intelligence', 'AI Agents'],
      automation_level: 'Agentic',
      updated_utc: '2026-06-29T10:00:00Z',
    },
  }
  
  return companies[slug] || null
}

/**
 * 构建场景分组
 */
function buildScenarioGroups(alternatives: AlternativeCompany[]): ScenarioGroup[] {
  const groups: Record<string, AlternativeCompany[]> = {
    'Direct substitute': [],
    'Broader suite': [],
    'Specialized option': [],
  }
  
  alternatives.forEach(alt => {
    if (groups[alt.alternativeType]) {
      groups[alt.alternativeType].push(alt)
    }
  })
  
  const scenarioMap: Record<string, { title: string; note: string }> = {
    'Direct substitute': {
      title: 'Sourcing & RFx Automation Alternatives',
      note: 'May be considered when the evaluation focuses on RFx execution, supplier discovery, and sourcing workflow automation.',
    },
    'Broader suite': {
      title: 'Intake & Orchestration Alternatives',
      note: 'May be considered when the evaluation prioritizes intake-to-procure orchestration and cross-functional approvals.',
    },
    'Specialized option': {
      title: 'Agentic / AI-Native Alternatives',
      note: 'May be considered when the evaluation focuses on agentic sourcing workflows and procurement market intelligence.',
    },
  }
  
  const result: ScenarioGroup[] = []
  
  Object.entries(groups).forEach(([key, companies]) => {
    if (companies.length > 0) {
      const scenario = scenarioMap[key]
      result.push({
        title: scenario?.title || key,
        note: scenario?.note || '',
        companies,
      })
    }
  })
  
  return result.length > 0 ? result : [
    {
      title: 'Alternatives',
      note: 'Alternative companies grouped by workflow relevance.',
      companies: alternatives,
    },
  ]
}

/**
 * 构建比较表格数据
 */
function buildComparisonRows(
  company: AlternativesPageData['company'],
  alternatives: AlternativeCompany[]
): ComparisonRow[] {
  // 定义每个公司特有的比较数据
  const comparisonData: Record<string, { context: string; overlap: string; difference: string }> = {
    fairmarkit: {
      context: 'Autonomous / tail-spend sourcing',
      overlap: 'RFx automation, supplier discovery, tail-spend',
      difference: 'AI agent scope, event coverage, ERP/P2P integration',
    },
    'part-analytics': {
      context: 'Direct-material spend analytics',
      overlap: 'Spend analytics, should-cost, supplier discovery',
      difference: 'Direct vs indirect fit, data model, integrations',
    },
    zip: {
      context: 'Intake & orchestration',
      overlap: 'Intake, approvals, guided workflows',
      difference: 'Whether full S2P suite is required vs intake-first',
    },
    delvo: {
      context: 'Agentic sourcing & market intel',
      overlap: 'Supplier discovery, market intelligence, AI agents',
      difference: 'Agentic AI scope, workflow maturity, region',
    },
  }
  
  return alternatives.map(alt => {
    const data = comparisonData[alt.tool_slug] || {
      context: alt.primary_category || '—',
      overlap: alt.use_cases.slice(0, 3).join(', ') || '—',
      difference: 'Verify scope, integration, and implementation',
    }
    
    return {
      name: alt.tool_name,
      slug: alt.tool_slug,
      context: data.context,
      overlap: data.overlap,
      difference: data.difference,
    }
  })
}

// ===================== 辅助函数 =====================

/**
 * 获取分类名称（通过 slug）
 */
export function getCategoryName(slug: string | null): string {
  if (!slug) return '—'
  const category = mockCategories.find(c => c.slug === slug)
  return category?.name || slug
}

/**
 * 获取用例名称（通过 slug）
 */
export function getUseCaseName(slug: string): string {
  const useCase = mockUseCases.find(u => u.slug === slug)
  return useCase?.name || slug
}

/**
 * 获取用例名称列表（通过 slugs）
 */
export function getUseCaseNames(slugs: string[]): string[] {
  return slugs.map(slug => getUseCaseName(slug))
}

// ===================== 导出所有 =====================

export {
  procol,
  fairmarkit,
  partAnalytics,
  zip,
  delvo,
  allAlternatives,
}