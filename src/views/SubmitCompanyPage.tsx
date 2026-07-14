'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '../components/Card'
import { FieldLabel } from '../components/FieldLabel'
import { FormSectionHeading, FormTagField, TagMultiSelect, TagSingleSelect } from '../components/FormOptions'
import { useDirectoryData } from '../hooks/useData'
import { apiPost } from '../lib/api'
import { generateBreadcrumbSchema } from '../lib/seo'

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.02)',
  borderColor: 'rgba(255,255,255,0.08)',
  color: 'var(--color-text-primary)',
}

export default function SubmitCompanyPage() {
  const { categories, useCases } = useDirectoryData()

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.procurementai.ai' },
    { name: 'Submit Company', url: 'https://www.procurementai.ai/submit-company' },
  ])

  const PRIMARY_USER_OPTIONS = [
    'Procurement Leadership / CPO',
    'Procurement Operations',
    'Strategic Sourcing',
    'Category Management',
    'Supplier Management / SRM',
    'Supplier Risk / ESG / Compliance',
    'Contracting / Legal',
    'Accounts Payable / Finance',
    'Business Requesters',
    'Operations / Supply Chain',
    'IT / Transformation',
    'Not sure',
  ] as const

  const PRIMARY_REGION_OPTIONS = [
    'Global',
    'North America',
    'Europe',
    'United Kingdom',
    'APAC',
    'Southeast Asia',
    'Mainland China',
    'Hong Kong',
    'Taiwan',
    'Japan / Korea',
    'India',
    'Middle East',
    'Latin America',
    'Africa',
    'Australia / New Zealand',
    'Not sure',
  ] as const

  const [profile, setProfile] = useState({
    name: '',
    website_url: '',
    product_page_url: '',
    linkedin_url: '',
    headline: '',
    description: '',
    procurement_relevance: '',
    ai_usage: '',
    ai_evidence_url: '',
    procurement_use_case_evidence: '',
    key_modules: '',
    headquarters: '',
    founded_year: '',
  })
  const [workflowCategory, setWorkflowCategory] = useState('')
  const [selectedUseCases, setSelectedUseCases] = useState<string[]>([])
  const [primaryUsers, setPrimaryUsers] = useState<string[]>([])
  const [primaryRegions, setPrimaryRegions] = useState<string[]>([])
  const [email, setEmail] = useState('')

  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const setProfileField = (field: keyof typeof profile) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setProfile(prev => ({ ...prev, [field]: e.target.value }))

  const MAX_USE_CASES = 5
  const workflowOptions = categories.map((cat) => ({ value: cat.slug, label: cat.name }))
  const useCaseOptions = useCases.map((uc) => ({ value: uc.slug, label: uc.name }))
  const primaryUserOptions = PRIMARY_USER_OPTIONS.map((opt) => ({ value: opt, label: opt }))
  const primaryRegionOptions = PRIMARY_REGION_OPTIONS.map((opt) => ({ value: opt, label: opt }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)
    try {
      if (!profile.procurement_relevance.trim()) {
        setSubmitError('Procurement Relevance is required.')
        setSubmitting(false)
        return
      }

      const payload = {
        profile: {
          ...profile,
          key_modules: profile.key_modules
            .split(',')
            .map(s => s.trim())
            .filter(Boolean),
          procurement_relevance: profile.procurement_relevance.trim() || undefined,
          ai_usage: profile.ai_usage.trim() || undefined,
          founded_year: profile.founded_year ? Number(profile.founded_year) : undefined,
        },
        suggested_workflow_category: workflowCategory || undefined,
        suggested_use_cases: selectedUseCases,
        primary_users: primaryUsers,
        primary_regions_served: primaryRegions,
        email,
      }
      await apiPost('request/submit', payload)
      setSubmitted(true)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Submission failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="max-w-[640px] mx-auto px-4 sm:px-6 py-20 text-center">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 border"
          style={{ background: 'rgba(34,197,94,0.12)', borderColor: 'rgba(34,197,94,0.35)' }}
        >
          <span className="text-2xl">✓</span>
        </div>
        <h1 className="text-2xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
          Submission received
        </h1>
        <p className="text-sm leading-relaxed mb-8 max-w-md mx-auto" style={{ color: 'var(--color-text-muted)' }}>
          Thank you for submitting. Your company will be reviewed for inclusion in the ProcurementAI directory.
        </p>
        <Link
          href="/companies"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold border"
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,.22), rgba(159,123,255,.14))',
            borderColor: 'rgba(124,58,237,.45)',
            color: 'var(--color-text-primary)',
          }}
        >
          Explore companies
        </Link>
      </div>
    )
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="w-full border-b" style={{ background: 'var(--t-page-header-bg)', borderColor: 'var(--t-border)' }}>
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.08]" style={{ color: 'var(--color-text-primary)' }}>
            Submit a Company
          </h1>
          <p className="text-base mt-2 max-w-5xl" style={{ color: 'var(--color-text-secondary)' }}>
            ProcurementAI accepts open submissions for AI-enabled procurement companies.
            All submissions are reviewed against our procurement relevance, AI capability, source quality, and taxonomy standards before publication. Submitted information may be accepted, edited, rejected, or reclassified.
            Submission does not guarantee inclusion, ranking, endorsement, or partnership.
          </p>
        </div>
      </section>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-12 sm:pb-16">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">

              <Card>
                <div className="space-y-5">
                  <div>
                    <FieldLabel required>Company Name</FieldLabel>
                    <input
                      required
                      className="w-full rounded-xl border px-3 py-2 text-sm"
                      style={inputStyle}
                      value={profile.name}
                      onChange={setProfileField('name')}
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <FieldLabel required>Official Website</FieldLabel>
                    <input
                      required
                      type="url"
                      className="w-full rounded-xl border px-3 py-2 text-sm"
                      style={inputStyle}
                      value={profile.website_url}
                      onChange={setProfileField('website_url')}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div>
                    <FieldLabel hint="A specific product, solution, or procurement-related page is more helpful than a general homepage.">
                      Product or Solution Page URL
                    </FieldLabel>
                    <input
                      type="url"
                      className="w-full rounded-xl border px-3 py-2 text-sm"
                      style={inputStyle}
                      value={profile.product_page_url}
                      onChange={setProfileField('product_page_url')}
                      placeholder="https://example.com/product"
                    />
                  </div>
                  <div>
                    <FieldLabel hint="Used to help verify the company entity and avoid duplicate or incorrect listings.">
                      Company LinkedIn URL
                    </FieldLabel>
                    <input
                      type="url"
                      className="w-full rounded-xl border px-3 py-2 text-sm"
                      style={inputStyle}
                      value={profile.linkedin_url}
                      onChange={setProfileField('linkedin_url')}
                      placeholder="https://www.linkedin.com/company/..."
                    />
                  </div>
                  <div>
                    <FieldLabel>One-liner</FieldLabel>
                    <input
                      className="w-full rounded-xl border px-3 py-2 text-sm"
                      style={inputStyle}
                      value={profile.headline}
                      onChange={setProfileField('headline')}
                      placeholder="A single sentence describing what the company does"
                    />
                  </div>
                  <div>
                    <FieldLabel>Short Description</FieldLabel>
                    <textarea
                      className="w-full rounded-xl border px-3 py-2 text-sm resize-y min-h-[100px]"
                      style={inputStyle}
                      value={profile.description}
                      onChange={setProfileField('description')}
                      placeholder="Describe the company&apos;s main procurement-related capabilities."
                    />
                  </div>
                  <div>
                    <FieldLabel
                      required
                      hint="Briefly explain how this company is relevant to procurement workflows, sourcing, supplier management, contracts, spend intelligence, procure-to-pay, supplier risk, or related procurement processes."
                    >
                      Procurement Relevance
                    </FieldLabel>
                    <textarea
                      required
                      className="w-full rounded-xl border px-3 py-2 text-sm resize-y min-h-[96px]"
                      style={inputStyle}
                      value={profile.procurement_relevance}
                      onChange={setProfileField('procurement_relevance')}
                      placeholder="Briefly explain why this company is relevant to procurement workflows"
                    />
                  </div>
                  <div>
                    <FieldLabel hint="List key product modules, procurement functions, or AI-enabled capabilities described by public sources or submitted information.">
                      Key Modules
                    </FieldLabel>
                    <input
                      className="w-full rounded-xl border px-3 py-2 text-sm"
                      style={inputStyle}
                      value={profile.key_modules}
                      onChange={setProfileField('key_modules')}
                      placeholder="Comma-separated keywords, e.g. Invoice Automation, Contract Review, Spend Analytics"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <FieldLabel>Headquarters</FieldLabel>
                      <input
                        className="w-full rounded-xl border px-3 py-2 text-sm"
                        style={inputStyle}
                        value={profile.headquarters}
                        onChange={setProfileField('headquarters')}
                        placeholder="City, Country"
                      />
                    </div>
                    <div>
                      <FieldLabel>Founded Year</FieldLabel>
                      <input
                        type="number"
                        min={1900}
                        max={new Date().getFullYear()}
                        className="w-full rounded-xl border px-3 py-2 text-sm"
                        style={inputStyle}
                        value={profile.founded_year}
                        onChange={setProfileField('founded_year')}
                        placeholder="e.g. 2018"
                      />
                    </div>
                  </div>

                  <FormSectionHeading title="Classification" />

                  <div className="space-y-0">
                    <FormTagField>
                      <FieldLabel hint="Choose the primary procurement workflow where this company appears most relevant. This is a suggestion and may be reviewed or reclassified by ProcurementAI.">
                        Suggested Workflow Category
                      </FieldLabel>
                      <TagSingleSelect
                        options={workflowOptions}
                        value={workflowCategory}
                        onChange={setWorkflowCategory}
                      />
                    </FormTagField>

                    <FormTagField>
                      <div className="flex items-center justify-between gap-3">
                        <FieldLabel hint="Select the procurement use cases this company appears to support. These are suggestions and may be reviewed or reclassified by ProcurementAI.">
                          Suggested Use Cases
                        </FieldLabel>
                        <span className="text-xs shrink-0" style={{ color: selectedUseCases.length >= MAX_USE_CASES ? '#f87171' : 'var(--color-text-muted)' }}>
                          {selectedUseCases.length} / {MAX_USE_CASES}
                        </span>
                      </div>
                      {selectedUseCases.length >= MAX_USE_CASES && (
                        <p className="text-xs" style={{ color: '#f87171' }}>Maximum {MAX_USE_CASES} use cases reached. Deselect one to choose another.</p>
                      )}
                      <TagMultiSelect
                        options={useCaseOptions}
                        value={selectedUseCases}
                        onChange={setSelectedUseCases}
                        maxSelected={MAX_USE_CASES}
                      />
                    </FormTagField>

                    <FormTagField>
                      <FieldLabel hint="Select the procurement or business users this product is most relevant for. This helps ProcurementAI improve future comparison and buyer research features.">
                        Primary Users
                      </FieldLabel>
                      <TagMultiSelect
                        options={primaryUserOptions}
                        value={primaryUsers}
                        onChange={setPrimaryUsers}
                      />
                    </FormTagField>

                    <FormTagField>
                      <FieldLabel hint="Select the regions where the company appears to actively serve customers or market its solution. You may select multiple regions. Submitted regions may be reviewed or reclassified.">
                        Primary Regions Served
                      </FieldLabel>
                      <TagMultiSelect
                        options={primaryRegionOptions}
                        value={primaryRegions}
                        onChange={setPrimaryRegions}
                      />
                    </FormTagField>
                  </div>

                  <FormSectionHeading title="AI & Evidence" />

                  <div>
                    <FieldLabel>How is AI used in this product?</FieldLabel>
                    <textarea
                      className="w-full rounded-xl border px-3 py-2 text-sm resize-y min-h-[96px]"
                      style={inputStyle}
                      value={profile.ai_usage}
                      onChange={setProfileField('ai_usage')}
                      placeholder="Briefly describe how AI is used: insights, recommendations, document analysis, workflow automation, agentic tasks, or autonomous actions"
                    />
                  </div>

                  <div>
                    <FieldLabel hint="Link to a product page, demo, documentation, blog post, case study, or announcement that explains how AI is used.">
                      AI Capability Evidence URL
                    </FieldLabel>
                    <input
                      type="url"
                      className="w-full rounded-xl border px-3 py-2 text-sm"
                      style={inputStyle}
                      value={profile.ai_evidence_url}
                      onChange={setProfileField('ai_evidence_url')}
                      placeholder="https://example.com/ai-capability"
                    />
                  </div>

                  <div>
                    <FieldLabel>Procurement Use Case Evidence</FieldLabel>
                    <textarea
                      className="w-full rounded-xl border px-3 py-2 text-sm resize-y min-h-[90px]"
                      style={inputStyle}
                      value={profile.procurement_use_case_evidence}
                      onChange={setProfileField('procurement_use_case_evidence')}
                      placeholder="Provide a source URL or short explanation showing procurement use in sourcing, supplier management, contracts, spend, P2P, or supplier risk."
                    />
                  </div>

                  <FormSectionHeading title="Contact" />

                  <div>
                    <FieldLabel required hint="Used only if we need to verify or clarify the submission.">
                      Your Email
                    </FieldLabel>
                    <input
                      required
                      type="email"
                      className="w-full rounded-xl border px-3 py-2 text-sm"
                      style={inputStyle}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@company.com"
                    />
                  </div>
                  <div
                    className="rounded-xl border px-4 py-3 text-xs leading-relaxed"
                    style={{
                      background: 'rgba(124,58,237,0.06)',
                      borderColor: 'rgba(124,58,237,0.22)',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    Submissions are reviewed against the company schema and taxonomy before inclusion.
                    Inclusion does not imply ranking, endorsement, or partnership.
                  </div>
                  {submitError && (
                    <p className="text-xs" style={{ color: '#f87171' }}>{submitError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full px-4 py-2.5 rounded-full text-sm font-bold border transition-all duration-150 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(135deg, rgba(124,58,237,.22), rgba(159,123,255,.14))',
                      borderColor: 'rgba(124,58,237,.45)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {submitting ? 'Submitting…' : 'Submit for review'}
                  </button>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <Card>
                <h2 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>Before you submit</h2>
                <ul className="text-xs space-y-2 list-disc pl-4 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  <li><b style={{ color: 'var(--color-text-secondary)' }}>Scope:</b> AI-enabled procurement companies only.</li>
                  <li>Please use a work email from your company domain.</li>
                  <li>Inclusion does not imply ranking or endorsement.</li>
                  <li>Review typically takes 3–5 business days.</li>
                </ul>
              </Card>
              <Card>
                <h2 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>Already listed?</h2>
                <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--color-text-muted)' }}>
                  If your company is already in the directory, request an update instead.
                </p>
                <Link
                  href="/companies"
                  className="inline-flex text-xs font-bold px-3 py-1.5 rounded-full border"
                  style={{ borderColor: 'rgba(255,255,255,0.10)', color: 'var(--color-text-primary)' }}
                >
                  Find your company →
                </Link>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
