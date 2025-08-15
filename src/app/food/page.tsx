import dynamic from 'next/dynamic'
import SectionTitle from '@/components/SectionTitle'

const FoodGrid = dynamic(() => import('@/components/FoodGrid'), {
  loading: () => <div className="text-center py-12 text-muted-foreground">Loading food experiences...</div>
})

import { generatePageMetadata } from '@/lib/seo'

export const metadata = generatePageMetadata({
  title: 'Local Cuisines Around the World - Food Travel Guide',
  description: 'Discover authentic local dishes and street food from Chase\'s travels across 15+ countries. From Vietnamese pho to Georgian khachapuri, explore the world through food.',
  path: '/food',
  keywords: ['food travel', 'local cuisine', 'street food', 'Asian food', 'African cuisine', 'food guide', 'travel food blog', 'authentic dishes', 'food photography'],
  images: ['/assets/images/food/featured-food.jpg']
})

export default function Page(){
  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <article itemScope itemType="https://schema.org/WebPage">
          <header className="text-center mb-16">
            <h1 itemProp="headline">
              <SectionTitle>Flavors from Around the World</SectionTitle>
            </h1>
            <p itemProp="description" className="mt-6 text-lg text-[var(--muted-text-color)] max-w-3xl mx-auto leading-relaxed">
              Food is one of the greatest joys of travel. Each dish tells a story of culture, tradition, and local ingredients. 
              Here are some of the most memorable culinary experiences from my journey around the world, featuring authentic 
              street food, traditional recipes, and local specialties from Asia, Africa, and beyond.
            </p>
          </header>
          
          <section aria-label="Food experiences from travels">
            <FoodGrid />
          </section>
        </article>
      </div>
    </main>
  )
}
