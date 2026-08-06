// @ts-expect-error Bun supplies this built-in module at test runtime.
import { describe, expect, test } from 'bun:test'

import { getAllCountries } from './countries-data'

describe('Country navigation', () => {
  test('includes the current European route in the World flag list', () => {
    const countryNames = getAllCountries().map((country) => country.name)

    expect(countryNames).toContain('Italy')
    expect(countryNames).toContain('Switzerland')
    expect(countryNames).toContain('Montenegro')
  })
})
