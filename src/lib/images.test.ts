import { describe, expect, test } from 'bun:test'

import { isPreoptimizedImage } from './images'

describe('isPreoptimizedImage', () => {
  test('recognizes WebP images', () => {
    expect(isPreoptimizedImage('/assets/photo.webp')).toBe(true)
    expect(isPreoptimizedImage('/assets/photo.WEBP')).toBe(true)
  })

  test('keeps other image formats eligible for optimization', () => {
    expect(isPreoptimizedImage('/assets/photo.jpg')).toBe(false)
  })
})
