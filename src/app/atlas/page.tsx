import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { generatePageMetadata } from '@/lib/seo'
import { atlasIntents, mapProducts } from '@/content/maps-data'
import { getPlacesForMap } from '@/content/places-data'

export const metadata = generatePageMetadata({
  title: 'Atlas',
  description:
    'Explore the atlas by intent: surf towns, adventure countries, wellness destinations, cafe + work spots, and long-stay travel intelligence.',
  path: '/atlas',
  images: mapProducts.map((product) => product.image),
  keywords: [
    'travel atlas',
    'travel intelligence',
    'long-stay travel',
    'surf town map',
    'adventure travel map',
    'wellness travel map',
  ],
})

export default function AtlasPage() {
  const productPreviews = mapProducts.map((product) => {
    const previewItems =
      product.featuredCountries ||
      getPlacesForMap(product.id)
        .slice(0, 3)
        .map((place) => place.name)

    return { product, previewItems }
  })

  return (
    <main className="min-h-screen app-surface pt-20 sm:pt-24">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <span className="mb-4 block font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--ui-accent)]">
              [ Atlas ]
            </span>
            <h1 className="font-editorial-display text-4xl tracking-tight text-[var(--ui-text-primary)] sm:text-5xl md:text-6xl">
              Explore by intent
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[var(--ui-text-secondary)]">
              The atlas is where lived experience turns into useful filters,
              rankings, and shortlists for people deciding where to go, stay,
              and build.
            </p>
          </div>

          <Link
            href="/journey"
            className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--ui-border-strong)] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--ui-text-primary)] transition-colors hover:border-[var(--ui-accent)] hover:text-[var(--ui-accent)]"
          >
            Follow the journey
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </header>

        <div className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] md:grid-cols-2 xl:grid-cols-4">
          {atlasIntents.map((intent) => (
            <Link
              key={intent.id}
              href={intent.href}
              className="group bg-[var(--ui-bg-strong)] p-6 transition-colors hover:bg-[var(--ui-bg-soft)]"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                {intent.stat}
              </span>
              <h2 className="mt-3 text-2xl font-light text-[var(--ui-text-primary)] transition-colors group-hover:text-[var(--ui-accent)]">
                {intent.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-muted)]">
                {intent.description}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)] transition-colors group-hover:text-[var(--ui-accent)]">
                Explore
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-16">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                [ Atlas Products ]
              </span>
              <h2 className="text-3xl font-light text-[var(--ui-text-primary)]">
                Paid maps by lens
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-muted)] sm:text-base">
                Each atlas has its own decision criteria, preview set, and
                product state so the system can grow beyond surf towns cleanly.
              </p>
            </div>
            <Link
              href="/maps"
              className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--ui-border-strong)] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--ui-text-primary)] transition-colors hover:border-[var(--ui-accent)] hover:text-[var(--ui-accent)]"
            >
              View maps
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] lg:grid-cols-2">
            {productPreviews.map(({ product, previewItems }) => (
              <Link
                key={product.id}
                href={product.href}
                className="group bg-[var(--ui-bg-strong)] p-6 transition-colors hover:bg-[var(--ui-bg-soft)] sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                      {product.statusLabel}
                    </span>
                    <h3 className="mt-2 text-2xl font-light text-[var(--ui-text-primary)]">
                      {product.title}
                    </h3>
                  </div>

                  <span className="font-editorial text-3xl leading-none text-[var(--ui-accent)]">
                    {product.price}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-[var(--ui-text-secondary)]">
                  {product.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {previewItems.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[var(--ui-border-subtle)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-muted)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)] transition-colors group-hover:text-[var(--ui-accent)]">
                  {product.previewLabel}
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
