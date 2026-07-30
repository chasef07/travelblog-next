import Image from 'next/image'
import { Fragment } from 'react'

import { getPostCardImage } from '@/content/blog/publication'
import { cn } from '@/lib/utils'
import type { BlogImage, BlogPost as BlogPostType } from '@/types/blog'

function PostImage({
  image,
  priority = false,
}: {
  image: BlogImage
  priority?: boolean
}) {
  return (
    <figure className="flex flex-col gap-3">
      <div
        className={cn(
          'relative overflow-hidden rounded-lg border bg-muted',
          image.orientation === 'portrait'
            ? 'mx-auto aspect-[3/4] w-full max-w-lg'
            : image.orientation === 'square'
              ? 'mx-auto aspect-square w-full max-w-xl'
              : 'aspect-[16/10] w-full',
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
          priority={priority}
        />
      </div>
      {image.caption && (
        <figcaption className="text-center text-sm text-muted-foreground">
          {image.caption}
        </figcaption>
      )}
    </figure>
  )
}

export function PostBody({ post }: { post: BlogPostType }) {
  const paragraphs = post.content.split(/\n{2,}/).filter(Boolean)
  const heroImage: BlogImage =
    post.images[0] ??
    ({
      src: getPostCardImage(post),
      alt: `${post.location} — ${post.title}`,
      orientation: 'landscape',
    } satisfies BlogImage)
  const inlineImages = post.images.slice(1)
  const imagesByParagraph = new Map<number, BlogImage[]>()

  inlineImages.forEach((image, index) => {
    const paragraph = Math.max(
      1,
      Math.round(((index + 1) * paragraphs.length) / (inlineImages.length + 1)),
    )
    imagesByParagraph.set(paragraph, [
      ...(imagesByParagraph.get(paragraph) ?? []),
      image,
    ])
  })

  return (
    <div className="flex flex-col gap-8">
      <PostImage image={heroImage} priority />

      <div className="flex max-w-[68ch] flex-col gap-6 text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9">
        {paragraphs.map((paragraph, index) => {
          const followingImages = imagesByParagraph.get(index + 1) ?? []

          return (
            <Fragment key={index}>
              <p className="whitespace-pre-line break-words">{paragraph}</p>
              {followingImages.map((image, imageIndex) => (
                <div key={`${image.src}-${imageIndex}`} className="my-2 w-full">
                  <PostImage image={image} />
                </div>
              ))}
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
