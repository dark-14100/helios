import { useSimStore } from '@/store/simStore'
import { planets } from '@/data/planets'

export function PlanetNav() {
  const { selectedPlanet, setSelectedPlanet } = useSimStore()

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto flex gap-6 items-center bg-[rgba(0,5,20,0.6)] backdrop-blur-md px-8 py-4 border-t border-b border-[rgba(0,255,231,0.2)] rounded-full">
      {planets.map(planet => {
        const isActive = planet.name === selectedPlanet
        return (
          <button
            key={planet.name}
            onClick={() => setSelectedPlanet(isActive ? null : planet.name)}
            className="group flex flex-col items-center gap-2 transition-transform hover:scale-110"
          >
            <div 
              className={`relative w-4 h-4 rounded-full transition-shadow duration-300 ${isActive ? 'shadow-[0_0_15px_#00ffe7]' : 'shadow-none'}`}
              style={{ backgroundColor: `#${planet.color.toString(16).padStart(6, '0')}` }}
            >
              {isActive && (
                <div className="absolute inset-0 rounded-full border-2 border-[#00ffe7] scale-150 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite] opacity-50" />
              )}
            </div>
            <span className={`text-[10px] tracking-widest transition-colors font-['Share_Tech_Mono',_monospace] ${isActive ? 'text-[#00ffe7]' : 'text-[#ffffff60] group-hover:text-[#ffffffaa]'}`}>
              {planet.name.toUpperCase()}
            </span>
          </button>
        )
      })}
    </div>
  )
}
