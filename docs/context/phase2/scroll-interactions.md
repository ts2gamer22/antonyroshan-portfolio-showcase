# Scroll Interactions — Phase 2

## Scroll-Driven Animations

### Core Scroll Hooks

```typescript
import { useScroll, useTransform, useSpring, useInView } from 'framer-motion';

// Basic scroll progress hook
const useScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  return smoothProgress;
};

// Section-based scroll progress
const useSectionScroll = (ref: RefObject<HTMLElement>) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"] // Track entire viewport journey
  });
  
  return scrollYProgress;
};
```

### Reveal on Scroll Pattern

```typescript
// Reveal component with customizable animations
interface RevealProps {
  children: ReactNode;
  width?: "fit" | "full";
  delay?: number;
  duration?: number;
}

const Reveal: FC<RevealProps> = ({ 
  children, 
  width = "fit",
  delay = 0,
  duration = 0.5 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true,
    margin: "-100px" // Trigger 100px before entering viewport
  });

  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
  }, [isInView]);

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 }
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ 
          duration,
          delay,
          ease: "easeOut"
        }}
      >
        {children}
      </motion.div>
      
      {/* Optional slide overlay effect */}
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" }
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ 
          duration: duration + 0.2,
          delay,
          ease: "easeInOut"
        }}
        className="absolute top-0 bottom-0 left-0 right-0 bg-primary z-20"
      />
    </div>
  );
};
```

### Parallax Scrolling

```typescript
// Multi-layer parallax
const useParallaxLayers = () => {
  const { scrollY } = useScroll();
  
  // Different speeds for different layers
  const bgY = useTransform(scrollY, [0, 1000], [0, -200]);
  const midY = useTransform(scrollY, [0, 1000], [0, -100]);
  const fgY = useTransform(scrollY, [0, 1000], [0, -50]);
  
  // Add spring physics for smoothness
  const bgSpring = useSpring(bgY, { stiffness: 100, damping: 30 });
  const midSpring = useSpring(midY, { stiffness: 100, damping: 30 });
  const fgSpring = useSpring(fgY, { stiffness: 100, damping: 30 });
  
  return {
    background: bgSpring,
    midground: midSpring,
    foreground: fgSpring
  };
};
```

### Scroll-Triggered Sequences

```typescript
// Sequential reveal for lists
const StaggerReveal: FC<{ children: ReactNode[] }> = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      filter: "blur(4px)"
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children.map((child, i) => (
        <motion.div key={i} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};
```

### Scroll Progress Indicators

```typescript
// Page scroll progress bar
const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
      style={{ scaleX }}
    />
  );
};

// Section progress dots
const SectionDots = ({ sections }: { sections: string[] }) => {
  const [activeSection, setActiveSection] = useState(0);
  
  // Use intersection observer for section tracking
  useEffect(() => {
    const observers = sections.map((id, index) => {
      const element = document.getElementById(id);
      if (!element) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(index);
          }
        },
        { threshold: 0.5 }
      );
      
      observer.observe(element);
      return observer;
    });
    
    return () => {
      observers.forEach(obs => obs?.disconnect());
    };
  }, [sections]);
  
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 space-y-3">
      {sections.map((_, i) => (
        <motion.div
          key={i}
          className="w-3 h-3 rounded-full cursor-pointer"
          animate={{
            scale: activeSection === i ? 1.5 : 1,
            backgroundColor: activeSection === i ? "var(--primary)" : "var(--muted)"
          }}
          whileHover={{ scale: 1.2 }}
          onClick={() => {
            document.getElementById(sections[i])?.scrollIntoView({
              behavior: "smooth"
            });
          }}
        />
      ))}
    </div>
  );
};
```

### Scroll Velocity Effects

```typescript
// React to scroll speed
const useScrollVelocity = () => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 100
  });
  
  // Transform velocity to useful values
  const skewY = useTransform(smoothVelocity, [-1000, 1000], [-10, 10]);
  const blur = useTransform(
    smoothVelocity,
    [-500, 0, 500],
    [2, 0, 2],
    { clamp: true }
  );
  
  return { skewY, blur, velocity: smoothVelocity };
};

// Apply to scrollable content
const ScrollContent = ({ children }) => {
  const { skewY, blur } = useScrollVelocity();
  
  return (
    <motion.div
      style={{
        skewY,
        filter: useTransform(blur, (v) => `blur(${v}px)`)
      }}
    >
      {children}
    </motion.div>
  );
};
```

### Sticky Elements with Scroll

```typescript
// Sticky section with progress-based animations
const StickySection = ({ children, height = "200vh" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 48]);
  
  return (
    <div ref={ref} style={{ height }} className="relative">
      <motion.div
        className="sticky top-20 bg-card"
        style={{
          scale,
          opacity,
          borderRadius
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
```

### Performance Best Practices

1. **Throttle scroll events**: Use Framer Motion's built-in optimization
2. **Use `will-change` sparingly**: Only on actively animating elements
3. **Debounce complex calculations**: Prevent excessive re-renders
4. **Lazy load below fold**: Don't initialize animations until needed
5. **Test on low-end devices**: Ensure 60fps on mid-range phones

```typescript
// Performance monitoring
const usePerformanceMonitor = () => {
  useEffect(() => {
    if ('performance' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'measure') {
            console.log(`${entry.name}: ${entry.duration}ms`);
          }
        });
      });
      
      observer.observe({ entryTypes: ['measure'] });
      return () => observer.disconnect();
    }
  }, []);
};
```

### Accessibility Considerations

```typescript
// Respect reduced motion preference
const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    
    const handleChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handleChange);
    
    return () => mq.removeEventListener("change", handleChange);
  }, []);
  
  return reducedMotion;
};

// Apply to animations
const scrollVariants = (reducedMotion: boolean) => ({
  hidden: {
    opacity: 0,
    y: reducedMotion ? 0 : 50
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: reducedMotion ? 0 : 0.5
    }
  }
});
```
