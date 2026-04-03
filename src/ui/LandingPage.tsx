import { useSimStore } from '@/store/simStore'

export function LandingPage() {
  const isLoading = useSimStore((s) => s.isLoading)
  const loadingProgress = useSimStore((s) => s.loadingProgress)
  const hasStarted = useSimStore((s) => s.hasStarted)
  const setHasStarted = useSimStore((s) => s.setHasStarted)

  if (hasStarted) return null

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050510] text-slate-100 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-blue-900 blur-[150px]" />
      </div>

      <div className="z-10 flex flex-col items-center gap-8 p-12 rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-black tracking-tighter bg-gradient-to-br from-white to-slate-500 bg-clip-text text-transparent drop-shadow-sm">
            HELIOS
          </h1>
          <p className="text-lg text-slate-400 font-light tracking-wide">
            Interactive 3D Solar System Simulator
          </p>
        </div>

        {isLoading ? (
          <div className="w-64 space-y-3">
            <div className="flex justify-between text-xs text-slate-400 font-mono tracking-widest uppercase">
              <span>Initializing</span>
              <span>{Math.round(loadingProgress * 100)}%</span>
            </div>
            <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress * 100}%` }}
              />
            </div>
          </div>
        ) : (
          <button
            onClick={() => setHasStarted(true)}
            className="group relative px-12 py-4 bg-white text-black font-semibold uppercase tracking-widest rounded-full hover:scale-105 transition-all duration-300 ease-out overflow-hidden"
          >
            <div className="absolute inset-0 bg-blue-100 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10">Start Sim</span>
          </button>
        )}
      </div>
      
      <div className="absolute bottom-8 text-xs text-slate-600 tracking-widest uppercase text-center space-y-2">
        <p>Helios Engine v1.0.0</p>
        <p className="opacity-50">Scroll to zoom · Click to interact · Drag to pan</p>
      </div>
    </div>
  )
}
