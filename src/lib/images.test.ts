import { describe, expect, test } from 'bun:test'
import { readFileSync } from 'node:fs'
import { extname, join } from 'node:path'

import { posts } from '@/content/blog/publication'
import { foodData } from '@/content/food-data'
import { countryPages } from '@/content/world-journey'
import { isPreoptimizedImage } from './images'

describe('isPreoptimizedImage', () => {
  test('recognizes WebP images', () => {
    expect(isPreoptimizedImage('/assets/photo.webp')).toBe(true)
    expect(isPreoptimizedImage('/assets/photo.WEBP')).toBe(true)
  })

  test('keeps other image formats eligible for optimization', () => {
    expect(isPreoptimizedImage('/assets/photo.jpg')).toBe(false)
  })

  test('keeps food image contents consistent with their extensions', () => {
    const imagePaths = new Set([
      ...posts.flatMap((post) =>
        post.images
          .map((image) => image.src)
          .filter((imagePath) => imagePath.includes('/images/food/')),
      ),
      ...Object.values(foodData).flatMap((dishes) =>
        dishes.map((dish) => dish.image),
      ),
    ])

    for (const imagePath of imagePaths) {
      const image = readFileSync(join(process.cwd(), 'public', imagePath))
      const extension = extname(imagePath).toLowerCase()

      if (extension === '.jpg' || extension === '.jpeg') {
        expect(
          image.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff])),
        ).toBe(true)
      }

      if (extension === '.webp') {
        expect(image.subarray(0, 4).toString()).toBe('RIFF')
        expect(image.subarray(8, 12).toString()).toBe('WEBP')
      }
    }
  })

  test('places every food collection on an existing country page', () => {
    const countryNames = new Set(countryPages.map((country) => country.name))

    expect(
      Object.keys(foodData).filter((country) => !countryNames.has(country)),
    ).toEqual([])
  })
})
