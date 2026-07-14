import * as React from 'react'
import { cn } from '@/lib/utils'

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[96px] w-full rounded-xl border px-3 py-2 text-sm transition-colors resize-y',
        'border-[var(--t-border-md)] bg-[var(--t-input-bg)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]',
        className,
      )}
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea'

export { Textarea }
