'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { foodData, FoodItem } from '../content/food-data'

export default function FoodGrid() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)

  const countries = Object.keys(foodData)

  return (
    <div className="space-y-12">
      {/* Country Filter */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap gap-3"
      >
        <button
          onClick={() => setSelectedCountry(null)}
          className={`px-4 py-2 text-xs uppercase tracking-wider font-mono transition-all duration-200 border ${
            !selectedCountry
              ? 'border-white text-white bg-white/10'
              : 'border-white/20 text-white/50 hover:border-white/40 hover:text-white/80'
          }`}
        >
          All
        </button>
        {countries.map(country => (
          <button
            key={country}
            onClick={() => setSelectedCountry(country)}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-mono transition-all duration-200 border ${
              selectedCountry === country
                ? 'border-white text-white bg-white/10'
                : 'border-white/20 text-white/50 hover:border-white/40 hover:text-white/80'
            }`}
          >
            {country}
          </button>
        ))}
      </motion.div>

      {/* Food Grid */}
      <div className="space-y-16">
        {selectedCountry ? (
          <CountrySection country={selectedCountry} items={foodData[selectedCountry]} />
        ) : (
          countries.map((country, index) => (
            <motion.div
              key={country}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <CountrySection country={country} items={foodData[country]} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}

function CountrySection({ country, items }: { country: string; items: FoodItem[] }) {
  return (
    <section className="space-y-8">
      {/* Country Header */}
      <div className="border-b border-white/10 pb-4">
        <span className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase block mb-2">
          [ {country} ]
        </span>
        <h2 className="text-2xl font-extralight text-white">{country} Cuisine</h2>
      </div>

      {/* Food Cards */}
      <div className="grid gap-px bg-white/10 border border-white/10 md:grid-cols-2">
        {items.map((item, index) => (
          <FoodCard key={`${country}-${item.name}`} item={item} index={index} />
        ))}
      </div>
    </section>
  )
}

function FoodCard({ item, index }: { item: FoodItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group bg-black hover:bg-white/5 transition-colors"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <span className="font-mono text-xs tracking-wider text-white/40 uppercase">
          {item.country}
        </span>

        <h3 className="text-lg font-light text-white group-hover:text-white/80 transition-colors duration-300">
          {item.name}
        </h3>

        <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/50 transition-colors line-clamp-3">
          {item.description}
        </p>
      </div>
    </motion.div>
  )
}
