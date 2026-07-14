import { useMemo, useState } from 'react'
import { Check, ChevronDown, X } from 'lucide-react'
import { Button } from './button'
import { Checkbox } from './checkbox'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './command'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

interface MultiSelectOption {
  label: string
  value: string
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  value: string[]
  onValueChange: (value: string[]) => void
  placeholder?: string
  maxSelected?: number
  searchPlaceholder?: string
  emptyText?: string
}

export function MultiSelect({
  options,
  value,
  onValueChange,
  placeholder = 'Select options',
  maxSelected,
  searchPlaceholder = 'Search...',
  emptyText = 'No results.',
}: MultiSelectProps) {
  const [open, setOpen] = useState(false)

  const selectedLabels = useMemo(() => {
    const map = new Map(options.map((opt) => [opt.value, opt.label]))
    return value.map((v) => map.get(v)).filter(Boolean) as string[]
  }, [options, value])

  const toggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onValueChange(value.filter((v) => v !== optionValue))
      return
    }
    if (maxSelected && value.length >= maxSelected) return
    onValueChange([...value, optionValue])
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" type="button" className="w-full justify-between rounded-xl border-[var(--t-border-md)] bg-[var(--t-input-bg)] font-normal text-left">
          <span className="truncate text-sm" style={{ color: value.length ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>
            {value.length > 0 ? `${value.length} selected` : placeholder}
          </span>
          <ChevronDown className="h-4 w-4 opacity-70" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const checked = value.includes(option.value)
                const disabled = Boolean(maxSelected && !checked && value.length >= maxSelected)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => !disabled && toggle(option.value)}
                    className={disabled ? 'opacity-50' : ''}
                  >
                    <Checkbox checked={checked} className="mr-2" disabled={disabled} />
                    <span className="flex-1">{option.label}</span>
                    {checked && <Check className="h-4 w-4 opacity-70" />}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>

      {selectedLabels.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {selectedLabels.slice(0, 4).map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs"
              style={{ borderColor: 'var(--t-border-md)', color: 'var(--color-text-secondary)', background: 'var(--t-ghost-bg)' }}
            >
              {label}
            </span>
          ))}
          {selectedLabels.length > 4 && (
            <span
              className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs"
              style={{ borderColor: 'var(--t-border-md)', color: 'var(--color-text-secondary)', background: 'var(--t-ghost-bg)' }}
            >
              +{selectedLabels.length - 4} more
            </span>
          )}
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs"
            style={{ borderColor: 'var(--t-border-md)', color: 'var(--color-text-muted)' }}
            onClick={() => onValueChange([])}
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        </div>
      )}
    </Popover>
  )
}
