// app/company/[slug]/alternatives/page.tsx

import CompanyAlternativesPage from '@/views/CompanyAlternativesPage'

interface PageProps {
  params: {
    slug: string
  }
}

export default function Page({ params }: PageProps) {
  return <CompanyAlternativesPage slug={params.slug} />
}