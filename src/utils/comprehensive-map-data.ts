import type { BlogPost } from '@/types/blog'
import { posts } from '@/content/blog/publication'

export interface CountryData {
  name: string
  stopName?: string
  coordinates: [number, number]
  visitDate: string
  highlights: string[]
  blogPostsCount: number
  flagCode: string
  description: string
  color: string
  posts?: BlogPost[]
}

// Your complete world tour journey
export const fullJourneyData: CountryData[] = [
  {
    name: 'Israel',
    coordinates: [31.7683, 35.2137],
    visitDate: 'September 2024',
    highlights: [
      'Volunteering Near Gaza',
      'Tel Aviv Beach Culture',
      'Rosh Hashanah at the Kotel',
      'Iranian Missile Attack',
    ],
    blogPostsCount: 12,
    flagCode: 'IL',
    description:
      'Where the journey began - volunteering near Gaza, experiencing Israeli resilience, and surviving 200 Iranian ballistic missiles.',
    color: '#3b82f6',
  },
  {
    name: 'Georgia',
    coordinates: [42.3154, 43.3569],
    visitDate: 'October 2024',
    highlights: [
      'Gudauri Ski Investment',
      'Sighnagi Wine Country',
      'Prometheus Cave',
      'Tbilisi Sulfur Baths',
    ],
    blogPostsCount: 10,
    flagCode: 'GE',
    description:
      'Adventure capitalism in the Caucasus - purchasing an apartment in Gudauri ski resort and exploring ancient wine-making traditions.',
    color: '#8b5cf6',
  },
  {
    name: 'Kenya',
    coordinates: [-1.2921, 36.8219],
    visitDate: 'November 2024',
    highlights: [
      'Nairobi Nightlife',
      'Diani Beach Relaxation',
      'Kite Surfing Lessons',
      'Beach Volleyball',
    ],
    blogPostsCount: 6,
    flagCode: 'KE',
    description:
      'First taste of Africa - deep conversations about geopolitics, learning to kite surf, and embracing the pole-pole philosophy.',
    color: '#10b981',
  },
  {
    name: 'Tanzania',
    coordinates: [-6.369, 34.8888],
    visitDate: 'November 2024',
    highlights: [
      'Serengeti Safari',
      'Hunting with Hadza Tribe',
      'Ngorongoro Crater',
      'Tarangire National Park',
    ],
    blogPostsCount: 4,
    flagCode: 'TZ',
    description:
      "Epic 6-day safari across four national parks and hunting at dawn with the Hadza, one of Earth's last hunter-gatherer tribes.",
    color: '#f59e0b',
  },
  {
    name: 'Rwanda',
    coordinates: [-1.9403, 29.8739],
    visitDate: 'November 2024',
    highlights: [
      'Kigali Genocide Memorial',
      'Painting with Innocent',
      'Kivu Noir Coffee',
      'Adventure Capitalism Meetings',
    ],
    blogPostsCount: 5,
    flagCode: 'RW',
    description:
      'The cleanest city in Africa - meeting world-renowned artist Innocent, exploring gravity economics, and learning about the genocide.',
    color: '#ef4444',
  },
  {
    name: 'UAE',
    coordinates: [25.2048, 55.2708],
    visitDate: 'November 2024',
    highlights: [
      'Burj Khalifa',
      'Ski Dubai Indoor Slopes',
      'Dubai Mall',
      'Intermission Reflections',
    ],
    blogPostsCount: 2,
    flagCode: 'AE',
    description:
      'Brief intermission between Africa and Asia - indoor skiing at Ski Dubai and observing extreme consumption culture.',
    color: '#06b6d4',
  },
  {
    name: 'Nepal',
    coordinates: [27.7172, 85.324],
    visitDate: 'December 2024',
    highlights: [
      'Annapurna Circuit Trek',
      'Thorong La Pass 5,416m',
      'Kathmandu Chabad',
      'Hindu Spiritual Learning',
    ],
    blogPostsCount: 12,
    flagCode: 'NP',
    description:
      "The Himalayas challenged everything - 11-day Annapurna Circuit trek crossing the world's highest pass at 17,769 feet in -25F conditions.",
    color: '#8b5cf6',
  },
  {
    name: 'Thailand',
    coordinates: [15.87, 100.9925],
    visitDate: 'December 2024',
    highlights: [
      'Koh Tao Snorkeling',
      'Bangkok Chabad Shabbat',
      'Muay Thai Training',
      'Sea Turtle Encounters',
    ],
    blogPostsCount: 8,
    flagCode: 'TH',
    description:
      'Island paradise exploration - snorkeling with sea turtles, training Muay Thai, and celebrating Christmas on Koh Tao.',
    color: '#f59e0b',
  },
  {
    name: 'Laos',
    coordinates: [19.8563, 102.4955],
    visitDate: 'February 2025',
    highlights: [
      'Nong Khiaw Homestay',
      'Thakhek Loop',
      'Kuang Si Falls',
      'Mekong River Slow Boat',
    ],
    blogPostsCount: 5,
    flagCode: 'LA',
    description:
      'Peaceful and authentic Southeast Asian experience - farm volunteering, exploring Kong Lor Cave, and embracing simplicity.',
    color: '#10b981',
  },
  {
    name: 'Cambodia',
    coordinates: [12.5657, 104.991],
    visitDate: 'March 2025',
    highlights: [
      'Angkor Wat Sunrise',
      'Koh Rong Island',
      'Killing Fields History',
      'Kampot Pepper Farms',
    ],
    blogPostsCount: 6,
    flagCode: 'KH',
    description:
      'Ancient temples and island paradise - witnessing Angkor Wat at sunrise and relaxing on pristine Koh Rong beaches.',
    color: '#ef4444',
  },
  {
    name: 'China',
    coordinates: [30.5728, 104.0668],
    visitDate: 'March 2025',
    highlights: [
      'Chengdu Giant Pandas',
      'Sichuan Spicy Cuisine',
      'Zhangjiajie Avatar Mountains',
      'Great Wall Hike',
    ],
    blogPostsCount: 5,
    flagCode: 'CN',
    description:
      'Ancient civilization meets modern innovation - from cuddly pandas in Chengdu to the otherworldly Zhangjiajie mountains.',
    color: '#dc2626',
  },
  {
    name: 'Vietnam',
    coordinates: [14.0583, 108.2772],
    visitDate: 'April 2025',
    highlights: [
      'Ha Giang Motorbike Loop',
      '4,000km Solo Ride',
      'Homestay with Indigenous Families',
      'Phong Nha Caves',
    ],
    blogPostsCount: 8,
    flagCode: 'VN',
    description:
      'Epic 4,000km solo motorbike adventure from north to south - sleeping in indigenous homestays and eating pho for breakfast daily.',
    color: '#059669',
  },
  {
    name: 'Singapore',
    coordinates: [1.3521, 103.8198],
    visitDate: 'May 2025',
    highlights: [
      'Little India Exploration',
      'Hawker Center Food',
      'Gardens by the Bay',
      'Efficient City-State',
    ],
    blogPostsCount: 2,
    flagCode: 'SG',
    description:
      'Ultra-modern city-state exploration - comparing Singapore vs Dubai and discovering amazing hawker center culture.',
    color: '#0ea5e9',
  },
  {
    name: 'Philippines',
    coordinates: [12.8797, 121.774],
    visitDate: 'May 2025',
    highlights: [
      'Siargao Surfing Success',
      'Keelooma Boat Expedition',
      'Kawasan Falls Canyoneering',
      'Siquijor Healing Island',
    ],
    blogPostsCount: 10,
    flagCode: 'PH',
    description:
      'Finally learning to surf in Siargao after years of failed attempts, plus an unforgettable 3-day island-hopping expedition.',
    color: '#3b82f6',
  },
  {
    name: 'Indonesia',
    coordinates: [-8.4095, 115.1889],
    visitDate: 'June 2025',
    highlights: [
      'Swimming with Manta Rays',
      'Ubud Sound Healing',
      'Komodo Dragon Encounter',
      'Whale Shark Snorkeling',
    ],
    blogPostsCount: 9,
    flagCode: 'ID',
    description:
      'Spiritual Bali awakening and wild adventures - sound healing with Dennis the adventure capitalist and swimming with whale sharks.',
    color: '#f59e0b',
  },
  {
    name: 'Japan',
    coordinates: [43.0642, 141.3469],
    visitDate: 'July 2025',
    highlights: [
      'Hokkaido Onsen Culture',
      'Noboribetsu Hot Springs',
      'Sapporo Exploration',
      'Deep Introspection',
    ],
    blogPostsCount: 12,
    flagCode: 'JP',
    description:
      'Return to Japan with fresh perspective - exploring rural Hokkaido onsens and writing essays on detachment and modern life.',
    color: '#ec4899',
  },
  {
    name: 'Florida, USA',
    coordinates: [27.9659, -82.8001],
    visitDate: 'August 2025',
    highlights: [
      'Coming Home',
      'Family Reunion',
      'Reverse Culture Shock',
      'Reflection Period',
    ],
    blogPostsCount: 3,
    flagCode: 'US',
    description:
      'Returning home to Clearwater after 10 months of world travel - processing the journey and planning the next chapter.',
    color: '#3b82f6',
  },
  {
    name: 'Costa Rica',
    coordinates: [9.7489, -83.7534],
    visitDate: 'October 2025',
    highlights: [
      'Dominical Surfing',
      'Jungle Waterfalls',
      'Pura Vida Lifestyle',
      'Local Beach Culture',
    ],
    blogPostsCount: 3,
    flagCode: 'CR',
    description:
      'Central American gem - one of my favorite travel destinations with perfect surf, jungle waterfalls, and authentic local vibes.',
    color: '#22c55e',
  },
  {
    name: 'Panama',
    coordinates: [8.9824, -79.5199],
    visitDate: 'November 2025',
    highlights: [
      'Panama Canal',
      'Bocas del Toro Islands',
      'San Blas Indigenous Culture',
      'Caribbean Beaches',
    ],
    blogPostsCount: 2,
    flagCode: 'PA',
    description:
      'Where Central and South America meet - exploring the famous canal and Caribbean island adventures.',
    color: '#0ea5e9',
  },
  {
    name: 'Guatemala',
    coordinates: [14.6349, -90.5069],
    visitDate: 'December 2025',
    highlights: [
      'Antigua Guatemala',
      'Lake Atitlán',
      'Mayan Ruins',
      'Colonial Architecture',
    ],
    blogPostsCount: 2,
    flagCode: 'GT',
    description:
      'Colonial charm and Mayan culture in the heart of Central America.',
    color: '#4ade80',
  },
  {
    name: 'El Salvador',
    coordinates: [13.4933, -89.3833],
    visitDate: 'January 2026',
    highlights: [
      'El Tunco Surfing',
      'Black Sand Beaches',
      'Pupusas',
      'Bitcoin Country',
    ],
    blogPostsCount: 0,
    flagCode: 'SV',
    description:
      "Surf paradise on the Pacific coast - riding waves at El Tunco and exploring Central America's Bitcoin nation.",
    color: '#0066cc',
  },
  {
    name: 'Netherlands',
    coordinates: [51.9244, 4.4777],
    visitDate: 'May 2026',
    highlights: [
      'Rotterdam Base',
      'Dutch Design',
      'Cycling Culture',
      'Harbor City Energy',
    ],
    blogPostsCount: 0,
    flagCode: 'NL',
    description:
      "Rotterdam chapter exploring the Netherlands' design, cycling culture, and port-city energy.",
    color: '#f97316',
  },
  {
    name: 'Belgium',
    coordinates: [51.0543, 3.7174],
    visitDate: 'May 2026',
    highlights: [
      'Ghent Base',
      'Canal Streets',
      'Belgian Beer',
      'Flemish Architecture',
    ],
    blogPostsCount: 0,
    flagCode: 'BE',
    description:
      'Ghent chapter with Belgium flag on the map, canal streets, and Flemish architecture.',
    color: '#ef4444',
  },
  {
    name: 'Portugal',
    stopName: 'Ericeira',
    coordinates: [38.9627, -9.4156],
    visitDate: 'May 2026',
    highlights: [
      'Ericeira Base',
      'Atlantic Surf',
      'Portuguese Coast',
      'Euro Summer',
    ],
    blogPostsCount: 0,
    flagCode: 'PT',
    description:
      'European chapter based in Ericeira - Portugal flag on the map, Atlantic surf, and coastal work base energy.',
    color: '#16a34a',
  },
  {
    name: 'Italy',
    stopName: 'Milan',
    coordinates: [45.4642, 9.19],
    visitDate: 'July 2026',
    highlights: ['Milan', 'Northern Italy', 'Italian Food', 'Euro Summer'],
    blogPostsCount: 1,
    flagCode: 'IT',
    description:
      'Milan, northern Italy, and the bridge from Portugal into the Alpine chapter.',
    color: '#15803d',
  },
  {
    name: 'Switzerland',
    stopName: 'Interlaken',
    coordinates: [46.6863, 7.8632],
    visitDate: 'August 2026',
    highlights: ['Interlaken', 'Swiss Alps', 'Mountain Towns', 'Euro Summer'],
    blogPostsCount: 1,
    flagCode: 'CH',
    description:
      'The current Alpine chapter based in Interlaken, surrounded by lakes and mountain routes.',
    color: '#dc2626',
  },
]

