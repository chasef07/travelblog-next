'use client'

import 'leaflet/dist/leaflet.css'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from './ui/badge'
import { Card, CardContent, CardHeader } from './ui/card'
import {
  fullJourneyData,
  journeyStats,
  type CountryData,
} from '@/content/journey'

export default function InteractiveTravelMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<L.Map | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(
    null,
  )
  const [isLoaded, setIsLoaded] = useState(false)

  // Use comprehensive journey data
  const visitedCountries = fullJourneyData

  useEffect(() => {
    let L: typeof import('leaflet') | null = null

    const initializeMap = async () => {
      // Dynamic import of Leaflet
      const leaflet = await import('leaflet')
      L = leaflet.default

      // Import Leaflet CSS - CSS is handled globally in layout

      if (mapRef.current && !leafletMapRef.current) {
        // Initialize map with global view
        leafletMapRef.current = L.map(mapRef.current, {
          center: [20, 20], // Global center for better world view
          zoom: 2,
          zoomControl: true,
          scrollWheelZoom: true,
          doubleClickZoom: true,
          touchZoom: true,
        })

        // Add dark theme tiles
        L.tileLayer(
          'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
          {
            attribution: '© OpenStreetMap contributors © CARTO',
            subdomains: 'abcd',
            maxZoom: 18,
          },
        ).addTo(leafletMapRef.current)

        // Custom marker icon function - mobile-friendly design with single color
        const createCustomIcon = (index: number) => {
          const markerColor = '#3b82f6' // Single primary color for all markers
          return L!.divIcon({
            className: 'custom-marker',
            html: `
              <div class="relative group">
                <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white shadow-xl flex items-center justify-center text-white text-sm sm:text-base font-bold transition-all duration-300 hover:scale-110 cursor-pointer backdrop-blur-sm"
                     style="background: linear-gradient(135deg, ${markerColor}dd, ${markerColor});">
                  ${index + 1}
                </div>
                <div class="absolute -top-1 -left-1 w-12 h-12 sm:w-14 sm:h-14 rounded-full opacity-20 animate-ping" style="background: ${markerColor}"></div>
              </div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
          })
        }

        // Add markers for each country
        visitedCountries.forEach((country, index) => {
          const marker = L!
            .marker(country.coordinates, {
              icon: createCustomIcon(index),
            })
            .addTo(leafletMapRef.current!)

          // Add click event
          marker.on('click', () => {
            setSelectedCountry(country)
            leafletMapRef.current!.flyTo(country.coordinates, 6, {
              duration: 1.5,
            })
          })

          // Add hover tooltip
          marker.bindTooltip(
            `
            <div class="text-center">
              <div class="font-bold text-white">${country.name}</div>
              <div class="text-gray-300 text-sm">${country.visitDate}</div>
            </div>
          `,
            {
              permanent: false,
              direction: 'top',
              className: 'custom-tooltip',
            },
          )
        })

        // Add journey path
        const coordinates = visitedCountries.map(
          (country) => country.coordinates,
        )
        L!
          .polyline(coordinates, {
            color: '#3b82f6',
            weight: 3,
            opacity: 0.7,
            dashArray: '10, 10',
          })
          .addTo(leafletMapRef.current!)

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
  }, [visitedCountries])

  return (
    <section
      id="journey"
      className="py-16 px-6 relative overflow-hidden bg-muted/5"
    >
      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 text-sm px-4 py-2">
            Interactive Journey
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Around the World
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Click on numbered markers to explore each destination and discover
            the stories behind the journey
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-2"
          >
            <div className="overflow-hidden rounded-xl shadow-xl bg-background">
              <div
                ref={mapRef}
                className="h-[500px] md:h-[600px] w-full"
                style={{ background: '#1a1a1a' }}
              />
              {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
                  <div className="text-muted-foreground">
                    Loading interactive map...
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Country Details Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, margin: '-100px' }}
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
                        <li
                          key={index}
                          className="text-sm text-muted-foreground flex items-center gap-2"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">
                        {selectedCountry.blogPostsCount}
                      </span>{' '}
                      blog posts written
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="p-6 bg-gradient-to-br from-muted/10 to-muted/5 backdrop-blur-sm border-border/20">
                <div className="text-center space-y-4">
                  <div>
                    <h3 className="font-bold mb-2">Explore the Journey</h3>
                    <p className="text-muted-foreground text-sm">
                      Click on any numbered marker to learn more about that
                      destination and see what made it special.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Journey Stats */}
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm border-primary/10">
              <h4 className="font-bold mb-4">Complete Journey Overview</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {journeyStats.totalCountries}
                  </div>
                  <div className="text-xs text-muted-foreground">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {journeyStats.totalBlogPosts}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Blog Posts
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {journeyStats.durationMonths}
                  </div>
                  <div className="text-xs text-muted-foreground">Months</div>
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
