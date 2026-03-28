import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useThreeScene } from '@/hooks/useThreeScene'
import { useAnimationLoop } from '@/hooks/useAnimationLoop'
import { createSun } from '@/renderer/sunGlow'
import { createAllPlanetMeshes } from '@/renderer/planetMesh'
import { planets } from '@/data/planets'
import { getPlanetPosition } from '@/simulation/keplerEngine'

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneObjects = useThreeScene(canvasRef)
  
  // Store rendering references internally
  const sunRef = useRef<THREE.Mesh | null>(null)
  const planetMeshesRef = useRef<Map<string, THREE.Mesh>>(new Map())

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
  }, [sceneObjects])

  useAnimationLoop(() => {
    if (!sceneObjects) return
    
    // Gentle Sun Pulse Algorithm
    if (sunRef.current) {
      const t = performance.now() * 0.001
      sunRef.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.02)
    }
    
    sceneObjects.renderer.render(sceneObjects.scene, sceneObjects.camera)
  })

  return <canvas ref={canvasRef} className="w-full h-full" />
}
