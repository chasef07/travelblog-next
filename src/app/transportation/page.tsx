import dynamic from 'next/dynamic'

const TransportationGrid = dynamic(() => import('@/components/TransportationGrid'), {
  loading: () => (
    <div className="text-center py-12">
      <div className="text-white/40 font-mono tracking-wider text-sm">LOADING GUIDES...</div>
    </div>
  )
})

export default function Page() {
  return (
    <main className="min-h-screen pt-24" style={{ background: 'linear-gradient(160deg, #1a1714 0%, #2a2520 100%)' }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-16 animate-fade-in">
          <div>
            <span className="font-mono text-sm tracking-[0.2em] text-[#c4704b] uppercase block mb-4">
              [ Getting Around ]
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-[#faf6f1]">
              Transportation
            </h1>
          </div>
          <p className="text-[#d4c0a8]/60 text-lg leading-relaxed max-w-md md:text-right">
            Comprehensive ratings and practical tips for getting around in 14+ countries.
          </p>
        </div>

        <TransportationGrid />
      </div>
    </main>
  )
}
