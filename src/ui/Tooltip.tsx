import { useEffect, useState } from 'react'

interface TooltipProps {
  hoveredPlanet: string | null
}

export function Tooltip({ hoveredPlanet }: TooltipProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      // Calculate dynamic mouse trace offset preventing intersection overlap
      setPosition({ x: e.clientX + 15, y: e.clientY + 15 })
    }
    
    // Always bind natively to DOM body coordinates
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  if (!hoveredPlanet) return null

  return (
    <div 
      className="fixed pointer-events-none z-50 px-3 py-1 text-sm bg-[rgba(0,5,20,0.9)] border-l-2 border-[#00ffe7] text-[#00ffe7]"
      style={{ left: position.x, top: position.y, fontFamily: "'Share Tech Mono', monospace" }}
    >
      {hoveredPlanet.toUpperCase()}
    </div>
  )
}
