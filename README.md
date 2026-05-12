# Meeko landing

Vanilla JS landing page with [Vite](https://vitejs.dev/) and [GSAP](https://gsap.com/).

## Structure

- `index.html` — entry document (Vite dev server)
- `css/` — styles (import order defined in `styles.css`)
- `js/` — ES modules; `main.js` is the Vite entry
- `public/assets/` — static files copied as-is (`images/`, `icons/`, `fonts/`)

## Commands

```bash
npm install
npm run dev      # local dev with HMR
npm run build    # production bundle → dist/
npm run preview  # serve dist/ locally
```

Reference static URLs from the site root, for example `/assets/images/photo.webp`.
