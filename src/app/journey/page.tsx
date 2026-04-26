import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { generatePageMetadata } from '@/lib/seo'
import { blogArchives, blogArchivesByMonth } from '@/content/blog-registry'
import { journeyChapters } from '@/content/journey-data'
import { journeyStats } from '@/utils/comprehensive-map-data'

export const metadata = generatePageMetadata({
  title: 'Journey',
  description:
    'The chronological route, chapters, and reflections behind Lifestyle Engineering and the atlas it is becoming.',
  path: '/journey',
  images: blogArchives.slice(0, 4).map((archive) => archive.image),
  keywords: [
    'travel journey',
    'chronological travel story',
    'field notes',
    'travel chapters',
  ],
})

export default function JourneyPage() {
  return (
    <main className="min-h-screen app-surface pt-20 sm:pt-24">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="mb-14">
          <span className="mb-4 block font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--ui-accent)]">
            [ Journey ]
          </span>
          <h1 className="font-editorial-display text-4xl tracking-tight text-[var(--ui-text-primary)] sm:text-5xl md:text-6xl">
            The route behind the atlas
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[var(--ui-text-secondary)]">
            The journey is the emotional backbone of the brand. It is where the
            movement, reflections, and changing standards for place turned into
            usable travel intelligence.
          </p>
        </header>

        <section className="mb-14 grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] md:grid-cols-4">
          <div className="bg-[var(--ui-bg-strong)] p-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
              Countries
            </span>
            <div className="mt-2 text-4xl font-extralight text-[var(--ui-text-primary)]">
              {journeyStats.totalCountries}
            </div>
          </div>
          <div className="bg-[var(--ui-bg-strong)] p-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
              Posts
            </span>
            <div className="mt-2 text-4xl font-extralight text-[var(--ui-text-primary)]">
              {journeyStats.totalBlogPosts}
            </div>
          </div>
          <div className="bg-[var(--ui-bg-strong)] p-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
              Months
            </span>
            <div className="mt-2 text-4xl font-extralight text-[var(--ui-text-primary)]">
              {journeyStats.durationMonths}
            </div>
          </div>
          <div className="bg-[var(--ui-bg-strong)] p-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
              Chapters
            </span>
            <div className="mt-2 text-4xl font-extralight text-[var(--ui-text-primary)]">
              {journeyChapters.length}
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                [ Chapters ]
              </span>
              <h2 className="text-3xl font-light text-[var(--ui-text-primary)]">
                Turning points
              </h2>
            </div>
          </div>

          <div className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] lg:grid-cols-2">
            {journeyChapters.map((chapter) => (
              <section
                key={chapter.id}
                className="bg-[var(--ui-bg-strong)] p-6 sm:p-7"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                  {chapter.dateRange}
                </span>
                <h3 className="mt-3 text-2xl font-light text-[var(--ui-text-primary)]">
                  {chapter.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-muted)]">
                  {chapter.summary}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {chapter.countries.map((country) => (
                    <span
                      key={country}
                      className="rounded-full border border-[var(--ui-border-subtle)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-muted)]"
                    >
                      {country}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {chapter.archiveKeys.map((archiveKey) => {
                    const archive = blogArchivesByMonth.get(archiveKey)
                    if (!archive) return null

                    return (
                      <Link
                        key={archiveKey}
                        href={`/blog/${archive.year}/${archive.slug}`}
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--ui-border-subtle)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-muted)] transition-colors hover:border-[var(--ui-border-strong)] hover:text-[var(--ui-accent)]"
                      >
                        {archive.displayDate}
                        <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                [ Chronological Route ]
              </span>
              <h2 className="text-3xl font-light text-[var(--ui-text-primary)]">
                Month by month
              </h2>
            </div>

            <Link
              href="/maps"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--ui-border-strong)] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--ui-text-primary)] transition-colors hover:border-[var(--ui-accent)] hover:text-[var(--ui-accent)]"
            >
              See the maps
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] md:grid-cols-2 xl:grid-cols-3">
            {blogArchives.map((archive) => (
              <Link
                key={`${archive.year}-${archive.slug}`}
                href={`/blog/${archive.year}/${archive.slug}`}
                className="group bg-[var(--ui-bg-strong)] p-6 transition-colors hover:bg-[var(--ui-bg-soft)]"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                  {archive.displayDate}
                </span>
                <h3 className="mt-3 text-2xl font-light text-[var(--ui-text-primary)] transition-colors group-hover:text-[var(--ui-accent)]">
                  {archive.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-muted)]">
                  {archive.excerpt}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)] transition-colors group-hover:text-[var(--ui-accent)]">
                  Open archive
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
