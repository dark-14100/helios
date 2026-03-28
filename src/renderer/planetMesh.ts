import * as THREE from 'three'
import { PlanetData } from '@/data/planets'

/**
 * Creates a single planet mesh with its scaled geometry, standard material handling, texture fallback, and axial tilt.
 * @param planet The data properties configuration for the target planet
 * @param scene The central active Three.js scene object
 * @returns The successfully generated and scene-added THREE.Mesh
 */
export function createPlanetMesh(planet: PlanetData, scene: THREE.Scene): THREE.Mesh {
  const geometry = new THREE.SphereGeometry(planet.radius, 32, 32)
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  
  const mesh = new THREE.Mesh(geometry, material)

  const loader = new THREE.TextureLoader()
  
  // Load primary planet texture, but swap entire material on missing texture error
  loader.load(
    planet.texturePath,
    (texture) => {
      material.map = texture
      material.needsUpdate = true
    },
    undefined,
    () => {
      // Fallback: Texture missing, swap material entirely to prevent WebGL black shader bug
      mesh.material = new THREE.MeshStandardMaterial({ color: planet.color })
    }
  )
  
  if (planet.hasRings && planet.ringTexturePath) {
    const ringGeo = new THREE.RingGeometry(planet.radius * 1.4, planet.radius * 2.5, 64)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    })
    
    const ring = new THREE.Mesh(ringGeo, ringMat)

    loader.load(
      planet.ringTexturePath,
      (texture) => {
        ringMat.map = texture
        ringMat.needsUpdate = true
      },
      undefined,
      () => {
        // Fallback for Saturn rings
        ring.material = new THREE.MeshBasicMaterial({
          color: planet.color,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.8
        })
      }
    )

    ring.rotation.x = Math.PI / 2
    mesh.add(ring)
  }
  
  // Impart the proper axial tilt inclination
  mesh.rotation.z = THREE.MathUtils.degToRad(planet.axialTilt)

  scene.add(mesh)
  
  return mesh
}

/**
 * Loops through the PlanetData array and constructs mesh references for all celestial bodies.
 * @param planets Array of initialized definitions detailing the planets.
 * @param scene Target scene where they will be loaded.
 * @returns A stable Map relating planet string names to their runtime Mesh elements.
 */
export function createAllPlanetMeshes(planets: PlanetData[], scene: THREE.Scene): Map<string, THREE.Mesh> {
  const meshMap = new Map<string, THREE.Mesh>()
  planets.forEach(planet => {
    const mesh = createPlanetMesh(planet, scene)
    meshMap.set(planet.name, mesh)
  })
  return meshMap
}
