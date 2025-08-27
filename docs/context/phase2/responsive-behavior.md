# Responsive Behavior — Phase 2

## Breakpoint System

### Tailwind Breakpoints
```typescript
// Default Tailwind breakpoints
const breakpoints = {
  xs: '0px',      // < 640px
  sm: '640px',    // ≥ 640px
  md: '768px',    // ≥ 768px
  lg: '1024px',   // ≥ 1024px
  xl: '1280px',   // ≥ 1280px
  '2xl': '1536px' // ≥ 1536px
};

// Custom hook for responsive behavior
const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<string>('xs');
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1536) setBreakpoint('2xl');
      else if (width >= 1280) setBreakpoint('xl');
      else if (width >= 1024) setBreakpoint('lg');
      else if (width >= 768) setBreakpoint('md');
      else if (width >= 640) setBreakpoint('sm');
      else setBreakpoint('xs');
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return {
    breakpoint,
    isMobile: breakpoint === 'xs' || breakpoint === 'sm',
    isTablet: breakpoint === 'md' || breakpoint === 'lg',
    isDesktop: breakpoint === 'xl' || breakpoint === '2xl'
  };
};
```

## Navigation Responsive Patterns

### Mobile Navigation Drawer
```typescript
const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      {/* Hamburger Button */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <HamburgerIcon isOpen={isOpen} />
      </button>
      
      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Drawer */}
            <motion.nav
              className="lg:hidden fixed right-0 top-0 h-full w-[280px] bg-background z-50 shadow-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            >
              <div className="p-6 pt-20">
                {/* Navigation items */}
                <motion.div
                  className="space-y-6"
                  initial="closed"
                  animate="open"
                  variants={{
                    open: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.1
                      }
                    },
                    closed: {}
                  }}
                >
                  {navItems.map((item, i) => (
                    <motion.a
                      key={i}
                      href={item.href}
                      className="block text-lg font-medium"
                      variants={{
                        closed: { x: 20, opacity: 0 },
                        open: { x: 0, opacity: 1 }
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
```

## Hero Responsive Layout

### Adaptive Hero Grid
```typescript
const ResponsiveHero = () => {
  const { isMobile } = useBreakpoint();
  
  return (
    <section className="min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="
          grid 
          grid-cols-1 lg:grid-cols-2 
          gap-8 lg:gap-12 
          items-center 
          min-h-screen
          py-20 lg:py-0
        ">
          {/* Text Content */}
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="
              text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 
              font-bold 
              leading-tight
            ">
              Your Name
            </h1>
            <p className="
              mt-4 sm:mt-6 
              text-lg sm:text-xl lg:text-2xl 
              text-muted-foreground
              max-w-md mx-auto lg:mx-0
            ">
              Your tagline here
            </p>
            
            {/* CTAs */}
            <div className="
              mt-8 sm:mt-10 
              flex flex-col sm:flex-row 
              gap-4 
              justify-center lg:justify-start
            ">
              <Button size={isMobile ? "default" : "lg"}>
                Primary CTA
              </Button>
              <Button size={isMobile ? "default" : "lg"} variant="outline">
                Secondary CTA
              </Button>
            </div>
          </motion.div>
          
          {/* Image/Visual */}
          <motion.div
            className="relative order-first lg:order-last"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="
              w-[280px] h-[280px] 
              sm:w-[350px] sm:h-[350px] 
              lg:w-[450px] lg:h-[450px] 
              mx-auto
              relative
            ">
              {/* Content */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
```

## Grid System Adaptations

### Responsive Project Grid
```typescript
const ResponsiveProjectGrid = ({ projects }) => {
  return (
    <div className="
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      lg:grid-cols-3 
      gap-4 sm:gap-6 lg:gap-8
    ">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.5,
            delay: index * 0.1
          }}
          className="group"
        >
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </div>
  );
};

// Masonry layout for varied content
const MasonryGrid = ({ items }) => {
  return (
    <div className="
      columns-1 
      sm:columns-2 
      lg:columns-3 
      xl:columns-4 
      gap-4 sm:gap-6
    ">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="break-inside-avoid mb-4 sm:mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
};
```

## Typography Scaling

