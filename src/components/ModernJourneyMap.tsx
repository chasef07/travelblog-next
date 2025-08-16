'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Calendar, Camera, MessageSquare, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import Image from 'next/image'
import type { Map as LeafletMap, Marker } from 'leaflet'

interface Location {
  name: string
  coordinates: [number, number]
  visitDate: string
  highlights: string[]
  blogPosts: number
  photos: string[]
  description: string
  flag: string
}

const journeyLocations: Location[] = [
  { 
    name: 'Israel', 
    coordinates: [31.7683, 35.2137],
    visitDate: 'September 2024',
    highlights: ['Jerusalem Old City', 'Tel Aviv Beach', 'Masada Sunrise'],
    blogPosts: 3,
    photos: ['/assets/images/misc/holyholy.jpg'],
    description: 'Where the journey began - connecting with roots and ancient history.',
    flag: 'IS-flag.jpg'
  },
  { 
    name: 'Georgia', 
    coordinates: [41.7151, 44.8271],
    visitDate: 'October 2024',
    highlights: ['Gudauri Skiing', 'Tbilisi Old Town', 'Investment Purchase'],
    blogPosts: 5,
    photos: ['/assets/images/misc/blarg-2.jpg'],
    description: 'Mountain adventures and making our first international investment.',
    flag: 'GG-flag.jpg'
  },
  { 
    name: 'Kenya', 
    coordinates: [-1.286389, 36.817223],
    visitDate: 'November 2024',
    highlights: ['Safari Adventure', 'Masai Mara', 'Wildlife Photography'],
    blogPosts: 4,
    photos: ['/assets/images/misc/serengeti-2.jpg'],
    description: 'Epic safari adventures and witnessing the Great Migration.',
    flag: 'KE-flag.jpg'
  },
  { 
    name: 'Tanzania', 
    coordinates: [-6.1630, 35.7516],
    visitDate: 'November 2024',
    highlights: ['Serengeti Safari', 'Ngorongoro Crater', 'Big Five'],
    blogPosts: 6,
    photos: ['/assets/images/misc/serengeti-2.jpg'],
    description: 'The crown jewel of African safaris - unforgettable wildlife encounters.',
    flag: 'TZ-flag.jpg'
  },
  { 
    name: 'Rwanda', 
    coordinates: [-1.9403, 29.8739],
    visitDate: 'November 2024',
    highlights: ['Coffee Farms', 'Kigali City', 'Genocide Memorial'],
    blogPosts: 3,
    photos: ['/assets/images/misc/serengeti-2.jpg'],
    description: 'Land of a thousand hills with incredible coffee and inspiring resilience.',
    flag: 'RW-flag.jpg'
  },
  { 
    name: 'UAE', 
    coordinates: [25.2048, 55.2708],
    visitDate: 'December 2024',
    highlights: ['Dubai Skyline', 'Desert Safari', 'Modern Architecture'],
    blogPosts: 2,
    photos: ['/assets/images/misc/serengeti-2.jpg'],
    description: 'Futuristic city in the desert - luxury and innovation.',
    flag: 'AE-flag.jpg'
  },
  { 
    name: 'Nepal', 
    coordinates: [27.7172, 85.3240],
    visitDate: 'January 2025',
    highlights: ['Himalayan Views', 'Kathmandu Temples', 'Mountain Culture'],
    blogPosts: 4,
    photos: ['/assets/images/misc/serengeti-2.jpg'],
    description: 'Roof of the world - spiritual mountains and ancient traditions.',
    flag: 'nepalflag.jpg'
  },
  { 
    name: 'Thailand', 
    coordinates: [13.7563, 100.5018],
    visitDate: 'January 2025',
    highlights: ['Muay Thai Training', 'Chiang Rai', 'Island Hopping'],
    blogPosts: 8,
    photos: ['/assets/images/misc/waterfall1.jpg'],
    description: 'Land of smiles - training, beaches, and incredible food.',
    flag: 'TH-flag.jpg'
  },
  { 
    name: 'Laos', 
    coordinates: [17.9757, 102.6331],
    visitDate: 'February 2025',
    highlights: ['Nong Khiaw Trekking', 'Baci Ceremony', 'Farm Volunteering'],
    blogPosts: 12,
    photos: ['/assets/images/misc/meview.jpg'],
    description: 'Authentic culture preserved - mountain adventures and spiritual ceremonies.',
    flag: 'LA-flag.jpg'
  },
  { 
    name: 'Cambodia', 
    coordinates: [11.5564, 104.9282],
    visitDate: 'February 2025',
    highlights: ['Koh Sdach Island', 'Phnom Penh', 'Island Paradise'],
    blogPosts: 3,
    photos: ['/assets/images/misc/kohsdach.jpg'],
    description: 'Hidden island paradise and vibrant capital city discoveries.',
    flag: 'CB-flag.jpg'
  },
  { 
    name: 'China', 
    coordinates: [30.5728, 104.0668],
    visitDate: 'March 2025',
    highlights: ['Great Wall', 'Modern Cities', 'Cultural Heritage'],
    blogPosts: 4,
    photos: ['/assets/images/misc/serengeti-2.jpg'],
    description: 'Ancient culture meets modern innovation in the Middle Kingdom.',
    flag: 'CH-flag.jpg'
  },
  { 
    name: 'Vietnam', 
    coordinates: [21.0285, 105.8544],
    visitDate: 'April 2025',
    highlights: ['Motorbike Adventures', 'Rice Terraces', 'Street Food'],
    blogPosts: 6,
    photos: ['/assets/images/misc/droneshotrice.jpg'],
    description: 'Epic motorbike journey through terraced landscapes and vibrant cities.',
    flag: 'VM-flag.jpg'
  },
  { 
    name: 'Singapore', 
    coordinates: [1.3521, 103.8198],
    visitDate: 'April 2025',
    highlights: ['Modern Architecture', 'Food Scene', 'City Gardens'],
    blogPosts: 2,
    photos: ['/assets/images/misc/serengeti-2.jpg'],
    description: 'Garden city at the crossroads of Asia - culinary and architectural marvels.',
    flag: 'SN-flag.jpg'
  },
  { 
    name: 'Philippines', 
    coordinates: [9.9432, 123.3966],
    visitDate: 'May 2025',
    highlights: ['Island Hopping', 'Surfing', 'Turquoise Waters'],
    blogPosts: 5,
    photos: ['/assets/images/misc/canyoneering.jpg'],
    description: 'Paradise islands with world-class surfing and crystal clear waters.',
    flag: 'RP-flag.jpg'
  },
  { 
    name: 'Indonesia', 
    coordinates: [-8.5069, 115.2625],
    visitDate: 'June 2025',
    highlights: ['Bali Temples', 'Surfing', 'Island Culture'],
    blogPosts: 7,
    photos: ['/assets/images/misc/indoprof.jpg'],
    description: 'Spiritual temples, world-class waves, and rich cultural traditions.',
    flag: 'ID-flag.jpg'
  },
  { 
    name: 'Japan', 
    coordinates: [43.0618, 141.3545],
    visitDate: 'July 2025',
    highlights: ['Hokkaido Nature', 'Japanese Cuisine', 'Cultural Immersion'],
    blogPosts: 6,
    photos: ['/assets/images/food/sush.jpg'],
    description: 'Northern gem with pristine nature, incredible cuisine, and deep culture.',
    flag: 'JA-flag.jpg'
  }
]

