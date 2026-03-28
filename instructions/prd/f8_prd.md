# Feature 8 — Orbit Trail Lines
## Helios · PRD

---

| Field | Value |
|---|---|
| Feature | F8 — Orbit Trail Lines |
| Depends on | F3 (planet data), F4 (Kepler engine), F2 (scene) |
| Files touched | `src/renderer/orbitTrail.ts`, `App.tsx` |

---

## 1. Goal

Draw a static elliptical trail for each planet showing its full orbital path. Trails are fixed geometry — they don't animate. Planets move along them.

---

## 2. Deliverables

### `src/renderer/orbitTrail.ts`

- `createOrbitTrail(planet: PlanetData, scene: THREE.Scene): THREE.Line`
  - Samples 256 points across the full orbital period using `getPlanetPosition`
  - Connects points via `THREE.BufferGeometry` + `THREE.LineLoop`
  - Material: `LineBasicMaterial({ color: 0x334455, transparent: true, opacity: 0.4 })`
  - Adds to scene, returns line object

- `createAllOrbitTrails(planets: PlanetData[], scene: THREE.Scene): void`
  - Calls `createOrbitTrail` for each planet

### `App.tsx`
- Call `createAllOrbitTrails` once after scene init
- No per-frame updates needed — trails are static

---

## 3. Done Criteria

- All 8 elliptical orbits visible as faint lines
- Mercury and Mars trails are visibly elliptical (high eccentricity)
- Earth trail is nearly circular (low eccentricity)
- Trails are closed — no visible gap between start and end point
- No per-frame updates
- No TS errors
