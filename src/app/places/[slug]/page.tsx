import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight, MapPin } from 'lucide-react'
import {
  getPlaceBySlug,
  getRelatedPostsForPlace,
  placesData,
} from '@/content/places-data'
import { generatePageMetadata, generateBreadcrumbJsonLd } from '@/lib/seo'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return placesData.map((place) => ({ slug: place.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const place = getPlaceBySlug(slug)

  if (!place) {
    return { title: 'Place Not Found' }
  }

  return generatePageMetadata({
    title: place.name,
    description: place.longVerdict,
    path: `/places/${place.slug}`,
    images: [place.image],
    keywords: [
      place.name,
      `${place.name} surf town`,
      `${place.name} remote work`,
      `${place.country} surf base`,
    ],
  })
}

export default async function PlacePage({ params }: Props) {
  const { slug } = await params
  const place = getPlaceBySlug(slug)

  if (!place) {
    notFound()
  }

  const relatedPosts = getRelatedPostsForPlace(place)
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: 'https://chasefagen.com' },
    { name: 'Maps', url: 'https://chasefagen.com/maps' },
    { name: place.name, url: `https://chasefagen.com/places/${place.slug}` },
  ])

  return (
    <main className="min-h-screen app-surface pt-20 sm:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <nav className="mb-6 sm:mb-8">
          <Link
            href="/maps"
            className="text-[var(--ui-text-subtle)] hover:text-[var(--ui-accent)] text-sm font-mono tracking-wider uppercase transition-colors"
          >
            Maps
          </Link>
          <span className="mx-2 text-[var(--ui-text-subtle)]">/</span>
          <span className="text-[var(--ui-text-muted)] text-sm font-mono tracking-wider uppercase">
            {place.name}
          </span>
        </nav>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <span className="mb-4 block font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--ui-accent)]">
              [ Place Dossier ]
            </span>
            <h1 className="font-editorial-display text-4xl tracking-tight text-[var(--ui-text-primary)] sm:text-5xl md:text-6xl">
              {place.name}
            </h1>
            <p className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
              <MapPin className="h-3.5 w-3.5" />
              {place.country} · {place.region}
            </p>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[var(--ui-text-secondary)]">
              {place.longVerdict}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {place.bestFor.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--ui-border-subtle)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-muted)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)]">
            <div className="relative aspect-[4/3]">
              <Image
                src={place.image}
                alt={place.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] md:grid-cols-5">
          <div className="bg-[var(--ui-bg-strong)] p-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
              Surf
            </span>
            <div className="mt-2 font-editorial text-4xl leading-none text-[var(--ui-accent)]">
              {place.scores.surf.toFixed(1)}
            </div>
          </div>
          <div className="bg-[var(--ui-bg-strong)] p-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
              Work
            </span>
            <div className="mt-2 font-editorial text-4xl leading-none text-[var(--ui-accent)]">
              {place.scores.workability.toFixed(1)}
            </div>
          </div>
          <div className="bg-[var(--ui-bg-strong)] p-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
              Walkability
            </span>
            <div className="mt-2 font-editorial text-4xl leading-none text-[var(--ui-accent)]">
              {place.scores.walkability.toFixed(1)}
            </div>
          </div>
          <div className="bg-[var(--ui-bg-strong)] p-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
              Beauty
            </span>
            <div className="mt-2 font-editorial text-4xl leading-none text-[var(--ui-accent)]">
              {place.scores.beauty.toFixed(1)}
            </div>
          </div>
          <div className="bg-[var(--ui-bg-strong)] p-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
              Value
            </span>
            <div className="mt-2 font-editorial text-4xl leading-none text-[var(--ui-accent)]">
              {place.scores.value.toFixed(1)}
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-2">
          <div>
            <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
              [ Why it wins ]
            </span>
            <div className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)]">
              {place.bestFor.map((item) => (
                <div
                  key={item}
                  className="bg-[var(--ui-bg-strong)] p-4 text-sm text-[var(--ui-text-secondary)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
              [ Why it fails ]
            </span>
            <div className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)]">
              {place.notFor.map((item) => (
                <div
                  key={item}
                  className="bg-[var(--ui-bg-strong)] p-4 text-sm text-[var(--ui-text-secondary)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-6">
            <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
              [ Practical Fit ]
            </span>
            <h2 className="text-3xl font-light text-[var(--ui-text-primary)]">
              Operational notes
            </h2>
          </div>

          <div className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] md:grid-cols-2">
            <div className="bg-[var(--ui-bg-strong)] p-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
                Ideal stay
              </span>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-secondary)]">
                {place.idealStay}
              </p>
            </div>
            <div className="bg-[var(--ui-bg-strong)] p-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
                Wave type
              </span>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-secondary)]">
                {place.waveType}
              </p>
            </div>
            <div className="bg-[var(--ui-bg-strong)] p-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
                Board level
              </span>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-secondary)]">
                {place.boardLevel}
              </p>
            </div>
            <div className="bg-[var(--ui-bg-strong)] p-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
                Town density
              </span>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-secondary)]">
                {place.townDensity}
              </p>
            </div>
            <div className="bg-[var(--ui-bg-strong)] p-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
                Internet
              </span>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-secondary)]">
                {place.internetNote}
              </p>
            </div>
            <div className="bg-[var(--ui-bg-strong)] p-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
                Cost note
              </span>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-secondary)]">
                {place.costNote}
              </p>
            </div>
            <div className="bg-[var(--ui-bg-strong)] p-5 md:col-span-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
                Seasonality
              </span>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-secondary)]">
                {place.seasonality}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                [ Related Dispatches ]
              </span>
              <h2 className="text-3xl font-light text-[var(--ui-text-primary)]">
                Why I think this
              </h2>
            </div>
            <Link
              href="/maps#surf-town-atlas"
              className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--ui-border-strong)] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--ui-text-primary)] transition-colors hover:border-[var(--ui-accent)] hover:text-[var(--ui-accent)]"
            >
              Back to surf atlas
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] md:grid-cols-2 xl:grid-cols-3">
            {relatedPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.year}/${post.slug}`}
                className="group bg-[var(--ui-bg-strong)] p-6 transition-colors hover:bg-[var(--ui-bg-soft)]"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <h3 className="mt-3 text-xl font-light text-[var(--ui-text-primary)] transition-colors group-hover:text-[var(--ui-accent)]">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-muted)]">
                  {post.excerpt}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)] transition-colors group-hover:text-[var(--ui-accent)]">
                  Read dispatch
                  <ArrowUpRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
