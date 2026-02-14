import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'Travel Stories - Adventures Across 19 Countries',
  description: 'Read authentic travel stories, cultural insights, and practical tips from 20 countries across Asia, Africa, and Central America.',
  path: '/blog',
  keywords: ['travel blog', 'travel stories', 'travel guides', 'adventure blog', 'solo travel stories', 'backpacking blog']
})

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
