# Feature 1 — Project Scaffold
## Helios · PRD

---

| Field | Value |
|---|---|
| Feature | F1 — Project Scaffold |
| Project | Helios — 3D Solar System Simulator |
| Stack | Vite · React 18 · TypeScript · Tailwind CSS · Zustand · Three.js |
| Package Manager | npm |
| Deployment Target | Vercel |

---

## 1. Goal

Bootstrap the entire project structure from scratch. No functionality yet — this feature is purely about getting a clean, working foundation that every subsequent feature builds on. By the end, `npm run dev` starts a dev server, a black canvas fills the screen, and all placeholder files are in place with no TypeScript errors.

---

## 2. Deliverables

### 2.1 Config Files (root)
- `package.json` — all dependencies listed, scripts defined
- `vite.config.ts` — basic Vite config, React plugin
- `tsconfig.json` — strict TypeScript config
- `tsconfig.node.json` — for Vite config file
- `tailwind.config.js` — content paths configured for `src/`
- `postcss.config.js` — required by Tailwind
- `index.html` — Vite entry HTML, mounts `#root`
- `.gitignore` — standard Node/Vite ignores
- `vercel.json` — static deployment config

### 2.2 Source Files (`src/`)
- `main.tsx` — entry point, mounts `<App />`
- `App.tsx` — renders canvas ref, placeholder black screen
- `index.css` — Tailwind directives + base reset (html/body full height, overflow hidden, bg black)

### 2.3 Placeholder Module Files
All created empty (just a comment `// TODO: implement`) so imports resolve cleanly:

```
src/
  data/
    planets.ts
  simulation/
    keplerEngine.ts
    moonEngine.ts
  renderer/
    sceneSetup.ts
    planetMesh.ts
    orbitTrail.ts
    cameraController.ts
    sunGlow.ts
  components/
    HUD.tsx
    StatsPanel.tsx
    PlanetNav.tsx
    SpeedControl.tsx
    Tooltip.tsx
  store/
    simStore.ts
  hooks/
    useAnimationLoop.ts
    useThreeScene.ts
```

### 2.4 Public Assets Folder
- `public/textures/` directory created with a `README.md` inside listing the texture filenames expected (actual texture downloads happen in F5/F6)

---

## 3. Dependencies

### Production
| Package | Version | Purpose |
|---|---|---|
| `react` | ^18.2.0 | UI framework |
| `react-dom` | ^18.2.0 | DOM renderer |
| `three` | ^0.155.0 | 3D renderer |
| `zustand` | ^4.4.0 | State management |

### Dev
| Package | Version | Purpose |
|---|---|---|
| `vite` | ^4.4.0 | Build tool |
| `@vitejs/plugin-react` | ^4.0.0 | React HMR |
| `typescript` | ^5.0.0 | Type checking |
| `@types/react` | ^18.2.0 | React types |
| `@types/react-dom` | ^18.2.0 | React DOM types |
| `@types/three` | ^0.155.0 | Three.js types |
| `tailwindcss` | ^3.3.0 | Utility CSS |
| `postcss` | ^8.4.0 | CSS processing |
| `autoprefixer` | ^10.4.0 | CSS vendor prefixes |

---

## 4. Key Config Details

### Tailwind
Content paths must include `./src/**/*.{ts,tsx}` — nothing in `public/`.

### TypeScript
- `strict: true`
- `moduleResolution: bundler`
- `jsx: react-jsx`
- Path alias: `@/` → `src/` (configured in both `tsconfig.json` and `vite.config.ts`)

### Vite
- Plugin: `@vitejs/plugin-react`
- Resolve alias: `@` → `src/`

### `index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html, body, #root {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: black;
}
```

### `vercel.json`
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

---

## 5. Done Criteria

- `npm install` completes with no errors
- `npm run dev` starts and opens in browser
- Screen is solid black, no console errors
- `npm run build` completes successfully, outputs to `dist/`
- No TypeScript errors across any file
- All placeholder files exist and are importable
- `public/textures/` directory exists