'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Backpack, Shirt, Smartphone, Heart, User, Star, Check, ArrowUpRight, ListChecks, RotateCcw } from 'lucide-react'

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

function getImportanceClasses(importance: PackingItem['importance']) {
  if (importance === 'essential') {
    return 'border-rose-400/35 bg-rose-500/15 text-rose-200'
  }
  if (importance === 'recommended') {
    return 'border-amber-400/35 bg-amber-500/15 text-amber-200'
  }
  return 'border-[var(--ui-border-subtle)] bg-[var(--ui-bg-soft)] text-[var(--ui-text-subtle)]'
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

  const categoryStats = useMemo(() => {
    return Object.entries(categoryInfo).map(([key, info]) => {
      const items = packingItems.filter((item) => item.category === key)
      const checked = items.filter((item) => checkedItems.has(item.id)).length
      return {
        key,
        info,
        total: items.length,
        checked,
        progress: items.length > 0 ? Math.round((checked / items.length) * 100) : 0,
      }
    })
  }, [checkedItems])

  const resetProgress = () => {
    const shouldReset = window.confirm('Clear all checked items in your packing progress?')
    if (!shouldReset) return
    setCheckedItems(new Set())
    localStorage.removeItem('packing-checklist-progress')
  }

  return (
    <div className="space-y-16">
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">Packing Scope</p>
          <p className="mt-3 text-4xl font-extralight text-[var(--ui-text-primary)]">{packingItems.length}</p>
          <p className="mt-1 text-sm text-[var(--ui-text-muted)]">Total checklist items</p>
        </div>
        <div className="rounded-2xl border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">Completed</p>
          <p className="mt-3 text-4xl font-extralight text-[var(--ui-text-primary)]">{checkedItems.size}</p>
          <p className="mt-1 text-sm text-[var(--ui-text-muted)]">{overallProgress}% packed</p>
        </div>
        <div className="rounded-2xl border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">Visible Results</p>
          <p className="mt-3 text-4xl font-extralight text-[var(--ui-text-primary)]">{filteredItems.length}</p>
          <p className="mt-1 text-sm text-[var(--ui-text-muted)]">After current filters</p>
        </div>
      </section>

      {/* Tips Section */}
      <section>
        <div className="border-b border-[var(--ui-border-subtle)] pb-4 mb-8">
          <span className="font-mono text-xs tracking-[0.2em] text-[var(--ui-text-muted)] uppercase block mb-2">
            [ Pro Tips ]
          </span>
          <h2 className="text-2xl font-extralight text-[var(--ui-text-primary)]">Packing Wisdom</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--ui-border-subtle)] border border-[var(--ui-border-subtle)]">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-[var(--ui-bg-strong)] p-6 hover:bg-[var(--ui-bg-soft)] transition-colors"
            >
              <h3 className="text-[var(--ui-text-primary)] font-light mb-3">{tip.title}</h3>
              <p className="text-sm text-[var(--ui-text-muted)] leading-relaxed">{tip.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Progress & Filters */}
      <section>
        <div className="flex flex-col gap-6 mb-8 rounded-2xl border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-[var(--ui-text-muted)] uppercase mb-2">
              <ListChecks className="h-3.5 w-3.5" />
              [ Checklist ]
            </span>
            <h2 className="text-2xl font-extralight text-[var(--ui-text-primary)]">
              {checkedItems.size} / {packingItems.length} Items
            </h2>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="h-1 w-48 overflow-hidden rounded-full bg-[var(--ui-bg-soft)]">
                <motion.div
                  className="h-full bg-[var(--ui-accent)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${overallProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="font-mono text-xs text-[var(--ui-text-muted)]">{overallProgress}%</span>
            </div>

            <button
              type="button"
              onClick={resetProgress}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--ui-border-subtle)] px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--ui-text-muted)] transition-colors hover:border-[var(--ui-border-strong)] hover:text-[var(--ui-text-primary)]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--ui-text-muted)]" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full bg-[var(--ui-bg-strong)] border border-[var(--ui-border-subtle)] text-[var(--ui-text-primary)] text-sm px-10 py-2.5 font-mono placeholder:text-[var(--ui-text-subtle)] focus:outline-none focus:border-[var(--ui-border-strong)]"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-mono transition-all duration-200 border rounded-full ${
                selectedCategory === 'all'
                  ? 'border-[var(--ui-accent)] text-[var(--ui-on-accent)] bg-[var(--ui-accent)]'
                  : 'border-[var(--ui-border-subtle)] text-[var(--ui-text-muted)] hover:border-[var(--ui-border-strong)] hover:text-[var(--ui-text-primary)]'
              }`}
            >
              All
            </button>
            {Object.entries(categoryInfo).map(([key, info]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-mono transition-all duration-200 border rounded-full flex items-center gap-2 ${
                  selectedCategory === key
                    ? 'border-[var(--ui-accent)] text-[var(--ui-on-accent)] bg-[var(--ui-accent)]'
                    : 'border-[var(--ui-border-subtle)] text-[var(--ui-text-muted)] hover:border-[var(--ui-border-strong)] hover:text-[var(--ui-text-primary)]'
                }`}
              >
                {info.icon}
                <span className="hidden sm:inline">{info.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categoryStats.map((category) => (
              <button
                key={category.key}
                type="button"
                onClick={() => setSelectedCategory(category.key)}
                className={`rounded-xl border p-3 text-left transition-colors ${
                  selectedCategory === category.key
                    ? 'border-[var(--ui-accent)] bg-[var(--ui-accent-soft)]'
                    : 'border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] hover:bg-[var(--ui-bg-soft)]'
                }`}
              >
                <span className="inline-flex items-center gap-2 text-[var(--ui-text-muted)]">
                  {category.info.icon}
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em]">{category.info.name}</span>
                </span>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-[var(--ui-text-secondary)]">
                    {category.checked}/{category.total}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                    {category.progress}%
                  </span>
                </div>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-[var(--ui-bg-soft)]">
                  <div className="h-full bg-[var(--ui-accent)]" style={{ width: `${category.progress}%` }} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Items by Category */}
        <div className="space-y-12">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category}>
              <div className="border-b border-[var(--ui-border-subtle)] pb-3 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-[var(--ui-text-muted)]">{categoryInfo[category]?.icon}</span>
                    <span className="font-mono text-xs tracking-wider text-[var(--ui-text-muted)] uppercase">
                    {categoryInfo[category]?.name}
                  </span>
                </div>
              </div>

              <div className="grid gap-px bg-[var(--ui-border-subtle)] border border-[var(--ui-border-subtle)]">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.02, duration: 0.3 }}
                    onClick={() => toggleItem(item.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        toggleItem(item.id)
                      }
                    }}
                    role="checkbox"
                    tabIndex={0}
                    aria-checked={checkedItems.has(item.id)}
                    aria-label={`${item.name}${item.quantity ? ` (${item.quantity})` : ''}`}
                    className={`bg-[var(--ui-bg-strong)] p-4 cursor-pointer transition-colors ${
                      checkedItems.has(item.id) ? 'bg-[var(--ui-bg-soft)]' : 'hover:bg-[var(--ui-bg-soft)]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Checkbox */}
                      <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${
                        checkedItems.has(item.id)
                          ? 'border-[var(--ui-accent)] bg-[var(--ui-accent)]'
                          : 'border-[var(--ui-border-strong)]'
                      }`}>
                        {checkedItems.has(item.id) && (
                          <Check className="h-3 w-3 text-[var(--ui-on-accent)]" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <span className={`text-sm font-light transition-colors ${
                          checkedItems.has(item.id)
                            ? 'text-[var(--ui-text-subtle)] line-through'
                            : 'text-[var(--ui-text-primary)]'
                        }`}>
                          {item.quantity && <span className="text-[var(--ui-text-muted)]">{item.quantity} </span>}
                          {item.name}
                        </span>
                      </div>

                      {/* Importance Badge */}
                      <span className={`rounded-full border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${getImportanceClasses(item.importance)}`}>
                        {item.importance}
                      </span>

                      {/* Link */}
                      {item.link && (
                        <Link
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[var(--ui-text-muted)] hover:text-[var(--ui-accent)] transition-colors"
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
        <div className="border-b border-[var(--ui-border-subtle)] pb-4 mb-8">
          <span className="font-mono text-xs tracking-[0.2em] text-[var(--ui-text-subtle)] uppercase block mb-2">
            [ The Setup ]
          </span>
          <h2 className="text-2xl font-extralight text-[var(--ui-text-primary)]">The Goods</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-[var(--ui-border-subtle)] border border-[var(--ui-border-subtle)]">
          <div className="relative aspect-[4/3] overflow-hidden bg-[var(--ui-bg-strong)]">
            <Image
              src="/assets/images/misc/IMG_2660.jpg"
              alt="Travel packing setup"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--ui-bg-strong),transparent)] opacity-90" />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="font-mono text-xs tracking-wider text-[var(--ui-text-muted)] uppercase block mb-2">
                Essential Gear
              </span>
              <p className="text-[var(--ui-text-primary)] text-sm">Everything organized and ready for adventure.</p>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden bg-[var(--ui-bg-strong)]">
            <Image
              src="/assets/images/misc/IMG_2688.jpg"
              alt="Packed backpack ready for travel"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--ui-bg-strong),transparent)] opacity-90" />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="font-mono text-xs tracking-wider text-[var(--ui-text-muted)] uppercase block mb-2">
                Packed & Ready
              </span>
              <p className="text-[var(--ui-text-primary)] text-sm">A perfectly organized backpack for year-long adventures.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
