import { posts } from '@/data/posts'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seu-dominio.com'
  const siteName = 'Bruno Theodoro - Blog Técnico'
  const siteDescription = 'Blog técnico sobre desenvolvimento, DevOps, AWS, Kubernetes e tecnologias modernas'

  const rssItems = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((post) => {
      const postUrl = `${baseUrl}/posts/${post.id}`
      const postDate = new Date(post.date).toISOString()
      
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${postDate}</pubDate>
      <author>${post.author}</author>
      <category>${post.tags.join(', ')}</category>
    </item>`
    })
    .join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title><![CDATA[${siteName}]]></title>
    <description><![CDATA[${siteDescription}]]></description>
    <link>${baseUrl}</link>
    <language>pt-BR</language>
    <lastBuildDate>${new Date().toISOString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/logo.jpg</url>
      <title><![CDATA[${siteName}]]></title>
      <link>${baseUrl}</link>
    </image>
    ${rssItems}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

