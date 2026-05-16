import { SURF_TOWN_GUIDE_CHECKOUT_URL } from '@/lib/product-links'

export type AtlasPreviewType = 'places' | 'countries'
export type MapProductStatus = 'live' | 'planned'

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
