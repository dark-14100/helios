# Feature 7 — Orbital Animation
## Helios · PRD

---

| Field | Value |
|---|---|
| Feature | F7 — Orbital Animation |
| Depends on | F4 (Kepler engine), F6 (planet meshes) |
| Files touched | `src/store/simStore.ts`, `App.tsx` |

---

## 1. Goal

Planets move. The Zustand store drives a simulation clock (`elapsedDays`) that increments each frame based on `simSpeed` and real delta time. Every planet's position is recomputed from the Kepler engine each frame and applied to its mesh.

---

## 2. Deliverables

### `src/store/simStore.ts`

```ts
interface SimStore {
  elapsedDays: number
  simSpeed: number
  isPaused: boolean
  selectedPlanet: string | null
  setSimSpeed: (s: number) => void
  setIsPaused: (p: boolean) => void
  setSelectedPlanet: (name: string | null) => void
  tick: (delta: number) => void
}
```

- Default `simSpeed`: `10` (10 sim days per real second)
- Default `elapsedDays`: `0`
- `tick(delta)`: if not paused, `elapsedDays += delta * simSpeed`

### `App.tsx`
- Call `useSimStore.getState().tick(delta)` inside animation loop each frame
- Each frame: loop through `planetMeshes`, call `getPlanetPosition(planet, elapsedDays)`, apply to `mesh.position`
- Planet self-rotation: `mesh.rotation.y += delta * 0.2`

---

## 3. Done Criteria

- All planets orbit continuously and visibly
- Mercury clearly faster than Jupiter
- Setting `isPaused = true` freezes all motion
- `simSpeed = 0` also freezes motion
- No TS errors
