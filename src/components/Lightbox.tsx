'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

interface LightboxImage {
  src: string
  alt: string
  caption?: string
}

interface LightboxProps {
  images: LightboxImage[]
  initialIndex?: number
  isOpen: boolean
  onClose: () => void
}

export function Lightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          goPrev()
          break
        case 'ArrowRight':
          goNext()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, goNext, goPrev])

  // Reset index when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
    }
  }, [isOpen, initialIndex])

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus()
      })
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const currentImage = images[currentIndex]
  if (!currentImage) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={currentImage.caption || currentImage.alt}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

          {/* Content */}
          <div
            className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-4 right-4 z-10 inline-flex items-center justify-center rounded-full border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] p-2 text-[var(--ui-text-muted)] hover:border-[var(--ui-border-strong)] hover:text-[var(--ui-accent)] transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image counter */}
            {images.length > 1 && (
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex rounded-full border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] px-3 py-1 font-mono text-xs tracking-wider text-[var(--ui-text-muted)]">
                  {currentIndex + 1} / {images.length}
                </span>
              </div>
            )}

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center rounded-full border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] p-3 text-[var(--ui-text-muted)] hover:border-[var(--ui-border-strong)] hover:text-[var(--ui-accent)] transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center rounded-full border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] p-3 text-[var(--ui-text-muted)] hover:border-[var(--ui-border-strong)] hover:text-[var(--ui-accent)] transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image container */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl aspect-[4/3] md:aspect-[16/10]"
            >
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Caption */}
            {currentImage.caption && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 max-w-2xl rounded-full border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] px-4 py-1.5 text-center font-mono text-sm tracking-wider text-[var(--ui-text-muted)]"
              >
                {currentImage.caption}
              </motion.p>
            )}

            {/* Thumbnail strip for multiple images */}
            {images.length > 1 && images.length <= 10 && (
              <div className="flex gap-2 mt-6 overflow-x-auto max-w-full pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative w-16 h-12 flex-shrink-0 overflow-hidden border-2 transition-all ${
                      idx === currentIndex
                        ? 'border-[var(--ui-accent)]'
                        : 'border-transparent opacity-60 hover:opacity-90'
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Hook to manage lightbox state
export function useLightbox(images: LightboxImage[]) {
  const [isOpen, setIsOpen] = useState(false)
  const [initialIndex, setInitialIndex] = useState(0)

  const open = useCallback((index: number = 0) => {
    setInitialIndex(index)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  return {
    isOpen,
    initialIndex,
    open,
    close,
    images,
  }
}

// Clickable image component that opens lightbox
interface LightboxImageProps {
  src: string
  alt: string
  caption?: string
  onClick: () => void
  className?: string
  priority?: boolean
}

export function LightboxImage({
  src,
  alt,
  caption,
  onClick,
  className,
  priority = false,
}: LightboxImageProps) {
  return (
    <figure className={`relative ${className || ''}`}>
      <button
        type="button"
        onClick={onClick}
        className="relative group w-full text-left cursor-pointer"
        aria-label={`Open image: ${alt}`}
      >
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[4/3] overflow-hidden border border-[var(--ui-border-subtle)]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            loading={priority ? 'eager' : 'lazy'}
            priority={priority}
          />
          {/* Zoom indicator on hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border border-[var(--ui-border-strong)] bg-[var(--ui-accent)] flex items-center justify-center">
              <ZoomIn className="w-5 h-5 text-[var(--ui-on-accent)]" />
            </div>
          </div>
        </div>
      </button>
      {caption && (
        <figcaption className="text-sm text-[var(--ui-text-subtle)] text-center mt-4 font-mono tracking-wider">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
