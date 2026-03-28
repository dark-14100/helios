# Feature 10 — Click to Focus Camera
## Helios · PRD

---

| Field | Value |
|---|---|
| Feature | F10 — Click to Focus Camera |
| Depends on | F7 (animation + store), F6 (planet meshes) |
| Files touched | `src/renderer/cameraController.ts`, `App.tsx` |

---

## 1. Goal

Click any planet to smoothly move the camera to it and track it as it orbits. Click empty space or press Escape to return to free orbit mode. The selected planet name is written to the Zustand store so the HUD can react.

---

## 2. Deliverables

### `src/renderer/cameraController.ts`

- `initCameraController(camera, renderer, scene, planetMeshes, onSelect)` sets up:
  - `OrbitControls` from `three/examples/jsm/controls/OrbitControls`
  - Click raycasting on renderer canvas
  - Returns `{ controls, setFocusTarget(mesh | null) }`

- Focus logic:
  - On click hit: `setFocusTarget(mesh)` — disables OrbitControls, starts lerping
  - Camera target offset from planet: `mesh.position + (0, radius*6, radius*12)`
  - Per frame: `camera.position.lerp(targetPosition, 0.05)`, `camera.lookAt(mesh.position)`
  - On unfocus: re-enables OrbitControls, clears target

- Escape key: calls `setFocusTarget(null)`
- Click on empty space (no raycast hit): calls `setFocusTarget(null)`

### `App.tsx`
- Init camera controller after meshes are ready
- Call `controller.update()` each frame (OrbitControls damping + lerp)
- `onSelect` callback: `useSimStore.getState().setSelectedPlanet(name)`
- Subscribe to `selectedPlanet` store changes — when PlanetNav sets it, camera reacts

---

## 3. Done Criteria

- Clicking Earth smoothly moves camera to Earth and tracks it
- Camera lerps smoothly — not instant snap
- Escape and empty-click return to free camera
- OrbitControls works normally when no planet focused
- `selectedPlanet` in store updates correctly on click
- No TS errors
