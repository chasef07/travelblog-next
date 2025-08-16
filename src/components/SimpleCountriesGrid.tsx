'use client'

import Image from "next/image"

export default function SimpleCountriesGrid() {

  const countries = [
    { name: 'Israel', flag: 'IS-flag.jpg' },
    { name: 'Georgia', flag: 'GG-flag.jpg' },
    { name: 'Kenya', flag: 'KE-flag.jpg' },
    { name: 'Tanzania', flag: 'TZ-flag.jpg' },
    { name: 'Rwanda', flag: 'RW-flag.jpg' },
    { name: 'UAE', flag: 'AE-flag.jpg' },
    { name: 'Nepal', flag: 'NP-flag.jpg' },
    { name: 'Thailand', flag: 'TH-flag.jpg' },
    { name: 'Laos', flag: 'LA-flag.jpg' },
    { name: 'Cambodia', flag: 'CB-flag.jpg' },
    { name: 'China', flag: 'CH-flag.jpg' },
    { name: 'Vietnam', flag: 'VM-flag.jpg' },
    { name: 'Singapore', flag: 'SN-flag.jpg' },
    { name: 'Philippines', flag: 'RP-flag.jpg' },
    { name: 'Indonesia', flag: 'ID-flag.jpg' },
    { name: 'Japan', flag: 'JA-flag.jpg' },
  ] as const

  return (
    <div className="grid gap-6 md:gap-8 justify-items-center" style={{gridTemplateColumns:'repeat(auto-fill,minmax(100px,1fr))'}}>
      {countries.map((country, index) => (
        <div 
          key={country.name} 
          className="group text-center cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
        >
          <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500">
            <Image 
              src={`/assets/images/flags/${country.flag}`} 
              alt={`${country.name} flag`} 
              width={100} 
              height={67} 
              className="w-full h-[60px] md:h-[67px] object-cover rounded-xl transition-transform duration-300 group-hover:scale-110" 
              onError={(e) => {
                console.error(`Failed to load flag for ${country.name}: ${country.flag}`)
                // Show elegant fallback
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.classList.remove('hidden');
              }}
              priority={index < 8}
            />
            {/* Elegant fallback */}
            <div className="hidden w-full h-[60px] md:h-[67px] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
              <span className="text-xs font-medium text-primary">{country.name}</span>
            </div>
            
            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-xl ring-2 ring-transparent group-hover:ring-primary/30 transition-all duration-300" />
          </div>
          
          <div className="mt-3">
            <span className="block text-xs md:text-sm font-medium text-foreground/70 group-hover:text-primary transition-colors duration-300">
              {country.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}