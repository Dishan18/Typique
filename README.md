# Typique

Typique is a browser-based vintage typewriter simulator built with React + TypeScript + Vite.

## Features

- Real-time typewriter typing experience from physical keyboard input
- Multi-page writing with automatic line/page wrapping
- Full-page manager to browse, select, and add pages
- Customizable paper color, ink color, and font
- Optional synthesized typewriter sounds (key clack + carriage return ding)
- Export selected pages as plain text or PDF

## Tech Stack

- React 19
- TypeScript
- Vite 6
- Tailwind CSS 4
- Motion (animations)
- jsPDF + html2canvas (PDF export)

## Run Locally

Prerequisite: Node.js 18+

1. Install dependencies

```bash
npm install
```

2. Start development server

```bash
npm run dev
```

3. Open the app at `http://localhost:3000`

## Build

```bash
npm run build
npm run preview
```

## Scripts

- `npm run dev` - start local dev server
- `npm run build` - build production bundle
- `npm run preview` - preview production build
- `npm run lint` - TypeScript type-check only

## SEO

Typique includes baseline SEO setup for production:

- Meta description, robots directives, canonical URL, Open Graph, and Twitter tags in `index.html`
- Structured data (`WebApplication`) in `index.html`
- Crawl assets in `public/robots.txt` and `public/sitemap.xml`
- Social preview image at `public/og-image.svg`

Before deploying, replace `https://typique.app/` in these files with your real domain:

- `index.html`
- `public/robots.txt`
- `public/sitemap.xml`
