import { SpeedControl } from './SpeedControl'
import { StatsPanel } from './StatsPanel'
import { PlanetNav } from './PlanetNav'

export function HUD() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 font-['Share_Tech_Mono',_monospace]">
      <SpeedControl />
      <StatsPanel />
      <PlanetNav />
    </div>
  )
}
