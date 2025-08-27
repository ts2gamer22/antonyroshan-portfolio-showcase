# Phase 1 Context — Framer Motion

Why we’re using it
- Best-in-class for React component-level motion: variants, layout transitions, scroll reveals.
- Simple, declarative API with great ergonomics and cleanup.

Install
- npm: `npm i framer-motion`

Core patterns we’ll use
1) Variants for reusable micro-interactions
```tsx
// Patterns only. Implement in src/lib/motion.ts
export const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export const stagger = (staggerChildren = 0.06, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

export const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
```

2) Reveal on scroll
```tsx
// Usage idea (component pattern)
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function Reveal({ children }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-10% 0px -10% 0px', once: true });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeIn}>
      {children}
    </motion.div>
  );
}
```

3) Scroll-linked progress (for sticky headers or progress bars)
```tsx
import { motion, useScroll, useTransform } from 'framer-motion';

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return <motion.div style={{ scaleX }} className="fixed left-0 top-0 h-1 w-full origin-left bg-primary" />;
}
```

4) Layout transitions for cards
```tsx
// With layout prop for smooth size/position changes
<motion.div layout className="card">...</motion.div>
```

Best practices
- Prefer transforms (x, y, scale, rotate) over top/left.
- Keep durations short; use ease-out curves for UI feel.
- Respect prefers-reduced-motion (wrap animations in a guard or use reduced motion settings).
- For complex hero timelines, switch to GSAP to avoid fighting two paradigms.

Useful snippets from docs (curated)
- Animate presence and opacity
```tsx
import { motion } from 'framer-motion';

export const Fade = ({ isVisible }: { isVisible: boolean }) => (
  <motion.div animate={{ opacity: isVisible ? 1 : 0 }} />
);
```

- Layout-aware transitions (avoid jank during size changes)
```tsx
<motion.div layout transition={{ layout: { duration: 0.4 } }} />
```

Testing and cleanup
- Components unmount cleanly; no detached event listeners.
- Animations never block input or cause layout thrash.

