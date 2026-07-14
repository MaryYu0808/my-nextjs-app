import * as React from 'react'
import { cn } from '@/lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-xl border px-3 py-2 text-sm transition-colors',
        'border-[var(--t-border-md)] bg-[var(--t-input-bg)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]',
        className,
      )}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }
