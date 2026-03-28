# Feature 11 — HUD & Stats Panel
## Helios · PRD

---

| Field | Value |
|---|---|
| Feature | F11 — HUD & Stats Panel |
| Depends on | F7 (store), F10 (selectedPlanet in store) |
| Files touched | `HUD.tsx`, `StatsPanel.tsx`, `SpeedControl.tsx`, `PlanetNav.tsx`, `Tooltip.tsx`, `App.tsx` |

---

## 1. Goal

Full React HUD overlay on top of the Three.js canvas. Stats update live as planets orbit. Speed control adjusts simulation speed. Planet nav dots let you select any planet. Tooltip shows planet name on hover.

---

## 2. Component Breakdown

### `HUD.tsx`
- Root overlay: `position: fixed, inset: 0, pointer-events: none`
- Assembles `<SpeedControl />`, `<StatsPanel />`, `<PlanetNav />`, `<Tooltip />`
- Interactive children get `pointer-events: auto` individually

### `StatsPanel.tsx`
- Position: top-right
- Visible only when `selectedPlanet !== null`
- Reads `selectedPlanet` and `elapsedDays` from store
- Computes live distance: `getPlanetPosition(planet, elapsedDays)` → distance in AU and km
- Shows: name, distance (AU + km), orbital period, orbital speed (km/s), moon list
- Shows graceful empty state when no planet selected

### `SpeedControl.tsx`
- Position: top-left
- Pause/play toggle button
- Logarithmic speed slider: 0.1× to 1000×
- Displays current speed label

### `PlanetNav.tsx`
- Position: bottom-center
- One dot per planet, coloured by planet's fallback `color` hex
- Click → `setSelectedPlanet(name)` in store
- Active dot has a visible ring indicator
- Planet name label below each dot

### `Tooltip.tsx`
- Follows mouse position (absolute, offset from cursor)
- Shows hovered planet name
- Hidden when `hoveredPlanet === null`
- Receives `hoveredPlanet: string | null` as prop

---

## 3. Styling

- Font: `'Share Tech Mono', monospace` — add Google Fonts link to `index.html`
- Panel background: `rgba(0, 5, 20, 0.8)` + `backdrop-filter: blur(8px)`
- Border: `1px solid rgba(0, 255, 231, 0.2)`
- Value color: `#00ffe7`
- Label color: `rgba(255, 255, 255, 0.5)`

---

## 4. Live Distance Calculation

```ts
const pos = getPlanetPosition(planet, elapsedDays)
const distanceSceneUnits = Math.sqrt(pos.x ** 2 + pos.z ** 2)
const distanceAU = distanceSceneUnits / 40   // AU_SCALE = 40
const distanceKm = distanceAU * 149_597_870
```

---

## 5. Done Criteria

- StatsPanel updates live as planet moves
- Speed slider changes sim speed across full range
- Pause button works
- Planet nav dots focus camera via store
- Tooltip appears on hover
- HUD does not block Three.js mouse events
- No TS errors
