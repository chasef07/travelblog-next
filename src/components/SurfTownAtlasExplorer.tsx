'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight, MapPin } from 'lucide-react'

type SurfTownEntry = {
  id: string
  slug: string
  name: string
  country: string
  region: string
  shortVerdict: string
  bestFor: string[]
  notFor: string[]
  scores: {
    surf: number
    workability: number
    walkability: number
    beauty: number
    community: number
    value: number
  }
  relatedPosts: Array<{
    slug: string
    year: string
    title: string
  }>
}

type SortLens = 'balanced' | 'surf' | 'workability' | 'walkability' | 'value'

const sortOptions: Array<{ id: SortLens; label: string }> = [
  { id: 'balanced', label: 'Best overall' },
  { id: 'surf', label: 'Best surf' },
  { id: 'workability', label: 'Best for work' },
  { id: 'walkability', label: 'Most walkable' },
  { id: 'value', label: 'Best value' },
]

function getPlaceScore(place: SurfTownEntry, lens: SortLens) {
  if (lens === 'balanced') {
    return (
      place.scores.surf * 0.35 +
      place.scores.workability * 0.2 +
      place.scores.walkability * 0.15 +
      place.scores.beauty * 0.15 +
      place.scores.value * 0.15
    )
  }

  return place.scores[lens]
}

function formatScore(value: number) {
  return value.toFixed(1)
}

