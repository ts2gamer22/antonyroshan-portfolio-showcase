# Phase 1 Context — GSAP (with ScrollTrigger)

Why we’re using it
- Timeline-grade control and scroll choreography for 1–2 flagship sequences (hero).
- Excellent performance for complex sequences and scroll-pin effects.

Install
- npm: `npm i gsap`

Imports and registration
```ts
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
```

React usage pattern (scoped + cleanup)
```tsx
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HeroTimeline() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-title span', { yPercent: 100, opacity: 0, stagger: 0.06, duration: 0.8 })
        .from('.hero-sub', { y: 16, opacity: 0, duration: 0.6 }, '-=0.4')
        .from('.hero-cta', { y: 8, opacity: 0, duration: 0.4 }, '-=0.3');

      // Scroll scene example
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: '.feature-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 24,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return <div ref={root}>...</div>;
}
```

ScrollTrigger basics
- start/end: positions like 'top 80%'.
- toggleActions: 'play pause resume reset' variants.
- scrub: true links animation to scroll; pin: true pins an element.

Tip
- Keep heavy GSAP usage isolated to hero/one feature section.
- Use transforms only; avoid animating layout properties.
- Dynamic import GSAP for route-level splitting if necessary.

