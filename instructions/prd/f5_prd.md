# Feature 5 — Sun + Starfield
## Helios · PRD

---

| Field | Value |
|---|---|
| Feature | F5 — Sun + Starfield |
| Depends on | F2 (scene foundation) |
| Files touched | `src/renderer/sunGlow.ts`, `App.tsx` |

---

## 1. Goal

Add the Sun at origin with a glow effect, a point light for planet illumination, ambient light, and a 10,000-star background. The scene should feel like space when this is done.

---

## 2. Deliverables

### `src/renderer/sunGlow.ts`
- Sun core: `SphereGeometry(4, 32, 32)` + `MeshBasicMaterial` with sun texture (`/textures/sun.jpg`) or fallback emissive yellow `0xffdd44`
- Glow halo: second larger sphere `SphereGeometry(5.5, 32, 32)` + `MeshBasicMaterial({ color: 0xff9900, transparent: true, opacity: 0.15, side: THREE.BackSide })`
- `PointLight` at origin: color `0xfff5e0`, intensity `3`, distance `1000`
- `AmbientLight`: color `0x111133`, intensity `0.5`
- Starfield: 10,000 random points in a `BufferGeometry`, `PointsMaterial` size `0.3`
- Exports: `createSun(scene: THREE.Scene): THREE.Mesh` — adds everything to scene, returns sun core mesh

### `App.tsx`
- Import and call `createSun(scene)` after scene init
- Store sun mesh ref for gentle pulse animation

---

## 3. Done Criteria

- Sun visible at origin with glow halo
- Stars fill background
- Lighting illuminates one side of placeholder sphere
- Sun pulses gently (scale oscillates ±2% using `Math.sin`)
- Texture loaded from `/textures/sun.jpg` if present, fallback color if not
- No TS errors
