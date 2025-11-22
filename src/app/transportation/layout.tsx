import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'Transportation Guide - Getting Around',
  description: 'Comprehensive transportation ratings and practical tips for getting around in 14+ countries. Trains, buses, flights, and local transport guides.',
  path: '/transportation',
  keywords: ['travel transportation', 'getting around Asia', 'public transport guide', 'backpacker transport', 'budget travel transport']
})

export default function TransportationLayout({ children }: { children: React.ReactNode }) {
  return children
}
