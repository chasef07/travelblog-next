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
  title: 'Travel Stories & Cultural Adventures - Solo Travel Blog',
  description: 'Discover authentic travel stories from 16 countries across Asia, Africa & beyond. Real experiences, practical tips, and cultural insights from a year-long solo journey. Travel better, explore deeper.',
  path: '/blog',
  keywords: ['solo travel stories', 'Asia travel guide', 'Africa travel blog', 'cultural travel experiences', 'backpacking stories', 'travel tips', 'authentic travel blog', 'solo travel adventures', 'travel photography', 'cultural immersion'],
  images: ['/assets/images/misc/posttrip.jpg']
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
              Journey with me across 16 countries and discover authentic travel stories, practical tips, and cultural insights. 
              From Southeast Asian temples to African safaris, each post captures real experiences to help you travel better, cheaper, and smarter.
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
