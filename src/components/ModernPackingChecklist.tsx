'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Search, Backpack, Shirt, Smartphone, Heart, User, Star } from 'lucide-react'

// Types
interface PackingItem {
  id: string
  name: string
  category: 'backpacks' | 'clothing' | 'electronics' | 'health' | 'personal' | 'spiritual'
  importance: 'essential' | 'recommended' | 'optional'
  quantity?: string
  link?: string
  checked?: boolean
}

interface TipItem {
  title: string
  description: string
  icon: React.ReactNode
  gradient: string
}

// Data
const tips: TipItem[] = [
  {
    title: "40L Maximum",
    description: "A 40L backpack is the maximum allowable carry-on size for most airlines.",
    icon: <Backpack className="h-6 w-6" />,
    gradient: "from-blue-500 to-blue-600"
  },
  {
    title: "Compression Cubes",
    description: "Use compression packing cubes from Eagle Creek and Thule. Organize pants in large, shirts in medium, shorts in small cubes.",
    icon: <div className="h-6 w-6 bg-current rounded-sm" />,
    gradient: "from-green-500 to-green-600"
  },
  {
    title: "Pack Light",
    description: "Pack light; you will definitely buy clothes along the way during your travels.",
    icon: <Shirt className="h-6 w-6" />,
    gradient: "from-purple-500 to-purple-600"
  },
  {
    title: "Organize Electronics",
    description: "Keep electronics separate and organized so cables don't get tangled and messy.",
    icon: <Smartphone className="h-6 w-6" />,
    gradient: "from-orange-500 to-orange-600"
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

const categoryInfo = {
  backpacks: { name: 'Backpacks & Storage', icon: <Backpack className="h-4 w-4" />, color: 'bg-blue-500' },
  clothing: { name: 'Clothing & Footwear', icon: <Shirt className="h-4 w-4" />, color: 'bg-green-500' },
  electronics: { name: 'Electronics & Tech', icon: <Smartphone className="h-4 w-4" />, color: 'bg-purple-500' },
  health: { name: 'Health & Hygiene', icon: <Heart className="h-4 w-4" />, color: 'bg-red-500' },
  personal: { name: 'Personal Items', icon: <User className="h-4 w-4" />, color: 'bg-orange-500' },
  spiritual: { name: 'Spiritual Items', icon: <Star className="h-4 w-4" />, color: 'bg-yellow-500' },
}

const importanceColors = {
  essential: 'bg-red-500',
  recommended: 'bg-yellow-500',
  optional: 'bg-gray-500'
}

export default function ModernPackingChecklist() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedImportance, setSelectedImportance] = useState<string>('all')

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
      const matchesImportance = selectedImportance === 'all' || item.importance === selectedImportance
      return matchesSearch && matchesCategory && matchesImportance
    })
  }, [searchTerm, selectedCategory, selectedImportance])

  const getProgressByCategory = (category: string) => {
    const categoryItems = packingItems.filter(item => item.category === category)
    const checkedCategoryItems = categoryItems.filter(item => checkedItems.has(item.id))
    return (checkedCategoryItems.length / categoryItems.length) * 100
  }

  const overallProgress = (checkedItems.size / packingItems.length) * 100

  return (
    <div className="space-y-8">
      {/* Tips and Tricks Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-6">Tips and Tricks</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${tip.gradient} text-white`}>
                      {tip.icon}
                    </div>
                    <CardTitle className="text-lg">{tip.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-[var(--muted-text-color)] leading-relaxed">{tip.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <Separator />

      {/* Packing Checklist Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-[var(--primary-color)]">Packing Checklist</h2>
          <div className="text-right">
            <div className="text-2xl font-bold text-[var(--primary-color)]">
              {checkedItems.size}/{packingItems.length}
            </div>
            <div className="text-sm text-[var(--muted-text-color)]">items packed</div>
          </div>
        </div>

        {/* Overall Progress */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Overall Progress</span>
              <span className="text-sm text-[var(--muted-text-color)]">{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--muted-text-color)]" />
                  <Input
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border rounded-md bg-[var(--surface-color)] text-[var(--text-color)]"
                >
                  <option value="all">All Categories</option>
                  {Object.entries(categoryInfo).map(([key, info]) => (
                    <option key={key} value={key}>{info.name}</option>
                  ))}
                </select>
                <select
                  value={selectedImportance}
                  onChange={(e) => setSelectedImportance(e.target.value)}
                  className="px-3 py-2 border rounded-md bg-[var(--surface-color)] text-[var(--text-color)]"
                >
                  <option value="all">All Importance</option>
                  <option value="essential">Essential</option>
                  <option value="recommended">Recommended</option>
                  <option value="optional">Optional</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="all">All</TabsTrigger>
            {Object.entries(categoryInfo).map(([key, info]) => (
              <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                {info.icon}
                <span className="hidden sm:inline">{info.name.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* All Items Tab */}
          <TabsContent value="all">
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    checkedItems.has(item.id) ? 'bg-[var(--muted-background)] opacity-75' : ''
                  }`}
                    onClick={() => toggleItem(item.id)}
                  >
                    <CardContent className="flex items-center gap-4 p-4">
                      <input
                        type="checkbox"
                        checked={checkedItems.has(item.id)}
                        onChange={() => toggleItem(item.id)}
                        className="h-5 w-5 text-[var(--primary-color)] rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-sm font-medium ${
                            checkedItems.has(item.id) ? 'line-through text-[var(--muted-text-color)]' : ''
                          }`}>
                            {item.quantity ? `${item.quantity} ` : ''}{item.name}
                          </span>
                          <Badge className={`${importanceColors[item.importance]} text-white text-xs`}>
                            {item.importance}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {categoryInfo[item.category].name}
                          </Badge>
                          {item.link && (
                            <Link href={item.link} target="_blank" rel="noopener noreferrer">
                              <Button variant="ghost" size="sm" className="h-6 text-xs">
                                View Product
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Category-specific tabs */}
          {Object.entries(categoryInfo).map(([category, info]) => (
            <TabsContent key={category} value={category}>
              <Card className="mb-4">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium flex items-center gap-2">
                      {info.icon}
                      {info.name} Progress
                    </span>
                    <span className="text-sm text-[var(--muted-text-color)]">
                      {Math.round(getProgressByCategory(category))}%
                    </span>
                  </div>
                  <Progress value={getProgressByCategory(category)} className="h-2" />
                </CardContent>
              </Card>
              
              <div className="space-y-4">
                {packingItems
                  .filter(item => item.category === category)
                  .map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                        checkedItems.has(item.id) ? 'bg-[var(--muted-background)] opacity-75' : ''
                      }`}
                        onClick={() => toggleItem(item.id)}
                      >
                        <CardContent className="flex items-center gap-4 p-4">
                          <input
                            type="checkbox"
                            checked={checkedItems.has(item.id)}
                            onChange={() => toggleItem(item.id)}
                            className="h-5 w-5 text-[var(--primary-color)] rounded"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`font-medium ${
                                checkedItems.has(item.id) ? 'line-through text-[var(--muted-text-color)]' : ''
                              }`}>
                                {item.quantity ? `${item.quantity} ` : ''}{item.name}
                              </span>
                              <Badge className={`${importanceColors[item.importance]} text-white text-xs`}>
                                {item.importance}
                              </Badge>
                            </div>
                            {item.link && (
                              <Link href={item.link} target="_blank" rel="noopener noreferrer">
                                <Button variant="ghost" size="sm" className="h-6 text-xs">
                                  View Product
                                </Button>
                              </Link>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.section>

      <Separator />

      {/* The Goods - Images Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-6">The Goods</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="group hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <Image 
                  src="/assets/images/misc/IMG_2622 2.jpg" 
                  alt="Travel packing setup" 
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">Essential Travel Gear</h3>
                <p className="text-sm text-[var(--muted-text-color)]">
                  Everything you need for world travel, organized and ready for adventure.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <Image 
                  src="/assets/images/misc/IMG_2629.jpg" 
                  alt="Packed backpack ready for travel" 
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">Packed & Ready</h3>
                <p className="text-sm text-[var(--muted-text-color)]">
                  The final result: a perfectly organized backpack for year-long adventures.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full flex items-center justify-center">
                  <Backpack className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold">Year-Long Journey</h3>
                <p className="text-sm text-[var(--muted-text-color)] leading-relaxed">
                  This checklist represents everything needed for a complete year of travel across 16 countries. 
                  Every item has been tested and proven essential for world exploration.
                </p>
                <Badge className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white">
                  Battle-Tested
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.section>
    </div>
  )
}