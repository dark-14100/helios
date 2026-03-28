# Product Requirements Document
## Helios — 3D Solar System Simulator

---

| Field | Value |
|---|---|
| Project | Helios — 3D Solar System Simulator |
| Stack | React · Three.js · TypeScript · Zustand · Vite |
| Goal | Portfolio piece + Three.js learning project |
| Deployment | Vercel (free tier) |
| Repo structure | Monorepo, single Vite app |

---

## 1. Overview

Helios is a real-time, browser-based 3D solar system simulation. All 8 planets orbit the Sun on physically accurate elliptical paths computed using Kepler's laws. Each planet carries a NASA texture map. Users can click any body to focus the camera on it, inspect live orbital stats, control simulation speed, and explore major moons. The project is designed to be visually impressive as a portfolio piece while being an honest learning exercise in Three.js, orbital mechanics, and React/Three.js integration patterns.

---

## 2. Goals

- Render all 8 planets + major moons in 3D with real NASA textures
- Accurate elliptical orbits via Kepler's equation — not circular approximations
- Smooth camera system — drag, zoom, and focus-on-click
- Live HUD showing real orbital data (distance in AU, period, velocity)
- Simulation speed control — pause, slow, fast-forward
- Orbit trail lines for all planets
- Deploy to Vercel, publicly shareable URL
- Clean codebase readable enough to explain in a portfolio walkthrough

---

## 3. Out of Scope (for now)

- Asteroid belt
- Spacecraft trajectories
- Real-time data from NASA APIs
- Mobile touch gestures (nice to have later)
- Sound / music

---

## 4. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Renderer | Three.js (r155+) | Industry standard for browser 3D |
| Framework | React 18 | UI layer — stats, controls, overlays |
| Language | TypeScript | Type safety across sim engine + renderer |
| State | Zustand | Lightweight, no boilerplate |
| Build | Vite | Fast HMR, clean asset handling |
| Textures | NASA Solar System Exploration (public domain) | Free, high quality |
| Deployment | Vercel | Free, Git-push deploy |
| Styling | Tailwind CSS | Utility-first, fast to build HUD with |

---

## 5. Planet & Moon Data

All data hardcoded in `src/data/planets.ts`.

### Planets

| Planet | Semi-major axis (AU) | Period (days) | Eccentricity | Moons included |
|---|---|---|---|---|
| Mercury | 0.387 | 87.97 | 0.205 | — |
| Venus | 0.723 | 224.70 | 0.007 | — |
| Earth | 1.000 | 365.25 | 0.017 | Luna |
| Mars | 1.524 | 686.97 | 0.093 | Phobos, Deimos |
| Jupiter | 5.203 | 4332.59 | 0.049 | Io, Europa, Ganymede, Callisto |
| Saturn | 9.537 | 10759.22 | 0.057 | Titan, Enceladus |
| Uranus | 19.191 | 30688.50 | 0.046 | Titania, Oberon |
| Neptune | 30.069 | 60182.00 | 0.010 | Triton |

### Visual Scale

Orbital distances are scaled logarithmically for visual clarity — true scale makes inner planets invisible. Planet radii are scaled independently (exaggerated) so they're visible and clickable.

---

## 6. Core Systems

### 6.1 Kepler Engine
Computes each planet's (x, z) position in 3D space per frame using:
- Mean anomaly → Eccentric anomaly (Newton-Raphson iteration)
- Eccentric anomaly → True anomaly
- True anomaly + semi-major axis + eccentricity → Cartesian position

### 6.2 Scene
- Three.js WebGLRenderer, PerspectiveCamera
- Sun at origin with PointLight + bloom-like halo mesh
- Stars: BufferGeometry points (~10,000)
- Each planet: SphereGeometry + MeshStandardMaterial with texture map
- Saturn: RingGeometry with texture + double-sided material
- Orbit trails: EllipseCurve → TubeGeometry (or Line)

### 6.3 Camera Controller
- OrbitControls for drag/zoom (from three/examples)
- Custom focus system: on planet click, camera lerps to a position offset from the planet and tracks it each frame
- Unfocus: click empty space or press Escape

### 6.4 HUD (React layer)
- Top-left: simulation title + controls (speed slider, pause button)
- Right panel: selected planet card — name, distance from Sun (AU + km), orbital period, current velocity, moon list
- Bottom: planet nav dots — click to select
- All panels use semi-transparent dark backgrounds with a sci-fi mono font

### 6.5 Zustand Store
```
simSpeed: number          // multiplier, 0 = paused
selectedPlanet: string | null
elapsedDays: number
isPaused: boolean
```

---

## 7. File Structure

```
helios/
  public/
    textures/             ← NASA texture maps (jpg)
      sun.jpg
      mercury.jpg
      venus.jpg
      earth.jpg
      mars.jpg
      jupiter.jpg
      saturn.jpg
      saturn_ring.png
      uranus.jpg
      neptune.jpg
      moon.jpg
  src/
    data/
      planets.ts          ← orbital params, radii, moon data, texture paths
    simulation/
      keplerEngine.ts     ← Kepler's equation solver, position computation
      moonEngine.ts       ← moon orbital positions (circular, simplified)
    renderer/
      sceneSetup.ts       ← scene, camera, renderer, lights init
      planetMesh.ts       ← builds mesh + texture for each body
      orbitTrail.ts       ← draws elliptical trail lines
      cameraController.ts ← OrbitControls + focus/track logic
      sunGlow.ts          ← sun halo / glow mesh
    components/
      HUD.tsx             ← root HUD wrapper
      StatsPanel.tsx      ← selected planet detail card
      PlanetNav.tsx       ← bottom dot navigation
      SpeedControl.tsx    ← speed slider + pause button
      Tooltip.tsx         ← hover name tooltip
    store/
      simStore.ts         ← Zustand store
    hooks/
      useAnimationLoop.ts ← requestAnimationFrame hook
      useThreeScene.ts    ← scene init + canvas ref hook
    App.tsx
    main.tsx
    index.css
  index.html
  vite.config.ts
  tsconfig.json
  tailwind.config.js
```

---

## 8. Performance Targets

- 60 fps on a mid-range laptop GPU
- Textures lazy-loaded, compressed JPGs (no 4K — 2K max)
- No per-frame object allocation in the animation loop
- OrbitControls damping enabled for smooth feel

---

## 9. Deployment

- Push to GitHub → Vercel auto-deploys on merge to `main`
- Textures served as static assets from `/public/textures/`
- No backend, no API keys, fully static

---

## 10. Success Criteria

- All 8 planets visible, textured, orbiting correctly
- Clicking a planet focuses the camera and shows its stats
- Simulation speed slider works (0.1× to 100×)
- Orbit trails visible for all planets
- Major moons visible orbiting their parent planet
- Deploys and loads on Vercel in under 5 seconds on a decent connection
- Code is clean enough to walk through in a portfolio interview
