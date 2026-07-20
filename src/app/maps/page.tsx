import Link from 'next/link'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { generatePageMetadata } from '@/lib/seo'
import { atlasCatalog } from '@/content/maps-data'
import SurfTownAtlasExplorer from '@/components/SurfTownAtlasExplorer'
import SurfTownComparison from '@/components/SurfTownComparison'

export const metadata = generatePageMetadata({
  title: 'Travel Atlas Guides',
  description:
    'Paid travel atlas guides for surf towns, adventure countries, wellness destinations, work spots, and spiritually interesting places.',
  path: '/maps',
  images: atlasCatalog.products.map((product) => product.image),
  keywords: [
    'travel atlas',
    'surf town guide',
    'adventure travel map',
    'wellness travel guide',
    'travel rankings',
  ],
})

export default function MapsPage() {
  const surfAtlasProduct = atlasCatalog.featuredProduct
  const surfTownRankings = atlasCatalog.featuredRankings
  const surfTownEntries = surfTownRankings.balanced.map(({ place }) => place)
  const countryAtlasProducts = atlasCatalog.countrySections
  const placePreviewSections = atlasCatalog.placeSections

  return (
    <main className="min-h-screen app-surface pt-20 sm:pt-24">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <span className="mb-4 block font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--ui-accent)]">
              [ Travel Atlases ]
            </span>
            <h1 className="font-editorial-display text-4xl tracking-tight text-[var(--ui-text-primary)] sm:text-5xl md:text-6xl">
              Choose the map before you choose the trip
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[var(--ui-text-secondary)]">
              Surf, adventure, wellness, work, and depth all need different
              filters. The atlas system keeps those lenses separate while using
              the same lived-experience standard.
            </p>
          </div>

          {surfAtlasProduct ? (
            <div className="self-start border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] p-5 sm:min-w-[260px]">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                {surfAtlasProduct.statusLabel}
              </span>
              <div className="mt-3 font-editorial text-4xl leading-none text-[var(--ui-accent)]">
                {surfAtlasProduct.price}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-secondary)]">
                {surfAtlasProduct.audience}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`#${surfAtlasProduct.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--ui-border-strong)] px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-primary)] transition-colors hover:border-[var(--ui-accent)] hover:text-[var(--ui-accent)]"
                >
                  Preview
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                {surfAtlasProduct.checkoutUrl ? (
                  <a
                    href={surfAtlasProduct.checkoutUrl}
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--ui-accent)] px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-on-accent)] transition-colors hover:bg-[var(--ui-accent-hover)]"
                  >
                    Buy guide
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : null}
              </div>
            </div>
          ) : null}
        </header>

        <section className="mb-16 grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] md:grid-cols-2 xl:grid-cols-5">
          {atlasCatalog.products.map((product) => (
            <div key={product.id} className="bg-[var(--ui-bg-strong)] p-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                {product.statusLabel}
              </span>
              <h2 className="mt-3 text-2xl font-light text-[var(--ui-text-primary)]">
                {product.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-muted)]">
                {product.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {product.previewNames.slice(0, 3).map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[var(--ui-border-subtle)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-muted)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-dashed border-[var(--ui-border-subtle)] pt-4">
                <span className="font-editorial text-3xl leading-none text-[var(--ui-accent)]">
                  {product.price}
                </span>
                <Link
                  href={product.href}
                  className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-primary)] transition-colors hover:text-[var(--ui-accent)]"
                >
                  {product.previewLabel}
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </section>

        {surfAtlasProduct ? (
          <section
            id={surfAtlasProduct.slug}
            className="mb-16 border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] p-6 sm:p-8"
          >
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                  [ Surf Town Atlas ]
                </span>
                <h2 className="mt-3 text-3xl font-light text-[var(--ui-text-primary)] sm:text-4xl">
                  The live paid guide
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--ui-text-secondary)] sm:text-base">
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
              <div className="border-t border-dashed border-[var(--ui-border-subtle)] pt-6 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
                <div className="font-editorial text-5xl leading-none text-[var(--ui-accent)]">
                  {surfAtlasProduct.price}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-muted)]">
                  {surfAtlasProduct.audience}
                </p>
                {surfAtlasProduct.checkoutUrl ? (
                  <a
                    href={surfAtlasProduct.checkoutUrl}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--ui-accent)] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--ui-on-accent)] transition-colors hover:bg-[var(--ui-accent-hover)]"
                  >
                    Buy the guide
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : null}
              </div>
            </div>
          </section>
        ) : null}

        <section className="mb-16">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                [ Preview ]
              </span>
              <h2 className="text-3xl font-light text-[var(--ui-text-primary)] sm:text-4xl">
                Preview the surf decision framework
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-muted)] sm:text-base">
                The point is not to name one universal winner. The point is to
                help someone judge fit faster and make a better call.
              </p>
            </div>
          </div>
          <SurfTownAtlasExplorer
            places={surfTownEntries}
            rankings={surfTownRankings}
          />
        </section>

        <section className="mb-16">
          <div className="mb-8 max-w-3xl">
            <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
              [ Side-by-side ]
            </span>
            <h2 className="text-3xl font-light text-[var(--ui-text-primary)] sm:text-4xl">
              Compare surf towns directly
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-muted)] sm:text-base">
              Put two places next to each other and see which one actually fits
              your constraints.
            </p>
          </div>
          <SurfTownComparison places={surfTownEntries} />
        </section>

        {countryAtlasProducts.map(({ product, countries }) => {
          return (
            <section key={product.id} id={product.id} className="mb-16">
              <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="max-w-3xl">
                  <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                    [ {product.shortLabel} Atlas ]
                  </span>
                  <h2 className="text-3xl font-light text-[var(--ui-text-primary)] sm:text-4xl">
                    {product.previewLabel}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-muted)] sm:text-base">
                    {product.description}
                  </p>
                </div>
                <span className="self-start font-editorial text-4xl leading-none text-[var(--ui-accent)]">
                  {product.price}
                </span>
              </div>

              <div className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] md:grid-cols-2 lg:grid-cols-3">
                {countries.map((country) => (
                  <Link
                    key={country.slug}
                    href={`/countries/${country.slug}`}
                    className="group bg-[var(--ui-bg-strong)] p-6 transition-colors hover:bg-[var(--ui-bg-soft)] sm:p-7"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                      {country.region}
                    </span>
                    <h3 className="mt-3 text-2xl font-light text-[var(--ui-text-primary)] transition-colors group-hover:text-[var(--ui-accent)]">
                      {country.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-muted)]">
                      {country.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {(country.highlights || []).slice(0, 3).map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-[var(--ui-border-subtle)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-muted)]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center justify-between border-t border-dashed border-[var(--ui-border-subtle)] pt-4">
                      <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
                        <MapPin className="h-3 w-3" />
                        Country brief
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-[var(--ui-text-muted)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--ui-accent)]" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}

        {placePreviewSections.map((section) => (
          <section
            key={section.product.id}
            id={section.product.id}
            className="mb-16"
          >
            <div className="mb-8 max-w-3xl">
              <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                [ {section.product.shortLabel} Atlas ]
              </span>
              <h2 className="text-3xl font-light text-[var(--ui-text-primary)] sm:text-4xl">
                {section.product.previewLabel}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-muted)] sm:text-base">
                {section.product.description}
              </p>
            </div>
            <div className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] md:grid-cols-2">
              {section.places.slice(0, 4).map((place) => (
                <Link
                  key={place.id}
                  href={`/places/${place.slug}`}
                  className="group bg-[var(--ui-bg-strong)] p-5 transition-colors hover:bg-[var(--ui-bg-soft)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                        {place.region}
                      </span>
                      <h3 className="mt-2 text-xl font-light text-[var(--ui-text-primary)] transition-colors group-hover:text-[var(--ui-accent)]">
                        {place.name}
                      </h3>
                      <p className="mt-1 text-sm text-[var(--ui-text-muted)]">
                        {place.country}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-editorial text-3xl leading-none text-[var(--ui-accent)]">
                        {place.scores[section.scoreKey].toFixed(1)}
                      </span>
                      <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--ui-text-subtle)]">
                        {section.scoreLabel}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
