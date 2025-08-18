'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from './ui/badge'
import { Card, CardContent, CardHeader } from './ui/card'

// Define the country data structure
interface CountryData {
  name: string
  coordinates: [number, number]
  visitDate: string
  highlights: string[]
  blogPostsCount: number
  flagCode: string
  description: string
  color: string
}

// Countries data with coordinates and details
const visitedCountries: CountryData[] = [
  {
    name: 'Israel',
    coordinates: [31.7683, 35.2137],
    visitDate: 'September 2024',
    highlights: ['Jerusalem Old City', 'Tel Aviv Beach', 'Masada Sunrise'],
    blogPostsCount: 3,
    flagCode: 'IS',
    description: 'Where the journey began - connecting with roots and ancient history.',
    color: '#3b82f6'
  },
  {
    name: 'Georgia',
    coordinates: [42.3154, 43.3569],
    visitDate: 'September 2024',
    highlights: ['Tbilisi Streets', 'Mountain Villages', 'Wine Country'],
    blogPostsCount: 2,
    flagCode: 'GG',
    description: 'Hidden gem in the Caucasus with incredible hospitality and wine.',
    color: '#8b5cf6'
  },
  {
    name: 'Kenya',
    coordinates: [-1.2921, 36.8219],
    visitDate: 'October 2024',
    highlights: ['Safari Adventures', 'Maasai Culture', 'Nairobi City'],
    blogPostsCount: 4,
    flagCode: 'KE',
    description: 'First taste of Africa - wildlife, culture, and adventure.',
    color: '#10b981'
  },
  {
    name: 'Tanzania',
    coordinates: [-6.3690, 34.8888],
    visitDate: 'October 2024',
    highlights: ['Serengeti Safari', 'Mount Kilimanjaro', 'Zanzibar Beaches'],
    blogPostsCount: 5,
    flagCode: 'TZ',
    description: 'Epic safaris and the roof of Africa.',
    color: '#f59e0b'
  },
  {
    name: 'Rwanda',
    coordinates: [-1.9403, 29.8739],
    visitDate: 'November 2024',
    highlights: ['Gorilla Trekking', 'Kigali Memorial', 'Lake Kivu'],
    blogPostsCount: 3,
    flagCode: 'RW',
    description: 'Land of a thousand hills and incredible conservation efforts.',
    color: '#ef4444'
  },
  {
    name: 'UAE',
    coordinates: [25.2048, 55.2708],
    visitDate: 'November 2024',
    highlights: ['Dubai Skyline', 'Desert Safari', 'Modern Marvels'],
    blogPostsCount: 2,
    flagCode: 'AE',
    description: 'Where tradition meets the future in spectacular fashion.',
    color: '#06b6d4'
  },
  {
    name: 'Nepal',
    coordinates: [27.7172, 85.3240],
    visitDate: 'December 2024',
    highlights: ['Everest Base Camp', 'Annapurna Circuit', 'Kathmandu Temples'],
    blogPostsCount: 6,
    flagCode: 'NP',
    description: 'The Himalayas and spiritual awakening in the mountains.',
    color: '#8b5cf6'
  },
  {
    name: 'Thailand',
    coordinates: [15.8700, 100.9925],
    visitDate: 'January 2025',
    highlights: ['Bangkok Streets', 'Island Paradise', 'Temple Hopping'],
    blogPostsCount: 5,
    flagCode: 'TH',
    description: 'The land of smiles with incredible food and beaches.',
    color: '#f59e0b'
  },
  {
    name: 'Laos',
    coordinates: [19.8563, 102.4955],
    visitDate: 'February 2025',
    highlights: ['Luang Prabang', 'Mekong River', 'Buddhist Temples'],
    blogPostsCount: 4,
    flagCode: 'LA',
    description: 'Peaceful and authentic Southeast Asian experience.',
    color: '#10b981'
  },
  {
    name: 'Cambodia',
    coordinates: [12.5657, 104.9910],
    visitDate: 'February 2025',
    highlights: ['Angkor Wat', 'Phnom Penh', 'Floating Villages'],
    blogPostsCount: 4,
    flagCode: 'CB',
    description: 'Ancient temples and resilient people with rich history.',
    color: '#ef4444'
  },
  {
    name: 'China',
    coordinates: [35.8617, 104.1954],
    visitDate: 'March 2025',
    highlights: ['Great Wall', 'Forbidden City', 'Pandas in Chengdu'],
    blogPostsCount: 6,
    flagCode: 'CH',
    description: 'Ancient civilization meets modern innovation.',
    color: '#dc2626'
  },
  {
    name: 'Vietnam',
    coordinates: [14.0583, 108.2772],
    visitDate: 'April-July 2025',
    highlights: ['Ha Long Bay', 'Ho Chi Minh City', 'Motorbike Adventures'],
    blogPostsCount: 8,
    flagCode: 'VM',
    description: 'Incredible food, stunning landscapes, and motorbike adventures.',
    color: '#059669'
  },
  {
    name: 'Singapore',
    coordinates: [1.3521, 103.8198],
    visitDate: 'April 2025',
    highlights: ['Gardens by the Bay', 'Hawker Centers', 'Marina Bay'],
    blogPostsCount: 2,
    flagCode: 'SN',
    description: 'Modern city-state with amazing food and architecture.',
    color: '#0ea5e9'
  },
  {
    name: 'Philippines',
    coordinates: [12.8797, 121.7740],
    visitDate: 'May-June 2025',
    highlights: ['Palawan Islands', 'Bohol Chocolate Hills', 'Diving Paradise'],
    blogPostsCount: 7,
    flagCode: 'RP',
    description: 'Island paradise with crystal clear waters and incredible diving.',
    color: '#3b82f6'
  },
  {
    name: 'Indonesia',
    coordinates: [-0.7893, 113.9213],
    visitDate: 'May 2025',
    highlights: ['Bali Temples', 'Volcano Climbing', 'Cultural Diversity'],
    blogPostsCount: 5,
    flagCode: 'ID',
    description: 'Diverse archipelago with volcanoes, temples, and culture.',
    color: '#f59e0b'
  },
  {
    name: 'Japan',
    coordinates: [36.2048, 138.2529],
    visitDate: 'April 2025',
    highlights: ['Cherry Blossoms', 'Tokyo Streets', 'Kyoto Temples'],
    blogPostsCount: 6,
    flagCode: 'JA',
    description: 'Where ancient tradition meets cutting-edge technology.',
    color: '#ec4899'
  }
]

