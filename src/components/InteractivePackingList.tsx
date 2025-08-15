'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Star, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Button } from './ui/button'

interface PackingItem {
  id: string
  name: string
  importance: 'essential' | 'recommended' | 'optional'
  checked: boolean
  description?: string
}

interface PackingCategory {
  id: string
  name: string
  icon: string
  color: string
  items: PackingItem[]
}

const packingData: PackingCategory[] = [
  {
    id: 'essentials',
    name: 'Travel Essentials',
    icon: '✈️',
    color: 'from-red-500 to-pink-500',
    items: [
      { id: 'passport', name: 'Passport', importance: 'essential', checked: false, description: 'Valid for 6+ months' },
      { id: 'visa', name: 'Visa Documents', importance: 'essential', checked: false, description: 'Country-specific requirements' },
      { id: 'tickets', name: 'Flight Tickets', importance: 'essential', checked: false, description: 'Digital + printed copies' },
      { id: 'insurance', name: 'Travel Insurance', importance: 'essential', checked: false, description: 'Medical & trip coverage' },
      { id: 'money', name: 'Cash & Cards', importance: 'essential', checked: false, description: 'Local currency + backup cards' },
      { id: 'accommodation', name: 'Hotel Confirmations', importance: 'recommended', checked: false, description: 'Booking references' }
    ]
  },
  {
    id: 'tech',
    name: 'Tech & Gadgets',
    icon: '📱',
    color: 'from-blue-500 to-cyan-500',
    items: [
      { id: 'phone', name: 'Smartphone', importance: 'essential', checked: false, description: 'Unlocked for international SIM' },
      { id: 'charger', name: 'Phone Charger', importance: 'essential', checked: false, description: 'USB-C/Lightning' },
      { id: 'powerbank', name: 'Power Bank', importance: 'recommended', checked: false, description: '20,000mAh capacity' },
      { id: 'adapter', name: 'Universal Adapter', importance: 'essential', checked: false, description: 'Works in destination country' },
      { id: 'camera', name: 'Camera', importance: 'recommended', checked: false, description: 'DSLR or mirrorless' },
      { id: 'laptop', name: 'Laptop', importance: 'optional', checked: false, description: 'For work/content creation' },
      { id: 'headphones', name: 'Noise-Canceling Headphones', importance: 'recommended', checked: false, description: 'For flights & travel' }
    ]
  },
  {
    id: 'clothing',
    name: 'Clothing & Accessories',
    icon: '👕',
    color: 'from-green-500 to-emerald-500',
    items: [
      { id: 'underwear', name: 'Underwear (7 pairs)', importance: 'essential', checked: false, description: 'Quick-dry material' },
      { id: 'socks', name: 'Socks (7 pairs)', importance: 'essential', checked: false, description: 'Merino wool recommended' },
      { id: 'shirts', name: 'T-Shirts (5)', importance: 'essential', checked: false, description: 'Breathable fabric' },
      { id: 'pants', name: 'Travel Pants (2)', importance: 'essential', checked: false, description: 'Lightweight & versatile' },
      { id: 'shorts', name: 'Shorts (2 pairs)', importance: 'recommended', checked: false, description: 'For warm weather' },
      { id: 'jacket', name: 'Light Jacket', importance: 'recommended', checked: false, description: 'Packable & waterproof' },
      { id: 'shoes', name: 'Walking Shoes', importance: 'essential', checked: false, description: 'Comfortable & broken in' },
      { id: 'sandals', name: 'Sandals/Flip-flops', importance: 'recommended', checked: false, description: 'For beach/hostel' }
    ]
  },
  {
    id: 'health',
    name: 'Health & Safety',
    icon: '🛡️',
    color: 'from-purple-500 to-pink-500',
    items: [
      { id: 'medications', name: 'Personal Medications', importance: 'essential', checked: false, description: 'Prescription + extra supply' },
      { id: 'firstaid', name: 'First Aid Kit', importance: 'recommended', checked: false, description: 'Basic supplies' },
      { id: 'sunscreen', name: 'Sunscreen SPF 50+', importance: 'essential', checked: false, description: 'Reef-safe formula' },
      { id: 'insectrepellent', name: 'Insect Repellent', importance: 'recommended', checked: false, description: 'DEET-based' },
      { id: 'handsanitizer', name: 'Hand Sanitizer', importance: 'recommended', checked: false, description: '60%+ alcohol content' },
      { id: 'masks', name: 'Face Masks', importance: 'recommended', checked: false, description: 'For travel/crowded areas' }
    ]
  },
  {
    id: 'personal',
    name: 'Personal Care',
    icon: '🧴',
    color: 'from-orange-500 to-red-500',
    items: [
      { id: 'toothbrush', name: 'Toothbrush', importance: 'essential', checked: false, description: 'Travel-size' },
      { id: 'toothpaste', name: 'Toothpaste', importance: 'essential', checked: false, description: 'Under 100ml for carry-on' },
      { id: 'shampoo', name: 'Shampoo/Body Wash', importance: 'essential', checked: false, description: 'All-in-one travel size' },
      { id: 'deodorant', name: 'Deodorant', importance: 'essential', checked: false, description: 'Stick or roll-on' },
      { id: 'razor', name: 'Razor', importance: 'recommended', checked: false, description: 'Safety razor + blades' },
      { id: 'skincare', name: 'Skincare Products', importance: 'optional', checked: false, description: 'Moisturizer, etc.' }
    ]
  }
]

