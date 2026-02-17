import { Metadata } from 'next'
import { Post } from '@/data/posts'
import { seoConfig } from '@/config/seo'

const { baseUrl, siteName, siteDescription, author, social, verification, images } = seoConfig

export function generateSiteMetadata(): Metadata {
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: siteDescription,
    keywords: [
      'inteligencia artificial',
      'I.A para devs',
      'LLM',
      'fine-tuning',
      'context window',
      'machine learning',
      'engenharia de software',
      'arquitetura',
      'desenvolvimento',
      'programação',
      'blog técnico',
      'tecnologia'
    ],
    authors: [{ name: author.name }],
    creator: author.name,
    publisher: author.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: baseUrl,
      siteName,
      title: siteName,
      description: siteDescription,
      images: [
        {
          url: `${baseUrl}${images.ogImage}`,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description: siteDescription,
      images: [`${baseUrl}${images.ogImage}`],
      creator: social.twitter,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: verification.google,
      yandex: verification.yandex,
      yahoo: verification.yahoo,
    },
  }
}

export function generatePostMetadata(post: Post): Metadata {
  const postUrl = `${baseUrl}/posts/${post.id}`
  const postTitle = post.title
  const postDescription = post.excerpt
  const postImage = post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`

  return {
    title: postTitle,
    description: postDescription,
    keywords: [
      ...post.tags,
      'I.A para devs',
      'inteligencia artificial',
      'desenvolvimento',
      'blog técnico'
    ],
    authors: [{ name: post.author }],
    openGraph: {
      type: 'article',
      locale: 'pt_BR',
      url: postUrl,
      siteName,
      title: postTitle,
      description: postDescription,
      images: [
        {
          url: postImage,
          width: 1200,
          height: 630,
          alt: postTitle,
        },
      ],
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: postTitle,
      description: postDescription,
      images: [postImage],
      creator: social.twitter,
    },
    alternates: {
      canonical: postUrl,
    },
  }
}

export function generateStructuredData(post?: Post) {
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: siteName,
        description: siteDescription,
        publisher: {
          '@id': `${baseUrl}/#organization`,
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${baseUrl}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: author.name,
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}${images.logo}`,
        },
        sameAs: [
          social.github,
          social.linkedin,
          `https://twitter.com/${social.twitter.replace('@', '')}`,
        ],
      },
    ],
  }

  if (post) {
    const postStructuredData = {
      '@type': 'BlogPosting',
      '@id': `${baseUrl}/posts/${post.id}`,
      url: `${baseUrl}/posts/${post.id}`,
      headline: post.title,
      description: post.excerpt,
      image: post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`,
      datePublished: new Date(post.date).toISOString(),
      dateModified: new Date(post.date).toISOString(),
      author: {
        '@type': 'Person',
        name: post.author,
        url: baseUrl,
      },
      publisher: {
        '@id': `${baseUrl}/#organization`,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${baseUrl}/posts/${post.id}`,
      },
      keywords: post.tags.join(', '),
      articleSection: 'Technology',
      wordCount: post.content?.length || 0,
    }

    return {
      '@context': 'https://schema.org',
      '@graph': [...baseStructuredData['@graph'], postStructuredData],
    }
  }

  return baseStructuredData
}
