export interface BlogPost {
  id: string
  title: string
  date: string
  location: string
  country?: string
  content: string
  images: BlogImage[]
  excerpt: string
  slug: string
  year: string
  readingTime?: number
  tags?: string[]
}

export interface BlogImage {
  src: string
  alt: string
  caption?: string
}
