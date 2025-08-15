'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { vlogsData, Vlog } from '../content/vlogs-data'

export default function VlogGrid() {
  const [selectedVideo, setSelectedVideo] = useState<Vlog | null>(null)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="space-y-8"
    >
      {/* Hero Video Player */}
      {selectedVideo && (
        <div className="bg-[var(--surface-color)] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}`}
              title={selectedVideo.title}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-[var(--secondary-color)] rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-[var(--muted-text-color)] uppercase tracking-wider">
                {selectedVideo.country}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[var(--primary-color)] mb-3">
              {selectedVideo.title}
            </h3>
            <p className="text-lg text-[var(--text-color)] opacity-90 leading-relaxed">
              {selectedVideo.description}
            </p>
          </div>
        </div>
      )}

      {/* Video Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {vlogsData.map((vlog) => (
          <VlogCard
            key={vlog.id}
            vlog={vlog}
            isSelected={selectedVideo?.id === vlog.id}
            onClick={() => setSelectedVideo(vlog)}
          />
        ))}
      </div>
    </motion.div>
  )
}

function VlogCard({ 
  vlog, 
  isSelected, 
  onClick 
}: { 
  vlog: Vlog
  isSelected: boolean
  onClick: () => void 
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative bg-[var(--surface-color)] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-left w-full ring-1 ring-black/5 ${
        isSelected ? 'ring-2 ring-[var(--secondary-color)] shadow-2xl scale-105' : ''
      }`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-gray-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://img.youtube.com/vi/${vlog.youtubeId}/maxresdefault.jpg`}
          alt={vlog.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-2xl">
            <svg 
              viewBox="0 0 24 24" 
              width={24} 
              height={24} 
              fill="currentColor" 
              className="text-[var(--primary-color)] ml-1"
            >
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>

        {/* Country Badge */}
        <div className="absolute top-4 left-4 bg-[var(--secondary-color)] text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
          {vlog.country}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-[var(--primary-color)] group-hover:text-[var(--secondary-color)] transition-colors duration-300 mb-2 line-clamp-2">
          {vlog.title}
        </h3>
        <p className="text-sm text-[var(--muted-text-color)] line-clamp-3 leading-relaxed">
          {vlog.description}
        </p>
      </div>

      {/* Selected Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4 w-6 h-6 bg-[var(--secondary-color)] rounded-full flex items-center justify-center shadow-lg animate-pulse">
          <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor" className="text-white">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        </div>
      )}
    </button>
  )
}