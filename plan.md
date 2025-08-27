# Antony’s Portfolio — UI/UX Revamp Plan

Owner: You (Product/Content), Agent Mode (UI/UX + Frontend), Reviewers: Antony
Repo: Vite + React + TypeScript + Tailwind + shadcn (Radix) + React Router

Executive summary
- Goal: elevate a basic portfolio into a sleek, modern, confident academic/engineering brand for Antony.
- Design pillars: clear information hierarchy, exquisite typography, refined motion, and strong but subtle color accents. Delight without distraction.
- Motion strategy: Framer Motion for 80% of interactions; reserve GSAP for a single high-impact hero timeline; optional Anime.js for SVG-only effects; optional Lenis for smooth scroll if it doesn’t harm a11y.
- Visual language: retain Geist Sans for UI; introduce an editorial Serif (Newsreader) for long-form readability and prestige.

Tech audit (current)
- Stack: Vite + React + Tailwind + shadcn UI (Radix wrappers). Theme tokens already exist in src/index.css and tailwind.config.ts. Fonts currently import Geist.
- Pages: Index (Navigation + Hero + FeaturedProjects + Footer), About, Projects, Contact.

Principles
- Accessibility first: semantic structure, color contrast, keyboard and screen-reader friendly, and respect prefers-reduced-motion.
- Performance first: sensible lazy-loading, optimized images, minimal library surface, CSS transforms for animations, GPU-friendly effects.
- Cohesion: one design system (tokens, radii, shadows, motion language) across all pages and components.
- Mobile-first: design and test from small to large breakpoints; ensure nav, hero, grids, and timelines feel intentional on touch devices.

Font system (recommended)
- Sans: Geist (already present) — UI, navigation, inputs, buttons.
- Serif: Newsreader — headings on About page, long-form copy blocks, pull-quotes.
- Fallbacks: system-ui stack.

Animation libraries (recommended usage)
- Framer Motion: component micro-interactions (variants), scroll-reveals (useInView/useScroll), layout transitions for cards and modals.
- GSAP + ScrollTrigger: single, high-impact hero timeline and eventual section parallax choreography. Use gsap.context in React for cleanup.
- Lenis (optional): smooth scroll; integrate with ScrollTrigger if enabled; turn off for prefers-reduced-motion.
- Anime.js (optional): specific SVG line-draws/morphs (e.g., timeline strokes or signature path). Use sparingly.

Phases and tasks
Note: Each phase has a completion checklist and acceptance criteria. Keep PRs small per phase.

Cross-cutting requirements
- Responsive design (mobile-first):
  - Breakpoints: xs (<640), sm (≥640), md (≥768), lg (≥1024), xl (≥1280), 2xl (≥1536)
  - Touch targets ≥ 44px, comfortable spacing, avoid hover-only affordances on mobile
  - Test: viewport emulation + real devices; ensure no horizontal scroll and proper image scaling
- Hosting on GitHub Pages:
  - Use SPA fallback strategy (copy index.html to 404.html) or switch to HashRouter; prefer SPA fallback to keep clean URLs
  - Configure Vite base when deploying to project pages (e.g., /repo-name/)
  - Add GitHub Actions workflow for build and deploy to gh-pages branch
  - Verify asset paths are relative; confirm route refreshes work on Pages

Phase 1 — Foundation (Design system, typography, motion primitives)
Tasks
- Install motion library: framer-motion.
- Prepare motion utilities: Reveal, StaggerChildren, Rise/Fade variants, and a tiny motion config file.
- Add editorial serif (Newsreader) import; wire Tailwind fontFamily serif; create CSS utilities for serif contexts (prose, pull-quotes).
- Audit and tighten Tailwind tokens: spacing scale, radii, shadows, gradient tokens; ensure dark-mode parity and contrast compliance.
- Review shadcn variants (Button, Card, Badge, Link) to ensure hover/active/focus states, animated focus rings, and consistent radii.
- Write concise docs (in docs/context/phase1) for Framer Motion, GSAP, Anime.js, Lenis, Typography/Brand, and Design Tokens.
- Add prefers-reduced-motion guard helpers.

Acceptance criteria
- A Motion utils module exposes 3-5 reusable patterns with examples.
- Fonts render with no layout shift; serif applied in the About page typography context.
- Token definitions are consistent: colors, radii, shadows, and gradients in both light/dark.
- Docs exist in docs/context/phase1 and are actionable.

Phase 2 — Navigation + Hero overhaul
Tasks
- Navigation: sticky glass-nav, slight backdrop blur; hide on scroll down, reveal on scroll up; active link indicator; subtle underline grow on hover; keyboard-focus choreography.
- Hero: letter/word stagger on name, descriptor fade/slide; CTA micro-interactions (press/hover states); photo parallax with soft glow; optional hero particles or accent gradient pulses.
- Implement scroll-to-content CTA (arrow) with focus-visible accessibility.

Acceptance criteria
- Nav feels weightless, never obstructive, and is fully keyboard-usable.
- Mobile: hamburger behavior is smooth; no layout jump; sticky behavior doesn’t obscure content.
- Hero demonstrates confident, polished motion with no jank; > 55 FPS on mid-range devices.
- Hero scales gracefully from mobile (stacked) to desktop (split grid), with readable line lengths.

