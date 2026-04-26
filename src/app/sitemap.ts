import { MetadataRoute } from 'next'
import { blogMetadata } from '@/content/blog-data'
import { allBlogPosts } from '@/content/blog-registry'
import { siteConfig } from '@/lib/seo'

/**
 * Dynamic sitemap generation for Lifestyle Engineering travel blog
 * Includes all static pages, monthly archives, and individual blog posts
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url
  const currentDate = new Date()

  // Main static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/food`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/transportation`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/vlogs`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/packing-checklist`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Monthly archive pages (from blogMetadata)
  const monthlyArchivePages: MetadataRoute.Sitemap = blogMetadata.map(
    (post) => {
      const pathParts = post.link.split('/')
      const year = pathParts[2]
      const slug = pathParts[3]
      const postDate = new Date(post.date)
      const isRecent =
        currentDate.getTime() - postDate.getTime() < 90 * 24 * 60 * 60 * 1000

      return {
        url: `${baseUrl}/blog/${year}/${slug}`,
        lastModified: postDate,
        changeFrequency: isRecent ? 'weekly' : ('monthly' as const),
        priority: isRecent ? 0.8 : 0.6,
      }
    },
  )

  // Individual blog post pages (higher priority than archives)
  const individualPostPages: MetadataRoute.Sitemap = allBlogPosts.map(
    (post) => {
      const postDate = new Date(post.date)
      const isRecent =
        currentDate.getTime() - postDate.getTime() < 90 * 24 * 60 * 60 * 1000

      return {
        url: `${baseUrl}/blog/${post.year}/${post.slug}`,
        lastModified: postDate,
        changeFrequency: isRecent ? 'weekly' : ('monthly' as const),
        priority: isRecent ? 0.9 : 0.7,
      }
    },
  )

  // Combine all pages
  return [...staticPages, ...monthlyArchivePages, ...individualPostPages]
}

/**
 * Generate robots.txt content dynamically
 */
export function generateRobotsTxt(): string {
  return `# robots.txt for ${siteConfig.url}

User-agent: *
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Allow: /

# Allow all search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

# LLM Bots
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: AnthropicBot
Allow: /

User-agent: PerplexityBot
Allow: /

# Sitemap location
Sitemap: ${siteConfig.url}/sitemap.xml

# Host directive
Host: ${siteConfig.url.replace('https://', '')}
`
}
