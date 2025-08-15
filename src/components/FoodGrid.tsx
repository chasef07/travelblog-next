'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { foodData, FoodItem } from '../content/food-data'

export default function FoodGrid() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  
  const countries = Object.keys(foodData)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="space-y-8"
    >
      {/* Country Filter */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex flex-wrap gap-3 justify-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedCountry(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            !selectedCountry 
              ? 'bg-[var(--secondary-color)] text-white shadow-md' 
              : 'bg-[var(--surface-color)] text-[var(--text-color)] hover:bg-[var(--secondary-color)] hover:text-white border border-[var(--border-color)]'
          }`}
        >
          All Countries
        </motion.button>
        {countries.map((country, index) => (
          <motion.button
            key={country}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCountry(country)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCountry === country 
                ? 'bg-[var(--secondary-color)] text-white shadow-md' 
                : 'bg-[var(--surface-color)] text-[var(--text-color)] hover:bg-[var(--secondary-color)] hover:text-white border border-[var(--border-color)]'
            }`}
          >
            {country}
          </motion.button>
        ))}
      </motion.div>

      {/* Food Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid gap-8"
      >
        {selectedCountry ? (
          <CountrySection country={selectedCountry} items={foodData[selectedCountry]} />
        ) : (
          countries.map((country, index) => (
            <motion.div
              key={country}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <CountrySection country={country} items={foodData[country]} />
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  )
}

function CountrySection({ country, items }: { country: string; items: FoodItem[] }) {
  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-2">{country}</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[var(--secondary-color)] to-[var(--accent-color)] mx-auto rounded-full"></div>
      </div>
      
      <div className="grid gap-6 md:gap-8">
        {items.map((item, index) => (
          <FoodCard key={`${country}-${item.name}`} item={item} index={index} />
        ))}
      </div>
    </section>
  )
}

function FoodCard({ item, index }: { item: FoodItem; index: number }) {
  const isEven = index % 2 === 0

  return (
    <div className={`group bg-[var(--surface-color)] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ring-1 ring-black/5 ${
      isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
    } flex flex-col lg:flex`}>
      
      {/* Image */}
      <div className="relative w-full lg:w-80 h-64 lg:h-auto overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 1024px) 100vw, 320px"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex-1 p-8 lg:p-10 flex flex-col justify-center">
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-[var(--secondary-color)] rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-[var(--muted-text-color)] uppercase tracking-wider">
              {item.country}
            </span>
          </div>
          
          <h3 className="text-2xl lg:text-3xl font-bold text-[var(--primary-color)] group-hover:text-[var(--secondary-color)] transition-colors duration-300">
            {item.name}
          </h3>
          
          <p className="text-lg leading-relaxed text-[var(--text-color)] opacity-90">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  )
}