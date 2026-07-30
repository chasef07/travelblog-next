import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, Clock, MapPin } from 'lucide-react'

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
import { getAllCountries, getCountryBySlug } from '@/content/countries-data'
import { foodData } from '@/content/food-data'
import {
  getArchivesForCountry,
  getPostCardImage,
  getPostsForCountry,
  parseBlogDate,
} from '@/content/blog/publication'
import { generatePageMetadata } from '@/lib/seo'

type Props = {
  params: Promise<{ country: string }>
}

export async function generateStaticParams() {
  return getAllCountries().map((country) => ({ country: country.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { country: slug } = await params
  const country = getCountryBySlug(slug)

  if (!country) return { title: 'Country not found' }

  return generatePageMetadata({
    title: `${country.name} Travel Journal`,
    description: country.description,
    path: `/countries/${country.slug}`,
    keywords: [country.name, `${country.name} travel journal`],
  })
}

function postDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parseBlogDate(date))
}

export default async function CountryPage({ params }: Props) {
  const { country: slug } = await params
  const country = getCountryBySlug(slug)
  if (!country) notFound()

  const posts = getPostsForCountry(country.name)
  const archives = getArchivesForCountry(country.name)
  const dishes = foodData[country.name] ?? []

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-10 sm:px-8 sm:py-14">
      <header className="flex flex-col gap-6">
        <Button asChild variant="ghost" size="sm" className="w-fit">
          <Link href="/world">
            <ArrowLeft data-icon="inline-start" />
            World
          </Link>
        </Button>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
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
          <div>
            <Badge variant="secondary">{country.region}</Badge>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">
              {country.name}
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
              {country.description}
            </p>
          </div>
        </div>

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
        <div>
          <h2 className="text-2xl font-semibold">Entries</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Open any story in the month reader.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden py-0">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={getPostCardImage(post)}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <CardHeader>
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
                <CardContent />
                <CardFooter className="pb-6">
                  <Button asChild variant="outline" size="sm">
                    <Link href={post.url}>
                      Read
                      <ArrowUpRight data-icon="inline-end" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
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
        <Card>
          <CardHeader>
            <CardTitle>Food from {country.name}</CardTitle>
            <CardDescription>
              {dishes.length} saved {dishes.length === 1 ? 'dish' : 'dishes'}.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild variant="outline">
              <Link href="/food">
                Open food
                <ArrowUpRight data-icon="inline-end" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </main>
  )
}
