import dynamic from 'next/dynamic'
import SectionTitle from '@/components/SectionTitle'

const EnhancedChecklistLayout = dynamic(() => import('@/components/EnhancedChecklistLayout'), {
  loading: () => <div className="text-center py-12 text-muted-foreground">Loading packing checklist...</div>
})

export const metadata = {
  title: 'Ultimate Packing Checklist - World Travel Essentials - Lone Horizons',
  description: 'Comprehensive packing checklist for world travel. Essential items, tech gear, and travel tips from a year-long adventure across 16 countries.',
}

export default function Page(){
  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <SectionTitle>Ultimate World Travel Packing Checklist</SectionTitle>
          <p className="mt-6 text-lg text-[var(--muted-text-color)] max-w-4xl mx-auto leading-relaxed">
            Everything you need for epic world travel. This comprehensive checklist is based on my year-long journey 
            through 16 countries with just a backpack and essential gear.
          </p>
        </div>
        
        <EnhancedChecklistLayout />
      </div>
    </main>
  )
}
