import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useThreeScene } from '@/hooks/useThreeScene'
import { useAnimationLoop } from '@/hooks/useAnimationLoop'

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneObjects = useThreeScene(canvasRef)
  const sphereRef = useRef<THREE.Mesh | null>(null)

  useEffect(() => {
    if (!sceneObjects) return
    const geo = new THREE.SphereGeometry(2, 32, 32)
    const mat = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const sphere = new THREE.Mesh(geo, mat)
    sceneObjects.scene.add(sphere)
    sphereRef.current = sphere
  }, [sceneObjects])

  useAnimationLoop((delta) => {
    if (!sceneObjects || !sphereRef.current) return
    sphereRef.current.rotation.y += delta * 0.5
    sceneObjects.renderer.render(sceneObjects.scene, sceneObjects.camera)
  })

  return <canvas ref={canvasRef} className="w-full h-full" />
}
