# Feature 12 — Polish & Performance
## Helios · PRD

---

| Field | Value |
|---|---|
| Feature | F12 — Polish & Performance |
| Depends on | F11 (all features complete) |
| Files touched | `App.tsx`, `README.md`, minor tweaks across codebase |

---

## 1. Goal

Visual polish, performance audit, loading screen, and README. The project should feel finished and load clean before deployment.

---

## 2. Deliverables

### Loading Screen
- `THREE.LoadingManager` tracking texture load progress
- React state `isLoading: boolean` drives a full-screen overlay
- Overlay shows progress bar, fades out when all textures ready
- Implemented in `App.tsx`

### Visual Polish
- Selected planet: faint white halo ring added on select, removed on deselect
  - `RingGeometry(planet.radius * 1.3, planet.radius * 1.5, 64)`
  - `MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3, side: THREE.DoubleSide })`
  - Ring faces camera each frame: `ring.quaternion.copy(camera.quaternion)`
- Orbit trail opacity tuned to `0.4` (confirm not too bright or too faint)
- HUD panels: consistent spacing, no layout shifts between selected/unselected states
- Planet nav active dot: clear ring indicator around active planet

### Performance
- `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))` enforced
- No `new THREE.Vector3()` inside animation loop — use `.set()` on pre-allocated refs
- `OrbitControls` damping confirmed enabled
- Confirm 60fps in Chrome DevTools performance tab

### `README.md`
- Project name and description
- Stack list
- Feature list
- Setup instructions (`npm install`, `npm run dev`)
- Texture download instructions (solarsystemscope.com link + filenames)
- Deploy instructions (GitHub → Vercel)

---

## 3. Done Criteria

- Loading screen appears and fades out cleanly
- Selected planet halo ring visible and camera-facing
- `npm run build` passes with zero TS errors and no warnings
- README complete and accurate
- No visible frame drops on mid-range hardware
