# AVOPPS.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static website (no build step, no package manager, no framework) for **AVOPPS** — a Haitian NGO based in Petite Rivière de l'Artibonite. All pages are plain HTML files opened directly in a browser.

To preview the site, open any `.html` file in a browser. There is no dev server or build process.

## Architecture

### CSS — two-layer system
- `css/style.css` — global design system (tokens, header, footer, utilities, animations). **Always edit this first for shared styles.**
- `css/<page>.css` — page-specific overrides (e.g. `services.css`, `realisations.css`). Only loaded on the matching page.

### JS — shared + page-specific
- `js/main.js` — loaded on every page. Contains: burger nav, header scroll effect, IntersectionObserver scroll animations (`.fade-up`, `.fade-left`, `.fade-right`), stats counter, news cards (injected into `#news-container` on index), and contact form handling.
- `js/<page>.js` — loaded only on its page (e.g. `services.js`, `realisations.js`, `resources.js`, `news.js`, `actualite-details.js`).
- `js/particles.js` + `js/realisations.js` — canvas particle animation used on `realisations.html`.

### Page inventory
| File | Role |
|------|------|
| `index.html` | Homepage — hero, stats, 3 news cards (injected by JS) |
| `services.html` | Services overview |
| `realisations.html` | Realisation gallery with particle hero |
| `contact.html` | Contact form (client-side only, no backend) |
| `resources.html` | Resource library |
| `toutes-les-actualites.html` | Full news listing |
| `actualite-details-2.html` | Realisation detail (ATECPRA) |
| `realisation-*.html` | Individual realisation detail pages |
| `maintenance.html` | Maintenance / under-construction page |

## Design system (css/style.css)

All design tokens are CSS custom properties on `:root`:

```css
--green / --green-dark / --green-mid   /* primary brand greens */
--gold / --gold-light                  /* accent */
--off-white / --gray-1/2/3 / --ink     /* neutrals */
--font-sans  /* Inter */
--font-serif /* Playfair Display */
--radius: 0  /* square design — no border-radius globally */
```

Legacy aliases (`--primary-color`, `--accent-color`, etc.) exist for older page-specific CSS files — prefer the semantic names above for new work.

## Scroll animations

Add `.fade-up`, `.fade-left`, or `.fade-right` to any element — `main.js` observes them via `IntersectionObserver` and adds `.visible` when they enter the viewport. For staggered groups, set `style="--i:N"` on each child (used for CSS animation-delay).

## Header structure (replicated on every page)

Every page duplicates the same header HTML (`#mainHeader` > `.header-inner` > `.logo-container` + `nav.navbar`). The active nav link is set manually per page with `class="active"`. When adding a new top-level page, update the nav in **all** existing HTML files.

## Content language

All user-facing content is in **French**. Keep new text, labels, and messages in French.
