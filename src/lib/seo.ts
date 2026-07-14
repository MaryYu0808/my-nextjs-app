import type { Metadata } from 'next'

const SITE_URL = 'https://www.procurementai.ai'
const OG_IMAGE_PATH = 'https://www.procurementai.ai/imgs/og-share.jpg'

export function buildSeoMetadata(title: string, description: string, path: string = '/'): Metadata {
  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: path,  // Use relative path, Next.js will resolve with metadataBase
    },
    openGraph: {
      title,
      description,
      siteName: 'ProcurementAI',
      type: 'website',
      url: path,  // Use relative path, Next.js will resolve with metadataBase
      images: [
        {
          url: OG_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt: 'ProcurementAI share preview',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE_PATH],
    },
  }
}

// JSON-LD structured data generators
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ProcurementAI',
    url: SITE_URL,
    logo: `${SITE_URL}/procurement-ai-favicon.png`,
    description: 'A structured, independent directory of AI-enabled procurement companies — mapped by workflow, use case, and automation maturity.',
    sameAs: [],
  }
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ProcurementAI',
    url: SITE_URL,
    description: 'Navigate the AI Procurement Technology Market',
    publisher: {
      '@type': 'Organization',
      name: 'ProcurementAI',
    },
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateCompanySchema(company: {
  name: string
  slug: string
  description: string
  website: string
  logo: string
  founded?: number
  headquarters?: string
}) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    url: company.website,
    description: company.description,
    logo: company.logo,
  }

  if (company.founded) {
    schema.foundingDate = company.founded.toString()
  }

  if (company.headquarters) {
    schema.address = {
      '@type': 'PostalAddress',
      addressCountry: company.headquarters,
    }
  }

  return schema
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateCollectionPageSchema(name: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
  }
}