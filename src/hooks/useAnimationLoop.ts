import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function useAnimationLoop(callback: (delta: number) => void) {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    const clock = new THREE.Clock()
    let rafId: number

    const loop = () => {
      rafId = requestAnimationFrame(loop)
      callbackRef.current(clock.getDelta())
    }
    loop()
    return () => cancelAnimationFrame(rafId)
  }, [])
}
