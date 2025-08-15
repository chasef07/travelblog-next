'use client'

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

interface Country {
  name: string
  flag: string
  visitDate: string
  duration: string
  highlights: string[]
  favoriteFood: string
  memorableMoment: string
  blogPosts: number
  photos: number
  continent: string
  rating: number
}

const countries: Country[] = [
  { 
    name: 'Israel', 
    flag: 'IS-flag.jpg',
    visitDate: 'Sep 2024',
    duration: '2 weeks',
    highlights: ['Jerusalem Old City', 'Tel Aviv Beach', 'Masada Sunrise'],
    favoriteFood: 'Hummus & Falafel',
    memorableMoment: 'Watching sunrise over the Dead Sea from Masada',
    blogPosts: 3,
    photos: 47,
    continent: 'Middle East',
    rating: 4.8
  },
  { 
    name: 'Georgia', 
    flag: 'GG-flag.jpg',
    visitDate: 'Oct 2024',
    duration: '3 weeks',
    highlights: ['Gudauri Skiing', 'Tbilisi Old Town', 'Wine Tasting'],
    favoriteFood: 'Khachapuri',
    memorableMoment: 'Buying our first international property in Gudauri',
    blogPosts: 5,
    photos: 78,
    continent: 'Europe',
    rating: 4.9
  },
  { 
    name: 'Kenya', 
    flag: 'KE-flag.jpg',
    visitDate: 'Nov 2024',
    duration: '10 days',
    highlights: ['Masai Mara Safari', 'Big Five', 'Maasai Culture'],
    favoriteFood: 'Nyama Choma',
    memorableMoment: 'Witnessing the Great Migration crossing',
    blogPosts: 4,
    photos: 156,
    continent: 'Africa',
    rating: 4.9
  },
  { 
    name: 'Tanzania', 
    flag: 'TZ-flag.jpg',
    visitDate: 'Nov 2024',
    duration: '2 weeks',
    highlights: ['Serengeti Safari', 'Ngorongoro Crater', 'Mount Kilimanjaro'],
    favoriteFood: 'Ugali with Stew',
    memorableMoment: 'Lions hunting at sunset in the Serengeti',
    blogPosts: 6,
    photos: 203,
    continent: 'Africa',
    rating: 5.0
  },
  { 
    name: 'Rwanda', 
    flag: 'Flag_of_Rwanda.jpg',
    visitDate: 'Nov 2024',
    duration: '1 week',
    highlights: ['Coffee Farms', 'Kigali City', 'Genocide Memorial'],
    favoriteFood: 'Rwandan Coffee',
    memorableMoment: 'Learning about coffee processing from local farmers',
    blogPosts: 3,
    photos: 67,
    continent: 'Africa',
    rating: 4.7
  },
  { 
    name: 'UAE', 
    flag: 'AE-flag.jpg',
    visitDate: 'Dec 2024',
    duration: '1 week',
    highlights: ['Dubai Skyline', 'Desert Safari', 'Burj Khalifa'],
    favoriteFood: 'Shawarma',
    memorableMoment: 'Watching sunset from the desert dunes',
    blogPosts: 2,
    photos: 89,
    continent: 'Middle East',
    rating: 4.5
  },
  { 
    name: 'Nepal', 
    flag: 'nepalflag.jpg',
    visitDate: 'Jan 2025',
    duration: '2 weeks',
    highlights: ['Himalayan Views', 'Kathmandu Temples', 'Trekking'],
    favoriteFood: 'Dal Bhat',
    memorableMoment: 'First glimpse of Mount Everest on a clear morning',
    blogPosts: 4,
    photos: 134,
    continent: 'Asia',
    rating: 4.8
  },
  { 
    name: 'Thailand', 
    flag: 'TH-flag.jpg',
    visitDate: 'Jan 2025',
    duration: '3 weeks',
    highlights: ['Muay Thai Training', 'Island Paradise', 'Street Food'],
    favoriteFood: 'Pad Thai',
    memorableMoment: 'Training Muay Thai with professional fighters',
    blogPosts: 8,
    photos: 187,
    continent: 'Asia',
    rating: 4.6
  },
  { 
    name: 'Laos', 
    flag: 'LA-flag.jpg',
    visitDate: 'Feb 2025',
    duration: '1 month',
    highlights: ['Nong Khiaw Trekking', 'Baci Ceremony', 'Farm Life'],
    favoriteFood: 'Larb',
    memorableMoment: 'Traditional Baci ceremony with local village',
    blogPosts: 12,
    photos: 234,
    continent: 'Asia',
    rating: 4.9
  },
  { 
    name: 'Cambodia', 
    flag: 'CB-flag.jpg',
    visitDate: 'Feb 2025',
    duration: '2 weeks',
    highlights: ['Koh Sdach Island', 'Angkor Wat', 'Island Paradise'],
    favoriteFood: 'Fish Amok',
    memorableMoment: 'Learning to backflip off a boat in paradise',
    blogPosts: 3,
    photos: 98,
    continent: 'Asia',
    rating: 4.7
  },
  { 
    name: 'China', 
    flag: 'CH-flag.jpg',
    visitDate: 'Mar 2025',
    duration: '2 weeks',
    highlights: ['Great Wall', 'Modern Cities', 'Cultural Heritage'],
    favoriteFood: 'Peking Duck',
    memorableMoment: 'Walking along the Great Wall at sunrise',
    blogPosts: 4,
    photos: 167,
    continent: 'Asia',
    rating: 4.6
  },
  { 
    name: 'Vietnam', 
    flag: 'VM-flag.jpg',
    visitDate: 'Apr 2025',
    duration: '3 weeks',
    highlights: ['Motorbike Adventures', 'Rice Terraces', 'Street Food'],
    favoriteFood: 'Pho',
    memorableMoment: 'Epic motorbike journey through terraced rice fields',
    blogPosts: 6,
    photos: 289,
    continent: 'Asia',
    rating: 4.8
  },
  { 
    name: 'Singapore', 
    flag: 'SN-flag.jpg',
    visitDate: 'Apr 2025',
    duration: '5 days',
    highlights: ['Modern Architecture', 'Food Scene', 'City Gardens'],
    favoriteFood: 'Singapore Noodles',
    memorableMoment: 'Exploring the incredible food scene and architecture',
    blogPosts: 2,
    photos: 89,
    continent: 'Asia',
    rating: 4.4
  },
  { 
    name: 'Philippines', 
    flag: 'RP-flag.jpg',
    visitDate: 'May 2025',
    duration: '3 weeks',
    highlights: ['Island Hopping', 'Surfing', 'Turquoise Waters'],
    favoriteFood: 'Adobo',
    memorableMoment: 'Surfing world-class waves and island hopping adventures',
    blogPosts: 5,
    photos: 234,
    continent: 'Asia',
    rating: 4.9
  },
  { 
    name: 'Indonesia', 
    flag: 'ID-flag.jpg',
    visitDate: 'Jun 2025',
    duration: '4 weeks',
    highlights: ['Bali Temples', 'Surfing', 'Island Culture'],
    favoriteFood: 'Nasi Goreng',
    memorableMoment: 'Spiritual temple visits and incredible waves in Bali',
    blogPosts: 7,
    photos: 312,
    continent: 'Asia',
    rating: 4.8
  },
  { 
    name: 'Japan', 
    flag: 'JA-flag.jpg',
    visitDate: 'Jul 2025',
    duration: '3 weeks',
    highlights: ['Hokkaido Nature', 'Japanese Cuisine', 'Cultural Immersion'],
    favoriteFood: 'Sushi',
    memorableMoment: 'Experiencing pristine nature and incredible cuisine in Hokkaido',
    blogPosts: 6,
    photos: 198,
    continent: 'Asia',
    rating: 4.9
  }
] as const

