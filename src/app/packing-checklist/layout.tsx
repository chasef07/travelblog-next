import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'Packing list',
  description: 'The practical packing list Chase uses for long-term travel.',
  path: '/packing-checklist',
  keywords: ['packing list', 'travel essentials'],
})

export default function PackingChecklistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
