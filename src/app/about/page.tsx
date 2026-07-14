import type { Metadata } from 'next'
import AboutView from '@/views/AboutPage'
import { buildSeoMetadata } from '@/lib/seo'

export const metadata: Metadata = buildSeoMetadata(
  'About ProcurementAI | ProcurementAI',
  'Learn about ProcurementAI — the structured, independent directory of AI-enabled procurement companies.',
  '/about'
)

export default function AboutPage() {
  return <AboutView />
}
