# Agent

Guidance for anyone (human or assistant) working on this repo.

## Project

Vite-powered vanilla JS landing: `index.html`, CSS under `css/` (entry: `styles.css`), scripts under `js/`, static media under `public/assets/`.

## Conventions

- Prefer small, focused changes; match existing HTML/CSS patterns.
- Keep design tokens in `css/variables.css`; shared layout in `layout.css`; reusable UI in `components.css`.
- See `Plan.md` at the repository root for roadmap and decisions.

## Useful paths

| Path | Purpose |
|------|---------|
| `index.html` | Main page |
| `css/styles.css` | Imports the rest of the stylesheets |
| `js/main.js` | Vite script entry (ES modules, GSAP) |
| `vite.config.js` | Vite config |
