import * as THREE from 'three'
import { PlanetData } from '@/data/planets'
import { getPlanetPosition } from '@/simulation/keplerEngine'

export function createOrbitTrail(planet: PlanetData, scene: THREE.Scene): THREE.LineLoop {
  const points: THREE.Vector3[] = []
  
  // Sample 256 unique points around the entire orbital period.
  // We use i < 256 because LineLoop intrinsically connects index 255 back to index 0 seamlessly.
  for (let i = 0; i < 256; i++) {
    const t = (i / 256) * planet.orbitalPeriod
    const pos = getPlanetPosition(planet, t)
    points.push(new THREE.Vector3(pos.x, pos.y, pos.z))
  }
  
  const geo = new THREE.BufferGeometry().setFromPoints(points)
  const mat = new THREE.LineBasicMaterial({
    color: 0x334455,
    transparent: true,
    opacity: 0.4
  })
  
  const line = new THREE.LineLoop(geo, mat)
  scene.add(line)
  
  return line
}

export function createAllOrbitTrails(planets: PlanetData[], scene: THREE.Scene): void {
  planets.forEach((planet) => {
    createOrbitTrail(planet, scene)
  })
}