### Fluid Typography System
```css
/* Fluid typography using clamp() */
.fluid-text-xs {
  font-size: clamp(0.75rem, 2vw, 0.875rem);
}

.fluid-text-sm {
  font-size: clamp(0.875rem, 2.5vw, 1rem);
}

.fluid-text-base {
  font-size: clamp(1rem, 3vw, 1.125rem);
}

.fluid-text-lg {
  font-size: clamp(1.125rem, 3.5vw, 1.25rem);
}

.fluid-text-xl {
  font-size: clamp(1.25rem, 4vw, 1.5rem);
}

.fluid-text-2xl {
  font-size: clamp(1.5rem, 5vw, 2rem);
}

.fluid-text-3xl {
  font-size: clamp(2rem, 6vw, 3rem);
}

.fluid-text-4xl {
  font-size: clamp(2.5rem, 8vw, 4rem);
}
```

### Responsive Typography Component
```typescript
const ResponsiveHeading = ({ 
  children, 
  as: Component = 'h2',
  className = '' 
}) => {
  const { breakpoint } = useBreakpoint();
  
  const sizeClasses = {
    xs: 'text-2xl',
    sm: 'text-3xl',
    md: 'text-4xl',
    lg: 'text-5xl',
    xl: 'text-6xl',
    '2xl': 'text-7xl'
  };
  
  return (
    <Component className={`${sizeClasses[breakpoint]} ${className}`}>
      {children}
    </Component>
  );
};
```

## Touch Interactions

### Touch-Friendly Components
```typescript
const TouchButton = ({ children, ...props }) => {
  return (
    <motion.button
      {...props}
      className="
        min-h-[44px] min-w-[44px]
        px-6 py-3
        text-base
        rounded-lg
        touch-manipulation
      "
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.1 }}
    >
      {children}
    </motion.button>
  );
};

// Swipeable carousel for mobile
const SwipeableCarousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isMobile } = useBreakpoint();
  
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex(prev => 
      Math.min(prev + 1, items.length - 1)
    ),
    onSwipedRight: () => setCurrentIndex(prev => 
      Math.max(prev - 1, 0)
    ),
    preventDefaultTouchmoveEvent: true,
    trackMouse: !isMobile
  });
  
  return (
    <div {...swipeHandlers} className="overflow-hidden">
      <motion.div
        className="flex"
        animate={{ x: `-${currentIndex * 100}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {items.map((item, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {item}
          </div>
        ))}
      </motion.div>
      
      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-primary' : 'bg-muted'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
```

## Performance Optimizations

### Responsive Image Loading
```typescript
const ResponsiveImage = ({ 
  src, 
  alt, 
  mobileSrc, 
  tabletSrc,
  desktopSrc 
}) => {
  const { breakpoint } = useBreakpoint();
  
  const imageSrc = useMemo(() => {
    if (breakpoint === 'xs' || breakpoint === 'sm') return mobileSrc || src;
    if (breakpoint === 'md' || breakpoint === 'lg') return tabletSrc || src;
    return desktopSrc || src;
  }, [breakpoint, src, mobileSrc, tabletSrc, desktopSrc]);
  
  return (
    <img
      src={imageSrc}
      alt={alt}
      loading="lazy"
      className="w-full h-auto"
    />
  );
};

// Conditional animation loading
const ResponsiveAnimation = ({ children }) => {
  const { isMobile } = useBreakpoint();
  const reducedMotion = useReducedMotion();
  
  if (isMobile || reducedMotion) {
    // Simple fade for mobile/reduced motion
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    );
  }
  
  // Complex animation for desktop
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1.0]
      }}
    >
      {children}
    </motion.div>
  );
};
```

## Spacing & Layout

### Responsive Spacing Utilities
```css
/* Responsive padding/margin utilities */
.responsive-padding {
  @apply px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16;
}

.responsive-section {
  @apply py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32;
}

.responsive-container {
  @apply max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8;
}

.responsive-gap {
  @apply gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12;
}
```

### Container Query Support
```typescript
// Use container queries for component-level responsiveness
const ResponsiveCard = ({ children }) => {
  return (
    <div className="@container">
      <div className="
        p-4 @sm:p-6 @md:p-8 @lg:p-10
        text-sm @sm:text-base @md:text-lg
      ">
        {children}
      </div>
    </div>
  );
};
```

## Testing Checklist

### Responsive Testing Points
- [ ] Mobile portrait (320px - 414px)
- [ ] Mobile landscape (568px - 667px)
- [ ] Tablet portrait (768px - 834px)
- [ ] Tablet landscape (1024px - 1194px)
- [ ] Desktop (1280px - 1920px)
- [ ] Ultra-wide (2560px+)

### Key Validation Areas
- [ ] Touch targets ≥ 44px
- [ ] Text remains readable at all sizes
- [ ] Images scale appropriately
- [ ] No horizontal scroll
- [ ] Animations perform well on mobile
- [ ] Forms are usable on touch devices
- [ ] Navigation is accessible at all breakpoints
