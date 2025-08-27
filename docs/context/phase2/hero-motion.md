# Hero Section Motion

## Goals
- Confident, polished motion in hero: staggered name reveal, descriptor rise/fade, CTA micro-interactions, optional parallax.

## Variants
```ts path=null start=null
export const heroVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.12 * i }
    })
  },
  item: {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  }
}
```

## CTA Micro-interactions
```tsx path=null start=null
<motion.a
  whileHover={{ scale: 1.03, y: -1, boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}
  whileTap={{ scale: 0.98 }}
  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground"
>
  Get Started
</motion.a>
```

## Parallax Headshot
```tsx path=null start=null
const ParallaxImage = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end','end start'] })
  const y = useTransform(scrollYProgress, [0,1], [20, -20])
  return (
    <motion.img ref={ref} src="/headshot.jpg" alt="Antony Roshan" style={{ y }} className="rounded-2xl shadow-2xl" />
  )
}
```

## Accessibility
- Respect prefers-reduced-motion: fall back to simple fades
- Ensure CTAs have focus-visible styles
- Maintain readable line-lengths on all breakpoints

