# Navigation Overhaul (Glass Nav + Scroll Behavior)

## Goals
- Create a lightweight, glass-like sticky navigation that hides on scroll down and reveals on scroll up.
- Provide clear active link indication and accessible focus-visible styles.

## Visual and Motion Specs
- Background: semi-transparent with backdrop-blur-md and border
- Elevation: subtle shadow when scrolled (shadow-sm → shadow-md)
- Border radius: rounded-full on desktop, rounded-xl on mobile
- Active link: underline grow animation with transform-origin and scaleX
- Focus: animated ring using Tailwind ring-2 + motion

## Scroll Behavior
- Track scroll direction and amount to toggle nav visibility
- Threshold: 12-16px before hiding; reveal immediately on upward scroll
- Avoid jank: use translateY with will-change: transform

```ts path=null start=null
// useScrollDirection.ts
import { useEffect, useState } from 'react'

export function useScrollDirection(threshold = 12) {
  const [hidden, setHidden] = useState(false)
  const [last, setLast] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const diff = y - last
      if (Math.abs(diff) < threshold) return
      setHidden(diff > 0 && y > 64)
      setLast(y)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [last, threshold])

  return hidden
}
```

## Component Pattern
```tsx path=null start=null
import { motion } from 'framer-motion'
import { useScrollDirection } from '@/hooks/useScrollDirection'

export const GlassNav = ({ children }) => {
  const hidden = useScrollDirection(14)
  return (
    <motion.nav
      initial={false}
      animate={{ y: hidden ? -80 : 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(100%-1rem,1100px)] rounded-full border border-border/60 bg-background/60 backdrop-blur-md shadow-sm"
      style={{ willChange: 'transform' }}
    >
      {/* links */}
    </motion.nav>
  )
}
```

## Active Link Indicator
```tsx path=null start=null
const Underline = ({ active }) => (
  <span
    className={`block h-[2px] origin-left scale-x-0 transition-transform ${
      active ? 'scale-x-100' : ''
    } bg-primary`}
  />
)
```

## Accessibility
- Ensure tab order and focus styles are visible
- Respect prefers-reduced-motion: disable translateY animation
- Use aria-current="page" on active link

