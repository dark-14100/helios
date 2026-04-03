import { MoonData } from '@/data/planets'

export function getMoonPosition(
  moon: MoonData,
  elapsedDays: number,
  parentPosition: { x: number; y: number; z: number }
): { x: number; y: number; z: number } {
  // Translate time into a generic circular 360-degree wrapping angle based strictly on the specified orbit period
  const angle = ((2 * Math.PI) / moon.orbitPeriod) * elapsedDays
  
  // Calculate relative planar coordinates using trigonometric ratios tracking exactly to the parent planetary center
  return {
    x: parentPosition.x + moon.orbitRadius * Math.cos(angle),
    y: parentPosition.y, // Orbital planes simplified as completely flat natively
    z: parentPosition.z + moon.orbitRadius * Math.sin(angle),
  }
}
