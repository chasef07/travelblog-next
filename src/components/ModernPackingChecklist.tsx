'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Backpack, Shirt, Smartphone, Heart, User, Star, Check, ArrowUpRight } from 'lucide-react'

// Types
interface PackingItem {
  id: string
  name: string
  category: 'backpacks' | 'clothing' | 'electronics' | 'health' | 'personal' | 'spiritual'
  importance: 'essential' | 'recommended' | 'optional'
  quantity?: string
  link?: string
}

interface TipItem {
  title: string
  description: string
}

// Data
const tips: TipItem[] = [
  {
    title: "40L Maximum",
    description: "A 40L backpack is the maximum allowable carry-on size for most airlines."
  },
  {
    title: "Compression Cubes",
    description: "Use compression packing cubes. Organize pants in large, shirts in medium, shorts in small cubes."
  },
  {
    title: "Pack Light",
    description: "Pack light; you will definitely buy clothes along the way during your travels."
  },
  {
    title: "Organize Electronics",
    description: "Keep electronics separate and organized so cables don't get tangled and messy."
  }
]

const packingItems: PackingItem[] = [
  // Backpacks & Storage
  { id: '1', name: 'Osprey 40L Farpoint backpack', category: 'backpacks', importance: 'essential', quantity: '1', link: 'https://www.osprey.com/farpoint-40-travel-pack-farpont40f22-296' },
  { id: '2', name: 'Osprey 15L daypack', category: 'backpacks', importance: 'essential', quantity: '1', link: 'https://www.osprey.com/farpoint-fairview-travel-daypack-farfairdayf22-235' },
  { id: '3', name: 'Eagle Creek compression packing cubes', category: 'backpacks', importance: 'recommended', quantity: '2', link: 'https://www.eaglecreek.com/products/pack-it-isolate-compression-cube-set-sm' },
  { id: '4', name: 'Large Thule double sided packing cube', category: 'backpacks', importance: 'recommended', quantity: '1', link: 'https://www.thule.com/en-us/organizers/packing-cubes-and-folders/thule-cleandirty-packing-cube-_-3204861' },
  { id: '5', name: 'Small Osprey packing cube for daypack', category: 'backpacks', importance: 'optional', quantity: '1', link: 'https://www.osprey.com/daylitetm-packing-cube-small' },

  // Clothing
  { id: '6', name: 'Underwear', category: 'clothing', importance: 'essential', quantity: '7 pairs' },
  { id: '7', name: 'Long sleeve shirts', category: 'clothing', importance: 'essential', quantity: '2' },
  { id: '8', name: 'Dri-fit shirts', category: 'clothing', importance: 'essential', quantity: '2' },
  { id: '9', name: 'Misc shirts', category: 'clothing', importance: 'recommended', quantity: '3' },
  { id: '10', name: 'Pants', category: 'clothing', importance: 'essential', quantity: '4' },
  { id: '11', name: 'Athletic shorts', category: 'clothing', importance: 'essential', quantity: '4' },
  { id: '12', name: 'Socks', category: 'clothing', importance: 'essential', quantity: '8 pairs' },
  { id: '13', name: 'Bathing suit', category: 'clothing', importance: 'essential', quantity: '1' },
  { id: '14', name: 'Bucket hat', category: 'clothing', importance: 'recommended', quantity: '1' },
  { id: '15', name: 'Quickdry towel', category: 'clothing', importance: 'essential', quantity: '1', link: 'https://www.686.com/products/686-x-slowtide-performance-towel' },
  { id: '16', name: 'Source sandals', category: 'clothing', importance: 'essential', quantity: '1 pair', link: 'https://sourceoutdoor.com/product/men-classic-sandals/' },
  { id: '17', name: 'Hoka Clifton 9s', category: 'clothing', importance: 'essential', quantity: '1 pair', link: 'https://www.hoka.com/en/us/mens-everyday-running-shoes/clifton-9/197634066530.html' },
  { id: '18', name: 'OnClouds', category: 'clothing', importance: 'recommended', quantity: '1 pair' },
  { id: '19', name: 'Windbreaker', category: 'clothing', importance: 'recommended', quantity: '1' },
  { id: '20', name: 'Sweatpants', category: 'clothing', importance: 'optional', quantity: '1' },
  { id: '21', name: 'Sunglasses', category: 'clothing', importance: 'essential', quantity: '1' },

  // Electronics
  { id: '22', name: 'Electronics organizer', category: 'electronics', importance: 'essential', quantity: '1' },
  { id: '23', name: 'Wall charger', category: 'electronics', importance: 'essential', quantity: '1' },
  { id: '24', name: 'AirPods Pro 2s', category: 'electronics', importance: 'recommended', quantity: '1' },
  { id: '25', name: 'USB-C cables', category: 'electronics', importance: 'essential', quantity: '2' },
  { id: '26', name: 'International wall converters', category: 'electronics', importance: 'essential', quantity: '2' },
  { id: '27', name: 'Anker 24,000 mAh power bank', category: 'electronics', importance: 'essential', quantity: '1', link: 'https://www.anker.com/products/a1379' },
  { id: '28', name: 'AirTags', category: 'electronics', importance: 'recommended', quantity: '2' },
  { id: '29', name: 'MacBook Air M2 and charger', category: 'electronics', importance: 'essential', quantity: '1' },
  { id: '30', name: 'iPhone 16 with magnetic phone wallet', category: 'electronics', importance: 'essential', quantity: '1' },

  // Health & Hygiene
  { id: '31', name: 'Sunscreen', category: 'health', importance: 'essential', quantity: '1' },
  { id: '32', name: 'Toiletry kit', category: 'health', importance: 'essential', quantity: '1' },
  { id: '33', name: 'Deodorant', category: 'health', importance: 'essential', quantity: '1' },
  { id: '34', name: 'Toothbrush', category: 'health', importance: 'essential', quantity: '1' },
  { id: '35', name: 'Toothpaste', category: 'health', importance: 'essential', quantity: '1' },
  { id: '36', name: 'Hand sanitizer', category: 'health', importance: 'essential', quantity: '1' },
  { id: '37', name: 'Floss', category: 'health', importance: 'recommended', quantity: '1' },
  { id: '38', name: 'Nail clippers', category: 'health', importance: 'recommended', quantity: '1' },
  { id: '39', name: 'Prescriptions', category: 'health', importance: 'essential', quantity: '2' },
  { id: '40', name: 'Theragun mini percussion gun', category: 'health', importance: 'optional', quantity: '1', link: 'https://www.therabody.com/us/en-us/theragun-mini.html' },

  // Personal Items
  { id: '41', name: 'Sleeping mask', category: 'personal', importance: 'recommended', quantity: '1' },
  { id: '42', name: 'Journal', category: 'personal', importance: 'recommended', quantity: '1' },
  { id: '43', name: 'Pens', category: 'personal', importance: 'recommended', quantity: '2' },
  { id: '44', name: 'Carabiners', category: 'personal', importance: 'optional', quantity: '2' },
  { id: '45', name: 'Resistance band', category: 'personal', importance: 'optional', quantity: '1' },
  { id: '46', name: 'Passport', category: 'personal', importance: 'essential', quantity: '1' },
  { id: '47', name: 'Yellow fever vaccine exemption', category: 'personal', importance: 'optional', quantity: '1' },

  // Spiritual Items
  { id: '48', name: 'Tefillin', category: 'spiritual', importance: 'essential', quantity: '1' },
  { id: '49', name: 'Kippah', category: 'spiritual', importance: 'essential', quantity: '1' },
  { id: '50', name: 'Tzitzit', category: 'spiritual', importance: 'essential', quantity: '1' },
  { id: '51', name: 'Chassidic book', category: 'spiritual', importance: 'recommended', quantity: '1' },
]

