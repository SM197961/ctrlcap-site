# ctrlcap.co

Static site for ctrlcap.co, served by GitHub Pages.

- Root: marketing site (index, founder, method, privacy, 404, robots, sitemap, assets/)
- `cribbage/`: built output of the Cribbage Duo app (source lives in `~/Documents/cribbage-duo`; deploy with its `deploy.sh`)
- `CNAME`: custom domain. `.nojekyll`: serve files as-is.

Pushing to `main` publishes the site. Nothing else to run.

## Motion layer (Sep 2026)
- `assets/scene.js` — Three.js "systems constellation" behind the hero (ES module, three@0.170 from jsdelivr). Desktop only, skipped for reduced-motion, pauses off-screen. Node positions are world units at z=0 (half-height ≈ 5.2); the DOM board sits in the right half.
- `assets/motion.js` — GSAP 3.12 + ScrollTrigger (cdnjs): split-word headline, hero parallax, per-section reveals, method rail draw, cursor light, magnetic buttons. If GSAP fails to load, `main.js` falls back to the IntersectionObserver reveals.
- Script order in `index.html` matters: gsap → ScrollTrigger → motion.js → main.js (all `defer`), then `scene.js` as a module.
