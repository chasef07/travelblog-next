import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'Food',
  description: 'Dishes Chase saved while traveling, organized by country.',
  path: '/food',
  keywords: ['travel food', 'local cuisine'],
})

export default function FoodLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
