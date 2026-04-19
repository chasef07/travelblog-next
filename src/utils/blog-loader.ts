import { BlogPost } from '../types/blog';
import { calculateReadingTime } from '../content/blog-data';
import { blogPostsByMonth, blogPostsBySlug, allBlogPosts } from '../content/blog-registry';

// Simple cache for blog posts
const blogCache = new Map<string, BlogPost[]>();

// Dynamic import function for blog posts
export async function loadBlogPost(year: string, slug: string): Promise<BlogPost | null> {
  const post = blogPostsBySlug.get(`${year}/${slug}`);

  if (!post) {
    return null;
  }

  return {
    ...post,
    readingTime: calculateReadingTime(post.content),
  };
}

// Get posts for a specific year/month
export async function loadBlogPosts(year: string, month?: string): Promise<BlogPost[]> {
  if (month) {
    const cacheKey = `${year}-${month}`;

    if (blogCache.has(cacheKey)) {
      return blogCache.get(cacheKey)!;
    }

    const posts = (blogPostsByMonth.get(cacheKey) || []).map((post) => ({
      ...post,
      readingTime: calculateReadingTime(post.content),
    }));

    blogCache.set(cacheKey, posts);
    return posts;
  }

  return allBlogPosts
    .filter((post) => post.year === year)
    .map((post) => ({
      ...post,
      readingTime: calculateReadingTime(post.content),
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
