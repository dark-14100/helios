# Helios — Feature Breakdown

All features are ordered by dependency. Each feature is a self-contained implementation chunk that builds on the previous.

---

## Feature 1 — Project Scaffold
**What:** Vite + React + TypeScript + Tailwind + Zustand boilerplate. Three.js installed. Basic canvas mounted. Nothing renders yet except a black screen.

**Deliverables:**
- `package.json` with all deps
- `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`
- `App.tsx` mounting a `<canvas>` ref
- `main.tsx` entry point
- Empty placeholder files for all modules in `src/`
- Vercel `vercel.json` config (static, no build overrides needed)

**Done when:** `npm run dev` starts, black canvas renders, no TS errors.

---

## Feature 2 — Three.js Scene Foundation
**What:** Scene, camera, renderer, and animation loop wired up. A single placeholder sphere at origin to confirm rendering works.

**Deliverables:**
- `sceneSetup.ts` — WebGLRenderer, PerspectiveCamera, scene init
- `useThreeScene.ts` — hook that attaches renderer to canvas ref
- `useAnimationLoop.ts` — requestAnimationFrame loop hook
- White sphere at origin as placeholder

**Done when:** Sphere renders on canvas, rotates each frame, camera responds to window resize.

---

## Feature 3 — Planet & Moon Data
**What:** Full hardcoded data file for all 8 planets and their major moons. Types defined.

**Deliverables:**
- `src/data/planets.ts` — typed `PlanetData[]` and `MoonData[]` arrays with orbital params, radii, texture paths, colors
- TypeScript interfaces: `PlanetData`, `MoonData`
- Visual scale constants (orbital distance scale factor, radius scale factor)

**Done when:** Data imports cleanly with no TS errors, all 8 planets + 10 moons defined.

---

## Feature 4 — Kepler Engine
**What:** The orbital mechanics solver. Given a planet's parameters and elapsed time, returns its (x, z) position in scene units.

**Deliverables:**
- `keplerEngine.ts`
  - `solveEccentricAnomaly(M, e)` — Newton-Raphson solver
  - `getPlanetPosition(planet, elapsedDays)` → `{x, z}`
- Unit-testable pure functions, no Three.js dependency
- Verified output: Earth at t=0 at (1 AU, 0), at t=182.6 days roughly at (-1 AU, 0)

**Done when:** Console logging positions for Earth over 365 days traces a correct ellipse.

---

## Feature 5 — Sun + Starfield
**What:** Sun mesh at origin with glow, point light, and background starfield.

**Deliverables:**
- `sunGlow.ts` — Sun sphere with emissive material + larger transparent halo mesh
- PointLight at origin for planet illumination
- AmbientLight (dim, so dark sides of planets are not fully black)
- Starfield: 10,000 random points via BufferGeometry
- Sun texture mapped if available, else emissive yellow

**Done when:** Sun glows at origin, stars fill background, scene feels like space.

---

## Feature 6 — Planet Meshes + Textures
**What:** All 8 planets rendered as textured spheres at their correct scaled positions. Saturn has rings.

**Deliverables:**
- `planetMesh.ts` — factory function `createPlanetMesh(planet)` → `THREE.Mesh`
- Textures loaded via `THREE.TextureLoader` from `/public/textures/`
- Saturn: `RingGeometry` with ring texture, double-sided, correct tilt
- Axial tilt applied per planet
- Planets positioned using Kepler engine at t=0

**Done when:** All 8 planets visible, textured, correctly sized relative to each other.

---

## Feature 7 — Orbital Animation
**What:** Planets move along their real Keplerian elliptical orbits over time. Simulation clock drives everything.

**Deliverables:**
- `simStore.ts` — Zustand store with `elapsedDays`, `simSpeed`, `isPaused`
- Animation loop updates `elapsedDays` each frame based on `simSpeed` and real `delta` time
- Each planet's position recomputed from Kepler engine every frame
- Planets visibly orbit at correct relative speeds (Mercury laps others, Neptune barely moves)

**Done when:** All planets orbit continuously, Mercury clearly faster than Jupiter, pausing stops all motion.

---

