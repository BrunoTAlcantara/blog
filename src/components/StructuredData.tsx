import { generateStructuredData } from '@/lib/seo'
import { Post } from '@/data/posts'

interface StructuredDataProps {
  post?: Post
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

