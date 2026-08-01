import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Clock, MapPin } from 'lucide-react'

import { DetailLink } from '@/components/travel-os/DetailLink'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { CountryInfo } from '@/content/countries-data'
import { foodData } from '@/content/food-data'
import {
  getArchivesForCountry,
  getPostCardImage,
  getPostCardImagePosition,
  getPostsForCountry,
  parseBlogDate,
} from '@/content/blog/publication'

function postDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parseBlogDate(date))
}

export function CountryDossier({ country }: { country: CountryInfo }) {
  const posts = getPostsForCountry(country.name)
  const archives = getArchivesForCountry(country.name)
  const dishes = foodData[country.name] ?? []

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-10 sm:px-8 sm:py-14">
      <header className="flex flex-col gap-6">
        <Button asChild variant="ghost" size="sm" className="w-fit">
          <Link href="/world">
            <ArrowLeft data-icon="inline-start" />
            World
          </Link>
        </Button>

        <div className="flex items-center gap-4">
          <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-md border bg-white">
            <Image
              src={`/assets/images/flags/${country.flag}`}
              alt={`${country.name} flag`}
              fill
              priority
              className="object-contain p-1"
              sizes="64px"
            />
          </div>
          <h1
            data-detail-title
            tabIndex={-1}
            className="text-4xl font-semibold tracking-tight outline-none sm:text-6xl"
          >
            {country.name}
          </h1>
        </div>

        <p className="max-w-3xl text-lg text-muted-foreground">
          {country.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {country.highlights?.map((highlight) => (
            <Badge key={highlight} variant="outline">
              {highlight}
            </Badge>
          ))}
        </div>
      </header>

      <Separator />

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          ['Entries', posts.length],
          ['Months', archives.length],
          ['Dishes', dishes.length],
        ].map(([label, value]) => (
          <Card key={label}>
            <CardHeader>
              <CardDescription>{label}</CardDescription>
              <CardTitle className="text-3xl">{value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </section>

      {archives.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Months</h2>
          <div className="flex flex-wrap gap-2">
            {archives.map((archive) => (
              <Button key={archive.url} asChild variant="outline" size="sm">
                <Link href={archive.url}>{archive.displayDate}</Link>
              </Button>
            ))}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-5">
        <h2 className="text-2xl font-semibold">Entries</h2>

        {posts.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {posts.map((post) => (
              <DetailLink
                key={post.id}
                detailId={post.id}
                href={post.url}
                className="group block h-full rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Card className="h-full overflow-hidden py-0 transition-colors group-hover:bg-accent/40">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={getPostCardImage(post)}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      style={{
                        objectPosition: getPostCardImagePosition(post),
                      }}
                    />
                  </div>
                  <CardHeader className="pb-6">
                    <div className="mb-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span>{postDate(post.date)}</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3" />
                        {post.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3" />
                        {post.readingTime} min
                      </span>
                    </div>
                    <CardTitle className="leading-snug">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </DetailLink>
            ))}
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>No entries yet</CardTitle>
              <CardDescription>
                This country is mapped, but no journal posts are attached.
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </section>

      {dishes.length > 0 && (
        <Link
          href="/food"
          className="group block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Card className="transition-colors group-hover:bg-accent/40">
            <CardHeader>
              <CardTitle>Food from {country.name}</CardTitle>
              <CardDescription>
                {dishes.length} saved {dishes.length === 1 ? 'dish' : 'dishes'}.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      )}
    </div>
  )
}
