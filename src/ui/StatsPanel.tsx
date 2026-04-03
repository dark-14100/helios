import { useSimStore } from '@/store/simStore'
import { planets } from '@/data/planets'
import { getPlanetPosition } from '@/simulation/keplerEngine'

export function StatsPanel() {
  const { elapsedDays, selectedPlanet } = useSimStore()
  
  const planet = planets.find(p => p.name === selectedPlanet)
  
  // Feature 11: Calculate live active trajectory distance dynamics synchronously with the loop
  const pos = planet ? getPlanetPosition(planet, elapsedDays) : null
  const distanceAU = pos ? Math.sqrt(pos.x ** 2 + pos.z ** 2) / 40 : 0
  const distanceKm = (distanceAU * 149_597_870).toLocaleString(undefined, { maximumFractionDigits: 0 })

  if (!planet) return null

  return (
    <div 
      id="stats-panel-anchor" 
      className="fixed pointer-events-none transition-opacity duration-300 z-40 origin-top-left"
      style={{
        left: 0,
        top: 0,
        opacity: 0,
        transform: `translate(-999px, -999px)`,
        fontFamily: "'Share Tech Mono', monospace"
      }}
    >
      <div className="relative">
        <svg className="absolute top-0 left-0 w-64 h-64 pointer-events-none stroke-[#00ffe7] fill-transparent overflow-visible drop-shadow-[0_0_8px_rgba(0,255,231,0.5)]">
          <polyline 
             points="0,0 45,-75 120,-75" 
             strokeWidth="2"
             className="animate-[draw_0.8s_ease-out_forwards]"
             strokeDasharray="200"
             strokeDashoffset="200"
          />
          <circle cx="0" cy="0" r="4" fill="#00ffe7" className="animate-pulse" />
        </svg>

        {/* Deploying Sci-Fi Hardware Wrapper */}
        <div className="absolute pointer-events-auto top-[-75px] left-[120px] w-72 bg-[rgba(0,2,10,0.85)] backdrop-blur-md border-t border-b border-r border-[rgba(0,255,231,0.4)] shadow-[inset_4px_0_15px_rgba(0,255,231,0.1),_0_0_20px_rgba(0,0,0,0.8)] p-6 text-sm animate-[unfold_0.5s_ease-out_0.5s_both]">
           
           <h2 className="text-[#00ffe7] text-2xl mb-5 pb-2 uppercase tracking-widest relative">
             {planet.name}
             <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#00ffe7] to-transparent"></span>
             <span className="absolute -bottom-[1px] right-0 w-2 h-2 bg-[#00ffe7]"></span>
           </h2>

           <div className="space-y-4">
             <div className="flex justify-between items-center group">
                <span className="text-[10px] tracking-widest text-[#ffffff60] group-hover:text-[#ffffffaa] transition-colors">DISTANCE</span>
                <span className="text-[#00ffe7] tabular-nums font-bold">{distanceAU.toFixed(3)} AU</span>
             </div>
             <div className="flex justify-between items-center group">
                <span className="text-[10px] tracking-widest text-[#ffffff60] group-hover:text-[#ffffffaa] transition-colors">KILOMETERS</span>
                <span className="text-[#00ffe7] tabular-nums font-bold">{distanceKm}</span>
             </div>
             <div className="flex justify-between items-center group">
                <span className="text-[10px] tracking-widest text-[#ffffff60] group-hover:text-[#ffffffaa] transition-colors">ORBITAL PERIOD</span>
                <span className="text-[#00ffe7] tabular-nums font-bold">{planet.orbitalPeriod.toLocaleString()} DAYS</span>
             </div>
             <div className="flex justify-between items-center group">
                <span className="text-[10px] tracking-widest text-[#ffffff60] group-hover:text-[#ffffffaa] transition-colors">AXIAL TILT</span>
                <span className="text-[#00ffe7] tabular-nums font-bold">{planet.axialTilt.toFixed(1)}°</span>
             </div>
             {planet.hasRings && (
               <div className="flex justify-between items-center group">
                 <span className="text-[10px] tracking-widest text-[#ffffff60] group-hover:text-[#ffffffaa] transition-colors">SYSTEM TYPE</span>
                 <span className="text-[#00ffe7] text-xs font-bold ring-1 ring-[#00ffe7] px-2 py-[2px] bg-[rgba(0,255,231,0.1)]">RINGS ACTIVE</span>
               </div>
             )}
             <div className="flex justify-between items-center group">
                <span className="text-[10px] tracking-widest text-[#ffffff60] group-hover:text-[#ffffffaa] transition-colors">SATELLITES</span>
                <span className="text-[#00ffe7] tabular-nums font-bold">{planet.moons.length}</span>
             </div>
             
             {planet.moons.length > 0 && (
               <div className="pt-2 flex flex-wrap gap-2">
                 {planet.moons.map(moon => (
                   <span key={moon.name} className="text-[9px] text-[#ffffff80] border border-[rgba(255,255,255,0.2)] px-2 py-1 uppercase">{moon.name}</span>
                 ))}
               </div>
             )}
           </div>

        </div>
      </div>
    </div>
  )
}
