import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo'

/**
 * Dynamic robots.txt generation for Next.js App Router
 * Provides proper crawling directives for search engines and AI bots
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/*.json$',
          '/private/',
        ],
      },
      // Specific rules for major search engines
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
      // AI/LLM bot permissions
      {
        userAgent: ['GPTBot', 'ChatGPT-User'],
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'AnthropicBot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}