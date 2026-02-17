import { generateStructuredData } from '@/lib/seo'

interface StructuredDataProps {
  post?: any
}

export default function StructuredData({ post }: StructuredDataProps) {
  const structuredData = generateStructuredData(post)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

