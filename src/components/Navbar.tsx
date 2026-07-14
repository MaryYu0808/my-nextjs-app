'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Explore Companies', to: '/companies' },
  { label: 'Weekly Updates', to: '/weekly-updates' },
  { label: 'About', to: '/about' },
  { label: 'FAQ', to: '/faq' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (to: string) => {
    if (to === '/') return pathname === '/'
    return pathname.startsWith(to)
  }

  const closeMobile = () => setMobileOpen(false)

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        background: 'var(--t-nav-bg)',
        backdropFilter: 'blur(12px)',
        borderColor: 'var(--t-border)',
      }}
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex items-center gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0" aria-label="ProcurementAI home" onClick={closeMobile}>
          <Image
            src="/procurement-ai-logo.svg"
            alt="ProcurementAI"
            width={200}
            height={30}
            priority
            className=""
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex gap-1.5 flex-wrap ml-auto">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              className={`navbar-link text-[15px] font-semibold px-4 py-2 rounded-full${isActive(link.to) ? ' navbar-link-active' : ''}`}
              style={
                isActive(link.to)
                  ? {
                      color: 'var(--color-text-primary)',
                      background: 'var(--t-nav-active-bg)',
                      border: '1px solid var(--t-nav-active-border)',
                    }
                  : {
                      color: 'var(--color-text-muted)',
                      border: '1px solid transparent',
                    }
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Hamburger — mobile/tablet */}
        <button
          className="lg:hidden ml-auto flex flex-col justify-center items-center w-9 h-9 rounded-lg border"
          style={{ borderColor: 'var(--t-border-md)', background: 'var(--t-ghost-bg)', color: 'var(--color-text-muted)' }}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="3" x2="15" y2="15" /><line x1="15" y1="3" x2="3" y2="15" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="2" y1="5" x2="16" y2="5" /><line x1="2" y1="9" x2="16" y2="9" /><line x1="2" y1="13" x2="16" y2="13" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div
          className="lg:hidden border-t px-4 pb-4 pt-3 flex flex-col gap-1"
          style={{ borderColor: 'var(--t-border)', background: 'var(--t-nav-bg)' }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              onClick={closeMobile}
              className="text-[15px] font-semibold px-4 py-2.5 rounded-xl"
              style={
                isActive(link.to)
                  ? {
                      color: 'var(--color-text-primary)',
                      background: 'var(--t-nav-active-bg)',
                      border: '1px solid var(--t-nav-active-border)',
                    }
                  : {
                      color: 'var(--color-text-muted)',
                      border: '1px solid transparent',
                    }
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
