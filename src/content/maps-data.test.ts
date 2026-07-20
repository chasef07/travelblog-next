// @ts-expect-error Bun supplies this built-in module at test runtime.
import { describe, expect, test } from 'bun:test'

import {
  atlasCatalog,
  compareAtlasPlaces,
  getAtlasProduct,
  rankAtlasPlaces,
} from './maps-data'

describe('Atlas catalog interface', () => {
  test('publishes coherent products with one explicit featured guide', () => {
    expect(atlasCatalog.products.length).toBe(5)
    expect(atlasCatalog.featuredProduct.status).toBe('live')
    expect(atlasCatalog.featuredProduct.checkoutUrl).toStartWith('https://')
    expect(
      atlasCatalog.products.filter((product) => product.featured).length,
    ).toBe(1)
    expect(
      atlasCatalog.products
        .filter((product) => product.status === 'planned')
        .every((product) => !product.checkoutUrl),
    ).toBe(true)
  })

  test('resolves product evidence without caller-side joins', () => {
    const surf = getAtlasProduct('surf-town-atlas')
    const adventure = getAtlasProduct('adventure-atlas')

    expect(surf?.preview.kind).toBe('places')
    expect(surf?.preview.items.length).toBeGreaterThan(0)
    expect(adventure?.preview.kind).toBe('countries')
    expect(adventure?.preview.items.length).toBe(3)
  })

  test('keeps ranking and comparison scores coherent', () => {
    const ranked = rankAtlasPlaces('surf', 'surf-town-atlas')
    const first = ranked[0]
    const second = ranked[1]
    const comparison = compareAtlasPlaces(first.place.slug, second.place.slug)

    expect(ranked).toEqual(rankAtlasPlaces('surf', 'surf-town-atlas'))
    expect(comparison?.left.scores.surf).toBe(first.place.scores.surf)
    expect(comparison?.right.scores.surf).toBe(second.place.scores.surf)
  })
})
