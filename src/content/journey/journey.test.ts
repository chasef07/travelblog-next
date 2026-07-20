// @ts-expect-error Bun supplies this built-in module at test runtime.
import { describe, expect, test } from 'bun:test'

import {
  getCountryDossierBySlug,
  getJourney,
  resolveCountryName,
} from './index'

describe('Journey interface', () => {
  test('publishes one canonical route and current stop', () => {
    const journey = getJourney()
    const countryNames = journey.route.map((stop) => stop.country.name)

    expect(journey.currentStop.country.name).toBe('Portugal')
    expect(countryNames).toContain('United States')
    expect(countryNames).not.toContain('USA')
    expect(countryNames).not.toContain('Florida, USA')
  })

  test('normalizes legacy United States identities', () => {
    expect(resolveCountryName('USA')).toBe('United States')
    expect(resolveCountryName('Florida, USA')).toBe('United States')
  })

  test('derives route statistics and validates chapter references', () => {
    const journey = getJourney()

    expect(journey.stats.totalBlogPosts).toBeGreaterThan(200)
    expect(journey.stats.totalCountries).toBe(
      journey.route.filter((stop) => stop.country.name !== 'United States')
        .length,
    )
    expect(
      journey.chapters.every((chapter) => chapter.archiveKeys.length > 0),
    ).toBe(true)
  })

  test('owns country content associations', () => {
    const dossier = getCountryDossierBySlug('portugal')

    expect(dossier?.country.name).toBe('Portugal')
    expect(dossier?.posts.every((post) => post.country === 'Portugal')).toBe(
      true,
    )
    expect(dossier?.places.every((place) => place.country === 'Portugal')).toBe(
      true,
    )
  })
})
