import { loadBlogPost } from '@/utils/blog-loader'
import { blogMetadata } from '@/content/blog-data'
import BlogPost from '@/components/BlogPost'
import Link from 'next/link'
import Image from 'next/image'
import { generatePageMetadata, generateArticleJsonLd } from '@/lib/seo'
import { ArrowLeft, ArrowUpRight, MapPin, Clock } from 'lucide-react'

export async function generateMetadata({ params }:{ params: Promise<{ year: string; slug: string }> }){
  const { year, slug } = await params;
  const post = await loadBlogPost(year, slug)
  const metadata = blogMetadata.find(b=> b.link === `/blog/${year}/${slug}`)

  if (post) {
    const images = post.images?.map(img => img.src) || [metadata?.image].filter(Boolean) as string[]
    const keywords = [
      'solo travel blog',
      `${post.location} travel guide`,
      `${post.location} solo travel`,
      `${post.location} travel tips`,
      'authentic travel experiences',
      'cultural immersion travel',
      'backpacking stories',
      'travel photography',
      slug.replace(/-/g, ' '),
      `${post.location} adventure`,
      'budget travel tips'
    ]

    return generatePageMetadata({
      title: post.title,
      description: post.excerpt,
      path: `/blog/${year}/${slug}`,
      images,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: new Date(post.date).toISOString(),
      keywords
    })
  }

  return generatePageMetadata({
    title: metadata?.title || 'Travel Blog Post - Living Gambit',
    description: metadata?.excerpt || 'Discover amazing travel adventures and cultural insights from around the world.',
    path: `/blog/${year}/${slug}`,
    images: metadata?.image ? [metadata.image] : [],
    type: 'article'
  })
}

export default async function Page({ params }: { params: Promise<{ year: string; slug: string }> }){
  const { year, slug } = await params

  // Try to load a specific blog post first
  const post = await loadBlogPost(year, slug)

  if (post) {
    const articleJsonLd = generateArticleJsonLd(post)

    return (
      <main className="min-h-screen bg-black pt-24">
        {/* JSON-LD structured data for article */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />

        <div className="max-w-4xl mx-auto px-6">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/60 transition-colors mb-12 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs uppercase tracking-wider font-mono">Back to Stories</span>
          </Link>

          {/* Article header with schema markup */}
          <article itemScope itemType="https://schema.org/BlogPosting">
            <header className="mb-12 border-b border-white/10 pb-12">
              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-white/40 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span itemProp="locationCreated" itemScope itemType="https://schema.org/Place">
                    <span itemProp="name" className="font-mono text-xs tracking-wider uppercase">{post.location}</span>
                  </span>
                </div>

                <time dateTime={post.date} itemProp="datePublished" className="font-mono text-xs tracking-wider uppercase">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>

                {post.readingTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="font-mono text-xs tracking-wider uppercase">{post.readingTime} min read</span>
                  </div>
                )}

                <div itemProp="author" itemScope itemType="https://schema.org/Person" className="hidden">
                  <span itemProp="name">Chase Fagen</span>
                </div>

                <div itemProp="publisher" itemScope itemType="https://schema.org/Organization" className="hidden">
                  <span itemProp="name">Living Gambit</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-tight text-white leading-tight" itemProp="headline">
                {post.title}
              </h1>
            </header>

            <div itemProp="articleBody">
              <BlogPost post={post} />
            </div>
          </article>
        </div>

        {/* More Adventures Section */}
        <section className="max-w-4xl mx-auto px-6 py-16 mt-12 border-t border-white/10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase block mb-2">
                [ Continue Reading ]
              </span>
              <h2 className="text-2xl font-extralight text-white">More Adventures</h2>
            </div>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-white/40 hover:text-white/60 transition-colors"
            >
              <span className="text-xs uppercase tracking-wider">View All</span>
              <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10">
            {blogMetadata.slice(0, 4).map((relatedPost) => (
              <Link
                key={relatedPost.link}
                href={relatedPost.link}
                className="group block bg-black p-6 hover:bg-white/5 transition-colors"
              >
                <span className="font-mono text-xs tracking-wider text-white/30 uppercase block mb-3">
                  {new Date(relatedPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <h3 className="font-light text-white group-hover:text-white/80 mb-2 line-clamp-2 transition-colors">
                  {relatedPost.title}
                </h3>
                <p className="text-sm text-white/40 line-clamp-2">
                  {relatedPost.excerpt}
                </p>
                <div className="flex items-center gap-2 text-white/30 group-hover:text-white/50 transition-all duration-300 mt-4">
                  <span className="text-xs uppercase tracking-wider">Read</span>
                  <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    )
  }

  // If no specific post found, try to load all posts for the month/slug
  const { loadBlogPosts } = await import('@/utils/blog-loader')
  const posts = await loadBlogPosts(year, slug)

  if (posts.length > 0) {
    return (
      <main className="min-h-screen bg-black pt-24">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/60 transition-colors mb-12 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs uppercase tracking-wider font-mono">Back to Stories</span>
          </Link>

          <header className="mb-16">
            <span className="font-mono text-sm tracking-[0.2em] text-white/40 uppercase block mb-4">
              [ {slug.charAt(0).toUpperCase() + slug.slice(1)} {year} ]
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-white">
              Travel Stories
            </h1>
            <p className="text-white/50 text-lg mt-6 max-w-2xl">
              Adventures and reflections from {slug.charAt(0).toUpperCase() + slug.slice(1)} {year}
            </p>
          </header>

          <div className="space-y-24">
            {posts.map((blogPost) => (
              <article key={blogPost.id} className="border-b border-white/10 pb-24 last:border-b-0">
                <header className="mb-8">
                  <div className="flex flex-wrap items-center gap-6 text-sm text-white/40 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="font-mono text-xs tracking-wider uppercase">{blogPost.location}</span>
                    </div>
                    <time dateTime={blogPost.date} className="font-mono text-xs tracking-wider uppercase">
                      {new Date(blogPost.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    {blogPost.readingTime && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span className="font-mono text-xs tracking-wider uppercase">{blogPost.readingTime} min read</span>
                      </div>
                    )}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extralight text-white leading-tight">
                    {blogPost.title}
                  </h2>
                </header>

                <div className="prose prose-lg max-w-none">
                  <div className="text-white/70 whitespace-pre-wrap leading-relaxed font-light">
                    {blogPost.content}
                  </div>
                </div>

                {blogPost.images && blogPost.images.length > 0 && (
                  <div className="grid gap-8 my-12">
                    {blogPost.images.map((image, index) => (
                      <figure key={index} className="relative group">
                        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[4/3] overflow-hidden border border-white/10">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 800px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                        {image.caption && (
                          <figcaption className="text-sm text-white/40 text-center mt-4 font-mono tracking-wider">
                            {image.caption}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </main>
    )
  }

  // No content found at all
  return (
    <main className="min-h-screen bg-black pt-24">
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <span className="font-mono text-sm tracking-[0.2em] text-white/40 uppercase block mb-4">
          [ 404 ]
        </span>
        <h1 className="text-4xl font-extralight text-white mb-6">Post Not Found</h1>
        <p className="text-lg text-white/50 mb-12">
          The blog post you&apos;re looking for doesn&apos;t exist or hasn&apos;t been published yet.
        </p>
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-white font-medium border border-white/80 rounded-full px-6 py-3 hover:bg-white hover:text-black transition-all duration-200"
        >
          <span className="uppercase text-sm tracking-wider">View All Stories</span>
          <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </main>
  )
}
