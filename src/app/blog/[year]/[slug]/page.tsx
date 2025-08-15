import { loadBlogPost } from '@/utils/blog-loader'
import { blogMetadata } from '@/content/blog-data'
import BlogPost from '@/components/BlogPost'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumb, { generateBlogBreadcrumbs } from '@/components/Breadcrumb'
import { generatePageMetadata, generateArticleJsonLd } from '@/lib/seo'

export async function generateMetadata({ params }:{ params: Promise<{ year: string; slug: string }> }){
  const { year, slug } = await params;
  const post = await loadBlogPost(year, slug)
  const metadata = blogMetadata.find(b=> b.link === `/blog/${year}/${slug}`)
  
  if (post) {
    const images = post.images?.map(img => img.src) || [metadata?.image].filter(Boolean) as string[]
    const keywords = [
      'travel blog',
      post.location,
      `${post.location} travel`,
      'travel guide',
      year,
      slug.replace('-', ' ')
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
    title: metadata?.title || 'Travel Blog Post - Lone Horizons',
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
    const breadcrumbItems = generateBlogBreadcrumbs(year, slug, post.title)
    const articleJsonLd = generateArticleJsonLd(post)
    
    return (
      <main className="min-h-screen pt-8">
        {/* JSON-LD structured data for article */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        
        <div className="max-w-4xl mx-auto px-6">
          {/* Breadcrumb navigation */}
          <Breadcrumb items={breadcrumbItems} className="mb-6" />
          
          {/* Article header with schema markup */}
          <article itemScope itemType="https://schema.org/BlogPosting">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-[var(--primary-color)] mb-4" itemProp="headline">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted-text-color)]">
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
                  </svg>
                  <span itemProp="locationCreated" itemScope itemType="https://schema.org/Place">
                    <span itemProp="name">{post.location}</span>
                  </span>
                </div>
                
                <time dateTime={post.date} itemProp="datePublished">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                
                {post.readingTime && (
                  <span>{post.readingTime} min read</span>
                )}
                
                <div itemProp="author" itemScope itemType="https://schema.org/Person" className="hidden">
                  <span itemProp="name">Chase Fagen</span>
                </div>
                
                <div itemProp="publisher" itemScope itemType="https://schema.org/Organization" className="hidden">
                  <span itemProp="name">Lone Horizons</span>
                </div>
              </div>
            </header>
            
            <div itemProp="articleBody">
              <BlogPost post={post} />
            </div>
          </article>
        </div>
        
        <section className="max-w-4xl mx-auto px-6 py-8 border-t border-[var(--border-color)]">
          <h2 className="text-2xl font-semibold text-[var(--primary-color)] mb-6">More Adventures</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {blogMetadata.slice(0, 4).map((relatedPost) => (
              <Link
                key={relatedPost.link}
                href={relatedPost.link}
                className="group block bg-[var(--surface-color)] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-4">
                  <h3 className="font-semibold text-[var(--primary-color)] group-hover:text-[var(--secondary-color)] mb-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-[var(--muted-text-color)] line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
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
      <main className="min-h-screen pt-8">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-[var(--primary-color)] mb-4">
              {slug.charAt(0).toUpperCase() + slug.slice(1)} {year}
            </h1>
            <p className="text-lg text-[var(--muted-text-color)]">
              Travel adventures and stories from {slug.charAt(0).toUpperCase() + slug.slice(1)} {year}
            </p>
          </header>

          <div className="space-y-12">
            {posts.map((blogPost) => (
              <article key={blogPost.id} className="border-b border-[var(--border-color)] pb-8 last:border-b-0">
                <header className="mb-6">
                  <div className="flex items-center gap-2 text-sm text-[var(--muted-text-color)] mb-4">
                    <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
                    </svg>
                    <span>{blogPost.location}</span>
                    <span>•</span>
                    <time dateTime={blogPost.date}>
                      {new Date(blogPost.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    {blogPost.readingTime && (
                      <>
                        <span>•</span>
                        <span>{blogPost.readingTime} min read</span>
                      </>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--primary-color)] leading-tight">
                    {blogPost.title}
                  </h2>
                </header>

                <div className="prose prose-lg max-w-none mb-6">
                  <div className="text-[var(--text-color)] whitespace-pre-wrap leading-relaxed">
                    {blogPost.content}
                  </div>
                </div>

                {blogPost.images && blogPost.images.length > 0 && (
                  <div className="grid gap-6">
                    {blogPost.images.map((image, index) => (
                      <figure key={index} className="relative">
                        <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-md">
                          <Image 
                            src={image.src} 
                            alt={image.alt} 
                            fill
                            sizes="(max-width: 768px) 100vw, 800px"
                            className="object-cover"
                            loading="lazy"
                          />
                        </div>
                        {image.caption && (
                          <figcaption className="text-sm text-[var(--muted-text-color)] text-center mt-2 italic">
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
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[var(--primary-color)] mb-4">Post Not Found</h1>
        <p className="text-lg text-[var(--muted-text-color)] mb-8">
          The blog post you&apos;re looking for doesn&apos;t exist or hasn&apos;t been published yet.
        </p>
        <Link 
          href="/blog" 
          className="inline-block bg-[var(--secondary-color)] text-white px-6 py-3 rounded-lg hover:bg-[var(--primary-color)] transition-colors"
        >
          View All Posts
        </Link>
      </div>
    </main>
  )
}
