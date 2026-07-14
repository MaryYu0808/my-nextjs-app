import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer
      className="mt-14 pt-8 pb-8 border-t"
      style={{ borderColor: 'var(--t-border)', color: 'var(--color-text-muted)' }}
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between gap-4 flex-wrap items-center">
          <div className="text-sm">© {year} ProcurementAI</div>
          <div className="flex gap-4 flex-wrap text-sm">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
            <Link href="/submit-company" className="hover:text-white transition-colors">Submit a company</Link>
          </div>
        </div>
        {/* <div className="text-xs mt-3 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          ProcurementAI is an independent, structured directory of AI-enabled procurement companies.<br />
          Company information is continuously updated, structured, and validated using a standardized taxonomy framework.<br />
          We do not rank vendors.
        </div> */}
      </div>
    </footer>
  )
}
