import dynamic from 'next/dynamic'
import { GridSkeleton } from '@/components/ui/skeleton'

const VlogGrid = dynamic(() => import('@/components/VlogGrid'), {
  loading: () => (
    <div className="space-y-12">
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
          label="Video Stories"
          title="Travel Vlogs"
          description="Raw, authentic experiences from 19 countries. Party scenes to cultural immersion."
        />
        <VlogGrid />
      </div>
    </main>
  )
}
