import dynamic from 'next/dynamic'
import { GridSkeleton, FilterSkeleton } from '@/components/ui/skeleton'

const BlogGrid = dynamic(() => import('@/components/BlogGrid').then(mod => ({ default: mod.BlogGrid })), {
  loading: () => (
    <div className="space-y-12">
      <FilterSkeleton count={3} />
      <GridSkeleton count={6} columns="md:grid-cols-2 lg:grid-cols-3" />
    </div>
  )
})

import { SectionHeader } from '@/components/SectionHeader'

export default function Page() {
  return (
    <main className="min-h-screen app-surface pt-20 sm:pt-24">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <SectionHeader
          label="Travel Stories"
          title="Adventures"
          description="Real experiences from 20 countries. Cultural insights, practical tips, and authentic stories."
        />
        <BlogGrid />
      </div>
    </main>
  )
}
