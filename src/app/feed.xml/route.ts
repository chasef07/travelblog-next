import { siteConfig } from '@/lib/seo'

// Import all blog posts
import { september2024Posts } from '@/content/blog-posts/2024-september'
import { october2024Posts } from '@/content/blog-posts/2024-october'
import { november2024Posts } from '@/content/blog-posts/2024-november'
import { december2024Posts } from '@/content/blog-posts/2024-december'
import { january2025Posts } from '@/content/blog-posts/2025-january'
import { february2025Posts } from '@/content/blog-posts/2025-february'
import { march2025Posts } from '@/content/blog-posts/2025-march'
import { april2025Posts } from '@/content/blog-posts/2025-april'
import { may2025Posts } from '@/content/blog-posts/2025-may'
import { june2025Posts } from '@/content/blog-posts/2025-june'
import { july2025Posts } from '@/content/blog-posts/2025-july'
import { august2025Posts } from '@/content/blog-posts/2025-august'
import { october2025Posts } from '@/content/blog-posts/2025-october'
import { november2025Posts } from '@/content/blog-posts/2025-november'
import { december2025Posts } from '@/content/blog-posts/2025-december'
import { january2026Posts } from '@/content/blog-posts/2026-january'

const allBlogPosts = [
  ...january2026Posts,
  ...december2025Posts,
  ...november2025Posts,
  ...october2025Posts,
  ...august2025Posts,
  ...july2025Posts,
  ...june2025Posts,
  ...may2025Posts,
  ...april2025Posts,
  ...march2025Posts,
  ...february2025Posts,
  ...january2025Posts,
  ...december2024Posts,
  ...november2024Posts,
  ...october2024Posts,
  ...september2024Posts,
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const baseUrl = siteConfig.url

  const rssItems = allBlogPosts.map((post) => {
    const postUrl = `${baseUrl}/blog/${post.year}/${post.slug}`
    const pubDate = new Date(post.date).toUTCString()

    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <author>${siteConfig.author.email} (${siteConfig.author.name})</author>
      <category>Travel</category>
      <category>${escapeXml(post.location)}</category>
    </item>`
  }).join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${baseUrl}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>${escapeXml(siteConfig.name)}</title>
      <link>${baseUrl}</link>
    </image>
    <managingEditor>${siteConfig.author.email} (${siteConfig.author.name})</managingEditor>
    <webMaster>${siteConfig.author.email} (${siteConfig.author.name})</webMaster>
    <copyright>Copyright ${new Date().getFullYear()} ${siteConfig.author.name}</copyright>
    <ttl>60</ttl>
${rssItems}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
