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
              ? 'border-[var(--ui-border-strong)] text-[var(--ui-text-primary)] bg-[var(--ui-bg-soft)]'
              : 'border-[var(--ui-border-subtle)] text-[var(--ui-text-muted)] hover:border-[var(--ui-border-strong)] hover:text-[var(--ui-text-primary)]'
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
                ? 'border-[var(--ui-border-strong)] text-[var(--ui-text-primary)] bg-[var(--ui-bg-soft)]'
                : 'border-[var(--ui-border-subtle)] text-[var(--ui-text-muted)] hover:border-[var(--ui-border-strong)] hover:text-[var(--ui-text-primary)]'
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
      <div className="border-b border-[var(--ui-border-subtle)] pb-4">
        <span className="font-mono text-xs tracking-[0.2em] text-[var(--ui-text-muted)] uppercase block mb-2">
          [ {country} ]
        </span>
        <h2 className="text-2xl font-extralight text-[var(--ui-text-primary)]">{country} Cuisine</h2>
      </div>

      {/* Food Cards */}
      <div className="grid gap-px bg-[var(--ui-border-subtle)] border border-[var(--ui-border-subtle)] md:grid-cols-2">
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
      className="group bg-[var(--ui-bg-strong)] hover:bg-[var(--ui-bg-soft)] transition-colors"
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
        <span className="font-mono text-xs tracking-wider text-[var(--ui-text-subtle)] uppercase">
          {item.country}
        </span>

        <h3 className="text-lg font-light text-[var(--ui-text-primary)] group-hover:text-[var(--ui-accent)] transition-colors duration-300">
          {item.name}
        </h3>

        <p className="text-sm text-[var(--ui-text-muted)] leading-relaxed group-hover:text-[var(--ui-text-secondary)] transition-colors line-clamp-3">
          {item.description}
        </p>
      </div>
    </motion.div>
  )
}
