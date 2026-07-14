// views/CompanyAlternativesPage.tsx

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { Card, KvRow } from '../components/Card'
import { Pill } from '../components/Chip'
import type { Category, UseCase } from '../types'
import { generateBreadcrumbSchema } from '../lib/seo'
import {
    getAlternativesPageData,
    type AlternativesPageData,
    type AlternativeCompany,
    type ScenarioGroup,
    type ComparisonRow,
    mockCategories,
    mockUseCases,
    getCategoryName,
} from '../lib/mock-alternatives'
import { ArrowLeftRight, ArrowRightIcon, Calendar, Globe, InfoIcon, MapPin, TrendingUp, Users } from 'lucide-react'

// ===================== Sub-components =====================

function CompanyLogo({ company, size = 'md' }: { company: { tool_name: string; logo_url: string | null; tool_slug: string }; size?: 'sm' | 'md' | 'lg' }) {
    const [logoFailed, setLogoFailed] = useState(false)
    const showImage = Boolean(company.logo_url) && !logoFailed

    const sizeClasses = {
        sm: 'w-10 h-10 rounded-lg',
        md: 'w-12 h-12 rounded-xl',
        lg: 'w-14 h-14 rounded-xl',
    }

    const iconSizes = {
        sm: 'text-base',
        md: 'text-xl',
        lg: 'text-2xl',
    }

    return (
        <div
            className={`${sizeClasses[size]} border flex items-center justify-center overflow-hidden flex-shrink-0`}
            style={{
                background: 'var(--t-logo-bg)',
                borderColor: 'var(--t-logo-border)',
            }}
        >
            {showImage ? (
                <Image
                    src={company.logo_url!}
                    alt={company.tool_name}
                    width={size === 'sm' ? 40 : size === 'md' ? 48 : 56}
                    height={size === 'sm' ? 40 : size === 'md' ? 48 : 56}
                    className="object-contain"
                    onError={() => setLogoFailed(true)}
                />
            ) : (
                <span className={`font-bold ${iconSizes[size]}`} style={{ color: 'var(--color-text-muted)' }}>
                    {company.tool_name.charAt(0).toUpperCase()}
                </span>
            )}
        </div>
    )
}

