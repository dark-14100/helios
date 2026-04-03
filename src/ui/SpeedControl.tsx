import { useSimStore } from '@/store/simStore'

export function SpeedControl() {
  const { isPaused, setIsPaused, simSpeed, setSimSpeed } = useSimStore()

  // Slider mathematically mapped: 0 to 100 maps log-scale 0.1 to 1000
  const sliderValue = Math.log10(simSpeed) * 33

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value)
    const speed = Math.pow(10, val / 33)
    setSimSpeed(speed)
  }

  return (
    <div 
      className="absolute top-6 left-6 flex flex-col gap-3 pointer-events-auto bg-[rgba(0,5,20,0.8)] backdrop-blur-md border border-[rgba(0,255,231,0.2)] p-4 text-[#00ffe7]"
      style={{ fontFamily: "'Share Tech Mono', monospace" }}
    >
      <div className="flex items-center justify-between gap-6">
        <span className="text-sm tracking-widest text-[#ffffff80] uppercase">Sim Pace</span>
        <button 
          onClick={() => setIsPaused(!isPaused)}
          className="border border-[#00ffe7] px-3 py-1 text-xs hover:bg-[#00ffe7] hover:text-black transition-colors"
        >
          {isPaused ? 'RESUME' : 'PAUSE'}
        </button>
      </div>
      
      <input 
        type="range" 
        min="-33" 
        max="100" 
        step="0.1"
        value={sliderValue}
        onChange={handleSlider}
        className="cursor-pointer accent-[#00ffe7]"
      />
      
      <div className="text-right text-xs">
        {simSpeed.toFixed(1)}x
      </div>
    </div>
  )
}
