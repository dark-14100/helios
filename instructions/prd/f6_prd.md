# Feature 6 — Planet Meshes + Textures
## Helios · PRD

---

| Field | Value |
|---|---|
| Feature | F6 — Planet Meshes + Textures |
| Depends on | F2 (scene), F3 (data), F5 (lights) |
| Files touched | `src/renderer/planetMesh.ts`, `App.tsx` |

---

## 1. Goal

Render all 8 planets as textured spheres at their t=0 Kepler positions. Saturn gets rings. Each planet has correct axial tilt applied. Planets are stored in a `Map` for access by the animation and camera systems in later features.

---

## 2. Deliverables

### `src/renderer/planetMesh.ts`

- `createPlanetMesh(planet: PlanetData, scene: THREE.Scene): THREE.Mesh`
  - `SphereGeometry(planet.radius, 32, 32)`
  - `MeshStandardMaterial` with texture loaded via `TextureLoader` — fallback to `color: planet.color` if texture fails
  - Axial tilt: `mesh.rotation.z = THREE.MathUtils.degToRad(planet.axialTilt)`
  - Adds mesh to scene, returns mesh

- Saturn rings (inside `createPlanetMesh` when `planet.hasRings === true`):
  - `RingGeometry(planet.radius * 1.4, planet.radius * 2.5, 64)`
  - `MeshBasicMaterial({ map: ringTexture, side: THREE.DoubleSide, transparent: true, opacity: 0.8 })`
  - `ring.rotation.x = Math.PI / 2`
  - Added as child: `mesh.add(ring)`

- `createAllPlanetMeshes(planets: PlanetData[], scene: THREE.Scene): Map<string, THREE.Mesh>`
  - Calls `createPlanetMesh` for each planet
  - Returns map keyed by `planet.name`

### `App.tsx`
- Call `createAllPlanetMeshes` after scene + sun init
- Position each mesh using `getPlanetPosition(planet, 0)` from Kepler engine
- Store `planetMeshes` as a ref (`useRef<Map<string, THREE.Mesh>>`)
- Remove placeholder sphere added in F2

---

## 3. Done Criteria

- All 8 planets visible with textures or fallback colors
- Saturn has rings
- Planets at correct relative distances and sizes
- Axial tilts applied — Uranus visibly on its side (~98°)
- Placeholder sphere from F2 removed
- `planetMeshes` ref available in App.tsx for F7
- No TS errors