interface CountryModalProps {
  country: Country | null
  onClose: () => void
}

function CountryModal({ country, onClose }: CountryModalProps) {
  if (!country) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto bg-card/95 backdrop-blur border">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image 
                src={`/assets/images/flags/${country.flag}`} 
                alt={`${country.name} flag`} 
                width={60} 
                height={40} 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">{country.name}</h2>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{country.continent}</Badge>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span 
                      key={i} 
                      className={`text-sm ${i < Math.floor(country.rating) ? 'text-yellow-400' : 'text-muted-foreground/30'}`}
                    >
                      ⭐
                    </span>
                  ))}
                  <span className="text-muted-foreground text-sm ml-1">{country.rating}</span>
                </div>
              </div>
            </div>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            ✕
          </Button>
        </div>

        <CardContent className="space-y-6 p-0">
          {/* Visit Info */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-3">
              <div className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Visit Date</div>
              <div className="font-semibold">{country.visitDate}</div>
            </Card>
            <Card className="p-3">
              <div className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Duration</div>
              <div className="font-semibold">{country.duration}</div>
            </Card>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="font-semibold mb-3 text-foreground">🎯 Highlights</h3>
            <div className="flex flex-wrap gap-2">
              {country.highlights.map((highlight, index) => (
                <Badge key={index} variant="outline">
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>

          {/* Favorite Food */}
          <div>
            <h3 className="font-semibold mb-2 text-foreground">🍽️ Favorite Food</h3>
            <p className="text-muted-foreground">{country.favoriteFood}</p>
          </div>

          {/* Memorable Moment */}
          <div>
            <h3 className="font-semibold mb-2 text-foreground">✨ Most Memorable Moment</h3>
            <p className="text-muted-foreground italic">&ldquo;{country.memorableMoment}&rdquo;</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-3 text-center">
              <div className="text-2xl font-bold text-primary">{country.blogPosts}</div>
              <div className="text-muted-foreground text-sm">Blog Posts</div>
            </Card>
            <Card className="p-3 text-center">
              <div className="text-2xl font-bold text-primary">{country.photos}</div>
              <div className="text-muted-foreground text-sm">Photos</div>
            </Card>
          </div>
        </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default function EnhancedCountriesGrid() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [filter, setFilter] = useState<string>('all')
  const observerRef = useRef<IntersectionObserver | null>(null)

  const continents = ['all', ...Array.from(new Set(countries.map(c => c.continent)))]
  const filteredCountries = filter === 'all' 
    ? countries 
    : countries.filter(c => c.continent === filter)

  useEffect(() => {
    // Set all items as initially visible to show them immediately
    setVisibleItems(new Set(countries.map((_, index) => index)))

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
    <>
      {/* Filter Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-2 mb-12"
      >
        {continents.map((continent) => (
          <motion.div
            key={continent}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => setFilter(continent)}
              variant={filter === continent ? "default" : "outline"}
              size="sm"
              className="text-sm font-medium"
            >
              {continent === 'all' ? 'All Countries' : continent}
            </Button>
          </motion.div>
        ))}
      </motion.div>

      {/* Countries Grid */}
      <div className="grid gap-6 justify-items-center" style={{gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))'}}>
        <AnimatePresence mode="wait">
          {filteredCountries.map((country, index) => (
            <motion.div 
              key={country.name}
              ref={setRef()}
              data-index={index}
              layout
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
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.05,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              className="text-center cursor-pointer group"
              onClick={() => setSelectedCountry(country)}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-500 border-0 bg-card/50 backdrop-blur">
                <div className="relative h-[93px]">
                  <Image 
                    src={`/assets/images/flags/${country.flag}`} 
                    alt={`${country.name} flag`} 
                    width={140} 
                    height={93} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Visit Date Badge */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Badge variant="secondary" className="text-xs">
                      {country.visitDate}
                    </Badge>
                  </div>

                  {/* Rating Stars */}
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {Array.from({ length: Math.floor(country.rating) }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xs">⭐</span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Badge variant="outline" className="text-xs text-white border-white/20">
                      {country.blogPosts} posts
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={visibleItems.has(index) ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: (index * 0.05) + 0.3 }}
                    className="space-y-2"
                  >
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-all duration-300">
                      {country.name}
                    </h3>
                    <div className="flex items-center justify-center gap-1">
                      <Badge variant="outline" className="text-xs">
                        {country.continent}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <span>{country.duration}</span>
                      <span>•</span>
                      <span>{country.blogPosts} posts</span>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Country Detail Modal */}
      <AnimatePresence>
        {selectedCountry && (
          <CountryModal 
            country={selectedCountry} 
            onClose={() => setSelectedCountry(null)} 
          />
        )}
      </AnimatePresence>
    </>
  )
}