const categoryInfo: Record<string, { name: string; icon: React.ReactNode }> = {
  backpacks: { name: 'Backpacks & Storage', icon: <Backpack className="h-4 w-4" /> },
  clothing: { name: 'Clothing & Footwear', icon: <Shirt className="h-4 w-4" /> },
  electronics: { name: 'Electronics & Tech', icon: <Smartphone className="h-4 w-4" /> },
  health: { name: 'Health & Hygiene', icon: <Heart className="h-4 w-4" /> },
  personal: { name: 'Personal Items', icon: <User className="h-4 w-4" /> },
  spiritual: { name: 'Spiritual Items', icon: <Star className="h-4 w-4" /> },
}

export default function ModernPackingChecklist() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('packing-checklist-progress')
    if (saved) {
      setCheckedItems(new Set(JSON.parse(saved)))
    }
  }, [])

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('packing-checklist-progress', JSON.stringify(Array.from(checkedItems)))
  }, [checkedItems])

  const toggleItem = (itemId: string) => {
    const newCheckedItems = new Set(checkedItems)
    if (newCheckedItems.has(itemId)) {
      newCheckedItems.delete(itemId)
    } else {
      newCheckedItems.add(itemId)
    }
    setCheckedItems(newCheckedItems)
  }

  const filteredItems = useMemo(() => {
    return packingItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const groupedItems = useMemo(() => {
    const groups: Record<string, PackingItem[]> = {}
    filteredItems.forEach(item => {
      if (!groups[item.category]) {
        groups[item.category] = []
      }
      groups[item.category].push(item)
    })
    return groups
  }, [filteredItems])

  const overallProgress = Math.round((checkedItems.size / packingItems.length) * 100)

  return (
    <div className="space-y-16">
      {/* Tips Section */}
      <section>
        <div className="border-b border-white/10 pb-4 mb-8">
          <span className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase block mb-2">
            [ Pro Tips ]
          </span>
          <h2 className="text-2xl font-extralight text-white">Packing Wisdom</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-black p-6 hover:bg-white/5 transition-colors"
            >
              <h3 className="text-white font-light mb-3">{tip.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{tip.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Progress & Filters */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <span className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase block mb-2">
              [ Checklist ]
            </span>
            <h2 className="text-2xl font-extralight text-white">
              {checkedItems.size} / {packingItems.length} Items
            </h2>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-4">
            <div className="w-48 h-1 bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="font-mono text-xs text-white/40">{overallProgress}%</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black border border-white/20 text-white text-sm px-10 py-2 font-mono placeholder:text-white/30 focus:outline-none focus:border-white/40"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-mono transition-all duration-200 border ${
                selectedCategory === 'all'
                  ? 'border-white text-white bg-white/10'
                  : 'border-white/20 text-white/50 hover:border-white/40 hover:text-white/80'
              }`}
            >
              All
            </button>
            {Object.entries(categoryInfo).map(([key, info]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-mono transition-all duration-200 border flex items-center gap-2 ${
                  selectedCategory === key
                    ? 'border-white text-white bg-white/10'
                    : 'border-white/20 text-white/50 hover:border-white/40 hover:text-white/80'
                }`}
              >
                {info.icon}
                <span className="hidden sm:inline">{info.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Items by Category */}
        <div className="space-y-12">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category}>
              <div className="border-b border-white/10 pb-3 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-white/40">{categoryInfo[category]?.icon}</span>
                  <span className="font-mono text-xs tracking-wider text-white/40 uppercase">
                    {categoryInfo[category]?.name}
                  </span>
                </div>
              </div>

              <div className="grid gap-px bg-white/10 border border-white/10">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.02, duration: 0.3 }}
                    onClick={() => toggleItem(item.id)}
                    className={`bg-black p-4 cursor-pointer transition-colors ${
                      checkedItems.has(item.id) ? 'bg-white/5' : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Checkbox */}
                      <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${
                        checkedItems.has(item.id)
                          ? 'border-white bg-white'
                          : 'border-white/30'
                      }`}>
                        {checkedItems.has(item.id) && (
                          <Check className="h-3 w-3 text-black" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <span className={`text-sm font-light transition-colors ${
                          checkedItems.has(item.id)
                            ? 'text-white/40 line-through'
                            : 'text-white'
                        }`}>
                          {item.quantity && <span className="text-white/50">{item.quantity} </span>}
                          {item.name}
                        </span>
                      </div>

                      {/* Importance Badge */}
                      <span className={`font-mono text-xs uppercase tracking-wider ${
                        item.importance === 'essential' ? 'text-red-400' :
                        item.importance === 'recommended' ? 'text-yellow-400' :
                        'text-white/30'
                      }`}>
                        {item.importance}
                      </span>

                      {/* Link */}
                      {item.link && (
                        <Link
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-white/30 hover:text-white/60 transition-colors"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Goods - Images Section */}
      <section>
        <div className="border-b border-white/10 pb-4 mb-8">
          <span className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase block mb-2">
            [ The Setup ]
          </span>
          <h2 className="text-2xl font-extralight text-white">The Goods</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          <div className="relative aspect-[4/3] overflow-hidden bg-black">
            <Image
              src="/assets/images/misc/IMG_2660.jpg"
              alt="Travel packing setup"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="font-mono text-xs tracking-wider text-white/60 uppercase block mb-2">
                Essential Gear
              </span>
              <p className="text-white/80 text-sm">Everything organized and ready for adventure.</p>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden bg-black">
            <Image
              src="/assets/images/misc/IMG_2688.jpg"
              alt="Packed backpack ready for travel"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="font-mono text-xs tracking-wider text-white/60 uppercase block mb-2">
                Packed & Ready
              </span>
              <p className="text-white/80 text-sm">A perfectly organized backpack for year-long adventures.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
