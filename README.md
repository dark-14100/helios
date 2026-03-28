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

## Current Implementation State (Feature 1 & 2)

At this stage, the project contains the foundational skeleton and the baseline Three.js renderer required for the remaining features:
- All required dependencies are securely installed and locked.
- Configuration is complete across `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`, and `vercel.json`.
- The entry source files (`index.html`, `main.tsx`, `App.tsx`, and `index.css`) are active.
- `src/renderer/sceneSetup.ts` handles the creation of the Three.js scene, camera, and renderer.
- Hooks `useThreeScene` and `useAnimationLoop` are implemented to tie the React canvas to the rendering engine with proper resizing handlers and delta-time loops.
- `App.tsx` successfully mounts the `<canvas>` dynamically and renders a rotating white Three.js sphere as a fundamental pipeline test.
- The `src/` directory has been bootstrapped with placeholder module and component files covering our data, renderer components, UI components, store, and simulation logic.
- A public assets structure (`public/textures/`) has automatically been primed to expect upcoming NASA texture mapping files.

## Development

To spin up the development environment, navigate to the local root and run:

```bash
npm install
npm run dev
```

You should see a solid black canvas with a centered white rotating sphere, signifying that the graphics engine is fully prepared for Feature 3: **Planet & Moon Data**.

To verify code integrity, build functionality, and type safety, you can additionally run:

```bash
npm run build
```

## Deployment

This structure contains pre-requisite configurations designed for deploying automatically as a static site out-of-the-box to our planned target: **Vercel** (`vercel.json`).
