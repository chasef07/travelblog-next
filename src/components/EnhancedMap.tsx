'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Map as LeafletMap, Marker } from 'leaflet'

interface Location {
  name: string
  coordinates: [number, number]
  visitDate: string
  highlights: string[]
  blogPosts: number
  photos: string[]
  description: string
}

const journeyLocations: Location[] = [
  { 
    name: 'Israel', 
    coordinates: [31.7683, 35.2137],
    visitDate: 'September 2024',
    highlights: ['Jerusalem Old City', 'Tel Aviv Beach', 'Masada Sunrise'],
    blogPosts: 3,
    photos: ['/assets/images/misc/holyholy.jpg'],
    description: 'Where the journey began - connecting with roots and ancient history.'
  },
  { 
    name: 'Georgia', 
    coordinates: [41.7151, 44.8271],
    visitDate: 'October 2024',
    highlights: ['Gudauri Skiing', 'Tbilisi Old Town', 'Investment Purchase'],
    blogPosts: 5,
    photos: ['/assets/images/misc/blarg-2.jpg'],
    description: 'Mountain adventures and making our first international investment.'
  },
  { 
    name: 'Kenya', 
    coordinates: [-1.286389, 36.817223],
    visitDate: 'November 2024',
    highlights: ['Safari Adventure', 'Masai Mara', 'Wildlife Photography'],
    blogPosts: 4,
    photos: ['/assets/images/misc/serengeti-2.jpg'],
    description: 'Epic safari adventures and witnessing the Great Migration.'
  },
  { 
    name: 'Tanzania', 
    coordinates: [-6.1630, 35.7516],
    visitDate: 'November 2024',
    highlights: ['Serengeti Safari', 'Ngorongoro Crater', 'Big Five'],
    blogPosts: 6,
    photos: ['/assets/images/misc/serengeti-2.jpg'],
    description: 'The crown jewel of African safaris - unforgettable wildlife encounters.'
  },
  { 
    name: 'Rwanda', 
    coordinates: [-1.9403, 29.8739],
    visitDate: 'November 2024',
    highlights: ['Coffee Farms', 'Kigali City', 'Genocide Memorial'],
    blogPosts: 3,
    photos: ['/assets/images/misc/serengeti-2.jpg'],
    description: 'Land of a thousand hills with incredible coffee and inspiring resilience.'
  },
  { 
    name: 'UAE', 
    coordinates: [25.2048, 55.2708],
    visitDate: 'December 2024',
    highlights: ['Dubai Skyline', 'Desert Safari', 'Modern Architecture'],
    blogPosts: 2,
    photos: ['/assets/images/misc/serengeti-2.jpg'],
    description: 'Futuristic city in the desert - luxury and innovation.'
  },
  { 
    name: 'Nepal', 
    coordinates: [27.7172, 85.3240],
    visitDate: 'January 2025',
    highlights: ['Himalayan Views', 'Kathmandu Temples', 'Mountain Culture'],
    blogPosts: 4,
    photos: ['/assets/images/misc/serengeti-2.jpg'],
    description: 'Roof of the world - spiritual mountains and ancient traditions.'
  },
  { 
    name: 'Thailand', 
    coordinates: [13.7563, 100.5018],
    visitDate: 'January 2025',
    highlights: ['Muay Thai Training', 'Chiang Rai', 'Island Hopping'],
    blogPosts: 8,
    photos: ['/assets/images/misc/waterfall1.jpg'],
    description: 'Land of smiles - training, beaches, and incredible food.'
  },
  { 
    name: 'Laos', 
    coordinates: [17.9757, 102.6331],
    visitDate: 'February 2025',
    highlights: ['Nong Khiaw Trekking', 'Baci Ceremony', 'Farm Volunteering'],
    blogPosts: 12,
    photos: ['/assets/images/misc/meview.jpg'],
    description: 'Authentic culture preserved - mountain adventures and spiritual ceremonies.'
  },
  { 
    name: 'Cambodia', 
    coordinates: [11.5564, 104.9282],
    visitDate: 'February 2025',
    highlights: ['Koh Sdach Island', 'Phnom Penh', 'Island Paradise'],
    blogPosts: 3,
    photos: ['/assets/images/misc/kohsdach.jpg'],
    description: 'Hidden island paradise and vibrant capital city discoveries.'
  },
  { 
    name: 'China', 
    coordinates: [30.5728, 104.0668],
    visitDate: 'March 2025',
    highlights: ['Great Wall', 'Modern Cities', 'Cultural Heritage'],
    blogPosts: 4,
    photos: ['/assets/images/misc/serengeti-2.jpg'],
    description: 'Ancient culture meets modern innovation in the Middle Kingdom.'
  },
  { 
    name: 'Vietnam', 
    coordinates: [21.0285, 105.8544],
    visitDate: 'April 2025',
    highlights: ['Motorbike Adventures', 'Rice Terraces', 'Street Food'],
    blogPosts: 6,
    photos: ['/assets/images/misc/droneshotrice.jpg'],
    description: 'Epic motorbike journey through terraced landscapes and vibrant cities.'
  },
  { 
    name: 'Singapore', 
    coordinates: [1.3521, 103.8198],
    visitDate: 'April 2025',
    highlights: ['Modern Architecture', 'Food Scene', 'City Gardens'],
    blogPosts: 2,
    photos: ['/assets/images/misc/serengeti-2.jpg'],
    description: 'Garden city at the crossroads of Asia - culinary and architectural marvels.'
  },
  { 
    name: 'Philippines', 
    coordinates: [9.9432, 123.3966],
    visitDate: 'May 2025',
    highlights: ['Island Hopping', 'Surfing', 'Turquoise Waters'],
    blogPosts: 5,
    photos: ['/assets/images/misc/canyoneering.jpg'],
    description: 'Paradise islands with world-class surfing and crystal clear waters.'
  },
  { 
    name: 'Indonesia', 
    coordinates: [-8.5069, 115.2625],
    visitDate: 'June 2025',
    highlights: ['Bali Temples', 'Surfing', 'Island Culture'],
    blogPosts: 7,
    photos: ['/assets/images/misc/indoprof.jpg'],
    description: 'Spiritual temples, world-class waves, and rich cultural traditions.'
  },
  { 
    name: 'Japan', 
    coordinates: [43.0618, 141.3545],
    visitDate: 'July 2025',
    highlights: ['Hokkaido Nature', 'Japanese Cuisine', 'Cultural Immersion'],
    blogPosts: 6,
    photos: ['/assets/images/food/sush.jpg'],
    description: 'Northern gem with pristine nature, incredible cuisine, and deep culture.'
  }
]

