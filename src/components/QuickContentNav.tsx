'use client'

import { motion } from 'framer-motion'
import { Utensils, Backpack, Video, Plane, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

interface ContentSection {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  href: string
}

const contentSections: ContentSection[] = [
  {
    id: 'vlogs',
    title: 'Video Stories',
    description: 'Visual adventures and behind-the-scenes travel moments captured across 19 countries.',
    icon: Video,
    href: '/vlogs',
  },
  {
    id: 'food',
    title: 'Food Adventures',
    description: 'Local cuisine discoveries, street food guides, and culinary experiences from around the world.',
    icon: Utensils,
    href: '/food',
  },
  {
    id: 'transportation',
    title: 'Getting Around',
    description: 'Practical guides for navigating trains, buses, flights, and local transport in each country.',
    icon: Plane,
    href: '/transportation',
  },
  {
    id: 'packing',
    title: 'Packing Light',
    description: 'Minimalist travel gear recommendations and strategies for long-term travel.',
    icon: Backpack,
    href: '/packing-checklist',
  }
]

export default function QuickContentNav() {
  return (
    <section className="py-20 relative overflow-hidden border-t border-[#d4c0a8]/10" style={{ background: 'linear-gradient(180deg, #2a2520 0%, #1a1714 100%)' }}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-sm tracking-[0.2em] text-[#c4704b] uppercase block mb-4">
              [ Discover More ]
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-[#faf6f1]">
              Explore
            </h2>
          </div>
          <p className="text-[#d4c0a8]/60 text-lg leading-relaxed max-w-md md:text-right">
            Dive deeper into different aspects of this journey.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#d4c0a8]/10">
          {contentSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link href={section.href} className="block group">
                <div className="relative p-8 border-r border-b border-[#d4c0a8]/10 h-full hover:bg-[#c4704b]/5 transition-colors duration-300">
                  {/* Left accent line */}
                  <div className="absolute left-0 top-8 bottom-8 w-px bg-[#d4c0a8]/20 group-hover:bg-[#c4704b]/60 transition-colors duration-300" />

                  {/* Icon */}
                  <div className="mb-12">
                    <section.icon className="h-6 w-6 text-[#d4c0a8]/40 group-hover:text-[#c4704b] transition-colors duration-300" strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-normal text-[#faf6f1] mb-3 group-hover:text-[#c4704b] transition-colors duration-300">
                    {section.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#d4c0a8]/50 leading-relaxed group-hover:text-[#d4c0a8]/70 transition-colors duration-300">
                    {section.description}
                  </p>

                  {/* Arrow */}
                  <div className="mt-6 flex items-center gap-2 text-[#d4c0a8]/30 group-hover:text-[#c4704b] transition-all duration-300">
                    <span className="text-xs uppercase tracking-wider font-mono">Explore</span>
                    <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
