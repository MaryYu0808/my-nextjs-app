import type { Metadata } from 'next'
import SubmitCompanyView from '@/views/SubmitCompanyPage'
import { buildSeoMetadata } from '@/lib/seo'

export const metadata: Metadata = buildSeoMetadata(
  'Submit a Company | ProcurementAI',
  'Submit your AI-enabled procurement company for inclusion in the ProcurementAI directory. Reviewed and verified before publication.',
  '/submit-company'
)

export default function SubmitCompanyPage() {
  return <SubmitCompanyView />
}
