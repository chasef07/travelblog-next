import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { generatePageMetadata } from '@/lib/seo'
import { mapProducts } from '@/content/maps-data'
import { getPlacesForMap, getRelatedPostsForPlace } from '@/content/places-data'
import SurfTownAtlasExplorer from '@/components/SurfTownAtlasExplorer'
import SurfTownComparison from '@/components/SurfTownComparison'

export const metadata = generatePageMetadata({
  title: 'Maps',
  description: 'Paid atlas products for surf towns, spiritually interesting places, and cafe + work spots built from lived travel experience.',
  path: '/maps',
  images: mapProducts.map((product) => product.image),
  keywords: ['travel maps', 'surf towns', 'digital nomad cafes', 'spiritual travel'],
})

export default function MapsPage() {
  const surfPlaces = [...getPlacesForMap('surf-town-atlas')].sort((a, b) => b.scores.surf - a.scores.surf)
  const workPlaces = [...getPlacesForMap('cafe-work-atlas')].sort((a, b) => b.scores.workability - a.scores.workability)
  const depthPlaces = [...getPlacesForMap('spiritual-places-atlas')].sort((a, b) => b.scores.beauty - a.scores.beauty)
  const surfTownEntries = surfPlaces.map((place) => ({
    ...place,
    relatedPosts: getRelatedPostsForPlace(place).map((post) => ({
      slug: post.slug,
      year: post.year,
      title: post.title,
    })),
  }))

  return (
    <main className="min-h-screen app-surface pt-20 sm:pt-24">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <span className="mb-4 block font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--ui-accent)]">
              [ Paid Atlases ]
            </span>
            <h1 className="font-editorial-display text-4xl tracking-tight text-[var(--ui-text-primary)] sm:text-5xl md:text-6xl">
              Maps Worth Buying
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[var(--ui-text-secondary)]">
              These are not generic lists. Each atlas is meant to compress lived experience into a format that helps you choose where to go next.
            </p>
          </div>

          <Link
            href="/atlas"
            className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--ui-border-strong)] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--ui-text-primary)] transition-colors hover:border-[var(--ui-accent)] hover:text-[var(--ui-accent)]"
          >
            Explore the atlas
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </header>

        <div className="mb-14 grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] lg:grid-cols-3">
          {mapProducts.map((product) => (
            <section
              key={product.id}
              id={product.id}
              className="bg-[var(--ui-bg-strong)] p-6 sm:p-7"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                  {product.shortLabel}
                </span>
                <span className="rounded-full border border-[var(--ui-border-subtle)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-muted)]">
                  {product.status}
                </span>
              </div>

              <h2 className="text-2xl font-light text-[var(--ui-text-primary)]">{product.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-muted)]">{product.description}</p>

              <div className="mt-6 border-t border-dashed border-[var(--ui-border-subtle)] pt-5">
                <span className="font-editorial text-3xl leading-none text-[var(--ui-accent)]">{product.price}</span>
                <p className="mt-2 text-sm text-[var(--ui-text-secondary)]">{product.audience}</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {product.valueProps.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[var(--ui-border-subtle)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-muted)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section id="surf-town-atlas" className="mb-16">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                [ Surf Town Atlas ]
              </span>
              <h2 className="text-3xl font-light text-[var(--ui-text-primary)] sm:text-4xl">
                Real places, scored like actual options
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-muted)] sm:text-base">
                These are the first seed places in the atlas. The goal is not to declare a universal winner. It is to help someone choose the right surf base for the way they want to live.
              </p>
            </div>
          </div>
          <SurfTownAtlasExplorer places={surfTownEntries} />
        </section>

        <section className="mb-16">
          <div className="mb-8 max-w-3xl">
            <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
              [ Side-by-side ]
            </span>
            <h2 className="text-3xl font-light text-[var(--ui-text-primary)] sm:text-4xl">
              Compare places directly
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-muted)] sm:text-base">
              This is where the atlas starts becoming decision support instead of content. Put two places next to each other and see which one actually fits your constraints.
            </p>
          </div>
          <SurfTownComparison places={surfPlaces} />
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-6">
              <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                [ Next in line ]
              </span>
              <h2 className="text-2xl font-light text-[var(--ui-text-primary)]">Cafe + Work Atlas</h2>
            </div>
            <div className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)]">
              {workPlaces.slice(0, 4).map((place) => (
                <div key={place.id} className="bg-[var(--ui-bg-strong)] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-light text-[var(--ui-text-primary)]">{place.name}</h3>
                      <p className="mt-1 text-sm text-[var(--ui-text-muted)]">{place.country}</p>
                    </div>
                    <span className="font-editorial text-2xl leading-none text-[var(--ui-accent)]">
                      {place.scores.workability.toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-6">
              <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                [ Then ]
              </span>
              <h2 className="text-2xl font-light text-[var(--ui-text-primary)]">Spiritual Places Atlas</h2>
            </div>
            <div className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)]">
              {depthPlaces.slice(0, 4).map((place) => (
                <div key={place.id} className="bg-[var(--ui-bg-strong)] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-light text-[var(--ui-text-primary)]">{place.name}</h3>
                      <p className="mt-1 text-sm text-[var(--ui-text-muted)]">{place.country}</p>
                    </div>
                    <span className="font-editorial text-2xl leading-none text-[var(--ui-accent)]">
                      {place.scores.beauty.toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
