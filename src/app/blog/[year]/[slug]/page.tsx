import { loadBlogPost } from '@/utils/blog-loader'
import { blogMetadata } from '@/content/blog-data'
import BlogPost from '@/components/BlogPost'
import Breadcrumb, { generateBlogBreadcrumbs } from '@/components/Breadcrumb'
import Link from 'next/link'
import Image from 'next/image'
import { generatePageMetadata, generateArticleJsonLd, generateBreadcrumbJsonLd, siteConfig } from '@/lib/seo'
import { ArrowUpRight, MapPin, Clock } from 'lucide-react'

// Import all blog posts for static generation
import { september2024Posts } from '@/content/blog-posts/2024-september'
import { october2024Posts } from '@/content/blog-posts/2024-october'
import { november2024Posts } from '@/content/blog-posts/2024-november'
import { december2024Posts } from '@/content/blog-posts/2024-december'
import { january2025Posts } from '@/content/blog-posts/2025-january'
import { february2025Posts } from '@/content/blog-posts/2025-february'
import { march2025Posts } from '@/content/blog-posts/2025-march'
import { april2025Posts } from '@/content/blog-posts/2025-april'
import { may2025Posts } from '@/content/blog-posts/2025-may'
import { june2025Posts } from '@/content/blog-posts/2025-june'
import { july2025Posts } from '@/content/blog-posts/2025-july'
import { august2025Posts } from '@/content/blog-posts/2025-august'
import { october2025Posts } from '@/content/blog-posts/2025-october'
import { november2025Posts } from '@/content/blog-posts/2025-november'
import { december2025Posts } from '@/content/blog-posts/2025-december'
import { january2026Posts } from '@/content/blog-posts/2026-january'
import { february2026Posts } from '@/content/blog-posts/2026-february'

