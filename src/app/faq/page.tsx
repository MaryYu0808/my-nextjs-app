import type { Metadata } from 'next'
import FaqView from '@/views/FaqPage'
import { buildSeoMetadata } from '@/lib/seo'

export const metadata: Metadata = buildSeoMetadata(
  'Frequently Asked Questions | ProcurementAI',
  'How ProcurementAI works, how listings are organized, and how vendors can keep information accurate.',
  '/faq'
)

export default function FaqPage() {
  return <FaqView />
}
