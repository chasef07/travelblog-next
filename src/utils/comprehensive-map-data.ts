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
  posts?: BlogPost[]
}

// Your complete 16-country world tour journey
export const fullJourneyData: CountryData[] = [
  {
    name: 'Israel',
    coordinates: [31.7683, 35.2137],
    visitDate: 'September 2024',
    highlights: ['Jerusalem Old City', 'Tel Aviv Beach', 'Spiritual Connections', 'Ancient History'],
    blogPostsCount: 5,
    flagCode: 'IL',
    description: 'Where the journey began - connecting with roots and ancient history in the Holy Land.',
    color: '#3b82f6'
  },
  {
    name: 'Georgia',
    coordinates: [42.3154, 43.3569],
    visitDate: 'October 2024',
    highlights: ['Tbilisi Streets', 'Mountain Villages', 'Wine Country', 'Gudauri Mountains'],
    blogPostsCount: 4,
    flagCode: 'GE',
    description: 'Hidden gem in the Caucasus with incredible hospitality, wine culture, and stunning mountain landscapes.',
    color: '#8b5cf6'
  },
  {
    name: 'Kenya',
    coordinates: [-1.2921, 36.8219],
    visitDate: 'October 2024',
    highlights: ['Safari Adventures', 'Maasai Culture', 'Nairobi City', 'Wildlife Encounters'],
    blogPostsCount: 3,
    flagCode: 'KE',
    description: 'First taste of Africa - incredible wildlife, vibrant Maasai culture, and unforgettable safari experiences.',
    color: '#10b981'
  },
  {
    name: 'Tanzania',
    coordinates: [-6.3690, 34.8888],
    visitDate: 'November 2024',
    highlights: ['Serengeti Safari', 'Hunting Adventures', 'Mount Kilimanjaro', 'Hadza Tribe'],
    blogPostsCount: 6,
    flagCode: 'TZ',
    description: 'Epic safaris in the Serengeti and authentic cultural experiences with indigenous tribes.',
    color: '#f59e0b'
  },
  {
    name: 'Rwanda',
    coordinates: [-1.9403, 29.8739],
    visitDate: 'November 2024',
    highlights: ['Kigali Memorial', 'Coffee Culture', 'Lake Kivu', 'Genocide History'],
    blogPostsCount: 3,
    flagCode: 'RW',
    description: 'Land of a thousand hills with world-class coffee and profound historical significance.',
    color: '#ef4444'
  },
  {
    name: 'UAE',
    coordinates: [25.2048, 55.2708],
    visitDate: 'November 2024',
    highlights: ['Dubai Skyline', 'Desert Adventures', 'Modern Marvels', 'Luxury Culture'],
    blogPostsCount: 2,
    flagCode: 'AE',
    description: 'Where ancient Bedouin tradition meets futuristic innovation in spectacular fashion.',
    color: '#06b6d4'
  },
  {
    name: 'Nepal',
    coordinates: [27.7172, 85.3240],
    visitDate: 'December 2024',
    highlights: ['Annapurna Circuit', 'Kathmandu Temples', 'Himalayan Mountains', 'Spiritual Culture'],
    blogPostsCount: 8,
    flagCode: 'NP',
    description: 'The Himalayas and spiritual awakening in the mountains - favorite culture and transformative trekking.',
    color: '#8b5cf6'
  },
  {
    name: 'Thailand',
    coordinates: [15.8700, 100.9925],
    visitDate: 'January 2025',
    highlights: ['Full Moon Parties', 'Island Paradise', 'Thai Cuisine', 'Chiang Dao Mountains'],
    blogPostsCount: 7,
    flagCode: 'TH',
    description: 'The land of smiles with incredible food, pristine islands, and vibrant nightlife culture.',
    color: '#f59e0b'
  },
  {
    name: 'Laos',
    coordinates: [19.8563, 102.4955],
    visitDate: 'February 2025',
    highlights: ['Nong Khiaw Homestay', 'Thakhek Loop', 'Luang Prabang', 'Mekong River'],
    blogPostsCount: 5,
    flagCode: 'LA',
    description: 'Peaceful and authentic Southeast Asian experience with stunning nature and warm locals.',
    color: '#10b981'
  },
  {
    name: 'Cambodia',
    coordinates: [12.5657, 104.9910],
    visitDate: 'March 2025',
    highlights: ['Angkor Wat Temples', 'Koh Rong Beaches', 'Phnom Penh History', 'Island Paradise'],
    blogPostsCount: 8,
    flagCode: 'KH',
    description: 'Ancient temples of Angkor Wat, pristine beaches of Koh Rong, and resilient people with rich history.',
    color: '#ef4444'
  },
  {
    name: 'China',
    coordinates: [35.8617, 104.1954],
    visitDate: 'March 2025',
    highlights: ['Chengdu Pandas', 'Sichuan Cuisine', 'National Parks', 'Cultural Immersion'],
    blogPostsCount: 6,
    flagCode: 'CN',
    description: 'Ancient civilization meets modern innovation - from pandas in Chengdu to sacred Daoist mountains.',
    color: '#dc2626'
  },
  {
    name: 'Vietnam',
    coordinates: [14.0583, 108.2772],
    visitDate: 'April 2025',
    highlights: ['Motorbike Adventures', 'Ha Giang Loop', 'Street Food', 'Rice Terraces'],
    blogPostsCount: 4,
    flagCode: 'VN',
    description: 'Incredible motorbike adventures through terraced rice fields with amazing street food culture.',
    color: '#059669'
  },
  {
    name: 'Singapore',
    coordinates: [1.3521, 103.8198],
    visitDate: 'April 2025',
    highlights: ['Marina Bay', 'Hawker Centers', 'Gardens by the Bay', 'Modern Architecture'],
    blogPostsCount: 2,
    flagCode: 'SG',
    description: 'Modern city-state with incredible food scene and stunning futuristic architecture.',
    color: '#0ea5e9'
  },
  {
    name: 'Philippines',
    coordinates: [12.8797, 121.7740],
    visitDate: 'May 2025',
    highlights: ['Island Hopping', 'Canyoneering', 'Turquoise Waterfalls', 'Beach Paradise'],
    blogPostsCount: 6,
    flagCode: 'PH',
    description: 'Island paradise with crystal clear waters, epic surfing, and incredible diving adventures.',
    color: '#3b82f6'
  },
  {
    name: 'Indonesia',
    coordinates: [-0.7893, 113.9213],
    visitDate: 'June 2025',
    highlights: ['Bali Temples', 'Surfing Waves', 'Cultural Diversity', 'Island Adventures'],
    blogPostsCount: 5,
    flagCode: 'ID',
    description: 'Diverse archipelago with world-class surfing, ancient temples, and rich cultural heritage.',
    color: '#f59e0b'
  },
  {
    name: 'Japan',
    coordinates: [36.2048, 138.2529],
    visitDate: 'July 2025',
    highlights: ['Hokkaido Nature', 'Sushi Culture', 'Traditional Cuisine', 'Northern Beauty'],
    blogPostsCount: 4,
    flagCode: 'JP',
    description: 'Where ancient tradition meets cutting-edge culture - exploring the northern gem of Hokkaido.',
    color: '#ec4899'
  }
]

// Calculate journey stats
export const journeyStats = {
  totalCountries: fullJourneyData.length,
  totalBlogPosts: fullJourneyData.reduce((sum, country) => sum + country.blogPostsCount, 0),
  durationMonths: 11,
  continents: 4, // Asia, Africa, Europe, Middle East
  startDate: 'September 2024',
  endDate: 'August 2025'
}