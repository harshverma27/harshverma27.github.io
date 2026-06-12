# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal developer portfolio for Harsh Verma — a single-page React app served at **heyharsh.me** (see `CNAME`). Vite + React 18 + TypeScript + Tailwind, deployed to GitHub Pages via GitHub Actions.

## Commands

```bash
npm install        # install dependencies
npm run dev        # Vite dev server (default http://localhost:5173)
npm run build      # tsc -b (typecheck) then vite build -> dist/
npm run preview    # serve the production build locally
```

There is no test runner, linter, or formatter configured. `npm run build` is the only correctness gate — it runs `tsc -b` first, so a type error fails the build.

## Architecture

- **Entry:** `index.html` (Vite entry, loads Google Fonts + `/src/main.tsx`) → `src/main.tsx` → `src/App.tsx`. There is no router despite `react-router-dom` being a dependency; everything is one scrolling page.
- **App flow:** `App.tsx` gates the whole page behind a `LoadingScreen`. Once `onComplete` fires, it renders `Navbar` + a fixed sections stack: `Hero`, `Works`, `Journal`, `Explorations`, `Stats`, `Contact`. `Hero` provides a fixed animated background; later sections sit in `z-10` containers that scroll over it.
- **Sections** live in `src/components/` — each is a self-contained section component (data is hardcoded inline within each file, not loaded from a data layer).
- **Animation stack:** `framer-motion` (mount/exit transitions, `AnimatePresence`), `gsap` (entrance timelines, e.g. Hero name reveal), and Tailwind keyframe animations defined in `tailwind.config.js`. `hls.js` streams the Hero background video from a Mux URL.

## Styling

- Tailwind is the styling system. The theme in `tailwind.config.js` defines semantic color tokens (`bg`, `surface`, `text-primary`, `muted`, `stroke`, `accent`) backed by HSL CSS variables set in `src/index.css`, plus custom keyframes/animations (`marquee`, `float`, `gradient-shift`, etc.). Use these tokens rather than raw colors.
- Fonts: `font-body` (Inter) and `font-display` (Instrument Serif).
- `src/index.css` holds the `@tailwind` directives, the `:root` variables, and base/scrollbar styles. The root-level `styles.css` is **not** imported by the app — it is legacy.

## Static assets

Files in `public/` (e.g. `resume.pdf`, `avatar.png`, `skills/`, `projects/`, `CNAME`) are copied verbatim to `dist/` at build. Reference them with absolute paths (`/resume.pdf`). The `CNAME` in `public/` is what preserves the custom domain on deploy.

## Deployment

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main` (or manual dispatch). It runs `npm ci && npm run build` and uploads `dist/`. **Active development happens on the `3d-portfolio` branch; merging to `main` triggers a live deploy.**

## Ignored / legacy

`Old-Files/` (a previous OS/terminal-themed portfolio), `dist/`, `node_modules/`, and the LaTeX résumé sources are gitignored or legacy and should generally be left alone.