export default function InteractiveTravelMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<L.Map | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let L: typeof import('leaflet') | null = null
    
    const initializeMap = async () => {
      // Dynamic import of Leaflet
      const leaflet = await import('leaflet')
      L = leaflet.default

      // Import Leaflet CSS
      await import('leaflet/dist/leaflet.css')

      if (mapRef.current && !leafletMapRef.current) {
        // Initialize map
        leafletMapRef.current = L.map(mapRef.current, {
          center: [20, 0],
          zoom: 2,
          zoomControl: true,
          scrollWheelZoom: true,
          doubleClickZoom: true,
          touchZoom: true
        })

        // Add dark theme tiles
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution: '© OpenStreetMap contributors © CARTO',
          subdomains: 'abcd',
          maxZoom: 18
        }).addTo(leafletMapRef.current)

        // Custom marker icon function
        const createCustomIcon = (country: CountryData, index: number) => {
          return L.divIcon({
            className: 'custom-marker',
            html: `
              <div class="relative group">
                <div class="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold transition-all duration-300 hover:scale-125 cursor-pointer" 
                     style="background: ${country.color}">
                  ${index + 1}
                </div>
                <div class="absolute -top-1 -left-1 w-10 h-10 rounded-full opacity-30 animate-ping" style="background: ${country.color}"></div>
              </div>
            `,
            iconSize: [32, 32],
            iconAnchor: [16, 16]
          })
        }

        // Add markers for each country
        visitedCountries.forEach((country, index) => {
          const marker = L.marker(country.coordinates, {
            icon: createCustomIcon(country, index)
          }).addTo(leafletMapRef.current)

          // Add click event
          marker.on('click', () => {
            setSelectedCountry(country)
            leafletMapRef.current.flyTo(country.coordinates, 6, {
              duration: 1.5
            })
          })

          // Add hover tooltip
          marker.bindTooltip(`
            <div class="text-center">
              <div class="font-bold text-white">${country.name}</div>
              <div class="text-gray-300 text-sm">${country.visitDate}</div>
            </div>
          `, {
            permanent: false,
            direction: 'top',
            className: 'custom-tooltip'
          })
        })

        // Add journey path
        const coordinates = visitedCountries.map(country => country.coordinates)
        L.polyline(coordinates, {
          color: '#3b82f6',
          weight: 3,
          opacity: 0.7,
          dashArray: '10, 10'
        }).addTo(leafletMapRef.current)

        setIsLoaded(true)
      }
    }

    initializeMap()

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
      }
    }
  }, [])

  return (
    <section id="journey" className="py-16 px-6 relative overflow-hidden bg-gradient-to-b from-muted/20 to-muted/40">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 text-sm px-4 py-2">
            Interactive Journey
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Around the World
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Click on numbered markers to explore each destination and discover the stories behind the journey
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="overflow-hidden shadow-xl bg-card/80 backdrop-blur-sm border-border/20">
              <div className="relative">
                <div 
                  ref={mapRef} 
                  className="h-[500px] md:h-[600px] w-full"
                  style={{ background: '#1a1a1a' }}
                />
                {!isLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
                    <div className="text-muted-foreground">Loading interactive map...</div>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Country Details Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {selectedCountry ? (
              <Card className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border-border/20 shadow-xl">
                <CardHeader className="p-0 mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ background: selectedCountry.color }}
                    />
                    <Badge variant="secondary" className="text-xs">
                      {selectedCountry.visitDate}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold">{selectedCountry.name}</h3>
                </CardHeader>
                
                <CardContent className="p-0 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedCountry.description}
                  </p>
                  
                  <div>
                    <h4 className="font-medium mb-2">Highlights</h4>
                    <ul className="space-y-1">
                      {selectedCountry.highlights.map((highlight, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t border-border/50">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">{selectedCountry.blogPostsCount}</span> blog posts written
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="p-6 bg-gradient-to-br from-muted/10 to-muted/5 backdrop-blur-sm border-border/20">
                <div className="text-center space-y-4">
                  <div className="text-4xl">🗺️</div>
                  <div>
                    <h3 className="font-bold mb-2">Explore the Journey</h3>
                    <p className="text-muted-foreground text-sm">
                      Click on any numbered marker to learn more about that destination and see what made it special.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Journey Stats */}
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm border-primary/10">
              <h4 className="font-bold mb-4">Journey Overview</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">16</div>
                  <div className="text-xs text-muted-foreground">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">10</div>
                  <div className="text-xs text-muted-foreground">Months</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">5</div>
                  <div className="text-xs text-muted-foreground">Continents</div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .custom-tooltip {
          background: rgba(0, 0, 0, 0.8) !important;
          border: 1px solid rgba(59, 130, 246, 0.3) !important;
          border-radius: 8px !important;
          color: white !important;
          font-size: 12px !important;
          padding: 8px !important;
          backdrop-filter: blur(4px) !important;
        }
        .custom-tooltip::before {
          border-top-color: rgba(0, 0, 0, 0.8) !important;
        }
        .leaflet-control-zoom {
          background: rgba(0, 0, 0, 0.7) !important;
          border: 1px solid rgba(59, 130, 246, 0.3) !important;
          border-radius: 8px !important;
        }
        .leaflet-control-zoom a {
          background: rgba(0, 0, 0, 0.7) !important;
          color: white !important;
          border: none !important;
        }
        .leaflet-control-zoom a:hover {
          background: rgba(59, 130, 246, 0.3) !important;
        }
      `}</style>
    </section>
  )
}