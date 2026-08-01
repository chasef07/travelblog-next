// @ts-expect-error Bun supplies this built-in module at test runtime.
import { describe, expect, test } from 'bun:test'

import { fullJourneyData, journeyStats } from './comprehensive-map-data'

describe('World journey', () => {
  test('ends the current route in Ericeira, Milan, and Interlaken', () => {
    expect(
      fullJourneyData.slice(-3).map((country) => country.stopName),
    ).toEqual(['Ericeira', 'Milan', 'Interlaken'])
    expect(fullJourneyData.at(-2)?.name).toBe('Italy')
    expect(fullJourneyData.at(-2)?.coordinates).toEqual([45.4642, 9.19])
    expect(fullJourneyData.at(-1)?.name).toBe('Switzerland')
    expect(fullJourneyData.at(-1)?.coordinates).toEqual([46.6863, 7.8632])
    expect(journeyStats.totalCountries).toBe(25)
    expect(journeyStats.durationMonths).toBe(23)
  })
})
