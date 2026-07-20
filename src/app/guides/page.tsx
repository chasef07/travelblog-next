import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { generatePageMetadata } from '@/lib/seo'
import { atlasCatalog } from '@/content/maps-data'

export const metadata = generatePageMetadata({
  title: 'Travel Guides',
  description:
    'Paid travel guides and atlas products built from Chase Fagen travel experience: surf towns, adventure countries, wellness places, work spots, and deeper destinations.',
  path: '/guides',
  images: atlasCatalog.products.map((product) => product.image),
  keywords: [
    'travel guides',
    'surf town guide',
    'travel atlas',
    'adventure travel guide',
    'wellness travel guide',
  ],
})

export default function GuidesPage() {
  const featuredProduct = atlasCatalog.featuredProduct

  return (
    <main className="min-h-screen app-surface pt-20 sm:pt-24">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="mb-14 grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div className="max-w-3xl">
            <span className="mb-4 block font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--ui-accent)]">
              Travel guides
            </span>
            <h1 className="font-editorial-display text-4xl tracking-tight text-[var(--ui-text-primary)] sm:text-5xl md:text-6xl">
              Maps and guides from the places I have actually lived
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[var(--ui-text-secondary)]">
              This is the buying path. The personal site stays focused on the
              writing, journey, and work. Guides are here when someone wants a
              practical decision tool.
            </p>
          </div>

          <div className="border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] p-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
              Current live guide
            </span>
            <h2 className="mt-3 text-3xl font-light text-[var(--ui-text-primary)]">
              {featuredProduct.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-muted)]">
              {featuredProduct.audience}
            </p>
            {featuredProduct.checkoutUrl ? (
              <a
                href={featuredProduct.checkoutUrl}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--ui-accent)] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--ui-on-accent)] transition-colors hover:bg-[var(--ui-accent-hover)]"
              >
                Buy guide
                <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </header>

        <section className="mb-16">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-accent-alt)]">
                Available and planned
              </span>
              <h2 className="text-3xl font-light text-[var(--ui-text-primary)]">
                Guide library
              </h2>
            </div>
            <Link
              href="/maps"
              className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--ui-border-strong)] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--ui-text-primary)] transition-colors hover:border-[var(--ui-accent)] hover:text-[var(--ui-accent)]"
            >
              Preview maps
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] lg:grid-cols-3">
            {atlasCatalog.products.map((product, index) => (
              <article
                key={product.id}
                id={product.slug}
                className="bg-[var(--ui-bg-strong)]"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                    priority={index < 2}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                        {product.statusLabel}
                      </span>
                      <h3 className="mt-3 text-3xl font-light text-[var(--ui-text-primary)]">
                        {product.title}
                      </h3>
                    </div>
                    <span className="font-editorial text-4xl leading-none text-[var(--ui-accent)]">
                      {product.price}
                    </span>
                  </div>

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

                  <div className="mt-7 flex flex-wrap gap-3 border-t border-dashed border-[var(--ui-border-subtle)] pt-5">
                    {product.checkoutUrl ? (
                      <a
                        href={product.checkoutUrl}
                        className="inline-flex items-center gap-2 rounded-full bg-[var(--ui-accent)] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--ui-on-accent)] transition-colors hover:bg-[var(--ui-accent-hover)]"
                      >
                        Buy guide
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center rounded-full border border-[var(--ui-border-subtle)] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--ui-text-muted)]">
                        In progress
                      </span>
                    )}
                    <Link
                      href={product.href}
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--ui-border-strong)] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--ui-text-primary)] transition-colors hover:border-[var(--ui-accent)] hover:text-[var(--ui-accent)]"
                    >
                      Preview
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-accent-alt)]">
                Why these exist
              </span>
              <h2 className="text-3xl font-light text-[var(--ui-text-primary)]">
                Shorten the decision
              </h2>
            </div>
            <p className="text-base leading-relaxed text-[var(--ui-text-secondary)] sm:text-lg">
              The blog is for the full story. The maps are for the moment when
              someone needs to choose a place, compare tradeoffs, and stop
              browsing generic travel advice.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
