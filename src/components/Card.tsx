import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  id?: string
  style?: React.CSSProperties
}

export function Card({ children, className = '', id, style }: CardProps) {
  return (
    <div
      id={id}
      className={`rounded-[18px] border p-4 ${className}`}
      style={{
        background: 'var(--t-card-bg)',
        borderColor: 'var(--t-border)',
        boxShadow: 'var(--t-card-shadow)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

interface KvRowProps {
  label: string
  children: ReactNode
}

export function KvRow({ label, children }: KvRowProps) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-2 sm:gap-4 py-2.5 border-t first:border-t-0 first:pt-1"
      style={{
        borderColor: 'var(--t-border)',
      }}
    >
      <div
        className="text-xs font-bold uppercase tracking-wide"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {label}
      </div>
      <div className="text-sm font-bold leading-snug break-words" style={{ color: 'var(--color-text-primary)' }}>
        {children}
      </div>
    </div>
  )
}

interface SectionProps {
  title?: string
  children: ReactNode
  className?: string
  id?: string
}

export function Section({ title, children, className = '', id }: SectionProps) {
  return (
    <section id={id} className={`mt-7 ${className}`}>
      {title && (
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
          {title}
        </h2>
      )}
      {children}
    </section>
  )
}

interface ButtonProps {
  children: ReactNode
  href?: string
  to?: string
  variant?: 'primary' | 'ghost' | 'secondary' | 'outlined'
  size?: 'sm' | 'md'
  className?: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  disabled?: boolean
  target?: string
  rel?: string
}

export function Button({
  children,
  href,
  variant = 'outlined',
  size = 'md',
  className = '',
  type = 'button',
  onClick,
  disabled,
  target,
  rel,
}: ButtonProps) {
  const base = `inline-flex items-center gap-2 rounded-full font-bold border transition-all duration-150 ${size === 'sm' ? 'text-xs px-3 py-1.5' : 'text-sm px-3.5 py-2.5'}`

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: 'linear-gradient(135deg, rgba(124,58,237,.22), rgba(159,123,255,.14))',
      borderColor: 'rgba(124,58,237,.45)',
      color: 'var(--color-text-primary)',
    },
    ghost: {
      background: 'var(--t-ghost-bg)',
      borderColor: 'var(--t-border)',
      color: 'var(--color-text-primary)',
    },
    secondary: {
      background: 'var(--t-input-bg)',
      borderColor: 'var(--t-border-lg)',
      color: 'var(--color-text-primary)',
    },
    outlined: {
      background: 'transparent',
      borderColor: 'var(--t-border-lg)',
      color: 'var(--color-text-primary)',
    },
  }

  const sharedStyle = variants[variant]

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={`${base} ${className}`} style={sharedStyle}>
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      style={sharedStyle}
    >
      {children}
    </button>
  )
}
