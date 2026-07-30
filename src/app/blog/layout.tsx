import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'Travel stories',
  description:
    'Read Chase Fagen’s travel journal chronologically by year and month.',
  path: '/blog',
  keywords: ['travel journal', 'travel stories'],
})

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
