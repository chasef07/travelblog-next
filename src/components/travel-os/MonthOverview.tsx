import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, CalendarDays, Clock, MapPin } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              {archive.displayDate}
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              {archive.excerpt}
            </p>
          </div>
          <div className="relative aspect-[5/2] overflow-hidden rounded-lg border bg-muted lg:aspect-[16/10]">
            <Image
              src={archive.image}
              alt={`${archive.displayDate} cover`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 320px"
              className={
                archive.imageFit === 'contain'
                  ? 'object-contain'
                  : 'object-cover'
              }
              style={{ objectPosition: archive.imagePosition ?? 'center' }}
            />
          </div>
        </div>
      </header>

      <Separator />

      <section
        aria-labelledby="entries-heading"
        className="flex flex-col gap-5"
      >
        <div>
          <h2 id="entries-heading" className="text-2xl font-semibold">
            Entries
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose an entry to open it beside this month.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden py-0">
              {post.images[0] && (
                <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                  <Image
                    src={post.images[0].src}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              )}
              <CardHeader className="px-5">
                <div className="mb-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span>{shortDate(post.date)}</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="size-3" />
                    {post.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3" />
                    {post.readingTime} min
                  </span>
                </div>
                <CardTitle className="text-lg leading-snug">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-5">
                <Badge variant="outline">
                  <span aria-hidden="true">{getCountryFlag(post.country)}</span>
                  {post.country}
                </Badge>
              </CardContent>
              <CardFooter className="px-5 pb-5">
                <Button asChild variant="outline" size="sm">
                  <Link href={post.url}>
                    Open
                    <ArrowUpRight data-icon="inline-end" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
