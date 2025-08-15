import Image from 'next/image'
import { BlogPost as BlogPostType } from '../types/blog'

interface BlogPostProps {
  post: BlogPostType
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="max-w-4xl mx-auto px-6 py-8">
      <header className="mb-8">
        <div className="flex items-center gap-2 text-sm text-[var(--muted-text-color)] mb-4">
          <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
          </svg>
          <span>{post.location}</span>
          <span>•</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          {post.readingTime && (
            <>
              <span>•</span>
              <span>{post.readingTime} min read</span>
            </>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary-color)] leading-tight">
          {post.title}
        </h1>
      </header>

      <div className="prose prose-lg max-w-none">
        <div className="text-lg leading-relaxed text-[var(--text-color)] whitespace-pre-wrap mb-8">
          {post.content}
        </div>

        {post.images && post.images.length > 0 && (
          <div className="grid gap-6 my-8">
            {post.images.map((image, index) => (
              <figure key={index} className="relative">
                <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-md">
                  <Image 
                    src={image.src} 
                    alt={image.alt} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                {image.caption && (
                  <figcaption className="text-sm text-[var(--muted-text-color)] text-center mt-2 italic">
                    {image.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
      </div>

      <footer className="mt-12 pt-8 border-t border-[var(--border-color)]">
        <div className="flex items-center justify-between">
          <div className="text-sm text-[var(--muted-text-color)]">
            Published on {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long', 
              day: 'numeric'
            })}
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-sm text-[var(--secondary-color)] hover:text-[var(--primary-color)] transition-colors">
              <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.50-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92S19.61 16.08 18 16.08z"/>
              </svg>
              Share
            </button>
          </div>
        </div>
      </footer>
    </article>
  )
}