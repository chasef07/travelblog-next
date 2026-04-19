import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import SimpleHero from "../components/SimpleHero"
import SimpleCountriesGrid from "../components/SimpleCountriesGrid"
import { mapProducts } from "@/content/maps-data"
import { journeyChapters } from "@/content/journey-data"

export default function Page() {
  return (
    <main className="min-h-screen" itemScope itemType="https://schema.org/WebSite">
      <SimpleHero />

      <div className="app-surface relative">
        <div className="section-divider mx-auto max-w-7xl" />
      </div>

      <section className="app-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 max-w-3xl">
            <span className="mb-4 block font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--ui-accent)]">
              [ Start Here ]
            </span>
            <h2 className="font-editorial-display text-4xl tracking-tight text-[var(--ui-text-primary)] md:text-5xl">
              Three ways to use the site
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ui-text-secondary)]">
              Use the atlas to decide, the journey to understand the route, and countries to browse by destination.
            </p>
          </div>

          <div className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] lg:grid-cols-3">
            {[
              {
                href: "/atlas",
                label: "Atlas",
                title: "Choose where to go",
                description: "Filters, rankings, place dossiers, and comparison tools.",
                stat: "Decision engine",
              },
              {
                href: "/journey",
                label: "Journey",
                title: "Follow the route",
                description: "Chronological chapters, reflections, and turning points.",
                stat: "Narrative layer",
              },
              {
                href: "/countries",
                label: "Countries",
                title: "Browse by destination",
                description: "Country dossiers combining stories, food, and key places.",
                stat: "Destination view",
              },
            ].map((entry) => (
              <Link
                key={entry.href}
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
                [ Featured Maps ]
              </span>
              <h2 className="font-editorial-display text-4xl tracking-tight text-[var(--ui-text-primary)] md:text-5xl">
                Start with the first atlas products
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[var(--ui-text-secondary)]">
                These are the clearest expressions of the product direction so far.
              </p>
            </div>
            <Link
              href="/maps"
              className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--ui-border-strong)] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--ui-text-primary)] transition-colors hover:border-[var(--ui-accent)] hover:text-[var(--ui-accent)]"
            >
              Open maps
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] lg:grid-cols-3">
            {mapProducts.map((product) => (
              <Link
                key={product.id}
                href={`/maps#${product.id}`}
                className="group bg-[var(--ui-bg-strong)] p-6 transition-colors hover:bg-[var(--ui-bg-soft)] sm:p-7"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                  {product.shortLabel}
                </span>
                <h3 className="mt-3 text-2xl font-light text-[var(--ui-text-primary)] transition-colors group-hover:text-[var(--ui-accent)]">
                  {product.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-muted)]">
                  {product.description}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-dashed border-[var(--ui-border-subtle)] pt-4">
                  <span className="font-editorial text-3xl leading-none text-[var(--ui-accent)]">
                    {product.price}
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

      <section id="journey" className="app-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <span className="mb-4 block font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--ui-accent)]">
                [ The Journey ]
              </span>
              <h2 className="font-editorial-display text-4xl tracking-tight text-[var(--ui-text-primary)] md:text-5xl">
                The story behind the judgment
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[var(--ui-text-secondary)]">
                The journey is what makes the atlas credible.
              </p>
            </div>
            <Link
              href="/journey"
              className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--ui-border-strong)] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--ui-text-primary)] transition-colors hover:border-[var(--ui-accent)] hover:text-[var(--ui-accent)]"
            >
              Open journey
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] lg:grid-cols-2">
            {journeyChapters.slice(0, 4).map((chapter) => (
              <div key={chapter.id} className="bg-[var(--ui-bg-strong)] p-6 sm:p-7">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                  {chapter.dateRange}
                </span>
                <h3 className="mt-3 text-2xl font-light text-[var(--ui-text-primary)]">{chapter.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-muted)]">{chapter.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="app-surface relative">
        <div className="section-divider mx-auto max-w-7xl" />
      </div>

      <section
        id="countries"
        className="app-surface py-14 sm:py-20 relative overflow-hidden"
        aria-labelledby="countries-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 md:gap-6 mb-10 sm:mb-12">
            <div>
              <span className="font-mono text-[11px] font-medium tracking-[0.3em] text-[var(--ui-accent)] uppercase block mb-4">
                [ Countries ]
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-[var(--ui-text-primary)]">
                Browse by destination
              </h2>
            </div>
            <p className="text-[var(--ui-text-secondary)] text-base sm:text-lg leading-relaxed max-w-md md:text-right">
              Start with a country if you already know the region you care about.
            </p>
          </div>

          <div className="border border-dashed border-[var(--ui-border-strong)]">
            <SimpleCountriesGrid />
          </div>
        </div>
      </section>
    </main>
  )
}
