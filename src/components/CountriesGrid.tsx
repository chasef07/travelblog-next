'use client'

import Image from "next/image"
import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"

export function CountriesGrid(){
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
  const countries = [
    { name: 'Israel', flag: 'IS-flag.jpg' },
    { name: 'Georgia', flag: 'GG-flag.jpg' },
    { name: 'Kenya', flag: 'KE-flag.jpg' },
    { name: 'Tanzania', flag: 'TZ-flag.jpg' },
    { name: 'Rwanda', flag: 'Flag_of_Rwanda.jpg' },
    { name: 'UAE', flag: 'AE-flag.jpg' },
    { name: 'Nepal', flag: 'nepalflag.jpg' },
    { name: 'Thailand', flag: 'TH-flag.jpg' },
    { name: 'Laos', flag: 'LA-flag.jpg' },
    { name: 'Cambodia', flag: 'CB-flag.jpg' },
    { name: 'China', flag: 'CH-flag.jpg' },
    { name: 'Vietnam', flag: 'VM-flag.jpg' },
    { name: 'Singapore', flag: 'SN-flag.jpg' },
    { name: 'Philippines', flag: 'RP-flag.jpg' },
    { name: 'Indonesia', flag: 'ID-flag.jpg' },
    { name: 'Japan', flag: 'JA-flag.jpg' },
  ] as const;
  return (
    <>
      {countries.map((c, index)=> (
        <motion.div 
          key={c.name} 
          ref={setRef()}
          data-index={index}
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={visibleItems.has(index) ? { 
            opacity: 1, 
            y: 0, 
            scale: 1 
          } : { 
            opacity: 0, 
            y: 50, 
            scale: 0.8 
          }}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.05,
            ease: "easeOut"
          }}
          whileHover={{ 
            scale: 1.1, 
            y: -5,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
          className="text-center cursor-pointer group"
        >
          <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
            <Image 
              src={`/assets/images/flags/${c.flag}`} 
              alt={`${c.name} flag`} 
              width={120} 
              height={80} 
              className="w-[120px] h-[80px] object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)] rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300 -z-10" />
          </div>
          <motion.span 
            className="block mt-3 text-sm font-medium text-[var(--text-color)] group-hover:text-[var(--primary-color)] transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={visibleItems.has(index) ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: (index * 0.05) + 0.3 }}
          >
            {c.name}
          </motion.span>
        </motion.div>
      ))}
    </>
  );
}
