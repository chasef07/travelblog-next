import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import SimpleHero from '../components/SimpleHero'
import { mapProducts } from '@/content/maps-data'

export default function Page() {
  const surfAtlas = mapProducts.find(
    (product) => product.id === 'surf-town-atlas',
  )
  const featuredAtlasIds = new Set([
    'surf-town-atlas',
    'adventure-atlas',
    'wellness-atlas',
  ])
  const featuredAtlases = mapProducts.filter((product) =>
    featuredAtlasIds.has(product.id),
  )
  const atlasDecisionCards = [
    {
      id: 'surf',
      href: '/maps#surf-town-atlas',
      label: 'Surf',
      title: 'Pick the right surf base',
      description:
        'Compare waves, town rhythm, walkability, internet, and long-stay practicality before committing.',
      stat: 'Wave + town fit',
    },
    {
      id: 'adventure',
      href: '/maps#adventure-atlas',
      label: 'Adventure',
      title: 'Choose the right kind of hard',
      description:
        'Separate true adventure upside from places that only look exciting in a short-form clip.',
      stat: 'Route + nature fit',
    },
    {
      id: 'wellness',
      href: '/maps#wellness-atlas',
      label: 'Wellness',
      title: 'Find places that reset you',
      description:
        'Judge countries by recovery, food, hot springs, quiet rhythm, and how easy it is to feel human again.',
      stat: 'Recovery fit',
    },
  ]

  return (
    <main
      className="min-h-screen"
      itemScope
      itemType="https://schema.org/WebSite"
    >
      <SimpleHero />

      <div className="app-surface relative">
        <div className="section-divider mx-auto max-w-7xl" />
      </div>

      <section className="app-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 max-w-3xl">
            <span className="mb-4 block font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--ui-accent)]">
              [ Why it sells ]
            </span>
            <h2 className="font-editorial-display text-4xl tracking-tight text-[var(--ui-text-primary)] md:text-5xl">
              Most travel research is scattered and low-signal
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ui-text-secondary)]">
              A buyer does not need more inspiration. They need a faster way to
              judge which place actually fits the way they want to travel.
            </p>
          </div>

          <div className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] lg:grid-cols-3">
            {atlasDecisionCards.map((entry) => (
              <Link
                key={entry.id}
                href={entry.href}
                className="group bg-[var(--ui-bg-strong)] p-6 transition-colors hover:bg-[var(--ui-bg-soft)] sm:p-7"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                  {entry.label}
                </span>
                <h3 className="mt-3 text-2xl font-light text-[var(--ui-text-primary)] transition-colors group-hover:text-[var(--ui-accent)]">
                  {entry.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-muted)]">
                  {entry.description}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-dashed border-[var(--ui-border-subtle)] pt-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
                    {entry.stat}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[var(--ui-text-muted)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--ui-accent)]" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="app-surface relative">
        <div className="section-divider mx-auto max-w-7xl" />
      </div>

      <section className="app-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <span className="mb-4 block font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--ui-accent)]">
                [ Atlas products ]
              </span>
              <h2 className="font-editorial-display text-4xl tracking-tight text-[var(--ui-text-primary)] md:text-5xl">
                Three paid atlas tracks
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[var(--ui-text-secondary)]">
                Surf is live now. Adventure and wellness use the same decision
                framework, starting with the countries that already have enough
                lived signal to rank properly.
              </p>
            </div>
            {surfAtlas?.checkoutUrl ? (
              <a
                href={surfAtlas.checkoutUrl}
                className="inline-flex items-center gap-2 self-start rounded-full bg-[var(--ui-accent)] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--ui-on-accent)] transition-colors hover:bg-[var(--ui-accent-hover)]"
              >
                Get the surf guide
                <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : null}
          </div>

          <div className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] lg:grid-cols-3">
            {featuredAtlases.map((product) => (
              <div
                key={product.id}
                className="bg-[var(--ui-bg-strong)] p-6 sm:p-7"
              >
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                    {product.statusLabel}
                  </span>
                  <h3 className="mt-3 text-3xl font-light text-[var(--ui-text-primary)]">
                    {product.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--ui-text-secondary)]">
                    {product.description}
                  </p>
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
                  {product.featuredCountries ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {product.featuredCountries.map((country) => (
                        <span
                          key={country}
                          className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]"
                        >
                          {country}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="mt-7 border-t border-dashed border-[var(--ui-border-subtle)] pt-5">
                  <div className="font-editorial text-4xl leading-none text-[var(--ui-accent)]">
                    {product.price}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-muted)]">
                    {product.audience}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {product.checkoutUrl ? (
                      <a
                        href={product.checkoutUrl}
                        className="inline-flex items-center gap-2 rounded-full bg-[var(--ui-accent)] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--ui-on-accent)] transition-colors hover:bg-[var(--ui-accent-hover)]"
                      >
                        Get the guide
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ) : null}
                    <Link
                      href={product.href}
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--ui-border-strong)] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--ui-text-primary)] transition-colors hover:border-[var(--ui-accent)] hover:text-[var(--ui-accent)]"
                    >
                      Preview
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="app-surface relative">
        <div className="section-divider mx-auto max-w-7xl" />
      </div>

      <section className="app-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <span className="mb-4 block font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--ui-accent)]">
                [ Proof of trust ]
              </span>
              <h2 className="font-editorial-display text-4xl tracking-tight text-[var(--ui-text-primary)] md:text-5xl">
                Built from lived experience, not copied lists
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[var(--ui-text-secondary)]">
                The judgment behind each atlas comes from being on the ground,
                writing dispatches, and comparing places against the same lens
                over time.
              </p>
            </div>
            <Link
              href="/journey"
              className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--ui-border-strong)] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--ui-text-primary)] transition-colors hover:border-[var(--ui-accent)] hover:text-[var(--ui-accent)]"
            >
              Read the journey
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] md:grid-cols-3">
            {[
              {
                title: 'Ranked with one framework',
                description:
                  'Each atlas uses a consistent lens, so the rankings are more useful than random one-off impressions.',
              },
              {
                title: 'Written from experience',
                description:
                  'The guides are grounded in actual time on location, not scraped recommendations or generic travel content.',
              },
              {
                title: 'Made to shorten decisions',
                description:
                  'The point is not endless browsing. The point is choosing faster and choosing better.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[var(--ui-bg-strong)] p-6 sm:p-7"
              >
                <h3 className="text-2xl font-light text-[var(--ui-text-primary)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-muted)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="app-surface relative">
        <div className="section-divider mx-auto max-w-7xl" />
      </div>

      <section className="app-surface py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] p-6 sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <span className="font-mono text-[11px] font-medium tracking-[0.3em] text-[var(--ui-accent)] uppercase block mb-4">
                  [ Next step ]
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight text-[var(--ui-text-primary)]">
                  Preview the atlas menu or buy the surf guide
                </h2>
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-[var(--ui-text-secondary)] max-w-2xl">
                  Surf is checkout-ready now. Adventure and wellness are next in
                  the same product system.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/maps"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--ui-border-strong)] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--ui-text-primary)] transition-colors hover:border-[var(--ui-accent)] hover:text-[var(--ui-accent)]"
                >
                  Preview atlases
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                {surfAtlas?.checkoutUrl ? (
                  <a
                    href={surfAtlas.checkoutUrl}
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--ui-accent)] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--ui-on-accent)] transition-colors hover:bg-[var(--ui-accent-hover)]"
                  >
                    Get the surf guide
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
