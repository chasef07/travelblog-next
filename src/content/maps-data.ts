export type MapProduct = {
  id: string
  slug: string
  title: string
  shortLabel: string
  description: string
  image: string
  price: string
  status: 'flagship' | 'planned'
  audience: string
  valueProps: string[]
  themes: string[]
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
    status: 'flagship',
    audience: 'Surfers, remote workers, and people choosing a warm-water base.',
    valueProps: ['Wave quality', 'Town vibe', 'Walkability', 'Long-stay fit'],
    themes: ['Surf', 'Warm weather', 'Base selection'],
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
    status: 'flagship',
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
    status: 'flagship',
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
    stat: 'Paid flagship',
  },
  {
    id: 'work',
    title: 'Cafe + Work Spots',
    description:
      'Places where the laptop life actually feels good instead of compromised.',
    href: '/maps#cafe-work-atlas',
    stat: 'Wifi + energy',
  },
  {
    id: 'spiritual',
    title: 'Spiritually Interesting Places',
    description:
      'Atmospheric, beautiful places with depth and not too much performance.',
    href: '/maps#spiritual-places-atlas',
    stat: 'Depth + stillness',
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
