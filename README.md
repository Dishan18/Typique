# Typique

Typique is a browser-based vintage typewriter simulator built with React + TypeScript + Vite.

## Features

- Real-time typewriter typing from both physical keyboard and on-screen keyboard (mobile-friendly)
- Shift support on virtual keyboard
- Shift + number symbols on virtual keyboard: `! @ # $ % ^ & * ( )`
- Multi-page writing with automatic line/page wrapping
- Full-page manager to browse, select, and add pages
- Customizable paper color, ink color, and font
- Default font set to Special Elite
- Morse Code display mode for letters `A-Z` and numbers `0-9`
- Optional synthesized typewriter sounds (key clack + carriage return ding)
- Export selected pages as plain text or PDF
- Send selected text via WhatsApp (`wa.me`) with India code `91` auto-prefilled

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

## WhatsApp Export Notes

- Enter recipient mobile number without `91`
- App validates 10 digits and generates WhatsApp URL as `https://wa.me/91<number>?text=<encoded_message>`
- While typing in form inputs (such as WhatsApp number field), typewriter input capture is ignored to prevent accidental page edits

## SEO

Typique includes baseline SEO setup for production:

- Meta description, robots directives, canonical URL, Open Graph, and Twitter tags in `index.html`
- Structured data (`WebApplication`) in `index.html`
- Crawl assets in `public/robots.txt` and `public/sitemap.xml`
- Social preview image at `public/og-image.svg`

Production domain is set to `https://typique.vercel.app/` in:

- `index.html`
- `public/robots.txt`
- `public/sitemap.xml`
