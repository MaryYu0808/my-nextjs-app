// app/company/[slug]/alternatives/page.tsx

import CompanyAlternativesPage from '@/views/CompanyAlternativesPage'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  return <CompanyAlternativesPage slug={slug} />
}