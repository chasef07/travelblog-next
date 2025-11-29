import dynamic from 'next/dynamic'

const VlogGrid = dynamic(() => import('@/components/VlogGrid'), {
  loading: () => (
    <div className="text-center py-12">
      <div className="text-white/40 font-mono tracking-wider text-sm">LOADING VIDEOS...</div>
    </div>
  )
})

export default function Page() {
  return (
    <main className="min-h-screen bg-black pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-16 animate-fade-in">
          <div>
            <span className="font-mono text-sm tracking-[0.2em] text-white/40 uppercase block mb-4">
              [ Video Stories ]
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-white">
              Travel Vlogs
            </h1>
          </div>
          <p className="text-white/50 text-lg leading-relaxed max-w-md md:text-right">
            Raw, authentic experiences from 18 countries. Party scenes to cultural immersion.
          </p>
        </div>

        <VlogGrid />
      </div>
    </main>
  )
}