interface MapControlsProps {
  onLocationSelect: (location: Location | null) => void
  selectedLocation: Location | null
  onAnimateJourney: () => void
  isAnimating: boolean
}

function MapControls({ onLocationSelect, selectedLocation, onAnimateJourney, isAnimating }: MapControlsProps) {
  return (
    <>
      {/* Journey Animation Button - Top Center */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30"
      >
        <motion.button
          onClick={onAnimateJourney}
          disabled={isAnimating}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          animate={!isAnimating ? { 
            boxShadow: ['0 0 0 0 rgba(59, 130, 246, 0.7)', '0 0 0 20px rgba(59, 130, 246, 0)', '0 0 0 0 rgba(59, 130, 246, 0)']
          } : {}}
          transition={{ 
            boxShadow: { duration: 2, repeat: Infinity },
            scale: { duration: 0.2 },
            y: { duration: 0.2 }
          }}
          className={`relative bg-primary hover:bg-primary/90 rounded-full px-6 py-3 text-primary-foreground font-semibold text-base shadow-lg transition-all duration-300 ${
            isAnimating 
              ? 'opacity-75 cursor-not-allowed' 
              : 'hover:shadow-xl'
          }`}
        >
          <div className="flex items-center gap-4">
            <motion.div 
              className={`w-3 h-3 rounded-full bg-primary-foreground ${isAnimating ? 'animate-pulse' : 'animate-bounce'}`}
              animate={!isAnimating ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="flex items-center gap-2">
              {isAnimating ? (
                <span>Exploring Journey...</span>
              ) : (
                <span>Take Journey Tour</span>
              )}
            </span>
          </div>
          
          {/* Pulsing ring effect */}
          {!isAnimating && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary-foreground/30"
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.button>
      </motion.div>

      {/* Location Info Panel */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="absolute top-4 left-4 bg-card/95 backdrop-blur border rounded-xl p-4 max-w-sm z-10 shadow-lg"
          >
            <div>
              <h3 className="font-bold text-lg mb-2 text-foreground">{selectedLocation.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{selectedLocation.visitDate}</p>
              <p className="text-sm text-foreground/90 mb-3">{selectedLocation.description}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{selectedLocation.blogPosts} posts</span>
                <span>{selectedLocation.highlights.length} highlights</span>
              </div>
            </div>
            <button
              onClick={() => onLocationSelect(null)}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function EnhancedMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<LeafletMap | null>(null)
  const markersRef = useRef<Marker[]>([])
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)

  const animateJourney = async () => {
    if (!leafletMapRef.current || isAnimating) return
    
    setIsAnimating(true)
    const map = leafletMapRef.current
    
    for (let i = 0; i < journeyLocations.length; i++) {
      const location = journeyLocations[i]
      
      // Fly to each location
      map.flyTo(location.coordinates, 6, {
        duration: 1.5
      })
      
      // Show location info briefly
      setSelectedLocation(location)
      
      // Wait before moving to next location
      await new Promise(resolve => setTimeout(resolve, 2000))
    }
    
    // Return to full view
    const L = (await import('leaflet')).default
    const group = new L.FeatureGroup(markersRef.current)
    map.fitBounds(group.getBounds(), { padding: [50, 50] })
    
    setSelectedLocation(null)
    setIsAnimating(false)
  }

  useEffect(() => {
    if (leafletMapRef.current) return

    const initMap = async () => {
      const L = (await import('leaflet')).default

      if (!mapRef.current) return
      if ((mapRef.current as HTMLDivElement).classList.contains("leaflet-container")) return

      const map = L.map(mapRef.current as HTMLDivElement, {
        minZoom: 2,
        maxZoom: 10,
        worldCopyJump: true,
        zoomControl: false,
        scrollWheelZoom: true,
        dragging: true,
        attributionControl: false
      }).setView([20, 80], 3)

      leafletMapRef.current = map

      // Custom zoom control
      L.control.zoom({ position: 'bottomright' }).addTo(map)

      // Dark theme tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors © CARTO',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map)

      // Create custom markers and journey path
      const path: [number, number][] = []
      const markers: Marker[] = []

      journeyLocations.forEach((location, index) => {
        // Custom marker icon
        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `
            <div class="relative">
              <div class="w-8 h-8 bg-primary rounded-full border-2 border-background shadow-lg flex items-center justify-center text-primary-foreground text-xs font-bold animate-pulse">
                ${index + 1}
              </div>
              <div class="absolute -top-1 -left-1 w-10 h-10 bg-primary/20 rounded-full animate-ping"></div>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        })

        const marker = L.marker(location.coordinates, { icon: customIcon }).addTo(map)
        
        // Custom popup content
        const popupContent = `
          <div class="glass rounded-lg p-4 min-w-[280px]">
            <h3 class="font-bold text-lg mb-2 gradient-text">${location.name}</h3>
            <p class="text-sm text-gray-600 mb-2">${location.visitDate}</p>
            <p class="text-sm mb-3">${location.description}</p>
            <div class="flex flex-wrap gap-1 mb-3">
              ${location.highlights.map(highlight => 
                `<span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">${highlight}</span>`
              ).join('')}
            </div>
            <div class="flex items-center justify-between text-xs text-gray-500">
              <span>${location.blogPosts} blog posts</span>
              <span>${location.photos.length} photos</span>
            </div>
          </div>
        `
        
        marker.bindPopup(popupContent, {
          maxWidth: 300,
          className: 'custom-popup'
        })

        // Add click handler
        marker.on('click', () => {
          setSelectedLocation(location)
        })

        markers.push(marker)
        path.push(location.coordinates)
      })

      markersRef.current = markers

      // Create animated journey line
      const journeyLine = L.polyline(path, {
        color: 'hsl(var(--primary))',
        weight: 4,
        opacity: 0.8,
        dashArray: '10, 10',
        className: 'journey-line animate-pulse'
      }).addTo(map)

      // Fit map to show all locations
      map.fitBounds(journeyLine.getBounds(), { padding: [80, 80] })
      
      setMapLoaded(true)
    }

    initMap()

    const handleResize = () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.invalidateSize()
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
      }
    }
  }, [])

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden">
      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Map Controls Overlay */}
      {mapLoaded && (
        <MapControls
          onLocationSelect={setSelectedLocation}
          selectedLocation={selectedLocation}
          onAnimateJourney={animateJourney}
          isAnimating={isAnimating}
        />
      )}

      {/* Loading State */}
      {!mapLoaded && (
        <div className="absolute inset-0 glass flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white"
          >
            <div className="w-12 h-12 border-3 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
            <p className="font-medium">Loading interactive journey map...</p>
          </motion.div>
        </div>
      )}

    </div>
  )
}