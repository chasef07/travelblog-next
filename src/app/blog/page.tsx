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
    <main className="min-h-screen bg-black pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <SectionHeader
          label="Travel Stories"
          title="Adventures"
          description="Real experiences from 19 countries. Cultural insights, practical tips, and authentic stories."
        />
        <BlogGrid />
      </div>
    </main>
  )
}
