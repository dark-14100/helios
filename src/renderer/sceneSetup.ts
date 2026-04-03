import * as THREE from 'three'

export interface SceneObjects {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
}

export function initScene(canvas: HTMLCanvasElement): SceneObjects {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 2000)
  camera.position.set(0, 60, 120)
  camera.lookAt(0, 0, 0)
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  // Feature 12: Enforce stringent WebGL pixel ceilings natively protecting thermal outputs on 4K/retina systems
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(canvas.clientWidth, canvas.clientHeight)
  renderer.setClearColor(0x000000)
  return { scene, camera, renderer }
}
