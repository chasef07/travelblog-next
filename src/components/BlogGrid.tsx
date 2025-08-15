'use client'

import Image from "next/image"
import Link from "next/link"
import { motion } from 'framer-motion'
import { blogMetadata } from '../content/blog-data'
import { useEffect, useRef, useState } from 'react'

export function BlogGrid() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleItems(prev => new Set(prev).add(index))
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const setRef = () => (el: HTMLDivElement | null) => {
    if (el && observerRef.current) {
      observerRef.current.observe(el)
    }
  }

  return (
    <div className="grid gap-8" style={{gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))'}}>
      {blogMetadata.map((b, index) => (
        <motion.div
          key={b.title}
          ref={setRef()}
          data-index={index}
          initial={{ opacity: 0, y: 50 }}
          animate={visibleItems.has(index) ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <Link 
            href={b.link} 
            className="group block bg-[var(--surface-color)] rounded-3xl overflow-hidden shadow-lg ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl glass"
          >
            <div className="relative w-full h-[280px] overflow-hidden">
              <Image 
                src={b.image} 
                alt={b.title} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              
              {/* Featured badge for first post */}
              {index === 0 && (
                <div className="absolute top-4 left-4 glass-strong rounded-full px-3 py-1">
                  <span className="text-white text-xs font-semibold tracking-wide uppercase">Featured</span>
                </div>
              )}

              {/* Category tag */}
              <div className="absolute top-4 right-4 glass rounded-full px-3 py-1">
                <span className="text-white text-xs font-medium">Travel</span>
              </div>

              {/* Overlay content */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-2 text-sm mb-2 opacity-90">
                  <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                  </svg>
                  <time>{b.date}</time>
                </div>
                <h3 className="text-lg font-bold leading-tight group-hover:text-white/90 transition-colors duration-300 line-clamp-2">
                  {b.title}
                </h3>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-[var(--muted-text-color)] line-clamp-3 leading-relaxed mb-6 text-sm">
                {b.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)] flex items-center justify-center">
                    <span className="text-white text-xs font-bold">CF</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[var(--text-color)]">Chase Fagen</div>
                    <div className="text-xs text-[var(--muted-text-color)]">Explorer</div>
                  </div>
                </div>
                
                <motion.div
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center gap-2 text-[var(--secondary-color)] font-semibold group-hover:text-[var(--primary-color)] transition-colors duration-300"
                >
                  <span className="text-sm">Read More</span>
                  <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                  </svg>
                </motion.div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
