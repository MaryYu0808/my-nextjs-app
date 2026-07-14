import type { ReactNode } from 'react'

interface ChipProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
}

export function Chip({ children, className = '', href, onClick }: ChipProps) {
  const base =
    'inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full text-xs font-bold border transition-colors duration-150 cursor-default'
  const style = {
    background: 'var(--t-chip-bg)',
    borderColor: 'var(--t-border)',
    color: 'var(--color-text-secondary)',
  }

  if (href) {
    return (
      <a href={href} className={`${base} ${className} hover:border-violet-500/40`} style={style}>
        {children}
      </a>
    )
  }

  return (
    <span
      role={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`${base} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      style={style}
    >
      {children}
    </span>
  )
}

interface PillProps {
  children: ReactNode
  variant?: 'default' | 'accent' | 'green' | 'warn' | 'gray'
}

export function Pill({ children, variant = 'default' }: PillProps) {
  const styles: Record<string, React.CSSProperties> = {
    default: { background: 'var(--t-pill-accent-bg)', borderColor: 'var(--t-pill-accent-border)', color: 'var(--t-pill-accent-text)' },
    accent: { background: 'var(--t-pill-accent-bg)', borderColor: 'var(--t-pill-accent-border)', color: 'var(--t-pill-accent-text)' },
    green: { background: 'var(--t-pill-green-bg)', borderColor: 'var(--t-pill-green-border)', color: 'var(--t-pill-green-text)' },
    warn: { background: 'var(--t-pill-warn-bg)', borderColor: 'var(--t-pill-warn-border)', color: 'var(--t-pill-warn-text)' },
    gray: { background: 'var(--t-pill-gray-bg)', borderColor: 'var(--t-pill-gray-border)', color: 'var(--t-pill-gray-text)' },
  }

  return (
    <span
      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold border"
      style={styles[variant]}
    >
      {children}
    </span>
  )
}

interface AutomationBadgeProps {
  level: string
}

export function AutomationBadge({ level }: AutomationBadgeProps) {
  const map: Record<string, string> = {
    'Assistive': 'badge-assistive',
    'Semi-automated': 'badge-semi-automated',
    'Autonomous': 'badge-autonomous',
    'Agentic': 'badge-agentic',
  }
  const cls = map[level] ?? 'badge-assistive'

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${cls}`}>
      {level}
    </span>
  )
}
