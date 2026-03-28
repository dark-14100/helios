import * as THREE from 'three'

/**
 * Generates the central Sun core and its surrounding atmosphere/halo.
 * @param scene The active Three.js Scene.
 * @returns The core sun mesh required for animation pulsing.
 */
export function createSun(scene: THREE.Scene): THREE.Mesh {
  // 1. Sun Core
  const coreGeometry = new THREE.SphereGeometry(4, 32, 32)
  const coreMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
  
  const textureLoader = new THREE.TextureLoader()
  coreMaterial.map = textureLoader.load(
    '/textures/sun.jpg',
    undefined,
    undefined,
    () => {
      // Fallback if texture is missing
      coreMaterial.map = null
      coreMaterial.color.set(0xffdd44)
      coreMaterial.needsUpdate = true
    }
  )

  const sunCore = new THREE.Mesh(coreGeometry, coreMaterial)
  
  // 2. Glow Halo
  const haloGeometry = new THREE.SphereGeometry(5.5, 32, 32)
  const haloMaterial = new THREE.MeshBasicMaterial({
    color: 0xff9900,
    transparent: true,
    opacity: 0.15,
    side: THREE.BackSide
  })
  const sunHalo = new THREE.Mesh(haloGeometry, haloMaterial)
  
  // Parent the halo to the core so scaling the core scales both
  sunCore.add(sunHalo)
  
  // 3. Environment Lighting
  // Boosted from 3 to 3000 to combat strict physical light decay over 90+ units
  const sunLight = new THREE.PointLight(0xfff5e0, 3000, 1000, 2)
  const ambientLight = new THREE.AmbientLight(0x222244, 1.5)
  
  // 4. Starfield
  const starGeo = new THREE.BufferGeometry()
  const starCount = 10000
  const positions = new Float32Array(starCount * 3)
  for (let i = 0; i < starCount * 3; i++) {
    // Random position in range ±900 on all axes
    positions[i] = (Math.random() - 0.5) * 1800
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.3 })
  const stars = new THREE.Points(starGeo, starMat)
  
  // Add complete structure to scene
  scene.add(sunCore)
  scene.add(sunLight)
  scene.add(ambientLight)
  scene.add(stars)

  return sunCore
}
