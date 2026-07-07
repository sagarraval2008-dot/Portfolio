# Sagar Raval — Developer Portfolio

A premium, single-page developer portfolio built with plain HTML, CSS, and JavaScript. No frameworks, no build step — just open `index.html` or deploy the folder as-is.

## ✨ Features

- **Terminal-window hero** — the whole intro lives inside a real editor-style window (traffic-dot chrome, live status pill) with the name, role, and tagline framed as command-line output rather than a generic centered headline
- Warm near-black base with a phosphor-amber primary accent and a violet secondary glow — a duotone that reads as "developer terminal," not generic blue glassmorphism
- Subtle animated CRT scanline texture over the whole page, plus animated gradient-mesh orbs and a lightweight canvas particle field in the hero
- Typing animation cycling through roles
- Sticky glass navbar with scroll progress bar and scrollspy
- Scroll-reveal animations (IntersectionObserver-based, staggered per grid)
- The "code editor" motif continues into skill and project cards (window chrome, mono labels)
- Fully responsive, down to small mobile screens, with a slide-in mobile nav
- Accessible: semantic HTML, visible focus states, skip link, `prefers-reduced-motion` support
- SEO-ready: meta description, Open Graph + Twitter Card tags, canonical URL, theme-color
- Auto-updating copyright year
- Loading screen and back-to-top button

## 🗂 File Structure

```
.
├── index.html      # Markup and content
├── style.css       # All styling (design tokens at the top)
├── script.js       # All interactivity, organized by feature
├── assets/
│   └── favicon.svg # Monogram favicon
└── README.md
```

## 🎨 Design Tokens

Colors, type scale, spacing, and motion timing are all defined as CSS custom properties at the top of `style.css` under `:root`.

- `--bg` / `--bg-elevated` — warm near-black backdrop (not cool navy)
- `--accent-300` → `--accent-600` — phosphor-amber accent ramp, used for CTAs, links, glows, and the terminal prompt
- `--violet-500` / `--violet-400` — secondary glow color for the hero's duotone orb background
- `--font-display` — JetBrains Mono, used for headings too, so the "terminal" identity carries into typography, not just decoration
- `--font-body` — Inter, for readable paragraph copy

Change `--accent-500` (and its siblings) to re-theme the entire accent system in one place.

## 🛠 Customizing Content

- **Projects** — edit the `<article class="project-card">` blocks inside `#projects` in `index.html`.
- **Skills** — edit the `<article class="skill-card">` blocks inside `#skills`.
- **Timeline / Experience** — edit `#about .about-timeline` and `#experience .exp-track`.
- **Contact links** — update the `href` values in `#contact .contact-card` (GitHub, LinkedIn, email).
- **Typing roles** — edit the `roles` array near the top of the "TYPING ANIMATION" section in `script.js`.

## 🚀 Deploying to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, click **Add New → Project** and import the repo.
3. Framework preset: **Other** (static site) — no build command needed.
4. Output directory: leave as the project root (`.`).
5. Deploy.

Alternatively, drag-and-drop the project folder into the Vercel dashboard, or run `vercel` from inside the folder with the Vercel CLI.

## ✅ Before Going Live

- Replace the placeholder LinkedIn URL and email address in `index.html` (`#contact` section and hero socials) with your real ones.
- Add a real Open Graph image at `assets/og-cover.png` (1200×630px recommended) and confirm the `og:image` / `twitter:image` paths in `<head>`.
- Update `og:url` and `<link rel="canonical">` once you have a production domain.

---

Designed & developed by **Sagar Raval**.