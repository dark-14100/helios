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
# Helios
Interactive 3D Solar System Simulator built with React, Three.js, and Vite.

## Features
- Fully interactive 3D solar system with precise logarithmic sizing
- Real-time physics processing using Kepler coordinates
- Orbit trails, dynamic selection halos, and glowing sun aesthetics
- Embedded satellite support with parent coordinate anchoring
- Seamless 2D to 3D projection UI architecture

## Quick Start
```bash
npm install
npm run dev
```

## Downloading Textures (Solarsystemscope)
To achieve the high fidelity required by this simulation, download standard resolution images from [Solar System Scope Textures](https://www.solarsystemscope.com/textures/).
Please download and rename the 2k images into `public/textures/` exactly as follows:
- `sun.jpg`
- `mercury.jpg`
- `venus.jpg`
- `venus_atmosphere.jpg`
- `earth.jpg`
- `earth_night.jpg`
- `moon.jpg`
- `mars.jpg`
- `jupiter.jpg`
- `saturn.jpg`
- `saturn_ring.png`
- `uranus.jpg`
- `neptune.jpg`

*Note: The app will automatically fallback to stylized wireframes using native materials if textures are not available!*

## Deployment
Helios is ready for standard deployment on platforms like Vercel or Netlify.
1. Link your GitHub repository.
2. The platform will automatically detect Vite and run `npm run build`.
3. Dist output will map directly to `/dist`.

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
