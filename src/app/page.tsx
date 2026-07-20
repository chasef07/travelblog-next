import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import SimpleHero from '../components/SimpleHero'
import { blogArchives, type BlogArchive } from '@/content/blog-registry'
import { countriesData, journeyStats } from '@/content/journey'
import { mapProducts } from '@/content/maps-data'

const latestArchives = blogArchives.slice(0, 3)
const featuredGuides = mapProducts.slice(0, 3)
const routeCountries = Object.values(countriesData)

function shouldContainArchiveImage(archive: BlogArchive) {
  return archive.imageFit === 'contain' || archive.image.includes('/flags/')
}

const projectRows = [
  {
    title: 'AI systems for local businesses',
    description:
      'Voice agents, call-center workflows, booking automation, analytics, and practical software for service businesses.',
    href: 'https://databuddiessolutions.com/',
    label: 'Data Buddies',
  },
  {
    title: 'Lifestyle Engineering',
    description:
      'A public notebook on health, work, travel, discipline, family, place, and building a life with real value.',
    href: '/blog',
    label: 'Writing',
  },
  {
    title: 'Travel intelligence',
    description:
      'Maps and guides built from lived experience, not scraped lists or generic destination content.',
    href: '/guides',
    label: 'Guides',
  },
]

export default function Page() {
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
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <span className="mb-4 block font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--ui-accent)]">
                Latest writing
              </span>
              <h2 className="font-editorial-display text-4xl tracking-tight text-[var(--ui-text-primary)] md:text-5xl">
                Meandering thoughts and inner exploration
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--ui-border-strong)] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--ui-text-primary)] transition-colors hover:border-[var(--ui-accent)] hover:text-[var(--ui-accent)]"
            >
              All writing
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] md:grid-cols-3">
            {latestArchives.map((archive, index) => {
              const containImage = shouldContainArchiveImage(archive)

              return (
                <Link
                  key={`${archive.year}-${archive.slug}`}
                  href={`/blog/${archive.year}/${archive.slug}`}
                  className="group bg-[var(--ui-bg-strong)] transition-colors hover:bg-[var(--ui-bg-soft)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[var(--ui-bg-elevated)]">
                    <Image
                      src={archive.image}
                      alt={archive.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className={`transition-transform duration-500 group-hover:scale-105 ${
                        containImage ? 'object-contain p-6' : 'object-cover'
                      }`}
                      style={{
                        objectPosition: containImage
                          ? 'center'
                          : archive.imagePosition || 'center 38%',
                      }}
                      priority={index === 0}
                    />
                  </div>
                  <div className="p-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                      {archive.displayDate}
                    </span>
                    <h3 className="mt-3 text-2xl font-light text-[var(--ui-text-primary)] transition-colors group-hover:text-[var(--ui-accent)]">
                      {archive.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-muted)]">
                      {archive.excerpt}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <div className="app-surface relative">
        <div className="section-divider mx-auto max-w-7xl" />
      </div>

      <section className="app-surface py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-editorial-display text-4xl tracking-tight text-[var(--ui-text-primary)] md:text-5xl">
              Countries
            </h2>
            <Link
              href="/countries"
              className="inline-flex items-center gap-2 self-start font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--ui-text-muted)] transition-colors hover:text-[var(--ui-accent)]"
            >
              View countries
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-px bg-[var(--ui-border-subtle)] sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {routeCountries.map((country) => (
              <Link
                key={country.slug}
                href={`/countries/${country.slug}`}
                className="group bg-[var(--ui-bg-strong)] p-3 transition-colors hover:bg-[var(--ui-bg-soft)]"
              >
                <div className="relative aspect-[3/2] overflow-hidden border border-[var(--ui-border-subtle)] bg-white">
                  <Image
                    src={`/assets/images/flags/${country.flag}`}
                    alt={`${country.name} flag`}
                    fill
                    sizes="(max-width: 768px) 33vw, 120px"
                    className="object-contain p-1"
                  />
                </div>
                <div className="mt-2 truncate font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--ui-text-subtle)] transition-colors group-hover:text-[var(--ui-accent)]">
                  {country.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="app-surface relative">
        <div className="section-divider mx-auto max-w-7xl" />
      </div>

      <section id="projects" className="app-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <span className="mb-4 block font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--ui-accent-alt)]">
                Projects
              </span>
              <h2 className="font-editorial-display text-4xl tracking-tight text-[var(--ui-text-primary)] md:text-5xl">
                What I am building
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[var(--ui-text-secondary)]">
                The site should read like a personal operating system first:
                work, writing, travel, and useful products in that order.
              </p>
            </div>

            <div className="border-y border-[var(--ui-border-subtle)]">
              {projectRows.map((project) => (
                <Link
                  key={project.title}
                  href={project.href}
                  className="group grid gap-4 border-b border-[var(--ui-border-subtle)] py-6 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <div>
                    <h3 className="text-2xl font-light text-[var(--ui-text-primary)] transition-colors group-hover:text-[var(--ui-accent)]">
                      {project.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--ui-text-muted)] sm:text-base">
                      {project.description}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--ui-text-subtle)] transition-colors group-hover:text-[var(--ui-accent)]">
                    {project.label}
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="app-surface relative">
        <div className="section-divider mx-auto max-w-7xl" />
      </div>

      <section className="app-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <span className="mb-4 block font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--ui-accent)]">
                Journey
              </span>
              <h2 className="font-editorial-display text-4xl tracking-tight text-[var(--ui-text-primary)] md:text-5xl">
                The route is the archive
              </h2>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[var(--ui-text-secondary)]">
                The countries, posts, photos, maps, and packing list are the
                source material. The guides come after the lived experience.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/journey"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--ui-accent)] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--ui-on-accent)] transition-colors hover:bg-[var(--ui-accent-hover)]"
                >
                  Follow the journey
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/packing-checklist"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--ui-border-strong)] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--ui-text-primary)] transition-colors hover:border-[var(--ui-accent)] hover:text-[var(--ui-accent)]"
                >
                  Packing list
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)]">
              {[
                ['Countries', journeyStats.totalCountries.toString()],
                ['Blog posts', journeyStats.totalBlogPosts.toString()],
                ['Continents', journeyStats.continents.toString()],
              ].map(([label, value]) => (
                <div key={label} className="bg-[var(--ui-bg-strong)] p-5">
                  <div className="font-editorial-display text-4xl leading-none text-[var(--ui-accent)]">
                    {value}
                  </div>
                  <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="app-surface relative">
        <div className="section-divider mx-auto max-w-7xl" />
      </div>

      <section className="app-surface py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <span className="mb-4 block font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--ui-accent-alt)]">
                Travel guides
              </span>
              <h2 className="font-editorial-display text-4xl tracking-tight text-[var(--ui-text-primary)] md:text-5xl">
                Useful products, not the front door
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[var(--ui-text-secondary)]">
                Surf, adventure, and wellness guides now live in their own
                buying path. The homepage keeps them secondary.
              </p>
            </div>
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--ui-border-strong)] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--ui-text-primary)] transition-colors hover:border-[var(--ui-accent)] hover:text-[var(--ui-accent)]"
            >
              View guides
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] md:grid-cols-3">
            {featuredGuides.map((product) => (
              <Link
                key={product.id}
                href="/guides"
                className="group bg-[var(--ui-bg-strong)] p-6 transition-colors hover:bg-[var(--ui-bg-soft)]"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                  {product.statusLabel}
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
    </main>
  )
}
