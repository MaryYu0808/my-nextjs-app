import type { Metadata } from 'next'
import NotFoundView from '@/views/NotFoundPage'
import { buildSeoMetadata } from '@/lib/seo'

export const metadata: Metadata = buildSeoMetadata('Page Not Found | ProcurementAI', 'The page you\'re looking for doesn\'t exist or may have moved.')

export default function NotFound() {
  return <NotFoundView />
}
