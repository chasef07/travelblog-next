import {
  blogArchives,
  allBlogPosts,
  type BlogArchive,
} from '@/content/blog-registry'
import {
  countriesData as countryProfiles,
  type CountryInfo,
} from '@/content/countries-data'
import { foodData, type FoodItem } from '@/content/food-data'
import {
  journeyChapters as chapterData,
  type JourneyChapter,
} from '@/content/journey-data'
import { placesData, type Place } from '@/content/places-data'
import type { BlogPost } from '@/types/blog'
import {
  fullJourneyData as routeData,
  type CountryData as RouteCountry,
} from '@/utils/comprehensive-map-data'

const aliases: Record<string, string> = {
  USA: 'United States',
  'Florida, USA': 'United States',
}

export type JourneyCountry = Omit<RouteCountry, 'name' | 'blogPostsCount'> &
  CountryInfo & {
    blogPostsCount: number
  }

export type JourneyStop = {
  country: JourneyCountry
  isCurrent: boolean
}

export type JourneyStats = {
  totalCountries: number
  totalBlogPosts: number
  durationMonths: number
  continents: number
  startDate: string
  endDate: string
}

export type CountryDossier = {
  country: JourneyCountry
  posts: BlogPost[]
  archives: BlogArchive[]
  places: Place[]
  food: FoodItem[]
}

export type Journey = {
  route: JourneyStop[]
  chapters: JourneyChapter[]
  currentStop: JourneyStop
  stats: JourneyStats
}

export function resolveCountryName(name: string): string {
  return aliases[name] ?? name
}

function postCountry(post: BlogPost): string | undefined {
  if (post.country) return resolveCountryName(post.country)
  const locationCountry = post.location.split(',').at(-1)?.trim()
  return locationCountry ? resolveCountryName(locationCountry) : undefined
}

function profileFor(routeCountry: RouteCountry): CountryInfo {
  const name = resolveCountryName(routeCountry.name)
  const existing = countryProfiles[name]
  if (existing) return existing

  if (name !== 'United States') {
    throw new Error(`Missing country profile for ${name}`)
  }

  return {
    name,
    slug: 'united-states',
    flag: 'US-flag.jpg',
    region: 'North America',
    description: routeCountry.description,
    heroImage: '/assets/images/misc/florida-hero.jpg',
    highlights: routeCountry.highlights,
  }
}

const route: JourneyStop[] = routeData.map((source) => {
  const profile = profileFor(source)
  const posts = allBlogPosts.filter(
    (post) => postCountry(post) === profile.name,
  )

  return {
    country: {
      ...source,
      ...profile,
      name: profile.name,
      blogPostsCount: posts.length,
    },
    isCurrent: profile.name === 'Portugal',
  }
})

const currentStops = route.filter((stop) => stop.isCurrent)
if (currentStops.length !== 1) {
  throw new Error(
    `Journey must have one current stop; found ${currentStops.length}`,
  )
}

const routeNames = new Set(route.map((stop) => stop.country.name))
for (const chapter of chapterData) {
  for (const name of chapter.countries.map(resolveCountryName)) {
    if (!routeNames.has(name)) {
      throw new Error(
        `Journey chapter ${chapter.id} references unknown country ${name}`,
      )
    }
  }
  for (const archiveKey of chapter.archiveKeys) {
    const [year, slug] = archiveKey.split('-')
    if (
      !blogArchives.some(
        (archive) => archive.year === Number(year) && archive.slug === slug,
      )
    ) {
      throw new Error(
        `Journey chapter ${chapter.id} references unknown archive ${archiveKey}`,
      )
    }
  }
}

function monthDistance(start: string, end: Date): number {
  const startDate = new Date(`${start} 1`)
  return (
    (end.getUTCFullYear() - startDate.getUTCFullYear()) * 12 +
    end.getUTCMonth() -
    startDate.getUTCMonth() +
    1
  )
}

const regions = new Set(
  route
    .filter((stop) => stop.country.name !== 'United States')
    .map((stop) => stop.country.region),
)

export const journeyStats: JourneyStats = {
  totalCountries: route.filter((stop) => stop.country.name !== 'United States')
    .length,
  totalBlogPosts: allBlogPosts.length,
  durationMonths: monthDistance('September 2024', new Date()),
  continents: new Set(
    [...regions].map((region) => {
      if (region.includes('Africa')) return 'Africa'
      if (region.includes('Europe') || region === 'Caucasus') return 'Europe'
      if (region.includes('America')) return 'Americas'
      return 'Asia'
    }),
  ).size,
  startDate: 'September 2024',
  endDate: 'Present',
}

export function getJourney(): Journey {
  return {
    route,
    chapters: chapterData,
    currentStop: currentStops[0],
    stats: journeyStats,
  }
}

export function getAllCountries(): JourneyCountry[] {
  return route.map((stop) => stop.country)
}

export const fullJourneyData = getAllCountries()
export const countriesData = Object.fromEntries(
  fullJourneyData.map((country) => [country.name, country]),
) as Record<string, JourneyCountry>

export function getCountryBySlug(slug: string): JourneyCountry | undefined {
  return getAllCountries().find((country) => country.slug === slug)
}

export function getCountryByName(name: string): JourneyCountry | undefined {
  const canonicalName = resolveCountryName(name)
  return getAllCountries().find((country) => country.name === canonicalName)
}

export function getCountryDossierBySlug(
  slug: string,
): CountryDossier | undefined {
  const country = getCountryBySlug(slug)
  if (!country) return undefined

  const posts = allBlogPosts.filter(
    (post) => postCountry(post) === country.name,
  )
  const archiveKeys = new Set(
    posts.map(
      (post) =>
        `${post.year}-${new Date(post.date)
          .toLocaleString('en', {
            month: 'long',
            timeZone: 'UTC',
          })
          .toLowerCase()}`,
    ),
  )

  return {
    country,
    posts,
    archives: blogArchives.filter((archive) =>
      archiveKeys.has(`${archive.year}-${archive.slug}`),
    ),
    places: placesData.filter(
      (place) => resolveCountryName(place.country) === country.name,
    ),
    food: Object.values(foodData)
      .flat()
      .filter((item) => resolveCountryName(item.country) === country.name),
  }
}

export type CountryData = JourneyCountry
export type { CountryInfo, JourneyChapter }