## Feature 8 — Orbit Trail Lines
**What:** Elliptical trail lines showing the full orbital path for each planet.

**Deliverables:**
- `orbitTrail.ts` — generates a closed ellipse curve from orbital params → `THREE.Line`
- Trails rendered in dim colour matching the planet (or neutral white/grey)
- Trails stay static (they don't animate — the planet moves along them)
- Toggle-able via store (default: on)

**Done when:** All 8 orbit paths visible as faint ellipses, planet moves along them correctly.

---

## Feature 9 — Moon System
**What:** Major moons orbit their parent planets using simplified circular orbits.

**Deliverables:**
- `moonEngine.ts` — `getMoonPosition(moon, elapsedDays, parentPosition)` → `{x, y, z}`
- Moon meshes created similarly to planets (smaller spheres, moon texture or grey)
- Moons parented to planet position in scene (not using Three.js parent-child, explicit position update)
- All 10 moons: Luna, Phobos, Deimos, Io, Europa, Ganymede, Callisto, Titan, Enceladus, Triton (+ Titania, Oberon for Uranus)

**Done when:** Luna visibly orbits Earth, Galilean moons orbit Jupiter, moons scale correctly.

---

## Feature 10 — Click to Focus Camera
**What:** Click any planet or moon to smoothly move the camera to it and track it as it orbits.

**Deliverables:**
- `cameraController.ts` — raycasting on click, lerp camera to focus offset, track target each frame
- OrbitControls disabled while tracking, re-enabled on unfocus
- Unfocus: click empty space or press Escape
- `selectedPlanet` updated in Zustand store on click
- Visual indicator: faint ring/halo around selected planet

**Done when:** Clicking Earth smoothly moves camera to Earth and tracks it through its orbit.

---

## Feature 11 — HUD & Stats Panel
**What:** Full React UI overlay — planet stats, speed control, planet nav dots, tooltip on hover.

**Deliverables:**
- `HUD.tsx` — root overlay, absolute positioned over canvas
- `StatsPanel.tsx` — selected planet card: name, distance from Sun (AU + km), orbital period, current velocity estimate, moon list
- `SpeedControl.tsx` — slider (0.1× to 100×, logarithmic) + pause/play button
- `PlanetNav.tsx` — bottom row of clickable planet dots (coloured, labelled)
- `Tooltip.tsx` — planet name appears on hover via raycasting
- Fonts: Google Fonts `Share Tech Mono` or similar sci-fi mono

**Done when:** Full HUD visible, stats update live as planet moves, speed control works, nav dots focus planets.

---

## Feature 12 — Polish & Performance
**What:** Visual polish pass + performance audit before deploy.

**Deliverables:**
- Texture compression check (2K max, JPG not PNG where possible)
- Loading screen while textures load (`THREE.LoadingManager`)
- Smooth camera damping tuned
- Planet hover cursor change (`cursor: pointer`)
- Sun bloom / glow tuned
- FPS check on mid-range hardware target (60fps)
- README written with project description, stack, setup instructions, and screenshots

**Done when:** Project feels polished, loads fast, no jank, README complete.

---

## Feature 13 — Vercel Deployment
**What:** Live public URL on Vercel.

**Deliverables:**
- GitHub repo created, code pushed
- Vercel project linked to repo
- `vercel.json` confirmed correct
- Build passes (`npm run build` outputs to `dist/`)
- Public URL tested — textures load, simulation runs, no console errors

**Done when:** Shareable Vercel URL loads the full simulation in browser.

---

## Implementation Order

```
F1 Scaffold
└── F2 Scene Foundation
    └── F3 Planet Data
        ├── F4 Kepler Engine
        │   └── F7 Orbital Animation
        │       ├── F8 Orbit Trails
        │       └── F9 Moon System
        └── F5 Sun + Starfield
            └── F6 Planet Meshes
                └── F10 Focus Camera
                    └── F11 HUD & Stats
                        └── F12 Polish
                            └── F13 Deploy
```

---

## Total Features: 13
**Estimated implementation sessions:** 1–2 features per session depending on complexity. F4 (Kepler) and F10 (Camera) are the hardest. F1–F3 are fast. F11 (HUD) is the most React-heavy.
