import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'Local Flavors - Culinary Adventures',
  description: 'Discover authentic local cuisines from 19 countries. Street food guides, restaurant recommendations, and cultural eating experiences from Asia, Africa, and Central America.',
  path: '/food',
  keywords: ['food travel', 'local cuisine', 'street food', 'restaurant recommendations', 'Asian food', 'African cuisine', 'travel food guide']
})

export default function FoodLayout({ children }: { children: React.ReactNode }) {
  return children
}
