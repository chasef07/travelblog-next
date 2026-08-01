import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react'

import { DetailLink } from '@/components/travel-os/DetailLink'
import {
  MonthGallery,
  type MonthGalleryItem,
} from '@/components/travel-os/MonthGallery'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import type { BlogArchive, PublishedPost } from '@/content/blog/publication'
import { parseBlogDate } from '@/content/blog/publication'
import { getCountryFlag } from '@/lib/journal'

function shortDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(parseBlogDate(date))
}

export function MonthOverview({
  archive,
  posts,
}: {
  archive: BlogArchive
  posts: PublishedPost[]
}) {
  const countries = [
    ...new Map(
      posts.map((post) => [post.country, getCountryFlag(post.country)]),
    ).entries(),
  ]
  const galleryItems = [
    ...new Map(
      posts.flatMap((post): [string, MonthGalleryItem][] => {
        const image = post.images[0]
        if (!image) return []

        return [
          [
            image.src,
            {
              src: image.src,
              alt: image.alt,
              label: post.title,
              meta: `${shortDate(post.date)} · ${post.location}`,
            },
          ],
        ]
      }),
    ).values(),
  ].slice(0, 8)

  if (galleryItems.length === 0) {
    galleryItems.push({
      src: archive.image,
      alt: `${archive.displayDate} cover`,
      label: archive.displayDate,
      meta: `${posts.length} entries`,
    })
  }

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-10 sm:px-8 sm:py-14">
      <header className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">
            <CalendarDays />
            {posts.length} entries
          </Badge>
          {countries.map(([country, flag]) => (
            <Badge key={country} variant="outline">
              <span aria-hidden="true">{flag}</span>
              {country}
            </Badge>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              {archive.displayDate}
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              {archive.excerpt}
            </p>
          </div>
          <MonthGallery
            key={archive.url}
            items={galleryItems}
            title={archive.displayDate}
          />
        </div>
      </header>

      <Separator />

      <section
        aria-labelledby="entries-heading"
        className="flex flex-col gap-5"
      >
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 id="entries-heading" className="text-2xl font-semibold">
            Entries
          </h2>
          <p className="text-xs text-muted-foreground">
            {posts.length} posts · newest first
          </p>
        </div>

        <ol className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <li key={post.id} className="h-full min-w-0">
              <DetailLink
                detailId={post.id}
                href={post.url}
                className="group flex h-full min-h-28 flex-col justify-between gap-4 rounded-lg border bg-background p-4 outline-none transition-colors hover:bg-accent/40 focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
                  <time dateTime={post.date} className="shrink-0">
                    {shortDate(post.date)}
                  </time>
                  <span className="inline-flex min-w-0 items-center gap-1">
                    <MapPin className="size-3 shrink-0" />
                    <span className="truncate">{post.location}</span>
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="font-heading text-sm font-semibold tracking-wider uppercase">
                    {post.title}
                  </span>
                  <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </DetailLink>
            </li>
          ))}
        </ol>
      </section>
    </main>
  )
}
