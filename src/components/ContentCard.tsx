'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ContentCardProps {
  // Core content
  title: string
  description?: string
  image: string
  imageAlt?: string

  // Metadata
  meta?: string
  badge?: string

  // Link
  href?: string
  onClick?: () => void

  // Variants
  variant?: 'blog' | 'food' | 'vlog' | 'default'

  // Animation
  index?: number
  animate?: boolean

  // Styling
  className?: string
  priority?: boolean
}

export function ContentCard({
  title,
  description,
  image,
  imageAlt,
  meta,
  badge,
  href,
  onClick,
  variant = 'default',
  index = 0,
  animate = true,
  className,
  priority = false
}: ContentCardProps) {
  const Wrapper = animate ? motion.div : 'div'
  const animationProps = animate
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: index * 0.05, duration: 0.4 }
      }
    : {}

  const content = (
    <>
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={imageAlt || title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading={priority ? 'eager' : 'lazy'}
          priority={priority}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Video play button overlay */}
        {variant === 'vlog' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border border-[var(--ui-border-strong)] bg-[var(--ui-accent)] flex items-center justify-center group-hover:bg-[var(--ui-accent-hover)] transition-colors">
              <Play className="w-6 h-6 text-[var(--ui-on-accent)] ml-1" fill="currentColor" />
            </div>
          </div>
        )}

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 right-3 rounded-full border border-[var(--ui-border-subtle)] bg-[var(--ui-header-bg)] px-2.5 py-1">
            <span className="font-mono text-[10px] tracking-wider text-[var(--ui-text-primary)] uppercase">
              {badge}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-3">
        {/* Meta */}
        {meta && (
          <span className="font-mono text-xs tracking-wider text-[var(--ui-text-subtle)] uppercase">
            {meta}
          </span>
        )}

        {/* Title */}
        <h3 className="text-lg font-light text-[var(--ui-text-primary)] group-hover:text-[var(--ui-accent)] transition-colors duration-300 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-[var(--ui-text-muted)] leading-relaxed line-clamp-2 group-hover:text-[var(--ui-text-secondary)] transition-colors duration-300">
            {description}
          </p>
        )}

        {/* Read More (for blog variant) */}
        {variant === 'blog' && (
          <div className="flex items-center gap-2 text-[var(--ui-text-subtle)] group-hover:text-[var(--ui-accent)] transition-all duration-300 pt-2">
            <span className="text-xs uppercase tracking-wider">Read</span>
            <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </div>
        )}
      </div>
    </>
  )

  const cardClasses = cn(
    'group bg-[var(--ui-bg-strong)]',
    variant !== 'food' && 'hover:bg-[var(--ui-bg-soft)] transition-colors',
    className
  )

  if (href) {
    return (
      <Wrapper {...animationProps} className={cardClasses}>
        <Link href={href} className="block h-full">
          {content}
        </Link>
      </Wrapper>
    )
  }

  if (onClick) {
    return (
      <Wrapper {...animationProps} className={cn(cardClasses, 'cursor-pointer')} onClick={onClick}>
        {content}
      </Wrapper>
    )
  }

  return (
    <Wrapper {...animationProps} className={cardClasses}>
      {content}
    </Wrapper>
  )
}

// Grid wrapper for content cards
interface ContentGridProps {
  children: React.ReactNode
  columns?: 2 | 3
  className?: string
}

export function ContentGrid({ children, columns = 3, className }: ContentGridProps) {
  const colClasses = columns === 2
    ? 'md:grid-cols-2'
    : 'md:grid-cols-2 lg:grid-cols-3'

  return (
    <div className={cn(
      'grid gap-px bg-[var(--ui-border-subtle)] border border-[var(--ui-border-subtle)]',
      colClasses,
      className
    )}>
      {children}
    </div>
  )
}
