'use client'

import { motion } from 'framer-motion'

export default function SectionTitle({ children }: { children: React.ReactNode }){
  return (
    <div className="max-w-[1200px] mx-auto mb-16 text-center">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
      >
        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {children}
        </span>
      </motion.h2>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100px' }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"
      />
    </div>
  )
}