interface LocationCardProps {
  location: Location
  onClose: () => void
}

function LocationCard({ location, onClose }: LocationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="absolute top-4 left-4 z-20 max-w-sm"
    >
      <Card className="overflow-hidden bg-card/95 backdrop-blur-md border-border/50 shadow-xl">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-6 rounded overflow-hidden ring-2 ring-border">
                <Image 
                  src={`/assets/images/flags/${location.flag}`}
                  alt={`${location.name} flag`}
                  width={32}
                  height={24}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-lg">{location.name}</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-muted-foreground hover:text-foreground"
              onClick={onClose}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {location.visitDate}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-sm text-foreground/90 leading-relaxed">
            {location.description}
          </p>
          
          <div className="flex flex-wrap gap-1">
            {location.highlights.slice(0, 3).map((highlight, index) => (
              <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                {highlight}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
            <div className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              <span>{location.blogPosts} posts</span>
            </div>
            <div className="flex items-center gap-1">
              <Camera className="h-3 w-3" />
              <span>{location.photos.length} photos</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function ModernJourneyMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<LeafletMap | null>(null)
  const markersRef = useRef<Marker[]>([])
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)

  useEffect(() => {
    if (leafletMapRef.current) return

    const initMap = async () => {
      const L = (await import('leaflet')).default

      if (!mapRef.current) return
      if ((mapRef.current as HTMLDivElement).classList.contains("leaflet-container")) return

      const map = L.map(mapRef.current as HTMLDivElement, {
        minZoom: 2,
        maxZoom: 8,
        worldCopyJump: true,
        zoomControl: false,
        scrollWheelZoom: true,
        dragging: true,
        attributionControl: false
      }).setView([20, 80], 3)

      leafletMapRef.current = map

      // Elegant zoom control
      L.control.zoom({ 
        position: 'bottomright',
        zoomInTitle: 'Zoom in',
        zoomOutTitle: 'Zoom out'
      }).addTo(map)

      // Modern dark tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors © CARTO',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map)

      // Create journey path
      const path: [number, number][] = []
      const markers: Marker[] = []

      journeyLocations.forEach((location, index) => {
        // Sophisticated marker design
        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `
            <div class="relative group cursor-pointer">
              <div class="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold transition-all duration-300 hover:scale-125 hover:shadow-xl">
                ${index + 1}
              </div>
              <div class="absolute -top-1 -left-1 w-8 h-8 bg-blue-400/20 rounded-full animate-ping opacity-75"></div>
              <div class="absolute -top-2 -left-2 w-10 h-10 bg-blue-400/10 rounded-full transition-all duration-300 group-hover:scale-150"></div>
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        })

        const marker = L.marker(location.coordinates, { icon: customIcon }).addTo(map)
        
        // Hover effects
        marker.on('mouseover', () => setHoveredLocation(location.name))
        marker.on('mouseout', () => setHoveredLocation(null))
        
        // Click to show details
        marker.on('click', () => {
          setSelectedLocation(location)
          map.flyTo(location.coordinates, 5, { duration: 1 })
        })

        markers.push(marker)
        path.push(location.coordinates)
      })

      markersRef.current = markers

      // Elegant journey line
      const journeyLine = L.polyline(path, {
        color: '#3b82f6',
        weight: 3,
        opacity: 0.7,
        dashArray: '8, 8',
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(map)

      // Fit map to show all locations with padding
      map.fitBounds(journeyLine.getBounds(), { 
        padding: [50, 50],
        maxZoom: 6
      })
      
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
    <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-muted/20 to-muted/40">
      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Interactive Elements */}
      {mapLoaded && (
        <>
          {/* Location Details Card */}
          <AnimatePresence>
            {selectedLocation && (
              <LocationCard
                location={selectedLocation}
                onClose={() => setSelectedLocation(null)}
              />
            )}
          </AnimatePresence>

          {/* Hover Location Preview */}
          <AnimatePresence>
            {hoveredLocation && !selectedLocation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-4 right-4 z-10"
              >
                <Card className="bg-card/90 backdrop-blur-sm border-border/50">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-blue-500" />
                      <span className="text-sm font-medium">{hoveredLocation}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Click to explore
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Journey Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-4 left-4 z-10"
          >
            <Card className="bg-card/90 backdrop-blur-sm border-border/50">
              <CardContent className="p-3">
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-lg">{journeyLocations.length}</div>
                    <div className="text-xs text-muted-foreground">Countries</div>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div className="text-center">
                    <div className="font-bold text-lg">
                      {journeyLocations.reduce((sum, loc) => sum + loc.blogPosts, 0)}
                    </div>
                    <div className="text-xs text-muted-foreground">Stories</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}

      {/* Loading State */}
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm font-medium text-muted-foreground">Loading journey map...</p>
          </motion.div>
        </div>
      )}
    </div>
  )
}