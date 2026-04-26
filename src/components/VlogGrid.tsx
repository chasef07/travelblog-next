'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Play, X } from 'lucide-react'
import { vlogsData, Vlog } from '../content/vlogs-data'

export default function VlogGrid() {
  const [selectedVideo, setSelectedVideo] = useState<Vlog | null>(null)

  return (
    <div className="space-y-12">
      {/* Hero Video Player */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)]"
        >
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
              title={selectedVideo.title}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              loading="lazy"
            />
          </div>
          <div className="p-6 border-t border-[var(--ui-border-subtle)]">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs tracking-wider text-[var(--ui-text-muted)] uppercase">
                {selectedVideo.country}
              </span>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-[var(--ui-text-muted)] hover:text-[var(--ui-text-primary)] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <h3 className="text-xl font-light text-[var(--ui-text-primary)] mb-3">
              {selectedVideo.title}
            </h3>
            <p className="text-[var(--ui-text-muted)] leading-relaxed">
              {selectedVideo.description}
            </p>
          </div>
        </motion.div>
      )}

      {/* Video Grid */}
      <div className="grid gap-px bg-[var(--ui-border-subtle)] border border-[var(--ui-border-subtle)] md:grid-cols-2 lg:grid-cols-3">
        {vlogsData.map((vlog, index) => (
          <VlogCard
            key={vlog.id}
            vlog={vlog}
            index={index}
            isSelected={selectedVideo?.id === vlog.id}
            onClick={() => setSelectedVideo(vlog)}
          />
        ))}
      </div>
    </div>
  )
}

function VlogCard({
  vlog,
  index,
  isSelected,
  onClick,
}: {
  vlog: Vlog
  index: number
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onClick={onClick}
      className={`group relative bg-[var(--ui-bg-strong)] text-left w-full transition-colors ${
        isSelected ? 'bg-[var(--ui-bg-soft)]' : 'hover:bg-[var(--ui-bg-soft)]'
      }`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={`https://img.youtube.com/vi/${vlog.youtubeId}/maxresdefault.jpg`}
          alt={vlog.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-14 h-14 border border-[var(--ui-border-strong)] bg-[var(--ui-accent)] rounded-full flex items-center justify-center group-hover:bg-[var(--ui-accent-hover)] transition-colors">
            <Play
              className="h-6 w-6 text-[var(--ui-on-accent)] ml-1"
              fill="currentColor"
            />
          </div>
        </div>

        {/* Country Badge */}
        <div className="absolute top-4 left-4">
          <span className="font-mono text-xs tracking-wider text-[var(--ui-text-primary)] uppercase bg-[var(--ui-header-bg)] border border-[var(--ui-border-subtle)] px-3 py-1 rounded-full backdrop-blur-sm">
            {vlog.country}
          </span>
        </div>

        {/* Selected Indicator */}
        {isSelected && (
          <div className="absolute top-4 right-4 w-2 h-2 bg-[var(--ui-accent)] rounded-full" />
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <h3 className="text-lg font-light text-[var(--ui-text-primary)] group-hover:text-[var(--ui-accent)] transition-colors duration-300 line-clamp-2">
          {vlog.title}
        </h3>
        <p className="text-sm text-[var(--ui-text-muted)] line-clamp-2 leading-relaxed group-hover:text-[var(--ui-text-secondary)] transition-colors">
          {vlog.description}
        </p>
      </div>
    </motion.button>
  )
}