export default function SurfTownAtlasExplorer({ places }: { places: SurfTownEntry[] }) {
  const [selectedRegion, setSelectedRegion] = useState<string>('all')
  const [sortLens, setSortLens] = useState<SortLens>('balanced')

  const regions = ['all', ...Array.from(new Set(places.map((place) => place.region)))]

  const filteredPlaces = places
    .filter((place) => selectedRegion === 'all' || place.region === selectedRegion)
    .sort((a, b) => getPlaceScore(b, sortLens) - getPlaceScore(a, sortLens))

  const topPick = filteredPlaces[0]

  return (
    <div className="space-y-10">
      <section className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] lg:grid-cols-[1.2fr_0.8fr]">
        <div className="bg-[var(--ui-bg-strong)] p-6 sm:p-7">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
            [ How to use this ]
          </span>
          <h3 className="mt-3 text-2xl font-light text-[var(--ui-text-primary)]">
            Pick the lifestyle you actually want
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--ui-text-muted)] sm:text-base">
            This atlas is not trying to name one universal winner. Sort by the lifestyle constraint you care about most, then use the strengths, weaknesses, and related dispatches to judge fit.
          </p>
        </div>

        <div className="bg-[var(--ui-bg-strong)] p-6 sm:p-7">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
            [ Current top pick ]
          </span>
          {topPick ? (
            <>
              <div className="mt-3 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-light text-[var(--ui-text-primary)]">{topPick.name}</h3>
                  <p className="mt-2 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
                    <MapPin className="h-3 w-3" />
                    {topPick.country}
                  </p>
                </div>
                <div className="rounded-2xl border border-[var(--ui-border-strong)] px-4 py-3 text-center">
                  <div className="font-editorial text-3xl leading-none text-[var(--ui-accent)]">
                    {formatScore(getPlaceScore(topPick, sortLens))}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
                    {sortOptions.find((option) => option.id === sortLens)?.label}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--ui-text-secondary)]">{topPick.shortVerdict}</p>
            </>
          ) : (
            <p className="mt-3 text-sm text-[var(--ui-text-muted)]">No places match the current filter.</p>
          )}
        </div>
      </section>

      <div className="flex flex-col gap-4 rounded-2xl border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] p-5">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
            [ Filters ]
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setSortLens(option.id)}
              className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${
                sortLens === option.id
                  ? 'border-[var(--ui-accent)] bg-[var(--ui-accent)] text-[var(--ui-on-accent)]'
                  : 'border-[var(--ui-border-subtle)] text-[var(--ui-text-muted)] hover:border-[var(--ui-border-strong)] hover:text-[var(--ui-text-primary)]'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {regions.map((region) => (
            <button
              key={region}
              type="button"
              onClick={() => setSelectedRegion(region)}
              className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${
                selectedRegion === region
                  ? 'border-[var(--ui-border-strong)] bg-[var(--ui-bg-soft)] text-[var(--ui-text-primary)]'
                  : 'border-[var(--ui-border-subtle)] text-[var(--ui-text-muted)] hover:border-[var(--ui-border-strong)] hover:text-[var(--ui-text-primary)]'
              }`}
            >
              {region === 'all' ? 'All regions' : region}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[var(--ui-border-subtle)]">
        <div className="hidden grid-cols-[1.3fr_repeat(5,0.55fr)] border-b border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] px-5 py-4 lg:grid">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">Place</span>
          <span className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">Surf</span>
          <span className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">Work</span>
          <span className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">Walk</span>
          <span className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">Beauty</span>
          <span className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">Value</span>
        </div>

        <div className="grid gap-px bg-[var(--ui-border-subtle)]">
          {filteredPlaces.map((place, index) => (
            <article key={place.id} className="bg-[var(--ui-bg-strong)] p-5 sm:p-6">
              <div className="grid gap-5 lg:grid-cols-[1.3fr_repeat(5,0.55fr)] lg:items-start">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
                        #{index + 1} · {place.region}
                      </span>
                      <Link
                        href={`/places/${place.slug}`}
                        className="mt-2 block text-2xl font-light text-[var(--ui-text-primary)] transition-colors hover:text-[var(--ui-accent)]"
                      >
                        {place.name}
                      </Link>
                      <p className="mt-2 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
                        <MapPin className="h-3 w-3" />
                        {place.country}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[var(--ui-border-strong)] px-4 py-3 text-center lg:hidden">
                      <div className="font-editorial text-3xl leading-none text-[var(--ui-accent)]">
                        {formatScore(getPlaceScore(place, sortLens))}
                      </div>
                      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
                        {sortOptions.find((option) => option.id === sortLens)?.label}
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-[var(--ui-text-secondary)]">{place.shortVerdict}</p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-soft)] p-3">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
                        Why it wins
                      </span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {place.bestFor.slice(0, 3).map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-[var(--ui-border-subtle)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-muted)]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-soft)] p-3">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
                        Why it fails
                      </span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {place.notFor.slice(0, 3).map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-[var(--ui-border-subtle)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-muted)]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {place.relatedPosts.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      <Link
                        href={`/places/${place.slug}`}
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--ui-border-strong)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-primary)] transition-colors hover:border-[var(--ui-accent)] hover:text-[var(--ui-accent)]"
                      >
                        Open dossier
                        <ArrowUpRight className="h-3 w-3" />
                      </Link>
                      {place.relatedPosts.slice(0, 2).map((post) => (
                        <Link
                          key={post.slug}
                          href={`/blog/${post.year}/${post.slug}`}
                          className="inline-flex items-center gap-2 rounded-full border border-[var(--ui-border-subtle)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-muted)] transition-colors hover:border-[var(--ui-border-strong)] hover:text-[var(--ui-accent)]"
                        >
                          {post.title}
                          <ArrowUpRight className="h-3 w-3" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <div className="hidden items-center justify-center border-l border-[var(--ui-border-subtle)] text-2xl font-light text-[var(--ui-text-primary)] lg:flex">
                  {formatScore(place.scores.surf)}
                </div>
                <div className="hidden items-center justify-center border-l border-[var(--ui-border-subtle)] text-2xl font-light text-[var(--ui-text-primary)] lg:flex">
                  {formatScore(place.scores.workability)}
                </div>
                <div className="hidden items-center justify-center border-l border-[var(--ui-border-subtle)] text-2xl font-light text-[var(--ui-text-primary)] lg:flex">
                  {formatScore(place.scores.walkability)}
                </div>
                <div className="hidden items-center justify-center border-l border-[var(--ui-border-subtle)] text-2xl font-light text-[var(--ui-text-primary)] lg:flex">
                  {formatScore(place.scores.beauty)}
                </div>
                <div className="hidden items-center justify-center border-l border-[var(--ui-border-subtle)] text-2xl font-light text-[var(--ui-text-primary)] lg:flex">
                  {formatScore(place.scores.value)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
