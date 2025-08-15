import { BlogPost } from '../types/blog';
import { calculateReadingTime } from '../content/blog-data';

// Simple cache for blog posts
const blogCache = new Map<string, BlogPost[]>();

// Dynamic import function for blog posts
export async function loadBlogPost(year: string, slug: string): Promise<BlogPost | null> {
  try {
    const blogModule = await import(`../content/blog-posts/${year}-${getMonthFromSlug(slug)}.ts`);
    const posts = Object.values(blogModule)[0] as BlogPost[];
    const post = posts.find(p => p.slug === slug);
    
    if (post) {
      // Add reading time calculation
      post.readingTime = calculateReadingTime(post.content);
    }
    
    return post || null;
  } catch (error) {
    console.error(`Failed to load blog post: ${year}/${slug}`, error);
    return null;
  }
}

// Get posts for a specific year/month
export async function loadBlogPosts(year: string, month?: string): Promise<BlogPost[]> {
  try {
    if (month) {
      const cacheKey = `${year}-${month}`;
      
      // Check cache first
      if (blogCache.has(cacheKey)) {
        return blogCache.get(cacheKey)!;
      }
      
      const blogModule = await import(`../content/blog-posts/${year}-${month}.ts`);
      const posts = Object.values(blogModule)[0] as BlogPost[];
      const processedPosts = posts.map(post => ({
        ...post,
        readingTime: calculateReadingTime(post.content)
      }));
      
      // Cache the result
      blogCache.set(cacheKey, processedPosts);
      return processedPosts;
    }
    
    // If no month specified, load all posts for the year
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 
                  'july', 'august', 'september', 'october', 'november', 'december'];
    
    const allPosts: BlogPost[] = [];
    
    for (const month of months) {
      try {
        const blogModule = await import(`../content/blog-posts/${year}-${month}.ts`);
        const posts = Object.values(blogModule)[0] as BlogPost[];
        allPosts.push(...posts);
      } catch {
        // Month file doesn't exist, continue
      }
    }
    
    return allPosts.map(post => ({
      ...post,
      readingTime: calculateReadingTime(post.content)
    })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
  } catch (error) {
    console.error(`Failed to load blog posts: ${year}/${month}`, error);
    return [];
  }
}

function getMonthFromSlug(slug: string): string {
  // Map of actual slugs to months where we have content
  const monthMappings: Record<string, string> = {
    'january': 'january',
    'february': 'february', 
    'march': 'march',
    'april': 'april',
    'may': 'may',
    'june': 'june',
    'july': 'july', 
    'august': 'august',
    'september': 'september',
    'october': 'october',
    'november': 'november',
    'december': 'december',
    // For individual post slugs that exist
    'nong-khiaw-excursion': 'january',
    'nong-khiaw-preparation': 'january',
  };
  
  // Direct slug match
  if (monthMappings[slug]) {
    return monthMappings[slug];
  }
  
  // Check if slug contains month name
  for (const [key, month] of Object.entries(monthMappings)) {
    if (slug.includes(key)) {
      return month;
    }
  }
  
  // Default fallback
  return 'january';
}