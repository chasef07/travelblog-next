'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Utensils, Backpack, Video, Plane, ArrowRight, MapPin } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'

interface ContentSection {
  id: string
  title: string
  subtitle: string
  description: string
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  href: string
  accent: string
  stat: string
  statLabel: string
}

const contentSections: ContentSection[] = [
  {
    id: 'vlogs',
    title: 'Video Stories',
    subtitle: 'Visual journeys',
    description: 'Behind-the-scenes moments captured across four continents.',
    icon: Video,
    href: '/vlogs',
    accent: '#c4704b',
    stat: '5',
    statLabel: 'Videos',
  },
  {
    id: 'food',
    title: 'Food Adventures',
    subtitle: 'Culinary discoveries',
    description: 'Street food guides and local cuisine from around the world.',
    icon: Utensils,
    href: '/food',
    accent: '#7a8f7a',
    stat: '10+',
    statLabel: 'Dishes',
  },
  {
    id: 'transportation',
    title: 'Getting Around',
    subtitle: 'Practical guides',
    description: 'Navigate trains, buses, and local transport with ease.',
    icon: Plane,
    href: '/transportation',
    accent: '#d4c0a8',
    stat: '20+',
    statLabel: 'Guides',
  },
  {
    id: 'packing',
    title: 'Packing Light',
    subtitle: 'Minimalist travel',
    description: 'Gear recommendations for long-term travel.',
    icon: Backpack,
    href: '/packing-checklist',
    accent: '#c4704b',
    stat: '35',
    statLabel: 'Items',
  }
]

function FeatureCard({ section, index }: { section: ContentSection; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [3, -3])
  const rotateY = useTransform(x, [-100, 100], [-3, 3])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 + 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: "-50px" }}
      className="h-full"
    >
      <Link href={section.href} className="block h-full group">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="relative h-full p-8 bg-gradient-to-br from-[#2a2520]/80 to-[#1a1714]/90 border border-[#d4c0a8]/10 rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-[#d4c0a8]/25 group-hover:shadow-2xl group-hover:shadow-[#c4704b]/5"
        >
          {/* Background glow effect */}
          <div
            className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-3xl"
            style={{ background: section.accent }}
          />

          {/* Decorative corner element */}
          <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
            <div
              className="absolute top-4 right-4 w-px h-12 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
              style={{ background: `linear-gradient(to bottom, ${section.accent}, transparent)` }}
            />
            <div
              className="absolute top-4 right-4 h-px w-12 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
              style={{ background: `linear-gradient(to left, ${section.accent}, transparent)` }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col">
            {/* Icon with animated ring */}
            <div className="relative mb-8">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${section.accent}15 0%, ${section.accent}05 100%)`,
                  border: `1px solid ${section.accent}30`
                }}
              >
                <div style={{ color: section.accent }}>
                  <section.icon
                    className="h-6 w-6 transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
              {/* Animated ring */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                style={{ border: `1px solid ${section.accent}` }}
                initial={false}
                animate={{ scale: [1, 1.2, 1.2], opacity: [0, 0.3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
              />
            </div>

            {/* Subtitle */}
            <span
              className="font-mono text-[10px] tracking-[0.25em] uppercase mb-2 transition-colors duration-300"
              style={{ color: section.accent }}
            >
              {section.subtitle}
            </span>

            {/* Title */}
            <h3 className="text-xl font-light text-[#faf6f1] mb-3 group-hover:text-[#faf6f1] transition-colors duration-300">
              {section.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-[#d4c0a8]/50 leading-relaxed mb-8 group-hover:text-[#d4c0a8]/70 transition-colors duration-300 flex-grow">
              {section.description}
            </p>

            {/* Bottom section */}
            <div className="flex items-end justify-between mt-auto pt-6 border-t border-[#d4c0a8]/10">
              {/* Stat */}
              <div>
                <span
                  className="block text-2xl font-light transition-colors duration-300"
                  style={{ color: section.accent }}
                >
                  {section.stat}
                </span>
                <span className="text-[10px] font-mono tracking-wider text-[#d4c0a8]/40 uppercase">
                  {section.statLabel}
                </span>
              </div>

              {/* Arrow */}
              <motion.div
                className="flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 group-hover:bg-[#c4704b]/10"
                style={{ borderColor: `${section.accent}30`, color: section.accent }}
                whileHover={{ x: 3 }}
              >
                <ArrowRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-0.5" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

export default function QuickContentNav() {
  return (
    <section className="py-24 relative overflow-hidden border-t border-[#d4c0a8]/10" style={{ background: 'linear-gradient(180deg, #1a1714 0%, #2a2520 50%, #1a1714 100%)' }}>
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-px h-32 bg-gradient-to-b from-transparent via-[#c4704b]/20 to-transparent" />
      <div className="absolute bottom-1/3 right-0 w-px h-48 bg-gradient-to-b from-transparent via-[#7a8f7a]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="max-w-xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2a2520]/60 border border-[#d4c0a8]/10 rounded-full mb-6">
                <MapPin className="h-3 w-3 text-[#c4704b]" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#d4c0a8]/60 uppercase">
                  Curated Resources
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-[#faf6f1] mb-4">
                Dive Deeper
              </h2>
              <p className="text-[#d4c0a8]/50 text-lg leading-relaxed">
                Beyond the stories — practical guides, visual content, and curated recommendations from the journey.
              </p>
            </div>

            {/* Decorative compass lines */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-8 bg-gradient-to-b from-[#c4704b]/40 to-transparent" />
                <div className="w-2 h-2 rounded-full border border-[#c4704b]/40" />
                <div className="w-px h-4 bg-gradient-to-b from-transparent to-[#d4c0a8]/20" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cards Grid - Asymmetric bento layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {contentSections.map((section, index) => (
            <FeatureCard key={section.id} section={section} index={index} />
          ))}
        </div>

        {/* Bottom flourish */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4c0a8]/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#c4704b]/40" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4c0a8]/20" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
