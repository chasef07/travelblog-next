import { Suspense } from 'react'
import SuccessContent from '@/components/maps/SuccessContent'
import { generatePageMetadata } from '@/lib/seo'

export const metadata = generatePageMetadata({
  title: 'Purchase Successful - Download Your Laos Travel Map',
  description: 'Thank you for your purchase! Download your curated Laos travel map and start exploring like a local.',
  path: '/maps/success'
})

export default function SuccessPage() {
  return (
    <main className="min-h-screen pt-20">
      <Suspense fallback={
        <div className="max-w-2xl mx-auto px-6 py-12 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your purchase details...</p>
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </main>
  )
}