import { PlanetData } from '@/data/planets'

export function solveEccentricAnomaly(M: number, e: number): number {
  let E = M
  for (let i = 0; i < 100; i++) {
    const dE = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E))
    E -= dE
    if (Math.abs(dE) < 1e-6) break
  }
  return E
}

export function getPlanetPosition(
  planet: PlanetData,
  elapsedDays: number
): { x: number; y: number; z: number } {
  const { semiMajorAxis: a, eccentricity: e, orbitalPeriod: T } = planet
  const M = ((2 * Math.PI) / T) * elapsedDays
  const E = solveEccentricAnomaly(M, e)
  const nu = 2 * Math.atan2(
    Math.sqrt(1 + e) * Math.sin(E / 2),
    Math.sqrt(1 - e) * Math.cos(E / 2)
  )
  const r = a * (1 - e * Math.cos(E))
  return {
    x: r * Math.cos(nu),
    y: 0,
    z: r * Math.sin(nu),
  }
}
