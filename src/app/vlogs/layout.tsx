import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'Vlogs',
  description: 'Travel videos from Chase Fagen’s journey.',
  path: '/vlogs',
  keywords: ['travel vlogs', 'travel videos'],
})

export default function VlogsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
