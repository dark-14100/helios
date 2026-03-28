# Feature 2 — Three.js Scene Foundation
## Helios · PRD

---

| Field | Value |
|---|---|
| Feature | F2 — Three.js Scene Foundation |
| Depends on | F1 (scaffold complete) |
| Files touched | `sceneSetup.ts`, `useThreeScene.ts`, `useAnimationLoop.ts`, `App.tsx` |

---

## 1. Goal

Wire up a working Three.js scene with a camera, renderer, and animation loop. A single white placeholder sphere renders at origin to confirm the pipeline works end-to-end. No planets, no textures, no data yet.

---

## 2. Deliverables

### `src/renderer/sceneSetup.ts`
- Creates and returns `THREE.Scene`, `THREE.PerspectiveCamera`, `THREE.WebGLRenderer`
- Renderer: `antialias: true`, `alpha: false`, background color `0x000000`
- Camera: FOV 60, near 0.1, far 2000, initial position `(0, 60, 120)`
- Exports: `initScene(canvas: HTMLCanvasElement) → { scene, camera, renderer }`

### `src/hooks/useThreeScene.ts`
- React hook — takes a `canvasRef`, calls `initScene`, returns `{ scene, camera, renderer }`
- Handles renderer resize on `window resize` event
- Cleans up renderer on unmount (`renderer.dispose()`)

### `src/hooks/useAnimationLoop.ts`
- React hook — takes a callback `(delta: number) => void`
- Runs `requestAnimationFrame` loop, computes delta via `THREE.Clock`
- Starts on mount, cancels on unmount
- Exports: `useAnimationLoop(callback)`

### `App.tsx` (updated)
- Mounts a `<canvas>` ref filling the full screen
- Uses `useThreeScene` to init scene
- Uses `useAnimationLoop` to rotate placeholder sphere each frame
- Placeholder: white `SphereGeometry(2, 32, 32)` with `MeshBasicMaterial` at origin

---

## 3. Done Criteria

- Sphere visible and rotating on canvas
- Window resize updates camera aspect + renderer size correctly
- No memory leaks — cleanup runs on unmount
- No TS errors
