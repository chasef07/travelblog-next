import {
  allBlogPosts as sourcePosts,
  blogArchives as sourceArchives,
  type BlogArchive as SourceArchive,
} from '@/content/blog-registry'
import type { BlogMetadata, BlogPost } from '@/types/blog'

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

function monthSlug(date: string): string {
  const isoDate = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date)
  const parsed = new Date(isoDate ? `${date}T00:00:00Z` : `${date} UTC`)
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Malformed Blog date: ${date}`)
  }
  return parsed
    .toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' })
    .toLowerCase()
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
  const posts: PublishedPost[] = postRecords.map((post) => ({
    ...post,
    readingTime: calculateReadingTime(post.content),
    url: `/blog/${post.year}/${post.slug}`,
  }))
  const archives: BlogArchive[] = archiveRecords.map((archive) => ({
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

export const archiveCards: BlogMetadata[] = archives.map((archive) => ({
  title: archive.title,
  date: archive.displayDate,
  excerpt: archive.excerpt,
  image: archive.image,
  link: archive.url,
}))

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
