# Phase 1 Context — Lenis (optional smooth scroll)

When to use it
- If we need subtly smoother scroll with synced scene animations. Avoid if it creates scroll-jacking feel. Always respect user preferences.

Install
- npm: `npm i lenis`

Basic React setup (imperative)
```tsx
import { useEffect } from 'react';
import Lenis from 'lenis';

export function UseLenis() {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true });
    return () => lenis.destroy();
  }, []);
  return null;
}
```

Integration with GSAP ScrollTrigger
```ts
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
```

A11y notes
- Always disable/shorten animations when prefers-reduced-motion is on.
- Use `data-lenis-prevent` for nested scroll areas.
- Anchor options can be enabled for in-page navigation with offsets.

