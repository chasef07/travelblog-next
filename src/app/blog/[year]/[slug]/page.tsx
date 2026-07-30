import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays } from 'lucide-react'

import { MonthOverview } from '@/components/travel-os/MonthOverview'
import { PostReader } from '@/components/travel-os/PostReader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  getArchiveForPost,
  parseBlogDate,
  resolvePublication,
  staticPublicationParams,
} from '@/content/blog/publication'
import {
  generateArticleJsonLd,
  generateBreadcrumbJsonLd,
  generatePageMetadata,
  siteConfig,
} from '@/lib/seo'

export async function generateStaticParams() {
  return staticPublicationParams()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string; slug: string }>
}) {
  const { year, slug } = await params
  const outcome = resolvePublication(year, slug)

  if (outcome.kind === 'post') {
    const { post } = outcome
    return generatePageMetadata({
      title: post.title,
      description: post.excerpt,
      path: post.url,
      images: post.images.map((image) => image.src),
      type: 'article',
      publishedTime: parseBlogDate(post.date).toISOString(),
      modifiedTime: parseBlogDate(post.date).toISOString(),
      keywords: [
        `${post.location} travel`,
        `${post.country} travel journal`,
        'solo travel stories',
        'travel photography',
      ],
    })
  }

  if (outcome.kind === 'archive' || outcome.kind === 'empty-archive') {
    return generatePageMetadata({
      title: `${outcome.archive.displayDate} Travel Journal`,
      description: outcome.archive.excerpt,
      path: outcome.archive.url,
      images: [outcome.archive.image],
      type: 'article',
    })
  }

  return { title: 'Journal entry not found | Chase Fagen' }
}

export default async function JournalPage({
  params,
}: {
  params: Promise<{ year: string; slug: string }>
}) {
  const { year, slug } = await params
  const outcome = resolvePublication(year, slug)

  if (outcome.kind === 'missing') notFound()

  if (outcome.kind === 'archive') {
    return <MonthOverview archive={outcome.archive} posts={outcome.posts} />
  }

  if (outcome.kind === 'empty-archive') {
    return (
      <main className="mx-auto flex min-h-[calc(100svh-3rem)] max-w-3xl flex-col justify-center px-5 py-16 sm:px-8">
        <Badge variant="outline" className="mb-6 w-fit">
          <CalendarDays />
          {outcome.archive.displayDate}
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          No entries yet
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          This month is on the timeline, but its first post has not been
          published.
        </p>
        <Button asChild variant="outline" className="mt-8 w-fit">
          <Link href="/">
            <ArrowLeft data-icon="inline-start" />
            Return to Today
          </Link>
        </Button>
      </main>
    )
  }

  const archive = getArchiveForPost(outcome.post)
  if (!archive) notFound()

  const monthOutcome = resolvePublication(String(archive.year), archive.slug)
  if (monthOutcome.kind !== 'archive') notFound()

  const articleJsonLd = generateArticleJsonLd(outcome.post)
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Today', url: siteConfig.url },
    {
      name: archive.displayDate,
      url: `${siteConfig.url}${archive.url}`,
    },
    {
      name: outcome.post.title,
      url: `${siteConfig.url}${outcome.post.url}`,
    },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <MonthOverview
        archive={monthOutcome.archive}
        posts={monthOutcome.posts}
      />
      <PostReader monthHref={archive.url} post={outcome.post} />
    </>
  )
}
