# Phase 1 Context — Anime.js (optional SVG)

When to use it
- If we want precise SVG line-draw/morph effects (e.g., timeline accents or a signature path) without bringing that complexity into Framer/GSAP stacks.
- Keep usage local and minimal to avoid cognitive overhead.

Install
- npm: `npm i animejs`

Two API styles exist in the ecosystem
- v3 pattern (most common):
```ts
import anime from 'animejs';

anime({
  targets: '.line',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 1000,
});
```

- v4 pattern (newer ESM utilities):
```ts
import { animate, createTimeline, svg, stagger } from 'animejs';

createTimeline()
  .add(svg.createDrawable('path'), {
    draw: ['0 0', '1 1'],
    duration: 1200,
    ease: 'inOutSine',
  }, stagger(100));
```

Guidelines
- Prefer Framer for UI elements and micro-interactions.
- Use Anime.js only for decorative SVG animations to keep bundles focused.
- Ensure prefers-reduced-motion is respected (guard or quick disabled state).

