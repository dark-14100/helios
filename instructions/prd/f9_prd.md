# Feature 9 — Moon System
## Helios · PRD

---

| Field | Value |
|---|---|
| Feature | F9 — Moon System |
| Depends on | F7 (animation loop + store), F6 (planet meshes) |
| Files touched | `src/simulation/moonEngine.ts`, `src/renderer/planetMesh.ts`, `App.tsx` |

---

## 1. Goal

Major moons orbit their parent planets using simplified circular orbits. Moon positions update every frame relative to their parent planet's current position in the scene.

---

## 2. Deliverables

### `src/simulation/moonEngine.ts`

```ts
export function getMoonPosition(
  moon: MoonData,
  elapsedDays: number,
  parentPosition: { x: number; y: number; z: number }
): { x: number; y: number; z: number }
```

- Circular orbit: `angle = (2π / moon.orbitPeriod) * elapsedDays`
- `x = parentPosition.x + moon.orbitRadius * cos(angle)`
- `z = parentPosition.z + moon.orbitRadius * sin(angle)`
- `y = parentPosition.y`

### Moon Meshes (added to `planetMesh.ts`)

- `createMoonMeshes(planet: PlanetData, scene: THREE.Scene): Map<string, THREE.Mesh>`
  - For each moon in `planet.moons`: `SphereGeometry(moon.radius, 16, 16)`
  - Texture: `/textures/moon.jpg`, fallback `0x888888`
  - Returns map keyed by moon name

### `App.tsx`
- Call `createMoonMeshes` for all planets, store results in a single `moonMeshes: Map<string, THREE.Mesh>` ref
- Each frame: for each moon, call `getMoonPosition` using the parent planet's current `mesh.position`, set moon `mesh.position`
- Respect `isPaused` — moons freeze when simulation is paused

---

## 3. Moon Data Reference

| Moon | Parent | Radius (scene) | Orbit radius (scene) | Period (days) |
|---|---|---|---|---|
| Luna | Earth | 0.27 | 3.5 | 27.3 |
| Phobos | Mars | 0.08 | 2.0 | 0.32 |
| Deimos | Mars | 0.06 | 2.8 | 1.26 |
| Io | Jupiter | 0.26 | 6.0 | 1.77 |
| Europa | Jupiter | 0.22 | 8.0 | 3.55 |
| Ganymede | Jupiter | 0.37 | 10.5 | 7.15 |
| Callisto | Jupiter | 0.34 | 14.0 | 16.69 |
| Titan | Saturn | 0.36 | 8.0 | 15.95 |
| Enceladus | Saturn | 0.08 | 5.5 | 1.37 |
| Titania | Uranus | 0.22 | 6.0 | 8.71 |
| Oberon | Uranus | 0.21 | 8.0 | 13.46 |
| Triton | Neptune | 0.19 | 5.5 | 5.88 |

---

## 4. Done Criteria

- All 12 moons rendering and orbiting their parent planets
- Moons freeze when `isPaused = true`
- Moon sizes clearly smaller than parent planets
- Galilean moons orbit Jupiter at visibly different speeds
- No z-fighting with parent planet
- No TS errors