// Calculate journey stats
export const journeyStats = {
  totalCountries: 25, // Excluding Florida/USA return home
  totalBlogPosts: posts.length,
  durationMonths: 23,
  continents: 4, // Asia, Africa, Europe, Central America
  startDate: 'September 2024',
  endDate: 'Present',
}

// Utility functions for country data access

// Get country by name (case-insensitive)
export function getCountryByName(name: string): CountryData | undefined {
  return fullJourneyData.find(
    (country) => country.name.toLowerCase() === name.toLowerCase(),
  )
}

// Get country by flag code
export function getCountryByCode(code: string): CountryData | undefined {
  return fullJourneyData.find(
    (country) => country.flagCode.toLowerCase() === code.toLowerCase(),
  )
}

// Get all country names
export function getCountryNames(): string[] {
  return fullJourneyData.map((country) => country.name)
}

// Get all flag codes
export function getCountryCodes(): string[] {
  return fullJourneyData.map((country) => country.flagCode)
}

// Create a map for quick lookups
export const countryByName = new Map<string, CountryData>(
  fullJourneyData.map((country) => [country.name.toLowerCase(), country]),
)

export const countryByCode = new Map<string, CountryData>(
  fullJourneyData.map((country) => [country.flagCode.toLowerCase(), country]),
)

// Get flag emoji from country code
export function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

// Get countries by continent/region
export function getCountriesByRegion(
  region: 'asia' | 'africa' | 'europe' | 'americas',
): CountryData[] {
  const regionMap: Record<string, string[]> = {
    asia: [
      'Israel',
      'UAE',
      'Nepal',
      'Thailand',
      'Laos',
      'Cambodia',
      'China',
      'Vietnam',
      'Singapore',
      'Philippines',
      'Indonesia',
      'Japan',
    ],
    africa: ['Kenya', 'Tanzania', 'Rwanda'],
    europe: [
      'Georgia',
      'Netherlands',
      'Belgium',
      'Portugal',
      'Italy',
      'Switzerland',
    ],
    americas: [
      'Florida, USA',
      'Costa Rica',
      'Panama',
      'Guatemala',
      'El Salvador',
    ],
  }

  const countryNames = regionMap[region] || []
  return fullJourneyData.filter((country) =>
    countryNames.includes(country.name),
  )
}
