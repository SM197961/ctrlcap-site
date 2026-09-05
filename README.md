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

## Rendered assets (Blender, Sep 2026)
Two assets are rendered offline with Blender 5 (Cycles on Metal) and committed as compressed files; the scene scripts live in `tools/blender/`.
- `assets/ambient.mp4` / `assets/ambient.webm` — 8 s seamless loop of glass slabs, light bars and dust, played at 42 % opacity behind `#pricing` and `#contact` (`.has-ambient` sections). Loaded on demand by `main.js`, desktop only, never on phones or with reduced motion. Regenerate: `OUT=/tmp/anim PCT=67 SAMPLES=48 NOVOL=1 blender -b --python tools/blender/ambient.py -- anim`, then `FRAMES_DIR=/tmp/anim tools/blender/encode.sh` (bloom is added in ffmpeg).
- `assets/method-device.webp` — the floating device on the Method page head. The screen is `tools/blender/screen.html` captured with headless Chrome at 1800×1125, then `SHOT=screen.png OUT=/tmp/device blender -b --python tools/blender/device.py`, cropped to its alpha bounding box and exported with `cwebp -q 82`.
