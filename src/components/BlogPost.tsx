'use client'

import { BlogPost as BlogPostType } from '../types/blog'
import { Lightbox, LightboxImage, useLightbox } from './Lightbox'

interface BlogPostProps {
  post: BlogPostType
}

export default function BlogPost({ post }: BlogPostProps) {
  const lightboxImages = post.images?.map(img => ({
    src: img.src,
    alt: img.alt,
    caption: img.caption
  })) || []

  const lightbox = useLightbox(lightboxImages)

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
              <LightboxImage
                key={index}
                src={image.src}
                alt={image.alt}
                caption={image.caption}
                onClick={() => lightbox.open(index)}
                priority={index === 0}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox modal */}
      <Lightbox
        images={lightbox.images}
        initialIndex={lightbox.initialIndex}
        isOpen={lightbox.isOpen}
        onClose={lightbox.close}
      />
    </div>
  )
}
