import { Metadata } from 'next'
import { BlogPost } from '@/types/blog'

/**
 * SEO configuration and utilities for Lone Horizons travel blog
 */

export const siteConfig = {
  name: 'Lone Horizons',
  description: 'Solo Travel Adventures & Authentic Cultural Experiences Across 16 Countries. Real stories, practical tips, and cultural insights from a year-long solo journey through Asia, Africa, and beyond.',
  url: 'https://chasefagen.com',
  author: {
    name: 'Chase Fagen',
    email: 'fagenchase@gmail.com',
    twitter: '@chasef07',
    instagram: '@chasef07'
  },
  keywords: [
    'solo travel blog',
    'Asia travel guide',
    'Africa travel tips',
    'cultural travel experiences',
    'backpacking Asia',
    'solo travel guides',
    'authentic travel stories',
    'budget travel tips',
    'cultural immersion travel',
    'Southeast Asia backpacking',
    'East Africa travel',
    'travel photography',
    'solo female travel',
    'adventure travel blog',
    'travel better cheaper smarter'
  ]
} as const

/**
 * Generate comprehensive metadata for pages
 */
export function generatePageMetadata({
  title,
  description,
  path = '',
  images = [],
  type = 'website',
  publishedTime,
  modifiedTime,
  keywords = []
}: {
  title: string
  description: string
  path?: string
  images?: string[]
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  keywords?: string[]
}): Metadata {
  const url = `${siteConfig.url}${path}`
  const fullTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`
  
  const defaultImage = `${siteConfig.url}/assets/images/misc/posttrip.jpg`
  const imageUrls = images.length > 0 ? images.map(img => 
    img.startsWith('http') ? img : `${siteConfig.url}${img}`
  ) : [defaultImage]

  return {
    title: fullTitle,
    description,
    keywords: [...siteConfig.keywords, ...keywords].join(', '),
    authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: imageUrls.map(url => ({
        url,
        width: 1200,
        height: 630,
        alt: title,
      })),
      locale: 'en_US',
      type,
      ...(type === 'article' && publishedTime && {
        publishedTime,
        modifiedTime: modifiedTime || publishedTime,
        authors: [siteConfig.author.name],
        section: 'Travel',
        tags: keywords
      })
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: imageUrls,
      creator: siteConfig.author.twitter,
      site: siteConfig.author.twitter,
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
  }
}

/**
 * Generate JSON-LD structured data for articles
 */
export function generateArticleJsonLd(post: BlogPost, images: string[] = []): object {
  const imageUrls = images.length > 0 ? images : post.images?.map(img => 
    img.src.startsWith('http') ? img.src : `${siteConfig.url}${img.src}`
  ) || []

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: imageUrls,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.url,
      sameAs: [
        `https://twitter.com/${siteConfig.author.twitter?.replace('@', '')}`,
        `https://instagram.com/${siteConfig.author.instagram?.replace('@', '')}`
      ]
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`
      }
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/blog/${post.year}/${post.slug}`
    },
    articleSection: 'Travel',
    keywords: [
      'travel',
      post.location,
      `${post.location} travel`,
      'travel blog',
      'travel guide'
    ],
    locationCreated: {
      '@type': 'Place',
      name: post.location
    },
    ...(post.readingTime && {
      timeRequired: `PT${post.readingTime}M`
    })
  }
}

/**
 * Generate JSON-LD for website/organization
 */
export function generateWebsiteJsonLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.url
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    sameAs: [
      `https://twitter.com/${siteConfig.author.twitter?.replace('@', '')}`,
      `https://instagram.com/${siteConfig.author.instagram?.replace('@', '')}`
    ]
  }
}

/**
 * Generate JSON-LD for breadcrumb navigation
 */
export function generateBreadcrumbJsonLd(items: Array<{name: string, url: string}>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

/**
 * Generate JSON-LD for travel guides/destinations
 */
export function generateTravelGuideJsonLd(destination: string, description: string, images: string[] = []): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelGuide',
    name: `${destination} Travel Guide`,
    description,
    image: images,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.url
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name
    },
    about: {
      '@type': 'Place',
      name: destination
    }
  }
}

/**
 * Generate JSON-LD for travel experiences/trips
 */
export function generateTripJsonLd(destination: string, title: string, description: string, date: string, images: string[] = []): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Trip',
    name: title,
    description,
    image: images,
    startDate: date,
    itinerary: {
      '@type': 'Place',
      name: destination
    },
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.url
    },
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url
    }
  }
}

/**
 * Generate JSON-LD for travel blog with enhanced structured data
 */
export function generateTravelBlogJsonLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.url,
      sameAs: [
        `https://twitter.com/${siteConfig.author.twitter?.replace('@', '')}`,
        `https://instagram.com/${siteConfig.author.instagram?.replace('@', '')}`
      ]
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url
    },
    blogPost: [],
    audience: {
      '@type': 'Audience',
      audienceType: 'solo travelers, backpackers, cultural explorers'
    },
    about: [
      {
        '@type': 'Thing',
        name: 'Solo Travel'
      },
      {
        '@type': 'Thing', 
        name: 'Cultural Experiences'
      },
      {
        '@type': 'Thing',
        name: 'Backpacking'
      },
      {
        '@type': 'Thing',
        name: 'Travel Photography'
      }
    ]
  }
}