import type { BlogPost } from '@/types/blog'
import { posts } from '@/content/blog/publication'

export type PlaceTheme = 'surf' | 'work' | 'spiritual'

export type Place = {
  id: string
  slug: string
  name: string
  country: string
  region: string
  coordinates: [number, number]
  image: string
  themes: PlaceTheme[]
  shortVerdict: string
  longVerdict: string
  idealStay: string
  waveType: string
  boardLevel: string
  seasonality: string
  internetNote: string
  costNote: string
  townDensity: string
  bestFor: string[]
  notFor: string[]
  relatedPostSlugs: string[]
  featuredInMaps: string[]
  scores: {
    surf: number
    workability: number
    walkability: number
    beauty: number
    community: number
    value: number
  }
}

export const placesData: Place[] = [
  {
    id: 'santa-teresa',
    slug: 'santa-teresa',
    name: 'Santa Teresa',
    country: 'Costa Rica',
    region: 'Central America',
    coordinates: [9.6426, -85.1681],
    image: '/assets/images/misc/santateresa-boys.jpg',
    themes: ['surf', 'work', 'spiritual'],
    shortVerdict:
      'One of the strongest current candidates for a warm-water surf base that still supports serious work.',
    longVerdict:
      'Santa Teresa has the rhythm I want: surf at sunrise, nature all around, enough modern infrastructure to build, and a community with energy rather than pure drift.',
    idealStay: '1-3 months',
    waveType: 'Beach break with consistent daily surf rhythm',
    boardLevel:
      'Intermediate and above, but committed beginners can build here',
    seasonality:
      'Best when you want warm-water surf and a strong routine more than urban variety',
    internetNote:
      'Good enough to run real workdays, though still not a frictionless city setup',
    costNote:
      'More expensive than it should be, but the lifestyle stack justifies it better than most beach towns',
    townDensity: 'Spread-out beach town',
    bestFor: [
      'daily surf rhythm',
      'founders on the road',
      'warm-weather long stays',
      'nature-first routines',
    ],
    notFor: [
      'city culture',
      'ultra-low-budget living',
      'high walkability without compromise',
    ],
    relatedPostSlugs: [
      'santa-teresa-surfing-building-rhythm',
      'voice-notes-claudebot-presence',
      'santa-teresa-last-days-yerba-mate',
      'leaving-santa-teresa-lessons-learned',
    ],
    featuredInMaps: [
      'surf-town-atlas',
      'cafe-work-atlas',
      'spiritual-places-atlas',
    ],
    scores: {
      surf: 9.1,
      workability: 8.4,
      walkability: 6.8,
      beauty: 9.1,
      community: 8.5,
      value: 6.7,
    },
  },
  {
    id: 'el-tunco',
    slug: 'el-tunco',
    name: 'El Tunco',
    country: 'El Salvador',
    region: 'Central America',
    coordinates: [13.494, -89.3852],
    image: '/assets/images/misc/elsalvador-surfcity.jpg',
    themes: ['surf', 'work'],
    shortVerdict:
      'A sharp, high-potential surf town with enough edge and infrastructure to be taken seriously as a base.',
    longVerdict:
      'El Tunco fits the type of Central American surf town I keep circling back to: warm, compact, surf-oriented, and more practical than people expect.',
    idealStay: '3-6 weeks',
    waveType: 'Point-break culture with a defined surf identity',
    boardLevel: 'Best for surfers who already want real surf town energy',
    seasonality:
      'Works best when you want a compact surf base instead of a broad lifestyle city',
    internetNote:
      'Solid enough for focused work blocks if expectations are realistic',
    costNote: 'Stronger value proposition than many better-known surf towns',
    townDensity: 'Compact surf town',
    bestFor: [
      'point-break access',
      'compact surf-town living',
      'Central America base scouting',
    ],
    notFor: ['deep quiet', 'true urban walkability', 'high-end polish'],
    relatedPostSlugs: ['el-tunco-surf-town-analysis', 'guatemala-to-el-tunco'],
    featuredInMaps: ['surf-town-atlas'],
    scores: {
      surf: 8.8,
      workability: 7.4,
      walkability: 8.1,
      beauty: 7.7,
      community: 7.8,
      value: 8.2,
    },
  },
  {
    id: 'puerto-viejo',
    slug: 'puerto-viejo',
    name: 'Puerto Viejo',
    country: 'Costa Rica',
    region: 'Central America',
    coordinates: [9.6556, -82.7533],
    image: '/assets/images/blog/2025/october/blacksandbeach.jpg',
    themes: ['surf', 'work'],
    shortVerdict:
      'An emotionally compelling beach town with excellent weather, strong nature energy, and a community feel I really respond to.',
    longVerdict:
      'Puerto Viejo feels alive. It hits weather, movement, and local-beach-town energy, though the long-term fit depends on how much structure and ambition you need around you.',
    idealStay: '2-8 weeks',
    waveType: 'Beach-town surf access paired with broader outdoor living',
    boardLevel: 'Lifestyle-first surfers rather than pure performance surfers',
    seasonality:
      'Best when you want nature and rhythm more than perfect infrastructure',
    internetNote:
      'Usable for building, but quality depends on where exactly you set up',
    costNote:
      'Middle of the pack: not cheap enough to ignore tradeoffs, not expensive enough to kill the upside',
    townDensity: 'Compact but loose',
    bestFor: [
      'community feel',
      'outdoor routine',
      'nature-centric lifestyle',
      'beach town energy',
    ],
    notFor: [
      'high-structure environments',
      'people who want polished infrastructure',
    ],
    relatedPostSlugs: ['one-week-in-puerto-viejo', 'clarity-in-puerto-viejo'],
    featuredInMaps: ['surf-town-atlas', 'cafe-work-atlas'],
    scores: {
      surf: 7.4,
      workability: 8.1,
      walkability: 7.2,
      beauty: 9.0,
      community: 8.8,
      value: 7.0,
    },
  },
  {
    id: 'siargao',
    slug: 'siargao',
    name: 'Siargao',
    country: 'Philippines',
    region: 'Southeast Asia',
    coordinates: [9.8482, 126.0458],
    image: '/assets/images/misc/surfrack.jpg',
    themes: ['surf'],
    shortVerdict:
      'Strong surf upside and a real scene, but not a place I rate highly enough overall to call a top-tier long-stay base.',
    longVerdict:
      'Siargao gave me some of my first real surfing breakthroughs, but I came away feeling the water life outperformed the broader culture and long-term lifestyle equation.',
    idealStay: '1-4 weeks',
    waveType: 'Reef and boat-access surf progression environment',
    boardLevel:
      'Best for people prioritizing surf development over total lifestyle fit',
    seasonality:
      'Most attractive when the only question is surf and tropical energy',
    internetNote:
      'Good enough in pockets, but not a place I would trust for frictionless long-form work',
    costNote: 'Feels expensive relative to what you get outside the water',
    townDensity: 'Spread-out island scene',
    bestFor: [
      'surf progression',
      'boat-access breaks',
      'short adventure stays',
    ],
    notFor: [
      'people seeking a full-spectrum lifestyle base',
      'those prioritizing culture over water',
    ],
    relatedPostSlugs: [
      'epic-surfing-day-siargao',
      'siargao-surfing-philippines-critique',
      'port-barton-kayaking-meaningful-calls',
    ],
    featuredInMaps: ['surf-town-atlas'],
    scores: {
      surf: 8.6,
      workability: 6.9,
      walkability: 6.2,
      beauty: 8.6,
      community: 7.8,
      value: 6.0,
    },
  },
  {
    id: 'uluwatu',
    slug: 'uluwatu',
    name: 'Uluwatu / South Bali',
    country: 'Indonesia',
    region: 'Southeast Asia',
    coordinates: [-8.8291, 115.0849],
    image: '/assets/images/misc/beach-bum.jpg',
    themes: ['surf', 'work', 'spiritual'],
    shortVerdict:
      'A strong blend of surf, beauty, and ambitious lifestyle energy if you can tolerate the Bali tradeoffs.',
    longVerdict:
      'South Bali works because the lifestyle stack is unusually complete: surf, cafes, health, ambition, and enough spiritual texture to keep things interesting without living in a retreat bubble.',
    idealStay: '1-3 months',
    waveType: 'Serious surf zone with broad lifestyle support around it',
    boardLevel:
      'Best for committed surfers who also want cafes, gyms, and health infrastructure',
    seasonality:
      'Best when you want maximum optionality in one place and can tolerate popularity',
    internetNote:
      'Strong by surf-town standards and good enough for serious remote work',
    costNote:
      'Fair value if you fully use the lifestyle stack, worse if you only want simplicity',
    townDensity: 'Spread-out but dense in clusters',
    bestFor: [
      'surf + work blend',
      'healthy routines',
      'networked lifestyle travelers',
    ],
    notFor: [
      'people who hate popularity',
      'people looking for low-friction simplicity',
    ],
    relatedPostSlugs: [
      'perfectionist-surfer-uluwatu',
      'balangan-beach-power-waves',
      'bali-arrival-hindu-discovery',
    ],
    featuredInMaps: [
      'surf-town-atlas',
      'cafe-work-atlas',
      'spiritual-places-atlas',
    ],
    scores: {
      surf: 8.9,
      workability: 8.6,
      walkability: 6.3,
      beauty: 8.8,
      community: 8.4,
      value: 7.2,
    },
  },
  {
    id: 'el-paredon',
    slug: 'el-paredon',
    name: 'El Paredon',
    country: 'Guatemala',
    region: 'Central America',
    coordinates: [13.9212, -90.7941],
    image: '/assets/images/misc/beachwalk.jpg',
    themes: ['surf'],
    shortVerdict:
      'A cool backpack surf town, but not a serious candidate for my long-term base list.',
    longVerdict:
      'El Paredon is exactly why a structured atlas matters. A place can be fun, hot, and memorable while still failing the long-term lifestyle test.',
    idealStay: '3-10 days',
    waveType: 'Raw surf town with heat, waves, and backpacker motion',
    boardLevel: 'Adventure-oriented surfers who are okay sacrificing comfort',
    seasonality: 'Best as a test case or short surf hit, not a stable base',
    internetNote: 'Not where I would plan to build seriously over time',
    costNote:
      'Cheap enough to experiment, but not enough upside to justify a long stay for me',
    townDensity: 'Tiny surf strip',
    bestFor: [
      'short surf trips',
      'backpacker energy',
      'testing a surf-town framework',
    ],
    notFor: ['refined long stays', 'urban comfort', 'deep work over time'],
    relatedPostSlugs: ['el-paredon-surf-town-analysis'],
    featuredInMaps: ['surf-town-atlas'],
    scores: {
      surf: 7.8,
      workability: 5.8,
      walkability: 6.6,
      beauty: 7.3,
      community: 7.2,
      value: 8.1,
    },
  },
  {
    id: 'san-diego',
    slug: 'san-diego',
    name: 'San Diego',
    country: 'United States',
    region: 'North America',
    coordinates: [32.7157, -117.1611],
    image: '/assets/images/misc/fagenboyz.jpg',
    themes: ['surf', 'work'],
    shortVerdict:
      'A laid-back American surf city with a lot of the ingredients I like, even if it still feels like a normal city underneath.',
    longVerdict:
      'San Diego combines surf, weather, activity, and a broad lifestyle menu. It is not the small walkable town ideal, but it has more overlap with my interests than most American cities.',
    idealStay: '2 weeks to indefinite',
    waveType: 'City-adjacent surf access with year-round options',
    boardLevel:
      'Works for broad ability levels because the city gives you so much optionality',
    seasonality:
      'Best when you want American practicality plus outdoor life rather than tropical escape',
    internetNote: 'Strong and frictionless by default',
    costNote:
      'The biggest weakness. The city premium changes the entire equation.',
    townDensity: 'Full city',
    bestFor: [
      'US-based surf access',
      'active lifestyle',
      'balancing city practicality with ocean access',
    ],
    notFor: [
      'small-town intimacy',
      'cheap living',
      'people avoiding standard American city energy',
    ],
    relatedPostSlugs: ['san-diego-ron-friendship'],
    featuredInMaps: ['surf-town-atlas', 'cafe-work-atlas'],
    scores: {
      surf: 7.6,
      workability: 8.5,
      walkability: 5.9,
      beauty: 8.2,
      community: 7.8,
      value: 4.9,
    },
  },
]

export function getPlacesByTheme(theme: PlaceTheme): Place[] {
  return placesData.filter((place) => place.themes.includes(theme))
}

export function getPlaceBySlug(slug: string): Place | undefined {
  return placesData.find((place) => place.slug === slug)
}

export function getPlacesByCountry(countryName: string): Place[] {
  return placesData.filter((place) => place.country === countryName)
}

export function getPlacesForMap(mapId: string): Place[] {
  return placesData.filter((place) => place.featuredInMaps.includes(mapId))
}

export function getRelatedPostsForPlace(place: Place): BlogPost[] {
  return place.relatedPostSlugs
    .map((slug) => posts.find((entry) => entry.slug === slug))
    .filter((post) => post !== undefined)
}
