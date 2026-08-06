import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'Chase Fagen Blog',
  description: 'Travel stories and notes from Chase Fagen.',
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