// Combine all individual blog posts
const allBlogPosts = [
  ...september2024Posts,
  ...october2024Posts,
  ...november2024Posts,
  ...december2024Posts,
  ...january2025Posts,
  ...february2025Posts,
  ...march2025Posts,
  ...april2025Posts,
  ...may2025Posts,
  ...june2025Posts,
  ...july2025Posts,
  ...august2025Posts,
  ...october2025Posts,
  ...november2025Posts,
  ...december2025Posts,
  ...january2026Posts,
  ...february2026Posts,
]

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
  // Monthly archive pages
  const monthlyParams = blogMetadata.map((post) => {
    const pathParts = post.link.split('/')
    return {
      year: pathParts[2],
      slug: pathParts[3],
    }
  })

  // Individual blog post pages
  const postParams = allBlogPosts.map((post) => ({
    year: post.year,
    slug: post.slug,
  }))

  return [...monthlyParams, ...postParams]
}

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
    title: metadata?.title || 'Travel Blog Post - Lifestyle Engineering',
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
    const breadcrumbJsonLd = generateBreadcrumbJsonLd([
      { name: 'Home', url: siteConfig.url },
      { name: 'Stories', url: `${siteConfig.url}/blog` },
      { name: post.location, url: `${siteConfig.url}/blog` },
      { name: post.title, url: `${siteConfig.url}/blog/${year}/${slug}` }
    ])

    return (
      <main className="min-h-screen app-surface pt-20 pb-24 sm:pt-24 sm:pb-0">
        {/* JSON-LD structured data for article */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        {/* JSON-LD breadcrumb navigation */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Breadcrumb navigation */}
          <Breadcrumb
            items={generateBlogBreadcrumbs(year, slug, post.title)}
            className="mb-8 sm:mb-12"
          />

          {/* Article header with schema markup */}
          <article itemScope itemType="https://schema.org/BlogPosting">
            <header className="mb-10 border-b border-[var(--ui-border-subtle)] pb-8 sm:mb-12 sm:pb-12">
              {/* Meta info */}
              <div className="mb-5 flex flex-col items-start gap-3 text-sm text-[var(--ui-text-subtle)] sm:mb-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
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
                  <span itemProp="name">Lifestyle Engineering</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight tracking-tight text-[var(--ui-text-primary)] leading-tight" itemProp="headline">
                {post.title}
              </h1>
            </header>

            <div itemProp="articleBody">
              <BlogPost post={post} />
            </div>
          </article>
        </div>

        {/* More Adventures Section */}
        <section className="mx-auto mt-10 max-w-4xl border-t border-[var(--ui-border-subtle)] px-4 py-12 sm:mt-12 sm:px-6 sm:py-16">
          <div className="mb-7 flex flex-col items-start gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="font-mono text-xs tracking-[0.2em] text-[var(--ui-text-subtle)] uppercase block mb-2">
                [ Continue Reading ]
              </span>
              <h2 className="text-2xl font-extralight text-[var(--ui-text-primary)]">More Adventures</h2>
            </div>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 rounded-full border border-[var(--ui-border-subtle)] px-4 py-2 text-[var(--ui-text-subtle)] transition-colors hover:border-[var(--ui-border-strong)] hover:text-[var(--ui-accent)]"
            >
              <span className="text-xs uppercase tracking-wider">View All</span>
              <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-[var(--ui-border-subtle)] border border-[var(--ui-border-subtle)]">
            {blogMetadata.slice(0, 4).map((relatedPost) => (
              <Link
                key={relatedPost.link}
                href={relatedPost.link}
                className="group block bg-[var(--ui-bg-strong)] p-5 transition-colors hover:bg-[var(--ui-bg-soft)] sm:p-6"
              >
                <span className="font-mono text-xs tracking-wider text-[var(--ui-text-subtle)] uppercase block mb-3">
                  {new Date(relatedPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <h3 className="font-light text-[var(--ui-text-primary)] group-hover:text-[var(--ui-accent)] mb-2 line-clamp-2 transition-colors">
                  {relatedPost.title}
                </h3>
                <p className="text-sm text-[var(--ui-text-muted)] line-clamp-2">
                  {relatedPost.excerpt}
                </p>
                <div className="flex items-center gap-2 text-[var(--ui-text-subtle)] group-hover:text-[var(--ui-accent)] transition-all duration-300 mt-4">
                  <span className="text-xs uppercase tracking-wider">Read</span>
                  <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <Link
          href="/blog"
          className="fixed bottom-4 left-4 right-4 z-40 inline-flex items-center justify-center gap-2 rounded-full border border-[var(--ui-border-strong)] bg-[var(--ui-bg-strong)] px-5 py-3 text-[var(--ui-text-primary)] shadow-lg backdrop-blur-sm transition-colors hover:text-[var(--ui-accent)] sm:hidden"
        >
          <span className="font-mono text-xs uppercase tracking-wider">Browse all stories</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </main>
    )
  }

  // If no specific post found, try to load all posts for the month/slug
  const { loadBlogPosts } = await import('@/utils/blog-loader')
  const posts = await loadBlogPosts(year, slug)
  const monthMetadata = blogMetadata.find((entry) => entry.link === `/blog/${year}/${slug}`)

  if (posts.length > 0) {
    return (
      <main className="min-h-screen app-surface pt-20 sm:pt-24">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
          {/* Breadcrumb navigation */}
          <Breadcrumb
            items={[
              { name: 'Blog', href: '/blog' },
              { name: `${slug.charAt(0).toUpperCase() + slug.slice(1)} ${year}`, href: `/blog/${year}/${slug}` }
            ]}
            className="mb-8 sm:mb-12"
          />

          <header className="mb-10 sm:mb-16">
            <span className="font-mono text-sm tracking-[0.2em] text-[var(--ui-accent)] uppercase block mb-4">
              [ {slug.charAt(0).toUpperCase() + slug.slice(1)} {year} ]
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-[var(--ui-text-primary)]">
              Travel Stories
            </h1>
            <p className="mt-4 max-w-2xl text-base text-[var(--ui-text-muted)] sm:mt-6 sm:text-lg">
              Adventures and reflections from {slug.charAt(0).toUpperCase() + slug.slice(1)} {year}
            </p>
          </header>

          <div className="space-y-16 sm:space-y-24">
            {posts.map((blogPost) => (
              <article key={blogPost.id} className="border-b border-[var(--ui-border-subtle)] pb-16 last:border-b-0 sm:pb-24">
                <header className="mb-8">
                  <div className="mb-4 flex flex-col items-start gap-3 text-sm text-[var(--ui-text-subtle)] sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
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
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-extralight text-[var(--ui-text-primary)] leading-tight">
                    {blogPost.title}
                  </h2>
                </header>

                <div className="max-w-[68ch]">
                  <div className="whitespace-pre-wrap break-words text-[var(--ui-text-muted)] font-light text-[clamp(1rem,2.8vw,1.14rem)] leading-8 sm:leading-9">
                    {blogPost.content}
                  </div>
                </div>

                {blogPost.images && blogPost.images.length > 0 && (
                  <div className="my-10 grid gap-6 sm:my-12 sm:gap-8">
                    {blogPost.images.map((image, index) => (
                      <figure key={index} className="relative group">
                        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[4/3] overflow-hidden border border-[var(--ui-border-subtle)]">
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
                          <figcaption className="mt-4 text-center font-mono text-xs tracking-wider text-[var(--ui-text-subtle)] sm:text-sm">
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

  if (monthMetadata) {
    return (
      <main className="min-h-screen app-surface pt-20 sm:pt-24">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
          <Breadcrumb
            items={[
              { name: 'Blog', href: '/blog' },
              { name: `${slug.charAt(0).toUpperCase() + slug.slice(1)} ${year}`, href: `/blog/${year}/${slug}` }
            ]}
            className="mb-8 sm:mb-12"
          />

          <header className="mb-10 sm:mb-14">
            <span className="font-mono text-sm tracking-[0.2em] text-[var(--ui-accent)] uppercase block mb-4">
              [ {slug.charAt(0).toUpperCase() + slug.slice(1)} {year} ]
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-[var(--ui-text-primary)]">
              Travel Stories
            </h1>
            <p className="mt-4 max-w-2xl text-base text-[var(--ui-text-muted)] sm:mt-6 sm:text-lg">
              {monthMetadata.excerpt}
            </p>
          </header>

          <section className="rounded-2xl border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-soft)] p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-light text-[var(--ui-text-primary)]">First Post Coming Soon</h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--ui-text-secondary)] leading-relaxed">
              This month section is live. Add your first February 2026 entry and it will appear here automatically.
            </p>
            <Link
              href="/blog"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--ui-border-strong)] px-5 py-2.5 text-[var(--ui-text-primary)] transition-colors hover:bg-[var(--ui-accent)] hover:text-[var(--ui-on-accent)]"
            >
              <span className="font-mono text-xs uppercase tracking-wider">Back to all stories</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </section>
        </div>
      </main>
    )
  }

  // No content found at all
  return (
    <main className="min-h-screen app-surface pt-20 sm:pt-24">
      <div className="mx-auto max-w-4xl px-4 py-10 text-center sm:px-6 sm:py-12">
        <span className="font-mono text-sm tracking-[0.2em] text-[var(--ui-text-subtle)] uppercase block mb-4">
          [ 404 ]
        </span>
        <h1 className="mb-6 text-3xl font-extralight text-[var(--ui-text-primary)] sm:text-4xl">Post Not Found</h1>
        <p className="mb-12 text-base text-[var(--ui-text-muted)] sm:text-lg">
          The blog post you&apos;re looking for doesn&apos;t exist or hasn&apos;t been published yet.
        </p>
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-[var(--ui-text-primary)] font-medium border border-[var(--ui-border-strong)] rounded-full px-6 py-3 hover:bg-[var(--ui-accent)] hover:text-[var(--ui-on-accent)] transition-all duration-200"
        >
          <span className="uppercase text-xs tracking-wider sm:text-sm">View All Stories</span>
          <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </main>
  )
}