Phase 3 — Projects grid and detail polish
Tasks
- Card reveal-on-scroll with stagger; hover lift + gradient ring; category pill filters (optional), and refined layout.
- Project detail (if added): route transition (scale/fade) and content structure for problem/approach/outcomes; add back-link animation.
- Add quick metrics: durations, tags, and visual cues that align with the brand palette.

Acceptance criteria
- Cards animate in with tasteful stagger; hover is delightful yet subtle.
- Grid adapts to mobile with single-column layout, balanced vertical spacing, and tap-friendly cards.
- Route-level transitions feel cohesive; no CLS or layout popping.

Phase 4 — About + Contact + Footer refinement
Tasks
- About: editorial typographic rhythm with serif; pull-quote component; timeline enhancements (subtle line-draw or milestones reveal).
- Contact: form micro-interactions, success/failed toasts; accessible focus order; no reliance on only color.
- Footer: refine link buttons; add motion for icons and hover states with a11y labels.

Acceptance criteria
- Long-form text is comfortable to read; hierarchy is clear; serif usage is consistent and purposeful.
- Forms are a11y-complete and provide clear feedback.

Phase 5 — Advanced motion polish (optional)
Tasks
- GSAP hero timeline + ScrollTrigger scenes for hero and one feature section (parallax layers, pinned copy).
- Optional Lenis smooth scroll with ScrollTrigger integration; ensure it respects prefers-reduced-motion and doesn’t break internal scrollable areas.
- Optional Anime.js line-draw for a timeline or signature stroke.

Acceptance criteria
- Timeline sequence is smooth, in-sync with scroll, and does not interfere with navigation or focus.
- Smooth scrolling feels natural and never fights native expectations.

Phase 6 — QA, accessibility, and performance
Tasks
- Accessibility: heading order, landmarks, labels, color contrast, focus-visible styling; ARIA as needed.
- Motion: respects prefers-reduced-motion; no essential information hidden behind animations.
- Performance: measure LCP/CLS/INP; lazy-load below-the-fold; optimize images; ensure tree-shaking; code-split GSAP/ScrollTrigger where possible.
- Cross-browser/device tests.
- Responsive QA: verify all key pages on small/medium/large breakpoints; ensure images are responsive and text remains legible; no content overflow.

Acceptance criteria
- Lighthouse a11y ≥ 95, Performance ≥ 90, Best Practices ≥ 95.
- No motion-related a11y violations; all interactive components keyboard usable.

Detailed task backlog (granular)
General
- [ ] Install framer-motion and scaffold variants utils file.
- [ ] Create a reusable <Reveal> wrapper using useInView + variants.
- [ ] Create <StaggerList> to wrap groups with staggered children.
- [ ] Add prefers-reduced-motion hook and guard utilities.

Typography and branding
- [ ] Import Newsreader and declare Tailwind fontFamily.serif.
- [ ] Add prose styles for About page (tailwind typography plugin already present).
- [ ] Write docs for typography usage rules (where to apply serif vs sans).

Tokens and theming
- [ ] Revisit CSS variables in src/index.css (light/dark); ensure readable contrasts.
- [ ] Ensure gradient tokens map to hero and card backgrounds.
- [ ] Normalize radii and shadows across shadcn components.

Navigation
- [ ] Implement scroll direction detection, hide/reveal nav.
- [ ] Active link underline grow animation.
- [ ] Focus-visible ring choreography for nav items.

Hero
- [ ] Name letter/word stagger; descriptor rise/fade.
- [ ] CTA hover/press micro-interactions (scale/translate + ring glow).
- [ ] Headshot parallax/glow with GPU transforms (translateZ(0)).

Projects
- [ ] Card reveal-on-scroll; hover lift + gradient border.
- [ ] Optional filter pills with animated selection.
- [ ] Potential detail view transition.

About
- [ ] Apply serif; improve spacing/line-length; pull-quote component.
- [ ] Timeline line-draw or milestone reveal.

Contact
- [ ] Refine input focus states and validation messages.
- [ ] Toasts for success/failure; keyboard-accessible.

Advanced motion (optional)
- [ ] GSAP hero timeline + ScrollTrigger.
- [ ] Lenis integration; disable for prefers-reduced-motion.
- [ ] Optional Anime.js SVG draw for timeline accents.

QA and performance
- [ ] Lighthouse + Web Vitals pass; fix regressions.
- [ ] a11y audit (axe devtools or equivalent); fix issues.
- [ ] Cross-browser tests (Edge/Chrome/Firefox/Safari) and mobile.

Library choices recap
- Primary: Framer Motion
- Secondary (scenes): GSAP + ScrollTrigger
- Optional: Lenis (smooth scroll), Anime.js (SVG-only)

Deployment & hosting — GitHub Pages
- Strategy: SPA fallback (copy index.html to 404.html) to support BrowserRouter refreshes on Pages
- Configure Vite base for project pages (if site lives at /repo-name/)
- Add GitHub Actions workflow to build and deploy to gh-pages branch
- Post-deploy checklist: verify deep links, mobile viewports, and cache-busting of assets

Next steps (this PR)
1) Land Phase 1 docs + plan (this file) and create docs/ folder structure.
2) Add framer-motion and motion utils scaffolding.
3) Add Newsreader + serif typography rules.
4) Add a to-do to set up GitHub Pages deployment (SPA fallback, base path) before Phase 2 completes.

All code changes must be incremental, with small PRs per feature to keep velocity and quality high.

