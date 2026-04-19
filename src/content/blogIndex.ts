import { blogArchives } from '@/content/blog-registry'

export type BlogMeta = {
  year: number
  slug: string
  title: string
  date: string
  displayDate: string
  excerpt: string
  image: string
}

export const blogIndex: BlogMeta[] = blogArchives
