import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { useThreeScene } from '@/hooks/useThreeScene'
import { useAnimationLoop } from '@/hooks/useAnimationLoop'
import { createSun } from '@/renderer/sunGlow'
import { createAllPlanetMeshes, createMoonMeshes } from '@/renderer/planetMesh'
import { createAllOrbitTrails } from '@/renderer/orbitTrail'
import { initCameraController } from '@/renderer/cameraController'
import { HUD } from '@/ui/HUD'
import { Tooltip } from '@/ui/Tooltip'
import { planets } from '@/data/planets'
import { getPlanetPosition } from '@/simulation/keplerEngine'
import { getMoonPosition } from '@/simulation/moonEngine'
import { useSimStore } from '@/store/simStore'

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneObjects = useThreeScene(canvasRef)
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null)
  
  // Store rendering references internally
  const sunRef = useRef<THREE.Mesh | null>(null)
  const planetMeshesRef = useRef<Map<string, THREE.Mesh>>(new Map())
  const moonMeshesRef = useRef<Map<string, THREE.Mesh>>(new Map())
  const controllerRef = useRef<ReturnType<typeof initCameraController> | null>(null)

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

    // Feature 10: Initialize advanced raycasting camera target controls
    controllerRef.current = initCameraController(
      sceneObjects.camera,
      sceneObjects.renderer,
      sceneObjects.scene,
      meshes,
      (selectedName) => {
        useSimStore.getState().setSelectedPlanet(selectedName)
      }
    )

    return () => {
      if (controllerRef.current) {
        controllerRef.current.dispose()
      }
    }
  }, [sceneObjects])

  // Feature 10: Wire deeply into the central store to intercept GUI interactions cleanly
  useEffect(() => {
    return useSimStore.subscribe(
      (state, prevState) => {
        if (state.selectedPlanet !== prevState.selectedPlanet) {
          const name = state.selectedPlanet
          if (name && planetMeshesRef.current) {
            const mesh = planetMeshesRef.current.get(name)
            if (mesh) controllerRef.current?.setFocusTarget(mesh)
          } else {
            controllerRef.current?.setFocusTarget(null)
          }
        }
      }
    )
  }, [])

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
    
    // Feature 10: Process all tracking lerps securely every frame block
    if (controllerRef.current) {
      controllerRef.current.update()
    }
    
    // Feature 11: Process exact physical UI projection anchoring translations matching standard 60-FPS loop!
    const activeStatsNode = document.getElementById('stats-panel-anchor')
    if (activeStatsNode) {
      const selectedPlanet = useSimStore.getState().selectedPlanet
      let projected = false
      if (selectedPlanet) {
        const mesh = planetMeshesRef.current.get(selectedPlanet)
        if (mesh) {
          // Clone the active world coordinates vector to prevent physical shifting
          const pos = mesh.position.clone()
          // Map to Native Device Coordinates via Camera Frustum Projection!
          pos.project(sceneObjects.camera)
          
          // Absolute scale the coordinates back to pure CSS Pixels seamlessly without dropping frames
          const x = (pos.x *  0.5 + 0.5) * window.innerWidth
          const y = (pos.y * -0.5 + 0.5) * window.innerHeight
          
          activeStatsNode.style.transform = `translate(${x}px, ${y}px)`
          activeStatsNode.style.opacity = '1'
          projected = true
        }
      }
      if (!projected) {
        // Cleanly wipe when no target lock is achieved natively!
        activeStatsNode.style.transform = `translate(-999px, -999px)`
        activeStatsNode.style.opacity = '0'
      }
    }
    
    sceneObjects.renderer.render(sceneObjects.scene, sceneObjects.camera)
  })
  
  // Feature 11: Setup passive Raycaster tracking perfectly targeting the live dynamic coordinate array continuously.
  useEffect(() => {
    if (!sceneObjects) return
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
      raycaster.setFromCamera(mouse, sceneObjects.camera)
      const hits = raycaster.intersectObjects(Array.from(planetMeshesRef.current.values()), true)
      
      if (hits.length > 0) {
        let hitNode: THREE.Object3D | null = hits[0].object
        let matchName: string | null = null
        while (hitNode && !matchName) {
          for (const [name, mesh] of planetMeshesRef.current.entries()) {
             if (mesh === hitNode) matchName = name
          }
          hitNode = hitNode.parent
        }
        setHoveredPlanet(matchName)
      } else {
        setHoveredPlanet(null)
      }
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [sceneObjects])

  return (
    <>
      <HUD />
      <Tooltip hoveredPlanet={hoveredPlanet} />
      <canvas ref={canvasRef} className="w-full h-full" />
    </>
  )
}
