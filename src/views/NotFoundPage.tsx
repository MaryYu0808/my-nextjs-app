'use client'

import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <div className="max-w-[1120px] mx-auto px-6 py-24 text-center">
      <div
        className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 border text-3xl font-black"
        style={{
          background: 'rgba(124,58,237,0.12)',
          borderColor: 'rgba(124,58,237,0.30)',
          color: 'var(--color-accent-soft)',
        }}
      >
        404
      </div>
      <h1 className="text-3xl font-black mb-3" style={{ color: 'var(--color-text-primary)' }}>
        Page not found
      </h1>
      <p className="text-base mb-8 max-w-sm mx-auto" style={{ color: 'var(--color-text-muted)' }}>
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold border"
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,.22), rgba(159,123,255,.14))',
            borderColor: 'rgba(124,58,237,.45)',
            color: 'var(--color-text-primary)',
          }}
        >
          Go home
        </Link>
        <Link
          href="/companies"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-bold border"
          style={{ background: 'transparent', borderColor: 'rgba(255,255,255,0.10)', color: 'var(--color-text-primary)' }}
        >
          Explore companies
        </Link>
      </div>
    </div>
  )
}
