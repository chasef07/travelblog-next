// @ts-expect-error Bun supplies this built-in module at test runtime.
import { describe, expect, test } from 'bun:test'

import { fullJourneyData, journeyStats } from './comprehensive-map-data'

describe('World journey', () => {
  test('ends the current route in Milan, Interlaken, and Kotor', () => {
    expect(
      fullJourneyData.slice(-3).map((country) => country.stopName),
    ).toEqual(['Milan', 'Interlaken', 'Kotor'])
    expect(fullJourneyData.at(-2)?.name).toBe('Switzerland')
    expect(fullJourneyData.at(-2)?.coordinates).toEqual([46.6863, 7.8632])
    expect(fullJourneyData.at(-1)?.name).toBe('Montenegro')
    expect(fullJourneyData.at(-1)?.coordinates).toEqual([42.4247, 18.7712])
    expect(journeyStats.totalCountries).toBe(26)
    expect(journeyStats.durationMonths).toBe(23)
  })
})
