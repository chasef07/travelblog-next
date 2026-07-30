import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, Globe2, MapPin } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { PublishedPost } from '@/content/blog/publication'
import { getPostCardImage, parseBlogDate } from '@/content/blog/publication'
import type { JournalEcho, JournalMonth } from '@/lib/journal'

function proximityLabel(offsetDays: number) {
  if (offsetDays === 0) return 'Same day'
  const days = Math.abs(offsetDays)
  return `${days} day${days === 1 ? '' : 's'} ${offsetDays < 0 ? 'before' : 'after'}`
}

function fullDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

function entryDate(post: PublishedPost) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parseBlogDate(post.date))
}

export function TodayView({
  today,
  echoes,
  latestMonth,
  latestPost,
}: {
  today: Date
  echoes: JournalEcho[]
  latestMonth: JournalMonth
  latestPost: PublishedPost
}) {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-12 px-5 py-10 sm:px-8 sm:py-14">
      <section className="flex flex-col gap-6">
        <Badge variant="secondary" className="w-fit">
          <CalendarDays />
          Today
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          {fullDate(today)}
        </h1>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href={latestMonth.href}>{latestMonth.displayDate}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/world">
              <Globe2 data-icon="inline-start" />
              World
            </Link>
          </Button>
        </div>
      </section>

      <Separator />

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Link
          href={latestPost.url}
          className="group block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Card className="h-full overflow-hidden py-0 transition-colors group-hover:bg-accent/40">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={getPostCardImage(latestPost)}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
            <CardHeader>
              <Badge variant="secondary" className="mb-2">
                Latest entry
              </Badge>
              <CardTitle className="text-2xl">{latestPost.title}</CardTitle>
              <CardDescription className="flex flex-wrap items-center gap-2">
                <MapPin className="size-4" />
                {latestPost.location} · {entryDate(latestPost)}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                {latestPost.excerpt}
              </p>
            </CardContent>
          </Card>
        </Link>

        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Around this date
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              The nearest entry from each year.
            </p>
          </div>
          {echoes.map((echo) => (
            <Link
              key={echo.year}
              href={echo.post.url}
              className="group block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Card className="h-full gap-4 py-5 transition-colors group-hover:bg-accent/40">
                <CardHeader className="px-5">
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <Badge variant="outline">{echo.year}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {proximityLabel(echo.offsetDays)}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2 text-base leading-snug">
                    {echo.post.title}
                  </CardTitle>
                  <CardDescription>
                    {echo.post.location} · {entryDate(echo.post)}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
