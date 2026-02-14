'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  label: string
  title: string
  description?: string
  animate?: boolean
  className?: string
  alignment?: 'left' | 'split'
  volume?: string | number  // Optional editorial volume/issue number
}

export function SectionHeader({
  label,
  title,
  description,
  animate = true,
  className,
  alignment = 'split',
  volume
}: SectionHeaderProps) {
  const Wrapper = animate ? motion.div : 'div'
  const animationProps = animate
    ? {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        transition: { duration: 0.6 },
        viewport: { once: true, margin: '-100px' }
      }
    : {}

  // Editorial label with decorative rules
  const EditorialLabel = () => (
    <div className="flex items-center gap-4 mb-6">
      <div
        className="h-px w-8"
        style={{ background: 'linear-gradient(to right, transparent, var(--ui-accent))', opacity: 0.6 }}
      />
      <span className="font-mono text-xs tracking-[0.25em] text-[var(--ui-accent)] uppercase">
        {volume ? `Vol. ${volume} — ${label}` : label}
      </span>
      <div
        className="h-px flex-1"
        style={{ background: 'linear-gradient(to right, var(--ui-accent), transparent)', opacity: 0.6 }}
      />
    </div>
  )

  if (alignment === 'left') {
    return (
      <Wrapper
        {...animationProps}
        className={cn('mb-16', className)}
      >
        <EditorialLabel />
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-editorial font-light tracking-tight text-[var(--ui-text-primary)]">
          {title}
        </h1>
        {description && (
          <p className="text-[var(--ui-text-secondary)] text-lg leading-relaxed max-w-2xl mt-6 font-body">
            {description}
          </p>
        )}
      </Wrapper>
    )
  }

  return (
    <Wrapper
      {...animationProps}
      className={cn(
        'flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-16',
        className
      )}
    >
      <div>
        <EditorialLabel />
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-editorial font-light tracking-tight text-[var(--ui-text-primary)]">
          {title}
        </h1>
      </div>
      {description && (
        <p className="text-[var(--ui-text-secondary)] text-lg leading-relaxed max-w-md md:text-right font-body italic">
          {description}
        </p>
      )}
    </Wrapper>
  )
}

// Smaller section header for use within pages (h2 instead of h1)
export function SubSectionHeader({
  label,
  title,
  description,
  className
}: Omit<SectionHeaderProps, 'animate' | 'alignment' | 'volume'>) {
  return (
    <div className={cn('mb-12', className)}>
      <div className="flex items-center gap-3 mb-3">
        <div className="h-px w-6 bg-[var(--ui-accent)] opacity-60" />
        <span className="font-mono text-xs tracking-[0.2em] text-[var(--ui-accent)] uppercase">
          {label}
        </span>
      </div>
      <h2 className="text-2xl md:text-3xl font-editorial font-light tracking-tight text-[var(--ui-text-primary)]">
        {title}
      </h2>
      {description && (
        <p className="text-[var(--ui-text-muted)] text-sm leading-relaxed max-w-lg mt-3 font-body">
          {description}
        </p>
      )}
    </div>
  )
}
