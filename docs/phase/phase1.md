# Phase 1 — Execution Guide

Goal
- Establish foundation: motion primitives, typography pairing, token refinements, and docs.

Preconditions
- Node and Vite env working (already this repo). Tailwind + shadcn in place.

1) Install motion library
```bash
npm i framer-motion
```

2) Create motion utilities (proposed path)
- File: src/lib/motion.ts
- Add: fadeIn, rise, and a `stagger(staggerChildren, delayChildren)` helper (see docs/context/phase1/framer-motion.md).
- Add a simple <Reveal> component in src/components/Reveal.tsx using useInView.

3) Add serif font for editorial contexts
- In src/index.css, add Newsreader import line (see typography-and-brand.md).
- In tailwind.config.ts, ensure fontFamily.serif = ['Newsreader', 'serif'] and keep sans as Geist.
- Apply serif on About page content wrappers (e.g., `<div className="prose prose-neutral dark:prose-invert font-serif">`).

4) Token refinements
- Review src/index.css vars for contrast and tone.
- Ensure button/link focus rings use tokenized ring color and animate with `transition-smooth`.
- Audit shadows and gradient utility classes.

5) Micro-interactions inventory (Phase 1 scope)
- Buttons: hover scale 1.02, active 0.98, subtle ring glow.
- Links: underline grow on hover.
- Cards (FeaturedProjects): on-view reveal via <Reveal> and slight lift on hover.

6) prefers-reduced-motion
- Create a helper hook (e.g., src/hooks/useReducedMotion.ts) to return a boolean.
- In motion components, shorten or disable animation when true.

7) Documentation check-in
- Ensure docs/context/phase1/* are complete and linked from plan.md.

Validation checklist
- [ ] Build passes and no type errors.
- [ ] Navigation, Hero, and FeaturedProjects render with no layout shift from font swaps.
- [ ] Reveal animations fire once and do not reflow repeatedly.
- [ ] About page uses serif typography where appropriate and remains legible in dark mode.
- [ ] Focus-visible rings are consistent and accessible.

Out of scope (Phase 1)
- GSAP hero timeline, Lenis integration, and Anime.js SVG accents (planned for later phases).

