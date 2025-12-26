import dynamic from 'next/dynamic'
import { GridSkeleton, FilterSkeleton } from '@/components/ui/skeleton'

const FoodGrid = dynamic(() => import('@/components/FoodGrid'), {
  loading: () => (
    <div className="space-y-12">
      <FilterSkeleton count={5} />
      <GridSkeleton count={4} columns="md:grid-cols-2" />
    </div>
  )
})

import { SectionHeader } from '@/components/SectionHeader'

export default function Page() {
  return (
    <main className="min-h-screen bg-black pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <SectionHeader
          label="Culinary Adventures"
          title="Local Flavors"
          description="Each dish tells a story of culture and tradition. Authentic street food and local specialties."
        />
        <FoodGrid />
      </div>
    </main>
  )
}
