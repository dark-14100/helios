# Feature 4 — Kepler Engine
## Helios · PRD

---

| Field | Value |
|---|---|
| Feature | F4 — Kepler Engine |
| Depends on | F3 (planet data + types) |
| Files touched | `src/simulation/keplerEngine.ts` |

---

## 1. Goal

Implement a pure TypeScript orbital mechanics solver. Given a planet's orbital parameters and elapsed time in days, return its (x, z) position in scene units. This is the mathematical core of the entire simulation — no Three.js, no React, fully testable pure functions.

---

## 2. Algorithm — Kepler's Equation

### Step 1 — Mean Anomaly
```
M = (2π / T) × t
```
Where `T` = orbital period in days, `t` = elapsed days.

### Step 2 — Eccentric Anomaly (Newton-Raphson)
Solve `E - e×sin(E) = M` iteratively:
```
E₀ = M
Eₙ₊₁ = Eₙ - (Eₙ - e×sin(Eₙ) - M) / (1 - e×cos(Eₙ))
```
Iterate until `|Eₙ₊₁ - Eₙ| < 1e-6`. Max 100 iterations.

### Step 3 — True Anomaly
```
ν = 2 × atan2(√(1+e) × sin(E/2), √(1-e) × cos(E/2))
```

### Step 4 — Heliocentric Distance
```
r = a × (1 - e×cos(E))
```
Where `a` = `semiMajorAxis` in scene units.

### Step 5 — Cartesian Position
```
x = r × cos(ν)
z = r × sin(ν)
y = 0  (all orbits in ecliptic plane for now)
```

---

## 3. Exports

```ts
export function solveEccentricAnomaly(M: number, e: number): number
export function getPlanetPosition(planet: PlanetData, elapsedDays: number): { x: number, y: number, z: number }
```

---

## 4. Validation

Earth at `t = 0`: position ≈ `{ x: 20, y: 0, z: 0 }` (semiMajorAxis = 20)
Earth at `t = 182.6` days: x should be roughly `-20` (half orbit)
Mercury moves ~4× faster than Earth visually.

---

## 5. Done Criteria

- `getPlanetPosition(earth, 0)` returns `{ x: ~20, y: 0, z: ~0 }`
- `getPlanetPosition(earth, 365.25)` returns approximately same position as t=0 (full orbit)
- Newton-Raphson converges within 10 iterations for all planet eccentricities
- No Three.js imports
- No TS errors
