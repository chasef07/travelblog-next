'use client'

import { useRef, useMemo, useState, memo, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Line, Html, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { fullJourneyData, type CountryData } from '@/utils/comprehensive-map-data'

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

// Simple atmosphere glow (no custom shader)
function Atmosphere({ radius }: { radius: number }) {
  return (
    <mesh scale={[1.12, 1.12, 1.12]}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshBasicMaterial
        color="#ff4d00"
        transparent
        opacity={0.08}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

// Globe with real country outlines from GeoJSON
const GlobeWireframe = memo(function GlobeWireframe({ radius, geoData }: { radius: number, geoData: GeoJSON | null }) {
  const countryPaths = useMemo(() => {
    if (!geoData) return []
    return processGeoJSONToLines(geoData, radius * 1.001)
  }, [geoData, radius])

  return (
    <group>
      {/* Base sphere - pure black void */}
      <mesh>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Subtle inner glow */}
      <mesh>
        <sphereGeometry args={[radius * 0.99, 48, 48]} />
        <meshBasicMaterial color="#080808" transparent opacity={0.5} />
      </mesh>

      {/* Country outlines - subtle but visible */}
      {countryPaths.map((points, i) => (
        <Line
          key={`country-${i}`}
          points={points}
          color="#333333"
          lineWidth={0.6}
          transparent
          opacity={0.7}
        />
      ))}

      {/* Atmosphere glow */}
      <Atmosphere radius={radius} />
    </group>
  )
})

// Location marker component - Enhanced with glow
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
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (markerRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3 + index * 0.5) * 0.2
      const baseScale = isHovered || isSelected ? 1.8 : pulse
      markerRef.current.scale.setScalar(baseScale)
    }
    if (glowRef.current) {
      const glowPulse = 2.5 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.5
      glowRef.current.scale.setScalar(isHovered || isSelected ? 4 : glowPulse)
      const material = glowRef.current.material as THREE.MeshBasicMaterial
      material.opacity = isHovered || isSelected ? 0.6 : 0.3
    }
  })

  const formatCoord = (val: number, isLat: boolean) => {
    const dir = isLat ? (val >= 0 ? 'N' : 'S') : (val >= 0 ? 'E' : 'W')
    return `${Math.abs(val).toFixed(4)}°${dir}`
  }

  return (
    <group position={position}>
      {/* Glow effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshBasicMaterial color="#ff4d00" transparent opacity={0.3} />
      </mesh>

      {/* Core marker */}
      <mesh
        ref={markerRef}
        onPointerOver={onHover}
        onPointerOut={onLeave}
        onClick={onClick}
      >
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial color="#ff4d00" />
      </mesh>

      {(isHovered || isSelected) && (
        <Html
          position={[0.12, 0.08, 0]}
          style={{
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
          distanceFactor={2.5}
        >
          <div className="animate-fade-in-blur">
            <div className="text-signal font-display text-base tracking-wide font-semibold uppercase mb-1">
              {country.name}
            </div>
            <div className="text-white/40 font-mono text-xs tracking-widest">
              {formatCoord(country.coordinates[0], true)}
            </div>
            <div className="text-white/40 font-mono text-xs tracking-widest">
              {formatCoord(country.coordinates[1], false)}
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}

// Arc path component - Enhanced with glow effect
function ArcPath({ start, end, radius, index }: { start: THREE.Vector3, end: THREE.Vector3, radius: number, index: number }) {
  const points = useMemo(() => createArc(start, end, radius), [start, end, radius])
  const lineRef = useRef<THREE.Line>(null)

  useFrame((state) => {
    if (lineRef.current) {
      const material = lineRef.current.material as THREE.LineBasicMaterial
      // Subtle pulsing opacity
      const pulse = 0.5 + Math.sin(state.clock.elapsedTime * 1.5 + index * 0.3) * 0.2
      material.opacity = pulse
    }
  })

  return (
    <group>
      {/* Glow layer */}
      <Line
        points={points}
        color="#ff4d00"
        lineWidth={3}
        transparent
        opacity={0.15}
      />
      {/* Core line */}
      <Line
        ref={lineRef as any}
        points={points}
        color="#ff4d00"
        lineWidth={1.5}
        transparent
        opacity={0.6}
      />
    </group>
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

  // Initial rotation to show Japan (longitude ~138°E)
  const initialRotation = useMemo(() => {
    const japanLongitude = 138
    return -(japanLongitude + 90) * (Math.PI / 180)
  }, [])

  // Callback ref to set initial rotation when group is created
  const setGroupRef = useCallback((group: THREE.Group | null) => {
    if (group) {
      group.rotation.y = initialRotation
      groupRef.current = group
    }
  }, [initialRotation])

  useFrame((state, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.1
    }
  })

  const locationPositions = useMemo(() => {
    return fullJourneyData.map(country => ({
      country,
      position: latLngToVector3(country.coordinates[0], country.coordinates[1], radius * 1.01)
    }))
  }, [radius])

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
      {/* Starfield background */}
      <Stars
        radius={100}
        depth={50}
        count={3000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Subtle ambient lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#ff4d00" />
      <pointLight position={[-10, -10, -10]} intensity={0.2} color="#00fff7" />

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={3.5}
        maxDistance={10}
        autoRotate={false}
        rotateSpeed={0.5}
        zoomSpeed={0.8}
        onStart={() => setAutoRotate(false)}
        onEnd={() => {
          setTimeout(() => setAutoRotate(true), 3000)
        }}
      />

      <group ref={setGroupRef}>
        <GlobeWireframe radius={radius} geoData={geoData} />

        {arcs.map((arc, i) => (
          <ArcPath
            key={i}
            start={arc.start}
            end={arc.end}
            radius={radius}
            index={i}
          />
        ))}

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


// Export the wrapped canvas
export default function GlobeScene({
  onSelectCountry,
  selectedCountry,
  geoData
}: {
  onSelectCountry: (country: CountryData | null) => void
  selectedCountry: CountryData | null
  geoData: GeoJSON | null
}) {
  const [isReady, setIsReady] = useState(false)

  return (
    <div className="w-full h-full relative">
      {/* Loading state shown until canvas is ready */}
      <div
        className="absolute inset-0 flex items-center justify-center bg-void-black transition-opacity duration-700 pointer-events-none z-10"
        style={{ opacity: isReady ? 0 : 1 }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-signal border-t-transparent rounded-full animate-spin" />
          <div className="text-white/40 font-mono tracking-[0.3em] text-xs uppercase">Initializing</div>
        </div>
      </div>

      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          opacity: isReady ? 1 : 0,
          transition: 'opacity 1s ease-out'
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true
        }}
        frameloop="always"
        onCreated={() => {
          // Small delay to ensure first frame is rendered
          requestAnimationFrame(() => {
            setIsReady(true)
          })
        }}
      >
        <Scene
          key="globe-scene"
          onSelectCountry={onSelectCountry}
          selectedCountry={selectedCountry}
          geoData={geoData}
        />
      </Canvas>
    </div>
  )
}
