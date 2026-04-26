import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getAllCountries, getCountryBySlug } from '@/content/countries-data'
import { foodData } from '@/content/food-data'
import {
  getArchivesForCountry,
  getPostCardImage,
  getPostsForCountry,
} from '@/content/blog-registry'
import { getPlacesByCountry } from '@/content/places-data'
import { generatePageMetadata } from '@/lib/seo'
import { ArrowUpRight, Clock, MapPin } from 'lucide-react'

interface Props {
  params: Promise<{ country: string }>
}

export async function generateStaticParams() {
  const countries = getAllCountries()
  return countries.map((c) => ({ country: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: slug } = await params
  const countryInfo = getCountryBySlug(slug)

  if (!countryInfo) {
    return { title: 'Country Not Found' }
  }

  return generatePageMetadata({
    title: `${countryInfo.name} Travel Guide | Lifestyle Engineering`,
    description: countryInfo.description,
    path: `/countries/${countryInfo.slug}`,
    images: [],
    keywords: [
      countryInfo.name,
      `${countryInfo.name} travel`,
      `${countryInfo.name} blog`,
    ],
  })
}

export default async function CountryPage({ params }: Props) {
  const { country: slug } = await params
  const countryInfo = getCountryBySlug(slug)

  if (!countryInfo) {
    notFound()
  }

  // Get food data for this country
  const countryFood = foodData[countryInfo.name] || []
  const countryPosts = getPostsForCountry(countryInfo.name)
  const countryArchives = getArchivesForCountry(countryInfo.name)
  const countryPlaces = getPlacesByCountry(countryInfo.name)

  return (
    <main className="min-h-screen app-surface">
      {/* Hero Section */}
      <section className="relative border-b border-[var(--ui-border-subtle)] pb-12 pt-20 sm:pb-16 sm:pt-24">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--ui-accent-soft),transparent_45%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.05))]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-6 sm:mb-8">
            <Link
              href="/countries"
              className="text-[var(--ui-text-subtle)] hover:text-[var(--ui-accent)] text-sm font-mono tracking-wider uppercase transition-colors"
            >
              Countries
            </Link>
            <span className="text-[var(--ui-text-subtle)] mx-2">/</span>
            <span className="text-[var(--ui-text-muted)] text-sm font-mono tracking-wider uppercase">
              {countryInfo.name}
            </span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
            <div>
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="relative h-11 w-16 overflow-hidden rounded-md border border-[var(--ui-border-subtle)] shadow-lg sm:h-14 sm:w-20">
                  <Image
                    src={`/assets/images/flags/${countryInfo.flag}`}
                    alt={`${countryInfo.name} flag`}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 640px) 64px, 80px"
                  />
                </div>
                <div>
                  <span className="text-xs font-mono tracking-wider text-[var(--ui-accent)] uppercase block mb-2">
                    {countryInfo.region}
                  </span>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-editorial-display font-light text-[var(--ui-text-primary)]">
                    {countryInfo.name}
                  </h1>
                </div>
              </div>

              <p className="mt-6 sm:mt-8 max-w-3xl text-base sm:text-xl text-[var(--ui-text-muted)] leading-relaxed">
                {countryInfo.description}
              </p>

              {countryInfo.highlights && countryInfo.highlights.length > 0 && (
                <div className="mt-7 sm:mt-8 flex flex-wrap gap-2">
                  {countryInfo.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full border border-[var(--ui-border-subtle)] px-3 py-1 text-[11px] sm:text-xs font-mono tracking-wider text-[var(--ui-text-muted)]"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              )}

              {countryInfo.dates && (
                <div className="mt-5 sm:mt-6 text-xs sm:text-sm text-[var(--ui-text-subtle)] font-mono">
                  Visited:{' '}
                  {new Date(countryInfo.dates.firstVisit).toLocaleDateString(
                    'en-US',
                    { month: 'long', year: 'numeric' },
                  )}
                  {countryInfo.dates.lastVisit &&
                    ` - ${new Date(countryInfo.dates.lastVisit).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`}
                </div>
              )}
            </div>

            <div className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] sm:grid-cols-3 lg:grid-cols-1">
              <div className="bg-[var(--ui-bg-strong)] p-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ui-text-subtle)]">
                  Stories
                </span>
                <div className="mt-2 text-4xl font-extralight text-[var(--ui-text-primary)]">
                  {countryPosts.length}
                </div>
                <p className="mt-1 text-sm text-[var(--ui-text-muted)]">
                  Published posts
                </p>
              </div>
              <div className="bg-[var(--ui-bg-strong)] p-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ui-text-subtle)]">
                  Months
                </span>
                <div className="mt-2 text-4xl font-extralight text-[var(--ui-text-primary)]">
                  {countryArchives.length}
                </div>
                <p className="mt-1 text-sm text-[var(--ui-text-muted)]">
                  Archive sections
                </p>
              </div>
              <div className="bg-[var(--ui-bg-strong)] p-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ui-text-subtle)]">
                  Food
                </span>
                <div className="mt-2 text-4xl font-extralight text-[var(--ui-text-primary)]">
                  {countryFood.length}
                </div>
                <p className="mt-1 text-sm text-[var(--ui-text-muted)]">
                  Saved dishes
                </p>
              </div>
            </div>
          </div>

          {countryArchives.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {countryArchives.map((archive) => (
                <Link
                  key={`${archive.year}-${archive.slug}`}
                  href={`/blog/${archive.year}/${archive.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] font-mono text-[var(--ui-text-muted)] transition-colors hover:border-[var(--ui-border-strong)] hover:text-[var(--ui-accent)]"
                >
                  {archive.displayDate}
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Content Navigation */}
      <section className="sticky top-14 z-40 border-b border-[var(--ui-border-subtle)] bg-[var(--ui-header-bg)] backdrop-blur-sm sm:top-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="no-scrollbar flex gap-6 overflow-x-auto py-3.5 sm:gap-8 sm:py-4">
            <a
              href="#stories"
              className="shrink-0 text-xs sm:text-sm font-mono tracking-wider text-[var(--ui-text-muted)] hover:text-[var(--ui-accent)] transition-colors uppercase"
            >
              Stories ({countryPosts.length})
            </a>
            {countryPlaces.length > 0 && (
              <a
                href="#places"
                className="shrink-0 text-xs sm:text-sm font-mono tracking-wider text-[var(--ui-text-muted)] hover:text-[var(--ui-accent)] transition-colors uppercase"
              >
                Places ({countryPlaces.length})
              </a>
            )}
            {countryFood.length > 0 && (
              <a
                href="#food"
                className="shrink-0 text-xs sm:text-sm font-mono tracking-wider text-[var(--ui-text-muted)] hover:text-[var(--ui-accent)] transition-colors uppercase"
              >
                Food ({countryFood.length})
              </a>
            )}
          </div>
        </div>
      </section>

      {countryPlaces.length > 0 && (
        <section
          id="places"
          className="border-t border-[var(--ui-border-subtle)] py-12 sm:py-16"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="mb-8 text-2xl font-light text-[var(--ui-text-primary)]">
              Key places in {countryInfo.name}
            </h2>
            <div className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] md:grid-cols-2 xl:grid-cols-3">
              {countryPlaces.map((place) => (
                <article
                  key={place.id}
                  className="bg-[var(--ui-bg-strong)] p-5"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
                    {place.region}
                  </span>
                  <h3 className="mt-2 text-xl font-light text-[var(--ui-text-primary)]">
                    {place.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-muted)]">
                    {place.shortVerdict}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {place.bestFor.slice(0, 3).map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[var(--ui-border-subtle)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-muted)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-dashed border-[var(--ui-border-subtle)] pt-4">
                    <span className="font-editorial text-3xl leading-none text-[var(--ui-accent)]">
                      {place.scores.surf.toFixed(1)}
                    </span>
                    <Link
                      href={`/maps#surf-town-atlas`}
                      className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)] transition-colors hover:text-[var(--ui-accent)]"
                    >
                      Surf atlas
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stories Section */}
      <section id="stories" className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-2xl font-light text-[var(--ui-text-primary)] mb-8">
            Stories from {countryInfo.name}
          </h2>

          {countryPosts.length > 0 ? (
            <>
              <div className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] md:grid-cols-2 xl:grid-cols-3">
                {countryPosts.map((post, index) => (
                  <article
                    key={post.id}
                    className="group bg-[var(--ui-bg-strong)] transition-colors hover:bg-[var(--ui-bg-soft)]"
                  >
                    <Link
                      href={`/blog/${post.year}/${post.slug}`}
                      className="block h-full"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={getPostCardImage(post)}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          priority={index < 3}
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>

                      <div className="space-y-4 p-5 sm:p-6">
                        <div className="flex flex-wrap items-center gap-3 text-[var(--ui-text-subtle)]">
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                            {new Date(post.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.18em]">
                            <MapPin className="h-3 w-3" />
                            {post.location}
                          </span>
                          {post.readingTime && (
                            <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.18em]">
                              <Clock className="h-3 w-3" />
                              {post.readingTime} min
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-light text-[var(--ui-text-primary)] transition-colors duration-100 group-hover:text-[var(--ui-accent)]">
                          {post.title}
                        </h3>

                        <p className="text-sm leading-relaxed text-[var(--ui-text-muted)] line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center gap-2 pt-1 text-[var(--ui-text-subtle)] transition-colors group-hover:text-[var(--ui-accent)]">
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                            Read
                          </span>
                          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--ui-border-strong)] px-5 py-2.5 text-[var(--ui-text-primary)] transition-colors hover:bg-[var(--ui-accent)] hover:text-[var(--ui-on-accent)]"
                >
                  <span className="font-mono text-xs uppercase tracking-wider">
                    Browse all stories
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </>
          ) : (
            <p className="text-[var(--ui-text-muted)] mb-8">
              No published stories are attached to this country yet. Browse the{' '}
              <Link
                href="/blog"
                className="text-[var(--ui-accent)] hover:underline"
              >
                blog page
              </Link>{' '}
              for the latest entries.
            </p>
          )}
        </div>
      </section>

      {/* Food Section */}
      {countryFood.length > 0 && (
        <section
          id="food"
          className="border-t border-[var(--ui-border-subtle)] py-12 sm:py-16"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="text-2xl font-light text-[var(--ui-text-primary)] mb-8">
              Food in {countryInfo.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {countryFood.map((item, index) => (
                <div
                  key={index}
                  className="bg-[var(--ui-bg-soft)] rounded-lg overflow-hidden group border border-[var(--ui-border-subtle)]"
                >
                  {item.image && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-light text-[var(--ui-text-primary)] mb-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-[var(--ui-text-muted)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Countries */}
      <section className="border-t border-[var(--ui-border-subtle)] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <Link
            href="/countries"
            className="inline-flex items-center gap-2 text-[var(--ui-text-subtle)] hover:text-[var(--ui-accent)] transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="text-sm font-mono tracking-wider uppercase">
              Back to all countries
            </span>
          </Link>
        </div>
      </section>
    </main>
  )
}
