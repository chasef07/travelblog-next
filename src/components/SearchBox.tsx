'use client'

import { useState, useMemo } from 'react'
import { blogMetadata } from '../content/blog-data'
import Link from 'next/link'
import Image from 'next/image'

export default function SearchBox() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const results = useMemo(() => {
    if (!query.trim()) return []
    
    const searchTerm = query.toLowerCase()
    return blogMetadata.filter(post =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm)
    ).slice(0, 6)
  }, [query])

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder="Search adventures..."
          className="w-full px-4 py-2 pl-10 pr-4 text-sm bg-[var(--surface-color)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--secondary-color)] focus:border-transparent transition-all duration-200"
        />
        <svg 
          viewBox="0 0 24 24" 
          width={16} 
          height={16} 
          fill="currentColor"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--muted-text-color)]"
        >
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </div>

      {isOpen && query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto animate-fade-in">
          {results.length > 0 ? (
            <div className="p-2">
              {results.map((post) => (
                <Link
                  key={post.link}
                  href={post.link}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--background-color)] transition-colors duration-200 group"
                >
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-[var(--primary-color)] group-hover:text-[var(--secondary-color)] transition-colors duration-200 truncate">
                      {post.title}
                    </h4>
                    <p className="text-sm text-[var(--muted-text-color)] line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                  <svg 
                    viewBox="0 0 24 24" 
                    width={16} 
                    height={16} 
                    fill="currentColor"
                    className="text-[var(--muted-text-color)] group-hover:text-[var(--secondary-color)] transition-colors duration-200"
                  >
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                  </svg>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-[var(--muted-text-color)]">
              <svg viewBox="0 0 24 24" width={48} height={48} fill="currentColor" className="mx-auto mb-2 opacity-50">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <p>No adventures found for &quot;{query}&quot;</p>
              <p className="text-xs mt-1">Try searching for countries, activities, or destinations</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}