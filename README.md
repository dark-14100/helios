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

## Current Implementation State (Feature 1)

At this stage, the project contains the foundational skeleton required for the remaining features:
- All required dependencies are securely installed and locked.
- Configuration is complete across `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`, and `vercel.json`.
- The entry source files (`index.html`, `main.tsx`, `App.tsx`, and `index.css`) are active, strictly returning a black full-screen canvas placeholder.
- The `src/` directory has been fully bootstrapped with placeholder module and component files covering our data, renderer components, UI components, store, and simulation logic. Note: They currently hold comments detailing `// TODO: implement`.
- A public assets structure (`public/textures/`) has automatically been primed to expect upcoming NASA texture mapping files.

## Development

To spin up the development environment, navigate to the local root and run:

```bash
npm install
npm run dev
```

You should see a solid black canvas signifying that the architecture is fully prepared for Phase 2: **Three.js Scene Foundation**.

To verify code integrity, build functionality, and type safety, you can additionally run:

```bash
npm run build
```

## Deployment

This structure contains pre-requisite configurations designed for deploying automatically as a static site out-of-the-box to our planned target: **Vercel** (`vercel.json`).
