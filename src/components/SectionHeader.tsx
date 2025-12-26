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
}

export function SectionHeader({
  label,
  title,
  description,
  animate = true,
  className,
  alignment = 'split'
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

  if (alignment === 'left') {
    return (
      <Wrapper
        {...animationProps}
        className={cn('mb-16', className)}
      >
        <span className="font-mono text-sm tracking-[0.2em] text-white/40 uppercase block mb-4">
          [ {label} ]
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-white">
          {title}
        </h1>
        {description && (
          <p className="text-white/50 text-lg leading-relaxed max-w-2xl mt-6">
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
        <span className="font-mono text-sm tracking-[0.2em] text-white/40 uppercase block mb-4">
          [ {label} ]
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-white">
          {title}
        </h1>
      </div>
      {description && (
        <p className="text-white/50 text-lg leading-relaxed max-w-md md:text-right">
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
}: Omit<SectionHeaderProps, 'animate' | 'alignment'>) {
  return (
    <div className={cn('mb-12', className)}>
      <span className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase block mb-2">
        [ {label} ]
      </span>
      <h2 className="text-2xl md:text-3xl font-extralight tracking-tight text-white">
        {title}
      </h2>
      {description && (
        <p className="text-white/40 text-sm leading-relaxed max-w-lg mt-3">
          {description}
        </p>
      )}
    </div>
  )
}
