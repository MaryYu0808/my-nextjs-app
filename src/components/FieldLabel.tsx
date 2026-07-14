'use client'

import { useState, useEffect } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 10v6" />
    <circle cx="12" cy="7" r="1" fill="currentColor" stroke="none" />
  </svg>
)

function FieldHint({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const check = () => setIsDesktop(!window.matchMedia('(max-width: 768px)').matches)
    check()
    const handler = () => check()
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  if (!mounted) {
    return (
      <span className="inline-flex h-5 w-5 sm:h-4 sm:w-4 items-center justify-center rounded-full border" style={{ borderColor: 'var(--t-border-md)' }}>
        <InfoIcon />
      </span>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Field guidance"
          aria-expanded={open}
          onMouseEnter={() => isDesktop && setOpen(true)}
          onMouseLeave={() => isDesktop && setOpen(false)}
          className="inline-flex h-5 w-5 sm:h-4 sm:w-4 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors data-[state=open]:border-[rgba(124,58,237,.55)] data-[state=open]:text-[var(--color-text-primary)]"
          style={{ borderColor: 'var(--t-border-md)', color: 'var(--color-text-muted)' }}
        >
          <InfoIcon />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onMouseEnter={() => isDesktop && setOpen(true)}
        onMouseLeave={() => isDesktop && setOpen(false)}
      >
        {children}
      </PopoverContent>
    </Popover>
  )
}

export function FieldLabel({
  children,
  required,
  hint,
}: {
  children: React.ReactNode
  required?: boolean
  hint?: React.ReactNode
}) {
  return (
    <label className="text-xs font-semibold mb-1 flex items-center gap-1.5" style={{ color: 'var(--color-text-muted)' }}>
      <span>
        {children}
        {required && <span className="ml-0.5" style={{ color: '#f87171' }}>*</span>}
      </span>
      {hint && <FieldHint>{hint}</FieldHint>}
    </label>
  )
}