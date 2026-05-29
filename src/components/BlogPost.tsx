'use client'

import { BlogPost as BlogPostType } from '../types/blog'
import { Lightbox, LightboxImage, useLightbox } from './Lightbox'

interface BlogPostProps {
  post: BlogPostType
}

export default function BlogPost({ post }: BlogPostProps) {
  const lightboxImages =
    post.images?.map((img) => ({
      src: img.src,
      alt: img.alt,
      caption: img.caption,
      orientation: img.orientation,
    })) || []

  const lightbox = useLightbox(lightboxImages)
  const paragraphs = post.content.split(/\n{2,}/).filter(Boolean)

  return (
    <div className="max-w-none">
      {/* Content */}
      <div className="mb-10 max-w-[68ch] sm:mb-12">
        <div className="space-y-6 text-[var(--ui-text-muted)] font-light text-[clamp(1rem,2.8vw,1.14rem)] leading-8 sm:leading-9">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="whitespace-pre-line break-words">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <div className="my-10 grid gap-6 sm:my-12 sm:gap-8">
          {post.images.map((image, index) => (
            <LightboxImage
              key={index}
              src={image.src}
              alt={image.alt}
              caption={image.caption}
              orientation={image.orientation}
              onClick={() => lightbox.open(index)}
              priority={index === 0}
            />
          ))}
        </div>
      )}

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
