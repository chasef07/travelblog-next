import { MetadataRoute } from 'next'
import { archives, parseBlogDate, posts } from '@/content/blog/publication'
import { getAllCountries } from '@/content/countries-data'
import { siteConfig } from '@/lib/seo'

/**
 * Dynamic sitemap generation for the travel journal.
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
      url: `${baseUrl}/world`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/food`,
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

  const countryPages: MetadataRoute.Sitemap = getAllCountries().map(
    (country) => ({
      url: `${baseUrl}/countries/${country.slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    }),
  )

  const monthlyArchivePages: MetadataRoute.Sitemap = archives.map((post) => {
    const year = post.year
    const slug = post.slug
    const postDate = parseBlogDate(post.date)
    const isRecent =
      currentDate.getTime() - postDate.getTime() < 90 * 24 * 60 * 60 * 1000

    return {
      url: `${baseUrl}/blog/${year}/${slug}`,
      lastModified: postDate,
      changeFrequency: isRecent ? 'weekly' : ('monthly' as const),
      priority: isRecent ? 0.8 : 0.6,
    }
  })

  const individualPostPages: MetadataRoute.Sitemap = posts.map((post) => {
    const postDate = parseBlogDate(post.date)
    const isRecent =
      currentDate.getTime() - postDate.getTime() < 90 * 24 * 60 * 60 * 1000

    return {
      url: `${baseUrl}/blog/${post.year}/${post.slug}`,
      lastModified: postDate,
      changeFrequency: isRecent ? 'weekly' : ('monthly' as const),
      priority: isRecent ? 0.9 : 0.7,
    }
  })

  return [
    ...staticPages,
    ...countryPages,
    ...monthlyArchivePages,
    ...individualPostPages,
  ]
}
