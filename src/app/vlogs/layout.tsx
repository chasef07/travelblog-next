import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'Travel Vlogs - Video Stories',
  description:
    'Watch raw, authentic travel videos from 20 countries. From party scenes to cultural immersion, experience the journey through video.',
  path: '/vlogs',
  keywords: [
    'travel vlogs',
    'travel videos',
    'backpacking videos',
    'Asia travel vlog',
    'Africa travel vlog',
    'solo travel videos',
  ],
})

export default function VlogsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
