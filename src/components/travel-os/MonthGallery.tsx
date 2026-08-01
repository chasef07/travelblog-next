'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export type MonthGalleryItem = {
  src: string
  alt: string
  label: string
  meta: string
  imagePosition?: string
}

export function MonthGallery({
  items,
  title,
}: {
  items: MonthGalleryItem[]
  title: string
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (
      items.length < 2 ||
      paused ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [items.length, paused])

  return (
    <div
      aria-label={`${title} photo reel`}
      className="relative aspect-[5/3] overflow-hidden rounded-lg border bg-muted"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {items.map((item, index) => (
        <div
          key={item.src}
          aria-hidden={index !== activeIndex}
          className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${
            index === activeIndex
              ? 'opacity-100'
              : 'pointer-events-none opacity-0'
          }`}
        >
          <Image
            src={item.src}
            alt={index === activeIndex ? item.alt : ''}
            fill
            priority={index === 0}
            sizes="(max-width: 1024px) 100vw, 384px"
            className="object-cover"
            style={{ objectPosition: item.imagePosition }}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-4 pb-4 pt-12 text-white">
            <p className="text-[0.625rem] font-semibold tracking-widest text-white/70 uppercase">
              {item.meta}
            </p>
            <p className="mt-1 line-clamp-1 text-sm font-medium">
              {item.label}
            </p>
          </div>
        </div>
      ))}

      {items.length > 1 && (
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/45 p-1 backdrop-blur-sm">
          {items.map((item, index) => (
            <button
              key={item.src}
              type="button"
              aria-label={`Show ${item.label}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              className="flex size-6 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white"
              onClick={() => setActiveIndex(index)}
            >
              <span
                className={`block size-1.5 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-white' : 'bg-white/45'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
