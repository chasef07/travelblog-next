'use client'

import { useRef, useMemo, useState, memo, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Line, Html } from '@react-three/drei'
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

// Globe with real country outlines from GeoJSON
const GlobeWireframe = memo(function GlobeWireframe({ radius, geoData }: { radius: number, geoData: GeoJSON | null }) {
  const countryPaths = useMemo(() => {
    if (!geoData) return []
    return processGeoJSONToLines(geoData, radius * 1.001)
  }, [geoData, radius])

  return (
    <group>
      {/* Base sphere - always rendered */}
      <mesh>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshBasicMaterial color="#1a1714" />
      </mesh>

      {/* Country outlines - rendered when data loads */}
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
})

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
      <mesh
        ref={markerRef}
        onPointerOver={onHover}
        onPointerOut={onLeave}
        onClick={onClick}
      >
        <boxGeometry args={[0.04, 0.04, 0.04]} />
        <meshBasicMaterial color="#f97316" />
      </mesh>

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
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={3}
        maxDistance={8}
        autoRotate={false}
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
        className="absolute inset-0 flex items-center justify-center bg-[#1a1714] transition-opacity duration-700 pointer-events-none"
        style={{ opacity: isReady ? 0 : 1 }}
      >
        <div className="text-white/40 font-mono tracking-wider text-sm">LOADING GLOBE...</div>
      </div>

      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        style={{
          background: '#1a1714',
          width: '100%',
          height: '100%',
          opacity: isReady ? 1 : 0,
          transition: 'opacity 0.7s ease-in-out'
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true
        }}
        frameloop="always"
        onCreated={(state) => {
          console.log('Canvas created, camera z position:', state.camera.position.z)
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
