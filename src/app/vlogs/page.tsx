import dynamic from 'next/dynamic'
import SectionTitle from '@/components/SectionTitle'

const VlogGrid = dynamic(() => import('@/components/VlogGrid'), {
  loading: () => <div className="text-center py-12 text-muted-foreground">Loading video content...</div>
})

export const metadata = {
  title: 'Travel Vlogs - Adventures Around the World - Lone Horizons',
  description: 'Watch my travel vlogs documenting adventures across Thailand, Nepal, Tanzania, Georgia, and Israel. Raw, authentic travel experiences.',
}

export default function Page(){
  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <SectionTitle>Travel Vlogs</SectionTitle>
          <p className="mt-6 text-lg text-[var(--muted-text-color)] max-w-3xl mx-auto leading-relaxed">
            Join me on video adventures around the world. From party scenes in Thailand to cultural immersion with the Hadza tribe in Tanzania, 
            these vlogs capture the raw, authentic experiences of solo travel.
          </p>
        </div>
        
        <VlogGrid />
      </div>
    </main>
  )
}
