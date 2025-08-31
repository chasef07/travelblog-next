import type { BlogPost } from '@/types/blog'

export interface CountryData {
  name: string
  coordinates: [number, number]
  visitDate: string
  highlights: string[]
  blogPostsCount: number
  flagCode: string
  description: string
  color: string
  posts: BlogPost[]
}

// Extract real data from March 2025 posts
async function extractCountryDataFromPosts(): Promise<CountryData[]> {
  // Dynamic import to avoid issues during static generation
  const { march2025Posts } = await import('@/content/blog-posts/2025-march')
  
  const countryMap = new Map<string, {
    posts: BlogPost[]
    highlights: Set<string>
  }>()

  // Group posts by country based on location field
  march2025Posts.forEach(post => {
    if (post.location) {
      const country = post.location.split(',').pop()?.trim() || ''
      if (country && country !== 'USA') {
        if (!countryMap.has(country)) {
          countryMap.set(country, {
            posts: [],
            highlights: new Set()
          })
        }
        countryMap.get(country)!.posts.push(post)
        
        // Extract highlights from content
        const content = post.content.toLowerCase()
        if (content.includes('temple') || content.includes('angkor')) {
          countryMap.get(country)!.highlights.add('Ancient Temples')
        }
        if (content.includes('beach') || content.includes('island')) {
          countryMap.get(country)!.highlights.add('Pristine Beaches')
        }
        if (content.includes('mountain') || content.includes('national park')) {
          countryMap.get(country)!.highlights.add('Natural Beauty')
        }
        if (content.includes('food') || content.includes('restaurant')) {
          countryMap.get(country)!.highlights.add('Amazing Food')
        }
        if (content.includes('culture') || content.includes('local')) {
          countryMap.get(country)!.highlights.add('Rich Culture')
        }
        if (content.includes('motorbike') || content.includes('bike')) {
          countryMap.get(country)!.highlights.add('Motorbike Adventures')
        }
      }
    }
  })

  const countries: CountryData[] = []

  // Create country data for each visited country
  countryMap.forEach((data, countryName) => {
    let coordinates: [number, number] = [0, 0]
    let flagCode = ''
    let description = ''
    let color = ''

    switch (countryName) {
      case 'Vietnam':
        coordinates = [14.0583, 108.2772]
        flagCode = 'VN'
        description = 'Incredible motorbike adventures, stunning landscapes, and amazing street food culture.'
        color = '#059669'
        break
      case 'China':
        coordinates = [35.8617, 104.1954]
        flagCode = 'CN'
        description = 'Ancient civilization meets modern innovation - from pandas in Chengdu to sacred mountains.'
        color = '#dc2626'
        break
      case 'Cambodia':
        coordinates = [12.5657, 104.9910]
        flagCode = 'KH'
        description = 'Ancient temples of Angkor Wat, pristine beaches of Koh Rong, and resilient people with rich history.'
        color = '#ef4444'
        break
      default:
        coordinates = [0, 0]
        flagCode = 'XX'
        description = 'An incredible travel destination with unique experiences.'
        color = '#3b82f6'
    }

    // Get visit date from first post
    const sortedPosts = data.posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    const visitDate = new Date(sortedPosts[0].date).toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    })

    countries.push({
      name: countryName,
      coordinates,
      visitDate,
      highlights: Array.from(data.highlights).slice(0, 4), // Limit to 4 highlights
      blogPostsCount: data.posts.length,
      flagCode,
      description,
      color,
      posts: data.posts
    })
  })

  return countries.sort((a, b) => new Date(a.posts[0].date).getTime() - new Date(b.posts[0].date).getTime())
}

// Export a function that can be called to get the data
export const getRealCountryData = extractCountryDataFromPosts