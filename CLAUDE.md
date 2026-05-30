# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-file static portfolio site — `portfolio.html`. No build system, no dependencies, no package manager. Open directly in a browser or deploy as-is to Vercel/Netlify.

## Architecture

Three files, no build system:
- `portfolio.html` — markup only
- `styles.css` — all styles (linked via `<link>`)
- `script.js` — scroll-based active nav highlight (linked via `<script>` before `</body>`)

**Section order in the HTML:**
1. `#hero` — name, bio, stats, availability badge
2. `#projects` — project cards grid
3. `#skills` — grouped skill tags
4. `#experience` — timeline list
5. `#blog` — 2-column card grid
6. `#contact` — email + social links

**Design tokens** (CSS custom properties in `:root`):
- `--bg` / `--fg` — dark background, cream foreground
- `--accent` / `--accent2` — gold tones (`#e8d5a3`, `#c4a882`)
- `--muted` — de-emphasized text (`#7a7570`)
- `--card-bg` — slightly lighter than bg (`#111110`)

**Fonts:** Syne (headings/display), DM Mono (technical accents, labels), DM Sans (body)

## Pending TODOs

- Replace `dilara@example.com` with real email
- Add LinkedIn profile URL (currently `href="#"`)
- Confirm GitHub URL (`github.com/withlaara`)
- Link blog cards to real posts
- Deploy to Vercel
