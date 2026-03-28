# Feature 13 — Vercel Deployment
## Helios · PRD

---

| Field | Value |
|---|---|
| Feature | F13 — Vercel Deployment |
| Depends on | F12 (polish + build passing) |
| Files touched | `vercel.json` (confirm), GitHub repo |

---

## 1. Goal

Live public URL on Vercel. The full simulation loads and runs in the browser with no local setup required.

---

## 2. Pre-Deploy Checklist

Before pushing to GitHub:
- `npm run build` passes locally with zero errors
- `public/textures/` has all texture files committed
- `.gitignore` does NOT exclude `public/textures/`
- `vercel.json` present at root

## 3. Steps

1. Create GitHub repo (public), push all code including `public/textures/`
2. Go to vercel.com → New Project → import repo
3. Build settings: Framework = Vite, Build command = `npm run build`, Output dir = `dist`
4. Deploy → get live URL
5. Open in incognito — verify simulation runs, textures load, HUD works, no console errors

## 4. `vercel.json`
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

---

## 5. Done Criteria

- Public Vercel URL accessible and shareable
- All 8 planets render with textures on live URL
- HUD functional on live URL
- Page loads under 5 seconds on a decent connection
- Zero console errors on live URL
- Works in incognito (no caching dependency)
