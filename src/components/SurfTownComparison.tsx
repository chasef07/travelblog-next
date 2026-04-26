'use client'

import { Fragment, useMemo, useState } from 'react'

type ComparePlace = {
  id: string
  slug: string
  name: string
  country: string
  shortVerdict: string
  idealStay: string
  waveType: string
  boardLevel: string
  seasonality: string
  internetNote: string
  costNote: string
  townDensity: string
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
}

const scoreRows: Array<keyof ComparePlace['scores']> = [
  'surf',
  'workability',
  'walkability',
  'beauty',
  'community',
  'value',
]

function formatLabel(value: string) {
  return value.replace(/([A-Z])/g, ' $1')
}

export default function SurfTownComparison({
  places,
}: {
  places: ComparePlace[]
}) {
  const [leftSlug, setLeftSlug] = useState(places[0]?.slug ?? '')
  const [rightSlug, setRightSlug] = useState(
    places[1]?.slug ?? places[0]?.slug ?? '',
  )

  const leftPlace = useMemo(
    () => places.find((place) => place.slug === leftSlug) ?? places[0],
    [leftSlug, places],
  )
  const rightPlace = useMemo(
    () =>
      places.find((place) => place.slug === rightSlug) ??
      places[1] ??
      places[0],
    [rightSlug, places],
  )

  if (!leftPlace || !rightPlace) {
    return null
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 rounded-2xl border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] p-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
          [ Compare ]
        </span>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
              Left place
            </span>
            <select
              value={leftSlug}
              onChange={(event) => setLeftSlug(event.target.value)}
              className="w-full rounded-xl border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] px-4 py-3 text-sm text-[var(--ui-text-primary)] focus:outline-none"
            >
              {places.map((place) => (
                <option key={place.slug} value={place.slug}>
                  {place.name}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
              Right place
            </span>
            <select
              value={rightSlug}
              onChange={(event) => setRightSlug(event.target.value)}
              className="w-full rounded-xl border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] px-4 py-3 text-sm text-[var(--ui-text-primary)] focus:outline-none"
            >
              {places.map((place) => (
                <option key={place.slug} value={place.slug}>
                  {place.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] lg:grid-cols-[0.65fr_1fr_1fr]">
        <div className="hidden bg-[var(--ui-bg-strong)] p-5 lg:block" />
        <div className="bg-[var(--ui-bg-strong)] p-5 sm:p-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
            {leftPlace.country}
          </span>
          <h3 className="mt-2 text-2xl font-light text-[var(--ui-text-primary)]">
            {leftPlace.name}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-muted)]">
            {leftPlace.shortVerdict}
          </p>
        </div>
        <div className="bg-[var(--ui-bg-strong)] p-5 sm:p-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
            {rightPlace.country}
          </span>
          <h3 className="mt-2 text-2xl font-light text-[var(--ui-text-primary)]">
            {rightPlace.name}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--ui-text-muted)]">
            {rightPlace.shortVerdict}
          </p>
        </div>

        {scoreRows.map((row) => (
          <Fragment key={row}>
            <div
              key={`${row}-label`}
              className="bg-[var(--ui-bg-strong)] p-4 lg:p-5"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
                {formatLabel(row)}
              </span>
            </div>
            <div
              key={`${row}-left`}
              className="bg-[var(--ui-bg-strong)] p-4 lg:p-5"
            >
              <span className="font-editorial text-3xl leading-none text-[var(--ui-accent)]">
                {leftPlace.scores[row].toFixed(1)}
              </span>
            </div>
            <div
              key={`${row}-right`}
              className="bg-[var(--ui-bg-strong)] p-4 lg:p-5"
            >
              <span className="font-editorial text-3xl leading-none text-[var(--ui-accent)]">
                {rightPlace.scores[row].toFixed(1)}
              </span>
            </div>
          </Fragment>
        ))}

        <div className="bg-[var(--ui-bg-strong)] p-4 lg:p-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
            Ideal stay
          </span>
        </div>
        <div className="bg-[var(--ui-bg-strong)] p-4 lg:p-5 text-sm text-[var(--ui-text-secondary)]">
          {leftPlace.idealStay}
        </div>
        <div className="bg-[var(--ui-bg-strong)] p-4 lg:p-5 text-sm text-[var(--ui-text-secondary)]">
          {rightPlace.idealStay}
        </div>

        <div className="bg-[var(--ui-bg-strong)] p-4 lg:p-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
            Wave type
          </span>
        </div>
        <div className="bg-[var(--ui-bg-strong)] p-4 lg:p-5 text-sm text-[var(--ui-text-secondary)]">
          {leftPlace.waveType}
        </div>
        <div className="bg-[var(--ui-bg-strong)] p-4 lg:p-5 text-sm text-[var(--ui-text-secondary)]">
          {rightPlace.waveType}
        </div>

        <div className="bg-[var(--ui-bg-strong)] p-4 lg:p-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
            Board level
          </span>
        </div>
        <div className="bg-[var(--ui-bg-strong)] p-4 lg:p-5 text-sm text-[var(--ui-text-secondary)]">
          {leftPlace.boardLevel}
        </div>
        <div className="bg-[var(--ui-bg-strong)] p-4 lg:p-5 text-sm text-[var(--ui-text-secondary)]">
          {rightPlace.boardLevel}
        </div>

        <div className="bg-[var(--ui-bg-strong)] p-4 lg:p-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
            Town density
          </span>
        </div>
        <div className="bg-[var(--ui-bg-strong)] p-4 lg:p-5 text-sm text-[var(--ui-text-secondary)]">
          {leftPlace.townDensity}
        </div>
        <div className="bg-[var(--ui-bg-strong)] p-4 lg:p-5 text-sm text-[var(--ui-text-secondary)]">
          {rightPlace.townDensity}
        </div>

        <div className="bg-[var(--ui-bg-strong)] p-4 lg:p-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
            Internet
          </span>
        </div>
        <div className="bg-[var(--ui-bg-strong)] p-4 lg:p-5 text-sm text-[var(--ui-text-secondary)]">
          {leftPlace.internetNote}
        </div>
        <div className="bg-[var(--ui-bg-strong)] p-4 lg:p-5 text-sm text-[var(--ui-text-secondary)]">
          {rightPlace.internetNote}
        </div>

        <div className="bg-[var(--ui-bg-strong)] p-4 lg:p-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
            Cost note
          </span>
        </div>
        <div className="bg-[var(--ui-bg-strong)] p-4 lg:p-5 text-sm text-[var(--ui-text-secondary)]">
          {leftPlace.costNote}
        </div>
        <div className="bg-[var(--ui-bg-strong)] p-4 lg:p-5 text-sm text-[var(--ui-text-secondary)]">
          {rightPlace.costNote}
        </div>

        <div className="bg-[var(--ui-bg-strong)] p-4 lg:p-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
            Seasonality
          </span>
        </div>
        <div className="bg-[var(--ui-bg-strong)] p-4 lg:p-5 text-sm text-[var(--ui-text-secondary)]">
          {leftPlace.seasonality}
        </div>
        <div className="bg-[var(--ui-bg-strong)] p-4 lg:p-5 text-sm text-[var(--ui-text-secondary)]">
          {rightPlace.seasonality}
        </div>
      </div>
    </section>
  )
}
