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
    <main className="min-h-screen pt-24" style={{ background: 'linear-gradient(160deg, #1a1714 0%, #2a2520 100%)' }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
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
