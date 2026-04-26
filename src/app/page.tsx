import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import SimpleHero from '../components/SimpleHero'
import { mapProducts } from '@/content/maps-data'
import { SURF_TOWN_GUIDE_CHECKOUT_URL } from '@/lib/product-links'

export default function Page() {
  const surfAtlas = mapProducts.find(
    (product) => product.id === 'surf-town-atlas',
  )

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
              Most surf research is scattered and low-signal
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ui-text-secondary)]">
              A buyer does not need more inspiration. They need a faster way to
              judge which town actually fits the way they want to live.
            </p>
          </div>

          <div className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] lg:grid-cols-3">
            {[
              {
                id: 'waves',
                href: '/maps#surf-town-atlas',
                label: 'Waves',
                title: 'Know the surf quality',
                description:
                  'See how each town stacks up for surf consistency, level, and day-to-day rhythm.',
                stat: 'Surf fit',
              },
              {
                id: 'lifestyle',
                href: '/maps#surf-town-atlas',
                label: 'Lifestyle',
                title: 'Judge life off the board',
                description:
                  'Compare walkability, internet, vibe, cost, and long-stay practicality before committing.',
                stat: 'Town fit',
              },
              {
                id: 'decision',
                href: '/maps#surf-town-atlas',
                label: 'Decision',
                title: 'Choose faster',
                description:
                  'Use rankings and side-by-side comparisons instead of piecing it together from random blogs.',
                stat: 'Decision fit',
              },
            ].map((entry) => (
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
                [ Surf Town Guide ]
              </span>
              <h2 className="font-editorial-display text-4xl tracking-tight text-[var(--ui-text-primary)] md:text-5xl">
                What you get in the Surf Town Guide
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[var(--ui-text-secondary)]">
                A focused decision tool built to help someone choose a surf base
                with more confidence and less wasted research.
              </p>
            </div>
            <a
              href={SURF_TOWN_GUIDE_CHECKOUT_URL}
              className="inline-flex items-center gap-2 self-start rounded-full bg-[var(--ui-accent)] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--ui-on-accent)] transition-colors hover:bg-[var(--ui-accent-hover)]"
            >
              Get the guide
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {surfAtlas && (
            <div className="border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] p-6 sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                    {surfAtlas.shortLabel}
                  </span>
                  <h3 className="mt-3 text-3xl font-light text-[var(--ui-text-primary)] sm:text-4xl">
                    {surfAtlas.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--ui-text-secondary)]">
                    {surfAtlas.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {surfAtlas.valueProps.map((item) => (
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
                    {surfAtlas.price}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-secondary)]">
                    {surfAtlas.audience}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={SURF_TOWN_GUIDE_CHECKOUT_URL}
                      className="inline-flex items-center gap-2 rounded-full bg-[var(--ui-accent)] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--ui-on-accent)] transition-colors hover:bg-[var(--ui-accent-hover)]"
                    >
                      Get the guide
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <Link
                      href="/maps#surf-town-atlas"
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--ui-border-strong)] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--ui-text-primary)] transition-colors hover:border-[var(--ui-accent)] hover:text-[var(--ui-accent)]"
                    >
                      Preview the guide
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
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
                The judgment behind the guide comes from being on the ground,
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
                  'Each town is judged against the same lifestyle criteria instead of random one-off impressions.',
              },
              {
                title: 'Written from experience',
                description:
                  'The guide is grounded in actual time on location, not scraped recommendations or generic surf travel content.',
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
                  Preview the rankings or get the guide
                </h2>
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-[var(--ui-text-secondary)] max-w-2xl">
                  The fastest path is simple: look at the preview, decide if the
                  framework feels useful, then buy.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/maps#surf-town-atlas"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--ui-border-strong)] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--ui-text-primary)] transition-colors hover:border-[var(--ui-accent)] hover:text-[var(--ui-accent)]"
                >
                  Preview the guide
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a
                  href={SURF_TOWN_GUIDE_CHECKOUT_URL}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--ui-accent)] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--ui-on-accent)] transition-colors hover:bg-[var(--ui-accent-hover)]"
                >
                  Get the guide
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
