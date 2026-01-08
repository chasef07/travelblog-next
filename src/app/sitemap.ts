import { MetadataRoute } from 'next'
import { blogMetadata } from '@/content/blog-data'
import { siteConfig } from '@/lib/seo'

// Import all blog post files for individual post URLs
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

// Combine all individual blog posts
const allBlogPosts = [
  ...september2024Posts,
  ...october2024Posts,
  ...november2024Posts,
  ...december2024Posts,
  ...january2025Posts,
  ...february2025Posts,
  ...march2025Posts,
  ...april2025Posts,
  ...may2025Posts,
  ...june2025Posts,
  ...july2025Posts,
  ...august2025Posts,
  ...october2025Posts,
  ...november2025Posts,
  ...december2025Posts,
  ...january2026Posts,
]

/**
 * Dynamic sitemap generation for Living Gambit travel blog
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
  const monthlyArchivePages: MetadataRoute.Sitemap = blogMetadata.map((post) => {
    const pathParts = post.link.split('/')
    const year = pathParts[2]
    const slug = pathParts[3]
    const postDate = new Date(post.date)
    const isRecent = (currentDate.getTime() - postDate.getTime()) < (90 * 24 * 60 * 60 * 1000)

    return {
      url: `${baseUrl}/blog/${year}/${slug}`,
      lastModified: postDate,
      changeFrequency: isRecent ? 'weekly' : 'monthly' as const,
      priority: isRecent ? 0.8 : 0.6,
    }
  })

  // Individual blog post pages (higher priority than archives)
  const individualPostPages: MetadataRoute.Sitemap = allBlogPosts.map((post) => {
    const postDate = new Date(post.date)
    const isRecent = (currentDate.getTime() - postDate.getTime()) < (90 * 24 * 60 * 60 * 1000)

    return {
      url: `${baseUrl}/blog/${post.year}/${post.slug}`,
      lastModified: postDate,
      changeFrequency: isRecent ? 'weekly' : 'monthly' as const,
      priority: isRecent ? 0.9 : 0.7,
    }
  })

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