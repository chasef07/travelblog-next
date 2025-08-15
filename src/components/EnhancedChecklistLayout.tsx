'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { packingHtml } from '@/content/packing'

export default function EnhancedChecklistLayout() {
  useEffect(() => {
    // Enhanced interactivity for checklist items
    const items = Array.from(document.querySelectorAll('.checklist-column li')) as HTMLElement[]
    const handlers: Array<[(e: Event) => void, HTMLElement]> = []
    
    items.forEach(el => {
      // Add modern styling classes
      el.classList.add('checklist-item', 'transition-all', 'duration-200', 'cursor-pointer', 'p-4', 'rounded-lg', 'border', 'hover:bg-accent/50', 'hover:shadow-sm', 'bg-card', 'mb-3')
      
      const onClick = (e: Event) => { 
        e.preventDefault()
        el.classList.toggle('checked')
        
        // Add completion animation
        if (el.classList.contains('checked')) {
          el.style.transform = 'scale(1.02)'
          setTimeout(() => {
            el.style.transform = 'scale(1)'
          }, 150)
        }
      }
      
      el.addEventListener('click', onClick)
      handlers.push([onClick, el])
    })

    // Style checklist container for grid layout
    const container = document.querySelector('.checklist-container')
    if (container) {
      container.classList.add('grid', 'md:grid-cols-2', 'gap-8', 'mb-8')
    }

    // Style checklist columns
    const columns = Array.from(document.querySelectorAll('.checklist-column'))
    columns.forEach(column => {
      column.classList.add('bg-card/50', 'p-6', 'rounded-xl', 'border', 'shadow-sm', 'backdrop-blur-sm')
    })

    // Style sidebar
    const sidebar = document.querySelector('.sidebar')
    if (sidebar) {
      sidebar.classList.add('bg-card/50', 'p-6', 'rounded-xl', 'border', 'shadow-sm', 'backdrop-blur-sm', 'mt-8')
    }

    // Style images container
    const imagesContainer = document.querySelector('.packing-checklist-images')
    if (imagesContainer) {
      imagesContainer.classList.add('grid', 'md:grid-cols-2', 'gap-6', 'mt-6')
    }

    // Style images
    const images = Array.from(document.querySelectorAll('.packing-checklist-images img'))
    images.forEach(img => {
      img.classList.add('rounded-xl', 'shadow-lg', 'transition-transform', 'duration-300', 'hover:scale-105', 'w-full', 'h-auto')
    })

    // Style sections
    const sections = Array.from(document.querySelectorAll('.tips-section, .checklist-section'))
    sections.forEach(section => {
      section.classList.add('mb-8')
    })

    return () => { 
      handlers.forEach(([fn, el]) => el.removeEventListener("click", fn)) 
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/30">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="packing-content"
        >
          <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: packingHtml }} />
        </motion.div>
      </div>

      <style jsx global>{`
        .packing-checklist-page .prose {
          max-width: none;
          color: hsl(var(--foreground));
        }
        
        .packing-checklist-page .prose h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 2rem 0 1rem 0;
          color: hsl(var(--primary));
        }
        
        .packing-checklist-page .prose h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 1.5rem 0 0.75rem 0;
          color: hsl(var(--foreground));
        }
        
        .packing-checklist-page .prose p {
          margin: 1rem 0;
          line-height: 1.6;
          color: hsl(var(--muted-foreground));
        }
        
        .packing-checklist-page .prose ol {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }
        
        .packing-checklist-page .prose ol li {
          margin: 0.5rem 0;
          color: hsl(var(--foreground));
          line-height: 1.6;
        }
        
        .packing-checklist-page .prose a {
          color: hsl(var(--primary));
          text-decoration: underline;
          transition: color 0.2s ease;
        }
        
        .packing-checklist-page .prose a:hover {
          color: hsl(var(--primary) / 0.8);
        }
        
        .checklist-column {
          margin: 1.5rem 0;
        }
        
        .checklist-column h3 {
          background: linear-gradient(to right, hsl(var(--primary)), hsl(var(--secondary)));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem !important;
        }
        
        .checklist-item {
          margin: 0.5rem 0 !important;
          position: relative;
          background: hsl(var(--card));
        }
        
        .checklist-item::before {
          content: '';
          width: 20px;
          height: 20px;
          border: 2px solid hsl(var(--border));
          border-radius: 4px;
          display: inline-block;
          margin-right: 12px;
          vertical-align: top;
          margin-top: 2px;
          transition: all 0.2s ease;
        }
        
        .checklist-item.checked::before {
          background: hsl(var(--primary));
          border-color: hsl(var(--primary));
          background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m13.854 3.646-7.5 7.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6 10.293l7.146-7.147a.5.5 0 0 1 .708.708z'/%3e%3c/svg%3e");
        }
        
        .checklist-item.checked {
          background: hsl(var(--muted) / 0.3);
          color: hsl(var(--muted-foreground));
          text-decoration: line-through;
        }
        
        .packing-checklist-page img {
          margin: 2rem auto;
          display: block;
          max-width: 100%;
          height: auto;
        }
        
        /* Responsive grid for checklist columns */
        .checklist-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
        }
      `}</style>
    </div>
  )
}