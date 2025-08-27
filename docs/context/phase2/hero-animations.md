# Hero Animations — Phase 2

## Letter & Word Stagger Effects

### Name Animation Strategy
Split text into individual letters/words for granular control with Framer Motion.

```typescript
// Text splitting utility
const splitText = (text: string, type: 'letters' | 'words') => {
  if (type === 'letters') {
    return text.split('').map((char, i) => ({
      char,
      key: `${char}-${i}`,
      isSpace: char === ' '
    }));
  }
  return text.split(' ').map((word, i) => ({
    word,
    key: `${word}-${i}`
  }));
};

// Letter stagger variants
const letterStaggerVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    rotateX: -90,
    filter: "blur(10px)"
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.03,
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1.0], // Cubic bezier for smooth deceleration
      filter: {
        duration: 0.4
      }
    }
  })
};
```

### Descriptor Fade/Slide
Secondary text with subtle entrance after name animation.

```typescript
const descriptorVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.6, // After name animation
      duration: 0.8,
      ease: "easeOut"
    }
  }
};
```

## CTA Micro-interactions

### Button Hover States
```typescript
const ctaVariants = {
  rest: {
    scale: 1,
    boxShadow: "0 0 0 0px rgba(var(--primary-rgb), 0)"
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 0 20px 4px rgba(var(--primary-rgb), 0.3)",
    transition: {
      duration: 0.3,
      ease: "backOut"
    }
  },
  pressed: {
    scale: 0.98,
    transition: {
      duration: 0.1
    }
  }
};

// Magnetic hover effect (optional)
const magneticHover = {
  onMouseMove: (e: MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Subtle magnetic pull
    const translateX = x * 0.15;
    const translateY = y * 0.15;
    
    return { x: translateX, y: translateY };
  },
  onMouseLeave: () => ({ x: 0, y: 0 })
};
```

### Arrow Scroll Indicator
```typescript
const scrollArrowVariants = {
  bounce: {
    y: [0, 10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  pulse: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear"
    }
  }
};
```

## Photo Parallax & Effects

### Parallax Configuration
```typescript
const useParallax = (offset: number = 50) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, offset]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.6]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);
  
  return { y, opacity, scale };
};

// Apply to image container
<motion.div
  style={{ y: parallaxY, scale: parallaxScale }}
  className="relative"
>
  <img 
    className="rounded-2xl shadow-2xl"
    alt="Profile"
  />
  {/* Soft glow effect */}
  <motion.div
    className="absolute inset-0 rounded-2xl"
    style={{
      background: "radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)",
      opacity: glowOpacity,
      filter: "blur(40px)",
      zIndex: -1
    }}
  />
</motion.div>
```

### Gradient Accent Pulses
```typescript
const pulseGradientVariants = {
  initial: {
    backgroundPosition: "0% 50%",
    backgroundSize: "200% 200%"
  },
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 5,
      ease: "linear",
      repeat: Infinity
    }
  }
};

// CSS for animated gradient
.hero-gradient {
  background: linear-gradient(
    135deg,
    hsl(var(--primary)),
    hsl(var(--primary) / 0.5),
    hsl(var(--secondary)),
    hsl(var(--primary))
  );
  background-size: 300% 300%;
  animation: gradient-shift 8s ease infinite;
}
```

## Optional Particle System

### Floating Particles
```typescript
interface Particle {
  id: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const generateParticles = (count: number): Particle[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `particle-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));
};

const particleVariants = {
  float: (particle: Particle) => ({
    y: [particle.y + "%", (particle.y - 30) + "%"],
    x: [particle.x + "%", (particle.x + (Math.random() * 10 - 5)) + "%"],
    opacity: [0, 1, 0],
    transition: {
      duration: particle.duration,
      delay: particle.delay,
      repeat: Infinity,
      ease: "linear"
    }
  })
};
```

## Performance Guidelines

### Optimization Techniques
1. **Use CSS transforms only**: translateX, translateY, scale, rotate
2. **Avoid animating layout properties**: width, height, padding, margin
3. **GPU acceleration**: Add `will-change` or `translateZ(0)` for heavy animations
4. **Lazy initialization**: Delay particle systems until hero is in view
5. **Reduce motion preference**: Simplify or disable for accessibility

```typescript
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const animationConfig = reduceMotion ? {
  duration: 0,
  delay: 0,
  stagger: 0
} : {
  duration: 0.8,
  delay: 0.03,
  stagger: 0.05
};
```

## Mobile Responsiveness

### Touch-Friendly Adjustments
- Disable parallax on mobile (performance)
- Simplify particle count or remove entirely
- Reduce stagger delays for faster load perception
- Ensure CTAs are 44px minimum tap targets

```typescript
const isMobile = window.innerWidth < 768;

const mobileOptimizedVariants = isMobile ? {
  // Simplified mobile animations
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
} : {
  // Full desktop animations
  hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" }
};
```
