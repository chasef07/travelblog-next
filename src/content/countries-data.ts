export interface CountryInfo {
  name: string
  slug: string
  flag: string
  region: string
  description: string
  dates?: {
    firstVisit: string
    lastVisit?: string
  }
  highlights?: string[]
}

export const countriesData: Record<string, CountryInfo> = {
  Israel: {
    name: 'Israel',
    slug: 'israel',
    flag: 'IS-flag.jpg',
    region: 'Middle East',
    description:
      'Gaza border farming, Jerusalem holidays, Tel Aviv, and the first month on the road.',
    dates: { firstVisit: '2024-09-21', lastVisit: '2024-10-20' },
    highlights: [
      'Jerusalem',
      'Tel Aviv',
      'Gaza Border Farming',
      'Sukkot Celebration',
    ],
  },
  Georgia: {
    name: 'Georgia',
    slug: 'georgia',
    flag: 'GG-flag.jpg',
    region: 'Caucasus',
    description:
      'Tbilisi, wine country, Prometheus Cave, and the Gudauri apartment bet.',
    dates: { firstVisit: '2024-10-20', lastVisit: '2024-10-27' },
    highlights: ['Tbilisi', 'Georgian Wine', 'Mountain Monasteries'],
  },
  Kenya: {
    name: 'Kenya',
    slug: 'kenya',
    flag: 'KE-flag.jpg',
    region: 'East Africa',
    description:
      'Nairobi, Diani Beach, kite surfing, and the first real taste of East Africa.',
    dates: { firstVisit: '2024-10-27', lastVisit: '2024-11-10' },
    highlights: ['Nairobi', 'Safari', 'Maasai Culture'],
  },
  Tanzania: {
    name: 'Tanzania',
    slug: 'tanzania',
    flag: 'TZ-flag.jpg',
    region: 'East Africa',
    description:
      'Serengeti safari, Ngorongoro, Tarangire, and hunting at dawn with the Hadza.',
    dates: { firstVisit: '2024-11-10', lastVisit: '2024-11-17' },
    highlights: ['Zanzibar', 'Serengeti', 'Stone Town'],
  },
  Rwanda: {
    name: 'Rwanda',
    slug: 'rwanda',
    flag: 'RW-flag.jpg',
    region: 'East Africa',
    description:
      'Kigali, Kivu Noir coffee, the genocide memorial, and meetings about business in Africa.',
    dates: { firstVisit: '2024-11-17', lastVisit: '2024-11-24' },
    highlights: ['Kigali', 'Gorilla Trekking', 'Genocide Memorial'],
  },
  UAE: {
    name: 'UAE',
    slug: 'uae',
    flag: 'AE-flag.jpg',
    region: 'Middle East',
    description:
      'Dubai layover, Burj Khalifa, Ski Dubai, and the consumption capital between trip legs.',
    dates: { firstVisit: '2024-11-24', lastVisit: '2024-12-01' },
    highlights: ['Dubai', 'Abu Dhabi', 'Desert Safari'],
  },
  Nepal: {
    name: 'Nepal',
    slug: 'nepal',
    flag: 'NP-flag.jpg',
    region: 'South Asia',
    description:
      'Annapurna Circuit, Thorong La Pass, Kathmandu, Pokhara, and Himalayan pressure testing.',
    dates: { firstVisit: '2024-12-01', lastVisit: '2024-12-20' },
    highlights: [
      'Annapurna Circuit',
      'Kathmandu',
      'Pokhara',
      'Himalayan Views',
    ],
  },
  Thailand: {
    name: 'Thailand',
    slug: 'thailand',
    flag: 'TH-flag.jpg',
    region: 'Southeast Asia',
    description:
      'Koh Tao, Full Moon Party, Chiang Dao, Pai, Muay Thai, and the first Southeast Asia stretch.',
    dates: { firstVisit: '2024-12-20', lastVisit: '2025-01-22' },
    highlights: [
      'Full Moon Party',
      'Muay Thai Training',
      'Chiang Dao',
      'Pai',
      'Koh Tao',
    ],
  },
  Laos: {
    name: 'Laos',
    slug: 'laos',
    flag: 'LA-flag.jpg',
    region: 'Southeast Asia',
    description:
      'Slow boat, Nong Khiaw, Vang Vieng, farm volunteering, and the Thakhek motorbike loop.',
    dates: { firstVisit: '2025-01-22', lastVisit: '2025-02-15' },
    highlights: [
      'Slow Boat',
      'Luang Prabang',
      'Nong Khiaw',
      'Baci Ceremony',
      'Vang Vieng',
    ],
  },
  Cambodia: {
    name: 'Cambodia',
    slug: 'cambodia',
    flag: 'CB-flag.jpg',
    region: 'Southeast Asia',
    description:
      'Angkor Wat, Koh Rong, Kampot, Phnom Penh, and the heavier history under the backpacker route.',
    dates: { firstVisit: '2025-02-15', lastVisit: '2025-03-01' },
    highlights: ['Angkor Wat', 'Siem Reap', 'Phnom Penh', 'Killing Fields'],
  },
  China: {
    name: 'China',
    slug: 'china',
    flag: 'CH-flag.jpg',
    region: 'East Asia',
    description:
      'Chengdu pandas, Sichuan food, Zhangjiajie, tea houses, and big-city China.',
    dates: { firstVisit: '2025-03-01', lastVisit: '2025-03-15' },
    highlights: ['Great Wall', 'Beijing', 'Shanghai'],
  },
  Vietnam: {
    name: 'Vietnam',
    slug: 'vietnam',
    flag: 'VM-flag.jpg',
    region: 'Southeast Asia',
    description:
      'A 4,000 km motorbike run through Ha Giang, Cao Bang, rice fields, caves, and coastal roads.',
    dates: { firstVisit: '2025-03-15', lastVisit: '2025-04-15' },
    highlights: ['Hanoi', 'Ho Chi Minh City', 'Ha Long Bay', 'Hoi An'],
  },
  Singapore: {
    name: 'Singapore',
    slug: 'singapore',
    flag: 'SN-flag.jpg',
    region: 'Southeast Asia',
    description:
      'Singapore efficiency, hawker food, Little India, and the Dubai comparison.',
    dates: { firstVisit: '2025-04-15', lastVisit: '2025-04-20' },
    highlights: ['Marina Bay', 'Hawker Centers', 'Gardens by the Bay'],
  },
  Philippines: {
    name: 'Philippines',
    slug: 'philippines',
    flag: 'RP-flag.jpg',
    region: 'Southeast Asia',
    description:
      'Siargao surfing, El Nido boats, Port Barton, Cebu waterfalls, and the honest Philippines critique.',
    dates: { firstVisit: '2025-04-20', lastVisit: '2025-05-20' },
    highlights: ['Palawan', 'Cebu', 'Siargao', 'Island Hopping'],
  },
  Indonesia: {
    name: 'Indonesia',
    slug: 'indonesia',
    flag: 'ID-flag.jpg',
    region: 'Southeast Asia',
    description:
      'Bali, Uluwatu, Komodo, manta rays, whale sharks, and the business-from-a-laptop question.',
    dates: { firstVisit: '2025-05-20', lastVisit: '2025-06-20' },
    highlights: ['Bali', 'Komodo', 'Yogyakarta', 'Raja Ampat'],
  },
  Japan: {
    name: 'Japan',
    slug: 'japan',
    flag: 'JA-flag.jpg',
    region: 'East Asia',
    description:
      'Hokkaido, onsens, Sapporo, Japanese food, and a slower post-Asia reflection period.',
    dates: { firstVisit: '2025-06-20', lastVisit: '2025-07-20' },
    highlights: ['Tokyo', 'Kyoto', 'Osaka', 'Mount Fuji'],
  },
  'Costa Rica': {
    name: 'Costa Rica',
    slug: 'costa-rica',
    flag: 'CR-flag.jpg',
    region: 'Central America',
    description:
      'Puerto Viejo, Nosara, Santa Teresa, surf-town scoring, and building from Costa Rica.',
    dates: { firstVisit: '2025-08-01', lastVisit: '2025-09-01' },
    highlights: ['Manuel Antonio', 'Monteverde', 'Surf Towns'],
  },
  Panama: {
    name: 'Panama',
    slug: 'panama',
    flag: 'PM-flag.jpg',
    region: 'Central America',
    description:
      'Bocas del Toro, Panama City, canal-country infrastructure, and the Caribbean work stop.',
    dates: { firstVisit: '2025-09-01', lastVisit: '2025-10-01' },
    highlights: ['Panama City', 'San Blas Islands', 'Bocas del Toro'],
  },
  Guatemala: {
    name: 'Guatemala',
    slug: 'guatemala',
    flag: 'GT-flag.jpg',
    region: 'Central America',
    description:
      'Antigua, Lake Atitlan, El Paredon, Mayan cooking, temezcal, and volcano country.',
    dates: { firstVisit: '2025-10-01', lastVisit: '2025-11-15' },
    highlights: ['Antigua', 'Lake Atitlan', 'Tikal', 'Semuc Champey'],
  },
  'El Salvador': {
    name: 'El Salvador',
    slug: 'el-salvador',
    flag: 'SV-flag.jpg',
    region: 'Central America',
    description:
      'El Tunco, Bitcoin Beach, pupusas, clean roads, and the strongest early surf-town score.',
    dates: { firstVisit: '2025-11-15' },
    highlights: ['El Tunco', 'Bitcoin Beach', 'Surf Culture', 'Pupusas'],
  },
  Netherlands: {
    name: 'Netherlands',
    slug: 'netherlands',
    flag: 'NL-flag.svg',
    region: 'Western Europe',
    description:
      'Rotterdam base, Netherlands flag on the map, and the start of the Euro summer chapter.',
    dates: { firstVisit: '2026-05-12' },
    highlights: ['Rotterdam', 'Euro Summer', 'Dutch Design', 'Cycling Culture'],
  },
  Belgium: {
    name: 'Belgium',
    slug: 'belgium',
    flag: 'BE-flag.svg',
    region: 'Western Europe',
    description:
      'Ghent base, Belgium flag on the map, canal streets, and a Euro summer stop.',
    dates: { firstVisit: '2026-05-16' },
    highlights: [
      'Ghent',
      'Euro Summer',
      'Canal Streets',
      'Flemish Architecture',
    ],
  },
  Portugal: {
    name: 'Portugal',
    slug: 'portugal',
    flag: 'PT-flag.svg',
    region: 'Western Europe',
    description:
      'Ericeira base, Portugal flag on the map, Atlantic surf, and a defining Euro summer stop.',
    dates: { firstVisit: '2026-05-25' },
    highlights: [
      'Ericeira',
      'Atlantic Surf',
      'Euro Summer',
      'Portuguese Coast',
    ],
  },
  Italy: {
    name: 'Italy',
    slug: 'italy',
    flag: 'italy-flag.jpg',
    region: 'Southern Europe',
    description:
      'Rome layover, the Colosseum, Trevi Fountain, and a brief first taste of Italy.',
    dates: { firstVisit: '2024-09-23' },
    highlights: ['Rome', 'Colosseum', 'Trevi Fountain', 'Italian Food'],
  },
  Switzerland: {
    name: 'Switzerland',
    slug: 'switzerland',
    flag: 'switzerland-flag.svg',
    region: 'Central Europe',
    description:
      'Interlaken base, Swiss Alps, mountain routes, and the current Euro summer stop.',
    dates: { firstVisit: '2026-08-01' },
    highlights: ['Swiss Alps', 'Mountain Towns', 'Euro Summer'],
  },
}

// Helper to get all countries as array
export const getAllCountries = (): CountryInfo[] => Object.values(countriesData)

// Helper to get country by slug
export const getCountryBySlug = (slug: string): CountryInfo | undefined =>
  Object.values(countriesData).find((c) => c.slug === slug)

// Helper to get country by name
export const getCountryByName = (name: string): CountryInfo | undefined =>
  countriesData[name]

// Helper to slugify country name
export const slugifyCountry = (name: string): string =>
  name.toLowerCase().replace(/\s+/g, '-')

// Extract country from location string (e.g., "Nong Khiaw, Laos" -> "Laos")
export const extractCountryFromLocation = (location: string): string | null => {
  const parts = location.split(',').map((s) => s.trim())
  const countryPart = parts[parts.length - 1]

  // Check if it's a valid country
  if (countriesData[countryPart]) {
    return countryPart
  }

  // Handle special cases
  const aliases: Record<string, string> = {
    'United Arab Emirates': 'UAE',
  }

  return aliases[countryPart] || null
}
