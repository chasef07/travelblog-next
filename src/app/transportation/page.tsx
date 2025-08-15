import dynamic from 'next/dynamic'
import SectionTitle from '@/components/SectionTitle'

const TransportationGrid = dynamic(() => import('@/components/TransportationGrid'), {
  loading: () => <div className="text-center py-12 text-muted-foreground">Loading transportation guides...</div>
})

export const metadata = {
  title: 'Transportation Guide - Getting Around the World - Lone Horizons',
  description: 'Comprehensive transportation guide with ratings and practical tips for 14+ countries. From high-speed trains in China to motorbike taxis in Rwanda.',
}

export default function Page(){
  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <SectionTitle>Transportation Around the World</SectionTitle>
          <p className="mt-6 text-lg text-[var(--muted-text-color)] max-w-4xl mx-auto leading-relaxed">
            Getting around efficiently is crucial for any traveler. Here&apos;s my comprehensive rating system and practical guide 
            for transportation in 14+ countries I&apos;ve visited, complete with costs, languages, and insider tips.
          </p>
        </div>
        
        <TransportationGrid />
      </div>
    </main>
  )
}
