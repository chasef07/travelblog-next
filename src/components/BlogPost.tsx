import Image from 'next/image'
import { BlogPost as BlogPostType } from '../types/blog'

interface BlogPostProps {
  post: BlogPostType
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <div className="max-w-none">
      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div className="text-lg leading-relaxed text-white/70 whitespace-pre-wrap mb-12 font-light">
          {post.content}
        </div>

        {/* Images */}
        {post.images && post.images.length > 0 && (
          <div className="grid gap-8 my-12">
            {post.images.map((image, index) => (
              <figure key={index} className="relative group">
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[4/3] overflow-hidden border border-white/10">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                {image.caption && (
                  <figcaption className="text-sm text-white/40 text-center mt-4 font-mono tracking-wider">
                    {image.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
