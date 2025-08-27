# Navigation Patterns — Phase 2

## Sticky Glass Navigation

### Core Behavior
- **Glass morphism effect**: `backdrop-blur-md` with semi-transparent background
- **Sticky positioning**: Fixed to top with z-index management
- **Hide/show on scroll**: Hide on scroll down, reveal on scroll up
- **Threshold**: 10px scroll delta before triggering hide/show

### Implementation with Framer Motion

```typescript
// Navigation container variants
const navVariants = {
  visible: {
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  hidden: {
    y: "-100%",
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
}

// Glass effect classes
const glassClasses = `
  bg-background/80 
  backdrop-blur-md 
  border-b 
  border-border/40
  shadow-sm
`
```

### Active Link Indicators

#### Underline Animation
```typescript
const linkVariants = {
  initial: { 
    borderBottomWidth: "0px",
    borderBottomColor: "transparent"
  },
  hover: {
    borderBottomWidth: "2px",
    borderBottomColor: "hsl(var(--primary))",
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  active: {
    borderBottomWidth: "2px",
    borderBottomColor: "hsl(var(--primary))",
    opacity: 1
  }
}
```

### Mobile Navigation

#### Hamburger Menu
- **Toggle animation**: Morphing lines to X
- **Slide-in drawer**: From right with overlay
- **Trap focus**: When menu is open
- **Close on route change**: Auto-dismiss

```typescript
const mobileMenuVariants = {
  closed: {
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  },
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
}
```

### Keyboard Navigation

#### Focus Management
- **Focus-visible rings**: Consistent with design tokens
- **Tab order**: Logical left-to-right flow
- **Escape key**: Closes mobile menu
- **Arrow keys**: Navigate between items (optional)

```css
.nav-link:focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

### Scroll Detection Hook

```typescript
const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      
      if (Math.abs(currentScroll - lastScroll) < 10) return;
      
      setScrollDirection(currentScroll > lastScroll ? "down" : "up");
      setLastScroll(currentScroll);
    };

    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener("scroll", throttledScroll);
    
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [lastScroll]);

  return scrollDirection;
};
```

### Performance Considerations

- Use `transform` instead of `top` for hide/show animations
- Throttle scroll events to ~100ms intervals
- Use `will-change: transform` sparingly
- Memoize navigation items to prevent re-renders

### Accessibility Requirements

- ARIA attributes: `aria-current="page"` for active links
- Mobile menu: `aria-expanded`, `aria-controls`
- Keyboard traps: Ensure focus cycles within mobile menu
- Screen reader announcements: Role="navigation"

### Dark Mode Adjustments

```css
/* Light mode glass */
.light .nav-glass {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(0, 0, 0, 0.1);
}

/* Dark mode glass */
.dark .nav-glass {
  background: rgba(0, 0, 0, 0.8);
  border-color: rgba(255, 255, 255, 0.1);
}
```
