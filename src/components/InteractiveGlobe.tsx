'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Line, Html } from '@react-three/drei'
import * as THREE from 'three'
import { fullJourneyData, journeyStats, type CountryData } from '@/utils/comprehensive-map-data'
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion'

// Animated counter component
function AnimatedCounter({ value, duration = 2 }: { value: number, duration?: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const controls = animate(count, value, {
      duration,
      ease: "easeOut",
    })

    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v))

    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [count, rounded, value, duration])

  return <span>{displayValue}</span>
}

// GeoJSON types
interface GeoJSONGeometry {
  type: string
  coordinates: number[] | number[][] | number[][][] | number[][][][]
}

interface GeoJSONFeature {
  type: string
  geometry: GeoJSONGeometry
}

interface GeoJSON {
  type: string
  features: GeoJSONFeature[]
}

// Convert lat/lng to 3D coordinates on sphere
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)

  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)

  return new THREE.Vector3(x, y, z)
}

// Create arc between two points on the globe
function createArc(start: THREE.Vector3, end: THREE.Vector3, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = []
  const segments = 50

  for (let i = 0; i <= segments; i++) {
    const t = i / segments

    // Spherical interpolation
    const point = new THREE.Vector3().lerpVectors(start, end, t)

    // Calculate arc height based on distance
    const distance = start.distanceTo(end)
    const arcHeight = Math.min(distance * 0.3, 0.8)
    const heightFactor = Math.sin(t * Math.PI) * arcHeight

    // Push point outward from center
    point.normalize().multiplyScalar(radius + heightFactor)
    points.push(point)
  }

  return points
}

// Process GeoJSON coordinates into line segments for the globe
function processGeoJSONToLines(geoJSON: GeoJSON, radius: number): THREE.Vector3[][] {
  const lines: THREE.Vector3[][] = []

  const processCoordinates = (coords: number[][], r: number) => {
    const points: THREE.Vector3[] = []
    for (const coord of coords) {
      // GeoJSON is [lng, lat], we need [lat, lng]
      const lng = coord[0]
      const lat = coord[1]
      points.push(latLngToVector3(lat, lng, r))
    }
    if (points.length > 1) {
      lines.push(points)
    }
  }

  for (const feature of geoJSON.features) {
    const geometry = feature.geometry

    if (geometry.type === 'Polygon') {
      const coords = geometry.coordinates as number[][][]
      for (const ring of coords) {
        processCoordinates(ring, radius)
      }
    } else if (geometry.type === 'MultiPolygon') {
      const coords = geometry.coordinates as number[][][][]
      for (const polygon of coords) {
        for (const ring of polygon) {
          processCoordinates(ring, radius)
        }
      }
    } else if (geometry.type === 'LineString') {
      const coords = geometry.coordinates as number[][]
      processCoordinates(coords, radius)
    } else if (geometry.type === 'MultiLineString') {
      const coords = geometry.coordinates as number[][][]
      for (const line of coords) {
        processCoordinates(line, radius)
      }
    }
  }

  return lines
}

// Globe with real country outlines from GeoJSON
function GlobeWireframe({ radius, geoData }: { radius: number, geoData: GeoJSON | null }) {
  const wireframeRef = useRef<THREE.Group>(null)

  // Convert GeoJSON to 3D paths
  const countryPaths = useMemo(() => {
    if (!geoData) return []
    return processGeoJSONToLines(geoData, radius * 1.001)
  }, [geoData, radius])

  return (
    <group ref={wireframeRef}>
      {/* Globe sphere - dark */}
      <mesh>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshBasicMaterial color="#0d0d0d" />
      </mesh>

      {/* Country outlines */}
      {countryPaths.map((points, i) => (
        <Line
          key={`country-${i}`}
          points={points}
          color="#444444"
          lineWidth={0.8}
        />
      ))}
    </group>
  )
}