export default function InteractivePackingList() {
  const [categories, setCategories] = useState<PackingCategory[]>(packingData)
  const [selectedCategory, setSelectedCategory] = useState<string>('essentials')

  // Load saved state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('packingList')
    if (saved) {
      try {
        setCategories(JSON.parse(saved))
      } catch (error) {
        console.error('Error loading saved packing list:', error)
      }
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('packingList', JSON.stringify(categories))
  }, [categories])

  const toggleItem = (categoryId: string, itemId: string) => {
    setCategories(prev => prev.map(category => 
      category.id === categoryId 
        ? {
            ...category,
            items: category.items.map(item =>
              item.id === itemId ? { ...item, checked: !item.checked } : item
            )
          }
        : category
    ))
  }

  const resetAll = () => {
    setCategories(prev => prev.map(category => ({
      ...category,
      items: category.items.map(item => ({ ...item, checked: false }))
    })))
  }

  const getCategoryProgress = (category: PackingCategory) => {
    const checkedItems = category.items.filter(item => item.checked).length
    return (checkedItems / category.items.length) * 100
  }

  const getOverallProgress = () => {
    const totalItems = categories.reduce((acc, cat) => acc + cat.items.length, 0)
    const checkedItems = categories.reduce((acc, cat) => acc + cat.items.filter(item => item.checked).length, 0)
    return (checkedItems / totalItems) * 100
  }

  const getImportanceIcon = (importance: string) => {
    switch (importance) {
      case 'essential': return <AlertCircle className="h-4 w-4 text-red-500" />
      case 'recommended': return <Star className="h-4 w-4 text-yellow-500" />
      default: return <div className="h-4 w-4 rounded-full bg-gray-300" />
    }
  }

  const getImportanceBadge = (importance: string) => {
    switch (importance) {
      case 'essential': return <Badge variant="destructive" className="text-xs">Essential</Badge>
      case 'recommended': return <Badge variant="secondary" className="text-xs">Recommended</Badge>
      default: return <Badge variant="outline" className="text-xs">Optional</Badge>
    }
  }

  const overallProgress = getOverallProgress()
  const selectedCat = categories.find(cat => cat.id === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/30 py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Ultimate Packing Checklist
            </span>
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            Everything you need for your Asian adventure • Interactive & smart
          </p>
          
          {/* Overall Progress */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-3 mb-4" />
            {overallProgress === 100 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-green-600 font-medium"
              >
                🎉 Congratulations! You&apos;re ready to travel!
              </motion.div>
            )}
          </div>

          <Button variant="outline" onClick={resetAll} size="sm">
            Reset All Items
          </Button>
        </motion.div>

        {/* Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12"
        >
          {categories.map((category, index) => {
            const progress = getCategoryProgress(category)
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedCategory === category.id 
                      ? 'ring-2 ring-primary shadow-lg' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mx-auto mb-3 text-2xl`}>
                      {category.icon}
                    </div>
                    <h3 className="font-semibold text-sm mb-2">{category.name}</h3>
                    <Progress value={progress} className="h-2 mb-2" />
                    <div className="text-xs text-muted-foreground">
                      {category.items.filter(item => item.checked).length}/{category.items.length} items
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Selected Category Items */}
        <AnimatePresence mode="wait">
          {selectedCat && (
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${selectedCat.color} flex items-center justify-center text-lg`}>
                        {selectedCat.icon}
                      </div>
                      <CardTitle className="text-xl">{selectedCat.name}</CardTitle>
                    </div>
                    <Progress value={getCategoryProgress(selectedCat)} className="w-32 h-2" />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid gap-3 p-6">
                    {selectedCat.items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                          item.checked 
                            ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800' 
                            : 'bg-card hover:bg-accent/50'
                        }`}
                        onClick={() => toggleItem(selectedCategory, item.id)}
                      >
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          item.checked 
                            ? 'bg-green-500 border-green-500' 
                            : 'border-muted-foreground hover:border-primary'
                        }`}>
                          {item.checked && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500 }}
                            >
                              <Check className="h-4 w-4 text-white" />
                            </motion.div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {getImportanceIcon(item.importance)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className={`font-medium ${item.checked ? 'line-through text-muted-foreground' : ''}`}>
                              {item.name}
                            </span>
                            {getImportanceBadge(item.importance)}
                          </div>
                          {item.description && (
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}