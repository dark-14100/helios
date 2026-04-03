import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useThreeScene } from '@/hooks/useThreeScene'
import { useAnimationLoop } from '@/hooks/useAnimationLoop'
import { createSun } from '@/renderer/sunGlow'
import { createAllPlanetMeshes, createMoonMeshes } from '@/renderer/planetMesh'
import { createAllOrbitTrails } from '@/renderer/orbitTrail'
import { planets } from '@/data/planets'
import { getPlanetPosition } from '@/simulation/keplerEngine'
import { getMoonPosition } from '@/simulation/moonEngine'
import { useSimStore } from '@/store/simStore'

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneObjects = useThreeScene(canvasRef)
  
  // Store rendering references internally
  const sunRef = useRef<THREE.Mesh | null>(null)
  const planetMeshesRef = useRef<Map<string, THREE.Mesh>>(new Map())
  const moonMeshesRef = useRef<Map<string, THREE.Mesh>>(new Map())

  useEffect(() => {
    if (!sceneObjects) return

    // Initialize Deep Space Environment (Sun, Lights, Starfield)
    sunRef.current = createSun(sceneObjects.scene)

    // Generate and inject all 8 solid planet bodies with textures + rings
    const meshes = createAllPlanetMeshes(planets, sceneObjects.scene)
    planetMeshesRef.current = meshes

    // Position each mesh statically natively scaled to its exact Kepler coordinates at t=0
    planets.forEach((planet) => {
      const mesh = meshes.get(planet.name)
      if (mesh) {
        const coords = getPlanetPosition(planet, 0)
        mesh.position.set(coords.x, coords.y, coords.z)
      }
    })
    
    // Feature 8: Draw static orbital trails permanently into the space environment
    createAllOrbitTrails(planets, sceneObjects.scene)

    // Feature 9: Init all moon meshes and store them collectively in the active registry
    const localMoonMap = new Map<string, THREE.Mesh>()
    planets.forEach((planet) => {
      const generatedMoons = createMoonMeshes(planet, sceneObjects.scene)
      generatedMoons.forEach((moonMesh, moonName) => localMoonMap.set(moonName, moonMesh))
    })
    moonMeshesRef.current = localMoonMap
  }, [sceneObjects])

  useAnimationLoop((delta) => {
    if (!sceneObjects) return
    
    // Command the physics simulation clock to stride forward
    useSimStore.getState().tick(delta)
    
    // Grab the new clock time and update positions for all planetary array meshes
    const currentDays = useSimStore.getState().elapsedDays
    const isPaused = useSimStore.getState().isPaused
    
    planets.forEach((planet) => {
      const mesh = planetMeshesRef.current.get(planet.name)
      if (mesh) {
        const coords = getPlanetPosition(planet, currentDays)
        mesh.position.set(coords.x, coords.y, coords.z)
        
        // Halt spin geometry processing intelligently if exactly paused
        if (!isPaused) {
          // Spin the physical body around its own localized Y-axis
          mesh.rotation.y += delta * 0.2
          
          // Phase 4: Spin up child satellite loop mapping directly attached tracking coordinates
          planet.moons.forEach((moon) => {
            const moonMesh = moonMeshesRef.current.get(moon.name)
            if (moonMesh) {
              const moonCoords = getMoonPosition(moon, currentDays, coords)
              moonMesh.position.set(moonCoords.x, moonCoords.y, moonCoords.z)
            }
          })
        }
      }
    })
    
    // Gentle Sun Pulse Algorithm
    if (sunRef.current) {
      const t = performance.now() * 0.001
      sunRef.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.02)
    }
    
    sceneObjects.renderer.render(sceneObjects.scene, sceneObjects.camera)
  })

  return <canvas ref={canvasRef} className="w-full h-full" />
}
