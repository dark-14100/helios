import { useEffect, useRef, useState } from 'react'
import { initScene, SceneObjects } from '@/renderer/sceneSetup'

export function useThreeScene(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const [sceneObjects, setSceneObjects] = useState<SceneObjects | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const objects = initScene(canvasRef.current)
    setSceneObjects(objects)

    const handleResize = () => {
      const { camera, renderer } = objects
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      objects.renderer.dispose()
    }
  }, [])

  return sceneObjects
}
