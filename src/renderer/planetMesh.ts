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
      // Fallback: Texture missing, swap material entirely to a sophisticated low-poly architectural hologram aesthetic
      mesh.material = new THREE.MeshStandardMaterial({ 
        color: planet.color, 
        flatShading: true, 
        roughness: 0.3,
        metalness: 0.4
      })

      // Add a skeletal technical wireframe overlay matching the radius precisely
      const wireGeo = new THREE.WireframeGeometry(geometry)
      const wireMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15 })
      const wireframe = new THREE.LineSegments(wireGeo, wireMat)
      mesh.add(wireframe)
    }
  )
  
  if (planet.nightTexturePath) {
    material.emissiveMap = loader.load(planet.nightTexturePath)
    material.emissive = new THREE.Color(0xffffff)
    material.emissiveIntensity = 0.8
  }
  
  if (planet.hasRings && planet.ringTexturePath) {
    const innerRadius = planet.radius * 1.4
    const outerRadius = planet.radius * 2.5
    const ringGeo = new THREE.RingGeometry(innerRadius, outerRadius, 64)
    
    // Fix UV mapping for horizontal strip textures (common for planetary rings)
    const pos = ringGeo.attributes.position
    const uv = ringGeo.attributes.uv
    const v3 = new THREE.Vector3()
    for (let i = 0; i < pos.count; i++) {
      v3.fromBufferAttribute(pos, i)
      const radius = v3.length()
      const normalizedRadius = (radius - innerRadius) / (outerRadius - innerRadius)
      uv.setXY(i, normalizedRadius, 0.5) // U is mapped across radius
    }
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

    // A ring in ThreeJS defaults to X/Y plane, but we want X/Z plane to circle the planet equator
    ring.rotation.x = -Math.PI / 2
    mesh.add(ring)
  }
  
  // Impart the proper axial tilt inclination
  mesh.rotation.z = THREE.MathUtils.degToRad(planet.axialTilt)

  scene.add(mesh)
  
  return mesh
}

export function createMoonMeshes(planet: PlanetData, scene: THREE.Scene): Map<string, THREE.Mesh> {
  const moonMeshes = new Map<string, THREE.Mesh>()
  const loader = new THREE.TextureLoader()

  planet.moons.forEach((moon) => {
    // Generate the spherical moon with low geometry poly-count to keep scene performance sharp
    const geometry = new THREE.SphereGeometry(moon.radius, 16, 16)
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
    const mesh = new THREE.Mesh(geometry, material)

    // Link shared texture
    loader.load(
      moon.texturePath,
      (texture) => {
        material.map = texture
        material.needsUpdate = true
      },
      undefined,
      () => {
        // Fallback: Missing moon textures render as sharp faceted low-poly satellites
        mesh.material = new THREE.MeshStandardMaterial({ 
          color: 0xaaaaaa, 
          flatShading: true, 
          roughness: 0.2,
          metalness: 0.5
        })
        
        const wireGeo = new THREE.WireframeGeometry(geometry)
        const wireMat = new THREE.LineBasicMaterial({ color: 0x88ccff, transparent: true, opacity: 0.25 })
        const wireframe = new THREE.LineSegments(wireGeo, wireMat)
        mesh.add(wireframe)
      }
    )

    scene.add(mesh)
    moonMeshes.set(moon.name, mesh)
  })

  return moonMeshes
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
