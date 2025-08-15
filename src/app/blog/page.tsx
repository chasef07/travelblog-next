import Image from 'next/image'
import Link from 'next/link'
import { blogIndex } from '@/content/blogIndex'
import { generatePageMetadata } from '@/lib/seo'

export const metadata = generatePageMetadata({
  title: 'Travel Blog - Adventures Around the World',
  description: 'Follow Chase Fagen\'s travel adventures across 15+ countries. Read stories from Southeast Asia, Africa, Eastern Europe, and the Middle East with photos and travel tips.',
  path: '/blog',
  keywords: ['travel blog', 'world travel stories', 'solo travel blog', 'Asia travel', 'Africa travel', 'travel experiences', 'travel photography', 'backpacking stories'],
  images: ['/assets/images/blog/featured-blog.jpg']
})

export default async function Page({ searchParams }: { searchParams: Promise<{ tag?: string }> }){
  await searchParams; // Keep for future use
  const list = blogIndex;
  return (
    <main className="max-w-[1200px] mx-auto p-6">
      <article itemScope itemType="https://schema.org/Blog">
        <header className="mb-8">
          <h1 itemProp="name" className="text-3xl font-semibold text-[var(--primary-color)] mb-4">
            Travel Blog - Adventures Around the World
          </h1>
          <p itemProp="description" className="text-lg text-[var(--muted-text-color)] max-w-3xl">
            Journey with me across 15+ countries and discover the stories, cultures, and experiences that shape our world. 
            From Southeast Asian temples to African safaris, each post captures the essence of global adventure.
          </p>
        </header>
        
        <section aria-label="Travel blog posts" className="grid gap-6" style={{gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))'}}>
          {list.map(b=> (
            <article key={b.title} itemScope itemType="https://schema.org/BlogPosting" className="block bg-[var(--surface-color)] rounded-xl overflow-hidden shadow-sm ring-1 ring-[color-mix(in_oklab,black_10%,transparent)] hover:shadow-md transition">
              <Link href={`/blog/${b.year}/${b.slug}`} className="block">
                <div className="relative w-full h-[200px]">
                  <Image 
                    src={b.image} 
                    alt={`${b.title} - Travel blog post featuring adventure stories`}
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                    className="object-cover"
                    itemProp="image"
                  />
                </div>
                <div className="p-5">
                  <time dateTime={b.date} itemProp="datePublished" className="text-sm text-[var(--muted-text-color)] mb-2 block">
                    {b.displayDate}
                  </time>
                  <h2 itemProp="headline" className="text-lg font-semibold text-[var(--primary-color)] mb-2 hover:text-[var(--secondary-color)] transition-colors">
                    {b.title}
                  </h2>
                  <p itemProp="description" className="text-sm text-[var(--muted-text-color)]">
                    {b.excerpt}
                  </p>
                  <div itemProp="author" itemScope itemType="https://schema.org/Person" className="hidden">
                    <span itemProp="name">Chase Fagen</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </section>
      </article>
    </main>
  )
}
