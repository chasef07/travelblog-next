import { ArrowUpRight } from 'lucide-react'
import { generatePageMetadata } from '@/lib/seo'
import { mapProducts } from '@/content/maps-data'
import { getPlacesForMap, getRelatedPostsForPlace } from '@/content/places-data'
import { SURF_TOWN_GUIDE_CHECKOUT_URL } from '@/lib/product-links'
import SurfTownAtlasExplorer from '@/components/SurfTownAtlasExplorer'
import SurfTownComparison from '@/components/SurfTownComparison'

export const metadata = generatePageMetadata({
  title: 'Surf Town Guide',
  description:
    'A surf town decision guide for choosing the right base by waves, vibe, walkability, internet, and long-stay fit.',
  path: '/maps',
  images: mapProducts.map((product) => product.image),
  keywords: [
    'surf town guide',
    'surf town rankings',
    'best surf towns',
    'surf base guide',
  ],
})

export default function MapsPage() {
  const surfPlaces = [...getPlacesForMap('surf-town-atlas')].sort(
    (a, b) => b.scores.surf - a.scores.surf,
  )
  const workPlaces = [...getPlacesForMap('cafe-work-atlas')].sort(
    (a, b) => b.scores.workability - a.scores.workability,
  )
  const depthPlaces = [...getPlacesForMap('spiritual-places-atlas')].sort(
    (a, b) => b.scores.beauty - a.scores.beauty,
  )
  const surfAtlasProduct = mapProducts.find(
    (product) => product.id === 'surf-town-atlas',
  )
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
              [ Surf Town Guide ]
            </span>
            <h1 className="font-editorial-display text-4xl tracking-tight text-[var(--ui-text-primary)] sm:text-5xl md:text-6xl">
              Choose the right surf town before you book
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[var(--ui-text-secondary)]">
              Compare real surf towns by surf quality, lifestyle fit,
              walkability, internet, and value so you can choose with more
              confidence.
            </p>
          </div>

          {surfAtlasProduct && (
            <div className="self-start rounded-2xl border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] p-5 sm:min-w-[260px]">
              <div className="font-editorial text-4xl leading-none text-[var(--ui-accent)]">
                {surfAtlasProduct.price}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-secondary)]">
                A decision tool for surfers, remote workers, and long-stay
                travelers choosing their next base.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="#surf-town-atlas"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--ui-accent)] px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-on-accent)] transition-colors hover:bg-[var(--ui-accent-hover)]"
                >
                  Preview the guide
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href={SURF_TOWN_GUIDE_CHECKOUT_URL}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--ui-border-strong)] px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-primary)] transition-colors hover:border-[var(--ui-accent)] hover:text-[var(--ui-accent)]"
                >
                  Get the guide
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          )}
        </header>

        {surfAtlasProduct && (
          <section className="mb-14 grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] lg:grid-cols-3">
            <div className="bg-[var(--ui-bg-strong)] p-6 sm:p-7">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                [ What you get ]
              </span>
              <h2 className="mt-3 text-2xl font-light text-[var(--ui-text-primary)]">
                Rankings, comparisons, and place picks
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-muted)]">
                {surfAtlasProduct.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {surfAtlasProduct.valueProps.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[var(--ui-border-subtle)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-muted)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[var(--ui-bg-strong)] p-6 sm:p-7">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                [ Built for ]
              </span>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-secondary)]">
                {surfAtlasProduct.audience}
              </p>
              <div className="mt-6 font-editorial text-4xl leading-none text-[var(--ui-accent)]">
                {surfAtlasProduct.price}
              </div>
            </div>

            <div className="bg-[var(--ui-bg-strong)] p-6 sm:p-7">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                [ Why it works ]
              </span>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-secondary)]">
                This is meant to replace scattered research with one cleaner
                decision framework that helps someone actually choose.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-primary)]">
                Surf-first
              </div>
            </div>
          </section>
        )}

        <section id="surf-town-atlas" className="mb-16">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                [ Preview ]
              </span>
              <h2 className="text-3xl font-light text-[var(--ui-text-primary)] sm:text-4xl">
                Preview the decision framework
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-muted)] sm:text-base">
                The point is not to name one universal winner. The point is to
                help someone judge fit faster and make a better call.
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
              Put two places next to each other and see which one actually fits
              your constraints.
            </p>
          </div>
          <SurfTownComparison places={surfPlaces} />
        </section>

        <section
          id="buy-guide"
          className="mb-16 border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] p-6 sm:p-8"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                [ Get the guide ]
              </span>
              <h2 className="text-3xl font-light text-[var(--ui-text-primary)] sm:text-4xl">
                Ready to choose your next surf town?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-secondary)] sm:text-base">
                The product promise is simple: less scattered research, cleaner
                comparisons, and a faster decision.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4">
              {surfAtlasProduct && (
                <div className="font-editorial text-5xl leading-none text-[var(--ui-accent)]">
                  {surfAtlasProduct.price}
                </div>
              )}
              <a
                href={SURF_TOWN_GUIDE_CHECKOUT_URL}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--ui-accent)] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--ui-on-accent)] transition-colors hover:bg-[var(--ui-accent-hover)]"
              >
                Buy the guide
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-6">
              <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                [ Also coming ]
              </span>
              <h2 className="text-2xl font-light text-[var(--ui-text-primary)]">
                Cafe + Work Atlas
              </h2>
            </div>
            <div className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)]">
              {workPlaces.slice(0, 4).map((place) => (
                <div key={place.id} className="bg-[var(--ui-bg-strong)] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-light text-[var(--ui-text-primary)]">
                        {place.name}
                      </h3>
                      <p className="mt-1 text-sm text-[var(--ui-text-muted)]">
                        {place.country}
                      </p>
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
                [ Also coming ]
              </span>
              <h2 className="text-2xl font-light text-[var(--ui-text-primary)]">
                Spiritual Places Atlas
              </h2>
            </div>
            <div className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)]">
              {depthPlaces.slice(0, 4).map((place) => (
                <div key={place.id} className="bg-[var(--ui-bg-strong)] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-light text-[var(--ui-text-primary)]">
                        {place.name}
                      </h3>
                      <p className="mt-1 text-sm text-[var(--ui-text-muted)]">
                        {place.country}
                      </p>
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