// Location marker component
function LocationMarker({
  position,
  country,
  index,
  isHovered,
  isSelected,
  onHover,
  onLeave,
  onClick
}: {
  position: THREE.Vector3
  country: CountryData
  index: number
  isHovered: boolean
  isSelected: boolean
  onHover: () => void
  onLeave: () => void
  onClick: () => void
}) {
  const markerRef = useRef<THREE.Mesh>(null)

  // Pulse animation
  useFrame((state) => {
    if (markerRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.1
      markerRef.current.scale.setScalar(isHovered || isSelected ? 1.5 : scale)
    }
  })

  const formatCoord = (val: number, isLat: boolean) => {
    const dir = isLat ? (val >= 0 ? 'N' : 'S') : (val >= 0 ? 'E' : 'W')
    return `${Math.abs(val).toFixed(4)}${dir}`
  }

  return (
    <group position={position}>
      {/* Marker square */}
      <mesh
        ref={markerRef}
        onPointerOver={onHover}
        onPointerOut={onLeave}
        onClick={onClick}
      >
        <boxGeometry args={[0.04, 0.04, 0.04]} />
        <meshBasicMaterial color="#f97316" />
      </mesh>

      {/* Label - only show when hovered or selected */}
      {(isHovered || isSelected) && (
        <Html
          position={[0.08, 0.05, 0]}
          style={{
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
          distanceFactor={3}
        >
          <div className="transition-opacity duration-200">
            <div className="text-white font-mono text-sm tracking-wider font-medium uppercase">
              {country.name}
            </div>
            <div className="text-white/50 font-mono text-xs tracking-wide">
              {formatCoord(country.coordinates[0], true)},
            </div>
            <div className="text-white/50 font-mono text-xs tracking-wide">
              {formatCoord(country.coordinates[1], false)}
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}

// Arc path component
function ArcPath({ start, end, radius }: { start: THREE.Vector3, end: THREE.Vector3, radius: number }) {
  const points = useMemo(() => createArc(start, end, radius), [start, end, radius])

  return (
    <Line
      points={points}
      color="#f97316"
      lineWidth={1.5}
      transparent
      opacity={0.6}
    />
  )
}

// Main scene component
function Scene({
  onSelectCountry,
  selectedCountry,
  geoData
}: {
  onSelectCountry: (country: CountryData | null) => void
  selectedCountry: CountryData | null
  geoData: GeoJSON | null
}) {
  const groupRef = useRef<THREE.Group>(null)
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const [autoRotate, setAutoRotate] = useState(true)

  const radius = 2

  // Auto rotation
  useFrame((state, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.1
    }
  })

  // Get 3D positions for all locations
  const locationPositions = useMemo(() => {
    return fullJourneyData.map(country => ({
      country,
      position: latLngToVector3(country.coordinates[0], country.coordinates[1], radius * 1.01)
    }))
  }, [radius])

  // Get arc connections (sequential journey)
  const arcs = useMemo(() => {
    const connections: { start: THREE.Vector3, end: THREE.Vector3 }[] = []

    for (let i = 0; i < fullJourneyData.length - 1; i++) {
      const startCountry = fullJourneyData[i]
      const endCountry = fullJourneyData[i + 1]

      connections.push({
        start: latLngToVector3(startCountry.coordinates[0], startCountry.coordinates[1], radius),
        end: latLngToVector3(endCountry.coordinates[0], endCountry.coordinates[1], radius)
      })
    }

    return connections
  }, [radius])

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />

      {/* Controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={3}
        maxDistance={8}
        autoRotate={false}
        onStart={() => setAutoRotate(false)}
        onEnd={() => {
          // Resume auto-rotate after 3 seconds of inactivity
          setTimeout(() => setAutoRotate(true), 3000)
        }}
      />

      {/* Globe group */}
      <group ref={groupRef}>
        {/* Globe wireframe */}
        <GlobeWireframe radius={radius} geoData={geoData} />

        {/* Arc paths */}
        {arcs.map((arc, i) => (
          <ArcPath
            key={i}
            start={arc.start}
            end={arc.end}
            radius={radius}
          />
        ))}

        {/* Location markers */}
        {locationPositions.map(({ country, position }, index) => (
          <LocationMarker
            key={country.name}
            position={position}
            country={country}
            index={index}
            isHovered={hoveredCountry === country.name}
            isSelected={selectedCountry?.name === country.name}
            onHover={() => setHoveredCountry(country.name)}
            onLeave={() => setHoveredCountry(null)}
            onClick={() => onSelectCountry(selectedCountry?.name === country.name ? null : country)}
          />
        ))}
      </group>
    </>
  )
}

// Main export component
export default function InteractiveGlobe() {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null)
  const [geoData, setGeoData] = useState<GeoJSON | null>(null)

  // Fetch world map GeoJSON data
  useEffect(() => {
    const fetchGeoJSON = async () => {
      try {
        // Using Natural Earth 110m simplified countries data
        const response = await fetch(
          'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson'
        )
        const data = await response.json()
        setGeoData(data)
      } catch (error) {
        console.error('Failed to load GeoJSON:', error)
      }
    }
    fetchGeoJSON()
  }, [])

  return (
    <section id="journey" className="py-20 relative overflow-hidden bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12"
        >
          <div>
            <span className="font-mono text-sm tracking-[0.2em] text-white/40 uppercase block mb-4">
              [ Interactive Journey ]
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-white">
              Around the World
            </h2>
          </div>
          <p className="text-white/50 text-lg leading-relaxed max-w-md md:text-right">
            Click and drag to explore. Click on markers to discover each destination.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Globe Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-2 w-full"
          >
            <div className="overflow-hidden rounded-xl bg-black h-[400px] sm:h-[500px] md:h-[600px] w-full">
              <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                style={{ background: '#0a0a0a' }}
              >
                <Scene
                  onSelectCountry={setSelectedCountry}
                  selectedCountry={selectedCountry}
                  geoData={geoData}
                />
              </Canvas>
            </div>
          </motion.div>

          {/* Country Details Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <AnimatePresence mode="wait">
              {selectedCountry ? (
                <motion.div
                  key={selectedCountry.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="p-6 border border-white/10">
                    <div className="mb-4">
                      <span className="font-mono text-xs tracking-wider text-white/40 uppercase">
                        {selectedCountry.visitDate}
                      </span>
                      <h3 className="text-2xl font-light text-white mt-1">{selectedCountry.name}</h3>
                    </div>

                    <p className="text-white/50 leading-relaxed mb-6">
                      {selectedCountry.description}
                    </p>

                    <div className="space-y-2">
                      {selectedCountry.highlights.map((highlight, index) => (
                        <div key={index} className="text-sm text-white/40 flex items-center gap-3">
                          <div className="w-1 h-1 bg-white/40" />
                          {highlight}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10">
                      <span className="text-xs text-white/30 uppercase tracking-wider">
                        {selectedCountry.blogPostsCount} stories written
                      </span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="p-6 border border-white/10">
                    <h3 className="font-light text-lg mb-2 text-white">Select a destination</h3>
                    <p className="text-white/40 text-sm">
                      Click on any marker to explore.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Journey Stats */}
            <motion.div
              className="grid grid-cols-2 border border-white/10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="p-4 text-center border-r border-white/10">
                <div className="text-2xl font-extralight text-white">
                  <AnimatedCounter value={18} duration={1.5} />
                </div>
                <div className="text-xs text-white/40 uppercase tracking-wider mt-1">Countries</div>
              </div>
              <div className="p-4 text-center">
                <div className="text-2xl font-extralight text-white">
                  <AnimatedCounter value={journeyStats.totalBlogPosts} duration={2} />
                </div>
                <div className="text-xs text-white/40 uppercase tracking-wider mt-1">Blogs</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
