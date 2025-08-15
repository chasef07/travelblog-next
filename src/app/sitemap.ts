import { MetadataRoute } from 'next'
import { blogMetadata } from '@/content/blog-data'
import { siteConfig } from '@/lib/seo'

/**
 * Dynamic sitemap generation for Lone Horizons travel blog
 * Automatically includes all blog posts and main pages
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url

  // Main static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/food`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/transportation`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/vlogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/packing-checklist`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Dynamic blog post pages
  const blogPages: MetadataRoute.Sitemap = blogMetadata.map((post) => {
    // Extract year and slug from the link path
    const pathParts = post.link.split('/')
    const year = pathParts[2]
    const slug = pathParts[3]
    
    // Parse the date to get last modified
    const postDate = new Date(post.date)
    const currentDate = new Date()
    
    // More recent posts get higher priority and more frequent updates
    const isRecent = (currentDate.getTime() - postDate.getTime()) < (90 * 24 * 60 * 60 * 1000) // 90 days
    
    return {
      url: `${baseUrl}/blog/${year}/${slug}`,
      lastModified: postDate,
      changeFrequency: isRecent ? 'weekly' : 'monthly' as const,
      priority: isRecent ? 0.9 : 0.7,
    }
  })

  // Combine all pages
  return [...staticPages, ...blogPages]
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