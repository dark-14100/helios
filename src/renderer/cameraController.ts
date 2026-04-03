import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export function initCameraController(
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  planetMeshes: Map<string, THREE.Mesh>,
  onSelect: (name: string | null) => void
) {
  // Phase 1: Initialize baseline OrbitControls for free-look modes
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  // Prevent scrolling beyond the bounds of Neptune/Kuiper belt
  controls.maxDistance = 300 // F12 zoom threshold limit 
  controls.minDistance = 3

  // Prepare required geometry detection tools
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()
  let focusTarget: THREE.Mesh | null = null

  // Bind mouse interaction precisely to the active WebGL canvas view coordinates
  const onClick = (event: MouseEvent) => {
    const rect = renderer.domElement.getBoundingClientRect()
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    raycaster.setFromCamera(mouse, camera)

    // Ensure we fully traverse down into the models (like checking Saturn's rings or the wireframes)
    const interactableObjects = Array.from(planetMeshes.values())
    const intersects = raycaster.intersectObjects(interactableObjects, true)

    if (intersects.length > 0) {
      let hitNode: THREE.Object3D | null = intersects[0].object
      
      // Traverse upwards bridging the gap if the raycaster hit a child (like the physical wireframe or structural ring)
      let selectedName: string | null = null
      while (hitNode && !selectedName) {
        for (const [name, planetMesh] of planetMeshes.entries()) {
          if (planetMesh === hitNode) {
            selectedName = name
            break
          }
        }
        hitNode = hitNode.parent
      }
      
      // Bubble strictly out to Zustand subscription loop so React layers can react to 3D clicks seamlessly
      if (selectedName) {
        onSelect(selectedName)
      }
    } else {
      // Cleanly trigger empty-click misses
      onSelect(null)
    }
  }

  renderer.domElement.addEventListener('click', onClick)

  // Phase 3: Equip hardware keyboard un-toggle hook
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') onSelect(null)
  }
  window.addEventListener('keydown', onKeyDown)

  return {
    controls,
    setFocusTarget: (mesh: THREE.Mesh | null) => {
      focusTarget = mesh
      if (mesh) {
        controls.enabled = false
      } else {
        controls.enabled = true
      }
    },
    update: () => {
      if (focusTarget) {
        // Extract native mathematical geometry radii boundaries directly
        const geom = focusTarget.geometry as THREE.SphereGeometry
        const r = geom.parameters.radius
        
        // Target dynamic offset smoothly trailing the locked planet natively: (0, r*6, r*12)
        const targetPos = focusTarget.position.clone().add(new THREE.Vector3(0, r * 6, r * 12))
        
        // Execute smooth lerping engine directly to offset coordinate
        camera.position.lerp(targetPos, 0.05)
        camera.lookAt(focusTarget.position)
      } else {
        // Fallback consistently cleanly onto OrbitControls loop physics when entirely detached
        controls.update()
      }
    },
    dispose: () => {
      renderer.domElement.removeEventListener('click', onClick)
      window.removeEventListener('keydown', onKeyDown)
      controls.dispose()
    }
  }
}
