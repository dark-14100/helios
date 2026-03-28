# Helios — 3D Solar System Simulator

Welcome to Helios, a 3D Solar System Simulator. This repository currently contains the **Phase 1 Project Scaffold** as part of the overall development roadmap.

## Project Stack

This project is built using:
- **Vite** — Fast frontend build tool
- **React 18** — UI library
- **TypeScript** — Typed JavaScript
- **Tailwind CSS** — Utility-first styling
- **Zustand** — State management
- **Three.js** — 3D graphics library

## Current Implementation State (Features 1–5)

At this stage, the project contains the foundational skeleton, the baseline Three.js renderer, and the unified planet data models required for the remaining features:
- All required dependencies are securely installed and locked.
- Configuration is complete across `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`, and `vercel.json`.
- The entry source files (`index.html`, `main.tsx`, `App.tsx`, and `index.css`) are active.
- `src/renderer/sceneSetup.ts` handles the creation of the Three.js scene, camera, and renderer.
- Hooks `useThreeScene` and `useAnimationLoop` tie the React canvas perfectly to the rendering engine with proper resizing handlers and delta-time loops.
- `App.tsx` leverages the baseline scene hooks and successfully renders a base test loop placeholder.
- `src/data/planets.ts` exports strictly-typed `PlanetData` and `MoonData` definitions outlining physics constants, scaled distance data algorithms, orbital radii, eccentricity, and texture paths for all 8 planets and their major moons.
- `src/simulation/keplerEngine.ts` contains the pure-function orbital mechanics mathematical core, using Newton-Raphson approximation to solve for mean/eccentric/true anomalies, enabling precise calculations of an orbit's Cartesian `(x, y, z)` heliocentric coordinates over any elapsed time `t`.
- `src/renderer/sunGlow.ts` builds the deep space environment, spawning a glowing pulsing central Sun, illuminating the localized space with high-intensity `PointLight` and `AmbientLight`, and rendering a massive 10,000-point 3D background starfield.
- The `src/` directory has been bootstrapped with placeholder module and component files covering our renderer components, UI components, store, and simulation logic.
- A public assets structure (`public/textures/`) has automatically been primed to expect upcoming NASA texture mapping files.

## Development

To spin up the development environment, navigate to the local root and run:

```bash
npm install
npm run dev
```

You should see a vast background starfield, a glowing sun that subtly pulses via trigonometric animation, and a heavily illuminated test sphere orbiting nearby, signifying that the physical graphics engine is completely prepared to texture all real bodies in Feature 6: **Planet Meshes + Textures**.

To verify code integrity, build functionality, and type safety, you can additionally run:

```bash
npm run build
```

## Deployment

This structure contains pre-requisite configurations designed for deploying automatically as a static site out-of-the-box to our planned target: **Vercel** (`vercel.json`).
