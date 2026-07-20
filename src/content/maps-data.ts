import { SURF_TOWN_GUIDE_CHECKOUT_URL } from '@/lib/product-links'
import { countriesData, type CountryInfo } from '@/content/countries-data'
import { allBlogPosts } from '@/content/blog-registry'
import {
  getPlacesForMap,
  getRelatedPostsForPlace,
  placesData,
  type Place,
} from '@/content/places-data'

export type AtlasPreviewType = 'places' | 'countries'
export type MapProductStatus = 'live' | 'planned'
export type AtlasLens =
  | 'balanced'
  | 'surf'
  | 'workability'
  | 'walkability'
  | 'beauty'
  | 'value'

export type MapProduct = {
  id: string
  slug: string
  title: string
  shortLabel: string
  description: string
  image: string
  price: string
  status: MapProductStatus
  statusLabel: string
  href: string
  checkoutUrl?: string
  previewType: AtlasPreviewType
  previewLabel: string
  audience: string
  valueProps: string[]
  themes: string[]
  featuredCountries?: string[]
  defaultLens?: AtlasLens
}

export type AtlasPlace = Place & {
  relatedPosts: Array<{
    slug: string
    year: string
    title: string
    url: string
  }>
}

export type AtlasProduct = MapProduct & {
  featured: boolean
  preview:
    | { kind: 'places'; items: AtlasPlace[] }
    | { kind: 'countries'; items: CountryInfo[] }
}

export const mapProducts: MapProduct[] = [
  {
    id: 'surf-town-atlas',
    slug: 'surf-town-atlas',
    title: 'Surf Town Atlas',
    shortLabel: 'Surf',
    description:
      'Field-tested towns scored for waves, consistency, vibe, walkability, internet, and long-stay viability.',
    image: '/assets/images/misc/surfrack.jpg',
    price: '$29',
    status: 'live',
    statusLabel: 'Live guide',
    href: '/maps#surf-town-atlas',
    checkoutUrl: SURF_TOWN_GUIDE_CHECKOUT_URL,
    previewType: 'places',
    previewLabel: 'Town rankings',
    audience: 'Surfers, remote workers, and people choosing a warm-water base.',
    valueProps: ['Wave quality', 'Town vibe', 'Walkability', 'Long-stay fit'],
    themes: ['Surf', 'Warm weather', 'Base selection'],
    defaultLens: 'balanced',
  },
  {
    id: 'adventure-atlas',
    slug: 'adventure-atlas',
    title: 'Adventure Atlas',
    shortLabel: 'Adventure',
    description:
      'A shortlist of countries for motorbike loops, waterfalls, islands, caves, boats, and high-variance travel days.',
    image: '/assets/images/misc/laosfall-2.jpg',
    price: '$24',
    status: 'planned',
    statusLabel: 'Building next',
    href: '/maps#adventure-atlas',
    previewType: 'countries',
    previewLabel: 'Country shortlist',
    audience:
      'Travelers who want movement, physical challenge, nature, and a little controlled chaos.',
    valueProps: [
      'Nature density',
      'Route freedom',
      'Physical adventure',
      'Story upside',
    ],
    themes: ['Adventure', 'Nature', 'Motorbikes', 'Islands'],
    featuredCountries: ['Laos', 'Philippines', 'Indonesia'],
  },
  {
    id: 'wellness-atlas',
    slug: 'wellness-atlas',
    title: 'Wellness Atlas',
    shortLabel: 'Wellness',
    description:
      'Countries that support reset: hot springs, slower rhythms, food rituals, mountain air, quiet walks, and real recovery.',
    image: '/assets/images/misc/Georgia.jpg',
    price: '$24',
    status: 'planned',
    statusLabel: 'Building next',
    href: '/maps#wellness-atlas',
    previewType: 'countries',
    previewLabel: 'Country shortlist',
    audience:
      'Travelers choosing places by nervous-system reset, routine, reflection, and physical restoration.',
    valueProps: ['Hot springs', 'Slow routine', 'Food culture', 'Recovery fit'],
    themes: ['Wellness', 'Recovery', 'Stillness', 'Food'],
    featuredCountries: ['Georgia', 'Japan'],
  },
  {
    id: 'cafe-work-atlas',
    slug: 'cafe-work-atlas',
    title: 'Cafe + Work Atlas',
    shortLabel: 'Work',
    description:
      'My shortlist of laptop-friendly cafes, neighborhoods, and cities with the right energy to think and build.',
    image: '/assets/images/misc/coffee.jpg',
    price: '$24',
    status: 'planned',
    statusLabel: 'Planned',
    href: '/maps#cafe-work-atlas',
    previewType: 'places',
    previewLabel: 'Work spots',
    audience:
      'Founders, remote workers, and travelers who need productive days on the road.',
    valueProps: [
      'Wifi quality',
      'Seat comfort',
      'Neighborhood vibe',
      'Workability',
    ],
    themes: ['Cafes', 'Remote work', 'Cities'],
    defaultLens: 'workability',
  },
  {
    id: 'spiritual-places-atlas',
    slug: 'spiritual-places-atlas',
    title: 'Spiritual Places Atlas',
    shortLabel: 'Depth',
    description:
      'Places with actual depth, beauty, and stillness rather than tourist spirituality packaged for consumption.',
    image: '/assets/images/misc/buddha.jpg',
    price: '$24',
    status: 'planned',
    statusLabel: 'Planned',
    href: '/maps#spiritual-places-atlas',
    previewType: 'places',
    previewLabel: 'Depth picks',
    audience:
      'Travelers looking for meaning, beauty, ritual, and real atmosphere.',
    valueProps: ['Authenticity', 'Beauty', 'Stillness', 'Emotional impact'],
    themes: ['Spiritual', 'Reflection', 'Retreat'],
    defaultLens: 'beauty',
  },
]

