import { BlogMetadata } from '../types/blog'
import { blogArchives } from './blog-registry'

// Lightweight metadata for blog grid - images and excerpts only
export const blogMetadata: BlogMetadata[] = blogArchives.map((archive) => ({
  title: archive.title,
  date: archive.displayDate,
  excerpt: archive.excerpt,
  image: archive.image,
  link: `/blog/${archive.year}/${archive.slug}`,
}))

// Function to calculate reading time
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}
