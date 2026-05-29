import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { generatePageMetadata } from '@/lib/seo'
import { blogArchives, type BlogArchive } from '@/content/blog-registry'
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

function shouldContainArchiveImage(archive: BlogArchive) {
  return archive.imageFit === 'contain' || archive.image.includes('/flags/')
}

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

        <section className="mb-14 grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] md:grid-cols-3">
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
        </section>

        <section>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                [ Chronological Route ]
              </span>
              <h2 className="text-3xl font-light text-[var(--ui-text-primary)]">
                Month by month
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--ui-border-strong)] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--ui-text-primary)] transition-colors hover:border-[var(--ui-accent)] hover:text-[var(--ui-accent)]"
              >
                All stories
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/maps"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--ui-border-strong)] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--ui-text-primary)] transition-colors hover:border-[var(--ui-accent)] hover:text-[var(--ui-accent)]"
              >
                See the maps
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] md:grid-cols-2 xl:grid-cols-3">
            {blogArchives.map((archive) => {
              const containImage = shouldContainArchiveImage(archive)

              return (
                <Link
                  key={`${archive.year}-${archive.slug}`}
                  href={`/blog/${archive.year}/${archive.slug}`}
                  className="group relative min-h-[280px] overflow-hidden bg-[var(--ui-bg-strong)] transition-colors"
                >
                  <Image
                    src={archive.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className={`transition-transform duration-500 group-hover:scale-105 ${
                      containImage ? 'object-contain p-10' : 'object-cover'
                    }`}
                    style={{
                      objectPosition: containImage
                        ? 'center'
                        : archive.imagePosition || 'center 38%',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
                  <div className="relative z-10 flex min-h-[280px] flex-col justify-end p-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                      {archive.displayDate}
                    </span>
                    <h3 className="mt-3 text-2xl font-light text-white">
                      {archive.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/80">
                      {archive.excerpt}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors group-hover:text-white">
                      Open archive
                      <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      </div>
    </main>
  )
}
