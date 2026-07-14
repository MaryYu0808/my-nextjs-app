'use client'

export function FormSectionHeading({ title }: { title: string }) {
  return (
    <div className="pt-8 mt-2">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-xs font-bold uppercase tracking-wider shrink-0" style={{ color: 'var(--color-text-muted)' }}>
          {title}
        </h3>
        <div className="flex-1 border-t" style={{ borderColor: 'var(--t-border)' }} />
      </div>
    </div>
  )
}

export function FormTagField({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="space-y-3 pb-7 mt-5 mb-1 border-b last:border-b-0 last:pb-0 last:mb-0"
      style={{ borderColor: 'var(--t-border)' }}
    >
      {children}
    </div>
  )
}

interface OptionItem {
  value: string
  label: string
}

const tagSelectedStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(124,58,237,.35), rgba(159,123,255,.22))',
  borderColor: 'rgba(124,58,237,.7)',
  color: 'var(--color-text-primary)',
}

const tagDefaultStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.03)',
  borderColor: 'rgba(255,255,255,0.08)',
  color: 'var(--color-text-muted)',
}

const tagDisabledStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.01)',
  borderColor: 'rgba(255,255,255,0.04)',
  color: 'rgba(255,255,255,0.2)',
  cursor: 'not-allowed',
}

interface TagSingleSelectProps {
  options: OptionItem[]
  value: string
  onChange: (value: string) => void
}

export function TagSingleSelect({ options, value, onChange }: TagSingleSelectProps) {
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-2.5">
      {options.map((option) => {
        const selected = value === option.value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
            style={selected ? tagSelectedStyle : tagDefaultStyle}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

interface TagMultiSelectProps {
  options: OptionItem[]
  value: string[]
  onChange: (value: string[]) => void
  maxSelected?: number
}

export function TagMultiSelect({ options, value, onChange, maxSelected }: TagMultiSelectProps) {
  const toggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue))
      return
    }
    if (maxSelected && value.length >= maxSelected) return
    onChange([...value, optionValue])
  }

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-2.5">
      {options.map((option) => {
        const selected = value.includes(option.value)
        const disabled = Boolean(maxSelected && !selected && value.length >= maxSelected)
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => !disabled && toggle(option.value)}
            disabled={disabled}
            className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
            style={selected ? tagSelectedStyle : disabled ? tagDisabledStyle : tagDefaultStyle}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
