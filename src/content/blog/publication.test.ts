// @ts-expect-error Bun supplies this built-in module at test runtime.
import { describe, expect, test } from 'bun:test'

import {
  archives,
  createBlogPublication,
  resolvePublication,
  staticPublicationParams,
} from './publication'

describe('Blog publication interface', () => {
  test('resolves posts, populated archives, empty archives, and missing paths', () => {
    expect(resolvePublication('2026', 'european-living-in-ericeira').kind).toBe(
      'post',
    )
    expect(resolvePublication('2026', 'july').kind).toBe('archive')
    const empty = createBlogPublication([], [archives[0]])
    expect(empty.resolve(String(archives[0].year), archives[0].slug).kind).toBe(
      'empty-archive',
    )
    expect(resolvePublication('2099', 'missing')).toEqual({ kind: 'missing' })
  })

  test('publishes unique static paths that all resolve', () => {
    const paths = staticPublicationParams()
    const keys = paths.map(({ year, slug }) => `${year}/${slug}`)

    expect(new Set(keys).size).toBe(keys.length)
    expect(
      paths.every(
        ({ year, slug }) => resolvePublication(year, slug).kind !== 'missing',
      ),
    ).toBe(true)
  })

  test('derives archive routes for months represented by posts', () => {
    const september = resolvePublication('2025', 'september')

    expect(september.kind).toBe('archive')
    if (september.kind !== 'archive') return
    expect(september.posts).toHaveLength(1)
  })

  test('uses deterministic reading times and canonical archive URLs', () => {
    const july = resolvePublication('2026', 'july')

    expect(july.kind).toBe('archive')
    if (july.kind !== 'archive') return

    expect(july.url).toBe('/blog/2026/july')
    expect(july.posts.every((post) => post.readingTime > 0)).toBe(true)
    expect(archives.every((archive) => archive.url.startsWith('/blog/'))).toBe(
      true,
    )
  })

  test('reserves month slugs even before an Archive is published', () => {
    const post = resolvePublication('2026', 'european-living-in-ericeira')
    if (post.kind !== 'post') throw new Error('Expected fixture Post')

    expect(() =>
      createBlogPublication([{ ...post.post, slug: 'january' }], []),
    ).toThrow('collides with Archive')
  })

  test('rejects malformed Archive calendar identities', () => {
    expect(() =>
      createBlogPublication(
        [],
        [{ ...archives[0], slug: 'not-a-month', date: 'not-a-date' }],
      ),
    ).toThrow('Malformed Blog date')
    expect(() =>
      createBlogPublication(
        [],
        [{ ...archives[0], year: archives[0].year - 1 }],
      ),
    ).toThrow('Invalid Archive calendar identity')
  })
})
