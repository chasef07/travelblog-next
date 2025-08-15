import dynamic from 'next/dynamic'
import SectionTitle from '@/components/SectionTitle'
import { generatePageMetadata } from '@/lib/seo'

const BlogGrid = dynamic(() => import('@/components/BlogGrid').then(mod => ({ default: mod.BlogGrid })), {
  loading: () => (
    <div className="text-center py-12">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[var(--primary-color)] border-r-transparent"></div>
      <p className="mt-4 text-[var(--muted-text-color)]">Loading travel stories...</p>
    </div>
  )
})

export const metadata = generatePageMetadata({
  title: 'Travel Blog - Adventures Around the World',
  description: 'Follow Chase Fagen\'s travel adventures across 15+ countries. Read stories from Southeast Asia, Africa, Eastern Europe, and the Middle East with photos and travel tips.',
  path: '/blog',
  keywords: ['travel blog', 'world travel stories', 'solo travel blog', 'Asia travel', 'Africa travel', 'travel experiences', 'travel photography', 'backpacking stories'],
  images: ['/assets/images/blog/featured-blog.jpg']
})

export default async function Page({ searchParams }: { searchParams: Promise<{ tag?: string }> }){
  await searchParams; // Keep for future use
  
  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <article itemScope itemType="https://schema.org/Blog">
          <header className="text-center mb-16">
            <h1 itemProp="headline">
              <SectionTitle>Adventures Around the World</SectionTitle>
            </h1>
            <p itemProp="description" className="mt-6 text-lg text-[var(--muted-text-color)] max-w-4xl mx-auto leading-relaxed">
              Journey with me across 15+ countries and discover the stories, cultures, and experiences that shape our world. 
              From Southeast Asian temples to African safaris, each post captures the essence of global adventure.
            </p>
          </header>
          
          <section aria-label="Travel blog posts">
            <BlogGrid />
          </section>
        </article>
      </div>
    </main>
  )
}