export const atlasIntents = [
  {
    id: 'surf',
    title: 'Surf Town Atlas',
    description:
      'Compare surf towns and find the one that fits your waves, routine, and long-stay lifestyle.',
    href: '/maps#surf-town-atlas',
    stat: 'Live guide',
  },
  {
    id: 'adventure',
    title: 'Adventure Atlas',
    description:
      'Countries for motorbike loops, islands, caves, waterfalls, and travel days with real story upside.',
    href: '/maps#adventure-atlas',
    stat: 'Laos + islands',
  },
  {
    id: 'wellness',
    title: 'Wellness Atlas',
    description:
      'Countries for hot springs, slower rhythms, food rituals, reflection, and actual reset.',
    href: '/maps#wellness-atlas',
    stat: 'Georgia + Japan',
  },
  {
    id: 'journey',
    title: 'Follow the Journey',
    description:
      'See the chronology, chapters, and route that created the atlas.',
    href: '/journey',
    stat: 'Story + trust',
  },
]

const featuredProductId = 'surf-town-atlas'
const balancedWeights: Record<keyof Place['scores'], number> = {
  surf: 0.35,
  workability: 0.2,
  walkability: 0.15,
  beauty: 0.15,
  community: 0,
  value: 0.15,
}

function placeProjection(place: Place): AtlasPlace {
  return {
    ...place,
    relatedPosts: getRelatedPostsForPlace(place).map((post) => ({
      slug: post.slug,
      year: post.year,
      title: post.title,
      url: `/blog/${post.year}/${post.slug}`,
    })),
  }
}

function resolveProduct(product: MapProduct): AtlasProduct {
  if (product.status === 'live' && !product.checkoutUrl) {
    throw new Error(`Live Atlas product ${product.id} needs checkout`)
  }
  if (product.status === 'planned' && product.checkoutUrl) {
    throw new Error(`Planned Atlas product ${product.id} cannot have checkout`)
  }

  const preview =
    product.previewType === 'places'
      ? {
          kind: 'places' as const,
          items: getPlacesForMap(product.id).map(placeProjection),
        }
      : {
          kind: 'countries' as const,
          items: (product.featuredCountries ?? []).map((name) => {
            const country = countriesData[name]
            if (!country) {
              throw new Error(`Atlas product ${product.id} references ${name}`)
            }
            return country
          }),
        }

  if (preview.items.length === 0) {
    throw new Error(`Atlas product ${product.id} has no preview evidence`)
  }

  return { ...product, featured: product.id === featuredProductId, preview }
}

const products = mapProducts.map(resolveProduct)
const productIds = new Set(products.map((product) => product.id))
if (productIds.size !== products.length) {
  throw new Error('Atlas product identities must be unique')
}

const featuredProducts = products.filter((product) => product.featured)
if (featuredProducts.length !== 1 || featuredProducts[0].status !== 'live') {
  throw new Error('Atlas catalog must have one featured live product')
}

for (const place of placesData) {
  for (const mapId of place.featuredInMaps) {
    if (!productIds.has(mapId)) {
      throw new Error(`Place ${place.slug} references unknown Atlas ${mapId}`)
    }
  }
  for (const slug of place.relatedPostSlugs) {
    if (!allBlogPosts.some((post) => post.slug === slug)) {
      throw new Error(`Place ${place.slug} references unknown Post ${slug}`)
    }
  }
}

export const atlasCatalog = {
  products,
  intents: atlasIntents,
  featuredProduct: featuredProducts[0],
}

export function getAtlasProduct(id: string): AtlasProduct | undefined {
  return products.find((product) => product.id === id)
}

function scorePlace(place: Place, lens: AtlasLens): number {
  if (lens !== 'balanced') return place.scores[lens]
  return Object.entries(balancedWeights).reduce(
    (score, [key, weight]) =>
      score + place.scores[key as keyof Place['scores']] * weight,
    0,
  )
}

export function rankAtlasPlaces(
  lens: AtlasLens,
  productId: string,
): Array<{ place: AtlasPlace; score: number }> {
  const product = getAtlasProduct(productId)
  if (!product || product.preview.kind !== 'places') return []

  return product.preview.items
    .map((place) => ({ place, score: scorePlace(place, lens) }))
    .sort(
      (a, b) => b.score - a.score || a.place.name.localeCompare(b.place.name),
    )
}

export function compareAtlasPlaces(leftSlug: string, rightSlug: string) {
  const left = placesData.find((place) => place.slug === leftSlug)
  const right = placesData.find((place) => place.slug === rightSlug)
  return left && right
    ? { left: placeProjection(left), right: placeProjection(right) }
    : undefined
}
