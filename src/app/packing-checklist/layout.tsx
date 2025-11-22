import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'Packing Checklist - Travel Essentials',
  description: 'Complete packing list for long-term travel. Battle-tested gear recommendations for a year-long journey across 18 countries.',
  path: '/packing-checklist',
  keywords: ['packing list', 'travel packing', 'backpacking gear', 'travel essentials', 'minimalist packing', 'long term travel packing']
})

export default function PackingChecklistLayout({ children }: { children: React.ReactNode }) {
  return children
}
