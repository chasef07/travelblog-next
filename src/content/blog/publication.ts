import {
  allBlogPosts as sourcePosts,
  blogArchives as sourceArchives,
  type BlogArchive as SourceArchive,
} from '@/content/blog-registry'
import type { BlogPost } from '@/types/blog'

export type PublishedPost = BlogPost & {
  readingTime: number
  url: string
}

export type BlogArchive = SourceArchive & {
  url: string
}

export type PublicationOutcome =
  | { kind: 'post'; post: PublishedPost; url: string }
  | {
      kind: 'archive'
      archive: BlogArchive
      posts: PublishedPost[]
      url: string
    }
  | { kind: 'empty-archive'; archive: BlogArchive; url: string }
  | { kind: 'missing' }

export function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

export function parseBlogDate(date: string): Date {
  const isoDate = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date)
  const parsed = new Date(isoDate ? `${date}T00:00:00Z` : `${date} UTC`)
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Malformed Blog date: ${date}`)
  }
  return parsed
}

export function monthSlug(date: string): string {
  return parseBlogDate(date)
    .toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' })
    .toLowerCase()
}

function calendarMonthKey(date: string): string {
  const parsed = parseBlogDate(date)
  return `${parsed.getUTCFullYear()}-${parsed.getUTCMonth()}`
}

function deriveMissingArchives(
  postRecords: BlogPost[],
  archiveRecords: SourceArchive[],
): SourceArchive[] {
  const knownMonths = new Set(
    archiveRecords.map((archive) => calendarMonthKey(archive.date)),
  )
  const generated: SourceArchive[] = []

  for (const post of postRecords) {
    const key = calendarMonthKey(post.date)
    if (knownMonths.has(key)) continue
    knownMonths.add(key)

    const date = parseBlogDate(post.date)
    const displayDate = date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    })

    generated.push({
      year: date.getUTCFullYear(),
      slug: monthSlug(post.date),
      title: `${displayDate}: ${post.location}`,
      date: post.date,
      displayDate,
      excerpt: post.excerpt,
      image: post.images[0]?.src ?? '/assets/images/misc/posttrip.jpg',
    })
  }

  return [...archiveRecords, ...generated].sort((left, right) => {
    const leftDate = parseBlogDate(left.date)
    const rightDate = parseBlogDate(right.date)
    const leftMonth = leftDate.getUTCFullYear() * 12 + leftDate.getUTCMonth()
    const rightMonth = rightDate.getUTCFullYear() * 12 + rightDate.getUTCMonth()
    return rightMonth - leftMonth
  })
}

const reservedArchiveSlugs = new Set([
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
])

function assertUnique<T>(
  records: T[],
  keyOf: (record: T) => string,
  label: string,
) {
  const seen = new Set<string>()
  for (const record of records) {
    const key = keyOf(record)
    if (seen.has(key)) throw new Error(`Duplicate ${label}: ${key}`)
    seen.add(key)
  }
}

export function createBlogPublication(
  postRecords: BlogPost[],
  archiveRecords: SourceArchive[],
) {
  const completeArchiveRecords = deriveMissingArchives(
    postRecords,
    archiveRecords,
  )
  const posts: PublishedPost[] = postRecords.map((post) => ({
    ...post,
    readingTime: calculateReadingTime(post.content),
    url: `/blog/${post.year}/${post.slug}`,
  }))
  const archives: BlogArchive[] = completeArchiveRecords.map((archive) => ({
    ...archive,
    url: `/blog/${archive.year}/${archive.slug}`,
  }))
  const postsByPath = new Map(posts.map((post) => [post.url, post]))
  const archivesByPath = new Map(
    archives.map((archive) => [archive.url, archive]),
  )

  assertUnique(posts, (post) => post.url, 'Post path')
  assertUnique(posts, (post) => post.id, 'Post identity')
  assertUnique(archives, (archive) => archive.url, 'Archive path')
  for (const archive of archives) {
    const date = parseBlogDate(archive.date)
    if (
      !reservedArchiveSlugs.has(archive.slug) ||
      monthSlug(archive.date) !== archive.slug ||
      date.getUTCFullYear() !== archive.year
    ) {
      throw new Error(`Invalid Archive calendar identity: ${archive.url}`)
    }
  }
  for (const post of posts) {
    if (reservedArchiveSlugs.has(post.slug)) {
      throw new Error(`Post path collides with Archive: ${post.url}`)
    }
    monthSlug(post.date)
  }

  function resolve(year: string, slug: string): PublicationOutcome {
    const url = `/blog/${year}/${slug}`
    const post = postsByPath.get(url)
    if (post) return { kind: 'post', post, url }

    const archive = archivesByPath.get(url)
    if (!archive) return { kind: 'missing' }

    const archivePosts = posts.filter(
      (candidate) =>
        candidate.year === year && monthSlug(candidate.date) === archive.slug,
    )
    return archivePosts.length
      ? { kind: 'archive', archive, posts: archivePosts, url }
      : { kind: 'empty-archive', archive, url }
  }

  function staticParams() {
    return [...posts, ...archives].map(({ url }) => {
      const [, , year, slug] = url.split('/')
      return { year, slug }
    })
  }

  return { posts, archives, resolve, staticParams }
}

const publication = createBlogPublication(sourcePosts, sourceArchives)

export const posts = publication.posts
export const archives = publication.archives
export const resolvePublication = publication.resolve
export const staticPublicationParams = publication.staticParams

export const feedPublications = archives
export const sitemapPublications = [...archives, ...posts]

export function getArchiveForPost(post: BlogPost): BlogArchive | undefined {
  return archives.find(
    (archive) =>
      String(archive.year) === post.year &&
      archive.slug === monthSlug(post.date),
  )
}

export function getPostsForCountry(countryName: string): PublishedPost[] {
  return posts.filter((post) => post.country === countryName)
}

export function getArchivesForCountry(countryName: string): BlogArchive[] {
  return [
    ...new Map(
      getPostsForCountry(countryName)
        .map(getArchiveForPost)
        .filter((archive): archive is BlogArchive => Boolean(archive))
        .map((archive) => [archive.url, archive]),
    ).values(),
  ]
}

export function getPostCardImage(post: BlogPost): string {
  return (
    post.images[0]?.src ??
    getArchiveForPost(post)?.image ??
    '/assets/images/misc/posttrip.jpg'
  )
}

export function findPostsBySlug(slugs: string[]): PublishedPost[] {
  const wanted = new Set(slugs)
  return posts.filter((post) => wanted.has(post.slug))
}
