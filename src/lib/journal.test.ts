// @ts-expect-error Bun supplies this built-in module at test runtime.
import { describe, expect, test } from 'bun:test'

import { archives, posts } from '@/content/blog/publication'
import {
  buildJournalYears,
  findClosestEntriesByYear,
  getCountryFlag,
} from './journal'

describe('Journal chronology', () => {
  test('derives every month from posts and sorts newest first', () => {
    const years = buildJournalYears(posts, archives)

    expect(years.map(({ year }) => year)).toEqual([2026, 2025, 2024])
    expect(years[0].months[0].key).toBe('2026-07')
    expect(
      years
        .find(({ year }) => year === 2025)
        ?.months.find(({ key }) => key === '2025-09')?.posts,
    ).toHaveLength(1)
  })

  test('finds the nearest entry to today in each journal year', () => {
    const echoes = findClosestEntriesByYear(
      new Date('2026-07-30T12:00:00Z'),
      posts,
    )

    expect(echoes.map(({ year }) => year)).toEqual([2026, 2025, 2024])
    expect(echoes[0].post.date).toBe('July 26, 2026')
    expect(echoes[0].offsetDays).toBe(-4)
    expect(echoes[1].post.date).toBe('2025-08-02')
    expect(echoes[1].offsetDays).toBe(3)
  })

  test('normalizes country aliases to one flag', () => {
    expect(getCountryFlag('USA')).toBe('🇺🇸')
    expect(getCountryFlag('United States')).toBe('🇺🇸')
  })
})
