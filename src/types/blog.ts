export interface BlogPost {
  id: string;
  title: string;
  date: string;
  location: string;
  content: string;
  images: BlogImage[];
  excerpt: string;
  slug: string;
  year: string;
  readingTime?: number;
}

export interface BlogImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface BlogMetadata {
  title: string;
  date: string;
  excerpt: string;
  image: string;
  link: string;
}