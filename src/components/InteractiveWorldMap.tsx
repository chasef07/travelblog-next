'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function InteractiveWorldMap() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)

  const countries = [
    { name: 'Israel', code: 'IL', region: 'Middle East' },
    { name: 'Georgia', code: 'GE', region: 'Caucasus' },
    { name: 'Kenya', code: 'KE', region: 'East Africa' },
    { name: 'Tanzania', code: 'TZ', region: 'East Africa' },
    { name: 'Rwanda', code: 'RW', region: 'East Africa' },
    { name: 'UAE', code: 'AE', region: 'Middle East' },
    { name: 'Nepal', code: 'NP', region: 'South Asia' },
    { name: 'Thailand', code: 'TH', region: 'Southeast Asia' },
    { name: 'Laos', code: 'LA', region: 'Southeast Asia' },
    { name: 'Cambodia', code: 'KH', region: 'Southeast Asia' },
    { name: 'China', code: 'CN', region: 'East Asia' },
    { name: 'Vietnam', code: 'VN', region: 'Southeast Asia' },
    { name: 'Singapore', code: 'SG', region: 'Southeast Asia' },
    { name: 'Philippines', code: 'PH', region: 'Southeast Asia' },
    { name: 'Indonesia', code: 'ID', region: 'Southeast Asia' },
    { name: 'Japan', code: 'JP', region: 'East Asia' },
    { name: 'Costa Rica', code: 'CR', region: 'Central America' },
    { name: 'Panama', code: 'PA', region: 'Central America' },
  ]

  const visitedCountryCodes = countries.map(c => c.code)

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* SVG World Map */}
      <div className="relative">
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Simplified world map paths - you can enhance this with real map data */}
          {/* For now, showing visited countries as dots/markers on approximate locations */}
          <defs>
            <radialGradient id="glow">
              <stop offset="0%" stopColor="white" stopOpacity="0.8" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Country markers with approximate positions */}
          <CountryMarker name="Israel" x={550} y={230} visited={true} selected={selectedCountry === 'Israel'} onClick={() => setSelectedCountry(selectedCountry === 'Israel' ? null : 'Israel')} />
          <CountryMarker name="Georgia" x={570} y={200} visited={true} selected={selectedCountry === 'Georgia'} onClick={() => setSelectedCountry(selectedCountry === 'Georgia' ? null : 'Georgia')} />
          <CountryMarker name="Kenya" x={560} y={280} visited={true} selected={selectedCountry === 'Kenya'} onClick={() => setSelectedCountry(selectedCountry === 'Kenya' ? null : 'Kenya')} />
          <CountryMarker name="Tanzania" x={565} y={290} visited={true} selected={selectedCountry === 'Tanzania'} onClick={() => setSelectedCountry(selectedCountry === 'Tanzania' ? null : 'Tanzania')} />
          <CountryMarker name="Rwanda" x={555} y={285} visited={true} selected={selectedCountry === 'Rwanda'} onClick={() => setSelectedCountry(selectedCountry === 'Rwanda' ? null : 'Rwanda')} />
          <CountryMarker name="UAE" x={590} y={240} visited={true} selected={selectedCountry === 'UAE'} onClick={() => setSelectedCountry(selectedCountry === 'UAE' ? null : 'UAE')} />
          <CountryMarker name="Nepal" x={680} y={220} visited={true} selected={selectedCountry === 'Nepal'} onClick={() => setSelectedCountry(selectedCountry === 'Nepal' ? null : 'Nepal')} />
          <CountryMarker name="Thailand" x={720} y={250} visited={true} selected={selectedCountry === 'Thailand'} onClick={() => setSelectedCountry(selectedCountry === 'Thailand' ? null : 'Thailand')} />
          <CountryMarker name="Laos" x={725} y={235} visited={true} selected={selectedCountry === 'Laos'} onClick={() => setSelectedCountry(selectedCountry === 'Laos' ? null : 'Laos')} />
          <CountryMarker name="Cambodia" x={730} y={255} visited={true} selected={selectedCountry === 'Cambodia'} onClick={() => setSelectedCountry(selectedCountry === 'Cambodia' ? null : 'Cambodia')} />
          <CountryMarker name="China" x={750} y={200} visited={true} selected={selectedCountry === 'China'} onClick={() => setSelectedCountry(selectedCountry === 'China' ? null : 'China')} />
          <CountryMarker name="Vietnam" x={735} y={245} visited={true} selected={selectedCountry === 'Vietnam'} onClick={() => setSelectedCountry(selectedCountry === 'Vietnam' ? null : 'Vietnam')} />
          <CountryMarker name="Singapore" x={730} y={280} visited={true} selected={selectedCountry === 'Singapore'} onClick={() => setSelectedCountry(selectedCountry === 'Singapore' ? null : 'Singapore')} />
          <CountryMarker name="Philippines" x={770} y={255} visited={true} selected={selectedCountry === 'Philippines'} onClick={() => setSelectedCountry(selectedCountry === 'Philippines' ? null : 'Philippines')} />
          <CountryMarker name="Indonesia" x={760} y={290} visited={true} selected={selectedCountry === 'Indonesia'} onClick={() => setSelectedCountry(selectedCountry === 'Indonesia' ? null : 'Indonesia')} />
          <CountryMarker name="Japan" x={810} y={190} visited={true} selected={selectedCountry === 'Japan'} onClick={() => setSelectedCountry(selectedCountry === 'Japan' ? null : 'Japan')} />
          <CountryMarker name="Costa Rica" x={200} y={260} visited={true} selected={selectedCountry === 'Costa Rica'} onClick={() => setSelectedCountry(selectedCountry === 'Costa Rica' ? null : 'Costa Rica')} />
          <CountryMarker name="Panama" x={210} y={265} visited={true} selected={selectedCountry === 'Panama'} onClick={() => setSelectedCountry(selectedCountry === 'Panama' ? null : 'Panama')} />

          {/* World map outline (simplified continents) */}
          <g stroke="white" strokeWidth="0.5" fill="none" opacity="0.2">
            {/* Africa */}
            <path d="M 520 210 L 530 230 L 540 270 L 560 300 L 580 320 L 570 340 L 540 350 L 520 340 L 510 320 L 500 280 L 505 250 L 515 220 Z" />
            {/* Asia */}
            <path d="M 580 180 L 650 170 L 720 180 L 780 190 L 820 200 L 840 220 L 830 250 L 810 280 L 780 300 L 750 310 L 720 300 L 700 280 L 680 250 L 670 220 L 660 200 L 640 190 L 610 185 Z" />
            {/* Europe */}
            <path d="M 480 160 L 520 150 L 560 160 L 580 180 L 570 200 L 540 210 L 510 200 L 490 180 Z" />
            {/* North America */}
            <path d="M 150 150 L 200 140 L 250 150 L 280 170 L 300 200 L 290 240 L 270 270 L 250 280 L 220 270 L 200 250 L 180 220 L 160 190 Z" />
            {/* Central America */}
            <path d="M 200 270 L 220 280 L 210 290 L 195 285 Z" />
            {/* South America */}
            <path d="M 250 300 L 280 310 L 300 340 L 310 380 L 300 420 L 280 440 L 260 430 L 240 400 L 230 360 L 235 320 Z" />
            {/* Australia */}
            <path d="M 780 330 L 820 325 L 850 340 L 860 360 L 850 380 L 820 385 L 790 375 L 775 355 Z" />
          </g>
        </svg>

        {/* Selected country info */}
        {selectedCountry && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-6 py-3"
          >
            <p className="text-white font-medium">{selectedCountry}</p>
          </motion.div>
        )}
      </div>

      {/* Countries list below map */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {countries.map((country) => (
          <motion.button
            key={country.name}
            onClick={() => setSelectedCountry(selectedCountry === country.name ? null : country.name)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
              selectedCountry === country.name
                ? 'bg-white text-zinc-900 border-white'
                : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {country.name}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

function CountryMarker({
  name,
  x,
  y,
  visited,
  selected,
  onClick
}: {
  name: string
  x: number
  y: number
  visited: boolean
  selected: boolean
  onClick: () => void
}) {
  return (
    <g onClick={onClick} className="cursor-pointer">
      {/* Glow effect when selected */}
      {selected && (
        <motion.circle
          cx={x}
          cy={y}
          r="12"
          fill="url(#glow)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
        />
      )}

      {/* Marker dot */}
      <motion.circle
        cx={x}
        cy={y}
        r={selected ? "5" : "4"}
        fill="white"
        className="transition-all duration-200"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: visited ? 1 : 0.3 }}
        whileHover={{ scale: 1.5 }}
        transition={{ delay: Math.random() * 0.5 }}
      />

      {/* Pulsing ring */}
      {visited && (
        <motion.circle
          cx={x}
          cy={y}
          r="6"
          fill="none"
          stroke="white"
          strokeWidth="1"
          opacity="0.5"
          animate={{
            r: [6, 10, 6],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </g>
  )
}
