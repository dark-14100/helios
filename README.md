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

## Current Implementation State (Features 1–10)

At this stage, the project contains the foundational skeleton, the baseline Three.js renderer, and the unified planet data models required for the remaining features:
- All required dependencies are securely installed and locked.
- Configuration is complete across `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`, and `vercel.json`.
- The entry source files (`index.html`, `main.tsx`, `App.tsx`, and `index.css`) are active.
- `src/renderer/sceneSetup.ts` handles the creation of the Three.js scene, camera, and renderer.
- Hooks `useThreeScene` and `useAnimationLoop` tie the React canvas perfectly to the rendering engine with proper resizing handlers and delta-time loops.
- `src/data/planets.ts` exports strictly-typed `PlanetData` and `MoonData` definitions outlining physics constants, scaled distance data algorithms, orbital radii, eccentricity, and texture paths for all 8 planets and their major moons.
- `src/simulation/keplerEngine.ts` contains the pure-function orbital mechanics mathematical core, using Newton-Raphson approximation to solve for mean/eccentric/true anomalies, enabling precise calculations of an orbit's Cartesian `(x, y, z)` heliocentric coordinates over any elapsed time `t`.
- `src/renderer/sunGlow.ts` builds the deep space environment, spawning a glowing pulsing central Sun, illuminating the localized space with high-intensity `PointLight` and `AmbientLight`, and rendering a massive 10,000-point 3D background starfield.
- `src/renderer/planetMesh.ts` acts as the generation factory, processing all the physical planet arrays and rendering 8 properly sized spherical geometries using standard materials. It assigns fallback colors gracefully, integrates translucent custom rings onto Saturn, tilts the axial models logically, and maps everything to standard `THREE.Mesh` maps. All 8 planets are statically loaded onto the screen precisely anchored at `t=0` via the physics engine. It also natively hosts the `createMoonMeshes` engine to procedurally instantiate mapped textured spheres representing nested orbital bodies.
- `src/store/simStore.ts` safely implements our high-performance simulation clock leveraging Zustand. It safely calculates `elapsedDays` over our delta loop natively independent of rendering bottlenecks, driving the entire continuous active re-calculations of planetary velocities and revolution geometries seamlessly.
- `src/renderer/orbitTrail.ts` iterates over the `getPlanetPosition` output up to 256 unique fixed point markers tracing orbits spanning massive distances exactly simulating Kepler anomalies, generating static closed `THREE.LineLoop` rendering paths universally.
- `src/simulation/moonEngine.ts` injects localized 2D trigonometric projections into the core logic loop, capturing physical position data of planetary parents computationally and casting tracking secondary spheres representing complex satellites exactly corresponding to specific orbit radii and periods independently of relative origin drift. 
- `src/renderer/cameraController.ts` establishes unified 3D mouse interaction wrapping `THREE.Raycaster` against rendering layers. When a user clicks, smooth `lerp` positional vector targeting and `lookAt` overrides naturally decouple them from the root `OrbitControls` loop, pulling the viewpoint perfectly across shifting space coordinates dynamically.

## Development

To spin up the development environment, navigate to the local root and run:

```bash
npm install
npm run dev
```

You should see an entirely interactive, massive web-enabled simulator. The background encompasses a sprawling 10,000-point 3D starfield surrounding a glowing sun pulsing via trigonometric animation. 8 beautifully detailed planetary bodies (featuring high specular faceted geometric fallback shaders overlaid with architectural wireframes) and their accurately scaled moons trace perfect orbits continuously. You can now left-click natively to interact with the environment and drag the camera dynamically across space! This signifies the core environment mechanics are fully complete and primed for external HUD logic in Feature 11: **Public API Layer**.

To verify code integrity, build functionality, and type safety, you can additionally run:

```bash
npm run build
```

## Deployment

This structure contains pre-requisite configurations designed for deploying automatically as a static site out-of-the-box to our planned target: **Vercel** (`vercel.json`).