function ContextTable({ rows }: { rows: ComparisonRow[] }) {
    return (
        <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b" style={{ borderColor: 'var(--t-border)' }}>
                        <th className="text-left py-3.5 px-4 font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                            Alternative
                        </th>
                        <th className="text-left py-3.5 px-4 font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                            Procurement Context
                        </th>
                        <th className="text-left py-3.5 px-4 font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                            Overlap
                        </th>
                        <th className="text-left py-3.5 px-4 font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                            Key Difference
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr
                            key={row.slug}
                            className="border-b transition-colors hover:bg-opacity-5"
                            style={{
                                borderColor: 'var(--t-border)',
                                background: index % 2 === 0 ? 'transparent' : 'var(--t-ghost-bg)',
                            }}
                        >
                            <td className="py-3.5 px-4 font-medium">
                                <Link
                                    href={`/company/${row.slug}`}
                                    style={{ color: 'var(--color-accent-soft)' }}
                                    className="hover:underline font-semibold"
                                >
                                    {row.name}
                                </Link>
                            </td>
                            <td className="py-3.5 px-4" style={{ color: 'var(--color-text-secondary)' }}>
                                {row.context}
                            </td>
                            <td className="py-3.5 px-4" style={{ color: 'var(--color-text-secondary)' }}>
                                {row.overlap}
                            </td>
                            <td className="py-3.5 px-4" style={{ color: 'var(--color-text-secondary)' }}>
                                {row.difference}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function ScenarioGroupSection({ group }: { group: ScenarioGroup }) {
    const companyCount = group.companies.length
    const isSingle = companyCount === 1
    const isMultiple = companyCount >= 2

    const getKeywords = (note: string) => {
        const patterns = [
            /RFx execution/i,
            /Supplier discovery/i,
            /Sourcing workflow/i,
            /Intake-to-procure/i,
            /Cross-functional approvals/i,
            /Agentic sourcing/i,
            /Market intelligence/i,
            /Workflow automation/i,
            /Orchestration/i,
        ]
        const found = patterns.filter(p => p.test(note))
        return found.length > 0 ? found.map(m => m.source) : null
    }

    const keywords = getKeywords(group.note)

    return (
        <div
            className="rounded-xl transition-all duration-200 hover:border-opacity-60 mb-5"
            style={{
                border: '1px solid var(--t-border)',
                background: 'var(--t-ghost-bg)',
            }}
        >
            <div className="px-5 py-3.5 flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
                            {group.title}
                        </h3>
                        <span
                            className="text-[10px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap"
                            style={{
                                background: 'var(--t-chip-bg)',
                                color: isSingle ? 'var(--color-text-muted)' : 'var(--color-accent-soft)',
                                border: '1px solid var(--t-border)',
                            }}
                        >
                            {isSingle ? 'Limited' : `${companyCount} options`}
                        </span>
                    </div>
                    {keywords && keywords.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1 mt-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                            {keywords.map((kw, idx) => (
                                <span key={kw}>
                                    {kw}
                                    {idx < keywords.length - 1 && (
                                        <span className="mx-1.5" style={{ color: '#475569' }}>|</span>
                                    )}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="px-5 pb-4 pt-0.5 border-t" style={{ borderColor: 'var(--t-border)' }}>
                <div className={`flex flex-wrap items-center gap-${isMultiple ? '4' : '2'} pt-2`}>
                    {group.companies.map((c, index) => (
                        <div key={c.tool_slug} className="flex items-center gap-2">
                            <Link
                                href={`/company/${c.tool_slug}`}
                                className="group flex items-center gap-1.5 text-sm font-medium transition-all duration-200"
                                style={{ color: 'var(--color-text-secondary)' }}
                            >
                                <span className="group-hover:text-violet-400 transition-colors duration-200">
                                    {c.tool_name}
                                </span>
                                <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" style={{ color: 'var(--color-text-muted)' }} />
                            </Link>
                            {isMultiple && index < group.companies.length - 1 && (
                                <span className="text-xs" style={{ color: 'var(--t-border)' }}>·</span>
                            )}
                        </div>
                    ))}
                    {isSingle && (
                        <span
                            className="text-[10px] ml-1 opacity-60"
                            style={{ color: 'var(--color-text-muted)' }}
                        >
                            Only alternative in this scenario
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

function AlternativeCard({
    company,
}: {
    company: AlternativeCompany
    categories: Category[]
    useCases: UseCase[]
}) {
    const [expanded, setExpanded] = useState(false)
    const modules = company.key_modules ?? []
    const employeeRange = company.employee_count
        ? `${company.employee_count} employees`
        : null

    const typeColors = {
        'Direct substitute': { bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399', border: 'rgba(16, 185, 129, 0.3)' },
        'Broader suite': { bg: 'rgba(59, 130, 246, 0.15)', text: '#60a5fa', border: 'rgba(59, 130, 246, 0.3)' },
        'Specialized option': { bg: 'rgba(139, 92, 246, 0.15)', text: '#a78bfa', border: 'rgba(139, 92, 246, 0.3)' },
    }

    const typeColor = typeColors[company.alternativeType] || typeColors['Specialized option']

    return (
        <div
            className="rounded-xl transition-all duration-200 hover:border-opacity-60"
            style={{
                border: '1px solid var(--t-border)',
                background: 'var(--t-ghost-bg)',
            }}
        >
            <div className="p-5 pb-3">
                <div className="flex items-start gap-4">
                    <CompanyLogo company={company} size="md" />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2.5 flex-wrap">
                            <Link
                                href={`/company/${company.tool_slug}`}
                                className="text-lg font-bold hover:underline transition-colors"
                                style={{ color: 'var(--color-text-primary)' }}
                            >
                                {company.tool_name}
                            </Link>
                            <span
                                className="text-[10px] px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wide"
                                style={{
                                    background: typeColor.bg,
                                    color: typeColor.text,
                                    border: `1px solid ${typeColor.border}`,
                                }}
                            >
                                {company.alternativeType}
                            </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                            <span className="flex items-center gap-1">
                                <MapPin size={16} />
                                {company.headquarters || '—'}
                            </span>
                            {company.founded_year && (
                                <span className="flex items-center gap-1">
                                    <Calendar size={16} />
                                    Est. {company.founded_year}
                                </span>
                            )}
                            {employeeRange && (
                                <span className="flex items-center gap-1">
                                    <Users size={16} />
                                    {employeeRange}
                                </span>
                            )}
                            {company.automation_level && (
                                <span className="flex items-center gap-1">
                                    <TrendingUp size={16} />
                                    <span style={{ color: 'var(--color-text-secondary)' }}>
                                        {company.automation_level}
                                    </span>
                                </span>
                            )}
                            {company.primary_category && (
                                <Link
                                    href={`/companies?category=${encodeURIComponent(company.primary_category)}`}
                                    style={{ color: 'var(--color-accent-soft)' }}
                                    className="hover:underline flex items-center gap-1"
                                >
                                    <Globe size={16} />
                                    {getCategoryName(company.primary_category)}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-5 pb-3">
                {company.short_description && (
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                        {company.short_description}
                    </p>
                )}

                {modules.length > 0 && (
                    <div className="mb-4 mt-3">
                        <div className="flex flex-wrap gap-2">
                            {modules.map((m) => (
                                <Pill key={m} variant="gray">{m}</Pill>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="px-5 pb-4">
                <div
                    className="rounded-lg p-3.5 mb-3.5 border-l-4"
                    style={{
                        background: 'var(--t-accent-bg)',
                        borderColor: '#7c3aed',
                        borderLeftWidth: '4px',
                    }}
                >
                    <div className="flex items-start gap-2.5">
                        <div className="mt-0.5">
                            <TrendingUp size={16} />
                        </div>
                        <div>
                            <div
                                className="text-[10px] uppercase tracking-wider font-semibold mb-0.5"
                                style={{ color: 'var(--color-accent-soft)' }}
                            >
                                Best-Fit Use Case
                            </div>
                            <div className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                                {company.bestFitUseCase}
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => setExpanded(!expanded)}
                    className="flex items-center gap-2 text-xs font-medium transition-colors hover:opacity-80 w-full py-1.5"
                    style={{ color: 'var(--color-text-muted)' }}
                >
                    <span>{expanded ? '▼' : '▶'} Company Details</span>
                    <span className="text-[10px] opacity-60">
                        {expanded ? 'Hide' : 'Show'} funding · security · integrations
                    </span>
                </button>

                {expanded && (
                    <div className="grid grid-cols-2 gap-2 mt-2.5 animate-in slide-in-from-top-2 duration-200">
                        {company.fundingDisplay && (
                            <div
                                className="rounded-lg p-2.5"
                                style={{
                                    background: 'var(--t-chip-bg)',
                                    border: '1px solid var(--t-border)',
                                }}
                            >
                                <div
                                    className="text-[10px] uppercase tracking-wider font-semibold"
                                    style={{ color: 'var(--color-text-muted)' }}
                                >
                                    Funding
                                </div>
                                <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                    {company.fundingDisplay}
                                </div>
                            </div>
                        )}
                        {company.pricingVisibility && (
                            <div
                                className="rounded-lg p-2.5"
                                style={{
                                    background: 'var(--t-chip-bg)',
                                    border: '1px solid var(--t-border)',
                                }}
                            >
                                <div
                                    className="text-[10px] uppercase tracking-wider font-semibold"
                                    style={{ color: 'var(--color-text-muted)' }}
                                >
                                    Pricing
                                </div>
                                <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                    {company.pricingVisibility}
                                </div>
                            </div>
                        )}
                        {company.integrationsDisplay && (
                            <div
                                className="rounded-lg p-2.5"
                                style={{
                                    background: 'var(--t-chip-bg)',
                                    border: '1px solid var(--t-border)',
                                }}
                            >
                                <div
                                    className="text-[10px] uppercase tracking-wider font-semibold"
                                    style={{ color: 'var(--color-text-muted)' }}
                                >
                                    Integrations
                                </div>
                                <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                    {company.integrationsDisplay}
                                </div>
                            </div>
                        )}
                        {company.securityDisplay && (
                            <div
                                className="rounded-lg p-2.5 flex items-center gap-2"
                                style={{
                                    background: 'var(--t-chip-bg)',
                                    border: '1px solid var(--t-border)',
                                }}
                            >
                                <div>
                                    <div
                                        className="text-[10px] uppercase tracking-wider font-semibold"
                                        style={{ color: 'var(--color-text-muted)' }}
                                    >
                                        Security
                                    </div>
                                    <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                        {company.securityDisplay}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-3.5">
                    <div
                        className="text-[10px] uppercase tracking-wider font-semibold mb-2"
                        style={{ color: 'var(--color-text-muted)' }}
                    >
                        What Buyers Should Verify
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {company.verificationNotes.split('·').map((item, index) => {
                            const trimmed = item.trim()
                            if (!trimmed) return null
                            return (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 text-xs py-1.5 px-2.5 rounded-lg transition-colors hover:bg-opacity-10"
                                    style={{
                                        background: 'var(--t-chip-bg)',
                                        color: 'var(--color-text-secondary)',
                                        border: '1px solid transparent',
                                    }}
                                >
                                    <span className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: 'var(--t-accent-bg)', color: 'var(--color-accent-soft)' }}>
                                        {index + 1}
                                    </span>
                                    {trimmed}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 px-5 py-3.5 border-t" style={{ borderColor: 'var(--t-border)' }}>
                {company.website_url && (
                    <a
                        href={company.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium px-5 py-2.5 rounded-full text-center border transition-all duration-200 hover:border-opacity-60 hover:bg-white/5 order-2 sm:order-1"
                        style={{
                            background: 'transparent',
                            borderColor: 'rgba(255,255,255,0.15)',
                            color: 'var(--color-text-secondary)',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        Visit Website ↗
                    </a>
                )}
                <Link
                    href={`/company/${company.tool_slug}`}
                    className="text-sm font-bold px-6 py-2.5 rounded-full text-center transition-all duration-200 hover:opacity-90 hover:shadow-lg order-1 sm:order-2"
                    style={{
                        background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                        color: '#fff',
                        boxShadow: '0 2px 12px rgba(124, 58, 237, 0.3)',
                    }}
                >
                    View Profile
                </Link>
            </div>
        </div>
    )
}

// ===================== Loading State =====================

function LoadingState() {
    return (
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 py-16 text-center">
            <div
                className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-t-transparent"
                style={{ borderColor: 'var(--color-accent-soft)' }}
            />
            <p className="mt-4" style={{ color: 'var(--color-text-muted)' }}>
                Loading alternatives...
            </p>
        </div>
    )
}

// ===================== Error State =====================

function NotFoundState() {
    return (
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 py-16 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6" style={{ background: 'var(--t-ghost-bg)' }}>
                <span className="text-4xl">🔍</span>
            </div>
            <h1 className="text-2xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                Company not found
            </h1>
            <p className="mb-6" style={{ color: 'var(--color-text-muted)' }}>
                This company isn&apos;t in the current dataset.
            </p>
            <Link
                href="/companies"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold border transition-all hover:shadow-lg"
                style={{
                    background: 'linear-gradient(135deg, rgba(124,58,237,.22), rgba(159,123,255,.14))',
                    borderColor: 'rgba(124,58,237,.45)',
                    color: 'var(--color-text-primary)',
                }}
            >
                Back to directory
            </Link>
        </div>
    )
}

// ===================== Sticky Navigation =====================

interface StickyNavProps {
    sections: { id: string; label: string }[]
    activeSection: string
    onNavClick: (id: string) => void
}

function StickyNav({ sections, activeSection, onNavClick }: StickyNavProps) {
    return (
        <div
            className="sticky top-[80px] z-50 border-b backdrop-blur-lg transition-all duration-300"
            style={{
                borderColor: 'var(--t-border)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
            }}
        >
            <div className="max-w-[1120px] mx-auto">
                <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 scrollbar-hide">
                    {sections.map((section) => {
                        const isActive = activeSection === section.id
                        return (
                            <button
                                key={section.id}
                                onClick={() => onNavClick(section.id)}
                                className={`
                                    relative px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full 
                                    transition-all duration-200 whitespace-nowrap
                                    hover:bg-violet-500/20 hover:text-white
                                    cursor-pointer
                                    ${isActive ? 'text-white bg-violet-500/25' : 'text-muted'}
                                `}
                                style={{
                                    color: isActive ? '#fff' : 'var(--color-text-muted)',
                                }}
                            >
                                {section.label}
                                {isActive && (
                                    <span
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 rounded-full"
                                        style={{ background: 'linear-gradient(90deg, #7c3aed, #a78bfa)' }}
                                    />
                                )}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

// ===================== Main Component =====================

interface CompanyAlternativesPageProps {
    slug: string
}

export default function CompanyAlternativesPage({ slug }: CompanyAlternativesPageProps) {
    const [data, setData] = useState<AlternativesPageData | null>(null)
    const [loading, setLoading] = useState(true)
    const [activeSection, setActiveSection] = useState('overview')

    // Refs for scroll sections
    const overviewRef = useRef<HTMLDivElement>(null)
    const scenarioRef = useRef<HTMLDivElement>(null)
    const companiesRef = useRef<HTMLDivElement>(null)
    const compareRef = useRef<HTMLDivElement>(null)
    const checklistRef = useRef<HTMLDivElement>(null)
    const faqRef = useRef<HTMLDivElement>(null)

    const sectionRefs = {
        overview: overviewRef,
        scenario: scenarioRef,
        companies: companiesRef,
        compare: compareRef,
        checklist: checklistRef,
        faq: faqRef,
    }

    const sections = [
        { id: 'overview', label: 'Overview' },
        { id: 'scenario', label: 'By Scenario' },
        { id: 'companies', label: 'Companies' },
        { id: 'compare', label: 'Compare' },
        { id: 'checklist', label: 'Checklist' },
        { id: 'faq', label: 'FAQ' },
    ]

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 300))
            const result = getAlternativesPageData(slug)
            setData(result)
            setLoading(false)
        }
        fetchData()
    }, [slug])

    // Scroll spy
    useEffect(() => {
        if (loading || !data) return

        const handleScroll = () => {
            const scrollY = window.scrollY + 120 // Offset for sticky nav

            let current = 'overview'
            const sectionEntries = Object.entries(sectionRefs)

            for (const [id, ref] of sectionEntries) {
                if (ref.current) {
                    const rect = ref.current.getBoundingClientRect()
                    const top = rect.top + window.scrollY
                    if (scrollY >= top - 80) {
                        current = id
                    }
                }
            }

            setActiveSection(current)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll() // Initial check

        return () => window.removeEventListener('scroll', handleScroll)
    }, [loading, data])

    const scrollToSection = (id: string) => {
        const ref = sectionRefs[id as keyof typeof sectionRefs]
        if (ref.current) {
            const offset = 120 // Sticky nav height + padding
            const elementPosition = ref.current.getBoundingClientRect().top + window.scrollY
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth',
            })
        }
        setActiveSection(id)
    }

    if (loading) {
        return <LoadingState />
    }

    if (!data) {
        return <NotFoundState />
    }

    const { company, alternatives, scenarioGroups, comparisonRows } = data

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://www.procurementai.ai' },
        { name: 'Companies', url: 'https://www.procurementai.ai/companies' },
        {
            name: company.tool_name,
            url: `https://www.procurementai.ai/company/${company.tool_slug}`,
        },
        {
            name: 'Alternatives',
            url: `https://www.procurementai.ai/company/${company.tool_slug}/alternatives`,
        },
    ])

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <div className="max-w-[1120px] mx-auto px-4 sm:px-6 pb-12 sm:pb-16 space-y-6">
                {/* Breadcrumbs */}
                <nav className="pt-6 pb-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    <Link href="/" className="hover:text-white transition-colors">
                        Home
                    </Link>
                    <span className="mx-2">›</span>
                    <Link href="/companies" className="hover:text-white transition-colors">
                        Companies
                    </Link>
                    <span className="mx-2">›</span>
                    <Link
                        href={`/company/${company.tool_slug}`}
                        className="hover:text-white transition-colors"
                    >
                        {company.tool_name}
                    </Link>
                    <span className="mx-2">›</span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Alternatives</span>
                </nav>

                {/* Header Section */}
                <div ref={overviewRef} className="scroll-mt-20">
                    <div className="py-4">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                            <CompanyLogo company={company} size="lg" />
                            <div>
                                <h1
                                    className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight"
                                    style={{ color: 'var(--color-text-primary)' }}
                                >
                                    {company.tool_name} Alternatives & Competitors
                                </h1>
                                <p className="text-base mt-1.5" style={{ color: 'var(--color-text-muted)' }}>
                                    AI procurement platforms to consider alongside {company.tool_name}
                                </p>
                                <div className="flex items-center gap-3 mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                    <span className="flex items-center gap-1.5">
                                        <Calendar size={16} />
                                        Data verified {company.updated_utc ? company.updated_utc.slice(0, 10) : '—'}
                                    </span>
                                    <span className="w-1 h-1 rounded-full" style={{ background: 'var(--color-text-muted)' }} />
                                    <span className="flex items-center gap-1.5">
                                        <ArrowLeftRight size={16} />
                                        <span
                                            className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                                            style={{
                                                background: '#4C1D95',
                                                color: '#A78BFA',
                                            }}
                                        >
                                            {alternatives.length} alternatives
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sticky Navigation */}
                <StickyNav
                    sections={sections}
                    activeSection={activeSection}
                    onNavClick={scrollToSection}
                />

                {/* Intro Banner */}
                <div
                    className="rounded-xl mb-6 text-sm leading-relaxed"
                    style={{
                        background: 'var(--t-accent-bg)',
                        border: '1px solid var(--t-accent-border)',
                        color: 'var(--color-text-secondary)',
                    }}
                >
                    <div className="flex items-start gap-3">
                        <div className="space-y-1">
                            <p className="text-base font-semibold" style={{ color: '#A78BFA' }}>
                                Looking for an alternative to {company.tool_name}?
                            </p>
                            <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
                                This page groups AI-enabled procurement platforms by buyer scenario and compares
                                them using ProcurementAI classification fields plus selected public signals —
                                employee count, funding, pricing visibility, integrations, and security
                                information when available.
                            </p>
                        </div>
                    </div>
                </div>

                <Card>
                    <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                            <InfoIcon size={18} style={{ color: 'var(--color-text-muted)' }} />
                        </div>
                        <div>
                            <h2
                                className="text-sm font-bold mb-1"
                                style={{ color: 'var(--color-text-muted)' }}
                            >
                                Methodology Note
                            </h2>
                            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                Alternatives are selected using ProcurementAI&apos;s internal taxonomy
                                combined with publicly available company information, considering
                                workflow relevance, use case overlap, and product positioning. This page
                                is for market research and shortlist development only — it is not a
                                vendor ranking, rating, or endorsement.
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Company context */}
                <Card>
                    <h2
                        className="text-base font-bold mb-1"
                        style={{ color: 'var(--color-text-primary)' }}
                    >
                        {company.tool_name} — Company Context
                    </h2>
                    <p className="text-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>
                        Base fields from ProcurementAI&apos;s company database. Employee count
                        is referenced from LinkedIn where available; funding displays only with a
                        credible public source.
                    </p>
                    <div className="space-y-0">
                        <KvRow label="Primary Category">
                            {company.primary_category ? (
                                <Link
                                    href={`/companies?category=${encodeURIComponent(
                                        company.primary_category
                                    )}`}
                                    style={{ color: 'var(--color-accent-soft)' }}
                                    className="hover:underline"
                                >
                                    {getCategoryName(company.primary_category)}
                                </Link>
                            ) : (
                                '—'
                            )}
                        </KvRow>
                        <KvRow label="Employee Count">
                            {company.employee_count ? `${company.employee_count} employees` : '—'}
                            <span
                                className="text-xs ml-1"
                                style={{ color: 'var(--color-text-muted)' }}
                            >
                                (LinkedIn-referenced)
                            </span>
                        </KvRow>
                        <KvRow label="Funding">
                            Series A · public source required
                            <span
                                className="text-xs ml-1"
                                style={{ color: 'var(--color-text-muted)' }}
                            >
                                (shown only with credible public source)
                            </span>
                        </KvRow>
                        <KvRow label="Last Reviewed">
                            {company.updated_utc ? company.updated_utc.slice(0, 10) : '—'}
                        </KvRow>
                    </div>
                </Card>

                {/* Alternatives by scenario */}
                <div ref={scenarioRef} className="scroll-mt-20">
                    <Card>
                        <h2
                            className="text-base font-bold mb-1"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            Alternatives by Buyer Scenario
                        </h2>
                        <p className="text-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>
                            Grouped by evaluation scenario, not ranked. Scenario labels are derived
                            from workflow category and use case fields.
                        </p>
                        {scenarioGroups.map((group) => (
                            <ScenarioGroupSection key={group.title} group={group} />
                        ))}
                    </Card>
                </div>

                {/* Alternative companies */}
                <div ref={companiesRef} className="scroll-mt-20">
                    <Card>
                        <div className="flex items-center justify-between mb-1">
                            <h2
                                className="text-base font-bold"
                                style={{ color: 'var(--color-text-primary)' }}
                            >
                                Alternative Companies
                            </h2>
                            <span
                                className="text-xs font-semibold px-3 py-1 rounded-full"
                                style={{
                                    background: 'var(--t-chip-bg)',
                                    color: 'var(--color-text-muted)',
                                    border: '1px solid var(--t-border)',
                                }}
                            >
                                {alternatives.length} found
                            </span>
                        </div>
                        <p className="text-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>
                            Public signals are shown only when they meet source and confidence rules;
                            missing fields are hidden.
                        </p>
                        <div className='space-y-4'>
                            {alternatives.map((alt) => (
                                <AlternativeCard
                                    key={alt.tool_slug}
                                    company={alt}
                                    categories={mockCategories}
                                    useCases={mockUseCases}
                                />
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Comparison context */}
                <div ref={compareRef} className="scroll-mt-20">
                    <Card>
                        <h2
                            className="text-base font-bold mb-1"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            Comparison Context
                        </h2>
                        <p className="text-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>
                            A neutral, qualitative overview of how each alternative relates to{' '}
                            {company.tool_name}.
                        </p>
                        <ContextTable rows={comparisonRows} />
                    </Card>
                </div>
                {/* Buyer checklist */}
                <div ref={checklistRef} className="scroll-mt-20">
                    <Card>
                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-1">
                                <h2
                                    className="text-base font-bold"
                                    style={{ color: 'var(--color-text-primary)' }}
                                >
                                    Buyer Evaluation Checklist
                                </h2>
                            </div>
                            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                When evaluating alternatives to{' '}
                                <span style={{ color: 'var(--color-accent-soft)', fontWeight: 600 }}>
                                    {company.tool_name}
                                </span>
                                , procurement teams may want to verify:
                            </p>
                        </div>

                        <div className="h-px w-full mb-4" style={{ background: 'var(--t-border)' }} />

                        <ul
                            className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm"
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            {[
                                'Whether the evaluation needs full sourcing-to-pay scope or a focused sourcing workflow',
                                'Which use cases are required across RFx, supplier discovery, negotiation, and analytics',
                                'Whether the platform is sourcing-focused, intake-first, or suite-based',
                                'How AI capabilities are applied in real procurement workflows',
                                'Which ERP, P2P, CLM, finance, and supplier systems must integrate',
                                'Whether implementation scope, governance, and regional support fit the buyer',
                            ].map((item, index) => (
                                <li
                                    key={item}
                                    className="flex items-start gap-3 p-2.5 rounded-lg transition-all duration-150"
                                    style={{
                                        background: 'transparent',
                                        border: '1px solid transparent',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'var(--t-ghost-bg)'
                                        e.currentTarget.style.borderColor = 'var(--t-border)'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent'
                                        e.currentTarget.style.borderColor = 'transparent'
                                    }}
                                >
                                    <span
                                        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
                                        style={{
                                            background: 'var(--t-accent-bg)',
                                            color: 'var(--color-accent-soft)',
                                            border: '1px solid var(--t-accent-border)',
                                        }}
                                    >
                                        {index + 1}
                                    </span>
                                    <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>

                {/* FAQ */}
                <div ref={faqRef} className="scroll-mt-20">
                    <Card>
                        <h2
                            className="text-base font-bold mb-3"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-2">
                            {[
                                {
                                    q: 'How is this different from Related Companies?',
                                    a: 'Related Companies are selected for exploration based on shared category and use-case overlap. Alternatives are grouped by buyer scenario for evaluation and include additional public signals when available.'
                                },
                                {
                                    q: 'Are these companies ranked?',
                                    a: 'No. ProcurementAI provides structured market context only. The grouping and labels are not a ranking, rating, endorsement, or substitute for buyer due diligence.'
                                },
                                {
                                    q: 'Why are some public fields missing?',
                                    a: 'Funding, integrations, and security signals are hidden when no reliable source is available or when the information is not explicit enough to display.'
                                },
                            ].map((faq, index) => (
                                <details key={index} className="group">
                                    <summary
                                        className="font-semibold text-sm cursor-pointer py-2.5 px-3 rounded-lg transition-colors hover:bg-opacity-5"
                                        style={{
                                            color: 'var(--color-text-primary)',
                                            background: 'transparent',
                                        }}
                                    >
                                        {faq.q}
                                    </summary>
                                    <p className="text-sm mt-1 px-3 pb-2.5" style={{ color: 'var(--color-text-muted)' }}>
                                        {faq.a}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </Card>
                </div>

                <Card>
                    <h2
                        className="text-base font-bold mb-2"
                        style={{ color: 'var(--color-text-primary)' }}
                    >
                        Related ProcurementAI Pages
                    </h2>
                    <div className="flex flex-wrap gap-3 text-sm [&_a]:hover:underline">
                        <Link
                            href={`/company/${company.tool_slug}`}
                            className="inline-flex items-center gap-1.5 rounded-full font-medium transition-all hover:underline hover:decoration-2 hover:underline-offset-2 text-sm"
                            style={{ color: 'var(--color-accent-soft)' }}
                        >
                            {company.tool_name} Profile
                        </Link>
                        <Link
                            href="/companies"
                            className="inline-flex items-center gap-1.5 rounded-full font-medium transition-all hover:underline hover:decoration-2 hover:underline-offset-2 text-sm"
                            style={{ color: 'var(--color-accent-soft)' }}
                        >
                            All Companies
                        </Link>
                        {company.primary_category && (
                            <Link
                                href={`/companies?category=${encodeURIComponent(
                                    company.primary_category
                                )}`}
                                className="inline-flex items-center gap-1.5 rounded-full font-medium transition-all hover:underline hover:decoration-2 hover:underline-offset-2 text-sm"
                                style={{ color: 'var(--color-accent-soft)' }}
                            >
                                {getCategoryName(company.primary_category)}
                            </Link>
                        )}
                    </div>
                </Card>

                {/* Disclaimer */}
                <div
                    className="text-xs mt-6 p-4 rounded-lg"
                    style={{
                        color: 'var(--color-text-muted)',
                        background: 'var(--t-ghost-bg)',
                        border: '1px solid var(--t-border)',
                    }}
                >
                    <strong>Disclaimer:</strong> Alternatives are selected using ProcurementAI classification data and
                    selected public information for market research and shortlist development.
                    Employee count is treated as a database field referenced from LinkedIn
                    where available. Funding, pricing, integration, and security signals are
                    displayed only when supported by source and confidence rules.
                    ProcurementAI does not rank, endorse, or recommend vendors; buyers should
                    conduct their own product, security, legal, integration, and commercial
                    due diligence.
                </div>
            </div>
        </>
    )
}