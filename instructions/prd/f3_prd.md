# Feature 3 — Planet & Moon Data
## Helios · PRD

---

| Field | Value |
|---|---|
| Feature | F3 — Planet & Moon Data |
| Depends on | F1 (scaffold) |
| Files touched | `src/data/planets.ts` |

---

## 1. Goal

Define all hardcoded planet and moon data with full TypeScript types. This is the single source of truth for every orbital parameter, visual property, and texture path used throughout the project. No Three.js, no rendering — pure data and types.

---

## 2. TypeScript Interfaces

```ts
interface MoonData {
  name: string
  radius: number          // scene units
  orbitRadius: number     // scene units from parent planet
  orbitPeriod: number     // days
  texturePath: string
}

interface PlanetData {
  name: string
  radius: number          // scene units (exaggerated for visibility)
  semiMajorAxis: number   // scene units (log-scaled from AU)
  eccentricity: number
  orbitalPeriod: number   // days
  axialTilt: number       // degrees
  texturePath: string
  color: number           // fallback hex if texture missing
  moons: MoonData[]
  hasRings?: boolean
  ringTexturePath?: string
}
```

---

## 3. Scale Constants

```ts
export const AU_SCALE = 40          // 1 AU = 40 scene units (log-adjusted per planet)
export const RADIUS_SCALE = 0.001   // real km → scene units for planets
export const MOON_ORBIT_SCALE = 8   // multiplier for moon orbit radii (visibility)
```

Orbital distances are NOT strictly `semiMajorAxis * AU_SCALE` — they are manually tuned per planet so inner planets aren't crushed together. Values specified in planet data below.

---

## 4. Planet Data (all 8)

| Planet | `semiMajorAxis` (scene) | `radius` (scene) | `eccentricity` | `orbitalPeriod` (days) | `axialTilt` |
|---|---|---|---|---|---|
| Mercury | 8 | 0.4 | 0.205 | 87.97 | 0.03 |
| Venus | 14 | 0.9 | 0.007 | 224.70 | 177.4 |
| Earth | 20 | 1.0 | 0.017 | 365.25 | 23.5 |
| Mars | 28 | 0.55 | 0.093 | 686.97 | 25.2 |
| Jupiter | 44 | 3.5 | 0.049 | 4332.59 | 3.1 |
| Saturn | 62 | 2.9 | 0.057 | 10759.22 | 26.7 |
| Uranus | 78 | 1.8 | 0.046 | 30688.50 | 97.8 |
| Neptune | 92 | 1.7 | 0.010 | 60182.00 | 28.3 |

---

## 5. Moons Included

- **Earth:** Luna
- **Mars:** Phobos, Deimos
- **Jupiter:** Io, Europa, Ganymede, Callisto
- **Saturn:** Titan, Enceladus
- **Uranus:** Titania, Oberon
- **Neptune:** Triton

---

## 6. Done Criteria

- `planets.ts` imports cleanly with no TS errors
- All 8 planets defined with correct types
- All 12 moons defined under their parent planet
- Scale constants exported
- No Three.js imports in this file
