import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useThreeScene } from '@/hooks/useThreeScene'
import { useAnimationLoop } from '@/hooks/useAnimationLoop'
import { createSun } from '@/renderer/sunGlow'

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneObjects = useThreeScene(canvasRef)
  const sphereRef = useRef<THREE.Mesh | null>(null)
  const sunRef = useRef<THREE.Mesh | null>(null)

  useEffect(() => {
    if (!sceneObjects) return
    
    // Test planet sphere - switched to StandardMaterial to test lighting
    const geo = new THREE.SphereGeometry(2, 32, 32)
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff })
    const sphere = new THREE.Mesh(geo, mat)
    sphere.position.set(20, 0, 0)
    sceneObjects.scene.add(sphere)
    sphereRef.current = sphere

    // Initialize the environment (Sun, Lights, Starfield)
    sunRef.current = createSun(sceneObjects.scene)
  }, [sceneObjects])

  useAnimationLoop((delta) => {
    if (!sceneObjects) return
    
    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.5
    }
    
    // Gentle Sun Pulse
    if (sunRef.current) {
      const t = performance.now() * 0.001
      sunRef.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.02)
    }
    
    sceneObjects.renderer.render(sceneObjects.scene, sceneObjects.camera)
  })

  return <canvas ref={canvasRef} className="w-full h-full" />
}
